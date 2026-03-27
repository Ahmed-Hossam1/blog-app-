import SectionWrapper from "@/components/shared/SectionWrapper";

const PrivacyPage = () => {
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">2. How We Use Your Information</h2>
            <p>
              We use the collected information for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Providing and maintaining our services.</li>
              <li>Personalizing your experience on the blog.</li>
              <li>Communicating with you about updates and offers.</li>
              <li>Analyzing website traffic and usage patterns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">4. Third-Party Services</h2>
            <p>
              We may use third-party services, such as analytics or advertising partners, that collect information sent by your browser as part of a web page request, such as cookies or your IP address.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">5. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. You can manage your account settings directly or contact us for assistance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">6. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our blog and stored information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <strong>info@blogy.com</strong>.
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

export default PrivacyPage;
