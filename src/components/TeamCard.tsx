type Props = {
  name: string;
  role?: string;
  photo?: string;
  tone?: "leaf" | "terracotta" | "teal" | "forest" | "sun";
  links?: { label: string; href: string }[];
};

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  leaf:       "from-leaf/30 via-mint/40 to-mint/10",
  terracotta: "from-terracotta/25 via-sun/30 to-sun/10",
  teal:       "from-teal/25 via-mint/30 to-mint/10",
  forest:     "from-forest/30 via-leaf/20 to-mint/10",
  sun:        "from-sun/35 via-sun/15 to-cream",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

export function TeamCard({ name, role, photo, tone = "leaf", links }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all hover:-translate-y-0.5 hover:shadow-soft">
      <div className={`relative aspect-square bg-gradient-to-br ${TONE[tone]} flex items-center justify-center`}>
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="font-display text-5xl font-bold text-ink/55 group-hover:text-ink/70 transition-colors">
            {initials(name)}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="font-display text-base font-semibold leading-tight text-ink">{name}</div>
        {role && <div className="mt-1 text-xs text-ink/65 leading-snug">{role}</div>}
        {links && links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink/15 px-3 py-1 text-[11px] font-medium text-ink/75 hover:border-leaf hover:text-leaf"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
