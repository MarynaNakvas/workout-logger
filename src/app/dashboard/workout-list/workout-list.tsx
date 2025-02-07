"use client";

import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../stores/root-store";
import Spinner from "../../../components/spinner";

const WorkoutList: FC = observer(() => {
  useEffect(() => {
    rootStore.workoutStore.fetchWorkouts();
  }, []);

  return (
    <Spinner isLoading={rootStore.workoutStore.isLoading}>
      <div>
        <h1>Workouts</h1>
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
    </Spinner>
  );
});

export default WorkoutList;
