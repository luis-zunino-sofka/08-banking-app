import { atmWithdraw } from "@core/services";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAccountContext } from "@core/state";

interface WithdrawFormData {
  amount: number;
  accountNumberToWithdraw: string;
}

export const useWithdrawDashboard = () => {
  const { accounts } = useAccountContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawFormData>();

  const onSubmit = async (data: WithdrawFormData) => {
    try {
      const response = await atmWithdraw({
        customerId: String(localStorage.getItem("customerId")),
        amount: data.amount,
        accountId: data.accountNumberToWithdraw,
      });

      if (response.dinBody) {
        toast("¡Retiro realizado con éxito!");
      } else {
        toast(response.dinError.detail);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(error.message);
      toast("Ha ocurrido un error");
    }
  };

  return { accounts, register, handleSubmit, errors, onSubmit };
};
