import { decryptAES } from "../../src/app/core/utils/decryptAES.utils";

export const mockAccount = [
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
];

// Mock del estado del Contexto Account
export const mockAccountState = {
  accounts: mockAccount,
  refetchAccounts: () => {
    console.log("refetchAccounts");
  },
  balance: 1000,
};

export const mockAppState = {
  loginData: {
    token: "token",
    customerId: "123",
  },
  balance: 0,
  accounts: mockAccount,
};
