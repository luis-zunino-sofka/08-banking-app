import { vi, test, expect, beforeEach, describe, Mock } from "vitest";
import {
  IDinResponseCreateCustomerAccountResponse,
  ICreateCustomerAccountRequest,
} from "../../../../src/app/core/interfaces/account/index";
import {
  http,
  HTTPOptions,
} from "../../../../src/app/core/services/generals/http";
import { createCustomerAccount } from "../../../../src/app/core/services/account/account/createCustomerAccount.service";
import { dinError, dinHeader } from ".";
import { urlResources } from "../../../../src/app/core/constants/urlResources";
import { HTTP_METHODS } from "../../../../src/app/core/constants/http-methods";

vi.mock("../../../../src/app/core/services/generals/http");

const mockData: ICreateCustomerAccountRequest = {
  customerId: "1234",
  amount: 1000,
};

const mockCallHTTP: HTTPOptions = {
  method: HTTP_METHODS.POST,
  url: urlResources.createCustomerAccount,
  data: { ...mockData },
};

const mockResponse: IDinResponseCreateCustomerAccountResponse = {
  dinHeader,
  dinBody: {
    accountId: "5678",
    encryptedNumber: "encryptedNumber",
    amount: 1000,
  },
  dinError,
};

const mockErrorResponse = {
  dinBody: null,
  dinError: {
    detail: "Error en la creación de la cuenta",
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("createCustomerAccount", () => {
  test("Tiene que llamar a un servicio de http, con metodo POST", async () => {
    (http as Mock).mockResolvedValue(mockResponse);
    const mockFn = vi.fn().mockImplementation(createCustomerAccount);

    const data = await mockFn(mockData);

    expect(data).toEqual(mockResponse);
    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });

  test("createCustomerAccount debe manejar un error cuando la respuesta es fallida", async () => {
    (http as Mock).mockResolvedValue(mockErrorResponse);

    const result = await createCustomerAccount(mockData);

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
    expect(result).toEqual(mockErrorResponse);
  });

  test("createCustomerAccount debe manejar un error de red", async () => {
    (http as Mock).mockRejectedValue(new Error("Error en la conexión"));

    await expect(createCustomerAccount(mockData)).rejects.toThrow(
      "Error en la conexión"
    );

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });
});
