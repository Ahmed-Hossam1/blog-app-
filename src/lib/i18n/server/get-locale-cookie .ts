"use server";

import { cookies } from "next/headers";

/**
 * Retrieves the current locale from the cookie store.
 * Returns the locale as a string, or null if the cookie is not present.
 * @returns {Promise<string | null>} The current locale, or null.
 */
export async function getLocaleCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("lang")?.value ?? null;
}
