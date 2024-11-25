import { localStorageProperties } from "@core/constants";
import { useAccountContext } from "@core/state";
import { EDepositSource } from "@core/types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useCallAtmDeposit,
  useCallBranchDeposits,
  useExternalDeposits,
} from "./mutations";
import { encryptAES } from "@core/utils";

interface DepositFormData {
  depositSource: EDepositSource;
  amount: number;
  accountId: string;
  accountNumberToDeposit?: string;
}

export const useDeposit = () => {
  const { accounts, refetchAccounts } = useAccountContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DepositFormData>();

  const isAccountSelected = watch("depositSource") === EDepositSource.ACCOUNT;

  const { callBranchDeposits, isLoading: isLoadingBranchDeposits } =
    useCallBranchDeposits();

  const { callAtmDeposit, isLoading: isLoadingAtmDeposit } =
    useCallAtmDeposit();

  const { callExternalDeposits, isLoading: isLoadingExternalDeposits } =
    useExternalDeposits();

  const onSubmit = (data: DepositFormData) => {
    const { amount, accountId, accountNumberToDeposit } = data;
    const customerId = String(
      localStorage.getItem(localStorageProperties.customerId)
    );

    const encryptedAccountNumberToDeposit = encryptAES(
      accountNumberToDeposit ?? ""
    );

    switch (data.depositSource) {
      case EDepositSource.BRANCH:
        callBranchDeposits({
          customerId,
          accountId,
          amount,
        });

        break;
      case EDepositSource.ATM:
        callAtmDeposit({
          customerId,
          accountId,
          amount,
        });
        break;
      case EDepositSource.ACCOUNT:
        if (accountNumberToDeposit)
          callExternalDeposits({
            customerId,
            accountId,
            amount,
            encryptedAccountNumberToDeposit,
          });

        break;
      default:
        toast("Metodo de deposito no valido");
        break;
    }
    refetchAccounts();
  };

  return {
    isLoading:
      isLoadingAtmDeposit ||
      isLoadingBranchDeposits ||
      isLoadingExternalDeposits,
    isAccountSelected,
    accounts,
    errors,
    watch,
    handleSubmit,
    register,
    onSubmit,
  };
};

export default useDeposit;
