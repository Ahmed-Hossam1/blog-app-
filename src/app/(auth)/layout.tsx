"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default AuthLayout;
