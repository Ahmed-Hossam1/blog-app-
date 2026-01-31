"use client";
import { Input } from "@headlessui/react";
import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string | undefined;
  name: string;
  type: string;
  //   value: string | number;
  placeholder: string;
  className?: string;
}
const MyInput = ({
  id,
  name,
  type,
  //   value,
  placeholder,
  className,

  ...res
}: IProps) => {
  return (
    <Input
      className={`${className} w-full border border-gray focus:outline-none focus:border-primary transition  px-3 py-2 `}
      id={id}
      name={name}
      type={type}
      //   value={value}
      placeholder={placeholder}
      {...res}
    />
  );
};

export default MyInput;
