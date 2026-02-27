"use client";
import Tab from "@/components/Tab";
import { ITab } from "@/types";
import { useState } from "react";

interface TabsCatProps {
  data: ITab[];
}
const TabsCat = ({ data }: TabsCatProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  return (
    <>
      {data.map((tab) => (
        <Tab
          onActive={() => setActiveCategory(tab.name)}
          isActive={tab.name === activeCategory}
          key={tab.id}
        >
          {tab.name}
        </Tab>
      ))}
    </>
  );
};

export default TabsCat;
