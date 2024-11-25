import { Toaster } from "react-hot-toast";
import { decryptAES } from "@core/utils";
import { useWithdrawDashboard } from "@core/hooks";

export const WithdrawDashboard = () => {
  const { accounts, register, handleSubmit, errors, onSubmit } =
    useWithdrawDashboard();

  return (
    <div className="withdraw">
      <form
        id="withdraw-form"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="withdraw-amount">Monto:</label>
          <input
            type="number"
            id="withdraw-amount"
            placeholder="Monto a retirar en $"
            {...register("amount", {
              required: "El monto es obligatorio.",
              min: {
                value: 0,
                message: "El monto debe ser mayor que 0.",
              },
            })}
          />
          {errors.amount && (
            <span className="error-message">{errors.amount.message}</span>
          )}
          <>
            <label htmlFor="account-number-to-withdraw">
              Selecciona la cuenta a retirar:
            </label>
            <select
              id="account-number-to-withdraw"
              {...register("accountNumberToWithdraw", {
                required: "La cuenta bancaria a retirar es obligatorio",
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

            {errors.accountNumberToWithdraw && (
              <span className="error-message">
                {errors.accountNumberToWithdraw.message}
              </span>
            )}
          </>
        </div>

        <p>* El retiro en cajero tiene un costo de $1 USD por transacción.</p>
        <button type="submit">Retirar</button>
      </form>
      <Toaster />
    </div>
  );
};
