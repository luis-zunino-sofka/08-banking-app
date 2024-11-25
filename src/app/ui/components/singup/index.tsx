import { useSignup } from "@core/hooks/signup/useSignup";
import { ROUTE_PATH } from "@core/constants";
import { Toaster } from "react-hot-toast";
import "./styles.scss";
import { InputSignup } from "./InputSignup";

export const SignupForm = () => {
  const { errors, isLoading, onSubmit, register, handleSubmit, watch } =
    useSignup();

  return (
    <div className="signup-form">
      <form
        id="register-form"
        className="signup-form__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="signup-form__title">Regístrate</h2>
        <div className="flex">
          <InputSignup
            register={register("name", {
              required: "El nombre es obligatorio",
            })}
            name="name"
            type="text"
            label="Nombre:"
            errors={errors}
            placeHolder="Ingrese su nombre"
          />

          <InputSignup
            register={register("lastName", {
              required: "El apellido es obligatorio",
            })}
            name="lastName"
            type="text"
            label="Apellido:"
            errors={errors}
            placeHolder="Ingrese su apellido"
          />
        </div>
        <div className="flex">
          <InputSignup
            register={register("dni", { required: "El DNI es obligatorio" })}
            name="dni"
            type="text"
            label="DNI:"
            errors={errors}
            placeHolder="Ingrese su dni"
          />

          <InputSignup
            register={register("username", {
              required: "El nombre de usuario es obligatorio",
            })}
            name="username"
            type="text"
            label="Nombre de usuario:"
            errors={errors}
            placeHolder="Ingrese su nombre de usuario"
          />
        </div>
        <div className="flex">
          <InputSignup
            register={register("password", {
              required: "El nombre de usuario es obligatorio",
            })}
            name="password"
            type="password"
            label="Contraseña:"
            errors={errors}
            placeHolder="Contraseña"
          />

          <InputSignup
            register={register("confirmPassword", {
              required: "La confirmación de la contraseña es obligatoria",
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
            name="confirmPassword"
            type="password"
            label="Confirmar contraseña:"
            errors={errors}
            placeHolder="Confirmar contraseña"
          />
        </div>
        <button
          type="submit"
          className="signup-form__submit"
          disabled={isLoading}
        >
          Registrarse
        </button>
        <div className="signup-form__footer">
          <p>
            ¿Ya tienes cuenta?
            <a
              href={ROUTE_PATH.LOGIN}
              id="login-link"
              className="signup-form__login-link"
            >
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </form>
      <Toaster />
    </div>
  );
};
