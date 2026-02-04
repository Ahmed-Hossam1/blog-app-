"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/Input";
import { formConfig } from "@/constants/forms";
import { ISignInErrors, ISignInForm } from "@/types";
import { signInErrors } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const signInObj: ISignInForm = {
  email: "",
  password: "",
};

const errorObj: ISignInErrors = {
  email: "",
  password: "",
};

const Page = () => {
  /*===== STATES ===== */
  const [sign_In, setSignIn] = useState<ISignInForm>(signInObj);
  const [errors, setErrors] = useState<ISignInErrors>(errorObj);

  /*===== CONSTANTS ===== */
  const signInInputs = formConfig?.signIn ?? [];
  /*===== HANDLERS ===== */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignIn((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = signInErrors(sign_In);
    setErrors(validationErrors);
    const isFormValid = Object.values(validationErrors).every(
      (value) => value === "",
    );
    if (!isFormValid) return;
    console.log("Form Is Valid ");
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
      <ErrorMessage msg={errors[input.name as keyof ISignInErrors]} />
    </div>
  ));

  /*===== JSX ===== */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-xl py-12 px-16 w-full max-w-md text-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={150}
          height={40}
          className="mx-auto mb-10"
        />

        {/* OAuth buttons */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex-1 flex items-center justify-center gap-4 border border-gray p-3 hover:bg-gray-100"
          >
            <span>Sign In </span>
            <FcGoogle className="text-2xl" />
          </Button>
          <Button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="flex-1 flex items-center justify-center  gap-4 border border-gray p-3 hover:bg-gray-100"
          >
            <span>Sign In</span>
            <FaGithub className="text-2xl" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gray flex-1 h-px " />
          <p className="text-gray-400 text-sm uppercase">or</p>
          <span className="bg-gray flex-1 h-px " />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {renderInputs}

          <Button
            bgColor="bg-baseInk"
            className="w-full hover:bg-black transition  text-white py-2"
          >
            Sign In
          </Button>

          <div className="mt-4 text-sm text-gray-600">
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
