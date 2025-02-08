"use client";

import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { rootStore } from "@/stores/root-store";
import Spinner from "@/components/spinner";
import { calculatePace } from "@/utils/values";

const WorkoutList: FC = observer(() => {
  useEffect(() => {
    rootStore.workoutStore.fetchWorkouts();
  }, []);

  return (
    <>
      <div className="px-8 py-8">
        <button className="w-full py-3 text-button text-xl text-primary bg-secondary rounded-full">
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
            {rootStore.workoutStore.workouts.map((workout) => {
              const date = new Date(workout.dateWorkout).toLocaleDateString();
              return (
                <li
                  key={workout.objectId}
                  className="py-4 grid grid-cols-5 justify-items-center border-b-2 border-black last:border-none"
                >
                  <span>{date}</span>
                  <span>{workout.distance}</span>
                  <span>{workout.duration}</span>
                  <span>
                    {calculatePace(workout.duration, workout.distance)}
                  </span>
                  <div className="flex gap-4">
                    <button>
                      <Image
                        className="rounded-full invert"
                        src="/edit.svg"
                        alt="Edit"
                        width={25}
                        height={25}
                      />
                    </button>
                    <button className="text-text">
                      <Image
                        className="rounded-full invert"
                        src="/delete.svg"
                        alt="Delete"
                        width={25}
                        height={25}
                      />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Spinner>
    </>
  );
});

export default WorkoutList;
