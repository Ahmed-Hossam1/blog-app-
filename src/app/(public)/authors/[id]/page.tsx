import ExploreCard from "@/components/cards/ExploreCard";
import SectionWrapper from "@/components/SectionWrapper";
import { getAuthorById } from "@/services";
import { IBaseBlog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

const AuthorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const author = await getAuthorById(id);

  if (!author) {
    notFound();
  }

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Author Profile Header */}
        <div className="mb-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
            {/* Avatar */}
            <div className="h-40 w-40 overflow-hidden rounded-full border border-gray-200 bg-gray-100 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <Image
                src={author.image || "/default-image.png"}
                alt={author.name}
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Author Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-black dark:text-white">
                {author.name}
              </h1>

              <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">
                {author.title || "Staff Writer"}
              </p>

              <p className="mt-4 max-w-xl text-gray-600 dark:text-gray-300">
                {author.bio ||
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique inventore quos consequuntur sint ut, sed repellendus hic odit eum repudiandae!"}
              </p>

              {/* Social Links */}
              <div className="mt-6 flex justify-center gap-5 md:justify-start">
                <Link
                  href="#"
                  className="text-gray-500 transition hover:scale-110 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  <FaGithub size={22} />
                </Link>

                <Link
                  href="#"
                  className="text-gray-500 transition hover:scale-110 hover:text-blue-600 dark:text-gray-400"
                >
                  <FaLinkedin size={22} />
                </Link>

                <Link
                  href="#"
                  className="text-gray-500 transition hover:scale-110 hover:text-pink-600 dark:text-gray-400"
                >
                  <FaInstagram size={22} />
                </Link>

                <Link
                  href="#"
                  className="text-gray-500 transition hover:scale-110 hover:text-blue-500 dark:text-gray-400"
                >
                  <FaFacebook size={22} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Author's Articles */}
        <div className="mb-8 border-t pt-8 dark:border-gray-800">
          {author.blogs.length > 0 ? (
            <>
              <h2 className="mb-8 text-2xl font-bold dark:text-white">
                Articles by {author.name}
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {author.blogs.map((post: IBaseBlog) => (
                  <Link href={`/blog/${post.slug}`} key={post.id}>
                    <ExploreCard
                      title={post.title}
                      image={post.image}
                      category={post.category}
                      views={post.views}
                      readTime={post.readTime}
                      createdAt={post.createdAt}
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

export default AuthorPage;
