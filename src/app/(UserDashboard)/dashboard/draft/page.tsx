import SectionWrapper from "@/components/shared/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import Link from "next/link";
import { HiOutlineDocumentText, HiOutlineClock, HiOutlinePencilSquare } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getDraftBlogs } from "@/services";

const DraftPage = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  const draftBlogs = await getDraftBlogs(id as string);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {draftBlogs.map((draft) => (
            <Link
              href={`/dashboard/editor?id=${draft.id}`}
              key={draft.id}
              className="group block bg-white dark:bg-surfaceDark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden relative"
            >
              {/* Image or Gradient */}
              <div className="h-48 w-full bg-gradient-to-br from-gray-50 to-gray-200 dark:from-surfaceDark dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 relative overflow-hidden">
                {draft.image ? (
                  <Image
                    src={draft.image}
                    alt={draft.title || "Draft Blog"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <HiOutlineDocumentText className="text-7xl text-gray-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1 shadow-sm">
                  <HiOutlinePencilSquare className="text-primary text-sm" />
                  Draft
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-primary/10 text-primary rounded-md uppercase tracking-wider">
                      {draft.category || "Uncategorized"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {draft.title || "Untitled Draft"}
                  </h3>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/60">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                      <HiOutlineClock className="text-sm" />
                      <span>
                        {new Date(draft.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                      Edit
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
            You haven not saved any draft blogs yet. Start writing your next
            great article and save it as a draft to finish later.
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
