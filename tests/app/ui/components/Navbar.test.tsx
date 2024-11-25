import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import React from "react";
import { Navbar } from "../../../../src/app/ui/components/navbar/index";
import "@testing-library/jest-dom";
import { mockAccountState, mockAppState } from "../../../mocks/dataMocked";
import { AccountContextMock } from "../containers/AppContainer.test";
import useNavbar from "../../../../src/app/core/hooks/navbar/useNavbar";

vi.mock("../../../../src/app/core/hooks/navbar/useNavbar");
vi.mock("react-router-dom");

describe("Navbar", () => {
  const mockHandleLogout = vi.fn();
  const mockRefetchAccounts = vi.fn();
  const mockNavigate = vi.fn((value) => value);
  const mockedNavItems = [
    {
      path: "/dashboard",
      label: "Depósito",
      onClick: mockNavigate,
      isActive: false,
    },
    {
      path: "/purchase",
      label: "Comprar",
      onClick: mockNavigate,
      isActive: false,
    },
    {
      path: "/accounts",
      label: "Gestión de cuentas",
      onClick: mockNavigate,
      isActive: false,
    },
    {
      path: "/withdraw",
      label: "Retirar",
      onClick: mockNavigate,
      isActive: false,
    },
  ];

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useNavbar).mockReturnValue({
      navItems: mockedNavItems,
      handleLogout: mockHandleLogout,
    });
    render(
      <AccountContextMock
        mockAppState={mockAppState}
        children={
          <Navbar
            state={mockAppState}
            handleLogout={mockHandleLogout}
            refetchAccounts={mockRefetchAccounts}
            navItems={mockedNavItems}
          />
        }
        mockAccountState={mockAccountState}
      />
    );
  });

  test("Match snapshoot", () => {
    const { asFragment } = render(
      <AccountContextMock
        mockAppState={mockAppState}
        children={
          <Navbar
            state={mockAppState}
            handleLogout={mockHandleLogout}
            refetchAccounts={mockRefetchAccounts}
            navItems={mockedNavItems}
          />
        }
        mockAccountState={mockAccountState}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("renderiza correctamente el componente", () => {
    screen.getByText(/Bienvenido/i);
    screen.getByText(/\$0/i);
    screen.getByText(/Actualizar/i);
  });

  test('llama a handleLogout al hacer clic en "Cerrar sesión"', () => {
    const logoutButton = screen.getByText(/Cerrar sesión/i);
    fireEvent.click(logoutButton);

    expect(mockHandleLogout).toHaveBeenCalled();
  });

  test('llama a refetchAccounts al hacer clic en "Actualizar"', () => {
    const reloadButton = screen.getByText(/Actualizar/i);

    fireEvent.click(reloadButton);

    expect(mockRefetchAccounts).toHaveBeenCalled();
  });

  test("navega a la ruta correcta cuando se hace clic en los botones de navegación", () => {
    const dashboardButton = screen.getByText(/Depósito/i);
    const purchaseButton = screen.getByText(/Comprar/i);
    const accountButton = screen.getByText(/Gestión de cuentas/i);
    const withdrawButton = screen.getByText(/Retirar/i);

    fireEvent.click(dashboardButton);
    expect(mockNavigate).toHaveBeenCalled();

    fireEvent.click(purchaseButton);
    expect(mockNavigate).toHaveBeenCalled();

    fireEvent.click(accountButton);
    expect(mockNavigate).toHaveBeenCalled();

    fireEvent.click(withdrawButton);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
