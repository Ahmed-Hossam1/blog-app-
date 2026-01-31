import ExploreCategories from "@/components/sections/ExploreCategories";
import FeaturedArticles from "@/components/sections/FeaturedArticles";
import MeetOurAuthors from "@/components/sections/MeetOurAuthors";
import NewsletterSubscribe from "@/components/sections/NewsletterSubscribe";
import SectionWrapper from "@/components/Ui/SectionWrapper";

export default async function Home() {
  return (
    <div>
      <SectionWrapper>
        <FeaturedArticles />
        <ExploreCategories />
        <MeetOurAuthors />
        <NewsletterSubscribe />
      </SectionWrapper>
    </div>
  );
}
