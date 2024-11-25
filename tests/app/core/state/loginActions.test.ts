import { describe, expect, test } from "vitest";
import {
  resetLoginData,
  saveLoginData,
} from "../../../../src/app/core/state/login";
import { ILoginResponse } from "../../../../src/app/core/interfaces/forms/login/index";

const loginActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

describe("Login Actions", () => {
  describe("saveLoginData", () => {
    test("debe retornar una acción con el tipo LOGIN y el payload correcto", () => {
      const mockLoginData: ILoginResponse = {
        customerId: "123",
        token: "fake-token",
      };

      const action = saveLoginData(mockLoginData);

      expect(action.type).toBe(loginActions.LOGIN);

      expect(action.payload).toEqual(mockLoginData);
    });
  });

  describe("resetLoginData", () => {
    test("debe retornar una acción con el tipo LOGOUT y payload undefined por defecto", () => {
      const action = resetLoginData();

      expect(action.type).toBe(loginActions.LOGOUT);
      expect(action.payload).toBeUndefined();
    });

    test("debe retornar una acción con el tipo LOGOUT y un payload específico si se pasa un argumento", () => {
      const mockLoginData = undefined;

      const action = resetLoginData(mockLoginData);

      expect(action.type).toBe(loginActions.LOGOUT);
      expect(action.payload).toEqual(mockLoginData);
    });
  });
});
