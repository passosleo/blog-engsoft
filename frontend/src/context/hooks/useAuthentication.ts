import { useCookies } from "@/hooks/useCookies";
import { useUserAccess } from "@/stores/user-access";
import { User } from "@/types/user";
import {
  JwtDecode,
  verifyTokenExpirationTime,
} from "@/utils/functions/jwt-verify";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthentication() {
  const { setUser } = useUserAccess();
  const { setCookie, getCookie, invalidateCookie } = useCookies();
  const router = useRouter();

  const [authentication, setAuthentication] = useState({
    token: "",
    authenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  function verifyToken() {
    const token = getCookie<string>("token");
    if (token) {
      const decoded = jwtDecode<JwtDecode>(token);
      const user = decoded.account as User;
      setAuthenticated(token);
      setUser(user);
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setAuthenticated(token: string) {
    try {
      const decoded = jwtDecode<JwtDecode>(token);
      const user = decoded.account as User;
      const dateExpiration = decoded.exp ? new Date(decoded.exp * 1000) : null;

      const isTokenValid = verifyTokenExpirationTime(decoded);
      if (!isTokenValid) {
        return setAuthentication({ token: "", authenticated: false });
      } else {
        setAuthentication({ token, authenticated: true });
        setUser(user);
        setCookie("token", token, dateExpiration);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    invalidateCookie("token");
    setAuthentication({ token: "", authenticated: false });
    router.push("/login");
    setUser(null);
  }

  return {
    logout,
    isLoading,
    authentication,
    setAuthenticated,
  };
}
