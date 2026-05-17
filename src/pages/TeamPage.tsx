import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { PageHeader } from "../components/PageHeader";
import { TeamCard } from "../components/TeamCard";
import { OrgChart } from "../components/OrgChart";

export function TeamPage() {
  const { t } = useLang();
  const e = t.equipa;

  return (
    <>
      <PageHeader eyebrow={t.nav.team} title={e.pageTitle} subtitle={e.pageSubtitle} tone="teal" />

      {/* Org chart */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{e.directorsTitle}</h2>
          <p className="mt-3 max-w-2xl text-ink/75">{e.directorsSubtitle}</p>
          <div className="mt-10">
            <OrgChart />
          </div>
        </div>
      </section>

      {/* President highlighted with links */}
      <section className="bg-bone/60 py-16 md:py-20">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/55">{e.presidentTitle}</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">Helder Costa</h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            Co-fundador e Presidente da Associação Planeta Consciente. Lidera a estratégia e a representação institucional, e é in-country focal point para a Youth Adaptation Network do Global Center on Adaptation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://lucheses.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-leaf hover:text-leaf">
              lucheses.com ↗
            </a>
            <a href="https://instagram.com/helderlucheses" target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-leaf hover:text-leaf">
              Instagram ↗
            </a>
            <a href="https://linkedin.com/in/lucheses" target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink hover:border-leaf hover:text-leaf">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{e.foundersTitle}</h2>
          <p className="mt-3 max-w-2xl text-ink/75">{e.foundersSubtitle}</p>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {e.founders.map((name, i) => (
              <TeamCard
                key={name}
                name={name}
                tone={["leaf", "terracotta", "teal", "forest", "sun"][i % 5] as "leaf" | "terracotta" | "teal" | "forest" | "sun"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Council */}
      <section className="bg-bone/60 py-16 md:py-24">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{e.councilTitle}</h2>
          <p className="mt-3 max-w-2xl text-ink/75">{e.councilSubtitle}</p>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {e.council.map((name, i) => (
              <TeamCard
                key={name}
                name={name}
                role="Conselho Consultivo"
                tone={["forest", "teal", "leaf", "terracotta"][i % 4] as "forest" | "teal" | "leaf" | "terracotta"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="rounded-3xl bg-ink text-cream p-8 md:p-12 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-2xl md:text-3xl">{e.joinTeam}</p>
            <Link to="/voluntariado" className="btn-primary !px-6 !py-3 text-sm whitespace-nowrap">
              {e.joinTeamCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
