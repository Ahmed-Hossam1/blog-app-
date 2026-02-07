import { IBaseBlog } from "@/types";
import FeaturedCard from "../cards/FeaturedCard";
import SectionWrapper from "../SectionWrapper";

interface FeaturedArticlesProps {
  blogs: IBaseBlog[];
  numberOfShownArticles: number;
}

const FeaturedArticles = async ({
  blogs,
  numberOfShownArticles,
}: FeaturedArticlesProps) => {
  /*===== CONSTANTS ===== */

  // limit card number for display

  /*===== RENDER ===== */
  const slicedData = blogs.slice(0, numberOfShownArticles);

  const articleCards = slicedData.map((blog: IBaseBlog, index: number) => (
    <FeaturedCard
      className={index === 0 ? "md:col-span-2" : ""}
      key={blog.id}
      {...blog}
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
