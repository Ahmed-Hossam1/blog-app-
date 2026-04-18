"use client";

import SectionWrapper from "@/components/shared/SectionWrapper";
import { useTranslation } from "react-i18next";

const TermsPage = () => {
  const { t } = useTranslation("terms");

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">
          {t("pageTitle")}
        </h1>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {t("sections.introduction.heading")}
            </h2>
            <p>{t("sections.introduction.body")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {t("sections.userAccounts.heading")}
            </h2>
            <p>{t("sections.userAccounts.body")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {t("sections.contentOwnership.heading")}
            </h2>
            <p>{t("sections.contentOwnership.body")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {t("sections.userConduct.heading")}
            </h2>
            <p>{t("sections.userConduct.intro")}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {(t("sections.userConduct.rules", { returnObjects: true }) as string[]).map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {t("sections.liability.heading")}
            </h2>
            <p>{t("sections.liability.body")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {t("sections.changes.heading")}
            </h2>
            <p>{t("sections.changes.body")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {t("sections.contact.heading")}
            </h2>
            <p>
              {t("sections.contact.body")}{" "}
              <strong>{t("sections.contact.email")}</strong>.
            </p>
            <p className="mt-4">
              {t("sections.contact.maintainer")}{" "}
              <a
                href="https://my-portfolio-mu-three-82.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {t("sections.contact.authorName")}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TermsPage;
