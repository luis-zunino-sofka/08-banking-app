import { describe, expect, expectTypeOf, test } from "vitest";
import { useCreateBankAccount } from "../../../../src/app/core/hooks/dashboard/account/useCreateBankAccount";
import { renderHook } from "@testing-library/react";

describe("useCreateBankAccount hooks", () => {
  test("debe ejecutar useCreateBankAccount exitoso", async () => {
    const { result } = renderHook(() => useCreateBankAccount());
    const { current } = result;

    expect(current.isLoading).toBe(false);
    expect(current.accounts).toStrictEqual([]);
    expect(current.errors).toStrictEqual({});

    expectTypeOf(current.handleSubmit).toBeFunction();
    expectTypeOf(current.register).toBeFunction();
    expectTypeOf(current.onSubmit).toBeFunction();
  });
});
