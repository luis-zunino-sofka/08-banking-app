import { IUnidirectionalTransaction } from "@core/interfaces";
import { branchDeposits } from "@core/services";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCallBranchDeposits = () => {
  const [isLoading, setIsLoading] = useState(false);

  const callBranchDeposits = async (data: IUnidirectionalTransaction) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const result = await branchDeposits(data);
      if (result.dinBody) {
        if (result.dinBody) toast("Deposito realizado exitosamente");
        else toast(result.dinError.detail);
      } else {
        toast(result.dinError.detail);
      }
      return result;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Ha ocurrido un error ");
    } finally {
      setIsLoading(false);
    }
  };

  return { callBranchDeposits, isLoading };
};
