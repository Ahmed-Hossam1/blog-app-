"use client";
import { IField } from "@/types";
import Image from "next/image";
import {
  FieldErrors,
  FieldValues,
  SetFieldValue,
  UseFormRegister,
  UseFormWatch
} from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import Button from "../ui/Button";
import MyInput from "../ui/Input";
import ErrorMessage from "./ErrorMessage";

import { TOOLBAR_BUTTONS } from "@/constants";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FormFieldProps<T extends FieldValues> {
  Fields: IField<T>[];
  register: UseFormRegister<T>;
  setValue?: SetFieldValue<T>;
  watch?: UseFormWatch<T>;
  errors: FieldErrors;
  ToolBar?: boolean;
  textAreaRows?: number;
  previewImage?: string | null;
  previewContent?: boolean;
  setPreviewImage?: (image: string | null) => void;
}

const FormField = <T extends FieldValues>({
  Fields,
  register,
  errors,
  setValue,
  watch,
  ToolBar,
  textAreaRows,
  previewImage,
  previewContent,
  setPreviewImage,
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
              {ToolBar && previewContent === false && (
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
                        onClick={() => {
                          const currentValue = watch?.(input.name) || "";
                          if ("markdownSyntax" in btn) {
                            setValue?.(
                              input.name,
                              currentValue + btn.markdownSyntax,
                            );
                          }
                        }}
                        className="rounded p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                      >
                        <btn.icon size={20} />
                      </Button>
                    ),
                  )}
                </div>
              )}

              {previewContent === true ? (
                // preview content in markdown format
                <div className="prose prose-sm dark:prose-invert max-w-none px-6 py-4">
                  {watch?.(input.name) ? (
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {watch(input.name) as string}
                    </Markdown>
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500 italic">
                      Nothing to preview yet…
                    </p>
                  )}
                </div>
              ) : (
                <textarea
                  id={input.id}
                  rows={textAreaRows || 5}
                  placeholder={input.placeholder}
                  className="w-full resize-none bg-transparent px-6 py-4 text-sm leading-relaxed text-gray-700 placeholder:text-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder:text-gray-500"
                  {...register(input.name)}
                />
              )}
            </div>
          ) : input.type === "file" ? (
            /* ───────── FILE ───────── */
            <label
              htmlFor={input.id}
              className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 py-12 transition hover:border-primary dark dark:hover/50"
            >
              {previewImage && (
                <div className="relative w-48 h-48">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <FiUploadCloud className="text-3xl text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Upload Image
              </span>
              <MyInput
                id={input.id}
                type="file"
                className="hidden"
                accept="image/*"
                {...register(input.name)}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  //  preview image
                  const imageUrl = URL.createObjectURL(file); // create preview link for image ** blob:http://localhost:3000/abc-123-xyz** instead of File
                  setPreviewImage?.(imageUrl);
                  // trigger onChange event when file is changed
                  register(input.name).onChange(e);
                }}
              />
            </label>
          ) : input.type === "select" ? (
            /* ───────── SELECT ───────── */
            <select
              id={input.id}
              {...register(input.name)}
              className="capitalize w-full border border-gray focus:outline-none focus:border-primary transition  px-3 py-2 dark:bg-transparent dark:text-white dark:border-gray-600"
              defaultValue=""
            >
              <option value="" disabled>
                -- Please choose an option --
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
