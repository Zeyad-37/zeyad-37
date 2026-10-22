// Facts shared by every variant. The A/B/C test compares design and tone, so
// anything factual (years, companies, prices, quotes) lives here once and every
// variant renders the same values.

export const person = {
  name: 'Zeyad Gasser',
  handle: 'zeyad-37',
  initials: 'ZG',
  title: 'Staff / Principal Android Engineer',
  base: 'Barcelona',
  timezone: 'CET',
  years: 11, // TODO(Zeyad): confirm. The design says 11+, your profile says 13.
  companies: ['Trainline', 'Hopper', 'Welltech'],
  stack: ['Kotlin', 'KMP', 'Compose'],
  email: 'zeyad.gasser@gmail.com',
};

export const links = {
  linkedin: 'https://www.linkedin.com/in/zeyad-gasser/',
  github: 'https://github.com/Zeyad-37',
  medium: 'https://medium.com/@zeyad.gasser',
  cv: 'https://www.linkedin.com/in/zeyad-gasser/', // TODO(Zeyad): link a CV PDF.
  // TODO(Zeyad): replace with a Cal.com or Calendly link once it exists.
  booking: '#contact',
};

export type Work = {
  key: string;
  title: string;
  role?: string;
  summary: string;
  tags: string[];
  href: string;
};

export const work: Work[] = [
  {
    key: 'trainline',
    title: 'Trainline Android re-platform',
    role: 'Principal Engineer · 2021–23',
    summary:
      'Led the move to a modular, MVI-based architecture across a 40-engineer platform, and started the community initiatives that kept it healthy.',
    tags: ['Kotlin', 'MVI', 'Gradle'],
    href: links.linkedin,
  },
  {
    key: 'hopper',
    title: 'Hopper — Staff Android',
    summary: 'Price-prediction flows and a shared design system at scale.',
    tags: ['Compose', 'Design system'],
    href: links.linkedin,
  },
  {
    key: 'flux',
    title: 'Flux & KMP Playground',
    summary: 'Open-source Flow-based MVI pattern and Kotlin Multiplatform experiments.',
    tags: ['Kotlin', 'KMP'],
    href: 'https://github.com/Zeyad-37/Flux',
  },
];

export type Service = { title: string; summary: string; price: string };

// TODO(Zeyad): prices come from the design samples. Confirm before launch.
export const services: Service[] = [
  { title: 'Fractional / Staff Android lead', summary: 'Senior technical leadership 2–3 days a week.', price: 'from €6,500 / month' },
  { title: 'Architecture consulting', summary: 'Modularization, MVI and Compose migration roadmaps.', price: 'from €1,200 / day' },
  { title: 'KMP migration', summary: 'Share business logic across Android and iOS, incrementally and safely.', price: 'scoped per project' },
  { title: 'Code & architecture audit', summary: 'A two-week review with a prioritized action plan.', price: '€4,800 fixed' },
  { title: 'Mentoring & coaching', summary: '1:1 for seniors stepping into staff roles.', price: '€180 / session' },
  { title: 'Speaking & workshops', summary: 'Kotlin, KMP and architecture talks for teams and conferences.', price: 'on request' },
];

export const process = [
  { title: 'Discover', summary: 'A free call to understand the team, codebase and goals.' },
  { title: 'Assess', summary: 'Read the code, talk to engineers, map the real constraints.' },
  { title: 'Deliver', summary: 'Hands-on with the team: pairing, reviews, decisions written down.' },
  { title: 'Hand over', summary: 'The team owns it. I leave documentation, not dependency.' },
];

// TODO(Zeyad): confirm these are real recommendations you're happy to quote.
export const testimonials = [
  {
    quote:
      'The impact he had on moving the Android platform to a better place — from app architecture to community initiatives — was very tangible.',
    by: 'Engineering leader, Trainline',
  },
  {
    quote: 'He has led by example and shown his peers how to be effective as both a developer and a tech lead.',
    by: 'Former colleague',
  },
];

// TODO(Zeyad): replace profile links with the exact article URLs.
export const writing = [
  { title: 'Flux: a Flow-based MVI pattern for multi-module Android apps', where: 'Medium', href: links.medium },
  { title: 'Surface-level learning is holding your team back', where: 'LinkedIn', href: links.linkedin },
  { title: 'Notes from my Kotlin Multiplatform playground', where: 'GitHub', href: links.github },
];

export const about =
  "I'm an Android engineer who cares as much about how a team works as how the code compiles. Egyptian, based in Barcelona. I write about Kotlin and architecture on Medium and tinker with Kotlin Multiplatform in the open.";

export const variants = ['editorial', 'engineering', 'warm'] as const;
export type Variant = (typeof variants)[number];
