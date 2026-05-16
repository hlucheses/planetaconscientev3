import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";

// Official UN SDG accent colors for these six
const SDG_COLORS: Record<string, string> = {
  "04": "#C5192D",
  "11": "#FD9D24",
  "12": "#BF8B2E",
  "13": "#3F7E44",
  "15": "#56C02B",
  "17": "#19486A",
};

export function SDGs() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <div ref={ref} className="reveal max-w-3xl">
          <p className="chip">{t.sdgs.eyebrow}</p>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {t.sdgs.title}
          </h2>
          <p className="mt-4 text-lg text-ink/75">{t.sdgs.subtitle}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.sdgs.items.map((s) => (
            <li
              key={s.num}
              className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-display text-xl font-bold text-white shadow-sm"
                style={{ background: SDG_COLORS[s.num] }}
                aria-hidden
              >
                {s.num}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                  ODS · SDG
                </div>
                <div className="mt-0.5 font-display font-semibold text-ink">{s.title}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
