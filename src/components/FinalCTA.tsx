import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";

export function FinalCTA() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <div
          ref={ref}
          className="reveal relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-forest via-leaf to-teal px-8 py-16 text-cream md:px-16 md:py-24 grain"
        >
          {/* Decorative shapes */}
          <div
            aria-hidden
            className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-terracotta/40 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-10 h-60 w-60 rounded-full bg-white/20 blur-3xl"
          />

          <div className="relative max-w-3xl">
            <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tightest">
              {t.finalCta.title}
            </h2>
            <p className="mt-5 text-lg md:text-xl text-cream/85">{t.finalCta.subtitle}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/voluntariado"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-white hover:-translate-y-0.5"
              >
                {t.finalCta.primary}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                to="/donativos"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-cream/80 bg-transparent px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-cream hover:text-ink hover:-translate-y-0.5"
              >
                {t.finalCta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
