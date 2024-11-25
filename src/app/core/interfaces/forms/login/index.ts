import { IDinError, IDinHeader } from "@core/interfaces";

export interface ILoginRequest {
  username: string;
  encryptedPassword: string;
}

export interface ILoginResponse {
  token: string | null;
  customerId: string | null;
  // TODO: ver de hacer esto mejor
  username?: string;
}

export interface IDinRequestLoginRequest {
  dinHeader: IDinHeader;
  dinBody: ILoginRequest;
}

export interface IDinResponseLoginResponse {
  dinHeader: IDinHeader;
  dinBody: ILoginResponse;
  dinError: IDinError;
}
