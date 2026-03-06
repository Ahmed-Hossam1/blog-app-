import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();
  if (session) return redirect("/");
  return <>{children}</>;
};
export default AuthLayout;
