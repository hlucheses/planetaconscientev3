import { Link, useParams, Navigate } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { PageHeader } from "../components/PageHeader";
import { PlaceholderImage } from "../components/PlaceholderImage";

const TONE_BY_SLUG: Record<string, "leaf" | "teal" | "terracotta"> = {
  luanda:   "terracotta",
  benguela: "teal",
  lisboa:   "leaf",
};

export function ProvincePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLang();

  const province = slug && (slug === "luanda" || slug === "benguela" || slug === "lisboa")
    ? t.provinces[slug]
    : undefined;

  if (!province) {
    return <Navigate to="/sobre" replace />;
  }

  const tone = TONE_BY_SLUG[province.slug] ?? "leaf";

  return (
    <>
      <PageHeader
        eyebrow={t.provinces.eyebrow}
        title={province.pageTitle}
        subtitle={province.pageSubtitle}
        tone={tone}
      />

      {/* Hero image + summary */}
      <section className="py-12 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-ink/10 lg:aspect-[5/4]">
              <PlaceholderImage
                src={`/images/provinces/${province.slug}.jpg`}
                alt={province.name}
                label={`provinces/${province.slug}.jpg`}
                tone={tone === "leaf" ? "forest" : tone}
              />
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink/85">{province.summary}</p>
            <div className="mt-8 rounded-2xl bg-cream/70 border border-ink/10 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink/55">
                {province.coordinatorLabel}
              </div>
              <div className="mt-2 font-display font-semibold text-ink">{province.coordinatorValue}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="bg-bone/60 py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{province.contextTitle}</h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-terracotta" />
          </div>
          <p className="lg:col-span-7 text-lg leading-relaxed text-ink/80">{province.contextBody}</p>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{province.activitiesTitle}</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {province.activities.map((a, i) => (
              <li key={i} className="flex gap-5 rounded-2xl border border-ink/10 bg-white p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf font-display font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-base leading-relaxed text-ink/85">{a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="container-page">
          <div className="rounded-3xl bg-ink text-cream p-8 md:p-12 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-2xl md:text-3xl">{t.equipa.joinTeam}</p>
              <p className="mt-2 text-cream/70 text-sm">{province.name}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/voluntariado" className="btn-primary !px-5 !py-2.5 text-sm whitespace-nowrap">
                {t.nav.volunteers}
              </Link>
              <Link to="/" className="rounded-full border border-cream/30 px-5 py-2.5 text-sm font-medium text-cream hover:bg-white/10">
                {t.provinces.backHome}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
