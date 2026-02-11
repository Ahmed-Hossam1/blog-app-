import SectionWrapper from "@/components/SectionWrapper";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

const page = () => {
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-center text-4xl font-bold dark:text-white">
          Contact Us
        </h1>
        <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-300">
          We d love to hear from you. Please fill out the form below or reach out
          to us directly.
        </p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
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

          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-surfaceDark">
            <h2 className="mb-6 text-2xl font-semibold dark:text-white">
              Send Message
            </h2>
            <form className="space-y-6" >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  className="w-full rounded-lg"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full rounded-lg border border-gray px-3 py-2 capitalize transition focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-transparent dark:text-white"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <Button
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

export default page;
