import { CustomLoading } from "@/components/CustomLoading";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { CustomForm } from "@/components/CustomForm";
import { loginSchema } from "@/schemas/login"; 

export default function Login() {
  // const { onSubmit, isLoading, isVerifyingSession } = useLogin();

  // if (isVerifyingSession) {
  //   return <CustomLoading isLoading fullScreen />;
  // }
  
  const isLoading = false;

  function onSubmit(values: any) {
    console.log(values);
  } 

  return (
    <div>
      <CustomLoading isLoading={isLoading}> 
      <h1 className="text-center text-lg font-semibold my-3">Acesse sua conta</h1>
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
