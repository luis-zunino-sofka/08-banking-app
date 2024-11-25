import { ILoginResponse } from "@core/interfaces";
import { loginActions } from ".";

export interface ISaveLoginResponse {
  type: string;
  payload: string | ILoginResponse;
}

export const saveLoginData = (
  loginData: ILoginResponse
): ISaveLoginResponse => ({
  type: loginActions.LOGIN,
  payload: loginData,
});

export const resetLoginData = (loginData = undefined) => ({
  type: loginActions.LOGOUT,
  payload: loginData,
});
