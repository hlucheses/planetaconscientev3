import { useLang } from "../contexts/LanguageContext";

type Member = { name: string; role: string };

/**
 * Renders the visual org chart:
 *   - President at the top (centered)
 *   - Vice-President directly below
 *   - All directors in a responsive grid below
 *   - Coordinators highlighted separately at the bottom
 */
export function OrgChart() {
  const { t } = useLang();
  const all: Member[] = t.equipa.directors;

  const president = all.find((m) => /presidente/i.test(m.role) && !/vice/i.test(m.role));
  const vice      = all.find((m) => /vice-presidente/i.test(m.role));
  const directors = all.filter((m) =>
    /director|directora/i.test(m.role) && !/coordenador/i.test(m.role)
  );
  const coordinators = all.filter((m) => /coordenador/i.test(m.role));
  const advisor      = all.find((m) => /conselheir/i.test(m.role));

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 md:p-10">
      {/* President */}
      {president && (
        <div className="flex justify-center">
          <ChartNode member={president} tone="ink" emphasis />
        </div>
      )}

      {/* Connecting line */}
      {vice && (
        <>
          <Connector />
          <div className="flex justify-center">
            <ChartNode member={vice} tone="leaf" />
          </div>
        </>
      )}

      {/* Directors */}
      {directors.length > 0 && (
        <>
          <Connector />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {directors.map((m) => (
              <ChartNode key={m.name + m.role} member={m} tone="forest" />
            ))}
          </div>
        </>
      )}

      {/* Coordinators */}
      {coordinators.length > 0 && (
        <>
          <div className="my-6 h-px w-full bg-ink/10" />
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink/55">
              Coordenação Regional · Regional Coordination
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coordinators.map((m) => (
              <ChartNode key={m.name + m.role} member={m} tone="teal" />
            ))}
          </div>
        </>
      )}

      {/* Advisor */}
      {advisor && (
        <>
          <div className="my-6 h-px w-full bg-ink/10" />
          <div className="flex justify-center">
            <ChartNode member={advisor} tone="terracotta" />
          </div>
        </>
      )}
    </div>
  );
}

type Tone = "ink" | "leaf" | "forest" | "teal" | "terracotta";

const TONE_STYLE: Record<Tone, string> = {
  ink:        "bg-ink text-cream",
  forest:     "bg-forest text-cream",
  leaf:       "bg-leaf text-white",
  teal:       "bg-teal text-white",
  terracotta: "bg-terracotta text-white",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

function ChartNode({
  member,
  tone,
  emphasis = false,
}: {
  member: Member;
  tone: Tone;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl px-5 py-4 shadow-sm ${TONE_STYLE[tone]} ${
        emphasis ? "ring-4 ring-leaf/30 md:px-7 md:py-5" : ""
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-white/15 font-display font-bold ${
          emphasis ? "h-14 w-14 text-lg" : "h-11 w-11 text-sm"
        }`}
        aria-hidden
      >
        {initials(member.name)}
      </span>
      <div className="min-w-0">
        <div className={`font-display font-bold leading-tight ${emphasis ? "text-lg md:text-xl" : "text-sm"}`}>
          {member.name}
        </div>
        <div className={`leading-snug opacity-85 ${emphasis ? "text-sm" : "text-[11px]"}`}>
          {member.role}
        </div>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="my-4 flex justify-center" aria-hidden>
      <div className="h-6 w-px bg-ink/20" />
    </div>
  );
}
