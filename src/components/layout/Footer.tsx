"use client";

import Link from "next/link";
import { FOOTER_QUICK_LINKS, SOCIAL_LINKS } from "@/constants";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className="bg-white dark:bg-surfaceDark dark:border-t dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Top Row */}
        <div className="flex flex-col items-center justify-between gap-6 border-b py-6 text-sm text-gray-600 dark:text-gray-400 dark:border-gray-800 md:flex-row">
          <p className="text-center md:text-left">
            © Blog-App - {t("footer.rights")}
            <Link
              href={"https://my-portfolio-mu-three-82.vercel.app/"}
              className="font-medium mx-1 text-baseInk dark:text-white hover:text-blue-800 dark:hover:text-blue-400"
            >
              AhmedHossam
            </Link>
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                title={t(`navbar.${link.name.toLowerCase()}`)}
                className={`rounded-full bg-baseInk p-2 text-white transition duration-300 ${link.color} dark:bg-gray-700`}
              >
                <link.icon size={14} />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {FOOTER_QUICK_LINKS.map((link, i) => (
              <div key={link.name} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  {t(`footer.${link.name.split(" ")[0].toLowerCase()}`)}
                </Link>
                {i < FOOTER_QUICK_LINKS.length - 1 && (
                  <span className="text-gray-300">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
