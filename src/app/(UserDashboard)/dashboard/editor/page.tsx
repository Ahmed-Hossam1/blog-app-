"use client";

import FormField from "@/components/shared/FormField";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/ui/Button";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { formConfig } from "@/constants/forms";
import { createBlogSchema } from "@/schema/schema";
import { INewBlogForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
  const leftColumn = formConfig?.content;
  const rightColumn = formConfig?.settings;

  /* ==== Helpers ==== */

  /**
   * Uploads a file to Cloudinary via /api/upload.
   * Returns the secure image URL string.
   */
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`/api/upload`, { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    // The upload API returns { url: <Cloudinary result object> }
    // The Cloudinary result contains `.secure_url`
    return data.url?.secure_url as string;
  };

  /* ==== Handlers ==== */

  // Publish blog
  const handlePublish = async (data: INewBlogForm) => {
    setIsLoading(true);
    try {
      // Upload image from the file input
      const imageUrl = await uploadImage(data.image[0] as File);

      const activeId = activeIdRef.current;

      if (activeId) {
        // ── Promote existing draft to PUBLISHED 
        const res = await fetch(`/api/blogs/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: activeId,
            ...data,
            image: imageUrl,
            status: data.status ?? "PUBLISHED",
          }),
        });
        const resData = await res.json();
        if (!res.ok) throw new Error(resData.message);
        toast.success(resData.message);
      } else {
        // ── Create brand-new published blog 
        const res = await fetch(`/api/blogs/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, image: imageUrl }),
        });
        const resData = await res.json();
        if (!res.ok) throw new Error(resData.message);
        toast.success(resData.message);
      }

      reset({
        title: "",
        content: "",
        category: "",
        status: "DRAFT",
        image: undefined,
      });
      setPreviewImage(null);
      activeIdRef.current = null;
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Watch form values for autosave
  const title = watch("title");
  const content = watch("content");
  const category = watch("category");

  // Save draft (manual or autosave)
  const handleSaveDraft = useCallback(async () => {
    if (!title && !content && !category) return;

    setIsSavingDraft(true);

    try {
      let imageUrl: string | undefined;
      const imageField = watch("image");

      // Only attempt image upload when a file is actually selected
      if (imageField?.[0] instanceof File) {
        imageUrl = await uploadImage(imageField[0]);
      }

      const payload = {
        title: title || undefined,
        content: content || undefined,
        category: category || undefined,
        image: imageUrl,
      };

      const activeId = activeIdRef.current;

      if (!activeId) {
        // ── CREATE new draft 
        const res = await fetch(`/api/blogs/draft/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        activeIdRef.current = data.blogId;
      } else {
        // ── UPDATE existing draft
        const res = await fetch(`/api/blogs/draft/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: activeId, ...payload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save draft. Please try again.");
    } finally {
      setIsSavingDraft(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content, category]);

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
        setPreviewImage(data.blog.image)
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
    if (!title && !content && !category) return;
    if (isLoadingDraftRef.current) return; // skip during initial load

    const timer = setTimeout(() => {
      handleSaveDraft();
    }, 3000);

    return () => clearTimeout(timer);
  }, [title, content, category,previewImage, handleSaveDraft]);

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
            Fields={leftColumn}
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
                Fields={rightColumn}
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
