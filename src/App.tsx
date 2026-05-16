import { useEffect } from "react";
import { useLang } from "./contexts/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { WhatWeDo } from "./components/WhatWeDo";
import { SDGs } from "./components/SDGs";
import { Impact } from "./components/Impact";
import { Projects } from "./components/Projects";
import { TreePlanting } from "./components/TreePlanting";
import { Volunteers } from "./components/Volunteers";
import { Partners } from "./components/Partners";
import { HowToParticipate } from "./components/HowToParticipate";
import { ContactForm } from "./components/ContactForm";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

function App() {
  const { t } = useLang();

  // Sync <title> and meta description with the active locale
  useEffect(() => {
    document.title = t.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.meta.description);
  }, [t]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <SDGs />
        <Impact />
        <Projects />
        <TreePlanting />
        <Volunteers />
        <Partners />
        <HowToParticipate />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
