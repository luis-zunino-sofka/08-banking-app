import { AccountContext } from "./AccountContext";
import { useAccountProvider } from "@core/hooks";

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accounts, state, refetchAccounts } = useAccountProvider();

  return (
    <AccountContext.Provider
      value={{ accounts, balance: state.balance, refetchAccounts }}
    >
      {children}
    </AccountContext.Provider>
  );
};
