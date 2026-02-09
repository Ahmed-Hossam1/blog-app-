"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/Input";
import { formConfig } from "@/constants/forms";
import { ISignInForm } from "@/types";
import { signInErrors } from "@/utils";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";


const Page = () => {
  /*===== STATES ===== */
  const [sign_In, setSignIn] = useState<ISignInForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ISignInForm>({
    email: "",
    password: "",
  });

  const { theme } = useTheme();


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  /*===== CONSTANTS ===== */
  const signInInputs = formConfig?.signIn ?? [];
  /*===== HANDLERS ===== */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignIn((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = signInErrors(sign_In);
    // set errors in state to render it in UI only but validate on the variable
    setErrors(validationErrors);

    const isFormValid = Object.values(validationErrors).every(
      (value) => value === "",
    );
    if (!isFormValid) return;
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: sign_In.email,
        password: sign_In.password,
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

  /*===== RENDER ===== */
  const renderInputs = signInInputs.map((input) => (
    <div key={input.id}>
      <MyInput
        name={input.name}
        id={input.name}
        type={input.type}
        placeholder={input.placeholder}
        className="rounded-md"
        value={sign_In[input.name as keyof ISignInForm]}
        onChange={handleInputChange}
      />
      <ErrorMessage msg={errors[input.name as keyof ISignInForm]} />
    </div>
  ));

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
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {renderInputs}

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
