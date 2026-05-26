import { ReactNode } from "react";
import Button from "../ui/Button";

interface ITab {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  onActive: () => void;
}

const Tab = ({ children, className, isActive, onActive }: ITab) => {
  return (
    <Button
      variant={isActive ? "primary" : "outline"}
      className={className}
      onClick={onActive}
    >
      {children}
    </Button>
  );
};

export default Tab;
