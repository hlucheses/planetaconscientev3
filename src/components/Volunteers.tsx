import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { PlaceholderImage } from "./PlaceholderImage";

export function Volunteers() {
  const { t } = useLang();
  const ref = useReveal();

  return (
    <section id="voluntarios" className="relative py-20 md:py-28">
      <div className="container-page">
        <div ref={ref} className="reveal grid items-center gap-12 lg:grid-cols-12">
          {/* Image-led column */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-soft">
                <PlaceholderImage
                  src="/images/volunteers-1.jpg"
                  alt="Voluntária no terreno"
                  label="volunteers-1.jpg"
                  tone="teal"
                  aspect="aspect-[3/4]"
                />
              </div>
              <div className="mt-8 aspect-[3/4] overflow-hidden rounded-3xl shadow-soft">
                <PlaceholderImage
                  src="/images/volunteers-2.jpg"
                  alt="Acção comunitária"
                  label="volunteers-2.jpg"
                  tone="forest"
                  aspect="aspect-[3/4]"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-6">
            <p className="chip">{t.volunteers.eyebrow}</p>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
              {t.volunteers.title}
            </h2>
            <p className="mt-4 text-lg text-ink/75 max-w-xl">{t.volunteers.subtitle}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.volunteers.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-4">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf text-cream">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M1 6l3.5 3.5L11 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm leading-snug text-ink/85">{b}</span>
                </li>
              ))}
            </ul>

            <a href="#contacto" className="btn-primary mt-8">
              {t.volunteers.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
