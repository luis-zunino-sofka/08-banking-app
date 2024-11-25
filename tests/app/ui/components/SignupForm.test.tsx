import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { SignupForm } from "../../../../src/app/ui/components/singup";
import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import React from "react";
import "@testing-library/jest-dom";
import { mockAccountState, mockAppState } from "../../../mocks/dataMocked";
import { AccountContextMock } from "../containers/AppContainer.test";
import { FormProvider, useForm } from "react-hook-form";

vi.mock("react-hot-toast");

export function renderWithReactHookForm(ui, { defaultValues = {} } = {}) {
  const Wrapper = ({ children }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}

describe("SignupForm", () => {
  let mockOnSubmit: Mock;
  let mockHandleSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit = vi.fn((data) => console.log(data));
    mockHandleSubmit = vi.fn((fn) => fn(mockOnSubmit));

    renderWithReactHookForm(
      <AccountContextMock
        mockAppState={mockAppState}
        children={<SignupForm />}
        mockAccountState={mockAccountState}
      />
    );
  });

  test("Match snapshoot", () => {
    const { asFragment } = render(
      <AccountContextMock
        mockAppState={mockAppState}
        children={<SignupForm />}
        mockAccountState={mockAccountState}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("debe renderear el formulario correctamente", () => {
    screen.getByText(/Nombre:/i);
    screen.getByText(/Apellido:/i);
    screen.getByText(/DNI:/i);
    screen.getByText(/Nombre de usuario:/i);
    screen.getByText(/Confirmar contraseña:/i);
    screen.getByText(/^Contraseña:$/i);
    screen.getByText(/Registrarse/i);
    screen.getByText(/¿Ya tienes cuenta?/i);
  });

  test("debe mostrar validaciones si no hay campos completos", async () => {
    const submitButton = screen.getByText("Registrarse");
    await waitFor(() => fireEvent.click(submitButton));
    const nombre = screen.getByPlaceholderText(/^Ingrese su nombre$/i);
    const apellido = screen.getByPlaceholderText(/^Ingrese su apellido$/i);
    const dni = screen.getByPlaceholderText(/Ingrese su dni/i);
    const username = screen.getByPlaceholderText(
      /Ingrese su nombre de usuario/i
    );
    const password = screen.getByPlaceholderText(/^Contraseña$/i);
    const confirmPassword =
      screen.getByPlaceholderText(/Confirmar contraseña/i);

    expect(nombre).toHaveValue("");
    expect(apellido).toHaveValue("");
    expect(dni).toHaveValue("");
    expect(username).toHaveValue("");
    expect(password).toHaveValue("");
    expect(confirmPassword).toHaveValue("");

    screen.findAllByText("El nombre es obligatorio");
    screen.findAllByText("El apellido es obligatorio");
    screen.findAllByText("El DNI es obligatorio");
    screen.findAllByText("El nombre de usuario es obligatorio");
    screen.findAllByText("La contraseña es obligatoria");
    screen.findAllByText("La confirmación de la contraseña es obligatoria");

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("puede llamar al onsubmit cuando esta validado", async () => {
    const nombre = screen.getByPlaceholderText(/^Ingrese su nombre$/i);
    const apellido = screen.getByPlaceholderText(/^Ingrese su apellido$/i);
    const dni = screen.getByPlaceholderText(/Ingrese su dni/i);
    const username = screen.getByPlaceholderText(
      /Ingrese su nombre de usuario/i
    );
    const password = screen.getByPlaceholderText(/^Contraseña$/i);
    const confirmPassword =
      screen.getByPlaceholderText(/Confirmar contraseña/i);
    waitFor(() => {
      fireEvent.change(nombre, {
        target: { value: "Pepe" },
      });
      fireEvent.change(apellido, {
        target: { value: "Pérez" },
      });
      fireEvent.change(dni, {
        target: { value: "12345678" },
      });
      fireEvent.change(username, {
        target: { value: "pepeperez" },
      });
      fireEvent.change(password, {
        target: { value: "123456" },
      });
      fireEvent.change(confirmPassword, {
        target: { value: "123456" },
      });
    });
    expect(nombre).toHaveValue("Pepe");
    expect(apellido).toHaveValue("Pérez");
    expect(dni).toHaveValue("12345678");
    expect(username).toHaveValue("pepeperez");
    expect(password).toHaveValue("123456");
    expect(confirmPassword).toHaveValue("123456");
    const submitButton = screen.getByText("Registrarse");
    waitFor(() => fireEvent.click(submitButton));

    waitFor(() => expect(submitButton).toBeDisabled());

    waitFor(() => expect(mockHandleSubmit).toHaveBeenCalled());
  });

  test("debe mostrar errores si las contraseñas no coinciden", async () => {
    act(() => {
      fireEvent.input(screen.getByPlaceholderText(/^Contraseña$/i), {
        target: { value: "123456" },
      });
      fireEvent.input(screen.getByPlaceholderText(/Confirmar contraseña/i), {
        target: { value: "654321" },
      });
    });
    const submitButton = screen.getByText("Registrarse");
    await waitFor(() => fireEvent.click(submitButton));

    await waitFor(() => screen.getByText("Las contraseñas no coinciden"));
  });

  test('debe redirigir a inicio de sesion cuando se hace clic en "Inicia sesión aquí"', () => {
    const registerLink = screen.getByRole("link", {
      name: /Inicia sesión aquí/i,
    });
    expect(registerLink).toHaveAttribute("href", "/");
  });
});
