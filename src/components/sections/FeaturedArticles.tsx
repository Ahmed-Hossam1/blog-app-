import { getBlogs } from "@/services/blogService";
import { IBlog } from "@/types";
import FeaturedCard from "../cards/FeaturedCard";
import SectionWrapper from "../SectionWrapper";

interface IProps {
  numberOfArticles: number;
}

const FeaturedArticles = async ({ numberOfArticles }: IProps) => {
  /*===== Fetch ===== */
  const data: IBlog[] = await getBlogs();

  /*===== CONSTANTS ===== */

  // limit card number for display
  const limit = numberOfArticles > data.length ? data.length : numberOfArticles;

  /*===== RENDER ===== */
  const articles = data.slice(0, limit);

  const articleCards = articles.map((blog: IBlog, index: number) => (
    <FeaturedCard
      className={index === 0 ? "md:col-span-2" : ""}
      key={blog.id}
      title={blog.title}
      src={blog.coverImage}
      alt={blog.title}
      avatarSrc={blog.author?.avatar}
      avatarAlt={blog.author?.name}
      category={blog.category}
      views={blog.meta?.views}
      comments={blog.meta?.commentsCount}
      date={blog.meta?.publishDate}
    />
  ));

  return (
    <SectionWrapper>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {articleCards}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FeaturedArticles;
