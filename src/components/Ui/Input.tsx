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
      className={`block w-full px-3 bg-white/5  text-sm/6 text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 ${className}`}
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

