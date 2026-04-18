import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English namespaces
import enHome from "@/locales/en/home.json";
import enTerms from "@/locales/en/terms.json";
import enCommon from "@/locales/en/common.json";
import enBlog from "@/locales/en/blog.json";
import enAuthors from "@/locales/en/authors.json";
import enContact from "@/locales/en/contact.json";
import enSearch from "@/locales/en/search.json";
import enPrivacy from "@/locales/en/privacy.json";

// Arabic namespaces
import arHome from "@/locales/ar/home.json";
import arTerms from "@/locales/ar/terms.json";
import arCommon from "@/locales/ar/common.json";
import arBlog from "@/locales/ar/blog.json";
import arAuthors from "@/locales/ar/authors.json";
import arContact from "@/locales/ar/contact.json";
import arSearch from "@/locales/ar/search.json";
import arPrivacy from "@/locales/ar/privacy.json";

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
  },
};

function getInitialLanguage() {
  const savedLang = localStorage.getItem("lang");
  if (savedLang) return savedLang;

  const browserLang = navigator.language.split("-")[0];
  return browserLang === "ar" ? "ar" : "en";
}

const initialLang = getInitialLanguage();

document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";
document.documentElement.lang = initialLang;

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "en",
  ns: ["home", "terms", "common", "blog", "authors", "contact", "search", "privacy"],
  defaultNS: "home",
  interpolation: {
    escapeValue: false,
  },
});


i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
  localStorage.setItem("lang", lng);
}
);

export default i18n;
