"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const { t } = useTranslation("common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-6 transition-colors duration-300">
      <div className="text-center max-w-md p-10 bg-white dark:bg-surfaceDark rounded-3xl shadow-xl dark:border dark:border-gray-800">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">
          {t("table.errors.server_error")}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {t("table.errors.something_went_wrong")}
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:scale-105 transition-transform"
          >
            {t("table.actions.continue")}
          </Button>

          <Link
            href="/"
            className="px-6 py-3 border dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-white"
          >
            {t("navbar.home")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
