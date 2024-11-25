import { useNavbar } from "@core/hooks";
import { useAccountContext, useAppContext } from "@core/state";
import { Navbar } from "@ui/components/navbar";
import { AppLayout } from "@ui/layouts";
import React from "react";
import { Toaster } from "react-hot-toast";

export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAppContext();
  const { refetchAccounts } = useAccountContext();
  const { navItems, handleLogout } = useNavbar();

  return (
    <AppLayout>
      <Navbar
        state={state}
        handleLogout={handleLogout}
        refetchAccounts={refetchAccounts}
        navItems={navItems}
      />
      {children}
      <Toaster />
    </AppLayout>
  );
};
