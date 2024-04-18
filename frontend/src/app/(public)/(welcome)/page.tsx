"use client";

import { When } from "@/components/shared/When";
import { useState } from "react";
import Image from "next/image";
import WelcomeImage from "@/assets/images/welcome-image.jpg";
import { useMobile } from "@/hooks/useMobile";
import { twMerge } from "tailwind-merge";
import Logo from "@/assets/images/logo-name.svg";
import Login from "./components/Login/page";
import { Register } from "./components/Register/page"; 

export default function Welcome() { 
  const [isLogged, setIsLogged] = useState<"login" | "register">("login");

  const isMobile = useMobile();
  
  function onLogged(value: "login" | "register") {
    setIsLogged(value);
  }
   
  return (
    <div className="flex flex-row items-center justify-center">
      <div
        className={twMerge(
          "w-[60%] h-screen",
          isMobile && "hidden"
        )}
      >
        <Image src={WelcomeImage} alt="Image" className="h-full object-cover shadow-xl" />
      </div>
      <div
        className={twMerge(
          "flex justify-center h-screen items-center",
          isMobile ? "w-screen" : "w-[40%]"
        )}
      >
        <div className="flex flex-col gap-3 p-5 m-3 max-w-md w-full">
          <Image
            src={Logo}
            alt="Logo"
            width={100}
            className="mx-auto"
            priority
          />
          <When condition={isLogged === "login"}>
            <Login />
            <div className="text-sm text-center border-t border-[#29292E] pt-5 mt-5">
              Não possui uma conta?{" "}
              <span
                onClick={() => onLogged("register")}
                className="font-bold cursor-pointer"
              >
                Cadastre-se aqui
              </span>
            </div>
          </When>
          <When condition={isLogged === "register"}>
            <Register />
            <div className="text-sm text-center border-t border-[#29292E] pt-5 mt-5">
              Já possui conta?{" "}
              <span
                onClick={() => onLogged("login")}
                className="font-bold cursor-pointer"
              >
                Entre na plataforma
              </span>
            </div>
          </When>
        </div>
      </div>
    </div>
  );
}
