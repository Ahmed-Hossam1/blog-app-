"use client";
import FormField from "@/components/FormField";
import Button from "@/components/ui/Button";
import MyModal from "@/components/ui/MyModal";
import { formConfig } from "@/constants/forms";
import { tableHeaders } from "@/data/mockData";
import { IBlog, INewBlogForm } from "@/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Table from "../../Table";
import { useRouter } from "next/navigation";

interface IProps {
  data: IBlog[];
}

const RecentBlogsTable = ({ data }: IProps) => {
  const slicedData = data.slice(0, 7);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<INewBlogForm>();
  const [selectedBlogToEdit, setSelectedBlogToEdit] = useState<IBlog | null>(
    null,
  );
  const [selectedBlogToDelete, setSelectedBlogToDelete] =
    useState<IBlog | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  /* Form Config */
  const content = formConfig?.content;
  const settings = formConfig?.settings;

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  useEffect(() => {
    setPreviewImage(previewImage);
  }, [previewImage]);
  
  const handleEdit = (blog: IBlog) => {
    handleOpenEditModal();
    setSelectedBlogToEdit(blog);
    reset({
      title: blog.title,
      content: blog.content,
      status: blog.status,
      category: blog.category,
      image: blog.image,
    });
  };
  const handleOpenAlertDelete = (blog: IBlog) => {
    handleOpenDeleteModal();
    setSelectedBlogToDelete(blog);
  };

  const updateBlog = async (data: INewBlogForm) => {
    console.log(data)
    setIsLoading(true);
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/update`,
        {
          method: "PUT",
          body: JSON.stringify({ ...data, id: selectedBlogToEdit?.id }),
        },
      );
      const res = await req.json();
      if (!req.ok) throw new Error(res.message);
      toast.success(res.message);
      setIsLoading(false);
      handleCloseEditModal();
      router.refresh();
    } catch (error) {
      toast.error(`${error as Error}`);
      console.log(error);
      setIsLoading(false);
    }
  };
  const deleteBlog = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/delete`,
        {
          method: "DELETE",
          body: JSON.stringify({ id: selectedBlogToDelete?.id }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      setIsLoading(false);
      handleCloseDeleteModal();
      router.refresh();
    } catch (error) {
      toast.error(`${error as Error}`);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Edit Modal */}
      <MyModal
        isOpen={isEditModalOpen}
        open={handleOpenEditModal}
        close={handleCloseEditModal}
        title="Edit Modal"
      >
        <FormField
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          Fields={content}
          register={register}
          errors={errors}
        />
        <FormField Fields={settings} register={register} errors={errors} />
        <div className="flex justify-end gap-3 pt-4">
          <Button
            onClick={handleCloseEditModal}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(updateBlog)}
            isLoading={isLoading}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Update
          </Button>
        </div>
      </MyModal>

      {/* Delete Modal */}
      <MyModal
        isOpen={isDeleteModalOpen}
        open={handleOpenDeleteModal}
        close={handleCloseDeleteModal}
        title="Delete Item"
      >
        <div className="space-y-6">
          {/* Warning Text */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-5 w-5 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7h12M9 7v10m6-10v10M10 11v6m4-6v6M4 7h16M5 7l1-2h12l1 2"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm text-gray-700">
                Are you sure you want to delete this{" "}
                <strong> `{selectedBlogToDelete?.title}` </strong>?
              </p>
              <p className="text-sm font-medium text-red-600 mt-1">
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={handleCloseDeleteModal}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
            >
              Cancel
            </Button>

            <Button
              onClick={deleteBlog}
              isLoading={isLoading}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              Delete
            </Button>
          </div>
        </div>
      </MyModal>

      <div className="overflow-x-auto">
        <Table
          tableTitle="Recent Blogs"
          tableHeader={tableHeaders}
          tableBody={slicedData}
          onEdit={handleEdit}
          onDelete={handleOpenAlertDelete}
        />
      </div>

      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 text-center">
        <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          View all posts
        </button>
      </div>
    </div>
  );
};

export default RecentBlogsTable;
