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
  logout: () => void;
  setAuthenticated: (token: string) => void;
};

type AuthProvider = {
  children: React.ReactNode;
};


const AuthContext = createContext<AuthProps>({} as AuthProps);

export const AuthProvider = ({ children }: AuthProvider) => {
  const { authentication, isLoading, setAuthenticated, logout } = useAuthentication();

  return (
    <AuthContext.Provider
      value={{
        logout,
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
