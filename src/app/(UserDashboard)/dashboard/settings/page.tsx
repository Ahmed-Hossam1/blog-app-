"use client";

import DangerZoneSection from "@/components/dashboard/settings/DangerZoneSection";
import EmailUpdateSection from "@/components/dashboard/settings/EmailUpdateSection";
import PasswordUpdateSection from "@/components/dashboard/settings/PasswordUpdateSection";
import PictureSection from "@/components/dashboard/settings/PictureSection";
import ProfileUpdateForm from "@/components/dashboard/settings/ProfileUpdateForm";
import SectionWrapper from "@/components/shared/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { IAuthor } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const { data: session } = useSession();
  const { t } = useTranslation("settings");
  const userId = session?.user?.id;
  const [author, setAuthor] = useState<IAuthor>({} as IAuthor);

  useEffect(() => {
      async function fetchAuthor() {
        try {
          const response = await fetch(`/api/user/read`);
          const data = await response.json();
          if (!response.ok) throw new Error(data.message);
          setAuthor(data);
        } catch (error) {
          console.error(error);
          toast.error(t("messages.somethingWentWrong"));
        }
      }

      fetchAuthor();
  }, [userId]);

  console.log(author)
  return (
    <SectionWrapper>
      <div className="mb-10">
        <DashboardHeadingTitle
          title={t("heading.title")}
          description={t("heading.description")}
        />
      </div>

      <div className="flex flex-col gap-8">
        {/* Profile Section */}
        <section className="bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
          <div className="flex items-center gap-2 mb-6 text-primary">
            <FiUser size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("sections.profileInfo")}
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
