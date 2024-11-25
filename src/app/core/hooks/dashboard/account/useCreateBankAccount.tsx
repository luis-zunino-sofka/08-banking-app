import { localStorageProperties } from "@core/constants";
import { useAccountContext } from "@core/state/context/account/AccountContext";
import { createCustomerAccount } from "@core/services";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ICreateCustomerAccountRequest } from "@core/interfaces";
import { useState } from "react";

interface ICreateBankAccount {
  accountType: string;
  initialBalance: number;
}

export const useCreateBankAccount = () => {
  const { accounts, refetchAccounts } = useAccountContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateBankAccount>();

  const callCreateCustomerAccount = async (
    data: ICreateCustomerAccountRequest
  ) => {
    try {
      setIsLoading(true);
      const result = await createCustomerAccount(data);
      localStorage.setItem(
        localStorageProperties.accountId,
        String(result?.dinBody?.accountId)
      );
      toast("¡Cuenta bancaria creada exitosamente!");
      return result;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Cuentas no cargadas ");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: ICreateBankAccount) => {
    if (data.initialBalance < 0) {
      toast("¡El balance debe de ser mayor a 0!");
      return;
    }
    setIsLoading(true);
    callCreateCustomerAccount({
      customerId: String(
        localStorage.getItem(localStorageProperties.customerId)
      ),
      amount: data.initialBalance,
    });
    refetchAccounts();
  };

  return {
    isLoading,
    accounts,
    errors,
    handleSubmit,
    register,
    onSubmit,
  };
};
