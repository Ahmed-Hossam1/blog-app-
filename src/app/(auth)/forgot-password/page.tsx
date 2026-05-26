"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getForgotPasswordSchema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiLayers, FiMail, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface resetForm {
  email: string;
}

const ForgotPasswordPage = () => {
  const { t } = useTranslation("auth");
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-surface-secondary px-4 transition-colors duration-300">
      <div className="bg-surface shadow-xl border border-border rounded-2xl py-10 px-8 sm:px-12 w-full max-w-md text-start transition-colors duration-300">
        
        {/* Layer Stack Icon Box */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-primary mx-auto mb-4 ring-8 ring-blue-50/50 dark:ring-blue-950/20 transition-all duration-300">
          <FiLayers size={22} />
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-text mb-2">
            {t("forgotPassword.title")}
          </h1>
          <p className="text-xs text-text-secondary font-medium max-w-sm mx-auto">
            {t("forgotPassword.description")}
          </p>
        </div>

        <form
          className="flex flex-col space-y-4 text-left"
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <Input
            id="email"
            type="email"
            label={t("forgotPassword.emailLabel")}
            leftIcon={<FiMail size={16} className="text-text-secondary" />}
            placeholder={t("forgotPassword.emailPlaceholder")}
            variant="filled"
            errorText={errors.email?.message}
            {...register("email")}
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            fullWidth
            size="lg"
            className="mt-2"
          >
            {t("forgotPassword.submit")}
          </Button>

          <div className="mt-8 text-center">
            <Link
              href="/sign-in"
              className="hover:underline flex items-center justify-center gap-2 group text-xs font-semibold text-text-secondary hover:text-text transition-colors duration-200"
            >
              <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t("forgotPassword.backToSignIn")}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
