import { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="main pt-20">
      {children}
      </main>
    </>
  );
};
export default PublicLayout;
