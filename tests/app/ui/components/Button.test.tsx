import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import React from "react";
import { Button } from "../../../../src/app/ui/components/button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  beforeEach(() => {
    vi.mock("react-spinner", () => ({}));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Match snapshoot", () => {
    const { asFragment } = render(
      <Button label="Iniciar sesión" isLoading={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("debe renderizar el texto del botón cuando isLoading es false", () => {
    render(<Button label="Iniciar sesión" isLoading={false} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Iniciar sesión");

    const loader = screen.queryByTestId("loader");
    expect(loader).not.toBeInTheDocument();
  });

  test("debe renderizar el spinner cuando isLoading es true", () => {
    render(<Button label="Iniciar sesión" isLoading={true} />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).not.toHaveTextContent("Iniciar sesión");
  });

  test("debe mostrar el texto del botón y no el spinner cuando isLoading es false", () => {
    render(<Button label="Enviar" isLoading={false} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Enviar");
    expect(button).not.toHaveTextContent("Cargando");
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });

  test("debe mostrar el spinner y no el texto del botón cuando isLoading es true", () => {
    render(<Button label="Enviar" isLoading={true} />);

    const button = screen.getByRole("button");
    expect(button).not.toHaveTextContent("Enviar");
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
