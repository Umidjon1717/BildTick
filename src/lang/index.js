import { translationUz } from "./uz";
import { translationEn } from "./en";
import { translationRu } from "./ru";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("lang_code") || "en",
  fallbackLng: localStorage.getItem("lang_code") || "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: translationEn },
    ru: { translation: translationRu },
    uz: { translation: translationUz },
  },
});

export default i18n;
