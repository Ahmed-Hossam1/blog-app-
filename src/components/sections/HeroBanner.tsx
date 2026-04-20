"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa6";

const HeroBanner = () => {
  const { t } = useTranslation("home");

  return (
    <section className="relative overflow-hidden bg-gray-50 dark:bg-surfaceDark rounded-3xl mb-12 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl mb-6">
          {t("hero.heading")}{" "}
          <span className="text-blue-600 dark:text-blue-500">
            {t("hero.headingHighlight")}
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10">
          {t("hero.subheading")}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {t("hero.startReading")}
            <FaArrowRight className="text-sm" />
          </Link>

          <Link
            href="/sign-up"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {t("hero.joinCommunity")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
