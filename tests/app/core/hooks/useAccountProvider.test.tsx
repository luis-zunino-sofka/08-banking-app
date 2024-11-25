import {
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  Mock,
  test,
  vi,
} from "vitest";
import { useAccountProvider } from "../../../../src/app/core/hooks/accountProvider/useAccountProvider";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { AccountContextMock } from "../../ui/containers/AppContainer.test";
import { mockAccountState, mockAppState } from "../../../mocks/dataMocked";
import { getAllCustomerAccount } from "../../../../src/app/core/services/account/account/getAllCustomerAccount.service";

const wrapper = ({ children }) => (
  <AccountContextMock
    mockAppState={mockAppState}
    mockAccountState={mockAccountState}
  >
    {children}
  </AccountContextMock>
);
vi.mock("../../../../src/app/core/state/context/account/AccountContext");

vi.mock(
  "../../../../src/app/core/services/account/account/getAllCustomerAccount.service"
);

const mockDispatch = vi.fn();

describe("useAccountProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.localStorage.setItem("customerId", "123");

    mockDispatch.mockClear();
    (getAllCustomerAccount as Mock).mockClear();
  });

  test("debe ejecutar useAccountProvider exitoso", () => {
    const { result } = renderHook(() => useAccountProvider(), { wrapper });
    const { current } = result;
    waitFor(() => {
      expect(current.state).toStrictEqual({});
      expect(current.accounts).toStrictEqual([]);
      expect(current.isRefechingAccounts).toStrictEqual(true);
      expectTypeOf(current.refetchAccounts).toBeFunction();
      expect(current.refetchAccounts).toBeDefined();
    });
  });
});
