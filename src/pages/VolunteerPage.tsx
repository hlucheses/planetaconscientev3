import { useLang } from "../contexts/LanguageContext";
import { PageHeader } from "../components/PageHeader";
import { VolunteerForm } from "../components/VolunteerForm";

export function VolunteerPage() {
  const { t } = useLang();
  const v = t.voluntariado;

  return (
    <>
      <PageHeader eyebrow={t.nav.volunteers} title={v.pageTitle} subtitle={v.pageSubtitle} tone="leaf" />

      <section className="pb-20 md:pb-28">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          {/* Side info */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-ink text-cream p-7 md:p-8 lg:sticky lg:top-24">
              <h2 className="font-display text-2xl font-bold">{t.volunteers.title}</h2>
              <p className="mt-3 text-cream/75">{t.volunteers.subtitle}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {t.volunteers.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf text-[10px] font-bold">
                      ✓
                    </span>
                    <span className="text-cream/85">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <h2 className="font-display text-2xl font-bold text-ink">{v.formTitle}</h2>
            <p className="mt-2 text-sm text-ink/65">{v.requiredHint}</p>
            <div className="mt-6">
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
