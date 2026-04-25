"use client";

import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/Input";
import { getUpdateEmailSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface EmailUpdateSectionProps {
  initialEmail: string;
}

export default function EmailUpdateSection({
  initialEmail,
}: EmailUpdateSectionProps) {
  const { t } = useTranslation("settings");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getUpdateEmailSchema(t)),
    values: {
      email: initialEmail || "",
    },
  });

  const updateEmail = async (data: { email: string }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/update-email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail: data.email }),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "settings:account.email.failed");
      toast.success(t(result.message));
      router.refresh();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error(t((error as Error).message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("account.email.label")}
        </label>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <FiEdit2 size={14} />
            <span>{t("profile.editButton")}</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(updateEmail)} className="space-y-2">
        <MyInput
          type="email"
          placeholder={t("account.email.placeholder")}
          disabled={!isEditing}
          {...register("email")}
          className={`disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
        )}
        {isEditing && (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => {
                reset();
                setIsEditing(false);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium transition active:scale-95"
            >
              {t("profile.cancelButton")}
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition active:scale-95"
            >
              {t("account.email.updateButton")}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

