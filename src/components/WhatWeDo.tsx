import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";

// Icon set keyed by index — keeps cards consistent across PT/EN
const ICONS = [
  // Education
  <path key="ed" d="M3 9l9-4 9 4-9 4-9-4Zm0 0v6m9 1v-5m6 5v-5" strokeLinecap="round" strokeLinejoin="round" />,
  // Mobilisation
  <path key="mo" d="M5 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm8-4a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2 21c0-3 2-5 6-5s6 2 6 5m1-5c3 0 6 1 6 4" strokeLinecap="round" strokeLinejoin="round" />,
  // Circular
  <path key="ci" d="M3 12a9 9 0 0 1 15-6.7M21 12a9 9 0 0 1-15 6.7M18 3v5h-5M6 21v-5h5" strokeLinecap="round" strokeLinejoin="round" />,
  // Climate
  <path key="cl" d="M6 18a4 4 0 0 1 .7-7.9 6 6 0 0 1 11.6 1.4A3.5 3.5 0 0 1 17 18H6Z M9 21l-1.5 2M13 21l-1.5 2M17 21l-1.5 2" strokeLinecap="round" strokeLinejoin="round" />,
  // Tree
  <path key="tr" d="M12 22V13M8 13a4 4 0 0 1-2-7 5 5 0 0 1 9.7-1.6A4 4 0 0 1 16 13H8Z" strokeLinecap="round" strokeLinejoin="round" />,
  // Volunteer
  <path key="vo" d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" strokeLinecap="round" strokeLinejoin="round" />,
];

export function WhatWeDo() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section id="fazemos" className="relative py-20 md:py-28 bg-bone/60">
      <div className="container-page">
        <div ref={ref} className="reveal max-w-3xl">
          <p className="chip">{t.whatWeDo.eyebrow}</p>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {t.whatWeDo.title}
          </h2>
          <p className="mt-4 text-lg text-ink/75">{t.whatWeDo.subtitle}</p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.whatWeDo.items.map((item, i) => (
            <li
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-soft"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-forest transition-colors group-hover:bg-forest group-hover:text-mint">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  {ICONS[i]}
                </svg>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.desc}</p>

              {/* Decorative corner accent */}
              <div
                aria-hidden
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-terracotta/0 transition-colors group-hover:bg-terracotta/10"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
