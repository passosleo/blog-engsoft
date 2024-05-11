"use client"
import { CustomLoading } from "@/components/CustomLoading";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authentication, isLoading } = useAuth();

  if (isLoading) {
    return <CustomLoading isLoading fullScreen />;
  }

  if (authentication.authenticated) {
    return redirect("/home");
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      {children}
    </div>
  );
}
