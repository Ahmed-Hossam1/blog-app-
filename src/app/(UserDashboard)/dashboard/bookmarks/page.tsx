import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionWrapper from "@/components/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { getUserBookmarks } from "@/services";
import { getServerSession } from "next-auth";
import BookmarkCard from "@/components/dashboard/bookmarks/BookmarkCard";
import Link from "next/link";
import { HiOutlineBookmark } from "react-icons/hi2";
import Button from "@/components/ui/Button";

const BookmarksPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Fetch user bookmarks
  const bookmarkedBlogs = (await getUserBookmarks(user?.id as string)) || [];

  return (
    <SectionWrapper>
      {/* Heading Section */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <DashboardHeadingTitle
            title="My Bookmarks"
            description="Manage and read your saved blog posts."
          />
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-surfaceDark px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <HiOutlineBookmark className="text-primary dark:text-primaryLight text-xl" />
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {bookmarkedBlogs.length} Saved{" "}
            {bookmarkedBlogs.length === 1 ? "Blog" : "Blogs"}
          </span>
        </div>
      </div>

      {/* Bookmarks  Grid */}
      {bookmarkedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedBlogs.map((blog) => (
            <BookmarkCard
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
            <HiOutlineBookmark className="text-primary/60 text-5xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            No Bookmarks Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
            You haven not saved any blogs to your bookmarks. Explore the latest
            articles and save the ones you love to read later.
          </p>
          <Link href="/blog">
            <Button className="px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all">
              Explore Blogs
            </Button>
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
};

export default BookmarksPage;
