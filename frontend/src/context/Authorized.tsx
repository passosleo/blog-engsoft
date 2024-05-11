import { CustomLoading } from "@/components/CustomLoading";
import { useAuth } from "./AuthContext";
import { redirect } from "next/navigation";


type Props = {
  children: React.ReactNode;
};

export function Authorized({ children }: Props) {
  const { authentication, isLoading } = useAuth();

  if (isLoading) {
    return <CustomLoading isLoading fullScreen />;
  }

  if (!authentication.authenticated) {
    return redirect("/login");
  }

  return children;
}