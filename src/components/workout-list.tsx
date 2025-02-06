"use client";

import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/root-store";
import { SignInButton } from "./button";

const WorkoutList: FC = observer(() => {
  useEffect(() => {
    rootStore.workoutStore.fetchWorkouts();
  }, []);

  console.log("rootStore", rootStore);

  return (
    <div>
      <SignInButton />
      <h1>Workouts</h1>
      {rootStore.workoutStore.isLoading && <p>Loading...</p>}
      <ul>
        {rootStore.workoutStore.workouts.map((workout) => {
          const date = new Date(workout.dateWorkout).toLocaleDateString();
          return (
            <li key={workout.objectId}>
              {date} - {workout.distance} km - {workout.duration} h
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default WorkoutList;
