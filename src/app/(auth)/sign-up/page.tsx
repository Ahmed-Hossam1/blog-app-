"use client";

import FormField from "@/components/FormField";
import Button from "@/components/ui/Button";
import { formConfig } from "@/constants/forms";
import { generateToken } from "@/lib/token";
import { signUpSchema } from "@/schema/schema";
import { ISignUpForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Page = () => {
  /* ==== State ==== */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>({
    resolver: yupResolver(signUpSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  /* ==== Config ==== */
  const singUpForm = formConfig?.signUp ?? [];

  /* ==== Handlers ==== */
  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    if (!data) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/auth/sign-up`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      // call signIn function to make JWT
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) throw new Error("failed to create user");
      toast.success("user created successfully");

      // Generate token
      const tokenRes = await fetch(`/api/auth/token`, {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
      });
      const token = await tokenRes.json();
      if (!tokenRes.ok) throw new Error(token.message);
      console.log(token);

      const verifyRes = await fetch(`/api/email/verify-email`, {
        method: "POST",
        body: JSON.stringify({ name : data.name, email: data.email, verificationLink: `http://localhost:3000/verify-token?token=${token.token}` }),
      });
      const verify = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verify.message);
      console.log(verify);




      // setTimeout(() => {
      //   redirect("/");
      // }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error((error as Error).message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setAuthLoading(true);
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      setAuthLoading(false);
      toast.error((error as Error).message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setAuthLoading(true);
      await signIn("github", { callbackUrl: "/" });
    } catch (error) {
      setAuthLoading(false);
      toast.error((error as Error).message);
    }
  };

  /* ==== JSX ==== */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="bg-white shadow-md rounded-xl py-12 px-16 w-full max-w-md text-center dark:bg-surfaceDark transition-colors duration-300">
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
            <span>Sign Up</span>
            <FcGoogle className="text-2xl" />
          </Button>

          <Button
            onClick={handleGithubSignIn}
            disabled={authLoading}
            className="flex-1 flex items-center justify-center gap-4 border border-gray p-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-white transition"
          >
            <span>Sign Up</span>
            <FaGithub className="text-2xl" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gray flex-1 h-px dark:bg-gray-700" />
          <p className="text-gray-400 text-sm uppercase">or</p>
          <span className="bg-gray flex-1 h-px dark:bg-gray-700" />
        </div>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField Fields={singUpForm} register={register} errors={errors} />

          <Button
            disabled={isLoading || authLoading}
            isLoading={isLoading}
            loadingText="Creating Account..."
            className="w-full bg-baseInk hover:bg-black transition text-white py-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Sign Up
          </Button>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/sign-in" className="hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
