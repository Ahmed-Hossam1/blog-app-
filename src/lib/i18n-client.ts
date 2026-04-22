import i18n from "./i18n/i18n";
import { setLocaleCookie } from "./i18n/server/set-locale-cookie";

export const LanguageSwitcher = async (locale: "en" | "ar"): Promise<void> => {
  i18n.changeLanguage(locale);
  await setLocaleCookie(locale);
};
