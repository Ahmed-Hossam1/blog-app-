import SectionWrapper from "@/components/shared/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import Link from "next/link";
import { HiOutlineDocumentText } from "react-icons/hi2";
import Button from "@/components/ui/Button";

const DraftPage = () => {
  // Mock empty drafts for UI purpose (No logic added as requested)
  const draftBlogs: any[] = [];

  return (
    <SectionWrapper>
      {/* Heading Section */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <DashboardHeadingTitle
            title="My Drafts"
            description="Manage and edit your unpublished blog posts."
          />
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-surfaceDark px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <HiOutlineDocumentText className="text-primary dark:text-primaryLight text-xl" />
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {draftBlogs.length} Saved{" "}
            {draftBlogs.length === 1 ? "Draft" : "Drafts"}
          </span>
        </div>
      </div>

      {/* Drafts Grid */}
      {draftBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Draft cards would go here */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 mt-8 bg-white dark:bg-surfaceDark rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <HiOutlineDocumentText className="text-primary/60 text-5xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            No Drafts Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">
            You haven't saved any draft blogs yet. Start writing your next great article and save it as a draft to finish later.
          </p>
          <Link href="/dashboard/create-blog">
            <Button className="px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all">
              Write New Blog
            </Button>
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
};

export default DraftPage;