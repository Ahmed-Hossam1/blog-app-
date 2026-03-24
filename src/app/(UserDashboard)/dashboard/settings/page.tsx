import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/ui/Button";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import MyInput from "@/components/ui/Input";
import ProfileUpdateForm from "@/components/dashboard/settings/ProfileUpdateForm";
import { getAuthorBasicInfo } from "@/services";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FiBell, FiCamera, FiLock, FiMail, FiTrash2, FiUser } from "react-icons/fi";

const SettingsPage = async () => {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const author = await getAuthorBasicInfo(userId as string)


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
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group cursor-pointer">
                            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/10">
                                <Image
                                    src="/default-image.png"
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
                        <p className="text-xs text-gray-500 text-center">JPG, GIF or PNG. <br /> Max size of 2MB</p>
                    </div>

                    <ProfileUpdateForm initialData={{
                        name: author?.name as string,
                        title: author?.title as string,
                        bio: author?.bio as string
                    }} />
                </div>
            </section>

            {/* Account Section */}
            <section className="bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
                <div className="flex items-center gap-2 mb-6 text-primary">
                    <FiMail size={20} />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-primary">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <MyInput type="email" placeholder="john@example.com" value={author?.email as string} disabled />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Password</label>
                        <Button className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 flex items-center gap-2 w-full justify-center">
                            <FiLock size={16} /> Update Password
                        </Button>
                    </div>
                </div>
            </section>

            {/* Notifications Section */}
            <section className="bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
                <div className="flex items-center gap-2 mb-6 text-primary">
                    <FiBell size={20} />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notification Preferences</h2>
                </div>

                <div className="space-y-4">
                    {[
                        { id: "email-notif", label: "Email Notifications", desc: "Receive updates about your posts via email." },
                        { id: "comment-notif", label: "Comments Alerts", desc: "Get notified when someone comments on your blog." },
                        { id: "mentions-notif", label: "Mentions", desc: "Receive notifications when other users mention you." }
                    ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer">
                                <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-100 dark:border-red-900/30 transition-all">
                <div className="flex items-center gap-2 mb-4 text-red-600">
                    <FiTrash2 size={20} />
                    <h2 className="text-xl font-bold">Danger Zone</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                    Permanently delete your account and all of your content. This action is irreversible.
                </p>
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200">
                    Delete My Account
                </Button>
            </section>

            {/* Save Button */}
            <div className="flex justify-end gap-3 pt-4">
                <Button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    Cancel
                </Button>
                <Button type="submit" form="profile-form" className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all transform active:scale-95">
                    Save Changes
                </Button>
            </div>
        </SectionWrapper>
    );
};

export default SettingsPage;
