import { IGetAllCustomerAccountResponse, ILoginResponse } from "..";

export interface IContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
  balance?: number;
}

export interface IAction {
  type: string;
  payload?: string | ILoginResponse | number | IGetAllCustomerAccountResponse[];
}

// LOGIN
export interface ILoginState {
  loginData?: ILoginResponse | null;
}

export interface IGlobalBalanceState {
  balance?: number | null;
  accounts?: IGetAllCustomerAccountResponse[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IState extends ILoginState, IGlobalBalanceState {}
