import { IDinHeader } from "../../../../src/app/core/interfaces/general/dinHeader.interface";
import { IDinError } from "../../../../src/app/core/interfaces/general/errors.interface";

export const dinHeader: IDinHeader = {
  device: "",
  language: "",
  uuid: "",
  ip: "",
  transactionTime: "",
  symmetricKey: "",
  initializationVector: "",
};

export const dinError: IDinError = {
  type: "",
  date: "",
  source: "",
  code: "",
  providerErrorCode: "",
  message: "",
  detail: "",
};
