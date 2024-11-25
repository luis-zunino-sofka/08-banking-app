import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import {
  http,
  HTTPOptions,
} from "../../../../src/app/core/services/generals/http";
import { dinError, dinHeader } from ".";
import { urlResources } from "../../../../src/app/core/constants/urlResources";
import { IDinResponseGetCustomerAccountResponse } from "../../../../src/app/core/interfaces/account/index";
import { getByIdCustomerAccount } from "../../../../src/app/core/services/account/account/getByIdCustomerAccount.service";
import { IGetCustomerAccountRequest } from "../../../../src/app/core/interfaces/account/index";

vi.mock("../../../../src/app/core/services/generals/http");

const mockData: IGetCustomerAccountRequest = {
  customerId: "1234",
  accountId: "",
};

const mockCallHTTP: HTTPOptions = {
  method: "GET",
  url: urlResources.getByIdCustomerAccount,
  data: { ...mockData },
};

const mockResponse: IDinResponseGetCustomerAccountResponse = {
  dinHeader,
  dinBody: {
    accountId: "123456",
    encryptedNumber: "",
    amount: 1000,
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

describe("getByIdCustomerAccount", () => {
  test("Tiene que llamar a un servicio de http, con metodo GET", async () => {
    (http as Mock).mockResolvedValue(mockResponse);
    const mockFn = vi.fn().mockImplementation(getByIdCustomerAccount);

    const data = await mockFn(mockData);

    expect(data).toEqual(mockResponse);
    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });

  test("getByIdCustomerAccount debe manejar un error cuando la respuesta es fallida", async () => {
    (http as Mock).mockResolvedValue(mockErrorResponse);

    const result = await getByIdCustomerAccount(mockData);

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
    expect(result).toEqual(mockErrorResponse);
  });

  test("getByIdCustomerAccount debe manejar un error de red", async () => {
    (http as Mock).mockRejectedValue(new Error("Error en la conexión"));

    await expect(getByIdCustomerAccount(mockData)).rejects.toThrow(
      "Error en la conexión"
    );

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });
});
