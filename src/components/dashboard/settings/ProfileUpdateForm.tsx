"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileSchema } from "@/schema/schema";
import FormField from "@/components/shared/FormField";
import { IField } from "@/types";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { FiEdit2 } from "react-icons/fi";

interface ProfileUpdateFormProps {
  userId: string;
  initialData?: {
    name?: string;
    title?: string;
    bio?: string;
  };
}

const fields: IField<any>[] = [
  {
    name: "name",
    id: "name",
    type: "text",
    label: "Display Name",
    placeholder: "John Doe",
  },
  {
    name: "title",
    id: "title",
    type: "text",
    label: "Job Title",
    placeholder: "Software Engineer",
  },
  {
    name: "bio",
    id: "bio",
    type: "textarea",
    label: "Bio",
    placeholder: "Tell us a bit about yourself...",
  },
]

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
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: initialData?.name || "",
      title: initialData?.title || "",
      bio: initialData?.bio || "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/update-profile", {
        method: "POST",
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
          Fields={fields.slice(0, 2)}
          register={register}
          errors={errors}
          disabled={!isEditing}
        />
        <div className="md:col-span-2">
          <FormField
            Fields={fields.slice(2)}
            register={register}
            errors={errors}
            textAreaRows={4}
            disabled={!isEditing}
          />
        </div>

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
