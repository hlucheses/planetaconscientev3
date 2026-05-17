import { useState } from "react";

interface Props {
  /** Public path to the real image. If missing, falls back to a styled placeholder. */
  src: string;
  alt: string;
  className?: string;
  /** Aspect ratio fallback for placeholder (e.g. "aspect-[4/3]"). */
  aspect?: string;
  /** Short label shown inside placeholder. */
  label?: string;
  /** Optional tone for the placeholder background. */
  tone?: "forest" | "teal" | "mint" | "terracotta" | "ink" | "leaf" | "sun";
}

const toneMap = {
  forest:     "from-forest via-leaf to-teal",
  teal:       "from-teal via-leaf to-forest",
  mint:       "from-mint via-leaf/40 to-teal/40",
  terracotta: "from-terracotta via-clay to-ink",
  ink:        "from-ink via-forest to-leaf",
  leaf:       "from-leaf via-teal to-forest",
  sun:        "from-sun via-terracotta to-clay",
} as const;

/**
 * Renders a real image if available, otherwise an elegant gradient placeholder.
 * Swap files into /public/images using the same filename and the real image takes over automatically.
 */
export function PlaceholderImage({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/3]",
  label,
  tone = "forest",
}: Props) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  // Fallback: branded gradient placeholder
  return (
    <div
      className={`relative grain overflow-hidden ${aspect} bg-gradient-to-br ${toneMap[tone]} ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Decorative geometric leaf-shape */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full opacity-30"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="g" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="60" r="120" fill="url(#g)" />
        <path
          d="M 0 240 Q 100 180 200 220 T 400 200 L 400 300 L 0 300 Z"
          fill="white"
          fillOpacity="0.12"
        />
        <path
          d="M 0 270 Q 120 230 240 260 T 400 250 L 400 300 L 0 300 Z"
          fill="white"
          fillOpacity="0.08"
        />
      </svg>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
          {label ?? "Planeta Consciente"}
        </span>
      </div>
    </div>
  );
}
