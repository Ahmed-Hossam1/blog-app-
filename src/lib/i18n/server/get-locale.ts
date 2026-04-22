"use server";
import { getLocaleCookie } from "./get-locale-cookie";

/**
 * Retrieves the current locale from the cookie store.
 * If the locale cookie is not present or has an invalid value,
 * it returns the default locale ("en").
 * @returns {Promise<"en" | "ar">} The current locale, or the
 * default locale ("en") if the cookie is not present or has an invalid
 * value.
 */
export async function getLocale(): Promise<"en" | "ar"> {
  const savedLocale = await getLocaleCookie();

  if (savedLocale === "ar" || savedLocale === "en") {
    return savedLocale;
  }

  return "en";
}
