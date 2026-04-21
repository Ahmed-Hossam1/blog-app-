"use client";
import { useDashboard } from "@/providers/DashboardProvider";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { setLocaleCookie } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowDown } from "react-icons/fa6";
import { MdLanguage, MdOutlineDarkMode } from "react-icons/md";
import Button from "../ui/Button";

export default function DashboardNavbar() {
  const { theme, setTheme } = useTheme();
  const { data } = useSession();
  const { openSidebar } = useDashboard();
  const user = data?.user;

  const router = useRouter();
  const { i18n } = useTranslation("common");
  const [openLangMenu, setOpenLangMenu] = useState(false);

  const handleLanguageChange = async (locale: "en" | "ar") => {
    i18n.changeLanguage(locale);
    await setLocaleCookie(locale);
    router.refresh();
    setOpenLangMenu(false);
  };

  const renderLanguageMenu = () => {
    return (
      <div
        className="relative"
        tabIndex={0}
        onBlur={(e) => {
          const nextElementFocus = e.relatedTarget as Node | null;
          if (!e.currentTarget.contains(nextElementFocus)) {
            setOpenLangMenu(false);
          }
        }}
      >
        <Button
          type="button"
          onClick={() => setOpenLangMenu((prev) => !prev)}
          className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-gray-700 dark:bg-surfaceDark dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800"
        >
          <MdLanguage className="text-lg" />
          <span className="hidden sm:inline">
            {i18n.language.startsWith("ar") ? "العربية" : "English"}
          </span>
          <FaArrowDown size={10} />
        </Button>

        <div
          className={`absolute right-0 top-[calc(100%+10px)] z-100 w-44 origin-top-right rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl transition-all duration-200 dark:border-gray-800 dark:bg-surfaceDark dark:shadow-2xl ${
            openLangMenu
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          {[
            { code: "en", label: "English" },
            { code: "ar", label: "العربية" },
          ].map((lang) => {
            const isActive = i18n.language.startsWith(lang.code);

            return (
              <Button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code as "en" | "ar")}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                <span
                  className={`${lang.code === "ar" ? "font-semibold" : ""}`}
                >
                  {lang.label}
                </span>

                {isActive && (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 dark:bg-primary/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

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
          {renderLanguageMenu()}

          {/* Theme Toggle */}
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition shadow-sm border border-zinc-200 dark:border-gray-700"
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
