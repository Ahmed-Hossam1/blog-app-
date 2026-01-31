"use client";
import { tabsData } from "@/data";
import Button from "../Ui/Button";
import ExploreCard from "../cards/ExploreCard";
import SectionWrapper from "../Ui/SectionWrapper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IBlog } from "@/interface";

const ExploreCategories = () => {
  /*===== STATE ===== */
  const [activeTab, setActiveTab] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [blogs, setBlogs] = useState([]);

  /*===== Fetch ===== */

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("http://localhost:3000/api/blogs");
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  /*===== HANDLER ===== */
  const handleCategoryChange = (name: string): void => {
    setActiveTab(name);
    setCategory(name);
  };
  /*===== RENDER ===== */

  const renderTabs = tabsData.map((tab) => (
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

  const filteredCards =
    category === "All"
      ? blogs
      : blogs.filter((blog: IBlog) => blog.category === category);

  const renderCards = filteredCards.map((blog: IBlog) => (
    <Link href={`/blog/${blog.id}`} key={blog.id}>
      <ExploreCard
        title={blog.title}
        src={blog.coverImage}
        alt={blog.title}
        readTime={blog.meta.readTime}
        views={blog.meta.views}
        comments={blog.meta.commentsCount}
        category={blog.category}
        date={blog.meta.publishDate}
      />
    </Link>
  ));

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
          {renderCards}
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center ">
          <Link href={"/blog"}>
            <Button className="border px-6 py-3 text-sm font-medium hover:bg-baseInk hover:text-white transition duration-500 ">
              View All Blogs
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ExploreCategories;
