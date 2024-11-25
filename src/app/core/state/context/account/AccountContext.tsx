import { IGetAllCustomerAccountResponse } from "@core/interfaces";
import { createContext, useContext } from "react";

export interface IAccountContext {
  accounts: IGetAllCustomerAccountResponse[];
  refetchAccounts: () => void;
  balance?: number | null;
}

export const AccountContext = createContext<IAccountContext>({
  accounts: [],
  refetchAccounts: () => {},
  balance: 0,
});

export const useAccountContext = () => useContext(AccountContext);
