"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import Button from "../ui/Button";

const CallToAction = () => {
  const { t } = useTranslation("home");

  return (
    <section className="relative overflow-hidden bg-baseInk dark:bg-surfaceDark rounded-3xl py-16 sm:py-20 px-6 sm:px-12 mb-12 border border-gray-100 dark:border-gray-800 text-center">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <HiOutlineRocketLaunch className="text-3xl text-white" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("cta.title") || "Start writing your first blog today"}
          </h2>
        </div>
        <p className="text-gray-300 text-lg mb-10">
          {t("cta.description") || "Share your stories, ideas, and expertise with our growing community of readers and writers."}
        </p>

        <Link href="/dashboard/editor">
          <Button className="inline-flex items-center gap-2 px-10 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 font-bold rounded-xl transform hover:scale-105 shadow-xl">
            {t("cta.button") || "Create Blog Now"}
            <FaArrowRight className="text-sm" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
