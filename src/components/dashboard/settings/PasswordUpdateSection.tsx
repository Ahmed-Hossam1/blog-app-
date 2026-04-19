"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import { FiLock } from "react-icons/fi";
import MyInput from "@/components/ui/Input";

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
        throw new Error(result.message || t("account.password.failed"));
      toast.success(result.message || t("account.password.success"));
      setShowForm(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
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
          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 flex items-center gap-2 w-full justify-center transition hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95"
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
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500">
          {t("account.password.currentLabel")}
        </label>
        <MyInput
          type="password"
          placeholder={t("account.password.currentPlaceholder")}
          {...register("oldPassword")}
          className={errors.oldPassword ? "border-red-500" : ""}
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-xs mt-0.5 font-medium">
            {errors.oldPassword.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500">
          {t("account.password.newLabel")}
        </label>
        <MyInput
          type="password"
          placeholder={t("account.password.newPlaceholder")}
          {...register("newPassword")}
          className={errors.newPassword ? "border-red-500" : ""}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-0.5 font-medium">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500">
          {t("account.password.confirmLabel")}
        </label>
        <MyInput
          type="password"
          placeholder={t("account.password.confirmPlaceholder")}
          {...register("confirmPassword")}
          className={errors.confirmPassword ? "border-red-500" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-0.5 font-medium">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          onClick={() => {
            setShowForm(false);
            reset();
          }}
          className="flex-1 bg-white dark:bg-surfaceDark border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm transition active:scale-95"
        >
          {t("profile.cancelButton")}
        </Button>
        <Button
          type="submit"
          isLoading={loading}
          className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm shadow-md transition active:scale-95 font-bold"
        >
          {t("profile.saveButton")}
        </Button>
      </div>
    </form>
  );
}

