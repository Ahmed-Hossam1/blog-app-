import ExploreCategories from "@/components/sections/ExploreCategories";
import FeaturedArticles from "@/components/sections/FeaturedArticles";
import SectionWrapper from "@/components/SectionWrapper";

export default async function Home() {
  return (
    <div>
      <SectionWrapper>
        <FeaturedArticles />
        <ExploreCategories /> 
      </SectionWrapper>{" "}
    </div>
  );
}
