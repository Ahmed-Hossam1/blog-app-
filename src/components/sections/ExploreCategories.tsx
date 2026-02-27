"use client";
import SectionWrapper from "@/components/SectionWrapper";
import Button from "@/components/ui/Button";
import { tabsData } from "@/data";
import { IBaseBlog } from "@/types";
import Link from "next/link";
import { useState } from "react";
import ExploreCard from "../cards/ExploreCard";
import Tabs from "../Tab";

interface ExploreCategoriesProps {
  blogs: IBaseBlog[];
  numberOfShownArticles: number;
}

const ExploreCategories = ({
  blogs,
  numberOfShownArticles,
}: ExploreCategoriesProps) => {
  /*===== STATE ===== */
  const [activeTab, setActiveTab] = useState<string>("All");

  /*===== FILTER ===== */
  const filteredCards =
    activeTab === "All"
      ? blogs
      : blogs.filter((blog: IBaseBlog) => blog.category === activeTab);

  /*===== SLICE ===== */
  const slicedBlogs = filteredCards.slice(0, numberOfShownArticles);

  return (
    <SectionWrapper>
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center dark:text-white">
          Explore Categories
        </h2>

        <p className="mt-2 text-sm text-gray-500 text-center dark:text-gray-400">
          Choose a category to explore related content - Find what interests you
        </p>

        {/* Tabs (UI only) */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {tabsData.map((tab) => (
            <Tabs
              onActive={() => setActiveTab(tab.name)}
              key={tab.id}
              className={`${tab.name === activeTab
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-gray-700 hover:bg-baseInk hover:text-white dark:bg-surfaceDark dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {tab.name}
            </Tabs>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {slicedBlogs.map((blog: IBaseBlog) => (
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
