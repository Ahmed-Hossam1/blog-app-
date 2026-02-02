import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import SectionWrapper from "@/components/SectionWrapper";
import { IBlog } from "@/types";
import Link from "next/link";
import { lazy, Suspense } from "react";
import { getBlogs } from "@/services/blogService";

const ExploreCard = lazy(() => import("@/components/cards/ExploreCard"));
const page = async () => {
  /*===== Fetch ===== */
  const data: IBlog[] = await getBlogs();

  /*===== HANDLERS ===== */
  const renderCards = data?.map((blog: IBlog) => (
    <Link href={`/blog/${blog.id}`} key={blog.id}>
      <ExploreCard blog={blog} />
    </Link>
  ));

  return (
    <SectionWrapper>
      <div className="container mx-auto">
        {/* Header */}
        <div className=" mb-14 text-center">
          <h1 className="mb-3 text-4xl font-semibold text-black">
            Read, Learn & Grow
          </h1>
          <p className="mx-auto max-w-2xl text-gray-500">
            From expert advice to behind-the-scenes stories – explore content
            designed for curious minds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<CardSkeleton numberOfSkeleton={9} />}>
            {renderCards}
          </Suspense>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default page;
