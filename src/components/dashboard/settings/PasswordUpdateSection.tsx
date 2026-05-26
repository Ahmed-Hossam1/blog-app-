"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import { FiLock } from "react-icons/fi";
import Input from "@/components/ui/Input";

interface PasswordUpdateSectionProps {
  userId: string;
}

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getUpdatePasswordSchema } from "@/schema/schema";

import { useTranslation } from "react-i18next";

export default function PasswordUpdateSection({
  userId,
}: PasswordUpdateSectionProps) {
  const { t } = useTranslation("settings");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getUpdatePasswordSchema(t)),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const updatePassword = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "settings:account.password.failed");
      toast.success(t(result.message) || t("account.password.success"));
      setShowForm(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(t((error as Error).message));
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
          {t("account.password.title")}
        </label>
        <Button
          onClick={() => setShowForm(true)}
          variant="outline"
          fullWidth
          className="flex items-center gap-2 justify-center"
        >
          <FiLock size={16} /> {t("account.password.updateButton")}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(updatePassword)}
      className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800"
    >
      <Input
        type="password"
        label={t("account.password.currentLabel")}
        placeholder={t("account.password.currentPlaceholder")}
        {...register("oldPassword")}
        errorText={errors.oldPassword?.message}
        variant="outline"
        fullWidth
      />
      <Input
        type="password"
        label={t("account.password.newLabel")}
        placeholder={t("account.password.newPlaceholder")}
        {...register("newPassword")}
        errorText={errors.newPassword?.message}
        variant="outline"
        fullWidth
      />
      <Input
        type="password"
        label={t("account.password.confirmLabel")}
        placeholder={t("account.password.confirmPlaceholder")}
        {...register("confirmPassword")}
        errorText={errors.confirmPassword?.message}
        variant="outline"
        fullWidth
      />
      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setShowForm(false);
            reset();
          }}
          className="flex-1"
        >
          {t("profile.cancelButton")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          className="flex-1"
        >
          {t("profile.saveButton")}
        </Button>
      </div>
    </form>
  );
}

