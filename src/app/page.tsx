"use client";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

import Spinner from "@/components/spinner";
import { useRootStore } from "@/hooks/useStore";

const Home: FC = observer(() => {
  const router = useRouter();
  const { userStore } = useRootStore();

  useEffect(() => {
    if (userStore.isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  }, []);

  return (
    <div className="h-screen flex items-center">
      <Spinner isLoading={true} />
    </div>
  );
});

export default Home;
