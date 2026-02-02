"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Button from "@/components/ui/Button";
import MyInput from "@/components/ui/Input";
import { formConfig } from "@/constants/forms";
import { IErrors, ISignUpForm } from "@/types";
import { errorsHandler } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const signUpObj: ISignUpForm = {
  user_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const errorObj: IErrors = {
  user_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Page = () => {
  /*======= STATE ======*/
  const [signUp, setSignUp] = useState<ISignUpForm>(signUpObj);
  const [errors, setErrors] = useState<IErrors>(errorObj);

  /*======= CONSTANTS ======*/
  // inputs config used to render sign up form dynamically
  const signUpInputs = formConfig?.signUp ?? [];

  /*======= HANDLERS ======*/
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUp((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = errorsHandler(signUp);
    setErrors(validationErrors);

    const isFormValid = Object.values(validationErrors).every(
      (value) => value === "",
    );
    console.log(isFormValid);
    if (!isFormValid) return;

    console.log("FORM IS VALID");
  };

  /*======= RENDER ======*/

  const renderInputs = signUpInputs.map((input) => (
    <div key={input.id}>
      <MyInput
        {...input}
        id={input.name}
        name={input.name}
        value={signUp[input.name as keyof ISignUpForm]}
        onChange={handleInputChange}
        className="rounded-md"
      />
      <ErrorMessage msg={errors[input.name as keyof IErrors]} />
    </div>
  ));

  /*======= JSX ======*/

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
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {renderInputs}

          <Button
            bgColor="bg-baseInk"
            className="w-full hover:bg-black transition text-white py-2"
            type="submit"
          >
            Sign Up
          </Button>

          <div className="mt-4 text-sm text-gray-600">
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
