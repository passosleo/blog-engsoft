"use client";
import WelcomeImage from "@/assets/images/welcome-image.jpg";
import { CustomLoading } from "@/components/CustomLoading";
import Logo from "@/assets/images/logo-name.svg";
import { useAuth } from "@/context/AuthContext";
import { useMobile } from "@/hooks/useMobile";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMobile();
  const { authentication, isLoading } = useAuth();

  if (isLoading) {
    return <CustomLoading isLoading fullScreen />;
  }

  if (authentication.authenticated) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-row items-center justify-center">
        <div className={twMerge("w-[60%] h-screen", isMobile && "hidden")}>
          <Image
            src={WelcomeImage}
            alt="Image"
            className="h-full object-cover shadow-xl"
          />
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
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
