"use server";

import { cookies } from "next/headers";

/**
 * Sets a cookie with the current locale.
 * The cookie is named "lang" and its value is either "en" or "ar".
 * This function is used to store the user's preferred language in a cookie.
 * @param {string} locale - The locale to set, either "en" or "ar".
 * @returns {Promise<void>} - A promise that resolves when the cookie has been set.
 */
export async function setLocaleCookie(locale: "en" | "ar"): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("lang", locale);
}
