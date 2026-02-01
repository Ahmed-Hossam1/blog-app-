"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  bgColor?: string;
}
const Button = ({
  className,
  children,
  bgColor = "none",
  ...res
}: ButtonProps) => {
  return (
    <button
      className={`rounded-md  cursor-pointer  ${className}  ${bgColor} `}
      {...res}
    >
      {children}
    </button>
  );
};

export default Button;
