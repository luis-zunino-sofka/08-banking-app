import { ROUTE_PATH } from "@core/constants";
import { useLogin } from "@core/hooks";
import { ILoginResponse } from "@core/interfaces";
import { Button } from "../button";
import "./style.scss";

export const Login = (props: {
  saveLoginData: (loginData: ILoginResponse) => void;
}) => {
  const { saveLoginData } = props;
  const { isLoading, errors, onSubmit, register, handleSubmit } =
    useLogin(saveLoginData);

  return (
    <div className="login">
      <form id="login-form" className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="login__form-title">Iniciar sesión</h2>
        <div className="login__input-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            placeholder="Nombre de usuario"
            required
            {...register("username", {
              required: "El nombre de usuario es obligatorio",
            })}
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>

        <div className="login__input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            required
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        <Button label="Iniciar sesión" isLoading={isLoading} />
        <p className="login__register-link">
          ¿No tienes cuenta?
          <a href={ROUTE_PATH.SIGNUP} id="register-link">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
};
