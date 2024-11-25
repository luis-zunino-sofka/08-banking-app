import { environment } from "@environment/environment";
import CryptoJS from "crypto-js";

export const decryptAES = (ciphertextBase64: string): string => {
  const bytes = CryptoJS.AES.decrypt(
    ciphertextBase64,
    CryptoJS.enc.Utf8.parse(environment.secretKey),
    {
      iv: CryptoJS.enc.Utf8.parse(environment.initializationVector),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const plaintext = bytes.toString(CryptoJS.enc.Utf8);

  return plaintext;
};
