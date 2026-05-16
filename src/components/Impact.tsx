import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";

export function Impact() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section id="impacto" className="relative isolate overflow-hidden bg-ink text-cream py-20 md:py-28 grain">
      {/* Decorative gradient blob */}
      <div
        aria-hidden
        className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-leaf/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-terracotta/20 blur-3xl"
      />

      <div className="container-page relative">
        <div ref={ref} className="reveal max-w-3xl">
          <p className="chip !border-cream/20 !bg-white/10 !text-cream/80">{t.impact.eyebrow}</p>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {t.impact.title}
          </h2>
          <p className="mt-4 text-lg text-cream/75">{t.impact.subtitle}</p>
        </div>

        {/* Stats grid */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-cream/10 sm:grid-cols-2 lg:grid-cols-5">
          {t.impact.stats.map((s, i) => (
            <div
              key={s.label}
              className="bg-ink p-6 sm:p-7 transition-colors hover:bg-forest"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="font-display text-5xl font-bold tracking-tight text-cream md:text-6xl animate-count">
                {s.value}
              </div>
              <div className="mt-3 text-sm leading-snug text-cream/70">{s.label}</div>
              <div className="mt-4 h-1 w-10 rounded-full bg-terracotta" />
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-cream/60">
          <span className="font-mono text-cream/80">→</span>{" "}
          {t.hero.locations.join(" · ")}
        </p>
      </div>
    </section>
  );
}
