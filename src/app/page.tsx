"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { rootStore } from "@/stores/root-store";

const Home: FC = () => {
  const router = useRouter();
  console.log("rootStore.userStore", rootStore.userStore);

  useEffect(() => {
    if (rootStore.userStore.isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  }, []);

  return <div>Loading ...</div>;
};

export default Home;
