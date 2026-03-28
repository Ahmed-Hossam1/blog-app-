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
import { updatePasswordSchema } from "@/schema/schema";

export default function PasswordUpdateSection({
  userId,
}: PasswordUpdateSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
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
        throw new Error(result.message || "Failed to update password");
      toast.success(result.message);
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
          Password
        </label>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 flex items-center gap-2 w-full justify-center transition hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FiLock size={16} /> Update Password
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
          Current Password
        </label>
        <MyInput
          type="password"
          {...register("oldPassword")}
          className={errors.oldPassword ? "border-red-500" : ""}
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-xs mt-0.5">
            {errors.oldPassword.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500">
          New Password
        </label>
        <MyInput
          type="password"
          {...register("newPassword")}
          className={errors.newPassword ? "border-red-500" : ""}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-0.5">
            {errors.newPassword.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-500">
          Confirm Password
        </label>
        <MyInput
          type="password"
          {...register("confirmPassword")}
          className={errors.confirmPassword ? "border-red-500" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-0.5">
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
          className="flex-1 bg-white dark:bg-surfaceDark border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={loading}
          className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm shadow-md"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
