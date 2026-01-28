import FeaturedArticles from "@/components/sections/FeaturedArticles";
import SectionWrapper from "@/components/SectionWrapper";

export default async function Home() {
  return (
    <div>
      <SectionWrapper>
        <FeaturedArticles />
      </SectionWrapper>{" "}
    </div>
  );
}
