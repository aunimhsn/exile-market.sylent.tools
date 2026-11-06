// The languages of the site: English at the root, French under /fr/ (specs.md, URLs and redirects).
// Each page keeps an address in its own language, so the link between the languages reads this
// table instead of adding /fr/ to the path.
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";

export const languages = ["en", "fr"] as const;
export type Lang = (typeof languages)[number];

/** The language search engines show to a visitor who speaks neither: the page at the root. */
export const defaultLang: Lang = "en";

/** The other language, for the link between them. */
export const otherLang = (lang: Lang): Lang => (lang === "en" ? "fr" : "en");

// Typed from the English file: a key missing in French fails `astro check`.
const texts: Record<Lang, typeof en> = { en, fr };

/** The interface texts of a language (src/i18n/). */
export const ui = (lang: Lang) => texts[lang];

/** The address of each page in each language, without the base path. */
export const routes = {
  home: { en: "/", fr: "/fr/" },
  legal: { en: "/legal/", fr: "/fr/mentions-legales/" },
} as const satisfies Record<string, Record<Lang, string>>;

export type PageId = keyof typeof routes;
