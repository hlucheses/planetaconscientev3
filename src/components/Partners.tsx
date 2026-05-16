import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";

export function Partners() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section id="parceiros" className="relative py-20 md:py-28 bg-bone/60">
      <div className="container-page">
        <div ref={ref} className="reveal max-w-3xl">
          <p className="chip">{t.partners.eyebrow}</p>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {t.partners.title}
          </h2>
          <p className="mt-4 text-lg text-ink/75">{t.partners.subtitle}</p>
        </div>

        {/* Marquee - infinite horizontal scroll */}
        <div className="mt-12 overflow-hidden">
          <div className="marquee-track gap-8 py-4">
            {[...t.partners.list, ...t.partners.list].map((p, i) => (
              <div
                key={`${p}-${i}`}
                className="flex shrink-0 items-center gap-3 rounded-2xl border border-ink/10 bg-white px-6 py-4 shadow-sm"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-mint text-forest font-display font-bold">
                  {p.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <span className="font-display text-base font-semibold text-ink whitespace-nowrap">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration areas */}
        <div className="mt-16 rounded-3xl border border-ink/10 bg-white p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="font-display text-2xl font-bold text-ink">
                {t.partners.collabTitle}
              </h3>
              <div className="mt-3 h-1 w-12 rounded-full bg-terracotta" />
              <p className="mt-4 text-sm text-ink/70">
                {t.partners.subtitle}
              </p>
            </div>
            <div className="md:col-span-8">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-2 md:grid-cols-2">
                {t.partners.collabAreas.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-ink/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
