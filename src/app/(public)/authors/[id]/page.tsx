import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ExploreCard from "@/components/cards/ExploreCard";
import SectionWrapper from "@/components/shared/SectionWrapper";
import FollowersAvatarGroup from "@/components/FollowersAvatarGroup";
import {
  getAuthorProfile,
  getFollowersBasicInfo,
  isUserFollowing,
} from "@/services";
import { IBlog } from "@/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import FollowButton from "@/components/blog/FollowButton";
import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";

type Props = {
  params : Promise<{id : string}> 
} 

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = await getAuthorProfile(id);
  const t = await getTranslations("authors");

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  const siteName = "Blog App";
  const title = `${author.name} | ${siteName}`;
  const description = author.bio || t.profile.noBio;
  const image = author.image || "/default-user.png";

  return {
    title,
    description,
    alternates: {
      canonical: `/authors/${id}`,
    },
    openGraph: {
      title,
      description,
      type: "profile",
      username: author.name,
      images: [
        {
          url: image,
          width: 800,
          height: 800,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
const AuthorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const author = await getAuthorProfile(id);
  const t = await getTranslations("authors");
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!author) {
    notFound();
  }

  const followersIds = author.followers.map((follower) => follower.followerId);

  const followers = await getFollowersBasicInfo(followersIds);

  const isFollowing = await isUserFollowing(id, userId as string);

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
                {author.title || t.profile.staffWriter}
              </p>

              <p className="mt-4  text-gray-600 dark:text-gray-300">
                {author.bio || t.profile.noBio}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                {/* Followers */}
                <div className="flex items-center gap-3">
                  <FollowersAvatarGroup
                    followers={followers}
                    total={followers.length}
                    labels={{
                      follower: t.profile.follower,
                      followers: t.profile.followers,
                      zero_followers: t.profile.zero_followers,
                      modal_title: t.profile.followers,
                    }}
                  />
                </div>

                {/* Follow Button */}
                {userId !== author.id && (
                  <FollowButton
                    isFollowing={isFollowing}
                    followingId={author.id}
                  />
                )}
              </div>

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
                {t.profile.articlesBy.replace("{{name}}", author.name)}
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {author.blogs.map((post: IBlog) => (
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
              {t.profile.noArticles.replace("{{name}}", author.name)}
            </p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AuthorPage;
