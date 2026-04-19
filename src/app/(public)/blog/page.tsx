import PaginatedBlogs from "@/components/shared/PaginatedBlogs";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { getTranslations } from "@/lib/i18n";
import { getBlogs } from "@/services";

const BlogPage = async () => {
  const blogs = await getBlogs();
  const { listing } = await getTranslations("blog");
  return (
    <SectionWrapper>
      <div className="container mx-auto">
        {/* Header */}
        <div className=" mb-14 text-center">
          <h1 className="mb-3 text-4xl font-semibold text-black dark:text-white">
            {listing.title}
          </h1>
          <p className="mx-auto max-w-2xl text-gray-500 dark:text-gray-400">
            {listing.description}
          </p>
        </div>
        <PaginatedBlogs blogs={blogs} />
      </div>
    </SectionWrapper>
  );
};

export default BlogPage;
