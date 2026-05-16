import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { PlaceholderImage } from "./PlaceholderImage";

export function About() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section id="quem-somos" className="relative py-20 md:py-28">
      <div className="container-page">
        <div ref={ref} className="reveal grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky-feel column */}
          <div className="lg:col-span-5">
            <p className="chip">{t.about.eyebrow}</p>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
              {t.about.title}
            </h2>

            <div className="mt-6 hidden lg:block aspect-[5/4] overflow-hidden rounded-3xl shadow-soft">
              <PlaceholderImage
                src="/images/about-community.jpg"
                alt="A equipa da Planeta Consciente em acção"
                label="about-community.jpg"
                tone="teal"
                aspect="aspect-[5/4]"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-ink/80">
              <p className="text-xl text-ink/90 first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:text-forest first-letter:float-left first-letter:mr-2 first-letter:leading-[0.85] first-letter:mt-1">
                {t.about.p1}
              </p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {t.about.pills.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-ink/85"
                >
                  {p}
                </span>
              ))}
            </div>

            {/* Locations */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
              {t.hero.locations.map((city) => (
                <div key={city}>
                  <div className="font-display text-2xl font-bold text-ink">{city}</div>
                  <div className="mt-1 h-1 w-8 rounded-full bg-terracotta" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
