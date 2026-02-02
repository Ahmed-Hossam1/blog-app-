import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ExploreCategories from "@/components/sections/ExploreCategories";
import FeaturedArticles from "@/components/sections/FeaturedArticles";
import MeetOurAuthors from "@/components/sections/MeetOurAuthors";
import NewsletterSubscribe from "@/components/sections/NewsletterSubscribe";
import SectionWrapper from "@/components/SectionWrapper";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="main pt-20">
        <SectionWrapper>
          <FeaturedArticles numberOfArticles={5} />
          <ExploreCategories />
          <MeetOurAuthors />
          <NewsletterSubscribe />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
