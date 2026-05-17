import { useLang } from "../contexts/LanguageContext";
import { PageHeader } from "../components/PageHeader";
import { Projects } from "../components/Projects";

export function ProjectsPage() {
  const { t } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
        tone="terracotta"
      />
      <Projects hideHeader />
    </>
  );
}
