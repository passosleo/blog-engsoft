"use client"
import { createContext, useContext } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

export type AuthenticatedParams = {
  token: string;
  authenticated: boolean;
};

type AuthProps = {
  authentication: AuthenticatedParams;
  isLoading: boolean;
  setAuthenticated: (token: string) => void;
};

type AuthProvider = {
  children: JSX.Element | JSX.Element[];
};
 

const AuthContext = createContext<AuthProps>({} as AuthProps);

export const AuthProvider = ({ children }: AuthProvider) => {
  const { authentication, isLoading, setAuthenticated } = useAuthentication();

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        authentication,
        setAuthenticated, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
