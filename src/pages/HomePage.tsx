import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { WhatWeDo } from "../components/WhatWeDo";
import { SDGs } from "../components/SDGs";
import { Impact } from "../components/Impact";
import { Projects } from "../components/Projects";
import { TreePlanting } from "../components/TreePlanting";
import { Volunteers } from "../components/Volunteers";
import { Partners } from "../components/Partners";
import { FinalCTA } from "../components/FinalCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhatWeDo />
      <SDGs />
      <Impact />
      <Projects featuredOnly />
      <TreePlanting />
      <Volunteers />
      <Partners />
      <FinalCTA />
    </>
  );
}
