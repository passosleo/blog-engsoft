import { CustomLoading } from "@/components/CustomLoading";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { CustomForm } from "@/components/CustomForm";
import { loginSchema } from "@/schemas/login";
import { useRequest } from "@/services/hooks/useRequest";
import { useAuth } from "@/context/AuthContext";
import { DefaultResponse } from "@/services/types";

type PayloadSignIn = {
  email: string;
  password: string;
};

type ResponseSignIn = DefaultResponse & {
  data: {
    token: string;
    type: string;
  }
};

export default function Login() {
  const { setAuthenticated } = useAuth();

  const [signIn, isLoading] = useRequest<PayloadSignIn, ResponseSignIn>({
    routeName: "signIn",
    enabled: false,
    onSuccess: (res) => {
      setAuthenticated(res.data.token);
    },
  });

  // if (isVerifyingSession) {
  //   return <CustomLoading isLoading fullScreen />;
  // }

  function onSubmit(values: PayloadSignIn) {
    signIn({
      payload: {
        body: values,
      },
    });
  }

  return (
    <div>
      <CustomLoading isLoading={isLoading}>
        <h1 className="text-center text-lg font-semibold my-3">
          Acesse sua conta
        </h1>
        <CustomForm onSubmit={onSubmit} zodSchema={loginSchema}>
          <CustomInput name="email" type="email" label="E-mail" />
          <CustomInput name="password" type="password" label="Senha" />
          <CustomButton type="submit" className="mt-5">
            Acessar
          </CustomButton>
        </CustomForm>
      </CustomLoading>
    </div>
  );
}
