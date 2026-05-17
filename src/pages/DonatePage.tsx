import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { PageHeader } from "../components/PageHeader";

export function DonatePage() {
  const { t } = useLang();
  const d = t.doar;
  const [copied, setCopied] = useState(false);

  async function copyIban() {
    try {
      await navigator.clipboard.writeText(d.ibanValue.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select-and-copy could be added here; silently ignore
    }
  }

  return (
    <>
      <PageHeader eyebrow={t.nav.donate} title={d.pageTitle} subtitle={d.pageSubtitle} tone="terracotta" />

      {/* IBAN block */}
      <section className="py-12 md:py-20">
        <div className="container-page">
          <div className="rounded-3xl bg-ink text-cream p-8 md:p-12 grain">
            <p className="text-xs font-semibold uppercase tracking-wider text-cream/55">{d.bankTitle}</p>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{d.bankNameValue}</h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-cream/55">
                  {d.ibanLabel}
                </div>
                <div className="mt-2 font-mono text-xl tracking-wider text-cream break-all md:text-2xl">
                  {d.ibanValue}
                </div>
                <button
                  type="button"
                  onClick={copyIban}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest transition"
                >
                  {copied ? `✓ ${d.ibanCopied}` : d.ibanCopy}
                </button>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-cream/55">
                  {d.referenceTitle}
                </div>
                <div className="mt-2 font-display text-lg text-cream">{d.referenceValue}</div>

                <div className="mt-6 rounded-2xl bg-cream/10 border border-cream/15 p-5">
                  <div className="font-display font-semibold text-cream">{d.notifyTitle}</div>
                  <p className="mt-2 text-sm text-cream/80 leading-relaxed">{d.notifyBody}</p>
                  <Link to="/contactos" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mint hover:text-white">
                    {d.notifyCta} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where the support goes */}
      <section className="bg-bone/60 py-16 md:py-24">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{d.impactTitle}</h2>
          <div className="mt-3 h-1 w-12 rounded-full bg-terracotta" />

          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {d.impactItems.map((it, i) => (
              <li key={it.title} className="rounded-2xl border border-ink/10 bg-white p-6">
                <div className="font-mono text-xs text-ink/50">0{i + 1}</div>
                <div className="mt-2 font-display text-lg font-semibold text-ink">{it.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other ways to support */}
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{d.otherTitle}</h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-terracotta" />
            <Link to="/contactos" className="btn-primary mt-8 inline-flex !px-6 !py-3 text-sm">
              {d.contactCta}
            </Link>
          </div>
          <ul className="lg:col-span-7 space-y-3">
            {d.otherItems.map((it) => (
              <li key={it} className="flex gap-3 rounded-2xl border border-ink/10 bg-white p-5">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta/15 text-terracotta text-xs font-bold">✓</span>
                <span className="text-ink/85">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
