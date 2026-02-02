"use client";
import { tabsData } from "@/data";
import Link from "next/link";
import { lazy, Suspense, useEffect, useState } from "react";
import { IBlog } from "@/types";
import { getBlogs } from "@/services/blogService";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/SectionWrapper";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import HeaderSkeleton from "../Skeleton/HeaderSkeleton";
import TabsSkeleton from "../Skeleton/TabsSkeleton";

const ExploreCard = lazy(() => import("@/components/cards/ExploreCard"));

const ExploreCategories = () => {
  /*===== STATE ===== */
  const [activeTab, setActiveTab] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  /*===== Fetch ===== */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getBlogs();
        setBlogs(blogs);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchBlogs();
  }, []);

  /*===== CONSTANT ===== */
  /* filter blogs base on category state
   if all back all blogs otherwise back filtered */
  const filteredCards =
    category === "All"
      ? blogs
      : blogs.filter((blog: IBlog) => blog.category === category);

  /*===== HANDLER ===== */
  const handleCategoryChange = (name: string): void => {
    setActiveTab(name);
    setCategory(name);
  };

  /*===== RENDER ===== */
  const renderTabs = tabsData?.map((tab) => (
    <Button
      onClick={() => handleCategoryChange(tab.name)}
      key={tab.id}
      className={`border border-baseInk rounded-sm px-4 py-2 text-sm  transition duration-500 font-medium ${
        tab.name === activeTab
          ? "bg-black text-white"
          : "bg-white text-gray-700 hover:bg-baseInk hover:text-white "
      }`}
    >
      {tab.name}
    </Button>
  ));

  const renderCards = filteredCards?.map((blog: IBlog) => (
    <Link href={`/blog/${blog.id}`} key={blog.id}>
      <ExploreCard blog={blog} />
    </Link>
  ));

  if (blogs.length === 0)
    return (
      <div>
        <HeaderSkeleton />
        <TabsSkeleton numberOfSkeleton={7} />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          <CardSkeleton numberOfSkeleton={9} />
        </div>
      </div>
    );
  return (
    <SectionWrapper>
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center">
          Explore Categories
        </h2>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Choose a category to explore related content - Find what interests you
        </p>

        {/* Tabs (UI only) */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {renderTabs}
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          <Suspense fallback={<CardSkeleton numberOfSkeleton={9} />}>
            {renderCards}
          </Suspense>
        </div>

        {/* Button */}
        {renderCards.length === 0 ? (
          <div className="flex items-center justify-center mt-12">
            <p className="text-sm text-gray-500 capitalize font-semibold ">
              No blogs found for this category
            </p>
          </div>
        ) : (
          <div className="mt-12 flex justify-center ">
            <Link href={"/blog"}>
              <Button className="border px-6 py-3 text-sm font-medium hover:bg-baseInk hover:text-white transition duration-500 ">
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
