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

const FeaturedArticles = ({
  blogs,
  numberOfShownArticles,
}: FeaturedArticlesProps) => {
  const { t } = useTranslation("home");
  /* ==== Config ==== */
  const slicedData = blogs?.slice(0, numberOfShownArticles);

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-10">
          <HiOutlineFire className="text-3xl text-orange-500" />
          <h2 className="text-3xl font-bold dark:text-white">
            {t("featured.title") || "Trending This Week"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Big Card - spans 2 columns on large screens */}
          {slicedData?.[0] && (
            <div className="lg:col-span-2">
              <FeaturedCard
                key={slicedData[0].id}
                {...slicedData[0]}
                className="h-full w-full"
              />
            </div>
          )}

          {/* Small Cards Column */}
          <div className="flex flex-col gap-6">
            {slicedData?.slice(1, 3).map((blog) => (
              <ExploreCard
                key={blog.id}
                {...blog}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FeaturedArticles;
