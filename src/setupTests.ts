import "@testing-library/jest-dom";
import "@testing-library/react";
import "vitest";
import "react";
import { vi } from "vitest";
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("./app/core/utils/decryptAES.utils", () => ({
  decryptAES: vi.fn((value) => value),
}));

vi.mock("'./app/core/utils/encryptAES.utils'", () => ({
  encryptAES: vi.fn((value: string) => value),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(() => ({
    navigate: vi.fn(),
  })),
}));
