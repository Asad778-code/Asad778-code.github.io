const B = import.meta.env.BASE_URL;

export const LINKS = {
  email: "asad0236itachi@gmail.com",
  upwork: "https://www.upwork.com/freelancers/~01cf6ad1c26268d695",
  fiverr: "https://www.fiverr.com/asadali289",
  linkedin: "https://www.linkedin.com/in/asad-ali-3b2017327/",
  cv: `${B}Asad-Ali-CV.pdf`,
};

export const PORTRAIT = `${B}img/asad.webp`;

export const ROLES = ["Framer", "Webflow", "WordPress", "QA testing"];

export type Project = {
  no: string;
  title: string;
  platform: string;
  year: string;
  summary: string;
  image: string;
  url: string;
  span: string;
  aspect: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  { no: "01", title: "Money Days", platform: "WordPress", year: "2026", summary: "Currency-exchange site for a Toronto money changer — live exchange-rate board, two store locations, calculator and compliance pages.", image: `${B}img/moneydays.webp`, url: "https://moneydays.ca/", span: "md:col-span-12", aspect: "aspect-[16/10] md:aspect-[21/9]", featured: true },
  { no: "02", title: "Aaron Signature", platform: "WordPress", year: "2026", summary: "Toronto gold & jewellery store — live metal prices, WooCommerce shop, repair and private-loan services, multi-store setup.", image: `${B}img/aaronsignature.webp`, url: "https://aaronsignature.com/", span: "md:col-span-7", aspect: "aspect-[4/3] md:aspect-[16/11]" },
  { no: "03", title: "Nordic Nexuz", platform: "Framer", year: "2025", summary: "B2B lead-generation site with a CMS blog and an animated dark design.", image: `${B}img/nordic.webp`, url: "https://nordicnexuz.com/", span: "md:col-span-5", aspect: "aspect-[4/3] md:aspect-[16/11]" },
  { no: "04", title: "Diamant Versatile", platform: "Framer", year: "2025", summary: "Collectible-furniture catalogue with CMS filters and a page for every piece.", image: `${B}img/diamant.webp`, url: "https://diamantversatile.com/", span: "md:col-span-5", aspect: "aspect-[4/3] md:aspect-[16/11]" },
  { no: "05", title: "Malik Forex Academy", platform: "WordPress", year: "2025", summary: "Online trading-course platform with an LMS, registration and a student dashboard.", image: `${B}img/malik.webp`, url: "https://malikfxacdemy.com/", span: "md:col-span-7", aspect: "aspect-[4/3] md:aspect-[16/11]" },
  { no: "06", title: "Green Flow Solution", platform: "WordPress", year: "2025", summary: "HVAC and electrical services site with a searchable knowledge centre.", image: `${B}img/greenflow.webp`, url: "https://greenflowsolution.com/", span: "md:col-span-12", aspect: "aspect-[16/10] md:aspect-[21/9]" },
];

export type Capability = { no: string; title: string; meta: string; points: string[] };

export const CAPABILITIES: Capability[] = [
  {
    no: "01",
    title: "Websites, built end to end",
    meta: "FRAMER · WEBFLOW · WORDPRESS",
    points: [
      "From a Figma file or a rough idea to a live site: layout, CMS, animations and SEO settings.",
      "Built on whichever platform fits — Framer and Webflow for design-led sites, WordPress when it needs a CMS or a shop.",
      "Checked on every screen size before you ever see it.",
    ],
  },
  {
    no: "02",
    title: "QA testing",
    meta: "MANUAL · CROSS-BROWSER · DAILY",
    points: [
      "I test like a user and a tester at once: links, forms, speed and the edge cases people forget.",
      "You get a clear bug report, ranked by how much each issue actually hurts.",
      "It's my day job — I'm QA Master at VConekt — not a skill I picked up on the side.",
    ],
  },
  {
    no: "03",
    title: "Fixes & handover",
    meta: "WORDPRESS · SPEED · UPKEEP",
    points: [
      "A broken plugin, slow pages, a layout that fell apart after an update — I find the cause and fix it.",
      "Small changes and ongoing upkeep, without the agency price tag.",
      "Every handover comes with a short, plain note on how to update the site yourself.",
    ],
  },
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
  { value: 6, suffix: "", label: "Client sites shipped end to end" },
  { value: 3, suffix: "", label: "Platforms used daily: Framer, Webflow, WordPress" },
  { value: 100, suffix: "%", label: "Pages tested before every handover" },
];
