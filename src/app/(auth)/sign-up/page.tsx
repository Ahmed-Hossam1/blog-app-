"use client";

import FormField from "@/components/FormField";
import Button from "@/components/ui/Button";
import { formConfig } from "@/constants/forms";
import { signUpSchema } from "@/schema/schema";
import { ISignUpForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Page = () => {
  /*======= STATE ======*/
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>({
    resolver: yupResolver(signUpSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  const router = useRouter();
  /*======= CONSTANTS ======*/
  // inputs config used to render sign up form dynamically
  const singUpForm = formConfig?.signUp ?? [];

  /*======= HANDLERS ======*/

  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    if (!data) return;
    try {
      setIsLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/api/auth/sign-up`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) throw new Error("failed to create user");
      toast.success("user created successfully");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error as Error}`);
    }
  };

  /*======= JSX ======*/

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
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex-1 flex items-center justify-center gap-4 border border-gray p-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-white transition"
          >
            <span>Sign Up</span>
            <FcGoogle className="text-2xl" />
          </Button>

          <Button
            onClick={() => signIn("github", { callbackUrl: "/" })}
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

        {/* Form */}
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField Fields={singUpForm} register={register} errors={errors} />

          <Button
            disabled={isLoading}
            isLoading={isLoading}
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
