import { useLang } from "../contexts/LanguageContext";

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/planeta_consciente.ao/" },
  { name: "LinkedIn",  href: "https://www.linkedin.com/company/planeta-consciente" },
  { name: "TikTok",    href: "https://www.tiktok.com/@placonscienteao" },
  { name: "YouTube",   href: "https://www.youtube.com/@PlanetaConscienteAO" },
  { name: "Facebook",  href: "https://www.facebook.com/profile.php?id=61576903401987" },
];

const NAV = [
  { id: "inicio",      labelKey: "home" as const },
  { id: "quem-somos",  labelKey: "about" as const },
  { id: "fazemos",     labelKey: "whatWeDo" as const },
  { id: "projectos",   labelKey: "projects" as const },
  { id: "impacto",     labelKey: "impact" as const },
  { id: "voluntarios", labelKey: "volunteers" as const },
  { id: "parceiros",   labelKey: "partners" as const },
  { id: "contacto",    labelKey: "contact" as const },
];

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream pt-16 pb-10">
      <div className="container-page">
        {/* Big tagline */}
        <div className="border-b border-cream/15 pb-12">
          <h3 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] tracking-tightest">
            {t.footer.tagline}
          </h3>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="font-display text-xl font-bold">Planeta Consciente</div>
            <p className="mt-3 text-sm text-cream/65 max-w-xs">
              {t.footer.builtWith}
            </p>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-cream/50">
              {t.footer.navTitle}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-cream/85 hover:text-mint">
                    {t.nav[n.labelKey]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-cream/50">
              {t.footer.contactTitle}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="https://planetaconsciente.org" className="text-cream/85 hover:text-mint">
                  planetaconsciente.org
                </a>
              </li>
              <li>
                <a href="mailto:contacto@planetaconsciente.org" className="text-cream/85 hover:text-mint">
                  contacto@planetaconsciente.org
                </a>
              </li>
              <li>
                <a href="mailto:helder@planetaconsciente.org" className="text-cream/85 hover:text-mint">
                  helder@planetaconsciente.org
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-cream/50">
              {t.footer.followTitle}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cream/85 hover:text-mint"
                  >
                    <span aria-hidden>↗</span>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-start gap-3 border-t border-cream/15 pt-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Planeta Consciente. {t.footer.rights}</span>
          <span className="font-mono">Luanda · Benguela · Lisboa</span>
        </div>
      </div>
    </footer>
  );
}
