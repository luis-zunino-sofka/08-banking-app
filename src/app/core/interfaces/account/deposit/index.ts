import { IDinError, IDinHeader } from "../..";

export interface IDepositToExternalAccountRequest {
  customerId: string;
  accountId: string;
  amount: number;
  encryptedAccountNumberToDeposit: string;
}

export interface IDepositToExternalAccountResponse {
  transactionId: string;
  amount: number;
  cost: number;
  timestamp: string; // date-time
  encryptedPayrollAccountNumber: string;
  encryptedSupplierAccountNumber: string;
}

export interface IDinRequestDepositToExternalAccountRequest {
  dinHeader: IDinHeader;
  dinBody: IDepositToExternalAccountRequest;
}

export interface IDinResponseDepositToExternalAccountResponse {
  dinHeader: IDinHeader;
  dinBody: IDepositToExternalAccountResponse;
  dinError: IDinError;
}
