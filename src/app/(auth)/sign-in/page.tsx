"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getLoginSchema } from "@/schema/schema";
import { ISignInForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FiLayers, FiLock, FiMail } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Page = () => {
  // ===== State =====
  const { t } = useTranslation("auth");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>({
    resolver: yupResolver(getLoginSchema(t)),
  });

  // ===== Handlers =====
  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    if (!data) return;
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) throw new Error("messages.invalid_credentials");

      toast.success(t("messages.signin_success"));
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error(t((error as Error).message));
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
          {t("signIn.title")}
        </h2>
        <p className="text-center text-xs text-text-secondary mt-1.5 font-medium">
          {t("signIn.description")}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col space-y-4"
        >
          <Input
            id="email"
            type="email"
            label={t("signIn.fields.email")}
            leftIcon={<FiMail size={16} className="text-text-secondary" />}
            placeholder={t("signIn.fields.email")}
            variant="filled"
            errorText={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="password"
            type="password"
            label={t("signIn.fields.password")}
            leftIcon={<FiLock size={16} className="text-text-secondary" />}
            placeholder={t("signIn.fields.password")}
            variant="filled"
            errorText={errors.password?.message}
            {...register("password")}
          />

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between pt-1 select-none">
            <label className="flex items-center gap-2 text-xs font-semibold text-text-secondary cursor-pointer hover:text-text">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-primary hover:underline hover:text-primary-hover"
            >
              {t("signIn.forgotPassword")}
            </Link>
          </div>

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
            {t("signIn.submit")}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-border" />
          <span className="flex-shrink mx-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest bg-surface px-2">
            {t("signIn.or")}
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
            <span className="text-sm font-semibold">{t("signIn.submit")}</span>
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={handleGithubSignIn}
            disabled={authLoading || isLoading}
            className="flex items-center justify-center gap-2 hover:bg-surface-secondary py-2.5"
          >
            <FaGithub size={20} className="text-text" />
            <span className="text-sm font-semibold">{t("signIn.submit")}</span>
          </Button>
        </div>

        {/* Not Member */}
        <p className="mt-8 text-center text-xs font-semibold text-text-secondary">
          <Link
            href="/sign-up"
            className="font-bold text-primary hover:underline hover:text-primary-hover"
          >
            {t("signIn.notMember")}
          </Link>
        </p>

        {/* Footer legal text */}
        <p className="mt-6 text-[10px] text-center text-text-secondary/70 leading-relaxed max-w-xs mx-auto">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-text">Terms of Service</a> and{" "}
          <a href="#" className="underline hover:text-text">Privacy Policy</a>.
        </p>

      </div>
    </div>
  );
};

export default Page;
