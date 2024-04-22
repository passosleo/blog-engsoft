"use client";
import { CustomAvatar } from "@/components/CustomAvatar";
import Image from "next/image";

import EngSoft from '@/assets/images/engsoft.svg'

import Link from "next/link";
import { useUserAccess } from "@/stores/user-access";

export function Header() {
  const { user } = useUserAccess()
  console.log("user: ", user.name);
  return (
    <header className="bg-black-secundary w-full flex items-center border-b border-[#29292E] fixed top-0 left-0 right-0 h-16 z-50">
      <div className="max-w-screen-xl mx-auto w-full px-4">
        <div className="flex flex-row justify-between items-center">
          <Link href="/home" className="">
            {/* <Image src={Logo} alt="Logo" width={45} height={45} /> */}
            <Image src={EngSoft} alt="Logo" width={120} height={120} />
          </Link>

          <CustomAvatar name={user.name} />
        </div>
      </div>
    </header>
  );
}
