import { IGetAllCustomerAccountResponse } from "@core/interfaces";
import { createContext, useContext } from "react";

export interface IAccountContext {
  accounts: IGetAllCustomerAccountResponse[];
  refetchAccounts: () => void;
  balance?: number | null;
  isRefechingAccounts: boolean;
}

export const AccountContext = createContext<IAccountContext>({
  accounts: [],
  refetchAccounts: () => {},
  balance: 0,
  isRefechingAccounts: false,
});

export const useAccountContext = () => useContext(AccountContext);
