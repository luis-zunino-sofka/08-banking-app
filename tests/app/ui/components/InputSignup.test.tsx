import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { FormProvider, useForm, UseFormRegisterReturn } from "react-hook-form";
import React, { ReactNode } from "react";
import { InputSignup } from "../../../../src/app/ui/components/singup/InputSignup";

export const renderWithReactHookForm = (
  ui: ReactNode,
  { defaultValues = {} } = {}
) => {
  const Wrapper = ({ children }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
};

describe("InputSignup", () => {
  const mockRegister: UseFormRegisterReturn<string> = {
    onChange: vi.fn(),
    onBlur: vi.fn(),
    name: "name",
    ref: vi.fn(),
  };

  const mockErrors = {};

  test("Match snapshoot", () => {
    const { asFragment } = render(
      <InputSignup
        register={mockRegister}
        name="name"
        type="name"
        label="Name"
        errors={mockErrors}
        placeHolder="Enter your name"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("debe realizar la entrada con la etiqueta y el marcador de posición correctos", () => {
    renderWithReactHookForm(
      <InputSignup
        register={mockRegister}
        name="name"
        type="name"
        label="Name:"
        errors={mockErrors}
        placeHolder="Enter your name"
      />,
      { defaultValues: {} }
    );
    expect(screen.getByText("Name:")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Enter your name")).toHaveAttribute(
      "type",
      "name"
    );
  });

  test("debe mostrar un mensaje de error cuando se pasan los errores", () => {
    const errors = { name: { message: "Email is required" } };

    renderWithReactHookForm(
      <InputSignup
        register={mockRegister}
        name="name"
        type="name"
        label="Name:"
        errors={errors}
        placeHolder="Enter your name"
      />,
      { defaultValues: {} }
    );

    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  test("debe llamar a la función de registro en el cambio de entrada", () => {
    renderWithReactHookForm(
      <InputSignup
        register={mockRegister}
        name="name"
        type="name"
        label="Name:"
        errors={mockErrors}
        placeHolder="Enter your name"
      />,
      { defaultValues: {} }
    );

    const inputElement = screen.getByPlaceholderText("Enter your name");
    fireEvent.change(inputElement, { target: { value: "test@example.com" } });

    expect(mockRegister.onChange).toHaveBeenCalled();
  });

  test("no debe mostrar un mensaje de error cuando no se pasan errores", () => {
    renderWithReactHookForm(
      <InputSignup
        register={mockRegister}
        name="name"
        type="name"
        label="Email"
        errors={mockErrors}
        placeHolder="Enter your name"
      />
    );

    expect(screen.queryByText("Email is required")).toBeNull();
  });

  test("debe guardar el valor cuando se le ingresa un valor en el input", async () => {
    renderWithReactHookForm(
      <InputSignup
        register={mockRegister}
        name="name"
        type="name"
        label="Name:"
        errors={mockErrors}
        placeHolder="Enter your name"
      />,
      { defaultValues: {} }
    );
    const nombre = screen.getByRole("textbox", { name: "Name:" });

    fireEvent.change(nombre, {
      target: { value: "Pepe" },
    });

    expect(nombre).toHaveValue("Pepe");
  });
});
