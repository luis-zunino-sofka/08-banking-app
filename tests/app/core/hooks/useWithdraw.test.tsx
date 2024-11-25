import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useWithdrawDashboard } from "../../../../src/app/core/hooks";
import { useAccountContext } from "../../../../src/app/core/state/context/account/AccountContext";
import toast from "react-hot-toast";

vi.mock(import("react-hot-toast"));
vi.mock(
  "../../../../src/app/core/services/account/accountWithdrawals/atmWithdraw.service"
);
vi.mock("react-hook-form", () => ({
  useForm: vi.fn(),
}));

const mockFunction = vi.fn();
const mockHandleSubmit = vi.fn((mockData) => mockData);
const mockRegister = vi.fn();
const mockData = {
  amount: 100,
  accountNumberToWithdraw: "1",
  // customerId: "null",
};

vi.mock("../../../../src/app/core/state/context/account", () => ({
  useAccountContext: () => ({
    accounts: [mockData],
  }),
  useAccountProvider: () => ({
    accounts: [mockData],
    state: {
      balance: 5000,
      accounts: [mockData],
    },
  }),
}));

describe("useWithdrawDashboard", () => {
  vi.mock("react-hook-form", () => ({
    useForm: () => ({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      formState: { errors: {} },
      onSubmit: vi.fn(),
      getValues: () => [mockData],
    }),
  }));

  test("debe devolver los valores esperados", () => {
    const { result } = renderHook(() => useWithdrawDashboard());

    expect(result.current.register).toBe(mockRegister);
    expect(result.current.handleSubmit).toBe(mockHandleSubmit);
    expect(result.current.accounts).toEqual([mockData]);
  });

  test("debería retornar las cuentas desde el contexto", () => {
    const mockFn = vi.fn().mockImplementation(useAccountContext);
    mockFn.mockReturnValue({ accounts: [mockData] });
    const { result } = renderHook(() => useWithdrawDashboard());

    expect(result.current.accounts).toEqual([mockData]);
  });

  test("debe mostrar un toast de error cuando el retiro falla", async () => {
    const { result } = renderHook(() => useWithdrawDashboard());
    mockFunction.mockImplementationOnce(() => {
      return { dinError: { detail: "Error en el retiro" } };
    });

    waitFor(() => {
      result.current.handleSubmit(result.current.onSubmit)(mockData);
    });

    waitFor(() => {
      expect(toast).toHaveBeenCalledWith("Error en el retiro");
    });
  });
});
