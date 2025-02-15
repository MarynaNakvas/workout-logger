import { useContext } from "react";

import { RootContext } from "@/stores/root-provider";

export const useRootStore = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error(
      "Root store is not available. Make sure your component is wrapped with <RootContext.Provider>."
    );
  }
  return context;
};
