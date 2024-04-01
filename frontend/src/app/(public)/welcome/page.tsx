"use client";

import { CustomButton } from "@/components/CustomButton";
import { When } from "@/components/When";
import { useState } from "react";
import Login from "../login/page";
import Arrow from "@/assets/icons/arrow-left.svg";
import Image from "next/image";
export function Welcome() {
  const [isLogged, setIsLogged] = useState<"" | "login" | "register">("");

  function onLogged(value: "" | "login" | "register") {
    setIsLogged(value);
  }

  function BackButton() {
    return (
      <div>
        <button
          onClick={() => onLogged("")}
          className="flex flex-row items-center gap-1"
        >
          <Image src={Arrow} alt="Voltar" width={20} height={20} />
          {/* <span className="text-sm font-semibold">Voltar</span> */}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Bem vindo ao Blog EngSoft</h1>
      <p className="text-lg mt-2">Um blog sobre tecnologia</p>
      <div className="flex flex-col gap-3 p-5 m-3 bg-white rounded-lg shadow-lg max-w-md w-full">
        <When condition={isLogged === ""}>
          <CustomButton onClick={() => onLogged("login")}>Acessar</CustomButton>
          <CustomButton onClick={() => onLogged("register")}>
            Criar uma conta
          </CustomButton>
        </When>

        <When condition={isLogged === "login"}>
          <BackButton />
          <Login />
        </When>

        <When condition={isLogged === "register"}>
          <BackButton />
        </When>
      </div>
    </div>
  );
}
