"use client";
import { openSidebar } from "@/redux/features/uiSlice";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FiBell, FiMenu } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import Button from "../ui/Button";

export default function DashboardNavbar() {
  const { theme, setTheme } = useTheme();
  const { data } = useSession();
  const dispatch = useDispatch();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-surfaceDark text-gray-900 dark:text-white z-30 transition-colors duration-300">
      <div className="flex h-full items-center justify-between px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button
            onClick={() => dispatch(openSidebar())}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FiMenu size={20} />
          </Button>

          {/* Title */}
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Overview
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Growth reporting of your account
            </p>
          </div>
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

          {/* Notification */}
          <Button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <FiBell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-surfaceDark" />
          </Button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-800">
            <div className="text-right text-sm">
              <p className="font-medium text-gray-900 dark:text-white">
                {data?.user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {data?.user?.email || "user@example.com"}
              </p>
            </div>

            <Image
              src={data?.user?.image || "https://i.pravatar.cc/100"}
              alt="user"
              width={40}
              height={40}
              className="rounded-full border-2 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* User Avatar - Mobile */}
          <Image
            src={data?.user?.image || "https://i.pravatar.cc/100"}
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
