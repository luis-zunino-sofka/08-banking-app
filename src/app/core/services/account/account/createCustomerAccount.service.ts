import {
  ICreateCustomerAccountRequest,
  IDinResponseCreateCustomerAccountResponse,
} from "@core/interfaces";
import { http } from "../../generals";
import { HTTP_METHODS, urlResources } from "@core/constants";

export const createCustomerAccount = async (
  data: ICreateCustomerAccountRequest
): Promise<IDinResponseCreateCustomerAccountResponse> => {
  const response: IDinResponseCreateCustomerAccountResponse = await http({
    url: urlResources.createCustomerAccount,
    method: HTTP_METHODS.POST,
    data,
  });
  return response;
};
