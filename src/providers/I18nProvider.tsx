"use client";

import i18n from "@/lib/i18n/i18n";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { setLocaleCookie } from "@/lib/i18n/server/set-locale-cookie";

/**
 * I18nProvider
 *
 * A simple wrapper that makes i18n available to all components.
 *
 * Why we need it:
 * - `useTranslation()` needs i18n from React context.
 * - Next.js layout is a Server Component, so it doesn't provide this context.
 *
 * Solution:
 * - Wrap the app with this Client Component so all children can use translations.
 * - All document / cookie side-effects are inside useEffect so they only run
 *   after the component has mounted 
 */
export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Apply initial locale to <html> element
    const lng = i18n.language;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;

    // Keep <html> and cookie in sync whenever the language changes
    const handleLanguageChanged = async (newLng: string) => {
      await setLocaleCookie(newLng as "en" | "ar");
      document.documentElement.dir = newLng === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLng;
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
