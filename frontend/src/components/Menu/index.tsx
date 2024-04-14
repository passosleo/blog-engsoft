import Image from "next/image";
import Link from "next/link";
import EngSoft from "@/assets/images/engsoft.svg";
import { CustomAvatar } from "../CustomAvatar";

export function Menu() {
  return (
    <div className="mr-5 flex items-center flex-col gap-5">
      {/* <Link href="/home" className="">
        <Image
          src={EngSoft}
          alt="Logo"
          width={120}
          height={120}
          className="hover:opacity-90"
        />
      </Link> */}

      <div className="bg-black-secundary h-36 w-72 rounded-lg px-4 py-6 flex flex-col items-center">
        {/* <CustomAvatar name="John Doe" /> */}
          
          <p className="m-0">Front-End</p>
          <p className="m-0">Backend</p>
          <p className="m-0">Inteligencia artificial</p>
          <p className="m-0">Dev ops</p>

      </div>
    </div>
  );
}
