import { useState, type FormEvent } from "react";
import { useLang } from "../contexts/LanguageContext";

type Status = "idle" | "submitting" | "success" | "error";

const ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? "";

export function VolunteerForm() {
  const { t, locale } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [areas, setAreas] = useState<Set<string>>(new Set());

  function toggleArea(a: string) {
    setAreas((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if ((fd.get("website") as string | null)?.trim()) {
      setStatus("success");
      form.reset();
      setAreas(new Set());
      return;
    }

    const required = ["fullName", "email", "phone", "city", "occupation", "availability", "motivation"];
    for (const key of required) {
      if (!(fd.get(key) as string | null)?.trim()) {
        setErrorMsg(t.voluntariado.fields.submit);
        setStatus("error");
        return;
      }
    }

    if (areas.size === 0) {
      setErrorMsg(t.voluntariado.fields.areasHint);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);

    const payload = {
      form_type: "volunteer" as const,
      fullName:     fd.get("fullName"),
      email:        fd.get("email"),
      phone:        fd.get("phone"),
      birthDate:    fd.get("birthDate"),
      city:         fd.get("city"),
      occupation:   fd.get("occupation"),
      areas:        Array.from(areas),
      availability: fd.get("availability"),
      experience:   fd.get("experience"),
      motivation:   fd.get("motivation"),
      howFound:     fd.get("howFound"),
      locale,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (!ENDPOINT) {
        console.warn("[volunteer-form] VITE_CONTACT_ENDPOINT not set. Payload:", payload);
        await new Promise((r) => setTimeout(r, 700));
      } else {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Bad response: ${res.status}`);
      }
      setStatus("success");
      form.reset();
      setAreas(new Set());
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const fields = t.voluntariado.fields;

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-ink/10 bg-white p-6 md:p-10 shadow-soft"
    >
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={fields.fullName + " *"} name="fullName" required />
        <Field label={fields.email + " *"} name="email" type="email" required />
        <Field label={fields.phone + " *"} name="phone" type="tel" required />
        <Field label={fields.birthDate} name="birthDate" type="date" />

        <div>
          <Label>{fields.city} *</Label>
          <select
            name="city"
            required
            defaultValue=""
            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-leaf focus:ring-4 focus:ring-leaf/20"
          >
            <option value="" disabled>—</option>
            {t.voluntariado.cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <p className="mt-1 text-[11px] text-ink/55">{fields.cityHint}</p>
        </div>

        <Field label={fields.occupation + " *"} name="occupation" required hint={fields.occupationHint} />

        <div className="sm:col-span-2">
          <Label>{fields.areas} *</Label>
          <p className="mt-1 mb-2 text-[11px] text-ink/55">{fields.areasHint}</p>
          <div className="flex flex-wrap gap-2">
            {t.voluntariado.areasList.map((a) => {
              const active = areas.has(a);
              return (
                <button
                  type="button"
                  key={a}
                  onClick={() => toggleArea(a)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                    active
                      ? "border-leaf bg-leaf text-white"
                      : "border-ink/15 bg-cream text-ink/75 hover:border-leaf/40 hover:text-ink"
                  }`}
                >
                  {a}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-2">
          <Label>{fields.availability} *</Label>
          <select
            name="availability"
            required
            defaultValue=""
            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-leaf focus:ring-4 focus:ring-leaf/20"
          >
            <option value="" disabled>—</option>
            {t.voluntariado.availabilityList.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <Label>{fields.experience}</Label>
          <textarea
            name="experience"
            rows={3}
            placeholder={fields.experienceHint}
            className="mt-1.5 w-full resize-y rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none transition focus:border-leaf focus:ring-4 focus:ring-leaf/20"
          />
        </div>

        <div className="sm:col-span-2">
          <Label>{fields.motivation} *</Label>
          <textarea
            name="motivation"
            rows={4}
            required
            placeholder={fields.motivationHint}
            className="mt-1.5 w-full resize-y rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none transition focus:border-leaf focus:ring-4 focus:ring-leaf/20"
          />
        </div>

        <div className="sm:col-span-2">
          <Label>{fields.howFound}</Label>
          <select
            name="howFound"
            defaultValue=""
            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-leaf focus:ring-4 focus:ring-leaf/20"
          >
            <option value="" disabled>—</option>
            {t.voluntariado.howFoundList.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/60">{t.voluntariado.requiredHint}</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? fields.submitting : fields.submit}
        </button>
      </div>

      {status === "success" && (
        <div className="mt-5 rounded-xl border border-leaf/30 bg-leaf/10 px-4 py-3 text-sm text-forest">
          {t.voluntariado.success}
        </div>
      )}
      {status === "error" && (
        <div className="mt-5 rounded-xl border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-clay">
          {errorMsg ?? t.voluntariado.error}
        </div>
      )}
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-xs font-semibold uppercase tracking-wider text-ink/60">
      {children}
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-leaf focus:ring-4 focus:ring-leaf/20"
      />
      {hint && <p className="mt-1 text-[11px] text-ink/55">{hint}</p>}
    </label>
  );
}
