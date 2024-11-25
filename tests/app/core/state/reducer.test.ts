import { describe, expect, test } from "vitest";
import { IAction } from "../../../../src/app/core/interfaces";
import { loginActions } from "../../../../src/app/core/state/login";
import { globalBalanceActions } from "../../../../src/app/core/state/globalBalance";
import { reducer } from "../../../../src/app/core/state/reducer";

const initialState = {
  loginData: {
    token: null,
    customerId: null,
  },
  balance: 0,
  accounts: [],
};

describe("Reducer", () => {
  test("debe retornar el estado inicial correctamente", () => {
    const action: IAction = {
      type: loginActions.LOGIN,
      payload: initialState.loginData,
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  test("debe manejar una acción LOGIN y actualizar el estado correctamente", () => {
    const mockPayload = {
      loginData: { token: "token", customerId: "Customer ID" },
    };

    const action: IAction = {
      type: loginActions.LOGIN,
      payload: mockPayload.loginData,
    };

    const stateBefore = { ...mockPayload };
    const stateAfter = reducer(stateBefore, action);

    expect(stateAfter).toEqual({
      ...stateBefore,
    });
  });

  test("debe manejar una acción UPDATE_BALANCE y actualizar el estado correctamente", () => {
    const action: IAction = {
      type: globalBalanceActions.SET_BALANCE,
      payload: 1000,
    };

    const stateBefore = { ...initialState };
    const stateAfter = reducer(stateBefore, action);

    expect(stateAfter).toEqual({
      ...stateBefore,
      balance: 1000,
    });
  });

  test("debe retornar el mismo estado si no hay un caso correspondiente", () => {
    const action: IAction = { type: "UNKNOWN_ACTION", payload: undefined };

    const stateBefore = { ...initialState };
    const stateAfter = reducer(stateBefore, action);

    expect(stateAfter).toEqual(stateBefore);
  });
});
