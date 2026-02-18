import SectionWrapper from "@/components/SectionWrapper";
import { getAuthors } from "@/services";
import Image from "next/image";
import Link from "next/link";

const AuthorsPage = async () => {
  const authors = await getAuthors();

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
          {authors.map((author) => (
            <div
              key={author.id}
              className="rounded-2xl bg-white px-6 py-10 text-center shadow-sm duration-500 hover:scale-105 hover:shadow-lg hover:transition dark:bg-surfaceDark"
            >
              {/* Avatar */}
              <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <Image
                  src={author.image || "/default-image.png"}
                  alt={author.name}
                  width={96}
                  height={96}
                />
              </div>

              {/* Name */}
              <Link
                href={`/authors/${author.id}`}
                className="mb-2 block text-xl font-semibold hover:text-primary dark:text-white"
              >
                {author.name}
              </Link>

              {/* Designation */}
              <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                {author.title || "Contributor"}
              </p>

              {/* Bio Preview */}
              <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                {author.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AuthorsPage;
