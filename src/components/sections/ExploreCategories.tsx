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
  const [category, setCategory] = useState<string>("All");

  /*===== Fetch ===== */

  /*===== CONSTANT ===== */
  /* filter blogs base on category state
   if all back all blogs otherwise back filtered */
  const filteredCards =
    category === "All"
      ? blogs
      : blogs.filter((blog: IBaseBlog) => blog.category === category);

  /*===== SlICE ===== */
  const slicedBlogs = filteredCards.slice(0, numberOfShownArticles);
  /*===== HANDLER ===== */
  const handleCategoryChange = (name: string): void => {
    setActiveTab(name);
    setCategory(name);
  };

  /*===== RENDER ===== */
  const renderTabs = tabsData?.map((tab) => (
    <Tabs
      onClick={() => handleCategoryChange(tab.name)}
      key={tab.id}
      className={`${
        tab.name === activeTab
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "bg-white text-gray-700 hover:bg-baseInk hover:text-white dark:bg-surfaceDark dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {tab.name}
    </Tabs>
  ));

  const renderCards = slicedBlogs?.map((blog: IBaseBlog) => (
    <Link href={`/blog/${blog.slug}`} key={blog.slug}>
      <ExploreCard {...blog} />
    </Link>
  ));

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
          {renderTabs}
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          {renderCards}
        </div>

        {/* Button */}
        {renderCards.length === 0 ? (
          <div className="flex items-center justify-center mt-12">
            <p className="text-sm text-gray-500 capitalize font-semibold dark:text-gray-400">
              No blogs found for this category
            </p>
          </div>
        ) : (
          <div className="mt-12 flex justify-center ">
            <Link href={"/blog"}>
              <Button className="border px-6 py-3 text-sm font-medium hover:bg-baseInk hover:text-white transition duration-500 dark:text-white dark:hover:bg-white dark:hover:text-black">
                View All Blogs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ExploreCategories;
