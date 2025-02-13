"use client";

import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { rootStore } from "@/stores/root-store";
import Spinner from "@/components/spinner";

const Home: FC = observer(() => {
  const router = useRouter();

  useEffect(() => {
    if (rootStore.userStore.isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  }, []);

  return (
    <div className="h-[90vh] flex items-center">
      <Spinner isLoading={true} />
    </div>
  );
});

export default Home;
