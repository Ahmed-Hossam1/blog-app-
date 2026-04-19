export function getBrowserLocale(): "en" | "ar" {
  const browserLang = navigator.language.split("-")[0];
  return browserLang === "ar" ? "ar" : "en";
}