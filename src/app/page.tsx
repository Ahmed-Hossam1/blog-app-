import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CallToAction from "@/components/sections/CallToAction";
import ContinueReading from "@/components/sections/ContinueReading";
import ExploreCategories from "@/components/sections/ExploreCategories";
import FeaturedArticles from "@/components/sections/FeaturedArticles";
import HeroBanner from "@/components/sections/HeroBanner";
import MeetOurAuthors from "@/components/sections/MeetOurAuthors";
import PlatformStats from "@/components/sections/PlatformStats";
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

          <ContinueReading />

          <ExploreCategories blogs={blogs} numberOfShownArticles={9} />

          <PlatformStats />

          <MeetOurAuthors authors={authors} numberOfShownAuthors={8} />

          <CallToAction />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
