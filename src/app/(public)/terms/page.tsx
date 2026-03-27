import SectionWrapper from "@/components/shared/SectionWrapper";

const TermsPage = () => {
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">Terms & Conditions</h1>
        
        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">1. Introduction</h2>
            <p>
              Welcome to <strong>Blogy</strong>. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">2. User Accounts</h2>
            <p>
              To access certain features of the blog, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">3. Content Ownership</h2>
            <p>
              All content published on this blog, including text, images, and brand logos, is the property of <strong>Blogy</strong> or its content creators. You may not reproduce, distribute, or modify any content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">4. User Conduct</h2>
            <p>
              Users are prohibited from:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Posting any unlawful, offensive, or harmful content.</li>
              <li>Engaging in any form of harassment or spamming.</li>
              <li>Attempting to compromise the security of the website.</li>
              <li>Using automated systems to scrape data from the site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">5. Limitation of Liability</h2>
            <p>
              <strong>Blogy</strong> shall not be held liable for any direct, indirect, or incidental damages resulting from the use or inability to use our services. We do not guarantee that the website will always be error-free or uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the site signifies your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">7. Contact Us</h2>
            <p>
              If you have any questions regarding these Terms & Conditions, please contact us at <strong>info@blogy.com</strong>.
            </p>
            <p className="mt-4">
              This blog is developed and maintained by{" "}
              <a
                href="https://my-portfolio-mu-three-82.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Ahmed Hossam
              </a>.
            </p>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TermsPage;
