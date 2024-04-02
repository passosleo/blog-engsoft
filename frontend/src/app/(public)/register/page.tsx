import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { CustomForm } from "@/components/CustomForm";
import Logo from "@/assets/images/logo.svg";
import Image from "next/image";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import { RegisterSchema } from "@/schemas/register";

export function Register() {
  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <div>
      {/* <div className="mb-3">
        <Image src={Logo} alt="Logo" width={100} className="mx-auto" priority />
        <h1 className="text-center font-medium text-lg">EngSoft</h1>
      </div> */}
      <CustomForm onSubmit={onSubmit} zodSchema={RegisterSchema}>
        <CustomInput name="name" type="text" label="Nome" />
        <CustomInput name="username" type="text" label="Username" />

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
