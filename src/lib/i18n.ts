import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// translations
const resources = {
  en: {
    translation: {
      "WelcomeMessage": "Welcome to React and react-i18next",
    },
  },
  fr: {
    translation: {
      "WelcomeMessage": "Bienvenue à React et react-i18next",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
