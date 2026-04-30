"use client";

import ErrorMessage from "@/components/shared/ErrorMessage";
import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/Input";
import { getForgotPasswordSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface resetForm {
  email: string;
}
const ForgotPasswordPage = () => {
  const { t } = useTranslation("auth");
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetForm>({
    resolver: yupResolver(getForgotPasswordSchema(t)),
  });
  const handleForgotPassword: SubmitHandler<resetForm> = async (data) => {
    setIsLoading(true);
    try {
      const req = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (!req.ok) throw new Error(res.message);
      toast.success(t(res.message));
    } catch (error) {
      console.log(error);
      toast.error(t((error as Error).message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-secondary transition-colors duration-300">
      <div className="bg-white shadow-md rounded-xl py-12 px-10 sm:px-16 w-full max-w-md text-center dark:bg-surface transition-colors duration-300">
        {theme === "light" ? (
          <Image
            src="/Light-Logo.png"
            alt="logo"
            width={150}
            height={40}
            className="mx-auto mb-8"
          />
        ) : (
          <Image
            src="/Dark-Logo.png"
            alt="logo"
            width={150}
            height={40}
            className="mx-auto mb-8 mix-blend-screen"
          />
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("forgotPassword.title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("forgotPassword.description")}
          </p>
        </div>

        <form
          className="flex flex-col space-y-4 text-left"
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("forgotPassword.emailLabel")}
            </label>
            <div className="relative">
              <MyInput
                id="email"
                type="email"
                {...register("email")}
                placeholder={t("forgotPassword.emailPlaceholder")}
                className="w-full pl-10  rounded-md border p-3 text-sm"
              />
            </div>
          </div>
          {errors?.email && <ErrorMessage msg={errors.email?.message} />}

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            loadingText={t("forgotPassword.submitting")}
            className="w-full bg-baseInk hover:bg-black transition text-white py-2.5 mt-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {t("forgotPassword.submit")}
          </Button>
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/sign-in"
              className="hover:underline flex items-center justify-center gap-2 group"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>{t("forgotPassword.backToSignIn")}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ForgotPasswordPage;
