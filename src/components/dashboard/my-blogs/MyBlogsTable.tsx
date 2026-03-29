"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import { toast } from "react-toastify";

import Pagination from "@/components/shared/Pagination";
import Tab from "@/components/shared/Tab";
import Table from "@/components/shared/Table";
import MyInput from "@/components/ui/Input";

import { DashboardTabsData } from "@/constants";
import { tableHeaders } from "@/constants";

import { IBlog } from "@/types";
import { BlogStatus } from "../../../../generated/prisma/enums";
import MyModal from "@/components/ui/MyModal";

/* ================================
   Types
================================ */
interface IProps {
  authorBlogs: IBlog[];
}

/* ================================
   Component
================================ */
const MyBlogsTable = ({ authorBlogs }: IProps) => {
  const router = useRouter();

  /* ================================
     States
  =================================*/
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ids of blogs selected inside the table
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  /* ================================
     Filtering
  =================================*/
  const filteredBlogs = authorBlogs.filter((blog) => {
    // status in DB is uppercase (PUBLISHED / DRAFT / ARCHIVED)
    const matchCategory =
      activeCategory === "All" || blog.status === activeCategory.toUpperCase();

    const matchSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  /* ================================
     Pagination
  =================================*/
  const limit = 8;
  const totalPages = Math.ceil(filteredBlogs.length / limit);
  const firstIndex = (currentPage - 1) * limit;
  const lastIndex = firstIndex + limit;
  const slicedData = filteredBlogs.slice(firstIndex, lastIndex);

  /*
    Reset page when filter or search changes
    to prevent pagination breaking
  */
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  /* ================================
     Row Selection
  =================================*/
  /*
    Toggle blog selection

    if selected:
      [4,3,2,1] -> [3,2,1]

    if not selected:
      [3,2,1] -> [3,2,1,4]
  */
  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  /*
    Select / Unselect all rows

    if all selected:
      [1,2,3] -> []

    if not all selected:
      [] -> [1,2,3]
      [1,2] -> [1,2,3]
  */
  const handleSelectAll = () => {
    const allIds = slicedData.map((blog) => blog.id);
    if (selectedIds.length === allIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allIds);
    }
  };

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);
  /* ================================
     Blog Status Actions
  =================================*/
  const updateBlogStatus = async (ids: string[], state: BlogStatus) => {
    if (ids.length === 0) return;
    setIsLoading(true);
    try {
      for (const id of ids) {
        const res = await fetch(`/api/blogs/update`, {
          method: "PUT",
          body: JSON.stringify({ id, status: state }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
      }
      router.refresh();
      toast.success(`Blogs ${state.toLowerCase()} successfully`);
      setSelectedIds([]);
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  /* ================================
     Delete Blogs
  =================================*/
  const deleteBlogs = async (ids: string[]) => {
    if (ids.length === 0) return;

    setIsLoading(true);
    try {
      for (const id of ids) {
        const res = await fetch(`/api/blogs/delete`, {
          method: "DELETE",
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
      }
      router.refresh();
      toast.success("Blogs deleted successfully");
      setSelectedIds([]);
      closeDeleteModal();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-8 animate-pulse">
        {/* Table Skeleton */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50"></div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="px-6 py-5 flex items-center justify-between"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-6 w-1/3">
                    <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-800 rounded shrink-0"></div>
                    <div className="h-5 w-full bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  </div>
                  <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                  <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                  <div className="hidden md:block h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="hidden md:block h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ========= Render ============*/
  if (authorBlogs.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 p-12 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-center">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          No data yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          You haven not written any blogs yet. Start your journey by creating
          one!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Confirm Delete Modal */}
      <MyModal
        title="Delete Blogs"
        isOpen={showDeleteModal}
        close={closeDeleteModal}
      >
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
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
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 border border-transparent transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => deleteBlogs(selectedIds)}
              isLoading={isLoading}
              loadingText="Deleting..."
              className="px-5 py-2.5 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-all duration-200 overflow-hidden"
            >
              Delete
            </Button>
          </div>
        </div>
      </MyModal>

      {/* ====== Filters + Actions ====== */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 mb-8 space-y-6">
        {/* Tabs */}
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

        {/* Search + Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search */}
          <div className="w-full md:max-w-md">
            <MyInput
              placeholder="Search your blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500"
            />
          </div>

          {/* Bulk Actions */}
          <div
            className={`flex items-center gap-3 w-full md:w-auto transition-all duration-300 ${selectedIds.length > 0
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
              }`}
          >
            <Button
              onClick={() => updateBlogStatus(selectedIds, "PUBLISHED")}
              className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Publish
            </Button>

            <Button
              onClick={() => updateBlogStatus(selectedIds, "ARCHIVED")}
              className="bg-amber-500 cursor-pointer hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Archive
            </Button>

            <Button
              onClick={() => updateBlogStatus(selectedIds, "DRAFT")}
              className="bg-zinc-500 cursor-pointer hover:bg-zinc-600 dark:bg-zinc-600 dark:hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Draft
            </Button>

            <Button
              onClick={openDeleteModal}
              className="bg-rose-500 cursor-pointer hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* ================================
          Table Section
      ================================= */}
      <div className="mb-8">
        {filteredBlogs.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-gray-500 dark:text-gray-400 italic">
              No blogs match your filter criteria.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <Table
                tableHeader={tableHeaders}
                tableBody={slicedData}
                needCheckbox
                selectedIds={selectedIds}
                onSelectRow={handleSelectRow}
                onSelectAll={handleSelectAll}
              />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBlogsTable;
