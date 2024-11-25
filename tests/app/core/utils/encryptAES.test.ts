import { encryptAES } from "../../../../src/app/core/utils/encryptAES.utils";
import { vi, test, expect, describe, Mock } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../../../../src/app/core/utils/encryptAES.utils");

const ciphertextBase64 = "kFrnKZ+gn9PYahS8bRusUT4hhM1uNDn5CoVPHhiNyHs=";
const expectedPlaintext = "Texto Descifrado Correctamente";

describe("encryptAES", () => {
  test("encryptAES debe encryptar correctamente el texto", async () => {
    (encryptAES as Mock).mockResolvedValue(ciphertextBase64);
    const result = await encryptAES(expectedPlaintext);

    expect(result).toEqual(ciphertextBase64);
  });
});
