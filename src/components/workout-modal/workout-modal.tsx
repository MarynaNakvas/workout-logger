"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { rootStore } from "@/stores/root-store";
import { Workout } from "@/models";
import { calculatePace } from "@/utils/values";

const initialValues: Workout = {
  dateWorkout: undefined,
  distance: undefined,
  duration: undefined,
  pace: undefined,
};

interface WorkoutModalProps {
  setIsWorkoutModalShow: (prop: boolean) => void;
  workout?: Workout;
}

const WorkoutModal: FC<WorkoutModalProps> = observer(
  ({ setIsWorkoutModalShow, workout }) => {
    const [newWorkout, setNewWorkout] = useState(workout || initialValues);

    const handleChangeValue = useCallback(
      (key: string, value: string) => {
        setNewWorkout((prevValue) => ({
          ...prevValue,
          [key]: value,
        }));
      },
      [newWorkout]
    );

    const onAccept = useCallback(() => {
      if (workout) {
        rootStore.workoutStore.updateWorkout(newWorkout);
        setIsWorkoutModalShow(false);
      }
      if (newWorkout) {
        rootStore.workoutStore.addWorkout(newWorkout);
        setIsWorkoutModalShow(false);
      }
    }, [workout, newWorkout]);

    const onCancel = useCallback(() => {
      setIsWorkoutModalShow(false);
    }, []);

    useEffect(() => {
      if (!!newWorkout.distance && !!newWorkout.duration) {
        const pace = calculatePace(newWorkout.duration, newWorkout.distance);
        setNewWorkout((prevValue) => ({
          ...prevValue,
          pace,
        }));
      }
    }, [newWorkout.distance && newWorkout.duration]);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-[80vw] p-4 bg-table rounded-lg">
          <h1 className="text-xl font-bold tracking-[1.25px]">{`${workout ? "Update" : "Add"} workout`}</h1>
          <div className="pt-2 pb-8">Please fill fields:</div>
          <form className="mb-10">
            <div className="flex items-end gap-6 mb-4">
              <div className="w-[50%]">
                <label htmlFor="date" className="pb-2 block text-reg">
                  Date
                </label>
                <input
                  className="w-full px-3 py-2 mt-1 text-primary border border-secondary rounded-md focus:outline-none"
                  type="date"
                  id="date"
                  value={newWorkout.dateWorkout}
                  onChange={(e) =>
                    handleChangeValue("dateWorkout", e.target.value)
                  }
                />
              </div>

              <div>
                <label htmlFor="distance" className="pb-2 block text-reg">
                  Distance
                </label>
                <input
                  className="w-full px-3 py-2 mt-1 text-primary border border-secondary rounded-md focus:outline-none"
                  id="distance"
                  placeholder="Distance"
                  value={newWorkout.distance}
                  onChange={(e) =>
                    handleChangeValue("distance", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-[50%]">
                <label htmlFor="duration" className="pb-2 block text-reg">
                  Duration
                </label>
                <input
                  className="w-full px-3 py-2 mt-1 text-primary border border-secondary rounded-md focus:outline-none"
                  id="duration"
                  placeholder="Duration"
                  value={newWorkout.duration}
                  onChange={(e) =>
                    handleChangeValue("duration", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="pb-2 block text-reg">Pace</label>
                <input
                  className="w-full px-3 py-2 mt-1 text-primary border border-secondary rounded-md focus:outline-none"
                  placeholder="Pace"
                  value={newWorkout.pace}
                  disabled
                />
              </div>
            </div>
          </form>
          <button
            className="mr-6 px-8 py-3 text-button text-primary bg-secondary rounded-full"
            onClick={onAccept}
          >
            {`${workout ? "Save" : "Create"}`}
          </button>
          <button
            className="px-8 py-3 text-button text-primary bg-secondary rounded-full"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
);

export default WorkoutModal;
