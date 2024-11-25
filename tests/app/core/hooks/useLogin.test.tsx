import { renderHook } from "@testing-library/react";
import { describe, expect, expectTypeOf, test, vi } from "vitest";
import { useLogin } from "../../../../src/app/core/hooks/login/useLogin";

vi.mock("../../../../src/app/core/services/login/login.service");

describe("useLogin", () => {
  const saveLoginData = vi.fn();

  test("debe ejecutar login exitoso", async () => {
    const { result } = renderHook(() => useLogin(saveLoginData));
    const { current } = result;

    expect(current.errors).toEqual({});
    expectTypeOf(current.handleSubmit).toBeFunction();
    expect(current.isLoading).toEqual(false);
    expectTypeOf(current.onSubmit).toBeFunction();
    expectTypeOf(current.register).toBeFunction();
  });
});
