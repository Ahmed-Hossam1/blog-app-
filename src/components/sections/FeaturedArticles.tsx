"use client";
import { IBlog } from "@/types";
import FeaturedCard from "../cards/FeaturedCard";
import ExploreCard from "../cards/ExploreCard";
import SectionWrapper from "../shared/SectionWrapper";
import { useTranslation } from "react-i18next";

import { HiOutlineFire } from "react-icons/hi2";

interface FeaturedArticlesProps {
  blogs: IBlog[];
  numberOfShownArticles: number;
}

import { motion, Variants } from "framer-motion";

const FeaturedArticles = ({
  blogs,
  numberOfShownArticles,
}: FeaturedArticlesProps) => {
  const { t } = useTranslation("home");
  /* ==== Config ==== */
  const slicedData = blogs?.slice(0, numberOfShownArticles);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <HiOutlineFire className="text-3xl text-orange-500" />
          <h2 className="text-3xl font-bold dark:text-white">
            {t("featured.title") || "Trending This Week"}
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Big Card - spans 2 columns on large screens */}
          {slicedData?.[0] && (
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <FeaturedCard
                key={slicedData[0].id}
                {...slicedData[0]}
                className="h-full w-full"
              />
            </motion.div>
          )}

          {/* Small Cards Column */}
          <div className="flex flex-col gap-6">
            {slicedData?.slice(1, 3).map((blog) => (
              <motion.div key={blog.id} variants={itemVariants}>
                <ExploreCard
                  key={blog.id}
                  {...blog}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default FeaturedArticles;
