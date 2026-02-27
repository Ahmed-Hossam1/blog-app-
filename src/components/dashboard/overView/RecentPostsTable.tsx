"use client";
import MyModal from "@/components/ui/MyModal";
import { tableHeaders } from "@/data/mockData";
import { IBlog, INewBlogForm } from "@/types";
import { useState } from "react";
import Table from "../../Table";
import FormField from "@/components/FormField";
import { newBlogForm } from "@/constants/forms";
import { useForm } from "react-hook-form";

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
    formState: { errors },
  } = useForm<INewBlogForm>();

  const content = newBlogForm?.content;
  const settings = newBlogForm?.settings;

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleEdit = (blog: IBlog) => {
    handleOpenEditModal();
    reset({
      title: blog.title,
      content: blog.content,
    });
  };
  const handleDelete = (id: string) => {
    handleOpenDeleteModal();
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
        <FormField Fields={content} register={register} errors={errors} />
        <FormField Fields={settings} register={register} errors={errors} />
      </MyModal>
      {/* Delete Modal */}
      <MyModal
        isOpen={isDeleteModalOpen}
        open={handleOpenDeleteModal}
        close={handleCloseDeleteModal}
        title="Delete Modal"
      >
        Delete
      </MyModal>

      <div className="overflow-x-auto">
        <Table
          tableTitle="Recent Blogs"
          tableHeader={tableHeaders}
          tableBody={slicedData}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
