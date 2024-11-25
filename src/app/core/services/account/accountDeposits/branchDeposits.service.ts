import { HTTP_METHODS, urlResources } from "@core/constants";
import {
  IDinResponseTransactionDone,
  IUnidirectionalTransaction,
} from "@core/interfaces";
import { http } from "@core/services";

export const branchDeposits = async (
  data: IUnidirectionalTransaction
): Promise<IDinResponseTransactionDone> => {
  const response: IDinResponseTransactionDone = await http({
    url: urlResources.branchDeposits,
    method: HTTP_METHODS.POST,
    data,
  });
  return response;
};
