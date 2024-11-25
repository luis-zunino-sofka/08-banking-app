import { IDinError, IDinHeader } from "@core/interfaces";

export interface IRegisterUserRequest {
  firstName: string;
  lastName: string;
  encryptedIdentification: string;
  username: string;
  encryptedPassword: string;
}

export interface IRegisterUserResponse {
  customerId: string;
}

export interface IDinRequestRegisterUserRequest {
  dinHeader: IDinHeader;
  dinBody: IRegisterUserRequest;
}

export interface IDinResponseRegisterUserResponse {
  dinHeader: IDinHeader;
  dinBody: IRegisterUserResponse;
  dinError: IDinError;
}
