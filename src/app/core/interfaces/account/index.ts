import { IDinError, IDinHeader } from "..";

export interface ICreateCustomerAccountRequest {
  customerId: string;
  amount: number;
}

export interface ICreateCustomerAccountResponse {
  accountId: string;
  encryptedNumber: string;
  amount: number;
}

export interface IDinRequestCreateCustomerAccountRequest {
  dinHeader: IDinHeader;
  dinBody: ICreateCustomerAccountRequest;
}

export interface IDinResponseCreateCustomerAccountResponse {
  dinHeader: IDinHeader;
  dinBody: ICreateCustomerAccountResponse;
  dinError: IDinError;
}

export interface IGetCustomerAccountRequest {
  customerId: string;
  accountId: string;
}

export interface IGetAllCustomerAccountRequest {
  customerId: string;
}

export interface IGetAllCustomerAccountResponse {
  accountId: string;
  encryptedNumber: string;
  amount: number;
  // TODO: ver de borrar esto
  username: string;
}

export interface IGetCustomerAccountResponse {
  accountId: string;
  encryptedNumber: string;
  amount: number;
}
// TODO: ver de borrar esto
export interface IDinRequestGetCustomerAccountRequest {
  dinHeader: IDinHeader;
  dinBody: IGetCustomerAccountRequest;
}

export interface IDinResponseGetCustomerAccountResponse {
  dinHeader: IDinHeader;
  dinBody: IGetCustomerAccountResponse;
  dinError: IDinError;
}

export interface IDinResponseGetAllCustomerAccountResponse {
  dinHeader: IDinHeader;
  dinBody: IGetAllCustomerAccountResponse[];
  dinError: IDinError;
}
