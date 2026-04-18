"use client";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { useTranslation } from "react-i18next";

const PrivacyPage = () => {
  const { t } = useTranslation("privacy");
  const sections = t("sections", { returnObjects: true }) as { heading: string; body: string; list?: string[] } [];

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">
          {t("title")}
        </h1>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                {section.heading}
              </h2>
              <p>{section.body}</p>
              {section.list && (
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  {section.list.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
              {index === sections.length - 1 && (
                <p className="mt-4">
                  {t("sections.6.maintainer", { author: "" })}
                  <a
                    href="https://my-portfolio-mu-three-82.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Ahmed Hossam
                  </a>
                  .
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default PrivacyPage;
