import i18n from "i18next";
import { initReactI18next } from "react-i18next";

//English
import enHome from "@/locales/en/home.json";
import enTerms from "@/locales/en/terms.json";
// Arabic namespaces
import arHome from "@/locales/ar/home.json";
import arTerms from "@/locales/ar/terms.json";

// translations
const resources = {
  en: {
    home: enHome,
    terms: enTerms,
  },
  ar: {
    home: arHome,
    terms: arTerms,
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
  ns: ["home", "terms"],
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
