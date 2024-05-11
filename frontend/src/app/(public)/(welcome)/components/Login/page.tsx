import { CustomLoading } from "@/components/CustomLoading";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { CustomForm } from "@/components/CustomForm";
import { loginSchema } from "@/schemas/login";
import { useRequest } from "@/services/hooks/useRequest";
import { useAuth } from "@/context/AuthContext";
import { DefaultResponse } from "@/services/types";
import { UseFormReturn } from "react-hook-form";

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
    host: 'authService',
    routeName: "signIn",
    enabled: false,
    onSuccess: (res) => setAuthenticated(res.data.token),
  });

  function onSubmit(values: PayloadSignIn, form: UseFormReturn<PayloadSignIn>) {
    signIn({
      payload: {
        body: values,
      },
      onError: (error) => {
        if (error.status === 401) {
          form.setError('password', {
            type: 'manual',
            message: 'Senha inválida'
          })
        }
        if (error.status === 404) {
          form.setError('email', {
            type: 'manual',
            message: 'E-mail não encontrado'
          })
        }
      }
    });
  }

  return (
    <div>

      <h1 className="text-center text-lg font-semibold my-3">
        Acesse sua conta
      </h1>
      <CustomLoading isLoading={isLoading}>
        <CustomForm onSubmit={onSubmit} zodSchema={loginSchema}>
          <CustomInput name="email" type="email" label="E-mail" disabled={isLoading} />
          <CustomInput name="password" type="password" label="Senha" disabled={isLoading} />
          <CustomButton type="submit" className="mt-5" disabled={isLoading}>
            Acessar
          </CustomButton>
        </CustomForm>
      </CustomLoading>
    </div>
  );
}
