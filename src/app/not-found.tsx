"use client";
import Link from "next/link";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation("common");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-secondary px-6 transition-colors duration-300">
      <div className="text-center max-w-md p-10 bg-white dark:bg-surface rounded-3xl shadow-xl dark:border dark:border-gray-800">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 p-5 rounded-full shadow-inner">
            <HiOutlineExclamationTriangle size={50} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          {t("table.errors.not_found")}
        </h1>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
          {t("table.errors.not_found_desc")}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:scale-105 font-medium transition-all"
          >
            {t("navbar.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
