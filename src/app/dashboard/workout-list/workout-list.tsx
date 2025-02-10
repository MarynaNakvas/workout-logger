"use client";

import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/stores/root-store";
import Spinner from "@/components/spinner";
import WorkoutRow from "./workout-row";
import ConfirmModal from "@/components/confirm-action-modal";
import WorkoutModal from "@/components/workout-modal";
import { Workout } from "@/models";

const WorkoutList: FC = observer(() => {
  const [isConfirmModalShow, setIsConfirmModalShow] = useState<boolean>(false);
  const [isWorkoutModalShow, setIsWorkoutModalShow] = useState<boolean>(false);
  const [workoutId, setWorkoutId] = useState<string | undefined>(undefined);
  const [workout, setWorkout] = useState<Workout | undefined>(undefined);
  const userId = rootStore.userStore.user?.objectId;
  const workouts = rootStore.workoutStore.workouts;
  const userWorkouts = rootStore.workoutStore.userWorkouts;

  useEffect(() => {
    rootStore.workoutStore.fetchWorkouts();
  }, []);

  useEffect(() => {
    if (workouts.length && userId) {
      rootStore.workoutStore.getUserWorkouts(userId);
    }
  }, [workouts, userId]);

  return (
    <>
      <div className="px-8 py-8">
        <button
          className="w-full py-3 text-button text-xl text-primary bg-secondary rounded-full"
          onClick={() => setIsWorkoutModalShow(true)}
        >
          Add Run
        </button>
      </div>

      <Spinner isLoading={rootStore.workoutStore.isLoading}>
        <div className="px-4">
          <h1 className="pb-4 text-2xl font-bold">Workouts</h1>
          <div className="bg-table rounded-2xl">
            <div className="py-2 grid grid-cols-5 justify-items-center text-lg border-b-2 border-black">
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

      {isConfirmModalShow && (
        <ConfirmModal
          setIsConfirmModalShow={setIsConfirmModalShow}
          workoutId={workoutId}
        />
      )}

      {isWorkoutModalShow && (
        <WorkoutModal
          setIsWorkoutModalShow={setIsWorkoutModalShow}
          workout={workout}
        />
      )}
    </>
  );
});

export default WorkoutList;
