import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAccountContext } from "@core/state";
import { onlinePurchase, phisicalPurchase } from "@core/services";
import { IUnidirectionalTransaction } from "@core/interfaces";
import { EPurchaseType } from "@core/types";
import { localStorageProperties } from "@core/constants";
import { useState } from "react";

interface IPurchaseForm {
  purchaseType: string;
  purchaseAmount: number;
  accountId: string;
}

export const usePurchase = () => {
  const { accounts, refetchAccounts } = useAccountContext();
  const [isLoadingPhisical, setIsLoadingPhisical] = useState(false);
  const [isLoadingOnline, setIsLoadingOnline] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPurchaseForm>();

  const callPhisicalPurchase = async (data: IUnidirectionalTransaction) => {
    try {
      return await phisicalPurchase(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Cuentas no cargadas ");
    } finally {
      setIsLoadingPhisical(false);
    }
  };

  const callOnlinePurchase = async (data: IUnidirectionalTransaction) => {
    try {
      const response = await onlinePurchase(data);

      return response;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Cuentas no cargadas ");
    } finally {
      setIsLoadingOnline(false);
    }
  };

  const onSubmit = (data: IPurchaseForm) => {
    setIsLoadingPhisical(true);
    setIsLoadingOnline(true);
    const { purchaseAmount, purchaseType, accountId } = data;
    const customerId = String(
      localStorage.getItem(localStorageProperties.customerId)
    );
    switch (purchaseType) {
      case EPurchaseType.PHYSICAL:
        callPhisicalPurchase({
          customerId,
          accountId,
          amount: purchaseAmount,
        });

        break;
      case EPurchaseType.ONLINE:
        callOnlinePurchase({
          customerId,
          accountId,
          amount: purchaseAmount,
        });
        break;

      default:
        toast("Metodo de deposito no valido");
        break;
    }
    refetchAccounts();
  };

  return {
    isLoading: isLoadingPhisical || isLoadingOnline,
    accounts,
    register,
    onSubmit,
    handleSubmit,
    errors,
  };
};
