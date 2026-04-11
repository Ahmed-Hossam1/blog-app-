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
  disabled?: boolean;
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
  setPreviewImage,
  disabled,
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
              {ToolBar === true && (
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
              <textarea
                id={input.id}
                rows={textAreaRows || 5}
                placeholder={input.placeholder}
                disabled={disabled}
                className="w-full resize-none bg-transparent px-6 py-4 text-sm leading-relaxed text-gray-700 placeholder:text-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                {...register(input.name)}
              />
            </div>
          ) : input.type === "file" ? (
            /* ───────── FILE ───────── */
            <label htmlFor={input.id} className="block cursor-pointer">
              {previewImage ? (
                /* ── Image preview: full-width cover with hover overlay ── */
                <div className="group relative w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={previewImage}
                    alt="Cover preview"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-xl">
                    <FiUploadCloud className="text-3xl text-white" />
                    <span className="text-sm font-medium text-white">Change Image</span>
                  </div>
                </div>
              ) : (
                /* ── Dropzone: shown when no image is selected ── */
                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 py-14 transition-colors hover:border-primary dark:border-gray-700 dark:hover:border-primary">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <FiUploadCloud className="text-2xl text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Click to upload cover image
                    </p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                </div>
              )}
              <MyInput
                id={input.id}
                type="file"
                className="hidden"
                accept="image/*"
                {...register(input.name)}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const imageUrl = URL.createObjectURL(file);
                  setPreviewImage?.(imageUrl);
                  register(input.name).onChange(e);
                }}
              />
            </label>
          ) : input.type === "select" ? (
            /* ───────── SELECT ───────── */
            <select
              id={input.id}
              disabled={disabled}
              {...register(input.name)}
              className="capitalize w-full border border-gray focus:outline-none focus:border-primary transition  px-3 py-2 dark:bg-transparent dark:text-white dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={disabled}
              {...register(input.name)}
              placeholder={input.placeholder}
              className="w-full rounded-md border p-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
