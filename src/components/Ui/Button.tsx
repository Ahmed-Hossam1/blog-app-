"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  bgColor?: string;
  isLoading?: boolean;
  children: ReactNode;
}

const Button = ({
  className = "",
  children,
  bgColor = "",
  disabled,
  isLoading,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`
        rounded-md transition
        ${isLoading ? "flex items-center justify-center" : ""}
        ${bgColor}
        ${isLoading || disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      {...rest}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
