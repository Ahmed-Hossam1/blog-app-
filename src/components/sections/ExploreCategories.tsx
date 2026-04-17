"use client";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/ui/Button";
import { IBlog } from "@/types";
import Link from "next/link";
import ExploreCard from "../cards/ExploreCard";

interface ExploreCategoriesProps {
  blogs: IBlog[];
  numberOfShownArticles: number;
}

const ExploreCategories = ({
  blogs,
  numberOfShownArticles,
}: ExploreCategoriesProps) => {
  /* ==== Config ==== */
  const slicedBlogs = blogs.slice(0, numberOfShownArticles);

  return (
    <SectionWrapper>
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold  dark:text-white">
          Explore Categories
        </h2>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {slicedBlogs.map((blog: IBlog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug}>
              <ExploreCard
                title={blog.title}
                image={blog.image}
                category={blog.category}
                views={blog.views}
                readTime={blog.readTime}
                createdAt={blog.createdAt}
                author={blog.author}
              />
            </Link>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12 flex flex-col items-center">
          {slicedBlogs.length === 0 ? (
            <p className="text-sm text-gray-400 font-medium bg-gray-50 dark:bg-gray-800/50 px-6 py-3 rounded-full">
              No articles found in this category yet.
            </p>
          ) : (
            <Link href="/blog">
              <Button className="border px-6 py-3 text-sm font-medium hover:bg-baseInk hover:text-white transition duration-500 dark:text-white dark:hover:bg-white dark:hover:text-black">
                Explore All Blogs
              </Button>
            </Link>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ExploreCategories;
