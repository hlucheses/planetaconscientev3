import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

type NavItem = { to: string; key: "home" | "about" | "projects" | "volunteers" | "donate" };

const NAV_ITEMS: NavItem[] = [
  { to: "/",            key: "home" },
  { to: "/sobre",       key: "about" },
  { to: "/projectos",   key: "projects" },
  { to: "/voluntariado",key: "volunteers" },
  { to: "/donativos",   key: "donate" },
];

export function Navbar() {
  const { t } = useLang();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-xl shadow-[0_1px_0_rgba(10,46,31,.08)]"
          : "bg-cream/60 backdrop-blur-md"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight text-ink md:text-xl">
            Planeta Consciente
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-leaf"
                    : "text-ink/75 hover:text-ink"
                }`
              }
            >
              {t.nav[n.key]}
            </NavLink>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link to="/contactos" className="hidden md:inline-flex btn-primary !px-4 !py-2 text-xs">
            {t.nav.contact}
          </Link>
          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <path
                d="M1 1h16M1 7h16M1 13h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-page pb-6 pt-2">
          <nav className="flex flex-col rounded-3xl border border-ink/10 bg-white/95 p-3 shadow-soft">
            {NAV_ITEMS.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-mint/50 text-forest"
                      : "text-ink/80 hover:bg-mint/40 hover:text-ink"
                  }`
                }
              >
                {t.nav[n.key]}
              </NavLink>
            ))}
            <Link to="/contactos" className="btn-primary mt-2 w-full">
              {t.nav.contact}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-ink">
      <svg viewBox="0 0 32 32" className="h-5 w-5 text-mint" aria-hidden="true">
        <path
          d="M27 5C13 5 5 13 5 25c0 1 .2 2 .4 3 1-13 9-19 21-21Z"
          fill="currentColor"
        />
        <path
          d="M5.4 28C13 17 22 14 27 5"
          stroke="#0A2E1F"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-terracotta" />
    </span>
  );
}
