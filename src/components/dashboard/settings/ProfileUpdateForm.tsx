"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileSchema } from "@/schema/schema";
import FormField from "@/components/shared/FormField";
import { IField } from "@/types";

interface ProfileUpdateFormProps {
  initialData?: {
    name?: string;
    title?: string;
    bio?: string;
  };
}

export default function ProfileUpdateForm({ initialData }: ProfileUpdateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: initialData?.name || "",
      title: initialData?.title || "",
      bio: initialData?.bio || "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Profile Update Validated & Submitted:", data);
  };

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
  ];

  return (
    <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField Fields={fields.slice(0, 2)} register={register} errors={errors} />
      <div className="md:col-span-2">
        <FormField Fields={fields.slice(2)} register={register} errors={errors} textAreaRows={4} />
      </div>
    </form>
  );
}
