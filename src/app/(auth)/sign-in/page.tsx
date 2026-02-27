"use client";

import FormField from "@/components/FormField";
import Button from "@/components/ui/Button";
import { formConfig } from "@/constants/forms";
import { loginSchema } from "@/schema/schema";
import { ISignInForm } from "@/types";
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

const Page = () => {
  /*===== STATES ===== */

  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>({
    resolver: yupResolver(loginSchema),
  });

  /*===== CONSTANTS ===== */
  const signInIForm = formConfig?.signIn ?? [];
  /*===== HANDLERS ===== */

  const onsubmit: SubmitHandler<ISignInForm> = async (data) => {
    if (!data) return;
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) throw new Error("invalid credentials");
      toast.success("logged in successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error as Error}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setAuthLoading(true);
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      setAuthLoading(false);
      toast.error(`${error as Error}`);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setAuthLoading(true);
      await signIn("github", { callbackUrl: "/" });
    } catch (error) {
      setAuthLoading(false);
      toast.error(`${error as Error}`);
    }
  };

  /*===== JSX ===== */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="bg-white shadow-md rounded-xl py-12 px-16 w-full max-w-md text-center dark:bg-surfaceDark transition-colors duration-300">
        {theme === "light" ? (
          <Image
            src="/logo-black.svg"
            alt="logo"
            width={150}
            height={40}
            className="mx-auto mb-10"
          />
        ) : (
          <Image
            src="/logo-white.svg"
            alt="logo"
            width={150}
            height={40}
            className="mx-auto mb-10"
          />
        )}

        {/* OAuth buttons */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={handleGoogleSignIn}
            disabled={authLoading}
            className="flex-1 flex items-center justify-center gap-4 border border-gray p-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-white transition"
          >
            <span>Sign In </span>
            <FcGoogle className="text-2xl" />
          </Button>
          <Button
            onClick={handleGithubSignIn}
            disabled={authLoading}
            className="flex-1 flex items-center justify-center  gap-4 border border-gray p-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-white transition"
          >
            <span>Sign In</span>
            <FaGithub className="text-2xl" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gray flex-1 h-px dark:bg-gray-700" />
          <p className="text-gray-400 text-sm uppercase">or</p>
          <span className="bg-gray flex-1 h-px dark:bg-gray-700" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField Fields={signInIForm} register={register} errors={errors} />

          <Button
            disabled={isLoading}
            isLoading={isLoading}
            className={`w-full bg-baseInk  hover:bg-black transition  text-white py-2 dark:bg-white dark:text-black dark:hover:bg-gray-200`}
          >
            Sign In
          </Button>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href={"/forget-password"}
              className="mb-2 block cursor-pointer hover:underline"
            >
              Forgot Password?
            </Link>

            <Link href="/sign-up" className="hover:underline ">
              Not a member yet? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
