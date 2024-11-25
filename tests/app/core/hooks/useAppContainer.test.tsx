import { beforeEach, describe, expect, expectTypeOf, test, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAppContainer } from "../../../../src/app/core/hooks/appContainer/useAppContainer";
import {
  IContext,
  IState,
} from "../../../../src/app/core/interfaces/state/state.interface";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AccountContext } from "../../../../src/app/core/state/context";
import { AppContext } from "../../../../src/app/core/state/AppContext";
import { mockAccountState } from "../../../mocks/dataMocked";

vi.mock("react-router-dom");

vi.mock("@core/context/AccountContext", () => ({
  useAccountContext: vi.fn(),
}));

vi.mock("@core/context/AppContext", () => ({
  useAppContext: vi.fn(),
}));

const mockState: IState = {
  loginData: {
    token: "token",
    customerId: "123",
    username: "Pepe",
  },
  balance: 0,
  accounts: [],
};

describe("useAppContainer", () => {
  const mockDispatch = vi.fn();
  const mockRefetchAccounts = vi.fn();
  const mockNavigate = vi.fn();

  const appWrapper = ({ children }) => (
    <AppContext.Provider
      value={{
        state: mockState,
        dispatch: mockDispatch,
        balance: 10,
      }}
    >
      <AccountContext.Provider value={{ ...mockAccountState }}>
        {children}
      </AccountContext.Provider>
    </AppContext.Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mock("@core/state", () => ({
      useAccountContext: () => ({
        refetchAccounts: mockRefetchAccounts,
      }),
    }));

    vi.mock("@core/state/AppContext", () => ({
      useAppContext: (): IContext => ({
        state: mockState,
        dispatch: mockDispatch,
      }),
    }));

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  test("debe ejecutar useAppContainer exitoso", async () => {
    const { result } = renderHook(() => useAppContainer(), {
      wrapper: appWrapper,
    });
    const { current } = result;

    expect(current.state).toStrictEqual({ ...mockState });

    expectTypeOf(current.refetchAccounts).toBeFunction();
  });

  test("debe devolver el estado y handleLogout", () => {
    const { result } = renderHook(() => useAppContainer());
    const { current } = result;

    expect(current.refetchAccounts).toBeDefined();
    expectTypeOf(current.refetchAccounts).toBeFunction();
    expect(current.state).toEqual({});
  });
});
