"use client";

import FormField from "@/components/shared/FormField";
import Button from "@/components/ui/Button";
import { formConfig } from "@/constants/forms";
import { getSignUpSchema } from "@/schema/schema";
import { ISignUpForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Page = () => {
  /* ==== State ==== */
  const { t } = useTranslation("auth");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>({
    resolver: yupResolver(getSignUpSchema(t)),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  // ===== Config =====
  const signUpFormFields = (formConfig?.signUp ?? []).map((field) => ({
    ...field,
    placeholder: t(`signUp.fields.${field.id}`),
  }));

  // ===== Handlers =====
  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    if (!data) return;
    try {
      setIsLoading(true);
      // create user
      const req = await fetch(`/api/auth/sign-up`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (!req.ok) throw new Error(res.message);
      toast.success(t(res.message), {
        autoClose: false
      });
    } catch (error) {
      console.log(error);
      toast.error(t((error as Error).message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setAuthLoading(true);
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      setAuthLoading(false);
      toast.error(t((error as Error).message));
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setAuthLoading(true);
      await signIn("github", { callbackUrl: "/" });
    } catch (error) {
      setAuthLoading(false);
      toast.error(t((error as Error).message));
    }
  };

  /* ==== JSX ==== */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-secondary transition-colors duration-300">
      <div className="bg-white shadow-md rounded-xl py-12 px-16 w-full max-w-md text-center dark:bg-surface transition-colors duration-300">
        {theme === "light" ? (
          <Image
            src="/Light-Logo.png"
            alt="logo"
            width={150}
            height={40}
            className="mx-auto mb-10"
          />
        ) : (
          <Image
            src="/Dark-Logo.png"
            alt="logo"
            width={150}
            height={40}
            className="mx-auto mb-10 mix-blend-screen"
          />
        )}

        <div className="flex gap-4 mb-6">
          <Button
            onClick={handleGoogleSignIn}
            disabled={authLoading}
            className="flex-1 flex items-center justify-center gap-4 border border-gray p-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-white transition"
          >
            <span>{t("signUp.google")}</span>
            <FcGoogle className="text-2xl" />
          </Button>

          <Button
            onClick={handleGithubSignIn}
            disabled={authLoading}
            className="flex-1 flex items-center justify-center gap-4 border border-gray p-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-white transition"
          >
            <span>{t("signUp.github")}</span>
            <FaGithub className="text-2xl" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gray flex-1 h-px dark:bg-gray-700" />
          <p className="text-gray-400 text-sm uppercase">{t("signUp.or")}</p>
          <span className="bg-gray flex-1 h-px dark:bg-gray-700" />
        </div>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            Fields={signUpFormFields}
            register={register}
            errors={errors}
          />

          <Button
            disabled={isLoading || authLoading}
            isLoading={isLoading}
            loadingText={t("signUp.submitting")}
            className="w-full bg-baseInk hover:bg-black transition text-white py-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {t("signUp.submit")}
          </Button>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/sign-in" className="hover:underline">
              {t("signUp.alreadyMember")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Page;
