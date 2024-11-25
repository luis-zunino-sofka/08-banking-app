import { HTTP_METHODS, urlResources } from "@core/constants";
import {
  IDinResponseGetAllCustomerAccountResponse,
  IGetAllCustomerAccountRequest,
} from "@core/interfaces";
import { http } from "../..";

export const getAllCustomerAccount = async (
  data: IGetAllCustomerAccountRequest
): Promise<IDinResponseGetAllCustomerAccountResponse> => {
  const url = urlResources.getAllCustomerAccount;

  const response: IDinResponseGetAllCustomerAccountResponse = await http({
    url,
    method: HTTP_METHODS.POST,
    data: data,
  });

  return response;
};
