import {
  IDinResponseTransactionDone,
  IUnidirectionalTransaction,
} from "@core/interfaces";
import { HTTP_METHODS, urlResources } from "@core/constants";
import { http } from "../../generals";

export const atmWithdraw = async (
  data: IUnidirectionalTransaction
): Promise<IDinResponseTransactionDone> => {
  const response: IDinResponseTransactionDone = await http({
    url: urlResources.atmWithdraw,
    method: HTTP_METHODS.POST,
    data,
  });
  return response;
};
