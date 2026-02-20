import { IAuthor } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface MeetOurAuthorsProps {
  numberOfShownAuthors: number;
  authors: IAuthor[];
}
const MeetOurAuthors = ({
  authors,
  numberOfShownAuthors,
}: MeetOurAuthorsProps) => {
  const slicedAuthors = authors.slice(0, numberOfShownAuthors);
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-semibold dark:text-white">
            Explore Authors
          </h2>
          <Link
            href="/authors"
            className="text-sm font-medium text-primary underline underline-offset-4 hover:text-blue-800 dark:text-gray-200 dark:hover:text-blue-400"
          >
            View all Authors
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-8">
          {slicedAuthors.map((author) => (
            <div
              key={author.id}
              className="rounded-2xl bg-white px-6 py-10 text-center shadow-sm  hover:shadow-md hover:scale-105 hover:transition duration-500 dark:bg-surfaceDark"
            >
              {/* Avatar */}
              <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <Image
                  src={`${author.image ?? "/default-image.png"}`}
                  alt={author.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              {/* Name */}
              <Link
                href={`/authors/${author.id}`}
                className="text-lg font-semibold hover:text-primary dark:text-white"
              >
                {author.name}
              </Link>

              {/* title */}
              <div className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">
                {author.title}
              </div>

              {/* Bio */}
              <div className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {author.bio}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurAuthors;
