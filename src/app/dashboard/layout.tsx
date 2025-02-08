"use client";

import { FC, ReactNode } from "react";
import Image from "next/image";
import { get } from "lodash";
import { rootStore } from "@/stores/root-store";
import SignOutButton from "./sign-out-button";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const userName = get(rootStore.userStore.user, "name");

  return (
    <>
      <h2 className="px-4 py-8 text-3xl font-bold text-center tracking-[1.25px]">
        Workout Logger
      </h2>
      <div className="px-4 flex gap-10">
        <div className="flex flex-col items-center gap-5">
          <Image
            className="rounded-full"
            src="/photo.png"
            alt="User photo"
            width={150}
            height={150}
          />
          <div className="text-xl">{userName}</div>
        </div>

        <div className="grow">
          <div>
            <div className="mb-4">
              <div className="text-2xl tracking-[1.25px]">Total distance</div>
              <div className="text-[27px] tracking-[1.25px] font-bold">
                1000 km
              </div>
            </div>
            <div className="mb-4 flex gap-6">
              <div className="text-2xl tracking-[1.25px]">
                <div>Best pace</div>
                <div>5:45</div>
              </div>
              <div className="text-2xl tracking-[1.25px]">
                <div>Longest run</div>
                <div>14.5 km</div>
              </div>
            </div>
          </div>
          <SignOutButton />
        </div>
      </div>
      {children}
    </>
  );
};

export default DashboardLayout;
