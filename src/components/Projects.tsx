import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { PlaceholderImage } from "./PlaceholderImage";

// Map each project slug to a hero image + tone for the placeholder fallback
const IMAGE_BY_SLUG: Record<string, { src: string; tone: "terracotta" | "forest" | "teal" | "sun" | "leaf" }> = {
  ekoar:                       { src: "/images/ekoar.jpg",         tone: "terracotta" },
  "angola-verde":              { src: "/images/angola-verde.jpg",  tone: "forest"     },
  "global-center-on-adaptation":{ src: "/images/gca-youth.jpg",    tone: "teal"       },
  "esta-tudo-conectado":       { src: "/images/esta-tudo-conectado.jpg", tone: "sun"  },
  "arborizacao-luanda":        { src: "/images/arborizacao-luanda.jpg",  tone: "leaf" },
  greentalks:                  { src: "/images/greentalks.jpg",    tone: "teal"       },
};

type ProjectsProps = {
  /** When true, show only the top 3 (used on Home). When false/undefined, show all. */
  featuredOnly?: boolean;
  /** When true, hide the section's own title block (used inside ProjectsPage which has its own header). */
  hideHeader?: boolean;
};

export function Projects({ featuredOnly = false, hideHeader = false }: ProjectsProps = {}) {
  const { t } = useLang();
  const ref = useReveal();

  const items = featuredOnly ? t.projects.items.slice(0, 3) : t.projects.items;

  return (
    <section id="projectos" className="relative py-20 md:py-28">
      <div className="container-page">
        {!hideHeader && (
          <div ref={ref} className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="chip">{t.projects.eyebrow}</p>
              <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
                {t.projects.title}
              </h2>
              <p className="mt-4 text-lg text-ink/75">{t.projects.subtitle}</p>
            </div>
            {featuredOnly && (
              <Link to="/projectos" className="link inline-flex items-center gap-2 text-sm whitespace-nowrap">
                {t.projects.viewAll}
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        )}

        <div className={`${hideHeader ? "" : "mt-14"} grid gap-8 md:grid-cols-2 lg:grid-cols-3`}>
          {items.map((p) => {
            const img = IMAGE_BY_SLUG[p.slug] ?? { src: "/images/project-fallback.jpg", tone: "forest" as const };
            return (
              <Link
                key={p.slug}
                to={`/projectos/${p.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <PlaceholderImage
                    src={img.src}
                    alt={p.name}
                    label={img.src.split("/").pop()}
                    tone={img.tone}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink backdrop-blur">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="font-display text-3xl font-bold tracking-tight text-ink">
                    {p.name}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.desc}</p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-ink/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    {p.impact}
                  </div>

                  <div className="mt-6 flex-1" />
                  <span className="link inline-flex items-center gap-2 text-sm">
                    {t.projects.learnMore}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
