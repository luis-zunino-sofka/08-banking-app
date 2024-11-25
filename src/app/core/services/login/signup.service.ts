import { HTTP_METHODS, urlResources } from "@core/constants";
import { http } from "../generals/http";
import {
  IDinResponseRegisterUserResponse,
  IRegisterUserRequest,
} from "@core/interfaces";

export const signup = async (
  data: IRegisterUserRequest
): Promise<IDinResponseRegisterUserResponse> => {
  const response: IDinResponseRegisterUserResponse = await http({
    url: urlResources.signup,
    method: HTTP_METHODS.POST,
    data,
    credentials: "omit",
  });

  return response;
};
