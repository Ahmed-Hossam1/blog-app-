"use client";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/ui/Button";
import { IBlog } from "@/types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ExploreCard from "../cards/ExploreCard";
import { HiOutlineSquares2X2 } from "react-icons/hi2";

interface ExploreCategoriesProps {
  blogs: IBlog[];
  numberOfShownArticles: number;
}

import { motion, Variants } from "framer-motion";

const ExploreCategories = ({
  blogs,
  numberOfShownArticles,
}: ExploreCategoriesProps) => {
  const { t } = useTranslation("home");
  const slicedBlogs = blogs.slice(0, numberOfShownArticles);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <SectionWrapper>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <HiOutlineSquares2X2 className="text-3xl text-blue-500" />
            <h2 className="text-3xl font-bold dark:text-white">
              {t("explore.title")}
            </h2>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {slicedBlogs.map((blog: IBlog) => (
            <motion.div key={blog.slug} variants={itemVariants}>
              <Link href={`/blog/${blog.slug}`}>
                <ExploreCard {...blog} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col items-center"
        >
          {slicedBlogs.length === 0 ? (
            <p className="text-sm text-gray-400 font-medium bg-gray-50 dark:bg-gray-800/50 px-6 py-3 rounded-full">
              {t("explore.noArticles")}
            </p>
          ) : (
            <Link href="/blog">
              <Button className="border px-6 py-3 text-sm font-medium hover:bg-baseInk hover:text-white transition duration-500 dark:text-white dark:hover:bg-white dark:hover:text-black">
                {t("explore.exploreAllBlogs")}
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default ExploreCategories;
