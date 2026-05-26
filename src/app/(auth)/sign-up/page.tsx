"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getSignUpSchema } from "@/schema/schema";
import { ISignUpForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FiLayers, FiLock, FiMail, FiUser } from "react-icons/fi";
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-surface-secondary px-4 transition-colors duration-300">
      <div className="bg-surface shadow-xl border border-border rounded-2xl py-10 px-8 sm:px-12 w-full max-w-md text-start transition-colors duration-300">
        
        {/* Layer Stack Icon Box */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-primary mx-auto mb-4 ring-8 ring-blue-50/50 dark:ring-blue-950/20 transition-all duration-300">
          <FiLayers size={22} />
        </div>

        {/* Heading */}
        <h2 className="text-center font-extrabold text-2xl text-text leading-tight">
          {t("signUp.title")}
        </h2>
        <p className="text-center text-xs text-text-secondary mt-1.5 font-medium">
          {t("signUp.description")}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col space-y-4"
        >
          <Input
            id="name"
            type="text"
            label={t("signUp.fields.name")}
            leftIcon={<FiUser size={16} className="text-text-secondary" />}
            placeholder={t("signUp.fields.name")}
            variant="filled"
            errorText={errors.name?.message}
            {...register("name")}
          />

          <Input
            id="email"
            type="email"
            label={t("signUp.fields.email")}
            leftIcon={<FiMail size={16} className="text-text-secondary" />}
            placeholder={t("signUp.fields.email")}
            variant="filled"
            errorText={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="password"
            type="password"
            label={t("signUp.fields.password")}
            leftIcon={<FiLock size={16} className="text-text-secondary" />}
            placeholder={t("signUp.fields.password")}
            variant="filled"
            errorText={errors.password?.message}
            {...register("password")}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={isLoading}
            disabled={isLoading || authLoading}
            className="mt-6"
          >
            {t("signUp.submit")}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-border" />
          <span className="flex-shrink mx-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest bg-surface px-2">
            {t("signUp.or")}
          </span>
          <div className="flex-grow border-t border-border" />
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={handleGoogleSignIn}
            disabled={authLoading || isLoading}
            className="flex items-center justify-center gap-2 hover:bg-surface-secondary py-2.5"
          >
            <FcGoogle size={20} />
            <span className="text-sm font-semibold">{t("signUp.submit")}</span>
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={handleGithubSignIn}
            disabled={authLoading || isLoading}
            className="flex items-center justify-center gap-2 hover:bg-surface-secondary py-2.5"
          >
            <FaGithub size={20} className="text-text" />
            <span className="text-sm font-semibold">{t("signUp.submit")}</span>
          </Button>
        </div>

        {/* Already Member */}
        <p className="mt-8 text-center text-xs font-semibold text-text-secondary">
          <Link
            href="/sign-in"
            className="font-bold text-primary hover:underline hover:text-primary-hover"
          >
            {t("signUp.alreadyMember")}
          </Link>
        </p>

        {/* Footer legal text */}
        <p className="mt-6 text-[10px] text-center text-text-secondary/70 leading-relaxed max-w-xs mx-auto">
          By signing up, you agree to our{" "}
          <a href="#" className="underline hover:text-text">Terms of Service</a> and{" "}
          <a href="#" className="underline hover:text-text">Privacy Policy</a>.
        </p>

      </div>
    </div>
  );
};

export default Page;
