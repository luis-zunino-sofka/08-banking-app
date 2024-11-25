import { Toaster } from "react-hot-toast";
import { usePurchase } from "@core/hooks";
import { decryptAES } from "@core/utils";
import { Button } from "../button";
import "../../styles/styles.scss";

export const PurchaseDashboard = () => {
  const { isLoading, accounts, errors, register, handleSubmit, onSubmit } =
    usePurchase();

  return (
    <div>
      <form
        id="purchase-form"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="purchase-type">Selecciona el tipo de compra:</label>
          <select
            id="purchase-type"
            {...register("purchaseType", {
              required: "Por favor selecciona un tipo de compra",
            })}
          >
            <option value="">Elige el tipo de compra</option>
            <option value="physical">Establecimiento físico (Sin costo)</option>
            <option value="online">En línea (Costo de seguro de $5 USD)</option>
          </select>
          {errors.purchaseType && (
            <span className="error-message">{errors.purchaseType.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="account-number-to-deposit">
            Selecciona la cuenta a depositar:
          </label>
          <select
            id="account-number-to-deposit"
            {...register("accountId", {
              required: "La cuenta bancaria a depositar es obligatorio",
            })}
          >
            <option value="">Elige una cuenta</option>
            {accounts.map((a) => (
              <option key={a.accountId} value={a.accountId}>
                Cuenta: {decryptAES(a.encryptedNumber)} - Monto: {a.amount}
              </option>
            ))}
          </select>

          {errors.accountId && (
            <span className="error-message">{errors.accountId.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="purchase-amount">
            Ingresa el monto a depositar:
            <input
              type="number"
              id="purchase-amount"
              placeholder="Monto de la compra en $"
              {...register("purchaseAmount", {
                required: "El monto es obligatorio",
                min: {
                  value: 1,
                  message: "El monto debe ser mayor que $0",
                },
              })}
            />
          </label>
          {errors.purchaseAmount && (
            <span className="error-message">
              {errors.purchaseAmount.message}
            </span>
          )}
        </div>
        <Button label="Comprar" isLoading={isLoading} />
      </form>

      <Toaster />
    </div>
  );
};
