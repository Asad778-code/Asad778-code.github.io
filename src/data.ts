const B = import.meta.env.BASE_URL;

export const LINKS = {
  email: "asad0236itachi@gmail.com",
  upwork: "https://www.upwork.com/freelancers/~01cf6ad1c26268d695",
  fiverr: "https://www.fiverr.com/asadali289",
  linkedin: "https://www.linkedin.com/in/asad-ali-3b2017327/",
};

export const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const ROLES = ["Framer developer", "Webflow developer", "WordPress developer", "QA tester"];

export type Project = { title: string; platform: string; summary: string; image: string; url: string; span: string; aspect: string };

export const PROJECTS: Project[] = [
  { title: "Nordic Nexuz", platform: "Framer", summary: "B2B lead generation site with a CMS blog and animated dark design.", image: `${B}img/nordic.webp`, url: "https://nordicnexuz.com/", span: "md:col-span-7", aspect: "aspect-[4/3] md:aspect-[16/11]" },
  { title: "Diamant Versatile", platform: "Framer", summary: "Collectible furniture catalogue with CMS filters and a page per piece.", image: `${B}img/diamant.webp`, url: "https://diamantversatile.com/", span: "md:col-span-5", aspect: "aspect-[4/3] md:aspect-auto md:h-full" },
  { title: "Malik Forex Academy", platform: "WordPress", summary: "Online course platform with an LMS, registration and student dashboard.", image: `${B}img/malik.webp`, url: "https://malikfxacdemy.com/", span: "md:col-span-5", aspect: "aspect-[4/3] md:aspect-auto md:h-full" },
  { title: "Green Flow Solution", platform: "WordPress", summary: "HVAC and electrical services site with a knowledge centre search.", image: `${B}img/greenflow.webp`, url: "https://greenflowsolution.com/", span: "md:col-span-7", aspect: "aspect-[4/3] md:aspect-[16/11]" },
];

export const SERVICES = [
  { title: "Framer websites", detail: "Figma to Framer, CMS, animations, SEO settings", tag: "Build", meta: "From 1 page", image: `${B}img/nordic-thumb.webp`, topic: "Framer" },
  { title: "Webflow builds", detail: "Clean classes, CMS, interactions, every breakpoint", tag: "Build", meta: "From 1 page", image: `${B}img/diamant-thumb.webp`, topic: "Webflow" },
  { title: "WordPress work", detail: "Elementor, theme changes, bug fixes, LMS setup", tag: "Build / Fix", meta: "From 1 fix", image: `${B}img/malik-thumb.webp`, topic: "WordPress" },
  { title: "Website QA testing", detail: "Manual tests across browsers, clear bug reports", tag: "Test", meta: "From 5 pages", image: `${B}img/greenflow-thumb.webp`, topic: "QA" },
];

export const GALLERY = [
  { src: `${B}img/x1.webp`, alt: "Nordic Nexuz about page", rotate: -3 },
  { src: `${B}img/x2.webp`, alt: "Diamant Versatile collection grid", rotate: 2 },
  { src: `${B}img/x3.webp`, alt: "Nordic Nexuz results page", rotate: 3 },
  { src: `${B}img/x4.webp`, alt: "Diamant Versatile product page", rotate: -2 },
  { src: `${B}img/x5.webp`, alt: "Malik Forex Academy course section", rotate: -2 },
  { src: `${B}img/x6.webp`, alt: "Green Flow Solution commercial section", rotate: 3 },
];

export const STATS = [
  { value: 4, suffix: "", label: "Sites launched end to end" },
  { value: 3, suffix: "", label: "Platforms: Framer, Webflow, WordPress" },
  { value: 8, suffix: "", label: "Checks before every handoff" },
];
