import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { WithdrawDashboard } from "../../../../src/app/ui/components/withdrawDashboard";
import React from "react";
import { AccountContextMock } from "../containers/AppContainer.test";
import {
  mockAccount,
  mockAccountState,
  mockAppState,
} from "../../../mocks/dataMocked";

vi.mock("react-hot-toast", () => ({
  Toaster: () => <div>Mocked Toaster</div>,
  toast: vi.fn(),
}));

describe("WithdrawDashboard", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.mock("@core/hooks", () => ({
      useWithdrawDashboard: () => ({
        accounts: mockAccount,
        register: vi.fn(),
        handleSubmit: vi.fn(),
        errors: {
          amount: { message: "El monto es obligatorio." },
          accountNumberToWithdraw: { message: "La cuenta es obligatoria" },
        },
        onSubmit: mockOnSubmit,
      }),
    }));

    render(
      <AccountContextMock
        mockAppState={mockAppState}
        children={<WithdrawDashboard />}
        mockAccountState={mockAccountState}
      />
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Match snapshoot", () => {
    const { asFragment } = render(
      <AccountContextMock
        mockAppState={mockAppState}
        children={<WithdrawDashboard />}
        mockAccountState={mockAccountState}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("debe renderizar el formulario correctamente", () => {
    screen.getByLabelText(/Monto:/);
    screen.getByLabelText(/Selecciona la cuenta a retirar:/);
    screen.getByRole("button", { name: /Retirar/ });
    screen.getByText(
      "* El retiro en cajero tiene un costo de $1 USD por transacción."
    );
  });

  test("no debe llamar a onSubmit cuando el formulario es inválido", async () => {
    const buttonSubmit = screen.getByRole("button", { name: /Retirar/i });
    waitFor(() => {
      fireEvent.submit(buttonSubmit);
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("debe llamar a onSubmit cuando el formulario es válido", () => {
    const inputAmount = screen.getByRole("spinbutton", {
      name: /Monto:/i,
    });
    const inputAccountNumberToWithdraw = screen.getByRole("combobox", {
      name: /Selecciona la cuenta a retirar:/i,
    });
    waitFor(() => {
      fireEvent.change(inputAmount, { target: { value: 500 } });
      fireEvent.change(inputAccountNumberToWithdraw, {
        target: { value: "1" },
      });

      fireEvent.submit(screen.getByRole("button", { name: /Retirar/i }));
    });
    expect(inputAmount).toHaveValue(500);
    expect(inputAccountNumberToWithdraw).toHaveValue("1");
    waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  test("debe renderizar el Toaster", () => {
    screen.getByText("Mocked Toaster");
  });
});
