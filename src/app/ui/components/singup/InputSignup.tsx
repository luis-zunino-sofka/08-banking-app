/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SignupFormData } from "@core/interfaces";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

interface IInput {
  register: UseFormRegisterReturn<string>;
  name: string;
  type: string;
  label: string;
  errors: FieldErrors<SignupFormData>;
  placeHolder: string;
}

export const InputSignup = (props: IInput) => {
  const { register, name, type, label, errors, placeHolder } = props;
  return (
    <div className="signup-form__input-group">
      <label htmlFor={`input-${name}`} className="signup-form__label">
        {label}
      </label>
      <input
        id={`input-${name}`}
        type={type}
        className="signup-form__input"
        placeholder={placeHolder}
        {...register}
      />
      {/* @ts-expect-error */}
      {errors[name] && (
        /* @ts-expect-error */
        <span className="error-message">{errors[name].message}</span>
      )}
    </div>
  );
};
