import { IUnidirectionalTransaction } from "@core/interfaces";
import { atmDeposit } from "@core/services";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCallAtmDeposit = () => {
  const [isLoading, setIsLoading] = useState(false);

  const callAtmDeposit = async (data: IUnidirectionalTransaction) => {
    try {
      setIsLoading(true);
      const result = await atmDeposit(data);
      if (result.dinBody) {
        if (result.dinBody) toast("Deposito en cajero realizado exitosamente");
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
  return { callAtmDeposit, isLoading };
};
