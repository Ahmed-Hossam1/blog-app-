import AuthorCard from "@/components/cards/AuthorCard";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { Suspense } from "react";

const AuthorsPage = () => {
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-2 text-center text-4xl font-bold dark:text-white">
          Our Team
        </h1>
        <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-300">
          Meet the talented individuals behind our content.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Suspense fallback={<SkeletonCard numberOfCards={10} />}>
            <AuthorCard />
          </Suspense>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AuthorsPage;
