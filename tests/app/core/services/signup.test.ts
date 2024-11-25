import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import {
  http,
  HTTPOptions,
} from "../../../../src/app/core/services/generals/http";
import { dinError, dinHeader } from ".";
import { urlResources } from "../../../../src/app/core/constants/urlResources";
import { HTTP_METHODS } from "../../../../src/app/core/constants/http-methods";
import {
  IRegisterUserRequest,
  IDinResponseRegisterUserResponse,
} from "../../../../src/app/core/interfaces/forms/register/registerUserRequest.interface";
import { signup } from "../../../../src/app/core/services/login/signup.service";

vi.mock("../../../../src/app/core/services/generals/http");

const mockData: IRegisterUserRequest = {
  firstName: "Pepe",
  lastName: "Pepe",
  encryptedIdentification: "dni encryptado",
  username: "pepe_pepe",
  encryptedPassword: "contraseña encryptada",
};

const mockCallHTTP: HTTPOptions = {
  method: HTTP_METHODS.POST,
  url: urlResources.signup,
  data: { ...mockData },
  credentials: "omit",
};

const mockResponse: IDinResponseRegisterUserResponse = {
  dinHeader,
  dinBody: {
    customerId: "",
  },

  dinError,
};

const mockErrorResponse = {
  dinBody: null,
  dinError: {
    detail: "Error",
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("signup", () => {
  test("Tiene que llamar a un servicio de http, con metodo POST", async () => {
    (http as Mock).mockResolvedValue(mockResponse);
    const mockFn = vi.fn().mockImplementation(signup);

    const data = await mockFn(mockData);

    expect(data).toEqual(mockResponse);
    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });

  test("signup debe manejar un error cuando la respuesta es fallida", async () => {
    (http as Mock).mockResolvedValue(mockErrorResponse);

    const result = await signup(mockData);

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
    expect(result).toEqual(mockErrorResponse);
  });

  test("signup debe manejar un error de red", async () => {
    (http as Mock).mockRejectedValue(new Error("Error en la conexión"));

    await expect(signup(mockData)).rejects.toThrow("Error en la conexión");

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });
});
