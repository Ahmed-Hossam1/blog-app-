import { FiTrash2 } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useState } from "react";
import MyModal from "@/components/ui/MyModal";

interface DangerZoneSectionProps {
  userId: string;
}

export default function DangerZoneSection({ userId }: DangerZoneSectionProps) {
  const { t } = useTranslation("settings");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = async (userId : string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/delete-user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(t(result.message) || t("dangerZone.success"));
        signOut({ callbackUrl: "/" });
      } else {
        const result = await response.json();
        toast.error(t(result.message) || t("dangerZone.failed"));
      }
    } catch (error) {
      console.log(error);
      toast.error(
        t((error as Error).message) || t("messages.somethingWentWrong"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-100 dark:border-red-900/30 transition-all">
      <MyModal
        title={t("dangerZone.delete_modal.title")}
        isOpen={isDeleteModalOpen}
        close={closeDeleteModal}
      >
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-gray-500 dark:text-gray-400">
            {t("dangerZone.delete_modal.description")}
          </p>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              onClick={closeDeleteModal}
              disabled={loading}
              className="border border-transparent bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
            >
              {t("dangerZone.delete_modal.cancel_button")}
            </Button>

            <Button
              type="button"
              onClick={() => handleDelete(userId)}
              isLoading={loading}
              loadingText={t("dangerZone.delete_modal.deleting_text")}
              className="overflow-hidden bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-rose-600"
            >
              {t("dangerZone.delete_modal.delete_button")}
            </Button>
          </div>
        </div>
      </MyModal>

      <div className="flex items-center gap-2 mb-4 text-red-600">
        <FiTrash2 size={20} />
        <h2 className="text-xl font-bold">{t("dangerZone.title")}</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        {t("dangerZone.description")}
      </p>
      <Button
        onClick={openDeleteModal}
        isLoading={loading}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200 shadow-lg shadow-red-500/20 active:scale-95"
      >
        {t("dangerZone.deleteButton")}
      </Button>
    </section>
  );
}
