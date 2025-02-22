"use client";

import { observer } from "mobx-react-lite";
import { FC, useCallback } from "react";

import { useRootStore } from "@/hooks/useStore";

interface ConfirmModalProps {
  setIsConfirmModalShow: (prop: boolean) => void;
  workoutId?: string;
}

const ConfirmModal: FC<ConfirmModalProps> = observer(
  ({ setIsConfirmModalShow, workoutId }) => {
    const { workoutStore } = useRootStore();
    const onAccept = useCallback(() => {
      if (workoutId) {
        workoutStore.deleteWorkout(workoutId);
        setIsConfirmModalShow(false);
      }
    }, [workoutId]);

    const onCancel = useCallback(() => {
      setIsConfirmModalShow(false);
    }, []);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-[80vw] p-4 bg-table rounded-lg">
          <h1 className="text-xl font-bold tracking-[1.25px]">
            Delete workout
          </h1>
          <div className="pt-2 pb-8">
            Are you sure you want to delete this workout?
          </div>
          <button
            className="mr-4 px-6 py-3 text-button text-primary bg-secondary rounded-full"
            onClick={onAccept}
          >
            Confirm
          </button>
          <button
            className="px-6 py-3 text-button text-primary bg-secondary rounded-full"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
);

export default ConfirmModal;
