import { localStorageProperties } from "@core/constants";

export const loginInitialState: {
  loginData: {
    token: string | null;
    customerId: string | null;
    username?: string;
  };
} = {
  loginData: {
    token: null,
    customerId: null,
    // TODO: ver de hacer esto mejor
    username: String(localStorage.getItem(localStorageProperties.username)),
  },
};
