"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

type LanguageContextType = {
  lang: Language;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("fr");

  const toggle = () => {
    setLang((prev) => (prev === "fr" ? "en" : "fr"));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}