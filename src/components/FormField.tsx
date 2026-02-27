import { IField } from "@/types";
import MyInput from "./ui/Input";
import ErrorMessage from "./ErrorMessage";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuListOrdered,
  LuQuote,
} from "react-icons/lu";
import {
  FiBold,
  FiCode,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
  FiUploadCloud,
} from "react-icons/fi";
import Button from "./ui/Button";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const TOOLBAR_BUTTONS = [
  { icon: LuHeading1, label: "Heading 1" },
  { icon: LuHeading2, label: "Heading 2" },
  { icon: LuHeading3, label: "Heading 3" },
  { divider: true },
  { icon: FiBold, label: "Bold" },
  { icon: FiItalic, label: "Italic" },
  { icon: FiCode, label: "Code" },
  { divider: true },
  { icon: FiList, label: "Bullet list" },
  { icon: LuListOrdered, label: "Ordered list" },
  { icon: LuQuote, label: "Blockquote" },
  { divider: true },
  { icon: FiLink, label: "Link" },
  { icon: FiImage, label: "Image" },
];

interface FormFieldProps<T extends FieldValues> {
  Fields: IField<T>[];
  register: UseFormRegister<T>;
  errors: FieldErrors;
  ToolBar?: boolean;
  textAreaRows?: number;
}

const FormField = <T extends FieldValues>({
  Fields,
  register,
  errors,
  ToolBar,
  textAreaRows,
}: FormFieldProps<T>) => {
  return (
    <>
      {Fields.map((input, index) => (
        <div key={index} className="space-y-2">
          {input.label && (
            <label htmlFor={input.id} className="text-sm font-medium">
              {input.label}
            </label>
          )}

          {input.type === "textarea" ? (
            <div className="rounded-xl border border-gray-200  bg-white shadow-sm dark:border-gray-800 dark:bg-surfaceDark ">
              {/* Toolbar */}
              {ToolBar && (
                <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                  {TOOLBAR_BUTTONS.map((btn, i) =>
                    "divider" in btn ? (
                      <span
                        key={`d-${i}`}
                        className="mx-1.5 h-5 w-px bg-gray-200 dark:bg-gray-700"
                      />
                    ) : (
                      <Button
                        key={btn.label}
                        title={btn.label}
                        type="button"
                        className="rounded p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                      >
                        <btn.icon size={20} />
                      </Button>
                    ),
                  )}
                </div>
              )}

              <textarea
                rows={textAreaRows || 5}
                placeholder={input.placeholder}
                className="w-full resize-none bg-transparent px-6 py-4 text-sm leading-relaxed text-gray-700 placeholder:text-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder:text-gray-500 "
                {...register(input.name)}
              />
            </div>
          ) : input.type === "file" ? (
            /* ───────── FILE ───────── */
            <label
              htmlFor={input.id}
              className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 py-12 transition hover:border-primary dark dark:hover/50"
            >
              <FiUploadCloud className="text-3xl text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Upload Image
              </span>
              <MyInput
                id={input.id}
                type="file"
                {...register(input.name)}
                className="hidden"
              />
            </label>
          ) : input.type === "select" ? (
            /* ───────── SELECT ───────── */
            <select
              id={input.id}
              {...register(input.name)}
              className="capitalize w-full border border-gray focus:outline-none focus:border-primary transition  px-3 py-2 dark:bg-transparent dark:text-white dark:border-gray-600"
            >
              <option value="" selected hidden>
                {input.placeholder}
              </option>

              {input.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.name}
                </option>
              ))}
            </select>
          ) : (
            /* ───────── DEFAULT INPUT ───────── */
            <MyInput
              id={input.id}
              type={input.type}
              {...register(input.name)}
              placeholder={input.placeholder}
              className="w-full rounded-md border p-3 text-sm"
            />
          )}

          {errors[input.name] && (
            <ErrorMessage msg={errors[input.name]?.message as string} />
          )}
        </div>
      ))}
    </>
  );
};

export default FormField;
