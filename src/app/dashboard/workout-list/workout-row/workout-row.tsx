"use client";

import Image from "next/image";
import { FC, memo } from "react";

import { Workout } from "@/models";
import { calculatePace } from "@/utils/values";

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
      <div className="py-4 grid grid-cols-table justify-items-center border-b-2 border-black last:border-none">
        <span>{date}</span>
        <span>{workout.distance}</span>
        <span>{workout.duration}</span>
        <span>
          {!!workout.duration &&
            !!workout.distance &&
            calculatePace(workout.duration, workout.distance)}
        </span>
        <div className="flex gap-2">
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

WorkoutRow.displayName = "WorkoutRow";
export default WorkoutRow;
