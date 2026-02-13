"use client";
import { asideLinksData } from "@/data";
import { closeSidebar } from "@/redux/features/uiSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut, FiSettings, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isSidebarOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed left-0 top-0 h-screen w-64 bg-white dark:bg-surfaceDark 
        border-r border-gray-200 dark:border-gray-800 
        text-gray-700 dark:text-gray-300 z-50
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Close button for mobile */}
        <Button
          onClick={() => dispatch(closeSidebar())}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden transition"
        >
          <FiX size={20} />
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-200 dark:border-gray-800">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-gray-900 dark:text-white font-semibold text-lg">
            DMIN
          </span>
          {/* <Image src="/logo-black.svg" alt="Logo" width={130} height={60} /> */}
        </div>

        {/* Links */}
        <nav className="px-3 py-4 space-y-1">
          {asideLinksData.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => dispatch(closeSidebar())}
                className={`
                  flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                  transition-all duration-200 capitalize
                  ${
                    isActive
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                  }
                `}
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full px-3 pb-6 space-y-1 border-t border-gray-200 dark:border-gray-800 pt-4">
          <Link
            href="/dashboard/settings"
            onClick={() => dispatch(closeSidebar())}
            className={`
              flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
              transition-all duration-200
              ${
                pathname === "/dashboard/settings"
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
              }
            `}
          >
            <FiSettings size={20} />
            Settings
          </Link>

          <Button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 dark:text-red-400 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-500/10">
            <FiLogOut size={20} />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
