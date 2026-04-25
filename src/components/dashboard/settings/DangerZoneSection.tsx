import { FiTrash2 } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useState } from "react";

interface DangerZoneSectionProps {
  userId: string;
}

export default function DangerZoneSection({ userId }: DangerZoneSectionProps) {
  const { t } = useTranslation("settings");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(t("dangerZone.confirm"))) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/user/delete-user", {
        method: "POST",
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
      toast.error(t((error as Error).message) || t("messages.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-100 dark:border-red-900/30 transition-all">
      <div className="flex items-center gap-2 mb-4 text-red-600">
        <FiTrash2 size={20} />
        <h2 className="text-xl font-bold">{t("dangerZone.title")}</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        {t("dangerZone.description")}
      </p>
      <Button
        onClick={handleDelete}
        isLoading={loading}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200 shadow-lg shadow-red-500/20 active:scale-95"
      >
        {t("dangerZone.deleteButton")}
      </Button>
    </section>
  );
}

