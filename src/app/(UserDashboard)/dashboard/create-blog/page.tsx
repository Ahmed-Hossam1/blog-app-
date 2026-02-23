import SectionWrapper from "@/components/SectionWrapper";
import Button from "@/components/ui/Button";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import MyInput from "@/components/ui/Input";
import { newBlogForm } from "@/constants/forms";
import {
  FiBold,
  FiCode,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
  FiUploadCloud,
} from "react-icons/fi";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuListOrdered,
  LuQuote,
} from "react-icons/lu";

/* ───────── constants ───────── */
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

/* ═══════════════════════════════════════════ */
export default function CreateBlog() {
  const selectCls =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-surfaceDark dark:text-gray-200";
  const inputCls =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-surfaceDark dark:text-gray-200";
  const content = newBlogForm?.content;
  const settings = newBlogForm?.settings;

  const renderContentInputs = content.map(
    ({ id, name, type, placeholder, label }) => (
      <div
        key={id}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surfaceDark"
      >
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
        >
          {label}
        </label>

        {/* ── Content editor ── */}
        {type === "textarea" ? (
          <div className="rounded-xl border border-gray-200  bg-white shadow-sm dark:border-gray-800 dark:bg-surfaceDark ">
            <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 px-4 py-2 dark:border-gray-700">
              {/* Toolbar */}
              {TOOLBAR_BUTTONS.map((btn, i) =>
                "divider" in btn ? (
                  <span
                    key={`d-${i}`}
                    className="mx-1.5 h-5 w-px bg-gray-200 dark:bg-gray-700"
                  />
                ) : (
                  <button
                    key={btn.label}
                    title={btn.label}
                    type="button"
                    className="rounded p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  >
                    <btn.icon size={20} />
                  </button>
                ),
              )}
            </div>

            <textarea
              id={id}
              rows={14}
              placeholder="# Write your article here..."
              className="w-full resize-none bg-transparent px-6 py-4 text-sm leading-relaxed text-gray-700 placeholder:text-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder:text-gray-500 "
            />

            <div className="border-t border-gray-200 px-6 py-3 dark:border-gray-700">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                <span className="italic">*italic*</span>,{" "}
                <span className="font-bold">**bold**</span>,{" "}
                <code className="rounded bg-gray-100 px-1 text-primary dark:bg-gray-800">
                  {"`code`"}
                </code>
                , <span className="text-primary">[links](#)</span>, and much
                more.
              </p>
            </div>
          </div>
        ) : type === "file" ? (
          /* ── Cover Image upload ── */
          <label
            htmlFor={id}
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 py-12 transition hover:border-primary dark dark:hover/50"
          >
            <FiUploadCloud className="text-3xl text-gray-400 dark:text-gray-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Upload Image
            </span>

            <MyInput
              id={id}
              type={type}
              placeholder={placeholder}
              name={name}
              className="hidden"
            />
          </label>
        ) : (
          <MyInput
            id={id}
            type={type}
            placeholder={placeholder}
            name={name}
            className={inputCls}
          />
        )}
      </div>
    ),
  );

  const renderSettingsInputs = settings.map(
    ({ id, label, placeholder, options }) => (
      <div key={id}>
        <label className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </label>
        <select id={id} className={selectCls}>
          <option disabled>choose {placeholder}</option>
          {options?.map((option, i) => (
            <option key={i} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    ),
  );

  return (
    <SectionWrapper>
      {/* Header */}
      <DashboardHeadingTitle
        title="Create New Post"
        description="Write and publish a new article."
      />

      {/* Two-column grid */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_280px]">
        {/* ══════ LEFT COLUMN ══════ */}
        <div className="space-y-6">
          {/* ══════ CONTENT ══════ */}
          {renderContentInputs}
        </div>

        {/* ══════ RIGHT COLUMN — Publish Settings ══════ */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-surfaceDark">
            <h2 className="mb-5 text-lg font-bold text-gray-800 dark:text-gray-100">
              Publish Settings
            </h2>
            <div className="space-y-5">
              {/* ══════ SETTINGS ══════ */}
              {renderSettingsInputs}
            </div>
          </div>
        </div>
      </div>

      {/* ══════ Bottom Action Bar ══════ */}
      <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
        <Button className="border border-gray-300 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
          Cancel
        </Button>
        <Button className="border border-gray-300 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800">
          Save Draft
        </Button>
        <Button
          bgColor="bg-primary hover:bg-primary/90"
          className="px-5 py-2.5 text-sm text-white"
        >
          Preview
        </Button>
        <Button
          bgColor="bg-primary hover:bg-primary/90"
          className="px-5 py-2.5 text-sm text-white"
        >
          Publish
        </Button>
      </div>
    </SectionWrapper>
  );
}
