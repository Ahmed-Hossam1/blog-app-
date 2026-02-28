"use client";
import FormField from "@/components/FormField";
import SectionWrapper from "@/components/SectionWrapper";
import Button from "@/components/ui/Button";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { formConfig } from "@/constants/forms";
import { INewBlogForm } from "@/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

/* ═══════════════════════════════════════════ */
export default function CreateBlog() {
  const [previewImage, setPreviewImage] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const content = formConfig?.content;
  const settings = formConfig?.settings;

  useEffect(() => {
    setPreviewImage(previewImage);
  }, [previewImage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewBlogForm>();

  const handleCreate = async (data: INewBlogForm) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data.image[0]);
      // Upload image to cloudinary
      const uploadImageReq = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const uploadImageRes = await uploadImageReq.json();
      if (!uploadImageReq.ok) throw new Error(uploadImageRes.message);
      const imageUrl = uploadImageRes.url;
      const {url} = imageUrl;

      // Create blog
      const createBlogReq = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/create`,
        {
          method: "POST",
          body: JSON.stringify({ ...data, image: url }),
        },
      );
      const createBlogRes = await createBlogReq.json();
      if (!createBlogReq.ok) throw new Error(createBlogRes.message);
      toast.success(createBlogRes.message);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(`${error as Error}`);
      setIsLoading(false);
    }
  };

  return (
    <SectionWrapper>
      {/* Header */}
      <DashboardHeadingTitle
        title="Create New Post"
        description="Write and publish a new article."
      />

      {/* Two-column grid */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_280px]">
        {/* ══════ LEFT COLUMN ══════ */}
        <div className="space-y-6">
          {/* ══════ CONTENT ══════ */}
          <FormField
            ToolBar={true}
            textAreaRows={15}
            Fields={content}
            register={register}
            errors={errors}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
        </div>

        {/* ══════ RIGHT COLUMN — Publish Settings ══════ */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surfaceDark">
            <h2 className="mb-5 text-lg font-bold text-gray-800 dark:text-gray-100">
              Publish Settings
            </h2>
            <div className="space-y-5">
              {/* ══════ SETTINGS ══════ */}
              <FormField
                Fields={settings}
                register={register}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════ Bottom Action Bar ══════ */}
      <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
        <Button className="border border-gray-300 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
          Cancel
        </Button>
        <Button className="border border-gray-300 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800">
          Save Draft
        </Button>
        <Button
          bgColor="bg-primary hover:bg-primary/90"
          className="px-5 py-2.5 text-sm text-white"
        >
          Preview
        </Button>
        <Button
          onClick={handleSubmit(handleCreate)}
          bgColor="bg-primary hover:bg-primary/90"
          isLoading={isLoading}
          disabled={isLoading}
          className="px-5 py-2.5 text-sm text-white"
        >
          Publish
        </Button>
      </div>
    </SectionWrapper>
  );
}
