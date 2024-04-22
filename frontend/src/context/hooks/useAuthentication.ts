import { useCookies } from "@/hooks/useCookies";
import { useUserAccess } from "@/stores/user-access";
import { User } from "@/types/user";
import { JwtDecode, verifyTokenExpirationTime } from "@/utils/functions/jwt-verify";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export function useAuthentication() {
  const { setUser } = useUserAccess();
  const { setCookie, getCookie } = useCookies();


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
      console.log("user !: ", user);
      setAuthenticated(token);
      setUser(user);
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    verifyToken();
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

  return {
    isLoading,
    authentication,
    setAuthenticated,
  }
}