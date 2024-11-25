import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import {
  http,
  HTTPOptions,
} from "../../../../src/app/core/services/generals/http";
import { dinError, dinHeader } from ".";
import { urlResources } from "../../../../src/app/core/constants/urlResources";
import {
  IGetAllCustomerAccountRequest,
  IDinResponseGetAllCustomerAccountResponse,
} from "../../../../src/app/core/interfaces/account/index";
import { getAllCustomerAccount } from "../../../../src/app/core/services/account/account/getAllCustomerAccount.service";
import { HTTP_METHODS } from "../../../../src/app/core/constants/http-methods";

vi.mock("../../../../src/app/core/services/generals/http");

const mockData: IGetAllCustomerAccountRequest = {
  customerId: "1234",
};

const mockCallHTTP: HTTPOptions = {
  method: HTTP_METHODS.POST,
  url: urlResources.getAllCustomerAccount,
  data: { ...mockData },
};

const mockResponse: IDinResponseGetAllCustomerAccountResponse = {
  dinHeader,
  dinBody: [
    {
      accountId: "123456",
      encryptedNumber: "",
      amount: 1000,
      username: "", // Esto no va, lo pongo para que no me pise los tipos
    },
  ],
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

describe("getAllCustomerAccount", () => {
  test("Tiene que llamar a un servicio de http, con metodo POST", async () => {
    (http as Mock).mockResolvedValue(mockResponse);
    const mockFn = vi.fn().mockImplementation(getAllCustomerAccount);

    const data = await mockFn(mockData);

    expect(data).toEqual(mockResponse);
    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });

  test("getAllCustomerAccount debe manejar un error cuando la respuesta es fallida", async () => {
    (http as Mock).mockResolvedValue(mockErrorResponse);

    const result = await getAllCustomerAccount(mockData);

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
    expect(result).toEqual(mockErrorResponse);
  });

  test("getAllCustomerAccount debe manejar un error de red", async () => {
    (http as Mock).mockRejectedValue(new Error("Error en la conexión"));

    await expect(getAllCustomerAccount(mockData)).rejects.toThrow(
      "Error en la conexión"
    );

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });
});
