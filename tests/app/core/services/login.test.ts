import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import {
  http,
  HTTPOptions,
} from "../../../../src/app/core/services/generals/http";
import { dinError, dinHeader } from ".";
import { urlResources } from "../../../../src/app/core/constants/urlResources";
import {
  ILoginRequest,
  IDinResponseLoginResponse,
} from "../../../../src/app/core/interfaces/forms/login/index";
import { login } from "../../../../src/app/core/services/login/login.service";
import { HTTP_METHODS } from "../../../../src/app/core/constants/http-methods";

vi.mock("../../../../src/app/core/services/generals/http");

const mockData: ILoginRequest = {
  username: "Pepe",
  encryptedPassword: "contraseñaDePepeEncryptada",
};

const mockCallHTTP: HTTPOptions = {
  method: HTTP_METHODS.POST,
  url: urlResources.login,
  data: { ...mockData },
  credentials: "omit",
};

const mockResponse: IDinResponseLoginResponse = {
  dinHeader,
  dinBody: {
    token: "token",
    customerId: "123456",
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

describe("login", () => {
  test("Tiene que llamar a un servicio de http, con metodo GET", async () => {
    (http as Mock).mockResolvedValue(mockResponse);
    const mockFn = vi.fn().mockImplementation(login);

    const data = await mockFn(mockData);

    expect(data).toEqual(mockResponse);
    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });

  test("login debe manejar un error cuando la respuesta es fallida", async () => {
    (http as Mock).mockResolvedValue(mockErrorResponse);

    const result = await login(mockData);

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
    expect(result).toEqual(mockErrorResponse);
  });

  test("login debe manejar un error de red", async () => {
    (http as Mock).mockRejectedValue(new Error("Error en la conexión"));

    await expect(login(mockData)).rejects.toThrow("Error en la conexión");

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });
});
