"use client";

import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useState } from "react";

import { useRootStore } from "@/hooks/useStore";
import { Workout } from "@/models";
import { calculatePace, getObjectDifferences } from "@/utils/values";

const initialValues: Workout = {
  typeWorkout: undefined,
  dateWorkout: undefined,
  timeWorkout: "00:00",
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
    const { workoutStore } = useRootStore();
    const date =
      workout && workout.dateWorkout
        ? new Date(workout.dateWorkout).toISOString().split("T")[0]
        : new Date().toISOString();
    const workoutInitialValues = workout
      ? { ...workout, dateWorkout: date }
      : initialValues;
    const [newWorkout, setNewWorkout] = useState(workoutInitialValues);

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
      if (newWorkout && !workout) {
        workoutStore.addWorkout(newWorkout);
        setIsWorkoutModalShow(false);
      } else if (workout) {
        workoutStore.updateWorkout(
          getObjectDifferences(workout, newWorkout),
          workout.objectId
        );
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
          <h1 className="text-2xl font-bold tracking-[1.25px]">{`${workout ? "Update" : "Add"} workout`}</h1>
          <div className="text-base tracking-[1.25px] pt-2 pb-8">
            Please fill fields:
          </div>
          <form className="mb-10">
            <div className="mb-4">
              <label htmlFor="typeWorkout" className="pb-2 block text-sm">
                Type (optional)
              </label>
              <input
                className="w-full px-3 py-2 mt-1 text-primary border border-secondary rounded-md focus:outline-none"
                id="typeWorkout"
                value={newWorkout.typeWorkout}
                onChange={(e) =>
                  handleChangeValue("typeWorkout", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="date" className="pb-2 block text-sm">
                  Date
                </label>
                <input
                  className="w-full px-2 py-2 mt-1 text-primary border border-secondary rounded-md focus:outline-none"
                  type="date"
                  id="date"
                  value={newWorkout.dateWorkout}
                  onChange={(e) =>
                    handleChangeValue("dateWorkout", e.target.value)
                  }
                />
              </div>

              <div className="">
                <label htmlFor="time" className="pb-2 block text-sm">
                  Time (optional)
                </label>
                <input
                  className="w-full px-3 py-2 mt-1 text-primary border border-secondary rounded-md focus:outline-none"
                  type="time"
                  id="time"
                  value={newWorkout.timeWorkout}
                  onChange={(e) =>
                    handleChangeValue("timeWorkout", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="distance" className="pb-2 block text-sm">
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

              <div>
                <label htmlFor="duration" className="pb-2 block text-sm">
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
            </div>
            <div>
              <label className="pb-2 block text-sm">Pace</label>
              <input
                className="w-full px-3 py-2 mt-1 text-primary border border-secondary rounded-md focus:outline-none"
                placeholder="Pace"
                value={newWorkout.pace}
                disabled
              />
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
