"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";

const HeroBanner = () => {
  const { t } = useTranslation("home");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden bg-gray-50 dark:bg-surfaceDark rounded-3xl mb-12 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border border-gray-100 dark:border-gray-800"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl text-center"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl mb-6"
        >
          {t("hero.heading")}{" "}
          <span className="text-blue-600 dark:text-blue-500">
            {t("hero.headingHighlight")}
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="mx-auto mt-4 max-w-2xl text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10"
        >
          {t("hero.subheading")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
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
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroBanner;
