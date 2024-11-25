import { HTTP_METHODS, urlResources } from "@core/constants";
import {
  IDepositToExternalAccountRequest,
  IDinResponseDepositToExternalAccountResponse,
} from "@core/interfaces";
import { http } from "../../generals";

export const externalDeposits = async (
  data: IDepositToExternalAccountRequest
): Promise<IDinResponseDepositToExternalAccountResponse> => {
  const response: IDinResponseDepositToExternalAccountResponse = await http({
    url: urlResources.externalDeposits,
    method: HTTP_METHODS.POST,
    data,
  });
  return response;
};
