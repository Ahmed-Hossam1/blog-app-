"use client";

import FormField from "@/components/shared/FormField";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/ui/Button";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { formConfig } from "@/constants/forms";
import { createBlogSchema } from "@/schema/schema";
import { INewBlogForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateBlog() {
  /* ==== State ==== */
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSavingDraft, setIsSavingDraft] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<INewBlogForm>({
    resolver: yupResolver(createBlogSchema),
  });

  /* ==== Config ==== */
  const left = formConfig?.content;
  const settings = formConfig?.settings;

  /* ==== Handlers ==== */

  // publish Blogs
  const handlePublish = async (data: INewBlogForm) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data.image[0]);
      // Upload image to cloudinary
      const uploadImageReq = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });
      const uploadImageRes = await uploadImageReq.json();
      if (!uploadImageReq.ok) throw new Error(uploadImageRes.message);
      const imageUrl = uploadImageRes.url;
      const { url } = imageUrl;

      const createBlogReq = await fetch(`/api/blogs/create`, {
        method: "POST",
        body: JSON.stringify({ ...data, image: url }),
      });
      const createBlogRes = await createBlogReq.json();
      if (!createBlogReq.ok) throw new Error(createBlogRes.message);
      toast.success(createBlogRes.message);
      reset({
        title: "",
        content: "",
        category: "",
        image: "",
      });
      // Reset preview image to null to hide preview after successful upload
      setPreviewImage(null);
      // Clear localStorage after successful publish
      localStorage.removeItem("draftId");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // get the form values
  const title = watch("title");
  const content = watch("content");
  const category = watch("category");

  // Save draft
  const handleSaveDraft = async () => {
    if (!title && !content && !category) return;

    setIsSavingDraft(true);

    try {
      let imageUrl: string | undefined;
      const imageField = watch("image");

      if (imageField?.length > 0) {
        const formData = new FormData();
        formData.append("file", imageField[0]);

        const uploadRes = await fetch(`/api/upload`, {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.message);

        imageUrl = uploadData.url?.url;
      }

      const draftId = localStorage.getItem("draftId");

      const payload = {
        title: title || undefined,
        content: content || undefined,
        category: category || undefined,
        image: imageUrl,
      };

      //  CREATE
      if (!draftId) {
        const res = await fetch(`/api/blogs/draft/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        localStorage.setItem("draftId", data.blogId);
      }

      //  UPDATE
      else {
        await fetch(`/api/blogs/draft/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: draftId,
            ...payload,
          }),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Load content from localStorage on mount
  useEffect(() => {
    const storedContent = localStorage.getItem("draftId");
    if (storedContent) {
      const getDraftBlog = async () => {
        try {
          const res = await fetch(`/api/blogs/draft/read/${storedContent}`);
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          reset(data.blog);
        } catch (error) {
          console.log(error);
        }
      };
      getDraftBlog();
    }
  }, []);

  // Autosave content to localStorage as user types
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!title && !content && !category) return;

    const timer = setTimeout(() => {
      handleSaveDraft();
    }, 3000);

    return () => clearTimeout(timer);
  }, [title, content, category]);

  /* ==== JSX ==== */
  return (
    <SectionWrapper>
      <DashboardHeadingTitle
        title="Create New Post"
        description="Write and publish a new article."
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_280px]">
        {/* ==== LEFT COLUMN ==== */}
        <div className="space-y-6">
          <FormField
            ToolBar={true}
            textAreaRows={15}
            Fields={left}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            previewContent={previewContent}
          />
        </div>

        {/* ==== RIGHT COLUMN — Publish Settings ==== */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surfaceDark">
            <h2 className="mb-5 text-lg font-bold text-gray-800 dark:text-gray-100">
              Publish Settings
            </h2>
            <div className="space-y-5">
              {/* ==== SETTINGS ==== */}
              <FormField
                Fields={settings}
                register={register}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
        <Button
          onClick={handleSaveDraft}
          isLoading={isSavingDraft}
          disabled={isSavingDraft || isLoading}
          loadingText="Saving..."
          className="border border-gray-300 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Save Draft
        </Button>
        <Button
          bgColor="bg-primary hover:bg-primary/90"
          className="px-5 py-2.5 text-sm text-white"
          onClick={() => setPreviewContent(!previewContent)}
        >
          {previewContent ? "back to Editor" : "Preview"}
        </Button>
        <Button
          onClick={handleSubmit(handlePublish)}
          bgColor="bg-primary hover:bg-primary/90"
          isLoading={isLoading}
          disabled={isLoading || isSavingDraft}
          loadingText="Publishing..."
          className="px-5 py-2.5 text-sm text-white"
        >
          Publish
        </Button>
      </div>
    </SectionWrapper>
  );
}
