"use client";

import { observer } from "mobx-react-lite";
import Image from "next/image";
import { FC, ReactNode, useEffect, useMemo } from "react";

import { useRootStore } from "@/hooks/useStore";
import {
  getBestPace,
  getLongestDistance,
  getTotalDistance,
} from "@/utils/values";

import SignOutButton from "./sign-out-button";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = observer(({ children }) => {
  const { userStore, workoutStore } = useRootStore();
  const accessToken = userStore.accessToken;
  const userWorkouts = workoutStore.userWorkouts;
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
      userStore.getUserPhoto();
    }
  }, [accessToken]);

  return (
    <>
      <h2 className="px-4 py-8 text-3xl font-bold text-center tracking-[1.25px]">
        Workout Logger
      </h2>
      <div className="px-4 flex gap-6">
        <div className="w-[140px] flex flex-col items-center gap-4">
          <Image
            className="rounded-full"
            src={userStore.userPhoto || "/avatar.png"}
            alt="User photo"
            width={150}
            height={150}
          />
          <div className="text-xl text-center">{userStore.user?.name}</div>
        </div>

        <div className="grow">
          <div>
            <div className="mb-4">
              <div className="text-2xl tracking-[1.25px]">Total distance</div>
              <div className="text-[27px] tracking-[1.25px] font-bold">
                {`${totalDistance} km`}
              </div>
            </div>
            <div className="mb-4 flex gap-4">
              <div className="text-lg">
                <div>Best pace</div>
                <div>{bestPace}</div>
              </div>
              <div className="text-lg">
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
