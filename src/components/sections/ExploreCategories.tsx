import { blogsData, tabsData } from "@/data";
import Button from "../Button";
import ExploreCard from "../cards/ExploreCard";
import SectionWrapper from "../SectionWrapper";
import Link from "next/link";

const ExploreCategories = () => {
  const renderTabs = tabsData.map((tab, idx) => (
    <Button
      key={tab.id}
      className={`border px-4 py-1 text-sm  transition duration-400 ${
        idx === 0
          ? "bg-black text-white"
          : "bg-white text-gray-700 hover:bg-baseInk hover:text-white "
      }`}
    >
      {tab.name}
    </Button>
  ));

  const renderCards = blogsData.map((blog) => (
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
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {renderCards}
        </div>

        {/* Button */}
        <div className="mt-12">
          <button className="rounded-lg border px-6 py-2 text-sm font-medium hover:bg-gray-100">
            View All Blogs
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ExploreCategories;
