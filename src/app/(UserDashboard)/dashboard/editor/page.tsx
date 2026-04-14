"use client";

import FormField from "@/components/shared/FormField";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/ui/Button";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { formConfig } from "@/constants/forms";
import { uploadImage } from "@/lib/utils";
import { createBlogSchema } from "@/schema/schema";
import { INewBlogForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BsCalendar2Date } from "react-icons/bs";

export default function Editor() {
  /* ==== State ==== */
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSavingDraft, setIsSavingDraft] = useState<boolean>(false);

  // Single source of truth for the active draft/blog ID.
  // Initialized from the URL ?id= param; updated when a new draft is created.
  const searchParams = useSearchParams();
  const urlBlogId = searchParams.get("id");
  const activeIdRef = useRef<string | null>(urlBlogId);
  const router = useRouter();
  // Prevent autosave from firing during initial draft load
  const isLoadingDraftRef = useRef<boolean>(false);

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

  /* ==== CONFIG ==== */
  const contentFields = formConfig?.content;
  const settingsFields = formConfig?.settings;
  // Watch form values for autosave
  const formTitle = watch("title");
  const formContent = watch("content");
  const formCategory = watch("category");
  const formImage = watch("image");

  // Publish blog
  const handlePublish = async (data: INewBlogForm) => {
    setIsLoading(true);

    try {
      let imageUrl: string | null = null;

      if (formImage instanceof FileList && formImage.length > 0) {
        imageUrl = await uploadImage(formImage[0]);
      } else if (typeof formImage === "string") {
        imageUrl = formImage;
      }

      const res = await fetch(`/api/blogs/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeIdRef.current ?? undefined,
          ...data,
          image: imageUrl,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message);

      toast.success(resData.message);

      reset({
        title: "",
        content: "",
        category: "",
        image: undefined,
      });

      setPreviewImage(null);
      activeIdRef.current = null;
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Save draft (manual or autosave)
  const handleSaveDraft = useCallback(async () => {
    if (!formTitle && !formContent && !formCategory) return;

    try {
      setIsSavingDraft(true);
      let imageUrl;

      if (formImage instanceof FileList && formImage.length > 0) {
        imageUrl = await uploadImage(formImage[0]);
        setValue("image", imageUrl);
      } else if (typeof formImage === "string") {
        imageUrl = formImage;
      }

      const res = await fetch(`/api/blogs/draft/save-draft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: activeIdRef.current ?? undefined,
          title: formTitle,
          content: formContent,
          category: formCategory,
          image: imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      activeIdRef.current = data.blogId;
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingDraft(false);
    }
  }, [formTitle, formContent, formCategory, formImage]);

  
  // Load draft blog from DB on mount (when ?id= is present)
  useEffect(() => {
    if (!urlBlogId) return;

    const getDraftBlog = async () => {
      isLoadingDraftRef.current = true; // suppress autosave during load
      try {
        const res = await fetch(`/api/blogs/draft/read/${urlBlogId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        reset(data.blog);
        setPreviewImage(data.blog.image);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load draft.");
      } finally {
        // Small delay so the watch values have settled before re-enabling autosave
        setTimeout(() => {
          isLoadingDraftRef.current = false;
        }, 500);
      }
    };

    getDraftBlog();
  }, [urlBlogId, reset]);

  // Autosave to DB as draft (debounced 3 sec)
  useEffect(() => {
    if (!formTitle && !formContent && !formCategory) return;
    if (isLoadingDraftRef.current) return; // skip during initial load

    const timer = setTimeout(() => {
      handleSaveDraft();
    }, 3000);

    return () => clearTimeout(timer);
  }, [formTitle, formContent, formCategory, previewImage, handleSaveDraft]);

  /* ==== JSX ==== */
  return (
    <SectionWrapper>
      <DashboardHeadingTitle
        title="Create New Post"
        description="Write and publish a new article."
      />

      {previewContent ? (
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-surfaceDark mb-6 mt-8 max-w-5xl mx-auto border border-gray-200 dark:border-gray-700">
          {/* ======= Image ======= */}
          <div className="relative h-105 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={previewImage || "/default-image.png"}
              alt="Preview Cover"
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

            {/* Read Time mock */}
            <span className="absolute right-6 bottom-8 rounded-full bg-white/20 px-4 py-1 text-xs font-medium text-white backdrop-blur-md">
              {formContent
                ? `${Math.max(1, Math.ceil(formContent.split(/\\s+/).length / 200))} min read`
                : "1 min read"}
            </span>

            {/* Title Over Image */}
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="mb-3 inline-block rounded-full bg-primary/80 px-4 py-1 text-xs font-medium backdrop-blur">
                {formCategory || "Category"}
              </span>

              <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
                {formTitle || "Your Blog Title"}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gray-200 px-8 py-6 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-gray-300 dark:bg-gray-600 ring-2 ring-primary/30 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                You
              </div>
              <div>
                <span className="text-sm font-medium dark:text-white">
                  You (Author)
                </span>
                <p className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <BsCalendar2Date />
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* ======= CONTENT ======= */}
          <article className="prose prose-lg mx-auto max-w-none px-8 py-10 prose-headings:font-bold prose-h2:mt-10 prose-p:text-gray-600 prose-img:rounded-xl prose-img:shadow-md dark:prose-invert">
            <Markdown remarkPlugins={[remarkGfm]}>
              {formContent || "*Start writing your blog...*"}
            </Markdown>
          </article>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_280px]">
          {/* ==== LEFT COLUMN ==== */}
          <div className="space-y-6">
            <FormField
              ToolBar={true}
              textAreaRows={15}
              Fields={contentFields}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
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
                  Fields={settingsFields}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
