import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { PlaceholderImage } from "./PlaceholderImage";

export function TreePlanting() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-cream via-mint/30 to-cream">
      <div className="container-page">
        <div ref={ref} className="reveal grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="chip">
              <span aria-hidden>🌱</span>
              {t.trees.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-tightest text-ink">
              <span className="block text-terracotta">{t.trees.titleHighlight}</span>
              <span className="block">{t.trees.titleAfter}</span>
            </h2>

            <div className="mt-7 space-y-4 max-w-xl text-lg leading-relaxed text-ink/80">
              <p>{t.trees.p1}</p>
              <p>{t.trees.p2}</p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {t.trees.chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-ink/15 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-ink/75"
                >
                  {c}
                </span>
              ))}
            </div>

            <Link to="/voluntariado" className="btn-accent mt-9">
              {t.trees.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative ring */}
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[2.5rem] border-2 border-dashed border-leaf/40"
              />
              <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-soft">
                <PlaceholderImage
                  src="/images/tree-planting.jpg"
                  alt="Jovens a plantar árvores"
                  label="tree-planting.jpg"
                  tone="forest"
                  aspect="aspect-square"
                />
              </div>
              {/* Floating counter */}
              <div className="absolute -bottom-6 -right-2 rotate-[-4deg] rounded-2xl bg-ink px-5 py-3 text-cream shadow-soft md:-right-6">
                <div className="font-display text-2xl font-bold leading-none">2.000+</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-mint">
                  {t.trees.eyebrow}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
