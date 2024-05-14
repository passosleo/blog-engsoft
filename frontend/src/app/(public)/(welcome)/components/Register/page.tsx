import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { CustomForm } from "@/components/CustomForm";
import { registerSchema } from "@/schemas/register";
import { useRequest } from "@/services/hooks/useRequest";
import { useAuth } from "@/context/AuthContext";
import { CustomLoading } from "@/components/CustomLoading";

type PayloadSignUp = {
  name: string;
  email: string;
  password: string;
};

type ResponseSignUp = {
  token: string;
  type: string;
};

export function Register() {
  const { setAuthenticated } = useAuth();

  const [createUser, isLoading] = useRequest<PayloadSignUp, ResponseSignUp>({
    host: "authService",
    routeName: "createUser",
    enabled: false,
    onSuccess: (res) => setAuthenticated(res.data.token),
  });

  function onSubmit(values: PayloadSignUp) {
    createUser({
      payload: {
        body: values,
      },
    });
  }

  return (
    <div>
      <h1 className="text-center text-lg font-semibold my-3">Cadastre-se</h1>
      <CustomLoading isLoading={isLoading}>
        <CustomForm onSubmit={onSubmit} zodSchema={registerSchema}>
          <CustomInput
            name="name"
            type="text"
            label="Nome"
            disabled={isLoading}
          />
          <CustomInput
            name="email"
            type="email"
            label="E-mail"
            disabled={isLoading}
          />
          <CustomInput
            name="password"
            type="password"
            label="Senha"
            disabled={isLoading}
          />
          <CustomInput
            name="confirmPassword"
            type="password"
            label="Confirmar Senha"
            disabled={isLoading}
          />
          <CustomButton type="submit" className="mt-5" disabled={isLoading}>
            Cadastrar
          </CustomButton>
        </CustomForm>
      </CustomLoading>
    </div>
  );
}
