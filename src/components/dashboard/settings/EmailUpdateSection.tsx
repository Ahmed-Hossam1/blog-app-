"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import MyInput from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateEmailSchema } from "@/schema/schema";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface EmailUpdateSectionProps {
  initialEmail: string;
  userId: string;
}

export default function EmailUpdateSection({
  initialEmail,
  userId,
}: EmailUpdateSectionProps) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateEmailSchema),
    defaultValues: {
      email: initialEmail,
    },
  });

  const updateEmail = async (data: { email: string }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, email: data.email }),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Failed to update email");
      toast.success(result.message);
      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <FiEdit2 size={14} />
            <span>Change</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(updateEmail)} className="space-y-2">
        <MyInput
          type="email"
          placeholder="john@example.com"
          disabled={!isEditing}
          {...register("email")}
          className={`disabled:opacity-50 disabled:cursor-not-allowed ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
        {isEditing && (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => {
                reset();
                setIsEditing(false);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md"
            >
              Update
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
