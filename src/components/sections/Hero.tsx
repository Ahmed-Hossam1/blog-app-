import { imagesData } from "@/data";
import ArticleCard from "../cards/ArticleCard";
import SectionWrapper from "../SectionWrapper";

const HeroSection = () => {
  const renderImages = imagesData.map((image,index) => (
    <ArticleCard className={index === 0 ? "md:col-span-2" : ""} key={image.id} src={image.path} alt={image.path} />
  ));
  return (
    <SectionWrapper>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{renderImages}</div>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
