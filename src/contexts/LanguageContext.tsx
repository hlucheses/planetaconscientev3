import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { pt } from "../i18n/pt";
import { en } from "../i18n/en";

export type Locale = "pt" | "en";
export type Dict = typeof pt;

interface LanguageContextValue {
  locale: Locale;
  t: Dict;
  setLocale: (l: Locale) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "pc-locale";

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";

  // 1. Stored user choice has priority
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "pt" || stored === "en") return stored;

  // 2. Browser language: English -> en, otherwise default to Portuguese
  const lang = (navigator.language || (navigator.languages && navigator.languages[0]) || "").toLowerCase();
  if (lang.startsWith("en")) return "en";

  return "pt";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectInitialLocale());

  useEffect(() => {
    // Persist + reflect on <html lang>
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const setLocale = (l: Locale) => setLocaleState(l);
    return {
      locale,
      t: locale === "pt" ? pt : en,
      setLocale,
      toggle: () => setLocaleState((l) => (l === "pt" ? "en" : "pt")),
    };
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
