import { IDepositToExternalAccountRequest } from "@core/interfaces";
import { externalDeposits } from "@core/services";
import { useState } from "react";
import toast from "react-hot-toast";

export const useExternalDeposits = () => {
  const [isLoading, setIsLoading] = useState(false);

  const callExternalDeposits = async (
    data: IDepositToExternalAccountRequest
  ) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const result = await externalDeposits(data);
      if (result.dinBody) {
        if (result.dinBody) toast("Deposito externo realizado exitosamente");
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

  return { callExternalDeposits, isLoading };
};
