import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { PlaceholderImage } from "./PlaceholderImage";

const CITY_SLUGS: Record<string, "luanda" | "benguela" | "lisboa"> = {
  Luanda:   "luanda",
  Benguela: "benguela",
  Lisboa:   "lisboa",
  Lisbon:   "lisboa",
};

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

            <Link
              to="/sobre"
              className="link mt-6 inline-flex items-center gap-2 text-sm"
            >
              {t.about.readMore}
              <span aria-hidden>→</span>
            </Link>

            {/* Locations */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
              {t.hero.locations.map((city) => {
                const slug = CITY_SLUGS[city];
                const content = (
                  <>
                    <div className="font-display text-2xl font-bold text-ink group-hover:text-forest transition-colors">
                      {city}
                    </div>
                    <div className="mt-1 h-1 w-8 rounded-full bg-terracotta transition-all group-hover:w-14" />
                  </>
                );
                return slug ? (
                  <Link key={city} to={`/provincias/${slug}`} className="group block">
                    {content}
                  </Link>
                ) : (
                  <div key={city}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
