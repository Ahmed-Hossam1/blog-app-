import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionWrapper from "@/components/shared/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { getUserLikes } from "@/services";
import { getServerSession } from "next-auth";
import LikeCard from "@/components/dashboard/likes/LikeCard";
import Link from "next/link";
import { HiOutlineHeart } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import { getTranslations } from "@/lib/i18n/server/get-translations";

const LikesPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Fetch user likes
  const likedBlogs = (await getUserLikes(user?.id as string)) || [];
  const t = await getTranslations("likes");

  return (
    <SectionWrapper>
      {/* Heading Section */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <DashboardHeadingTitle title={t.title} description={t.description} />
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-surfaceDark px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <HiOutlineHeart className="text-primary dark:text-primaryLight text-xl" />
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {likedBlogs.length} {t.liked_count}{" "}
            {likedBlogs.length === 1 ? t.liked_single : t.liked_plural}
          </span>
        </div>
      </div>

      {/* Likes Grid */}
      {likedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedBlogs.map((blog: any) => (
            <LikeCard
              key={blog.id}
              id={blog.id}
              slug={blog.slug}
              title={blog.title}
              image={blog.image}
              category={blog.category}
              views={blog.views}
              readTime={blog.readTime}
              createdAt={blog.createdAt}
              author={blog.author}
              comments={blog.comments}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 mt-8 bg-white dark:bg-surfaceDark rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <HiOutlineHeart className="text-primary/60 text-5xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {t.empty_title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
            {t.empty_description}
          </p>
          <Link href="/blog">
            <Button className="px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all">
              {t.explore_button}
            </Button>
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
};

export default LikesPage;
