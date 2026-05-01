"use client";

import FormField from "@/components/shared/FormField";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/ui/Button";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { formConfig } from "@/constants/forms";
import { uploadImage } from "@/lib/utils";
import { getCreateBlogSchema } from "@/schema/schema";
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
import { useTranslation } from "react-i18next";

export default function Editor() {
  /* ==== State ==== */
  const { t } = useTranslation("editor");
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
    resolver: yupResolver(getCreateBlogSchema(t)),
  });

  /* ==== CONFIG ==== */
  const contentFields = (formConfig?.content ?? []).map(field => ({
    ...field,
    label: t(`fields.${field.id}.label`),
    placeholder: t(`fields.${field.id}.placeholder`)
  }));

  const settingsFields = (formConfig?.settings ?? []).map(field => ({
    ...field,
    label: t(`fields.${field.id}.label`),
    placeholder: t(`fields.${field.id}.placeholder`),
    options: field.options?.map(opt => ({
      ...opt,
      name: t(`fields.category.options.${opt.value}`)
    }))
  }));

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

      toast.success(t("messages.publishSuccess"));

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
  }, [formTitle, formContent, formCategory, formImage, setValue]);


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
        toast.error(t("messages.loadDraftFailed"));
      } finally {
        // Small delay so the watch values have settled before re-enabling autosave
        setTimeout(() => {
          isLoadingDraftRef.current = false;
        }, 500);
      }
    };

    getDraftBlog();
  }, [urlBlogId, reset, t]);

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
        title={t("heading.title")}
        description={t("heading.description")}
      />

      {previewContent ? (
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-surfaceDark mb-6 mt-8 max-w-5xl mx-auto border border-gray-200 dark:border-gray-700">
          {/* ======= Image ======= */}
          <div className="relative h-105 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={previewImage || "/default-image.png"}
              alt={t("preview.coverAlt")}
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

            {/* Read Time mock */}
            <span className="absolute right-6 bottom-8 rounded-full bg-white/20 px-4 py-1 text-xs font-medium text-white backdrop-blur-md">
              {formContent
                ? t("preview.readTime", { count: Math.max(1, Math.ceil(formContent.split(/\s+/).length / 200)) })
                : t("preview.readTime", { count: 1 })}
            </span>

            {/* Title Over Image */}
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="mb-3 inline-block rounded-full bg-primary/80 px-4 py-1 text-xs font-medium backdrop-blur">
                {formCategory ? t(`fields.category.options.${formCategory}`) : t("preview.defaultCategory")}
              </span>

              <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
                {formTitle || t("preview.defaultTitle")}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gray-200 px-8 py-6 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-gray-300 dark:bg-gray-600 ring-2 ring-primary/30 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                {t("preview.you")}
              </div>
              <div>
                <span className="text-sm font-medium dark:text-white">
                  {t("preview.youAuthor")}
                </span>
                <p className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <BsCalendar2Date />
                  {new Date().toLocaleDateString(t("common:locale") === "ar" ? "ar-EG" : "en-US", {
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
              {formContent || t("preview.startWriting")}
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
                {t("settings.title")}
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
          loadingText={t("actions.saving")}
          className="border border-gray-300 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {t("actions.saveDraft")}
        </Button>
        <Button
          bgColor="bg-primary hover:bg-primary/90"
          className="px-5 py-2.5 text-sm text-white"
          onClick={() => setPreviewContent(!previewContent)}
        >
          {previewContent ? t("preview.back") : t("actions.preview")}
        </Button>
        <Button
          onClick={handleSubmit(handlePublish)}
          bgColor="bg-primary hover:bg-primary/90"
          isLoading={isLoading}
          disabled={isLoading || isSavingDraft}
          loadingText={t("actions.publishing")}
          className="px-5 py-2.5 text-sm text-white"
        >
          {t("actions.publish")}
        </Button>
      </div>
    </SectionWrapper>
  );
}

