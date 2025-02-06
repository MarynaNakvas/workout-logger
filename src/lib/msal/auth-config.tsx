"use client";

import { FC, ReactNode } from "react";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./msal-config";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const msalInstance = new PublicClientApplication(msalConfig);
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default AuthProvider;
