"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import Button from "@/components/ui/Button";
import Pagination from "@/components/shared/Pagination";
import Tab from "@/components/shared/Tab";
import MyInput from "@/components/ui/Input";
import MyModal from "@/components/ui/MyModal";

import { DashboardTabsData, tableHeaders } from "@/constants";
import { IBlog } from "@/types";
import { BlogStatus } from "../../../../generated/prisma/enums";
import Table from "@/components/shared/Table";

const MyBlogsTable = ({ authorBlogs }: { authorBlogs: IBlog[] }) => {
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const filteredBlogs = useMemo(() => {
    return authorBlogs.filter((blog) => {
      const matchCategory =
        activeCategory === "All" ||
        blog.status === activeCategory.toUpperCase();

      const matchSearch = (blog.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [authorBlogs, activeCategory, searchTerm]);

  const limit = 8;
  const totalPages = Math.ceil(filteredBlogs.length / limit);
  const firstIndex = (currentPage - 1) * limit;
  const lastIndex = firstIndex + limit;
  const slicedData = filteredBlogs.slice(firstIndex, lastIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    const allIds = slicedData.map((blog) => blog.id);

    setSelectedIds((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const updateBlogStatus = async (ids: string[], state: BlogStatus) => {
    if (ids.length === 0) return;

    setIsLoading(true);
    try {
      for (const id of ids) {
        const res = await fetch(`/api/blogs/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: state }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
      }

      toast.success(`Blogs moved to ${state.toLowerCase()} successfully`);
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlogs = async (ids: string[]) => {
    if (ids.length === 0) return;

    setIsLoading(true);
    try {
      for (const id of ids) {
        const res = await fetch(`/api/blogs/delete`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
      }

      toast.success("Blogs deleted successfully");
      setSelectedIds([]);
      closeDeleteModal();
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (authorBlogs.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
          No blogs yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Start by creating your first blog post.
        </p>

        <Link
          href="/dashboard/editor"
          className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Create Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <MyModal
        title="Delete Blogs"
        isOpen={showDeleteModal}
        close={closeDeleteModal}
      >
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
            Delete Blogs
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Are you sure you want to delete the selected blogs? This action
            cannot be undone.
          </p>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              onClick={closeDeleteModal}
              disabled={isLoading}
              className="border border-transparent bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={() => deleteBlogs(selectedIds)}
              isLoading={isLoading}
              loadingText="Deleting..."
              className="overflow-hidden bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-rose-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </MyModal>

      <div className="mb-8 space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center gap-3">
          {DashboardTabsData.map((tab) => (
            <Tab
              key={tab.id}
              isActive={tab.name === activeCategory}
              onActive={() => setActiveCategory(tab.name)}
            >
              {tab.name}
            </Tab>
          ))}
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-md">
            <MyInput
              placeholder="Search your blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-zinc-200 bg-zinc-50 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>

          <div
            className={`flex flex-wrap items-center gap-3 transition-all duration-300 ${selectedIds.length > 0
                ? "opacity-100 translate-y-0"
                : "pointer-events-none opacity-0 translate-y-4"
              }`}
          >
            <Button
              onClick={() => updateBlogStatus(selectedIds, "PUBLISHED")}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-600"
            >
              Publish
            </Button>

            <Button
              onClick={() => updateBlogStatus(selectedIds, "DRAFT")}
              className="rounded-lg bg-zinc-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-600"
            >
              Draft
            </Button>

            <Button
              onClick={openDeleteModal}
              className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-rose-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        {filteredBlogs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="italic text-gray-500 dark:text-gray-400">
              No blogs match your filter criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table
                tableHeader={tableHeaders}
                tableBody={slicedData}
                needCheckbox
                selectedIds={selectedIds}
                onSelectRow={handleSelectRow}
                onSelectAll={handleSelectAll}
                showActions
                getViewHref={(blog) =>
                  blog.status === "PUBLISHED" && blog.slug
                    ? `/blogs/${blog.slug}`
                    : null
                }
              />
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center border-t border-zinc-100 p-4 dark:border-zinc-800">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyBlogsTable;
