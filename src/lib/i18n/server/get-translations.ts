import { getLocale } from "./get-locale";

/**
 * Get translations for a given namespace.
 *
 * This function returns a promise that resolves to a
 * Record<string, any> containing the translations for the
 * given namespace in the current locale. If the translations
 * for the current locale are not available, it falls back to
 * the English translations.
 *
 * @param {string} namespace - the namespace to get translations for
 * you can see it in locales
 *
 * @returns {Promise<Record<string, any>>} - a promise that
 * resolves to a Record<string, any> containing the
 * translations for the given namespace in the current
 * locale, or the English translations if the current
 * locale is not available.
 */
export async function getTranslations(
  namespace: string,
): Promise<Record<string, any>> {
  try {
    const locale = await getLocale();

    const { default: translations } = await import(
      `@/locales/${locale}/${namespace}.json`
    );

    return translations;
  } catch (error) {
    console.error("Translation error:", error);

    const { default: fallback } = await import(
      `@/locales/en/${namespace}.json`
    );
    return fallback;
  }
}
