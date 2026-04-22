import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ExploreCategories from "@/components/sections/ExploreCategories";
import FeaturedArticles from "@/components/sections/FeaturedArticles";
import HeroBanner from "@/components/sections/HeroBanner";
import MeetOurAuthors from "@/components/sections/MeetOurAuthors";
import NewsletterSubscribe from "@/components/sections/NewsletterSubscribe";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { getAuthors, getBlogs } from "@/services";

export default async function Home() {
  const [blogs, authors] = await Promise.all([getBlogs(), getAuthors()]);

  return (
    <>
      <Navbar />
      <main className="main pt-20">
        <SectionWrapper>
          <HeroBanner />
          <FeaturedArticles blogs={blogs} numberOfShownArticles={5} />
          <ExploreCategories blogs={blogs} numberOfShownArticles={9} />
          <MeetOurAuthors authors={authors} numberOfShownAuthors={8} />
          <NewsletterSubscribe />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
