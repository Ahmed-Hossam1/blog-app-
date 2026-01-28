import { blogsData } from "@/data";
import FeaturedCard from "../cards/FeaturedCard";
import SectionWrapper from "../SectionWrapper";

const FeaturedArticles = () => {
  const renderArticles = blogsData.map((blog, index) => (
    <FeaturedCard
      className={index === 0 ? "md:col-span-2" : ""}
      key={blog.id}
      title={blog.title}
      src={blog.coverImage}
      alt={blog.title}
      avatarSrc={blog.author.avatar}
      avatarAlt={blog.author.name}
      category={blog.category}
      views={blog.meta.views}
      comments={blog.meta.commentsCount}
      date={blog.meta.publishDate}
    />
  ));
  return (
    <SectionWrapper>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {renderArticles}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FeaturedArticles;
