import { FC, ReactNode } from "react";
import { Roboto } from "next/font/google";
import AuthProvider from "@/lib/msal/auth-config";
import { SignInButton } from "@/components/button";

import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
          <div>
            <SignInButton />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
