import { useDeposit } from "@core/hooks";
import { decryptAES } from "@core/utils";
import { Toaster } from "react-hot-toast";
import { Button } from "../button";

export const DepositDashboard = () => {
  const {
    isLoading,
    accounts,
    errors,
    isAccountSelected,
    handleSubmit,
    register,
    onSubmit,
  } = useDeposit();

  return (
    <div className="deposit">
      <form
        id="deposit-form"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="deposit-source">
          Selecciona el origen del depósito:
        </label>
        <select
          id="deposit-source"
          {...register("depositSource", {
            required: "El monto a depositar es obligatorio",
          })}
        >
          <option value="branch-deposit" defaultValue="branch-deposit">
            Depósito desde sucursal (Sin costo)
          </option>
          <option value="atm">
            Depósito desde cajero automático ($2 de costo)
          </option>
          <option value="account">
            Depósito desde otra cuenta ($1.5 de costo)
          </option>
        </select>
        {errors.depositSource && (
          <span className="error-message">{errors.depositSource.message}</span>
        )}
        <label htmlFor="deposit-amount">Monto:</label>
        <input
          type="number"
          id="deposit-amount"
          placeholder="Monto a depositar"
          required
          min={0}
          {...register("amount", {
            required: "El monto a depositar es obligatorio",
            min: {
              value: 1,
              message: "El monto a depositar debe ser mayor a 0",
            },
          })}
        />
        {errors.amount && (
          <span className="error-message">{errors.amount.message}</span>
        )}
        <div>
          <label htmlFor="accountId">
            {isAccountSelected
              ? "Cuenta de extracción:"
              : "Cuenta a depositar:"}
          </label>
          <select
            id="accountId"
            {...register("accountId", {
              required: "La cuenta bancaria es obligatorio",
            })}
            required
          >
            <option value="">Elige una cuenta</option>
            {accounts.map((a) => (
              <option key={a.accountId} value={a.accountId}>
                Cuenta: {decryptAES(a.encryptedNumber)} - Monto: {a.amount}
              </option>
            ))}
          </select>

          {errors.accountNumberToDeposit && (
            <span className="error-message">
              {errors.accountNumberToDeposit.message}
            </span>
          )}
        </div>
        {isAccountSelected && (
          <>
            <label htmlFor="account-number-to-deposit">
              Selecciona la cuenta a depositar:
            </label>
            <input
              type="text"
              id="account-number-to-deposit"
              placeholder="Cuenta a depositar"
              required
              min={0}
              {...register("accountNumberToDeposit", {
                required: "La cuenta a depositar es obligatorio",
              })}
            />

            {errors.accountNumberToDeposit && (
              <span className="error-message">
                {errors.accountNumberToDeposit.message}
              </span>
            )}
          </>
        )}
        <Button label="Depositar" isLoading={isLoading} />
        <p>* El costo de la transacción se deducirá del saldo.</p>
      </form>
      <Toaster />
    </div>
  );
};
