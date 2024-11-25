import { IGetAllCustomerAccountResponse } from "@core/interfaces";
import { globalBalanceActions } from ".";

export interface ISetGlobalBalanceResponse {
  type: string;
  payload?: number | IGetAllCustomerAccountResponse[];
}

export const setGlobalBalance = (
  balance?: number
): ISetGlobalBalanceResponse => ({
  type: globalBalanceActions.SET_BALANCE,
  payload: balance,
});

export const setUserAccounts = (
  accounts?: IGetAllCustomerAccountResponse[]
) => ({
  type: globalBalanceActions.SET_USER_ACCOUNTS,
  payload: accounts,
});
