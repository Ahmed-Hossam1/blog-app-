"use client";
import Table from "@/components/Table";
import { tableHeaders } from "@/data/mockData";
import { IBlog } from "@/types";
import { useState } from "react";

interface IProps {
  data: IBlog[];
  selectedIds?: string[];
}
const MyBlogsTable = ({ data }: IProps) => {
  // blogs ids state that are selected in table
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
    const allIds = data.map((post) => post.id);
    if (selectedIds.length === allIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((post) => post.id));
    }
  };

  return (
    <Table
      tableHeader={tableHeaders}
      tableBody={data}
      needCheckbox
      selectedIds={selectedIds}
      onSelectRow={handleSelectRow}
      onSelectAll={handleSelectAll}
    />
  );
};

export default MyBlogsTable;
