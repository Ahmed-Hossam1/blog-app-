import PaginatedBlogs from "@/components/shared/PaginatedBlogs";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { getBlogs } from "@/services";

const BlogPage = async () => {
  const blogs = await getBlogs();

  return (
    <SectionWrapper>
      <div className="container mx-auto">
        {/* Header */}
        <div className=" mb-14 text-center">
          <h1 className="mb-3 text-4xl font-semibold text-black dark:text-white">
            Read, Learn &amp; Grow
          </h1>
          <p className="mx-auto max-w-2xl text-gray-500 dark:text-gray-400">
            From expert advice to behind-the-scenes stories – explore content
            designed for curious minds.
          </p>
        </div>
        <PaginatedBlogs data={blogs} />
      </div>
    </SectionWrapper>
  );
};

export default BlogPage;
