import { FC, ReactNode } from "react";

import { SignInButton } from "@/components/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <SignInButton />
      {children}
    </>
  );
};

export default DashboardLayout;
