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
import {
  ExploreCategoriesSkeleton,
  FeaturedArticlesSkeleton,
  MeetOurAuthorsSkeleton,
} from "@/components/ui/Skeletons";
import { getAuthors, getBlogs } from "@/services";

import { Suspense } from "react";

async function FeaturedArticlesWrapper() {
  const blogs = await getBlogs();

  return <FeaturedArticles blogs={blogs} numberOfShownArticles={5} />;
}

async function ExploreCategoriesWrapper() {
  const blogs = await getBlogs();

  return <ExploreCategories blogs={blogs} numberOfShownArticles={9} />;
}

async function MeetOurAuthorsWrapper() {
  const authors = await getAuthors();

  return <MeetOurAuthors authors={authors} numberOfShownAuthors={8} />;
}

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="main pt-20">
        <SectionWrapper>
          <HeroBanner />

          <Suspense fallback={<FeaturedArticlesSkeleton />}>
            <FeaturedArticlesWrapper />
          </Suspense>

          <ContinueReading />

          <Suspense fallback={<ExploreCategoriesSkeleton numberOfCards={9} />}>
            <ExploreCategoriesWrapper />
          </Suspense>

          <PlatformStats />

          <Suspense fallback={<MeetOurAuthorsSkeleton numberOfAuthors={8} />}>
            <MeetOurAuthorsWrapper />
          </Suspense>

          <CallToAction />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
