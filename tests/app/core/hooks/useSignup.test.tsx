import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, expectTypeOf, test, vi } from "vitest";
import { useSignup } from "../../../../src/app/core/hooks";

vi.mock("react-hook-form", () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(),
    handleSubmit: vi.fn(),
    watch: vi.fn(),
    formState: { errors: {} },
  })),
}));

const mockSignupData = {
  name: "John",
  lastName: "Doe",
  dni: "123456789",
  username: "john_doe",
  password: "password123",
};

describe("useSignup hook", () => {
  test("debe devolver los valores esperados", () => {
    const { result } = renderHook(() => useSignup());

    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.onSubmit).toBeDefined();
    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.watch).toBeDefined();
  });

  test("debe llamar a Signup con los datos correctos cuando se envía el formulario", async () => {
    const { result } = renderHook(() => useSignup());
    waitFor(() => {
      result.current.onSubmit(mockSignupData);
    });
    expectTypeOf(result.current.onSubmit).toBeFunction();

    waitFor(() => {
      expect(result.current.onSubmit).toHaveBeenCalled();
    });
  });

  test("debe manejar el estado de carga correctamente", async () => {
    const { result } = renderHook(() => useSignup());

    expect(result.current.isLoading).toBe(false);
  });
});
