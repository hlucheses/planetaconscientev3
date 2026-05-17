import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { PageHeader } from "../components/PageHeader";
import { Impact } from "../components/Impact";
import { Partners } from "../components/Partners";

export function AboutPage() {
  const { t } = useLang();
  const s = t.sobre;

  return (
    <>
      <PageHeader eyebrow={t.nav.about} title={s.pageTitle} subtitle={s.pageSubtitle} tone="leaf" />

      {/* Origin */}
      <section className="py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{s.originTitle}</h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-terracotta" />
          </div>
          <p className="lg:col-span-7 text-lg leading-relaxed text-ink/80">{s.originBody}</p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="bg-bone/60 py-16 md:py-24">
        <div className="container-page grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-ink/10 bg-white p-8 md:p-10">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-leaf text-white font-display font-bold">M</div>
            <h3 className="mt-4 font-display text-2xl font-bold text-ink">{s.missionTitle}</h3>
            <p className="mt-3 text-ink/80 leading-relaxed">{s.missionBody}</p>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-white p-8 md:p-10">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta text-white font-display font-bold">V</div>
            <h3 className="mt-4 font-display text-2xl font-bold text-ink">{s.visionTitle}</h3>
            <p className="mt-3 text-ink/80 leading-relaxed">{s.visionBody}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{s.valuesTitle}</h2>
          <div className="mt-3 h-1 w-12 rounded-full bg-terracotta" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.values.map((v, i) => (
              <li key={v.title} className="rounded-2xl border border-ink/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className="font-mono text-xs text-ink/50">0{i + 1}</div>
                <div className="mt-2 font-display text-lg font-semibold text-ink">{v.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Objectives + Areas */}
      <section className="bg-ink text-cream py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-bold md:text-3xl">{s.objectivesTitle}</h3>
            <ol className="mt-6 space-y-4">
              {s.objectives.map((o, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-leaf font-display font-bold">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-cream/85">{o}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold md:text-3xl">{s.areasTitle}</h3>
            <ul className="mt-6 space-y-3">
              {s.areas.map((a, i) => (
                <li key={i} className="flex gap-3 border-b border-cream/15 pb-3 text-cream/85">
                  <span className="font-mono text-xs text-cream/55">·{(i + 1).toString().padStart(2, "0")}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <Impact />

      {/* Presence — links to province pages */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{s.presenceTitle}</h2>
          <p className="mt-4 max-w-2xl text-ink/75">{s.presenceSubtitle}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {([t.provinces.luanda, t.provinces.benguela, t.provinces.lisboa] as const).map((p, i) => (
              <Link
                key={p.slug}
                to={`/provincias/${p.slug}`}
                className="group block rounded-3xl border border-ink/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="font-mono text-xs uppercase tracking-wider text-ink/50">
                  0{i + 1} · {t.nav.where}
                </div>
                <div className="mt-3 font-display text-3xl font-bold tracking-tight text-forest">
                  {p.name}
                </div>
                <div className="mt-2 h-1 w-10 rounded-full bg-terracotta transition-all group-hover:w-16" />
                <p className="mt-4 text-sm leading-relaxed text-ink/75">{p.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-leaf">
                  {t.about.readMore}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-ink/10 bg-cream/70 p-7">
            <p className="text-ink/85">
              <strong className="font-display">{s.teamCta}</strong> · {t.equipa.pageSubtitle}
            </p>
            <Link to="/equipa" className="btn-primary !px-5 !py-2.5 text-sm whitespace-nowrap">
              {s.teamCta}
            </Link>
          </div>
        </div>
      </section>

      <Partners />
    </>
  );
}
