"use client";

import { createContext, FC, ReactNode } from "react";
import { Roboto } from "next/font/google";
import AuthProvider from "@/lib/msal/auth-config";
import { RootStore, rootStore } from "@/stores/root-store";

import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: ReactNode;
}

export const RootContext = createContext<RootStore | null>(null);

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body className={roboto.className}>
      <AuthProvider>
        <RootContext.Provider value={rootStore}>
          {children}
        </RootContext.Provider>
      </AuthProvider>
    </body>
  </html>
);

export default RootLayout;
