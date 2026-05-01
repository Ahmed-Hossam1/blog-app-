"use client";

import ErrorMessage from "@/components/shared/ErrorMessage";
import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/Input";
import { getResetPasswordSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

type ResetPasswordForm = yup.InferType<ReturnType<typeof getResetPasswordSchema>>;

const ResetPasswordPage = () => {
  const { t } = useTranslation("auth");
  const token  = useSearchParams().get("token");
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(getResetPasswordSchema(t)),
  });

  const handleResetPassword: SubmitHandler<ResetPasswordForm> = async (
    data,
  ) => {
    try {
      setIsLoading(true);
      const req = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ 
          token,
          password : data.password
        }),
      });
      const res = await req.json();
      if (!req.ok) throw new Error(res.message);
      toast.success(t(res.message));
      setTimeout(() => {
        router.push("/sign-in");
      }, 1200);
    } catch (error) {
      console.log(error);
      toast.error(t((error as Error).message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-secondary transition-colors duration-300">
      <div className="bg-white shadow-md rounded-xl py-12 px-6 sm:px-16 w-full max-w-md text-center dark:bg-surface transition-colors duration-300">
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
            {t("resetPassword.title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
             {t("resetPassword.description")}
          </p>
        </div>

        <form
          className="flex flex-col space-y-4 text-left"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("resetPassword.newPasswordLabel")}
            </label>
            <div className="relative">
              <MyInput
                id="password"
                type="password"
                {...register("password")}
                placeholder={t("resetPassword.newPasswordPlaceholder")}
                className="w-full pl-3 rounded-md border p-3 text-sm"
              />
            </div>
            {errors?.password && <ErrorMessage msg={errors.password.message} />}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("resetPassword.confirmPasswordLabel")}
            </label>
            <div className="relative">
              <MyInput
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder={t("resetPassword.confirmPasswordPlaceholder")}
                className="w-full pl-3 rounded-md border p-3 text-sm"
              />
            </div>
            {errors?.confirmPassword && (
              <ErrorMessage msg={errors.confirmPassword.message} />
            )}
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            loadingText={t("resetPassword.submitting")}
            className="w-full bg-baseInk hover:bg-black transition text-white py-2.5 mt-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {t("resetPassword.submit")}
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
              <span>{t("resetPassword.backToSignIn")}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ResetPasswordPage;
