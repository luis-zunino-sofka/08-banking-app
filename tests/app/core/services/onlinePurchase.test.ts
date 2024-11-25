import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import {
  http,
  HTTPOptions,
} from "../../../../src/app/core/services/generals/http";
import { dinError, dinHeader } from ".";
import { urlResources } from "../../../../src/app/core/constants/urlResources";
import { HTTP_METHODS } from "../../../../src/app/core/constants/http-methods";
import { onlinePurchase } from "../../../../src/app/core/services/account/customerPurchases/onlinePurchase.service";
import {
  IUnidirectionalTransaction,
  IDinResponseTransactionDone,
} from "../../../../src/app/core/interfaces/account/transactions/index";

vi.mock("../../../../src/app/core/services/generals/http");

const mockData: IUnidirectionalTransaction = {
  customerId: "1234",
  accountId: "",
  amount: 0,
};

const mockCallHTTP: HTTPOptions = {
  method: HTTP_METHODS.POST,
  url: urlResources.onlinePurchase,
  data: { ...mockData },
};

const mockResponse: IDinResponseTransactionDone = {
  dinHeader,
  dinBody: {
    amount: 1000,
    transactionId: "",
    cost: 0,
    timestamp: "",
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

describe("onlinePurchase", () => {
  test("Tiene que llamar a un servicio de http, con metodo POST", async () => {
    (http as Mock).mockResolvedValue(mockResponse);
    const mockFn = vi.fn().mockImplementation(onlinePurchase);

    const data = await mockFn(mockData);

    expect(data).toEqual(mockResponse);
    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });

  test("onlinePurchase debe manejar un error cuando la respuesta es fallida", async () => {
    (http as Mock).mockResolvedValue(mockErrorResponse);

    const result = await onlinePurchase(mockData);

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
    expect(result).toEqual(mockErrorResponse);
  });

  test("onlinePurchase debe manejar un error de red", async () => {
    (http as Mock).mockRejectedValue(new Error("Error en la conexión"));

    await expect(onlinePurchase(mockData)).rejects.toThrow(
      "Error en la conexión"
    );

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });
});
