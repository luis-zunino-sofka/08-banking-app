import { IGetAllCustomerAccountResponse } from "../../../../src/app/core/interfaces";
import { describe, expect, test } from "vitest";
import {
  globalBalanceActions,
  setGlobalBalance,
  setUserAccounts,
} from "../../../../src/app/core/state/globalBalance";

describe("Global Balance Actions", () => {
  describe("setGlobalBalance", () => {
    test("debe retornar una acción con el tipo SET_BALANCE y el payload correcto", () => {
      const mockData: number = 1000;

      const action = setGlobalBalance(mockData);

      expect(action.type).toBe(globalBalanceActions.SET_BALANCE);

      expect(action.payload).toEqual(mockData);
    });
  });

  describe("setUserAccounts", () => {
    test("debe retornar una acción con el tipo SET_USER_ACCOUNTS y payload correcto", () => {
      const mockData: IGetAllCustomerAccountResponse[] = [];
      const action = setUserAccounts(mockData);

      expect(action.type).toBe(globalBalanceActions.SET_USER_ACCOUNTS);
      expect(action.payload).toBe(mockData);
    });
  });
});
