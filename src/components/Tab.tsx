import { ReactNode } from "react";
import Button from "./ui/Button";

interface ITab {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  onActive: () => void;
}

const Tab = ({ children, className, isActive, onActive }: ITab) => {
  return (
    <Button
      className={`border border-baseInk rounded-sm px-4 py-2 text-sm  transition duration-500 font-medium 
      ${
        isActive
          ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
      }
      
      ${className} 
      
      `}
      onClick={onActive}
    >
      {children}
    </Button>
  );
};

export default Tab;
