import { HTTP_METHODS, urlResources } from "@core/constants";
import { http } from "../generals/http";
import {
  IDinResponseLoginResponse,
  ILoginRequest,
} from "@core/interfaces/forms/login";

export const login = async (
  data: ILoginRequest
): Promise<IDinResponseLoginResponse> => {
  const response: IDinResponseLoginResponse = await http({
    url: urlResources.login,
    method: HTTP_METHODS.POST,
    data,
    credentials: "omit",
  });

  return response;
};
