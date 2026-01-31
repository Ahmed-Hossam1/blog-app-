"use client";

import Button from "@/components/Ui/Button";
import MyInput from "@/components/Ui/Input";
import { formConfig } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const page = () => {
  /*===== CONSTANTS ===== */
  const signUpInputs = formConfig?.signUp ?? [];

  /*===== RENDER ===== */
  const renderInputs = signUpInputs.map((input) => (
    <MyInput
      key={input.id}
      name={input.name}
      id={input.name}
      type={input.type}
      placeholder={input.placeholder}
      className="rounded-md mb-4 "
    />
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
          <Button className="flex-1 flex items-center justify-center gap-4 border border-gray p-3 hover:bg-gray-100">
            <span>Sign Up</span>
            <FcGoogle className="text-2xl" />
          </Button>

          <Button className="flex-1 flex items-center justify-center gap-4 border border-gray p-3 hover:bg-gray-100">
            <span>Sign Up</span>
            <FaGithub className="text-2xl" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gray flex-1 h-px" />
          <p className="text-gray-400 text-sm uppercase">or</p>
          <span className="bg-gray flex-1 h-px" />
        </div>

        {/* Form */}
        <form method="post" className="flex flex-col space-y-4">
          <div>{renderInputs}</div>

          <Button
            bgColor="bg-baseInk"
            className="w-full hover:bg-black transition text-white py-2"
          >
            Sign Up
          </Button>

          <div className="mt-4 text-sm text-gray-600">
            <Link href="/signIn" className="hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
