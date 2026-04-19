import AuthorCard from "@/components/cards/AuthorCard";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { getTranslations } from "@/lib/i18n";
import { Suspense } from "react";

const AuthorsPage = async () => {
  const t = await getTranslations("authors");
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-2 text-center text-4xl font-bold dark:text-white">
          {t.listing.title}
        </h1>
        <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-300">
          {t.listing.description}
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
