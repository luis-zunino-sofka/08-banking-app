import { vi, test, expect, describe, Mock } from "vitest";
import "@testing-library/jest-dom";
import { decryptAES } from "../../../../src/app/core/utils/decryptAES.utils";

vi.mock("../../../../src/app/core/utils/decryptAES.utils");

const ciphertextBase64 = "kFrnKZ+gn9PYahS8bRusUT4hhM1uNDn5CoVPHhiNyHs=";
const expectedPlaintext = "Texto Descifrado Correctamente";

describe("decryptAES", () => {
  test("decryptAES debe desencryptar correctamente el texto", async () => {
    (decryptAES as Mock).mockResolvedValue(expectedPlaintext);
    const result = await decryptAES(ciphertextBase64);

    expect(result).toEqual(expectedPlaintext);
  });
});
