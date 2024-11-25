import { SignupFormData } from "@core/interfaces";
import { encryptAES } from "@core/utils";
import {
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@core/constants";
import { signup } from "@core/services";

interface SignupFormResponse {
  errors: FieldErrors<SignupFormData>;
  isLoading: boolean;
  onSubmit: (data: SignupFormData) => void;
  register: UseFormRegister<SignupFormData>;
  handleSubmit: UseFormHandleSubmit<SignupFormData, undefined>;
  watch: UseFormWatch<SignupFormData>;
}

export const useSignup = (): SignupFormResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);

    try {
      const response = await signup({
        firstName: data.name,
        lastName: data.lastName,
        encryptedIdentification: encryptAES(data.dni),
        username: data.username,
        encryptedPassword: encryptAES(data.password),
      });

      if (response.dinBody) navigate(ROUTE_PATH.LOGIN);
      else {
        toast(response.dinError.detail);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(error.message);
      toast("Ha ocurrido un error");
    } finally {
      setIsLoading(false);
      navigate(ROUTE_PATH.LOGIN);
    }
  };

  return {
    errors,
    isLoading,
    onSubmit,
    register,
    handleSubmit,
    watch,
  };
};
