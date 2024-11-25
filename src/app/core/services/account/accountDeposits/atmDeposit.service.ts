import { urlResources, HTTP_METHODS } from "@core/constants";
import {
  IDinResponseTransactionDone,
  IUnidirectionalTransaction,
} from "@core/interfaces";
import { http } from "../../generals";

export const atmDeposit = async (
  data: IUnidirectionalTransaction
): Promise<IDinResponseTransactionDone> => {
  const response: IDinResponseTransactionDone = await http({
    url: urlResources.atmDeposit,
    method: HTTP_METHODS.POST,
    data,
  });
  return response;
};
