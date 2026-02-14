import { ReactNode } from "react";
import Button from "./ui/Button";

interface ITab {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}
const Tab = ({ children, onClick, className }: ITab) => {
  return (
    <Button
      onClick={onClick}
      className={`border border-baseInk rounded-sm px-4 py-2 text-sm  transition duration-500 font-medium ${className} 
     
      `}
    >
      {children}
    </Button>
  );
};

export default Tab;
