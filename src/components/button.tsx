"use client";

import React from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msal/msal-config";

export const SignInButton = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={() => handleLogout()}>Sign Out</button>
      ) : (
        <button onClick={() => handleLogin()}>Log In</button>
      )}
    </div>
  );
};
