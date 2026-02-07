"use client";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
}

const Button = ({
  className = "",
  children,
  bgColor = "",
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`
        rounded-md transition
        ${bgColor}
        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-black"
        }
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
