"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
const MyInput = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      {...rest}
      className={`${className} capitalize w-full border border-gray focus:outline-none focus:border-primary transition  px-3 py-2 dark:bg-transparent dark:text-white dark:border-gray-600`}
    />
  );
});

MyInput.displayName = "MyInput";
export default MyInput;
