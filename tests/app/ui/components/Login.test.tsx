import {
  afterEach,
  beforeEach,
  describe,
  expect,
  Mock,
  test,
  vi,
} from "vitest";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { Login } from "../../../../src/app/ui/components/login";
import { AccountContextMock } from "../containers/AppContainer.test";
import { mockAccountState, mockAppState } from "../../../mocks/dataMocked";
import { encryptAES } from "../../../../src/app/core/utils/encryptAES.utils";

vi.mock("@core/hooks", () => ({
  useLogin: vi.fn(),
}));

const Wrapper = () => (
  <AccountContextMock
    mockAppState={mockAppState}
    children={<Login saveLoginData={mockSaveLoginData} />}
    mockAccountState={mockAccountState}
  />
);

let mockSaveLoginData: Mock;
let mockOnSubmit: Mock;
let mockHandleSubmit: Mock;

describe("Login Component", () => {
  beforeEach(() => {
    mockSaveLoginData = vi.fn();
    mockOnSubmit = vi.fn();
    mockHandleSubmit = vi.fn();

    vi.mock("@core/hooks", () => ({
      useSignup: () => ({
        isLoading: false,
        errors: {
          username: { message: "El nombre es obligatorio" },
          password: { message: "La contraseña es obligatoria" },
        },
        onSubmit: mockOnSubmit,
        register: vi.fn(),
        handleSubmit: mockHandleSubmit,
      }),
    }));

    render(<Wrapper />);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Match snapshoot", () => {
    const { asFragment } = render(<Wrapper />);
    expect(asFragment()).toMatchSnapshot();
  });

  test(" debe renderizar el formulario correctamente", () => {
    screen.getByRole("heading", { level: 2, name: /^Iniciar sesión$/i });
    screen.getByLabelText(/Nombre de usuario/i);
    screen.getByLabelText(/Contraseña/i);
    screen.getByRole("button", { name: /^Iniciar sesión$/i });
    screen.getByRole("link", { name: /Regístrate aquí/i });
    screen.getByText(/¿No tienes cuenta?/i);
  });

  test(" debe mostrar errores de validación", async () => {
    const submitButton = screen.getByRole("button", {
      name: /^Iniciar sesión$/i,
    });
    const nombre = screen.getByPlaceholderText(/^Nombre de usuario$/i);
    const password = screen.getByPlaceholderText(/^Contraseña$/i);

    fireEvent.change(nombre, {
      target: { value: "Pepe" },
    });

    fireEvent.change(password, {
      target: { value: "1" },
    });

    await waitFor(() => fireEvent.click(submitButton));

    expect(nombre).toHaveValue("Pepe");
    expect(password).toHaveValue("1");

    await waitFor(() =>
      screen.getByText("La contraseña debe tener al menos 6 caracteres")
    );

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("debe llamar a onSubmit cuando el formulario es válido", async () => {
    const usernameInput = screen.getByLabelText("Nombre de usuario:");
    const passwordInput = screen.getByLabelText("Contraseña:");
    const submitButton = screen.getByRole("button", {
      name: /^Iniciar sesión$/i,
    });

    waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: "juanperez" } });
      fireEvent.change(passwordInput, {
        target: { value: encryptAES("123456") },
      });
    });

    expect(usernameInput).toHaveValue("juanperez");
    expect(passwordInput).toHaveValue("diaFFu/2IHVSQj17PI1amg==");

    waitFor(() => fireEvent.click(submitButton));
    waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  test(" debe llamar a saveLoginData al hacer submit exitoso", async () => {
    const usernameInput = screen.getByLabelText("Nombre de usuario:");
    const passwordInput = screen.getByLabelText("Contraseña:");
    const submitButton = screen.getByRole("button", {
      name: /^Iniciar sesión$/i,
    });

    const mockfn = vi.fn().mockImplementation(encryptAES);
    waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: "juanperez" } });
      fireEvent.change(passwordInput, {
        target: { value: mockfn("123456") },
      });
    });

    await waitFor(() => fireEvent.click(submitButton));

    expect(usernameInput).toHaveValue("juanperez");
    expect(passwordInput).toHaveValue("diaFFu/2IHVSQj17PI1amg==");
    waitFor(() => expect(mockOnSubmit).toBeCalled());
  });

  test('debe redirigir al registro cuando se hace clic en "Regístrate aquí"', () => {
    const registerLink = screen.getByRole("link", { name: /Regístrate aquí/i });
    expect(registerLink).toHaveAttribute("href", "/sign-up");
  });
});
