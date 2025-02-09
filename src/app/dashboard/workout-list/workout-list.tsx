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
  const [workoutId, setWorkoutId] = useState<string | null>(null);
  const [workout, setWorkout] = useState<Workout | undefined>(undefined);

  useEffect(() => {
    rootStore.workoutStore.fetchWorkouts();
  }, []);

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
          <ul className="bg-table rounded-2xl">
            <div className="py-2 grid grid-cols-5 justify-items-center text-lg border-b-2 border-black">
              <span>Date</span>
              <span>Distance</span>
              <span>Time</span>
              <span>Pace</span>
              <span />
            </div>
            {rootStore.workoutStore.workouts.map((item) => (
              <WorkoutRow
                key={item.objectId}
                workout={item}
                setIsConfirmModalShow={setIsConfirmModalShow}
                setWorkoutId={setWorkoutId}
                setIsWorkoutModalShow={setIsWorkoutModalShow}
                setWorkout={setWorkout}
              />
            ))}
          </ul>
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
