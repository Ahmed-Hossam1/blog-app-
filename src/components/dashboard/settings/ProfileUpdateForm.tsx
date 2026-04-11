"use client";

import FormField from "@/components/shared/FormField";
import Button from "@/components/ui/Button";
import { formConfig } from "@/constants/forms";
import { updateProfileSchema } from "@/schema/schema";
import { IProfileForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

interface ProfileUpdateFormProps {
  userId: string;
  initialData?: {
    name?: string;
    title?: string;
    bio?: string;
  };
}

const formInputs = formConfig.profileForm;
export default function ProfileUpdateForm({
  initialData,
  userId,
}: ProfileUpdateFormProps) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { update } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProfileForm>({
    resolver: yupResolver(updateProfileSchema),
    values: {
      name: initialData?.name || "",
      title: initialData?.title || "",
      bio: initialData?.bio || "",
    },
  });

  const onSubmit = async (data: IProfileForm) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, ...data }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Profile updated successfully");
        await update({ name: data.name });
        setIsEditing(false); // Stop editing after save
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Personal Details
        </h3>
        {!isEditing && (
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors py-1 px-3 rounded-lg border border-primary/20 hover:bg-primary/5"
          >
            <FiEdit2 size={16} />
            <span>Edit Profile</span>
          </Button>
        )}
      </div>

      <form
        id="profile-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormField
          Fields={formInputs}
          register={register}
          errors={errors}
          disabled={!isEditing}
        />

        {isEditing && (
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
            <Button
              type="button"
              onClick={() => {
                reset();
                setIsEditing(false);
              }}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all transform active:scale-95"
            >
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
