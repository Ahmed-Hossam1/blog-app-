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
import enManageBlogs from "@/locales/en/manage-blogs.json";

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
import arManageBlogs from "@/locales/ar/manage-blogs.json";
import { getLocaleFromCookie } from "./client/get-browser-locale";

/**
 * Reads the "lang" cookie synchronously on the client.
 * Falls back to "en" if the cookie is missing or invalid.
 */


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
    "manage-blogs": enManageBlogs,
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
    "manage-blogs": arManageBlogs,
  },
};

const initialLang = getLocaleFromCookie();

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
    "manage-blogs",
  ],
  defaultNS: "home",
  interpolation: {
    escapeValue: false,
  },
});



export default i18n;
