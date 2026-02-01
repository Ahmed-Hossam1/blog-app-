import ExploreCard from "@/components/cards/ExploreCard";
import SectionWrapper from "@/components/Ui/SectionWrapper";
import { IBlog } from "@/interface";
import Link from "next/link";

const page = async () => {
  /*===== Fetch ===== */
  const res = await fetch("http://localhost:3000/api/blogs");
  if (!res.ok) throw new Error("Failed to fetch");
  const data: IBlog[] = await res.json();

  /*===== HANDLERS ===== */
  const renderCards = data?.map((blog: IBlog) => (
    <Link href={`/blog/${blog.id}`} key={blog.id}>
      <ExploreCard
        title={blog.title}
        coverImage={blog.coverImage}
        coverImageAlt={blog.title}
        authorImageSrc={blog.author?.avatar}
        authorImageAlt={blog.author?.name}
        readTime={blog.meta?.readTime}
        views={blog.meta?.views}
        comments={blog.meta?.commentsCount}
        category={blog.category}
        date={blog.meta?.publishDate}
      />
    </Link>
  ));

  return (
    <SectionWrapper>
      <div className="container mx-auto">
        {/* Header */}
        <div className=" mb-14 text-center">
          <h1 className="mb-3 text-4xl font-semibold text-black">
            Read, Learn & Grow
          </h1>
          <p className="mx-auto max-w-2xl text-gray-500">
            From expert advice to behind-the-scenes stories – explore content
            designed for curious minds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {renderCards}
        </div>
      </div>
    </SectionWrapper>
  );
};
export default page;
