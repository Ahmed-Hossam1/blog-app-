"use client";

import ErrorMessage from "@/components/shared/ErrorMessage";
import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/Input";
import { resetPasswordSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type ResetPasswordForm = yup.InferType<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const { theme } = useTheme();
  // We keep isLoading state just for UI demonstration, but won't do API calls
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const handleResetPassword: SubmitHandler<ResetPasswordForm> = async (data) => {
    setIsLoading(true);
    // Simulate API call for UI demonstration
    setTimeout(() => {
      console.log("Validated Data:", data);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="bg-white shadow-md rounded-xl py-12 px-10 sm:px-16 w-full max-w-md text-center dark:bg-surfaceDark transition-colors duration-300">
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
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please enter your new password below.
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
              New Password
            </label>
            <div className="relative">
              <MyInput
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter new password"
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
              Confirm New Password
            </label>
            <div className="relative">
              <MyInput
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm new password"
                className="w-full pl-3 rounded-md border p-3 text-sm"
              />
            </div>
            {errors?.confirmPassword && <ErrorMessage msg={errors.confirmPassword.message} />}
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            loadingText="Resetting"
            className="w-full bg-baseInk hover:bg-black transition text-white py-2.5 mt-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Reset Password
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
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;