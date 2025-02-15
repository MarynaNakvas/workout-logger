"use client";

import { FC, useState } from "react";
import { observer } from "mobx-react-lite";

import WorkoutList from "./workout-list";
import { Workout } from "@/models";
import ConfirmModal from "@/components/confirm-action-modal";
import WorkoutModal from "@/components/workout-modal";

const Dashboard: FC = observer(() => {
  const [isConfirmModalShow, setIsConfirmModalShow] = useState<boolean>(false);
  const [isWorkoutModalShow, setIsWorkoutModalShow] = useState<boolean>(false);
  const [workoutId, setWorkoutId] = useState<string | undefined>(undefined);
  const [workout, setWorkout] = useState<Workout | undefined>(undefined);
  localStorage.removeItem("account");

  return (
    <>
      <div className="px-8 py-8">
        <button
          className="w-full py-3 text-button text-xl text-primary bg-secondary rounded-full"
          onClick={() => {
            setWorkout(undefined);
            setIsWorkoutModalShow(true);
          }}
        >
          Add Run
        </button>
      </div>

      <WorkoutList
        setIsConfirmModalShow={setIsConfirmModalShow}
        setWorkoutId={setWorkoutId}
        setIsWorkoutModalShow={setIsWorkoutModalShow}
        setWorkout={setWorkout}
      />

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

export default Dashboard;
