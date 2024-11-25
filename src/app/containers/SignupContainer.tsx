import { SignupForm } from "@ui/components/singup";
import { LayoutLogin } from "@ui/layouts";
import { Toaster } from "react-hot-toast";

export const SignupContainer = () => (
  <LayoutLogin>
    <SignupForm />
    <Toaster />
  </LayoutLogin>
);
