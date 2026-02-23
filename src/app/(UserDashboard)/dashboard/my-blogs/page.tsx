"use client";

import StatusCard from "@/components/cards/StatusCard";
import Pagination from "@/components/Pagination";
import SectionWrapper from "@/components/SectionWrapper";
import Tab from "@/components/Tab";
import Table from "@/components/Table";
import Button from "@/components/ui/Button";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import MyInput from "@/components/ui/Input";
import { DashboardTabsData } from "@/data";
import { MY_BLOGS_STATS, RECENT_POSTS, tableHeaders } from "@/data/mockData";
import { ITab } from "@/types";
import { useState } from "react";

const MyBlogs = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  // blogs ids state that are selected in table
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  /* 
    check if the selectedIds length is equal to the allIds length that 
    get from RECENT_POSTS array  if true then empty the selectedIds array 
    [1,2,3] => []
    if not then get all the ids from RECENT_POSTS array 
    [] => [1,2,3] || [1,2] => [1,2,3]
  */
  const handleSelectAll = () => {
    const allIds = RECENT_POSTS.map((post) => post.id);
    if (selectedIds.length === allIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(RECENT_POSTS.map((post) => post.id));
    }
  };

  /*
  check if the post is selected then remove it from the selectedIds array
  [4,3,2,1] => [3,2,1]
  if not selected then add it to the selectedIds array
  [3,2,1] => [3,2,1,4
  */

  const handleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <SectionWrapper>
      {/* Heading */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <DashboardHeadingTitle
            title="My Blogs"
            description="Manage your blog posts and categories."
          />
        </div>
      </div>

      {/* Row 1: Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {MY_BLOGS_STATS.map((stat, index) => (
          <StatusCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 mb-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          {DashboardTabsData.map((item: ITab) => (
            <Tab
              key={item.id}
              className={`
               ${
                 item.name === activeCategory
                   ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                   : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
               }
              `}
              onClick={() => setActiveCategory(item.name)}
            >
              {item.name}
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

          <div
            className={`flex items-center gap-3 w-full md:w-auto transition-all duration-300 
            ${selectedIds.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
          >
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mr-2">
              {selectedIds.length} selected
            </span>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Publish
            </Button>
            <Button className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Draft
            </Button>
            <Button className="border border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 px-4 py-2 rounded-lg text-sm transition-colors">
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <Table
              tableHeader={tableHeaders}
              tableBody={RECENT_POSTS}
              needCheckbox
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
            />
          </div>

          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
            <Pagination
              currentPage={1}
              totalPages={4}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10"></div>
    </SectionWrapper>
  );
};

export default MyBlogs;
