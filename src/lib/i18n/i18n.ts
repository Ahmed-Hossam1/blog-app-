import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English namespaces
import enAuth from "@/locales/en/auth.json";
import enAuthors from "@/locales/en/authors.json";
import enBlog from "@/locales/en/blog.json";
import enCommon from "@/locales/en/common.json";
import enContact from "@/locales/en/contact.json";
import enEditor from "@/locales/en/editor.json";
import enHome from "@/locales/en/home.json";
import enPrivacy from "@/locales/en/privacy.json";
import enSearch from "@/locales/en/search.json";
import enSettings from "@/locales/en/settings.json";
import enTerms from "@/locales/en/terms.json";
import enVerification from "@/locales/en/verification.json";
import enDashboard from "@/locales/en/dashboard.json";
import enBookmarks from "@/locales/en/bookmarks.json";
import enDrafts from "@/locales/en/drafts.json";

// Arabic namespaces
import arAuth from "@/locales/ar/auth.json";
import arAuthors from "@/locales/ar/authors.json";
import arBlog from "@/locales/ar/blog.json";
import arCommon from "@/locales/ar/common.json";
import arContact from "@/locales/ar/contact.json";
import arEditor from "@/locales/ar/editor.json";
import arHome from "@/locales/ar/home.json";
import arPrivacy from "@/locales/ar/privacy.json";
import arSearch from "@/locales/ar/search.json";
import arSettings from "@/locales/ar/settings.json";
import arTerms from "@/locales/ar/terms.json";
import arVerification from "@/locales/ar/verification.json";
import arDashboard from "@/locales/ar/dashboard.json";
import arBookmarks from "@/locales/ar/bookmarks.json";
import arDrafts from "@/locales/ar/drafts.json";
import { getLocale } from "./server/get-locale";
import { setLocaleCookie } from "./server/set-locale-cookie";

// translations
const resources = {
  en: {
    home: enHome,
    terms: enTerms,
    common: enCommon,
    blog: enBlog,
    authors: enAuthors,
    contact: enContact,
    search: enSearch,
    privacy: enPrivacy,
    auth: enAuth,
    verification: enVerification,
    editor: enEditor,
    settings: enSettings,
    dashboard: enDashboard,
    bookmarks: enBookmarks,
    drafts: enDrafts,
  },
  ar: {
    home: arHome,
    terms: arTerms,
    common: arCommon,
    blog: arBlog,
    authors: arAuthors,
    contact: arContact,
    search: arSearch,
    privacy: arPrivacy,
    auth: arAuth,
    verification: arVerification,
    editor: arEditor,
    settings: arSettings,
    dashboard: arDashboard,
    bookmarks: arBookmarks,
    drafts: arDrafts,
  },
};

const initialLang = await getLocale();

document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";
document.documentElement.lang = initialLang;

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "en",
  ns: [
    "home",
    "terms",
    "common",
    "blog",
    "authors",
    "contact",
    "search",
    "privacy",
    "auth",
    "verification",
    "editor",
    "settings",
    "dashboard",
    "bookmarks",
    "drafts",
  ],
  defaultNS: "home",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", async (lng : string) => {
  await setLocaleCookie(lng as "en" | "ar");
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});

export default i18n;
