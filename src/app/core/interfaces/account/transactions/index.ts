import { IDinError, IDinHeader } from "@core/interfaces";

export interface ITransactionDone {
  transactionId: string;
  amount: number;
  cost: number;
  timestamp: string; // date-time
}

export interface IUnidirectionalTransaction {
  customerId: string;
  accountId: string;
  amount: number;
}

export interface IDinRequestUnidirectionalTransaction {
  dinHeader: IDinHeader;
  dinBody: IUnidirectionalTransaction;
}

export interface IDinResponseTransactionDone {
  dinHeader: IDinHeader;
  dinBody: ITransactionDone;
  dinError: IDinError;
}
