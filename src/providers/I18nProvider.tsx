"use client";

import i18n from "@/lib/i18n/i18n";
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
 */

import { I18nextProvider } from "react-i18next";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
