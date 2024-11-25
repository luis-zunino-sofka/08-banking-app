import { globalBalanceActions } from "./globalBalanceActions";
import { IGetAllCustomerAccountResponse, IState } from "@core/interfaces";

export const globalBalanceCases = {
  [globalBalanceActions.SET_BALANCE]: (state: IState, payload?: number) => {
    return { ...state, balance: payload };
  },

  [globalBalanceActions.SET_USER_ACCOUNTS]: (
    state: IState,
    payload?: IGetAllCustomerAccountResponse[]
  ) => {
    return { ...state, accounts: payload };
  },
};
