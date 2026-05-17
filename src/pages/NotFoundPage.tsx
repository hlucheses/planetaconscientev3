import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";

export function NotFoundPage() {
  const { t } = useLang();

  return (
    <section className="py-32 md:py-40">
      <div className="container-page text-center">
        <div className="font-mono text-sm text-ink/55">404</div>
        <h1 className="mt-3 font-display text-5xl font-bold text-ink md:text-7xl">
          {t.notFound.title}
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-lg text-ink/70">{t.notFound.subtitle}</p>
        <Link to="/" className="btn-primary mt-10 inline-flex !px-6 !py-3 text-sm">
          {t.notFound.back}
        </Link>
      </div>
    </section>
  );
}
