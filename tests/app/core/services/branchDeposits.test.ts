import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import {
  http,
  HTTPOptions,
} from "../../../../src/app/core/services/generals/http";
import {
  IUnidirectionalTransaction,
  IDinResponseTransactionDone,
} from "../../../../src/app/core/interfaces/account/transactions/index";
import { branchDeposits } from "../../../../src/app/core/services/account/accountDeposits/branchDeposits.service";
import { dinError, dinHeader } from ".";
import { urlResources } from "../../../../src/app/core/constants/urlResources";
import { HTTP_METHODS } from "../../../../src/app/core/constants/http-methods";

vi.mock("../../../../src/app/core/services/generals/http");

const mockData: IUnidirectionalTransaction = {
  customerId: "1234",
  amount: 1000,
  accountId: "4567",
};

const mockCallHTTP: HTTPOptions = {
  method: HTTP_METHODS.POST,
  url: urlResources.branchDeposits,
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

describe("branchDeposits", () => {
  test("Tiene que llamar a un servicio de http, con metodo POST", async () => {
    (http as Mock).mockResolvedValue(mockResponse);
    const mockFn = vi.fn().mockImplementation(branchDeposits);

    const data = await mockFn(mockData);

    expect(data).toEqual(mockResponse);
    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });

  test("branchDeposits debe manejar un error cuando la respuesta es fallida", async () => {
    (http as Mock).mockResolvedValue(mockErrorResponse);

    const result = await branchDeposits(mockData);

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
    expect(result).toEqual(mockErrorResponse);
  });

  test("branchDeposits debe manejar un error de red", async () => {
    (http as Mock).mockRejectedValue(new Error("Error en la conexión"));

    await expect(branchDeposits(mockData)).rejects.toThrow(
      "Error en la conexión"
    );

    expect(http).toHaveBeenCalledWith(mockCallHTTP);
  });
});
