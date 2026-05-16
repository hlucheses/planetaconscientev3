import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";

export function HowToParticipate() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <div ref={ref} className="reveal max-w-3xl">
          <p className="chip">{t.participate.eyebrow}</p>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {t.participate.title}
          </h2>
          <p className="mt-4 text-lg text-ink/75">{t.participate.subtitle}</p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.participate.items.map((it, i) => (
            <li
              key={it.who}
              className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 transition-all hover:-translate-y-1 hover:bg-ink hover:text-cream"
            >
              <span className="font-mono text-xs text-ink/40 group-hover:text-cream/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                {it.who}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70 group-hover:text-cream/80">
                {it.msg}
              </p>
              <a
                href="#contacto"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest group-hover:text-mint"
              >
                {it.action}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
