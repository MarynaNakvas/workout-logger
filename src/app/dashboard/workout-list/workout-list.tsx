"use client";

import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";

import Spinner from "@/components/spinner";
import { useRootStore } from "@/hooks/useStore";
import { Workout } from "@/models";

import WorkoutRow from "./workout-row";

interface WorkoutListProps {
  setIsConfirmModalShow: (prop: boolean) => void;
  setWorkoutId: (prop?: string) => void;
  setIsWorkoutModalShow: (prop: boolean) => void;
  setWorkout: (prop: Workout) => void;
}

const WorkoutList: FC<WorkoutListProps> = observer(
  ({
    setIsConfirmModalShow,
    setWorkoutId,
    setIsWorkoutModalShow,
    setWorkout,
  }) => {
    const { userStore, workoutStore } = useRootStore();
    const userId = userStore.user?.objectId;
    const workouts = workoutStore.workouts;
    const userWorkouts = workoutStore.userWorkouts;

    useEffect(() => {
      workoutStore.fetchWorkouts();
    }, []);

    useEffect(() => {
      if (workouts.length && userId) {
        workoutStore.getUserWorkouts(userId);
      }
    }, [workouts, userId]);

    return (
      <Spinner isLoading={workoutStore.isLoading}>
        <div className="px-4">
          <h1 className="pb-4 text-2xl font-bold">Workouts</h1>
          <div className="mb-8 bg-table rounded-2xl">
            <div className="py-2 grid grid-cols-table justify-items-center text-base border-b-2 border-black">
              <span>Date</span>
              <span>Distance</span>
              <span>Time</span>
              <span>Pace</span>
              <span />
            </div>

            {userWorkouts.length ? (
              userWorkouts.map((item) => (
                <WorkoutRow
                  key={item.objectId}
                  workout={item}
                  setIsConfirmModalShow={setIsConfirmModalShow}
                  setWorkoutId={setWorkoutId}
                  setIsWorkoutModalShow={setIsWorkoutModalShow}
                  setWorkout={setWorkout}
                />
              ))
            ) : (
              <div className="px-4 py-16 flex items-center justify-center">
                <span className="text-lg">There are no items for now</span>
              </div>
            )}
          </div>
        </div>
      </Spinner>
    );
  }
);

export default WorkoutList;
