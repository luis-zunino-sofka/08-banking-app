import { localStorageProperties } from "@core/constants";
import {
  IDinResponseGetAllCustomerAccountResponse,
  IGetAllCustomerAccountRequest,
  IGetAllCustomerAccountResponse,
} from "@core/interfaces";
import { getAllCustomerAccount } from "@core/services";
import { useAppContext } from "@core/state";
import { setGlobalBalance, setUserAccounts } from "@core/state/globalBalance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useAccountProvider = () => {
  const customerId = String(
    localStorage.getItem(localStorageProperties.customerId)
  );
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useAppContext();
  const [accounts, setAccounts] = useState<IGetAllCustomerAccountResponse[]>(
    []
  );

  const handleOnSuccess = (data: IDinResponseGetAllCustomerAccountResponse) => {
    if (data.dinBody) {
      const balance = data.dinBody.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount || 0,
        0
      );
      dispatch(setGlobalBalance(balance));
      dispatch(setUserAccounts(data.dinBody));
      setAccounts(data?.dinBody);
    } else toast(data.dinError.detail);
  };

  const callGetAllAccounts = async (data: IGetAllCustomerAccountRequest) => {
    try {
      setIsLoading(true);

      const result = await getAllCustomerAccount(data);
      handleOnSuccess(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Ha ocurrido un error ");
    } finally {
      setIsLoading(false);
    }
  };

  const refetchAccounts = async () => await callGetAllAccounts({ customerId });

  useEffect(() => {
    refetchAccounts();
    return () => {
      refetchAccounts();
    };
  }, []);

  return { accounts, state, isRefechingAccounts: isLoading, refetchAccounts };
};
