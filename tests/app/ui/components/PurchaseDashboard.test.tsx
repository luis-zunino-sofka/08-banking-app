import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import React, { act } from "react";
import { PurchaseDashboard } from "../../../../src/app/ui/components/purchaseDashboard/index";
import { decryptAES } from "../../../../src/app/core/utils/decryptAES.utils";
import { AccountContextMock } from "../containers/AppContainer.test";
import { mockAccountState, mockAppState } from "../../../mocks/dataMocked";

describe("PurchaseDashboard", () => {
  const mockOnSubmit = vi.fn();
  const mockRegister = vi.fn();
  const mockHandleSubmit = vi.fn((fn) => fn);
  // const mockRefetchAccounts = vi.fn();

  beforeEach(() => {
    render(
      <AccountContextMock
        mockAppState={mockAppState}
        children={<PurchaseDashboard />}
        mockAccountState={mockAccountState}
      />
    );

    vi.mock("'../../../../src/app/core/hooks/purchase/usePurchase'", () => ({
      usePurchase: () => ({
        isLoading: false,
        accounts: [
          {
            accountId: "1",
            encryptedNumber: `${decryptAES("encrypted1")}`,
            amount: 1000,
          },
          {
            accountId: "2",
            encryptedNumber: `${decryptAES("encrypted2")}`,
            amount: 2500,
          },
        ],
        errors: {
          purchaseType: { message: "Por favor selecciona un tipo de compra" },
          accountId: { message: "La cuenta es obligatoria" },
          purchaseAmount: { message: "El monto es obligatorio" },
        },
        register: mockRegister,
        handleSubmit: mockHandleSubmit,
        onSubmit: mockOnSubmit,
      }),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Match snapshoot", () => {
    const { asFragment } = render(
      <AccountContextMock
        mockAppState={mockAppState}
        children={<PurchaseDashboard />}
        mockAccountState={mockAccountState}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("debería renderizar el formulario correctamente", () => {
    screen.getByLabelText(/Selecciona el tipo de compra/i);
    screen.getByLabelText(/Selecciona la cuenta a depositar/i);
    screen.getByLabelText(/Ingresa el monto a depositar/i);
    screen.getByRole("button", { name: /Comprar/i });
  });

  test("debería mostrar error cuando falta seleccionar el tipo de compra", async () => {
    const submitButton = screen.getByRole("button", { name: /Comprar/i });
    const inputPurchaseType = screen.getByRole("combobox", {
      name: "Selecciona el tipo de compra:",
    });
    const inputAccountId = screen.getByRole("combobox", {
      name: "Selecciona la cuenta a depositar:",
    });
    const inputPurchaseAmount = screen.getByRole("spinbutton", {
      name: "Ingresa el monto a depositar:",
    });
    act(() => {
      fireEvent.submit(submitButton);
    });

    expect(inputPurchaseType).toHaveValue("");
    expect(inputAccountId).toHaveValue("");
    expect(inputPurchaseAmount).toHaveValue(null);
    await waitFor(() =>
      expect(
        screen.getByText(/Por favor selecciona un tipo de compra/i)
      ).toBeInTheDocument()
    );
  });

  test("debería mostrar las cuentas correctamente en el select", async () => {
    const accountSelect = screen.getByRole("combobox", {
      name: "Selecciona la cuenta a depositar:",
    });

    await waitFor(() => {
      expect(accountSelect).toHaveTextContent(
        "Elige una cuentaCuenta: encrypted1 - Monto: 1000Cuenta: encrypted2 - Monto: 2500"
      );
    });
  });

  test("debería llamar a onSubmit cuando se envía el formulario correctamente", async () => {
    const submitButton = screen.getByRole("button", { name: /Comprar/i });

    const inputPurchaseType = screen.getByRole("combobox", {
      name: "Selecciona el tipo de compra:",
    });
    const inputAccountId = screen.getByRole("combobox", {
      name: "Selecciona la cuenta a depositar:",
    });

    const inputPurchaseAmount = screen.getByRole("spinbutton", {
      name: /Ingresa el monto a depositar:/i,
    });

    waitFor(() => {
      fireEvent.change(inputPurchaseType, {
        target: { value: "online" },
      });

      fireEvent.change(inputAccountId, { target: { value: 1 } });

      fireEvent.change(inputPurchaseAmount, { target: { value: 100 } });

      fireEvent.click(submitButton);
    });

    expect(inputPurchaseType).toHaveValue("online");
    expect(inputPurchaseAmount).toHaveValue(100);
    expect(inputAccountId).toHaveValue("1");

    waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
