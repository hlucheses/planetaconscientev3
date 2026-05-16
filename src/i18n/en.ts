import type { pt } from "./pt";

// Mirror the pt shape so the dictionary stays in lockstep.
export const en: typeof pt = {
  meta: {
    title: "Planeta Consciente — United for a better planet",
    description:
      "We mobilise young people across Angola and Portugal to turn environmental awareness into real action. Education, tree planting, volunteering and climate adaptation.",
  },

  nav: {
    home: "Home",
    about: "About us",
    whatWeDo: "What we do",
    projects: "Projects",
    impact: "Impact",
    volunteers: "Volunteers",
    partners: "Partners",
    contact: "Contact",
    join: "Join the movement",
  },

  hero: {
    eyebrow: "Youth-led environmental movement · Angola · Portugal",
    titleLine1: "United for a",
    titleHighlight: "better planet.",
    subtitle:
      "We mobilise young people to turn environmental awareness into action. We plant trees, educate communities and build bridges between youth, institutions and climate solutions.",
    ctaPrimary: "Explore our projects",
    ctaSecondary: "Join the movement",
    locations: ["Luanda", "Benguela", "Lisbon"],
    badge: "Active on the ground since 2020",
  },

  about: {
    eyebrow: "About us",
    title: "A young, community-driven, mobilising movement.",
    p1: "We are Planeta Consciente — an environmental organisation born from the urgency of a generation that refuses to stand still in the face of the climate crisis.",
    p2: "From Luanda to Benguela, from Lisbon to every community that welcomes us, we bring environmental education to where real change happens: schools, neighbourhoods, streets, companies.",
    p3: "We believe climate change is also tackled on the street, in the yard and in the community — and that young people are the best agents of this transformation.",
    pills: ["Environmental education", "Community", "Climate action", "Youth"],
  },

  whatWeDo: {
    eyebrow: "What we do",
    title: "From awareness to action.",
    subtitle: "We work across six connected fronts, each with direct impact on communities.",
    items: [
      {
        title: "Environmental education",
        desc: "We bring practical training to schools, neighbourhoods and communities — because to inform is the first step to change.",
      },
      {
        title: "Community mobilisation",
        desc: "We activate volunteers and residents in local campaigns that restore environmental dignity to their territories.",
      },
      {
        title: "Circular economy",
        desc: "We promote reuse, waste management and new models that reduce daily waste.",
      },
      {
        title: "Climate adaptation",
        desc: "We support youth participation in the African climate agenda with voice, data and concrete proposals.",
      },
      {
        title: "Tree planting",
        desc: "We've already planted over 2,000 trees. Each one is education, regeneration and a commitment to the future.",
      },
      {
        title: "Youth volunteering",
        desc: "We're shaping a new generation of environmental leaders that steps off the phone and into the community.",
      },
    ],
  },

  sdgs: {
    eyebrow: "Alignment",
    title: "United Nations Sustainable Development Goals",
    subtitle: "Our work contributes directly to six SDGs — because climate action doesn't stand alone.",
    items: [
      { num: "04", title: "Quality Education" },
      { num: "11", title: "Sustainable Cities & Communities" },
      { num: "12", title: "Responsible Consumption & Production" },
      { num: "13", title: "Climate Action" },
      { num: "15", title: "Life on Land" },
      { num: "17", title: "Partnerships for the Goals" },
    ],
  },

  impact: {
    eyebrow: "Real impact",
    title: "The numbers speak for us.",
    subtitle:
      "Each number below is a community, a school, a tree, a young person who decided to act.",
    stats: [
      { value: "+300", label: "volunteers mobilised" },
      { value: "+2,000", label: "trees planted" },
      { value: "+23", label: "environmental projects" },
      { value: "+50", label: "communities reached" },
      { value: "+200", label: "education actions" },
    ],
  },

  projects: {
    eyebrow: "Featured projects",
    title: "Action on the ground, today.",
    subtitle: "Three projects where Planeta Consciente is active right now.",
    learnMore: "Learn more",
    items: [
      {
        tag: "Environmental mobilisation",
        name: "EKOAR",
        title: "When a community breathes better, the whole neighbourhood changes.",
        desc: "An initiative for environmental mobilisation, community awareness and waste management — because the environment starts at your doorstep.",
        impact: "Awareness · Waste · Communities",
      },
      {
        tag: "Education",
        name: "Angola Verde",
        title: "Educating a generation that thinks Angola in green.",
        desc: "An environmental education, sustainability and community mobilisation programme focused on schools, youth and local leaders.",
        impact: "Schools · Training · Sustainability",
      },
      {
        tag: "Climate adaptation",
        name: "Global Center on Adaptation",
        title: "The voice of African youth in the climate agenda.",
        desc: "A collaboration to amplify youth participation in climate adaptation strategies, in Angola and across the region.",
        impact: "Youth · Policy · Adaptation",
      },
    ],
  },

  trees: {
    eyebrow: "Tree planting",
    titleHighlight: "+2,000",
    titleAfter: "trees planted — and counting.",
    p1: "Every tree we plant is a lesson in environmental education, a promise of shade, a community taking responsibility for its place.",
    p2: "To plant is to regenerate. To plant is to educate. To plant is to accept that Angola's climate future starts today, with our hands in the soil.",
    cta: "Plant with us",
    chips: ["Regeneration", "Practical education", "Active communities", "Climate future"],
  },

  volunteers: {
    eyebrow: "Youth volunteering",
    title: "Volunteering changes the community. And it changes you.",
    subtitle:
      "It's not just helping. It's learning, leading, serving, becoming part of Angola's environmental transformation.",
    bullets: [
      "Learn on the ground with those already doing the work.",
      "Lead actions in your neighbourhoods and schools.",
      "Gain real experience in environmental projects.",
      "Build a network with active youth from Luanda to Lisbon.",
    ],
    cta: "I want to volunteer",
  },

  partners: {
    eyebrow: "Partners",
    title: "We walk together.",
    subtitle:
      "We work with national and international institutions that share our environmental urgency.",
    list: [
      "People In Need",
      "Global Center on Adaptation",
      "Kuena",
      "Luanda Shapers",
      "Government of Angola",
      "CETAC",
      "Minuto Verde",
    ],
    collabTitle: "How we can collaborate",
    collabAreas: [
      "Environmental education",
      "Community mobilisation",
      "Awareness campaigns",
      "Circular economy projects",
      "Climate adaptation",
      "Tree planting",
      "Volunteer activation",
      "Community environmental actions",
    ],
  },

  participate: {
    eyebrow: "How to take part",
    title: "There's a place for you in this movement.",
    subtitle: "Pick the path that fits — and we'll take the next step together.",
    items: [
      {
        who: "Young volunteers",
        msg: "Join the team on the ground every week.",
        action: "I'm volunteering",
      },
      {
        who: "Companies",
        msg: "We power your ESG agenda with real, measurable environmental impact.",
        action: "Talk partnership",
      },
      {
        who: "NGOs",
        msg: "We co-create community, educational and climate projects.",
        action: "Co-create project",
      },
      {
        who: "Public institutions",
        msg: "We align actions with public programmes and municipalities.",
        action: "Align action",
      },
      {
        who: "Universities",
        msg: "We build bridges between research, youth and territory.",
        action: "Collaborate",
      },
      {
        who: "Communities",
        msg: "We bring training, planting and mobilisation to your neighbourhood.",
        action: "Bring to community",
      },
    ],
  },

  form: {
    eyebrow: "Get in touch",
    title: "Let's build together.",
    subtitle:
      "Tell us who you are and what brought you here. Our team replies within a few business days.",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone / WhatsApp",
      org: "Organisation (optional)",
      interest: "Type of interest",
      message: "Message",
      submit: "Send message",
      submitting: "Sending...",
      requiredHint: "Required fields marked with *",
    },
    interests: [
      "I want to volunteer",
      "I want to become a partner",
      "I want to support an initiative",
      "I want to learn more about projects",
      "Other",
    ],
    success: "Message sent successfully. Our team will contact you soon.",
    error:
      "We could not send your message. Please try again or email contacto@planetaconsciente.org.",
    placeholderMessage: "Tell us a bit about you, your neighbourhood or your organisation...",
    directContact: "Or email us directly at",
  },

  finalCta: {
    title: "Change won't wait. It starts with you.",
    subtitle: "Explore the projects, join the movement, plant with us.",
    primary: "Explore our projects",
    secondary: "Join the movement",
  },

  footer: {
    tagline: "United for a better planet.",
    navTitle: "Navigate",
    contactTitle: "Contact",
    followTitle: "Follow",
    rights: "All rights reserved.",
    builtWith: "Built with young energy in Luanda · Benguela · Lisbon",
  },

  langSwitch: { pt: "PT", en: "EN", a11y: "Change language" },
};
