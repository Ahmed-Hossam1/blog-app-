export function getLocaleFromCookie(): "en" | "ar" {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)lang=([^;]*)/);
  const value = match?.[1];
  return value === "ar" || value === "en" ? value : "en";
}