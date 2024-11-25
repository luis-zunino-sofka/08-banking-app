import { HTTP_METHODS, urlResources } from "@core/constants";
import {
  IDinResponseTransactionDone,
  IUnidirectionalTransaction,
} from "@core/interfaces";
import { http } from "@core/services";

export const phisicalPurchase = async (
  data: IUnidirectionalTransaction
): Promise<IDinResponseTransactionDone> => {
  const response: IDinResponseTransactionDone = await http({
    url: urlResources.phisicalPurchase,
    method: HTTP_METHODS.POST,
    data,
  });
  return response;
};
