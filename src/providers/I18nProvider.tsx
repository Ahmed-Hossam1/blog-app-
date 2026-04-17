"use client";

/**
 * I18nProvider
 *
 * This client component initializes i18next and makes it available
 * to the entire React tree via the I18nextProvider context.
 *
 * WHY this file exists:
 * - `react-i18next`'s `useTranslation()` hook reads i18n from React context.
 * - Simply importing i18n.ts as a side effect in layout.tsx (a Server Component)
 *   does NOT inject it into the client-side React tree.
 * - This provider must wrap children in the client boundary so every
 *   component calling `useTranslation()` can access the initialized i18n instance.
 */

import i18n from "@/lib/i18n";
import { I18nextProvider } from "react-i18next";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
