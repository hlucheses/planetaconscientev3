import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { PlaceholderImage } from "./PlaceholderImage";

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Decorative animated blobs */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-[480px] w-[480px] rounded-full bg-leaf/20 blur-3xl animate-blob"
      />
      <div
        aria-hidden
        className="absolute top-40 -left-40 h-[420px] w-[420px] rounded-full bg-terracotta/15 blur-3xl animate-blob [animation-delay:-6s]"
      />

      <div className="container-page relative">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Text column */}
          <div className="lg:col-span-7">
            <p className="chip animate-fade-in [animation-delay:.05s]">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-pulse" />
              {t.hero.eyebrow}
            </p>

            <h1 className="mt-6 font-display text-[clamp(2.6rem,8vw,6.25rem)] font-bold leading-[0.95] tracking-tightest text-ink animate-fade-up">
              {t.hero.titleLine1}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 italic text-forest">
                  {t.hero.titleHighlight}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-2 -z-0 h-3 rounded-full bg-terracotta/35 md:h-4"
                />
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base md:text-lg leading-relaxed text-ink/75 animate-fade-up [animation-delay:.15s]">
              {t.hero.subtitle}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:.25s]">
              <Link to="/projectos" className="btn-primary">
                {t.hero.ctaPrimary}
                <Arrow />
              </Link>
              <Link to="/voluntariado" className="btn-secondary">
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink/70 animate-fade-up [animation-delay:.35s]">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-leaf" />
                {t.hero.badge}
              </span>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-ink/30" />
              <div className="flex flex-wrap items-center gap-2">
                {t.hero.locations.map((city, i) => (
                  <span key={city} className="flex items-center gap-2">
                    <span className="font-display font-semibold tracking-tight text-ink">
                      {city}
                    </span>
                    {i < t.hero.locations.length - 1 && (
                      <span aria-hidden className="h-1 w-1 rounded-full bg-ink/30" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visual column - asymmetric image stack */}
          <div className="lg:col-span-5 relative animate-fade-up [animation-delay:.4s]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-soft">
              <PlaceholderImage
                src="/images/hero-community.jpg"
                alt="Jovens voluntários da Planeta Consciente numa acção comunitária"
                label="hero-community.jpg"
                tone="forest"
                aspect="aspect-[4/5]"
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute -left-6 bottom-10 max-w-[230px] rounded-3xl border border-ink/10 bg-cream/95 p-5 shadow-soft backdrop-blur md:-left-10">
              <div className="font-display text-4xl font-bold text-ink">+2.000</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-ink/60">
                {t.impact.stats[1].label}
              </div>
              <div className="mt-3 h-px w-full bg-ink/10" />
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-terracotta/15 text-terracotta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 22V10M12 10c0-3 2-6 6-6-1 4-3 6-6 6Zm0 0c0-3-2-6-6-6 1 4 3 6 6 6Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-xs font-semibold text-ink">
                  {t.trees.eyebrow}
                </span>
              </div>
            </div>

            {/* Floating tag */}
            <div className="absolute -right-2 top-8 rotate-3 rounded-2xl bg-ink px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-mint shadow-soft md:-right-4">
              #unidosporumplanetamelhor
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling indicator strip */}
      <div className="container-page mt-16 hidden md:block">
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-ink/45">
          <span className="h-px w-12 bg-ink/30" />
          <span>Educação</span>
          <span>·</span>
          <span>Plantio</span>
          <span>·</span>
          <span>Mobilização</span>
          <span>·</span>
          <span>Adaptação climática</span>
          <span className="h-px flex-1 bg-ink/15" />
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1 7h12M7 1l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
