"use client";
import { CustomAvatar } from "@/components/CustomAvatar";
import Image from "next/image";

import EngSoft from "@/assets/images/engsoft.svg";

import Link from "next/link";
import { useUserAccess } from "@/stores/user-access";
import { useAuth } from "@/context/AuthContext";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { When } from "@/components/shared/When";
import { CustomButton } from "@/components/CustomButton";
import { useRouter } from "next/navigation";

export function Header() {
  const { user } = useUserAccess();
  const { logout } = useAuth();
  const router = useRouter();

  const isLogged = user && Object.keys(user).length !== 0;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-black-secundary w-full flex items-center border-b border-[#29292E] fixed top-0 left-0 right-0 h-16 z-50">
      <div className="max-w-screen-xl mx-auto w-full px-4 flex flex-col relative">
        <div className="flex flex-row justify-between items-center">
          <Link href="/" className="">
            <Image src={EngSoft} alt="Logo" width={120} height={120} />
          </Link>
          <When condition={isLogged}>
            <CustomAvatar
              name={user?.name}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </When>
          <When condition={!isLogged}>
            <div className="flex gap-4">
              <CustomButton onClick={() => router.push("/login")}>
                Entrar
              </CustomButton>
              <CustomButton
                onClick={() => router.push("/register")}
                variant="outline"
                className="hover:opacity-85"
              >
                Cadastre-se
              </CustomButton>
            </div>
          </When>
        </div>
        <When condition={isLogged}>
          <div
            onClick={() => logout()}
            className={twMerge(
              "absolute right-0 bg-black py-2 px-4 gap-2 flex items-center rounded top-12 cursor-pointer",
              isMenuOpen ? "visible" : "invisible"
            )}
          >
            <LogOutIcon size={18} color="#8257E5" />
            <span className="text-sm">Sair</span>
          </div>
        </When>
      </div>
    </header>
  );
}
