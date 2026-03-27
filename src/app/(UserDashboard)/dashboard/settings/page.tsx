import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DangerZoneSection from "@/components/dashboard/settings/DangerZoneSection";
import EmailUpdateSection from "@/components/dashboard/settings/EmailUpdateSection";
import PasswordUpdateSection from "@/components/dashboard/settings/PasswordUpdateSection";
import ProfileUpdateForm from "@/components/dashboard/settings/ProfileUpdateForm";
import SectionWrapper from "@/components/shared/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { getAuthorBasicInfo } from "@/services";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FiCamera, FiUser } from "react-icons/fi";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const author = await getAuthorBasicInfo(userId as string);

  return (
    <SectionWrapper>
      <DashboardHeadingTitle
        title="Settings"
        description="Manage your profile, account preferences, and notifications."
      />

      {/* Profile Section */}
      <section className="bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
        <div className="flex items-center gap-2 mb-6 text-primary">
          <FiUser size={20} />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Profile Information
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/10">
                <Image
                  src={author?.image || "/default-image.png"}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FiCamera className="text-white" size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              JPG, GIF or PNG. <br /> Max size of 2MB
            </p>
          </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmailUpdateSection
            initialEmail={author?.email as string}
            userId={userId as string}
          />
          <PasswordUpdateSection userId={userId as string} />
        </div>
      </section>
      
      {/* Danger Zone */}
      <DangerZoneSection userId={userId as string} />
    </SectionWrapper>
  );
};

export default SettingsPage;
