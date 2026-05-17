import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  /** Decorative tone for the curved bottom corner */
  tone?: "leaf" | "terracotta" | "teal" | "ink";
};

const TONE_BG: Record<NonNullable<Props["tone"]>, string> = {
  leaf:       "from-leaf/15 via-mint/10 to-transparent",
  terracotta: "from-terracotta/15 via-sun/10 to-transparent",
  teal:       "from-teal/15 via-mint/10 to-transparent",
  ink:        "from-ink/10 via-bone/20 to-transparent",
};

export function PageHeader({ eyebrow, title, subtitle, children, tone = "leaf" }: Props) {
  return (
    <section className={`relative overflow-hidden border-b border-ink/5 bg-gradient-to-b ${TONE_BG[tone]} pb-16 pt-12 md:pb-24 md:pt-20`}>
      <div className="container-page relative">
        <div className="max-w-3xl">
          {eyebrow && <p className="chip">{eyebrow}</p>}
          <h1 className={`${eyebrow ? "mt-5" : ""} font-display text-4xl font-bold tracking-tight text-ink md:text-6xl`}>
            {title}
          </h1>
          {subtitle && <p className="mt-5 text-lg text-ink/75 md:text-xl">{subtitle}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
