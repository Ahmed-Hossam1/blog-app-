import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DangerZoneSection from "@/components/dashboard/settings/DangerZoneSection";
import EmailUpdateSection from "@/components/dashboard/settings/EmailUpdateSection";
import PasswordUpdateSection from "@/components/dashboard/settings/PasswordUpdateSection";
import PictureSection from "@/components/dashboard/settings/PictureSection";
import ProfileUpdateForm from "@/components/dashboard/settings/ProfileUpdateForm";
import SectionWrapper from "@/components/shared/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { getAuthorBasicInfo } from "@/services";
import { getServerSession } from "next-auth";
import { FiUser } from "react-icons/fi";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const author = await getAuthorBasicInfo(userId as string);

  

  return (
    <SectionWrapper>
      <div className="mb-10">
        <DashboardHeadingTitle
          title="Settings"
          description="Manage your profile, account preferences, and notifications."
        />
      </div>

      {/* Delete Modal  */}

      {/* <MyModal
        title="Delete Blogs"
        isOpen={showDeleteModal}
        close={closeDeleteModal}
      >
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Delete Blogs
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Are you sure you want to delete the selected blogs? This action
            cannot be undone.
          </p>
          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              onClick={closeDeleteModal}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 border border-transparent transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => deleteBlogs(selectedIds)}
              isLoading={isLoading}
              loadingText="Deleting..."
              className="px-5 py-2.5 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-all duration-200 overflow-hidden"
            >
              Delete
            </Button>
          </div>
        </div>
      </MyModal> */}

      <div className="flex flex-col gap-8">
        {/* Profile Section */}
        <section className="bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
          <div className="flex items-center gap-2 mb-6 text-primary">
            <FiUser size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Profile Information
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <PictureSection initialImage={author?.image as string} />

            <ProfileUpdateForm
              userId={userId as string}
              initialData={{
                name: author?.name as string,
                title: author?.title as string,
                bio: author?.bio as string,
              }}
            />
          </div>
        </section>

        {/* Account Section */}
        <section className="bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EmailUpdateSection initialEmail={author?.email as string} />
            <PasswordUpdateSection userId={userId as string} />
          </div>
        </section>

        {/* Danger Zone */}
        <DangerZoneSection userId={userId as string} />
      </div>
    </SectionWrapper>
  );
};

export default SettingsPage;
