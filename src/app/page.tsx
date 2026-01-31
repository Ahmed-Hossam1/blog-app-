import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ExploreCategories from "@/components/sections/ExploreCategories";
import FeaturedArticles from "@/components/sections/FeaturedArticles";
import MeetOurAuthors from "@/components/sections/MeetOurAuthors";
import NewsletterSubscribe from "@/components/sections/NewsletterSubscribe";
import SectionWrapper from "@/components/Ui/SectionWrapper";

export default async function Home() {
  return (
    <>
      <Navbar />
      <SectionWrapper>
        <FeaturedArticles numberOfArticles={5} />
        <ExploreCategories />
        <MeetOurAuthors />
        <NewsletterSubscribe />
      </SectionWrapper>
      <Footer />
    </>
  );
}
