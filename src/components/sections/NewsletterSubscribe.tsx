import SectionWrapper from "../SectionWrapper";
import MyInput from "../ui/Input";
import Button from "../ui/Button";

const NewsletterSubscribe = () => {
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-md bg-white px-8 py-12 shadow-sm dark:bg-surfaceDark">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

            {/* Text */}
            <div className="max-w-xl">
              <h3 className="text-2xl font-semibold dark:text-white">
                Subscribe to our newsletter
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Subscribe to our newsletter and be the first to know about new
                arrivals, exclusive offers, special promotions, and the latest
                news.
              </p>

            </div>

            {/* Input + Button */}
            <div className="flex h-12 w-full max-w-md items-center overflow-hidden rounded-sm bg-white shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">

              <MyInput
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="h-full flex-1 py-1.5"
              />
              <Button className="whitespace-nowrap bg-primary px-9 py-5 text-sm font-medium text-white transition hover:bg-blue-800">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default NewsletterSubscribe;
