import { beforeEach, describe, expect, test, vi } from "vitest";
import { configure, renderHook } from "@testing-library/react";
import { EPurchaseType } from "../../../../src/app/core/types";
import { usePurchase } from "../../../../src/app/core/hooks";

configure({ reactStrictMode: true });

vi.mock("react-hot-toast", () => ({
  toast: vi.fn(),
}));

vi.mock("@core/constants", () => ({
  localStorageProperties: {
    customerId: "customerId",
  },
}));

global.localStorage.getItem = vi.fn().mockReturnValue("customer123");

vi.mock(import("react-hot-toast"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
  };
});

describe("usePurchase hook", () => {
  const mockData = {
    purchaseAmount: 500,
    purchaseType: EPurchaseType.PHYSICAL,
    accountId: "1",
  };

  const mockAccounts = [{ accountId: "1", balance: 1000 }];
  const mockRefetchAccounts = vi.fn();

  beforeEach(() => {
    vi.mock("react-hook-form", () => ({
      useForm: () => ({
        register: (name) => ({
          name,
          value: mockData,
          validate: () => true,
        }),
        handleSubmit: (fn) => (event) => {
          fn(event);
        },
        formState: { errors: {} },
      }),
    }));

    vi.mock("@core/state", () => ({
      useAccountContext: vi.fn(() => {
        return { accounts: mockAccounts, refetchAccounts: mockRefetchAccounts };
      }),
    }));

    vi.clearAllMocks();
  });

  test("debe devolver los valores esperados", () => {
    const { result } = renderHook(() => usePurchase());
    const { current } = result;

    expect(current.isLoading).toBe(false);
    expect(current.accounts).toEqual([]);
    expect(current.register).toBeDefined();
    expect(current.onSubmit).toBeDefined();
    expect(current.handleSubmit).toBeDefined();
    expect(current.errors).toEqual({});
  });
});
