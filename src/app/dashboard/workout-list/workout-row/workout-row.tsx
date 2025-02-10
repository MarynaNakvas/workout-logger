"use client";

import { FC, memo } from "react";
import Image from "next/image";
import { calculatePace } from "@/utils/values";
import { Workout } from "@/models";

interface WorkoutRowProps {
  workout: Workout;
  setIsConfirmModalShow: (prop: boolean) => void;
  setWorkoutId: (prop?: string) => void;
  setIsWorkoutModalShow: (prop: boolean) => void;
  setWorkout: (prop: Workout) => void;
}

const WorkoutRow: FC<WorkoutRowProps> = memo(
  ({
    workout,
    setIsConfirmModalShow,
    setWorkoutId,
    setIsWorkoutModalShow,
    setWorkout,
  }) => {
    const date = workout.dateWorkout
      ? new Date(workout.dateWorkout).toLocaleDateString()
      : null;

    return (
      <div className="py-4 grid grid-cols-5 justify-items-center border-b-2 border-black last:border-none">
        <span>{date}</span>
        <span>{workout.distance}</span>
        <span>{workout.duration}</span>
        <span>
          {!!workout.duration &&
            !!workout.distance &&
            calculatePace(workout.duration, workout.distance)}
        </span>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setIsWorkoutModalShow(true);
              setWorkout(workout);
            }}
          >
            <Image
              className="rounded-full invert"
              src="/edit.svg"
              alt="Edit"
              width={25}
              height={25}
            />
          </button>
          <button
            onClick={() => {
              setIsConfirmModalShow(true);
              setWorkoutId(workout.objectId);
            }}
          >
            <Image
              className="rounded-full invert"
              src="/delete.svg"
              alt="Delete"
              width={25}
              height={25}
            />
          </button>
        </div>
      </div>
    );
  }
);

export default WorkoutRow;
