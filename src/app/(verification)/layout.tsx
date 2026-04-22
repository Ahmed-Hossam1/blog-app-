import { ReactNode, Suspense } from "react";

const VerificationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="main pt-20">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </main>
    </>
  );
};
export default VerificationLayout;
