import DashboardNavbar from "@/components/layout/DashboardNavbar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-50 dark:bg-baseInk min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <DashboardSidebar />
      <DashboardNavbar />

      <main className="lg:ml-64 pt-16 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
};
export default DashboardLayout;
