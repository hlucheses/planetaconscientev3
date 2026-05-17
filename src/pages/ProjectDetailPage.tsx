import { Link, useParams, Navigate } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { PageHeader } from "../components/PageHeader";
import { ProjectGallery } from "../components/ProjectGallery";
import { PlaceholderImage } from "../components/PlaceholderImage";

const TONE_BY_SLUG: Record<string, "terracotta" | "forest" | "teal" | "sun" | "leaf"> = {
  ekoar:                         "terracotta",
  "angola-verde":                "forest",
  "global-center-on-adaptation": "teal",
  "esta-tudo-conectado":         "sun",
  "arborizacao-luanda":          "leaf",
  greentalks:                    "teal",
};

const HERO_TONE_BG: Record<string, "leaf" | "terracotta" | "teal" | "ink"> = {
  ekoar:                         "terracotta",
  "angola-verde":                "leaf",
  "global-center-on-adaptation": "teal",
  "esta-tudo-conectado":         "terracotta",
  "arborizacao-luanda":          "leaf",
  greentalks:                    "teal",
};

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLang();

  const project = t.projects.items.find((p) => p.slug === slug);
  const detail = slug ? (t.projects.details as Record<string, typeof t.projects.details.ekoar | undefined>)[slug] : undefined;

  if (!project || !detail) {
    return <Navigate to="/projectos" replace />;
  }

  const tone = TONE_BY_SLUG[project.slug] ?? "forest";
  const heroTone = HERO_TONE_BG[project.slug] ?? "leaf";

  return (
    <>
      <PageHeader
        eyebrow={project.tag}
        title={project.name}
        subtitle={project.title}
        tone={heroTone}
      >
        <Link
          to="/projectos"
          className="inline-flex items-center gap-2 text-sm font-medium text-leaf hover:text-forest"
        >
          ← {t.projects.backToProjects}
        </Link>
      </PageHeader>

      {/* Hero image */}
      <section className="-mt-6 pb-12 md:pb-16">
        <div className="container-page">
          <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-ink/10 md:aspect-[21/9]">
            <PlaceholderImage
              src={`/images/projects/${project.slug}/hero.jpg`}
              alt={project.name}
              label={`${project.slug}/hero.jpg`}
              tone={tone}
            />
          </div>
        </div>
      </section>

      {/* Body + meta sidebar */}
      <section className="pb-16 md:pb-24">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          {/* Body */}
          <div className="lg:col-span-8">
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              {t.projects.roleTitle}
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-terracotta" />
            <p className="mt-5 text-lg leading-relaxed text-ink/80">{detail.role}</p>

            <div className="mt-10 space-y-5">
              {detail.body.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-ink/80">{para}</p>
              ))}
            </div>
          </div>

          {/* Meta sidebar */}
          <aside className="lg:col-span-4">
            <div className="rounded-3xl border border-ink/10 bg-cream/70 p-6 md:p-7 space-y-5 lg:sticky lg:top-24">
              <Meta label={t.projects.statusTitle} value={detail.status} />
              <Meta label={t.projects.timelineTitle} value={detail.timeline} />
              <Meta label={t.projects.locationTitle} value={detail.location} />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-ink/55">
                  {t.projects.partnersTitle}
                </div>
                <ul className="mt-2 space-y-1.5 text-sm text-ink/80">
                  {detail.partners.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-terracotta">·</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-ink/10">
                <Link to="/voluntariado" className="btn-primary w-full text-center text-sm !py-2.5">
                  {t.nav.volunteers}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-bone/60 py-16 md:py-24">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            {t.projects.galleryPlaceholder}
          </h2>
          <div className="mt-3 h-1 w-12 rounded-full bg-terracotta" />
          <div className="mt-8">
            <ProjectGallery slug={project.slug} count={5} />
          </div>
        </div>
      </section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-ink/55">{label}</div>
      <div className="mt-1 text-sm font-medium text-ink">{value}</div>
    </div>
  );
}
