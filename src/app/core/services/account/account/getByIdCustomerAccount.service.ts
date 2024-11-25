import { HTTP_METHODS, urlResources } from "@core/constants";
import {
  IDinResponseGetCustomerAccountResponse,
  IGetCustomerAccountRequest,
} from "@core/interfaces";
import { http } from "../..";

export const getByIdCustomerAccount = async (
  data: IGetCustomerAccountRequest
): Promise<IDinResponseGetCustomerAccountResponse> => {
  const url = urlResources.getByIdCustomerAccount;

  const response: IDinResponseGetCustomerAccountResponse = await http({
    url,
    method: HTTP_METHODS.GET,
    data,
  });

  return response;
};
