"use client";
import { CustomLoading } from "@/components/CustomLoading";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { CustomForm } from "@/components/CustomForm";
import { loginSchema } from "@/schemas/login";
import Logo from "@/assets/images/logo.svg";
import { useLogin } from "./hooks/useLogin";
import Image from "next/image";
import { CustomLink } from "@/components/CustomLink";

export default function Login() {
  const { onSubmit, isLoading, isVerifyingSession } = useLogin();

  if (isVerifyingSession) {
    return <CustomLoading isLoading fullScreen />;
  }

  return (
    <div>
      <CustomLoading isLoading={isLoading}>
        <div className="mb-3">
          <Image
            src={Logo}
            alt="Logo"
            width={100}
            className="mx-auto"
            priority
          />
          <h1 className="text-center font-medium text-lg">EngSoft</h1>
        </div>
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
