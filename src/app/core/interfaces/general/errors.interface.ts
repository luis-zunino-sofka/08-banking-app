export interface IError {
  message: string;
}

export interface IDinError {
  type: string;
  date: string; // date-time
  source: string;
  code: string;
  providerErrorCode: string;
  message: string;
  detail: string;
}
