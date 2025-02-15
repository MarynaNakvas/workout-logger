"use client";

import { useMsal } from "@azure/msal-react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

import Spinner from "@/components/spinner";
import { useRootStore } from "@/hooks/useStore";
import { User } from "@/models";

const Account: FC = observer(() => {
  const { instance, accounts } = useMsal();
  const router = useRouter();
  const { userStore } = useRootStore();

  const fetchToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      await userStore.getAccessToken(instance, accounts[0]);
    }
  };

  useEffect(() => {
    if (accounts.length > 0) {
      fetchToken();
      const storagedUser = localStorage.getItem("user");
      const userData = userStore.checkIsNewUser(accounts[0].username);

      const currentUser = {
        email: accounts[0].username,
        name: accounts[0].name,
      } as User;

      !!storagedUser
        ? userStore.setUser(JSON.parse(storagedUser))
        : userData
          ? userStore.setUser(userData)
          : userStore.addUser(currentUser);
    }
  }, [accounts]);

  useEffect(() => {
    if (userStore.isAuthenticated) {
      router.push("/dashboard");
    }
  }, [userStore.isAuthenticated]);

  return (
    <div className="h-screen flex items-center">
      <Spinner isLoading={true} />
    </div>
  );
});

export default Account;
