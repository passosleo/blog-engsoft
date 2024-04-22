import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { CustomForm } from "@/components/CustomForm"; 
import { RegisterSchema } from "@/schemas/register";
import { useRequest } from "@/services/hooks/useRequest";
import { useAuth } from "@/context/AuthContext";
import { DefaultResponse } from "@/services/types";

type PayloadSignUp = {
  name: string;
  email: string;
  password: string;
};

type ResponseSignUp = DefaultResponse & {
  data: {
    token: string;
    type: string;
  }
};

export function Register() {
  const { setAuthenticated } = useAuth();

  const [createUser, isLoading] = useRequest<PayloadSignUp, ResponseSignUp>({
    routeName: "createUser",
    enabled: false,
    onSuccess: (res) => {
      setAuthenticated(res.data.token);
    },
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
      <CustomForm onSubmit={onSubmit} zodSchema={RegisterSchema}>
        <CustomInput name="name" type="text" label="Nome" />
        {/* <CustomInput name="username" type="text" label="Username" /> */}
        <CustomInput name="email" type="email" label="E-mail" />
        <CustomInput name="password" type="password" label="Senha" />
        <CustomInput
          name="confirmPassword"
          type="password"
          label="Confirmar Senha"
        />
        <CustomButton type="submit" className="mt-5">
          Cadastrar
        </CustomButton>
      </CustomForm>
    </div>
  );
}
