import { useState, type FormEvent } from "react";
import { useLang } from "../contexts/LanguageContext";
import { useReveal } from "../hooks/useReveal";

type Status = "idle" | "submitting" | "success" | "error";

// AWS Lambda Function URL (or API Gateway endpoint) — set in Amplify env vars
const ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? "";

type Props = {
  /** When true, show the side info column (default). On dedicated /contactos page we want full-width form. */
  compact?: boolean;
};

export function ContactForm({ compact = false }: Props) {
  const { t, locale } = useLang();
  const ref = useReveal();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: bots fill this hidden field
    if ((fd.get("website") as string | null)?.trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    const required = ["name", "email", "interest", "message"];
    for (const key of required) {
      if (!(fd.get(key) as string | null)?.trim()) {
        setErrorMsg(t.form.fields.requiredHint);
        setStatus("error");
        return;
      }
    }

    setStatus("submitting");
    setErrorMsg(null);

    const payload = {
      form_type: "contact" as const,
      name:     fd.get("name"),
      email:    fd.get("email"),
      phone:    fd.get("phone"),
      org:      fd.get("org"),
      interest: fd.get("interest"),
      message:  fd.get("message"),
      locale,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (!ENDPOINT) {
        console.warn("[contact-form] VITE_CONTACT_ENDPOINT not set. Payload:", payload);
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
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const formCard = (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-ink/10 bg-cream text-ink p-6 md:p-8 shadow-soft"
    >
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.form.fields.name + " *"} name="name" required />
        <Field label={t.form.fields.email + " *"} name="email" type="email" required />
        <Field label={t.form.fields.phone} name="phone" type="tel" />
        <Field label={t.form.fields.org} name="org" />
        <div className="sm:col-span-2">
          <Label>{t.form.fields.interest} *</Label>
          <select
            name="interest"
            required
            defaultValue=""
            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-leaf focus:ring-4 focus:ring-leaf/20"
          >
            <option value="" disabled>—</option>
            {t.form.interests.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label>{t.form.fields.message} *</Label>
          <textarea
            name="message"
            rows={5}
            required
            placeholder={t.form.placeholderMessage}
            className="mt-1.5 w-full resize-y rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none transition focus:border-leaf focus:ring-4 focus:ring-leaf/20"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/60">{t.form.fields.requiredHint}</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? t.form.fields.submitting : t.form.fields.submit}
        </button>
      </div>

      {status === "success" && (
        <div className="mt-5 rounded-xl border border-leaf/30 bg-leaf/10 px-4 py-3 text-sm text-forest">
          {t.form.success}
        </div>
      )}
      {status === "error" && (
        <div className="mt-5 rounded-xl border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-clay">
          {errorMsg ?? t.form.error}
        </div>
      )}
    </form>
  );

  // Compact mode (used on /contactos page) — full width, dark wrapper handled by page itself
  if (compact) {
    return <div ref={ref} className="reveal">{formCard}</div>;
  }

  // Standard mode (used on Home) — dark section with split layout
  return (
    <section id="contacto" className="relative py-20 md:py-28 bg-ink text-cream grain">
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-leaf/25 blur-3xl"
      />
      <div className="container-page relative">
        <div ref={ref} className="reveal grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="chip !border-cream/20 !bg-white/10 !text-cream/80">{t.form.eyebrow}</p>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
              {t.form.title}
            </h2>
            <p className="mt-4 text-lg text-cream/75">{t.form.subtitle}</p>

            <div className="mt-10 space-y-3 text-sm">
              <ContactRow label="Tel." value="+244 946 273 911" href="tel:+244946273911" />
              <ContactRow label="Web" value="planetaconsciente.org" href="https://planetaconsciente.org" />
              <ContactRow label="Local" value="Luanda · Benguela · Lisboa" />
            </div>
          </div>

          <div className="lg:col-span-7">{formCard}</div>
        </div>
      </div>
    </section>
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
    </label>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-cream/10 pb-3">
      <span className="w-20 font-mono text-xs uppercase tracking-wider text-cream/50">{label}</span>
      {href ? (
        <a href={href} className="font-semibold text-cream hover:text-mint">{value}</a>
      ) : (
        <span className="font-semibold text-cream">{value}</span>
      )}
    </div>
  );
}
