"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  bgColor?: string;
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

const Button = ({
  className = "",
  children,
  bgColor = "",
  disabled,
  isLoading,
  loadingText,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`
        rounded-md transition
        ${isLoading ? "flex items-center justify-center gap-2" : ""}
        ${bgColor}
        ${isLoading || disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      {...rest}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 text-current shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
};

export default Button;
