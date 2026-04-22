"use client";

import i18n from "@/lib/i18n/i18n";
import { LanguageSwitcher } from "@/lib/i18n-client";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";

const LanguageMenu = () => {
  const [openLangMenu, setOpenLangMenu] = useState<boolean>(false);
  const router = useRouter();
  const changeLanguage = async (lang: string) => {
    await LanguageSwitcher(lang as "en" | "ar");
    router.refresh();
    setOpenLangMenu(false);
  };
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
              onClick={() => changeLanguage(lang.code as "en" | "ar")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
            >
              <span className={`${lang.code === "ar" ? "font-semibold" : ""}`}>
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

export default LanguageMenu;
