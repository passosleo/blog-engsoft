"use client";

import { useAuth } from "@/context/AuthContext";
import { useRequest } from "@/services/hooks/useRequest";
import { UseFormReturn } from "react-hook-form";
import { CustomLoading } from "@/components/CustomLoading";
import { CustomForm } from "@/components/CustomForm";
import { CustomInput } from "@/components/CustomInput";
import { CustomButton } from "@/components/CustomButton";
import { loginSchema } from "@/schemas/login";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

type PayloadSignIn = {
  email: string;
  password: string;
};

type ResponseSignIn = {
  token: string;
  type: string;
};

export default function Login() {
  const { setAuthenticated } = useAuth();

  const [signIn, isLoading] = useRequest<PayloadSignIn, ResponseSignIn>({
    host: "authService",
    routeName: "signIn",
    enabled: false,
    notHandleError: true,
    onSuccess: (res) => setAuthenticated(res.data.token),
  });

  function onSubmit(values: PayloadSignIn, form: UseFormReturn<PayloadSignIn>) {
    signIn({
      payload: {
        body: values,
      },
      onError: (error) => {
        if (error.status === 401) {
          form.setError("password", {
            type: "manual",
            message: "Senha inválida",
          });
        } else if (error.status === 404) {
          form.setError("email", {
            type: "manual",
            message: "E-mail não encontrado",
          });
        } else {
          toast({
            title: "Ops! Algo deu errado. Tente novamente mais tarde.",
            className: "bg-red-600 text-white",
          });
        }
      },
    });
  }

  return (
    <div>
      <h1 className="text-center text-lg font-semibold my-3">
        Acesse sua conta
      </h1>
      <CustomLoading isLoading={isLoading}>
        <CustomForm onSubmit={onSubmit} zodSchema={loginSchema}>
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
          <CustomButton type="submit" className="mt-5" disabled={isLoading}>
            Acessar
          </CustomButton>
        </CustomForm>
      </CustomLoading>
      <div className="text-sm text-center border-t border-[#29292E] pt-5 mt-5">
        Não possui uma conta?{" "}
        <Link href="/register" className="font-bold text-primary underline">
          Cadastre-se aqui
        </Link>
      </div>
    </div>
  );
}
