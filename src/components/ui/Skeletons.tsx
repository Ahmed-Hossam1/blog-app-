import SectionWrapper from "@/components/shared/SectionWrapper";

// Reusable single card skeleton
export const SingleCardSkeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-surfaceDark animate-pulse ${className}`}
  >
    <div className="h-48 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
    <div className="mt-2 h-4 w-1/3 rounded-full bg-gray-200 dark:bg-gray-700" />
    <div className="h-6 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
    <div className="mt-3 flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

// Reusable single author card skeleton
export const SingleAuthorSkeleton = () => (
  <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surfaceDark animate-pulse">
    <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
    <div className="flex flex-col items-center w-full gap-2">
      <div className="h-5 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700" />
    </div>
    <div className="mt-4 flex w-full flex-col gap-2">
      <div className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
      <div className="h-3 w-4/5 rounded-md bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

export const FeaturedArticlesSkeleton = () => {
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3 mb-10 animate-pulse">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-8 w-48 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Big Card - spans 2 columns */}
          <div className="lg:col-span-2">
            <SingleCardSkeleton className="h-full" />
          </div>

          {/* Small Cards Column */}
          <div className="flex flex-col gap-6">
            <SingleCardSkeleton />
            <SingleCardSkeleton />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export const ExploreCategoriesSkeleton = ({ numberOfCards = 9 }: { numberOfCards?: number }) => {
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-8 w-48 rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(numberOfCards)].map((_, i) => (
            <SingleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export const MeetOurAuthorsSkeleton = ({ numberOfAuthors = 8 }: { numberOfAuthors?: number }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-12 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-8 w-40 rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(numberOfAuthors)].map((_, i) => (
            <SingleAuthorSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
