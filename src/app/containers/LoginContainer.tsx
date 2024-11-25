import { Login } from "@ui/components/login";
import { LayoutLogin } from "../ui/layouts";
import { Toaster } from "react-hot-toast";
import { saveLoginData } from "@core/state/login";
import { useAppContext } from "@core/state/AppContext";
import { ILoginResponse } from "@core/interfaces";

export const LoginContainer = () => {
  const { dispatch } = useAppContext();
  return (
    <LayoutLogin>
      <Login
        saveLoginData={(loginData: ILoginResponse) =>
          dispatch(saveLoginData(loginData))
        }
      />
      <Toaster />
    </LayoutLogin>
  );
};
