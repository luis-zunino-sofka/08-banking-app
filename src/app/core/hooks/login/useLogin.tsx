import { ROUTE_PATH } from "@core/constants";
import { ILoginRequest, ILoginResponse } from "@core/interfaces";
import { login } from "@core/services/login";
import { encryptAES } from "@core/utils";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { localStorageProperties } from "../../constants/localStoragesProperties";
import { useState } from "react";

interface LoginFormData {
  username: string;
  password: string;
}
export const useLogin = (
  saveLoginData: (loginData: ILoginResponse) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const callLogin = async (data: ILoginRequest) => {
    setIsLoading(true);
    try {
      setIsLoading(true);

      const result = await login(data);
      if (result.dinBody) {
        // TODO: mejorar esto
        localStorage.setItem(
          localStorageProperties.customerId,
          String(result?.dinBody?.customerId)
        );
        localStorage.setItem(
          localStorageProperties.token,
          String(result?.dinBody?.token)
        );

        saveLoginData(result.dinBody);
        navigate(ROUTE_PATH.DASHBOARD);
      } else {
        toast(result.dinError.detail);
      }
      return result;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Ha ocurrido un error ");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: LoginFormData) => {
    callLogin({
      username: data.username,
      encryptedPassword: encryptAES(data.password),
    });
    localStorage.setItem(
      localStorageProperties.username,
      String(data.username)
    );
  };

  return { isLoading, errors, onSubmit, register, handleSubmit };
};
