import { authorData } from "@/data";
import Image from "next/image";
import Link from "next/link";
const MeetOurAuthors = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Explore Authors</h2>
          <Link
            href="/authors"
            className="text-sm font-medium text-primary underline underline-offset-4 hover:text-blue-800"
          >
            View all Authors
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {authorData.map((author, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white px-6 py-10 text-center shadow-sm  hover:shadow-md hover:scale-105 hover:transition duration-500"
            >
              {/* Avatar */}
              <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              {/* Name */}
              <Link
                href={`/author/${author.name.split(" ").join("-")}`}
                className="text-lg font-semibold hover:text-primary"
              >
                {author.name}
              </Link>

              {/* Role */}

              {/* Bio */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurAuthors;
