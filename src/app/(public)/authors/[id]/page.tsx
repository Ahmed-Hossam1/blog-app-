import ExploreCard from "@/components/cards/ExploreCard";
import SectionWrapper from "@/components/SectionWrapper";
// import { authorsData } from "@/data"; // Removed dependency on mock data for the profile itself
import { IBaseBlog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/authors/${id}`,
  );
  const author = await res.json();

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Author Profile Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 h-32 w-32 overflow-hidden rounded-full bg-gray-100 shadow-lg dark:bg-gray-800">
            <Image
              src={author.image || "/assets/authors/default.png"}
              alt={author.name}
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="mb-2 text-3xl font-bold dark:text-white">
            {author.name}
          </h1>
          <p className="mb-4 font-medium text-primary">
            {author.title || "Contributor"}
          </p>
          <p className="max-w-2xl text-gray-600 dark:text-gray-300">
            {author.bio}
          </p>

          {/* Social Links (Mocked) */}
          <div className="mt-6 flex gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-primary dark:text-gray-400"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-pink-600 dark:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400"
            >
              <FaFacebook size={24} />
            </a>
          </div>
        </div>

        {/* Author's Articles */}
        <div className="mb-8 border-t pt-8 dark:border-gray-800">
          {author?.blogs.length > 0 ? (
            <>
              <h2 className="mb-8 text-2xl font-bold dark:text-white">
                Articles by {author.name}
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {author?.blogs.map((post: IBaseBlog) => (
                  <Link href={`/blog/${post.slug}`} key={post.id}>
                    <ExploreCard
                      title={post.title}
                      image={post.image}
                      category={post.category}
                      meta={post.meta}
                      // author from author Table not from Blogs
                      author={author}
                    />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-xl">
              {author.name} has not written any articles yet.
            </p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default page;
