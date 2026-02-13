import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ExploreCategories from "@/components/sections/ExploreCategories";
import FeaturedArticles from "@/components/sections/FeaturedArticles";
import MeetOurAuthors from "@/components/sections/MeetOurAuthors";
import NewsletterSubscribe from "@/components/sections/NewsletterSubscribe";
import SectionWrapper from "@/components/SectionWrapper";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [blogsRes, authorsRes] = await Promise.all([
    fetch(`${baseUrl}/api/blogs`),
    fetch(`${baseUrl}/api/authors`),
  ]);

  if (!blogsRes.ok || !authorsRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const blogs = await blogsRes.json();
  const authors = await authorsRes.json();
  
  return (
    <>
      <Navbar />
      <main className="main pt-20">
        <SectionWrapper>
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
