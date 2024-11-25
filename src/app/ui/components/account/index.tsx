import { useCreateBankAccount } from "@core/hooks";
import { decryptAES } from "@core/utils";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Button } from "../button";
import "./styles.scss";

export const CreateBankAccount: React.FC = () => {
  const { isLoading, accounts, errors, handleSubmit, register, onSubmit } =
    useCreateBankAccount();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div style={{ display: "flex", gap: "10px" }}>
          <div>
            <div>
              <label htmlFor="accountType">Tipo de Cuenta</label>
              <select
                id="accountType"
                {...register("accountType", {
                  required: "Selecciona un tipo de cuenta",
                })}
              >
                <option key={1} value="">
                  Selecciona el tipo de cuenta
                </option>
                <option key={2} value="corriente">
                  Corriente
                </option>
              </select>
              <span className="error-message">
                {errors.accountType && errors.accountType.message}
              </span>
            </div>
            <div>
              <label htmlFor="initialBalance">Saldo Inicial</label>
              <input
                type="number"
                id="initialBalance"
                placeholder="Saldo inicial en $"
                min={0}
                {...register("initialBalance", {
                  required: "El saldo inicial es obligatorio",
                  min: {
                    value: 0,
                    message: "El saldo inicial no puede ser negativo",
                  },
                })}
              />
              <span className="error-message">
                {errors.initialBalance && errors.initialBalance.message}
              </span>
            </div>
            <Button label="Crear Cuenta" isLoading={isLoading} />
          </div>
          <div className="user-accounts">
            <p>Cuentas del usuario:</p>
            {accounts.map((a) => (
              <div key={a.accountId} className="user-accounts__item">
                <div className="user-accounts__info">
                  <span>Nº de cuenta:</span> {decryptAES(a.encryptedNumber)}
                </div>
                <div className="user-accounts__info amount">
                  <span>Monto:</span> $ {a.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
};
