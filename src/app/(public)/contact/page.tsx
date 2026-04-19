"use client";

import FormField from "@/components/shared/FormField";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/ui/Button";
import { formConfig } from "@/constants/forms";
import { getContactSchema } from "@/schema/schema";
import { IContactForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLocationDot, FaPhone, FaShareNodes } from "react-icons/fa6";
import { SOCIAL_LINKS } from "@/constants";
import Link from "next/link";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

/* ==== Config ==== */
const baseContactForm = formConfig.contactForm;

const Page = () => {
  const { t } = useTranslation("contact");
  
  /* ==== Translated Form Config ==== */
  const contactForm = baseContactForm.map(field => ({
    ...field,
    label: t(`form.${field.id}Label`),
    placeholder: t(`form.${field.id}Placeholder`)
  }));

  /* ==== State ==== */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IContactForm>({
    resolver: yupResolver(getContactSchema(t)),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*===== FUNCTIONS ===== */

  const onSubmit = async (data: IContactForm) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || t("error"));
      }
      
      toast.success(result.message || t("success"));
      reset();
    } catch (error) {
      toast.error(t("somethingWentWrong"));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ==== JSX ==== */
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-center text-4xl font-bold dark:text-white">
          {t("title")}
        </h1>
        <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-300">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-6 text-2xl font-semibold dark:text-white">
                {t("getInTouch")}
              </h2>
              <p className="mb-8 text-gray-600 dark:text-gray-300">
                {t("description")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaLocationDot className="text-xl" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium dark:text-white">
                    {t("location")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                    {t("locationText")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium dark:text-white">
                    {t("email")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    info@blogy.com
                    <br />
                    support@blogy.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium dark:text-white">
                    {t("support")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                    +1 (555) BLOG-HELP
                    <br />
                    {t("supportText")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mt-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaShareNodes className="text-xl" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium dark:text-white">
                    {t("followUs")}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    {SOCIAL_LINKS.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        title={link.name}
                        className={`text-gray-500 hover:text-primary transition duration-300 dark:text-gray-400 dark:hover:text-primary`}
                      >
                        <link.icon size={20} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-surfaceDark">
            <h2 className="mb-6 text-2xl font-semibold dark:text-white">
              {t("sendMessage")}
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                Fields={contactForm}
                register={register}
                errors={errors}
              />
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                loadingText={t("sending")}
                bgColor="bg-primary hover:bg-blue-800 text-white"
                className="w-full py-3 font-semibold"
              >
                {t("sendMessage")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Page;
