import { useQueryParams } from "@//hooks/useQueryParams";
// import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { loginSchema } from "@/schemas/login";

export function useLogin() {
  const [queryParams] = useQueryParams<{ callbackUrl?: string }>();
  const [isLoading, setIsLoading] = useState(false);
  // const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  function onSubmit(data: z.infer<typeof loginSchema>) {
  
   /*  setIsLoading(true);
    const callbackUrl = queryParams?.callbackUrl
      ? new URL(queryParams.callbackUrl).pathname +
        new URL(queryParams.callbackUrl).search
      : "/dashboard";

    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/dashboard",
    }).then((res) => {
      if (res && res.ok) {
        window.location.href = callbackUrl;
      }
      if (res && res.error) {
        toast.error(res.error);
        setIsLoading(false);
      }
    }); */
  }

  return {
    onSubmit,
    isLoading,
    isVerifyingSession: status === "authenticated" || status === "loading",
  };
}
