"use client";

import { FC, ReactNode } from "react";
import { Roboto } from "next/font/google";
import AuthProvider from "@/lib/msal/auth-config";
import { RootProvider } from "@/stores/root-provider";

import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body className={roboto.className}>
      <AuthProvider>
        <RootProvider>{children}</RootProvider>
      </AuthProvider>
    </body>
  </html>
);

export default RootLayout;
