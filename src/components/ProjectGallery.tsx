import { PlaceholderImage } from "./PlaceholderImage";

type Props = {
  slug: string;
  /** Number of placeholder gallery slots to render */
  count?: number;
  caption?: string;
};

const TONES = ["forest", "teal", "leaf", "sun", "terracotta"] as const;

/**
 * Renders a gallery grid for project detail pages.
 * Drop real images at /public/images/projects/<slug>/<n>.jpg to replace placeholders.
 */
export function ProjectGallery({ slug, count = 6, caption }: Props) {
  const items = Array.from({ length: count }, (_, i) => ({
    src: `/images/projects/${slug}/${i + 1}.jpg`,
    tone: TONES[i % TONES.length],
    label: `${slug}-${i + 1}.jpg`,
  }));

  return (
    <div>
      {caption && <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-ink/55">{caption}</p>}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={it.src}
            className={`overflow-hidden rounded-2xl border border-ink/10 ${i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"}`}
          >
            <PlaceholderImage src={it.src} alt={it.label} label={it.label} tone={it.tone} />
          </div>
        ))}
      </div>
    </div>
  );
}
