import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="main pt-20">
      {children}
      </main>
      <Footer />
    </>
  );
};
export default PublicLayout;
