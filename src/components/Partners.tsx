import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";

/**
 * Partners grid — slots designed to receive logo SVG/PNG files later.
 * Each slot shows a placeholder with the partner name; when a real logo
 * is dropped in `/public/images/partners/<slug>.svg` (or .png) it can
 * replace the placeholder by changing the `logo` field below.
 */

type Partner = {
  name: string;
  slug: string;
  /** Optional path to logo file. When present, used in place of the initials block. */
  logo?: string;
};

const PARTNERS: Partner[] = [
  { name: "People In Need",                          slug: "pin" },
  { name: "Global Center on Adaptation",             slug: "gca" },
  { name: "Administração Municipal de Talatona",     slug: "talatona" },
  { name: "Gabinete Provincial do Ambiente (GPL)",   slug: "gpl" },
  { name: "Befco Indústrias · Água Perla",           slug: "befco" },
  { name: "Nervi Indústrias de Automação",           slug: "nervi" },
  { name: "Luanda Shapers",                          slug: "luanda-shapers" },
  { name: "Rotary Club de Luanda",                   slug: "rotary" },
  { name: "DHL Global",                              slug: "dhl" },
  { name: "Luanda International Academy",            slug: "lia" },
  { name: "Society of Petroleum Engineers",          slug: "spe" },
  { name: "Governo de Angola",                       slug: "gov-ao" },
];

function initials(name: string) {
  return name
    .replace(/[·()]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

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

        {/* Logo placeholder grid */}
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map((p) => (
            <li
              key={p.slug}
              className="group relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all hover:shadow-soft"
              title={p.name}
            >
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-[60%] max-w-[70%] object-contain transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint/70 font-display text-base font-bold text-forest"
                    aria-hidden
                  >
                    {initials(p.name)}
                  </span>
                  <span className="line-clamp-2 text-[11px] font-medium leading-tight text-ink/65">
                    {p.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>

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
