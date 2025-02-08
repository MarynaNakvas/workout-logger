"use client";

import { useMsal } from "@azure/msal-react";

const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  return (
    <button
      className="px-8 py-2 text-lg tracking-[1.25px] font-bold bg-button-dark rounded-full"
      onClick={() => handleLogout()}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
