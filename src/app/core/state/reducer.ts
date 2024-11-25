import { IAction, IState } from "@core/interfaces";
import { loginCases, loginInitialState } from "./login";
import { globalBalanceCases, globalBalanceInitialState } from "./globalBalance";

export const initialState = {
  ...loginInitialState,
  ...globalBalanceInitialState,
};

export const reducer = (state: IState, action: IAction): IState => {
  const cases = {
    ...loginCases,
    ...globalBalanceCases,
  };
  if (action.type && cases[action.type]) {
    return cases[action.type](state, action.payload);
  }
  return state;
};
