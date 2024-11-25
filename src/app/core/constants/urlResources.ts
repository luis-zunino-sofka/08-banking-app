import { environment } from "../../../environment/environment";

export const urlResources = {
  // LOGIN
  login: `${environment.apiBaseUrl}/auth/login`, // login
  signup: `${environment.apiBaseUrl}/auth/register`, // registro

  // CUSTOMER ACCOUNT
  createCustomerAccount: `${environment.apiBaseUrl}/customers/accounts`, // consultar cuenta
  getAllCustomerAccount: `${environment.apiBaseUrl}/customers/accounts/get-all`, // consultar todas las cuentas cuenta
  getByIdCustomerAccount: `${environment.apiBaseUrl}/customers/accounts/by-id`, // consultar todas la cuenta por id

  // ACCOUNT PURCHASES
  phisicalPurchase: `${environment.apiBaseUrl}/customers/accounts/physical-purchases`, // compra física
  onlinePurchase: `${environment.apiBaseUrl}/customers/accounts/online-purchases`, // pago en línea

  // ACCOUNT DEPOSITS
  branchDeposits: `${environment.apiBaseUrl}/customers/accounts/branch-deposits`, // sucursal
  atmDeposit: `${environment.apiBaseUrl}/customers/accounts/atm-deposits`, // cajero automático
  externalDeposits: `${environment.apiBaseUrl}/customers/accounts/external-deposits`, // otra cuenta

  // ACCOUNT WITHDRAWALS
  atmWithdraw: `${environment.apiBaseUrl}/customers/accounts/atm-withdrawals`, // cajero automático
};
