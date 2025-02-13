"use client";

import { FC, ReactNode, useEffect, useMemo } from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/stores/root-store";
import SignOutButton from "./sign-out-button";
import {
  getBestPace,
  getLongestDistance,
  getTotalDistance,
} from "@/utils/values";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = observer(({ children }) => {
  const accessToken = rootStore.userStore.accessToken;
  const userWorkouts = rootStore.workoutStore.userWorkouts;
  const { totalDistance, longestDistance, bestPace } = useMemo(() => {
    const totalDistance = getTotalDistance(userWorkouts);
    const longestDistance = getLongestDistance(userWorkouts);
    const bestPace = getBestPace(userWorkouts);

    return {
      totalDistance: Math.round(totalDistance * 100) / 100 || 0,
      longestDistance,
      bestPace,
    };
  }, [userWorkouts]);

  useEffect(() => {
    if (accessToken) {
      rootStore.userStore.getUserPhoto();
    }
  }, [accessToken]);

  return (
    <>
      <h2 className="px-4 py-8 text-3xl font-bold text-center tracking-[1.25px]">
        Workout Logger
      </h2>
      <div className="px-4 flex gap-10">
        <div className="flex flex-col items-center gap-5">
          <Image
            className="rounded-full"
            src={rootStore.userStore.userPhoto || "/avatar.png"}
            alt="User photo"
            width={150}
            height={150}
          />
          <div className="text-xl">{rootStore.userStore.user?.name}</div>
        </div>

        <div className="grow">
          <div>
            <div className="mb-4">
              <div className="text-2xl tracking-[1.25px]">Total distance</div>
              <div className="text-[27px] tracking-[1.25px] font-bold">
                {`${totalDistance} km`}
              </div>
            </div>
            <div className="mb-4 flex gap-6">
              <div className="text-2xl tracking-[1.25px]">
                <div>Best pace</div>
                <div>{bestPace}</div>
              </div>
              <div className="text-2xl tracking-[1.25px]">
                <div>Longest run</div>
                <div>{`${longestDistance} km`}</div>
              </div>
            </div>
          </div>
          <SignOutButton />
        </div>
      </div>
      {children}
    </>
  );
});

export default DashboardLayout;
