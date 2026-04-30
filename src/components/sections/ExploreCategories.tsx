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

const ExploreCategories = ({
  blogs,
  numberOfShownArticles,
}: ExploreCategoriesProps) => {
  const { t } = useTranslation("home");
  const slicedBlogs = blogs.slice(0, numberOfShownArticles);

  return (
    <SectionWrapper>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <HiOutlineSquares2X2 className="text-3xl text-blue-500" />
            <h2 className="text-3xl font-bold dark:text-white">
              {t("explore.title")}
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {slicedBlogs.map((blog: IBlog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug}>
              <ExploreCard {...blog} />
            </Link>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12 flex flex-col items-center">
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
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ExploreCategories;
