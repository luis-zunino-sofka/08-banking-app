import { createBrowserRouter } from "react-router-dom";
import { SignupContainer } from "@containers/SignupContainer";
import { LoginContainer } from "@containers/LoginContainer";
import { AppContainer } from "@containers/AppContainer";
import { ROUTE_PATH } from "@core/constants";
import { DepositDashboard } from "@ui/components/depositDashboard";
import { WithdrawDashboard } from "@ui/components/withdrawDashboard";
import { PurchaseDashboard } from "@ui/components/purchaseDashboard";
import { GuardSession } from "./guards";
import { CreateBankAccount } from "@ui/components/account";
import { AccountProvider } from "@core/state";

export const router = createBrowserRouter([
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginContainer />,
  },
  {
    path: ROUTE_PATH.SIGNUP,
    element: <SignupContainer />,
  },
  {
    path: ROUTE_PATH.DASHBOARD,
    element: (
      <AppContainer
        children={
          <GuardSession>
            <AccountProvider>
              <DepositDashboard />
            </AccountProvider>
          </GuardSession>
        }
      />
    ),
  },
  {
    path: ROUTE_PATH.WITHDRAW,
    element: (
      <AppContainer
        children={
          <GuardSession>
            <AccountProvider>
              <WithdrawDashboard />
            </AccountProvider>
          </GuardSession>
        }
      />
    ),
  },
  {
    path: ROUTE_PATH.PURCHASE,
    element: (
      <AppContainer
        children={
          <GuardSession>
            <AccountProvider>
              <PurchaseDashboard />
            </AccountProvider>
          </GuardSession>
        }
      />
    ),
  },
  {
    path: ROUTE_PATH.ACOUNT,
    element: (
      <AppContainer
        children={
          <GuardSession>
            <AccountProvider>
              <CreateBankAccount />
            </AccountProvider>
          </GuardSession>
        }
      />
    ),
  },
]);
