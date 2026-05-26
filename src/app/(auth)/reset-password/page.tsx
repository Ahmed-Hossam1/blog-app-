"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getResetPasswordSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiLayers, FiLock, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

type ResetPasswordForm = yup.InferType<ReturnType<typeof getResetPasswordSchema>>;

const ResetPasswordPage = () => {
  const { t } = useTranslation("auth");
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(getResetPasswordSchema(t)),
  });

  const handleResetPassword: SubmitHandler<ResetPasswordForm> = async (data) => {
    try {
      setIsLoading(true);
      const req = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ 
          token,
          password: data.password
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-surface-secondary px-4 transition-colors duration-300">
      <div className="bg-surface shadow-xl border border-border rounded-2xl py-10 px-8 sm:px-12 w-full max-w-md text-start transition-colors duration-300">
        
        {/* Layer Stack Icon Box */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-primary mx-auto mb-4 ring-8 ring-blue-50/50 dark:ring-blue-950/20 transition-all duration-300">
          <FiLayers size={22} />
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-text mb-2">
            {t("resetPassword.title")}
          </h1>
          <p className="text-xs text-text-secondary font-medium max-w-sm mx-auto">
            {t("resetPassword.description")}
          </p>
        </div>

        <form
          className="flex flex-col space-y-4 text-left"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Input
            id="password"
            type="password"
            label={t("resetPassword.newPasswordLabel")}
            leftIcon={<FiLock size={16} className="text-text-secondary" />}
            placeholder={t("resetPassword.newPasswordPlaceholder")}
            variant="filled"
            errorText={errors.password?.message}
            {...register("password")}
          />

          <Input
            id="confirmPassword"
            type="password"
            label={t("resetPassword.confirmPasswordLabel")}
            leftIcon={<FiLock size={16} className="text-text-secondary" />}
            placeholder={t("resetPassword.confirmPasswordPlaceholder")}
            variant="filled"
            errorText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
            size="lg"
            fullWidth
            className="mt-2"
          >
            {t("resetPassword.submit")}
          </Button>

          <div className="mt-8 text-center">
            <Link
              href="/sign-in"
              className="hover:underline flex items-center justify-center gap-2 group text-xs font-semibold text-text-secondary hover:text-text transition-colors duration-200"
            >
              <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t("resetPassword.backToSignIn")}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
