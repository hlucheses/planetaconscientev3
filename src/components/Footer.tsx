import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/planeta_consciente.ao/" },
  { name: "LinkedIn",  href: "https://www.linkedin.com/company/planeta-consciente" },
  { name: "TikTok",    href: "https://www.tiktok.com/@placonscienteao" },
  { name: "YouTube",   href: "https://www.youtube.com/@PlanetaConscienteAO" },
  { name: "Facebook",  href: "https://www.facebook.com/profile.php?id=61576903401987" },
];

type NavKey = "home" | "about" | "team" | "projects" | "volunteers" | "donate" | "contact";

const NAV: { to: string; key: NavKey }[] = [
  { to: "/",            key: "home" },
  { to: "/sobre",       key: "about" },
  { to: "/equipa",      key: "team" },
  { to: "/projectos",   key: "projects" },
  { to: "/voluntariado",key: "volunteers" },
  { to: "/donativos",   key: "donate" },
  { to: "/contactos",   key: "contact" },
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
                <li key={n.to}>
                  <Link to={n.to} className="text-cream/85 hover:text-mint">
                    {t.nav[n.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (no public email — use form) */}
          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-cream/50">
              {t.footer.contactTitle}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/contactos" className="text-cream/85 hover:text-mint">
                  {t.nav.contact} →
                </Link>
              </li>
              <li>
                <Link to="/voluntariado" className="text-cream/85 hover:text-mint">
                  {t.nav.volunteers} →
                </Link>
              </li>
              <li>
                <a href="tel:+244946273911" className="text-cream/85 hover:text-mint">
                  +244 946 273 911
                </a>
              </li>
              <li>
                <a href="https://planetaconsciente.org" className="text-cream/85 hover:text-mint">
                  planetaconsciente.org
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
