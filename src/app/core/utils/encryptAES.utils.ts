import { environment } from "@environment/environment";
import CryptoJS from "crypto-js";

export const encryptAES = (text: string) => {
  const ciphertext = CryptoJS.AES.encrypt(
    text,
    CryptoJS.enc.Utf8.parse(environment.secretKey),
    {
      iv: CryptoJS.enc.Utf8.parse(environment.initializationVector),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return ciphertext.ciphertext.toString(CryptoJS.enc.Base64);
};
