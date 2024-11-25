import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import React from "react";
import { CreateBankAccount } from "../../../../src/app/ui/components/account";
import { AccountContextMock } from "../containers/AppContainer.test";
import "@testing-library/jest-dom";
import { mockAccountState, mockAppState } from "../../../mocks/dataMocked";

vi.mock("@core/services", () => ({
  createCustomerAccount: vi.fn(),
}));

vi.mock("@core/state/context/account/AccountContext", () => ({
  useAccountContext: vi.fn(),
}));

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: vi.fn(),
    formState: {
      errors: {
        name: { message: "El nombre es obligatorio" },
        lastName: { message: "El apellido es obligatorio" },
      },
    },
    handleSubmit: vi.fn(),
  }),
}));

vi.mock("./hooks", () => ({
  useCreateBankAccount: vi.fn(),
}));

global.localStorage.setItem = vi.fn();
global.localStorage.getItem = vi.fn(() => "1234");

const Renderear = () => {
  return (
    <AccountContextMock
      mockAppState={mockAppState}
      children={<CreateBankAccount />}
      mockAccountState={mockAccountState}
    />
  );
};

describe("CreateBankAccount", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.mock("@core/hooks", () => ({
      useCreateBankAccount: () => ({
        isLoading: false,
        accounts: [
          { accountId: "1", encryptedNumber: "1234", amount: 1000 },
          { accountId: "2", encryptedNumber: "5678", amount: 2500 },
        ],
        errors: {},
        handleSubmit: vi.fn((fn) => fn),
        register: vi.fn(),
        onSubmit: mockOnSubmit,
      }),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Match snapshoot", () => {
    const { asFragment } = render(<Renderear />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renderiza el formulario correctamente", () => {
    render(<Renderear />);

    screen.getByLabelText(/Tipo de Cuenta/i);
    screen.getByLabelText(/Saldo Inicial/i);
    screen.getByText(/Crear Cuenta/i);
    screen.getByText(/Tus cuentas:/i);
    screen.getAllByText(/Nº de cuenta:/i);
    screen.getAllByText(/Monto:/i);
    screen.getByText(/2500/i);
  });

  test("llama a la función onSubmit correctamente cuando el formulario es enviado", async () => {
    render(<Renderear />);

    const accountTypeSelect = screen.getByLabelText(/Tipo de Cuenta/i);
    const initialBalanceInput = screen.getByLabelText(/Saldo Inicial/i);
    const submitButton = screen.getByRole("button", {
      name: /^Crear Cuenta$/i,
    });
    waitFor(() => {
      fireEvent.change(accountTypeSelect, { target: { value: "corriente" } });
      fireEvent.change(initialBalanceInput, { target: { value: 1000 } });
      fireEvent.submit(submitButton);
    });

    expect(accountTypeSelect).toHaveValue("corriente");
    expect(initialBalanceInput).toHaveValue(1000);

    waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  test("llama a la función cuando el formulario es enviado correctamente", async () => {
    render(<Renderear />);

    const submitButton = screen.getByRole("button", {
      name: /^Crear Cuenta$/i,
    });
    const accountTypeSelect = screen.getByLabelText(/Tipo de Cuenta/i);
    const initialBalanceInput = screen.getByLabelText(/Saldo Inicial/i);

    waitFor(() => {
      fireEvent.change(accountTypeSelect, { target: { value: "corriente" } });
      fireEvent.change(initialBalanceInput, { target: { value: "1000" } });
      fireEvent.submit(submitButton);
    });

    expect(submitButton).toHaveAttribute("type", "submit");

    expect(accountTypeSelect).toHaveValue("corriente");
    expect(initialBalanceInput).toHaveValue(1000);

    waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        customerId: "1234",
        amount: 1000,
      });
    });
  });
});
