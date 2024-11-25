import { IContext, IState } from "@core/interfaces";
import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";

export const AppContext = createContext<IContext>({
  state: {} as IState,
  dispatch: () => {},
  balance: 0,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
