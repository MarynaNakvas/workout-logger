import { createContext, FC, ReactNode } from "react";

import { rootStore, RootStore } from "./root-store";

export const RootContext = createContext<RootStore | null>(null);

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider: FC<RootProviderProps> = ({ children }) => (
  <RootContext.Provider value={rootStore}>{children}</RootContext.Provider>
);
