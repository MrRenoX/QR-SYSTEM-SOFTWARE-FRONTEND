"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Language, type TranslationDict } from "./translations";

const STORAGE_KEY = "ggg-language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  /** The full translation dictionary for the active language — read as plain
   *  object properties, e.g. `t.header.selectLanguageAriaLabel`. Fully type
   *  safe: a typo'd key is a compile error, not a runtime miss. */
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "hi" || value === "gu" || value === "ta";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start at "en" so server-rendered HTML and the client's first
  // render match exactly — no hydration mismatch. The real preference (if
  // any) is read from localStorage after mount, in the effect below.
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) {
      setLanguageState(stored);
    }
  }, []);

  function setLanguage(next: Language) {
    setLanguageState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
