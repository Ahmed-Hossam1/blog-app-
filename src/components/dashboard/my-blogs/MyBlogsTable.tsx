"use client";
import Tab from "@/components/Tab";
import Table from "@/components/Table";
import MyInput from "@/components/ui/Input";
import { DashboardTabsData } from "@/data";
import { tableHeaders } from "@/data/mockData";
import { IBlog } from "@/types";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  authorBlogs: IBlog[];
}
const MyBlogsTable = ({ authorBlogs }: IProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  // blogs ids state that are selected in table
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();
  const filteredBlogs =
    activeCategory === "All"
      ? authorBlogs
      : authorBlogs.filter(
        (blog) => blog.status === activeCategory.toUpperCase(),
      );

  /*
  check if the post is selected then remove it from the selectedIds array
  [4,3,2,1] => [3,2,1]
  if not selected then add it to the selectedIds array
  [3,2,1] => [3,2,1,4
  */

  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  /* 
    check if the selectedIds length is equal to the allIds length that 
    get from data array  if true then empty the selectedIds array 
    [1,2,3] => []
    if not then get all the ids from data array 
    [] => [1,2,3] || [1,2] => [1,2,3]
  */

  const handleSelectAll = () => {
    const allIds = authorBlogs.map((blog) => blog.id);
    if (selectedIds.length === allIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(authorBlogs.map((blog) => blog.id));
    }
  };

  const handlePublish = async (ids: string[]) => {
    if (ids.length === 0) return;
    try {
      for (let i = 0; i <= ids.length - 1; i++) {
        const res = await fetch(`/api/blogs/update`, {
          method: "PUT",
          body: JSON.stringify({
            id: ids[i],
            status: "PUBLISHED",
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
      }
      toast.success(`blogs PUBLISHED successfully`);
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const handleArchive = async (ids: string[]) => {
    if (ids.length === 0) return;
    try {
      for (let i = 0; i <= ids.length - 1; i++) {
        const res = await fetch(`/api/blogs/update`, {
          method: "PUT",
          body: JSON.stringify({
            id: ids[i],
            status: "ARCHIVED",
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
      }
      toast.success(`blogs archived successfully`);
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const handleDraft = async (ids: string[]) => {
    if (ids.length === 0) return;
    try {
      for (let i = 0; i <= ids.length - 1; i++) {
        const res = await fetch(`/api/blogs/update`, {
          method: "PUT",
          body: JSON.stringify({
            id: ids[i],
            status: "DRAFT",
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
      }
      toast.success(`blogs DRAFT successfully`);
      setSelectedIds([]);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 mb-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          {DashboardTabsData.map((tab) => (
            <Tab
              onActive={() => setActiveCategory(tab.name)}
              isActive={tab.name === activeCategory}
              key={tab.id}
            >
              {tab.name}
            </Tab>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:max-w-md">
            <MyInput
              placeholder="Search your blogs..."
              className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500"
            />
          </div>

          {/* Actions */}
          <div
            className={`flex items-center gap-3 w-full md:w-auto transition-all duration-300 ${selectedIds.length > 0
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
              }`}
          >
            <Button
              onClick={() => handlePublish(selectedIds)}
              className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Publish
            </Button>
            <Button
              onClick={() => handleArchive(selectedIds)}
              className="bg-amber-500 cursor-pointer hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Archive
            </Button>
            <Button
              onClick={() => handleDraft(selectedIds)}
              className="bg-zinc-500 cursor-pointer hover:bg-zinc-600 dark:bg-zinc-600 dark:hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Draft
            </Button>
            <Button className="bg-rose-500 cursor-pointer hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <Table
              tableHeader={tableHeaders}
              tableBody={filteredBlogs}
              needCheckbox
              selectedIds={selectedIds}
              onSelectRow={handleSelectRow}
              onSelectAll={handleSelectAll}
            />
          </div>

          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
            {/* Pagination */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBlogsTable;
