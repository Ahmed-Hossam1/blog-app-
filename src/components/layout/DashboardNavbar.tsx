"use client";
import { useDashboard } from "@/providers/DashboardProvider";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import Button from "../ui/Button";

export default function DashboardNavbar() {
  const { theme, setTheme } = useTheme();
  const { data } = useSession();
  const { openSidebar } = useDashboard();
  const user = data?.user

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-surfaceDark text-gray-900 dark:text-white z-30 transition-colors duration-300">
      <div className="flex h-full items-center justify-between px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button
            onClick={openSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FiMenu size={20} />
          </Button>

          {/* Title */}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "light" ? (
              <MdOutlineDarkMode size={20} />
            ) : (
              <IoSunnyOutline size={20} />
            )}
          </Button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-800">
            <div className="text-right text-sm">
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || "user@example.com"}
              </p>
            </div>

            <Image
              src={user?.image || "/default-user.png"}
              alt="user"
              width={40}
              height={40}
              className="rounded-full border-2 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* User Avatar - Mobile */}
          <Image
            src={user?.image || "https://i.pravatar.cc/100"}
            alt="user"
            width={36}
            height={36}
            className="sm:hidden rounded-full border-2 border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>
    </header>
  );
}
