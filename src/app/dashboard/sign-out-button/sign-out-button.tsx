"use client";

import { useMsal } from "@azure/msal-react";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/stores/root-store";
import { useRouter } from "next/navigation";

const SignOutButton = observer(() => {
  const { instance } = useMsal();
  const router = useRouter();

  const isMicrosoftUser = !!rootStore.userStore.user?.idToken;

  const handleLogout = () => {
    if (isMicrosoftUser) {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
      localStorage.removeItem("user");
    } else {
      rootStore.userStore.logout();
      router.push("/");
    }
  };

  return (
    <button
      className="px-8 py-2 text-lg tracking-[1.25px] font-bold bg-button-dark rounded-full"
      onClick={() => handleLogout()}
    >
      Sign Out
    </button>
  );
});

export default SignOutButton;
