import { ILoginResponse } from "@core/interfaces/forms/login";
import { loginActions } from "./loginActions";
import { IState } from "@core/interfaces";

export const loginCases = {
  [loginActions.LOGIN]: (state: IState, payload?: ILoginResponse) => {
    return { ...state, loginData: payload };
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  [loginActions.LOGOUT]: (state: IState, _: any) => {
    return { ...state, loginData: null };
  },
};
