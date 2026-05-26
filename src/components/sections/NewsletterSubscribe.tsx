"use client";
import { useTranslation } from "react-i18next";
import SectionWrapper from "../shared/SectionWrapper";
import Input from "../ui/Input";
import Button from "../ui/Button";

const NewsletterSubscribe = () => {
  const { t } = useTranslation("home");

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-md bg-white px-8 py-12 shadow-sm dark:bg-surfaceDark">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Text */}
            <div className="max-w-xl">
              <h3 className="text-2xl font-semibold dark:text-white">
                {t("newsletter.title")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {t("newsletter.description")}
              </p>
            </div>

            {/* Input + Button */}
            <div className="flex h-12 w-full max-w-md items-center overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder={t("newsletter.placeholder")}
                variant="ghost"
                rounded="none"
                className="h-full flex-1 border-0 ring-0 focus-within:ring-0"
              />
              <Button
                variant="primary"
                className="h-full rounded-l-none whitespace-nowrap shadow-none border-0 px-9 active:scale-100"
              >
                {t("newsletter.subscribe")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default NewsletterSubscribe;
