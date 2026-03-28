"use client";

import FormField from "@/components/shared/FormField";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/ui/Button";
import { formConfig } from "@/constants/forms";
import { contactSchema } from "@/schema/schema";
import { IContactForm } from "@/types";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseSyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

/* ==== Config ==== */
const contactForm = formConfig.contactForm;

const Page = () => {
  /* ==== State ==== */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IContactForm>({
    resolver: yupResolver(contactSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*===== FUNCTIONS ===== */

  const onSubmit = async (data: IContactForm) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to send message");
      }
      
      toast.success(result.message || "Message sent successfully");
      reset();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ==== JSX ==== */
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-center text-4xl font-bold dark:text-white">
          Contact Us
        </h1>
        <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-300">
          We d love to hear from you. Please fill out the form below or reach
          out to us directly.
        </p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-6 text-2xl font-semibold dark:text-white">
                Get in Touch
              </h2>
              <p className="mb-8 text-gray-600 dark:text-gray-300">
                Have a question, suggestion, or just want to say hello? We are
                always here to help you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaLocationDot className="text-xl" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium dark:text-white">
                    Our Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Blog Street, Content City,
                    <br />
                    Web State, 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium dark:text-white">
                    Email Address
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    info@firstnextapp.com
                    <br />
                    support@firstnextapp.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium dark:text-white">
                    Phone Number
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    +1 (555) 123-4567
                    <br />
                    +1 (555) 987-6543
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-surfaceDark">
            <h2 className="mb-6 text-2xl font-semibold dark:text-white">
              Send Message
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                Fields={contactForm}
                register={register}
                errors={errors}
              />
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                loadingText="Sending..."
                bgColor="bg-primary hover:bg-blue-800 text-white"
                className="w-full py-3 font-semibold"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Page;
