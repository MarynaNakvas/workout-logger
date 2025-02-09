import { FC, useCallback } from "react";

import { rootStore } from "@/stores/root-store";

interface ConfirmModalProps {
  setIsConfirmModalShow: (prop: boolean) => void;
  workoutId: string | null;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  setIsConfirmModalShow,
  workoutId,
}) => {
  const onAccept = useCallback(() => {
    if (workoutId) {
      rootStore.workoutStore.deleteWorkout(workoutId);
      setIsConfirmModalShow(false);
    }
  }, [workoutId]);

  const onCancel = useCallback(() => {
    setIsConfirmModalShow(false);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[80vw] p-4 bg-table rounded-lg">
        <h1 className="text-xl font-bold tracking-[1.25px]">Delete workout</h1>
        <p className="pt-2 pb-8">
          Are you sure you want to delete this workout?
        </p>
        <button
          className="mr-6 px-8 py-3 text-button text-primary bg-secondary rounded-full"
          onClick={onAccept}
        >
          Confirm
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
};

export default ConfirmModal;
