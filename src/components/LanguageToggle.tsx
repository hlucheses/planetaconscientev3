import { useLang } from "../contexts/LanguageContext";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.langSwitch.a11y}
      className={`relative inline-flex items-center rounded-full border border-ink/15 bg-white/70 p-0.5 backdrop-blur ${
        compact ? "text-[11px]" : "text-xs"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-0.5 bottom-0.5 w-1/2 rounded-full bg-ink transition-transform duration-300 ease-out ${
          locale === "en" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      <button
        type="button"
        onClick={() => setLocale("pt")}
        aria-pressed={locale === "pt"}
        className={`relative z-10 rounded-full px-3 py-1.5 font-semibold transition-colors ${
          locale === "pt" ? "text-cream" : "text-ink/60 hover:text-ink"
        }`}
      >
        {t.langSwitch.pt}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`relative z-10 rounded-full px-3 py-1.5 font-semibold transition-colors ${
          locale === "en" ? "text-cream" : "text-ink/60 hover:text-ink"
        }`}
      >
        {t.langSwitch.en}
      </button>
    </div>
  );
}
