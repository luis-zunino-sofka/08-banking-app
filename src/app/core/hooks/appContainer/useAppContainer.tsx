import { IState } from "@core/interfaces";
import { useAccountContext, useAppContext } from "@core/state";

interface IAppContainer {
  state: IState;
  refetchAccounts: () => void;
}

export const useAppContainer = (): IAppContainer => {
  const { state } = useAppContext();
  const { refetchAccounts } = useAccountContext();

  return { state, refetchAccounts };
};
