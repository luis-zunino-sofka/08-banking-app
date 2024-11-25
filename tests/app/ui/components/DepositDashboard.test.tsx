import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { DepositDashboard } from "../../../../src/app/ui/components/depositDashboard";
import React from "react";
import { AccountContextMock } from "../containers/AppContainer.test";
import "@testing-library/jest-dom";
import { decryptAES } from "../../../../src/app/core/utils/decryptAES.utils";
import {
  mockAccount,
  mockAccountState,
  mockAppState,
} from "../../../mocks/dataMocked";

vi.mock("react-hot-toast", () => ({
  Toaster: () => <div>Mocked Toaster</div>,
  toast: vi.fn(),
}));

vi.mock("@core/utils", () => ({
  decryptAES: vi.fn((value: string) => value),
}));

describe("DepositDashboard", () => {
  const mockOnSubmit = vi.fn();
  beforeEach(() => {
    vi.mock("@core/hooks", () => ({
      useDeposit: {
        isLoading: false,
        accounts: mockAccount,
        errors: {
          depositSource: { message: "El depositSource es obligatorio" },
          amount: { message: "El amount es obligatorio" },
          accountId: { message: "El accountId es obligatorio" },
          accountNumberToDeposit: {
            message: "El accountNumberToDeposit es obligatorio",
          },
        },
        isAccountSelected: true,
        handleSubmit: vi.fn((fn) => fn()),
        register: vi.fn(),
        onSubmit: mockOnSubmit,
      },
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const Renderear = () => {
    return (
      <AccountContextMock
        mockAppState={mockAppState}
        children={<DepositDashboard />}
        mockAccountState={mockAccountState}
      />
    );
  };

  test("Match snapshoot", () => {
    const { asFragment } = render(<Renderear />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("debe renderizar el formulario correctamente", () => {
    render(<Renderear />);

    screen.getByLabelText(/Selecciona el origen del depósito:/i);
    screen.getByLabelText(/Monto:/i);
    screen.getByLabelText(/Cuenta a depositar:/i);
    screen.getByRole("button", { name: /Depositar/i });
    screen.getByText("* El costo de la transacción se deducirá del saldo.");
  });

  test("debe renderizar el formulario correctamente cuando es deposito desde otra cuenta", async () => {
    render(<Renderear />);

    const depositSource = screen.getByRole("combobox", {
      name: "Selecciona el origen del depósito:",
    });

    fireEvent.change(depositSource, { target: { value: "account" } });
    await waitFor(() => expect(depositSource).toHaveValue("account"));

    screen.getByLabelText(/Selecciona la cuenta a depositar:/i);
  });

  test("debe llamar onSubmit correctamente cuando el formulario es válido", async () => {
    render(<Renderear />);
    const depositSource = screen.getByRole("combobox", {
      name: "Selecciona el origen del depósito:",
    });
    const amount = screen.getByRole("spinbutton", {
      name: "Monto:",
    });
    const accountId = screen.getByRole("combobox", {
      name: "Cuenta a depositar:",
    });

    const submitButton = screen.getByRole("button", { name: /Depositar/i });
    waitFor(() => {
      fireEvent.change(depositSource, { target: { value: "branch-deposit" } });
      fireEvent.change(amount, { target: { value: 1000 } });
      fireEvent.change(accountId, { target: { value: "1000" } });

      fireEvent.click(submitButton);
    });

    expect(depositSource).toHaveValue("branch-deposit");
    expect(amount).toHaveValue(1000);
    waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  test("debe mostrar un mensaje de error si el monto es menor a 1", async () => {
    render(<Renderear />);
    const amountInput = screen.getByRole("spinbutton", {
      name: "Monto:",
    });

    fireEvent.change(amountInput, { target: { value: -1 } });
    expect(amountInput).toHaveValue(-1);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
