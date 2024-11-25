import { renderHook } from "@testing-library/react";
import { describe, expect, expectTypeOf, test } from "vitest";
import useDeposit from "../../../../src/app/core/hooks/dashboard/deposit/useDeposit";

describe("deposit hooks", () => {
  test("debe ejecutar useDeposit exitoso", async () => {
    const { result } = renderHook(() => useDeposit());
    const { current } = result;

    expect(current.isLoading).toBe(false);
    expect(current.isAccountSelected).toBe(false);
    expect(current.accounts).toStrictEqual([]);
    expect(current.errors).toStrictEqual({});

    expectTypeOf(current.watch).toBeFunction();
    expectTypeOf(current.handleSubmit).toBeFunction();
    expectTypeOf(current.register).toBeFunction();
    expectTypeOf(current.onSubmit).toBeFunction();
  });
});
