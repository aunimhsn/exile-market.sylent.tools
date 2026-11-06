// Checks the addresses of the built site (dist/) that no link shows, which linkinator can't see:
// - every former address of src/data/urls.json still resolves: a page for those of `pages`, a
//   redirect to the page given in `redirects`, which exists (and its anchor, if any), and the
//   not-found page for those of `dropped`;
// - the not-found page is built, and holds both languages with a link to each home page, since
//   GitHub Pages serves a single one and no link leads to it;
// - the sitemap lists only pages that exist, no redirect;
// - every page has the Open Graph tags of its own title and canonical link, and an image built
//   in the site;
// - every page says the language of its address, gives the address of both languages to the search
//   engines (hreflang), and links to the other language, each page pointing back to the other.
// Run after `npm run build`, or on a build under a base: `node scripts/check-urls.mjs <folder> <base>`.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import notFoundEn from "../src/content/en/not-found.json" with { type: "json" };
import notFoundFr from "../src/content/fr/not-found.json" with { type: "json" };
import urls from "../src/data/urls.json" with { type: "json" };

const [dist = "dist", base = ""] = process.argv.slice(2);

/** The file that GitHub Pages serves for a URL path, as written by Astro. */
const fileOf = (path) => join(dist, path, "index.html");

/** Whether a built page is a redirect page. */
const isRedirect = (html) => /http-equiv=["']?refresh/i.test(html);

/**
 * The path a redirect page leads to, or null for a regular page. Fails on a redirect whose
 * target can't be read, rather than taking it for a page.
 */
const redirectOf = (html) => {
  if (!isRedirect(html)) return null;
  const target = html.match(/content=["']?\d+\s*;\s*url=([^"'\s>]+)/i)?.[1];
  if (!target) throw new Error("a redirect page without a readable target");
  return target;
};

const errors = [];
const expected = new Map([
  ...urls.pages.map((path) => [path, null]),
  ...Object.entries(urls.redirects),
]);

for (const [url, destination] of expected) {
  const file = fileOf(url);
  if (!existsSync(file)) {
    errors.push(`${url}: no page in ${dist}/`);
    continue;
  }
  let target;
  try {
    target = redirectOf(readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${url}: ${error.message}`);
    continue;
  }
  if (target === null) {
    if (destination !== null) {
      errors.push(`${url}: a page, instead of a redirect to ${destination}`);
    }
    continue;
  }
  const { pathname, hash } = new URL(target, "https://example.com");
  const path = pathname.startsWith(`${base}/`)
    ? `${pathname.slice(base.length)}${hash}`
    : null;
  if (path !== destination) {
    errors.push(
      `${url}: redirects to ${target}, instead of ` +
        (destination ? `${base}${destination}` : "a page"),
    );
    continue;
  }
  const page = fileOf(pathname.slice(base.length));
  if (!existsSync(page)) {
    errors.push(`${url}: redirects to ${target}, which doesn't exist`);
  } else if (
    hash &&
    !readFileSync(page, "utf8").includes(`id="${hash.slice(1)}"`)
  ) {
    errors.push(`${url}: redirects to ${target}, whose anchor doesn't exist`);
  }
}

for (const url of urls.dropped) {
  if (existsSync(fileOf(url))) errors.push(`${url}: dropped, but built`);
}

if (!existsSync(join(dist, "404.html"))) errors.push("404.html: not built");

/** The content of an Open Graph tag, as Astro writes it. */
const meta = (html, property) =>
  html.match(new RegExp(`<meta property="${property}" content="([^"]*)"`))?.[1];

/** The address given for a language by the hreflang links of a page. */
const hreflang = (html, language) =>
  html.match(
    new RegExp(`<link rel="alternate" hreflang="${language}" href="([^"]*)"`),
  )?.[1];

/** The page built at an absolute address of the site. */
const pageAt = (url) => {
  const file = fileOf(new URL(url).pathname.slice(base.length));
  return existsSync(file) ? readFileSync(file, "utf8") : null;
};

/** Checks the language of a page, its hreflang links and its link to the other language. */
const languageErrors = (file, html, canonical) => {
  const path = new URL(canonical).pathname.slice(base.length);
  const lang = path.startsWith("/fr/") ? "fr" : "en";
  const other = lang === "fr" ? "en" : "fr";
  if (!html.includes(`<html lang="${lang}"`)) {
    errors.push(`${file}: the address asks for lang="${lang}"`);
  }
  if (hreflang(html, lang) !== canonical) {
    errors.push(`${file}: its hreflang ${lang} isn't its own address`);
  }
  if (hreflang(html, "x-default") !== hreflang(html, "en")) {
    errors.push(`${file}: x-default isn't the English page`);
  }
  const twinUrl = hreflang(html, other);
  const twin = twinUrl && pageAt(twinUrl);
  if (!twin) {
    errors.push(`${file}: hreflang ${other} ${twinUrl} is not built`);
    return;
  }
  if (hreflang(twin, lang) !== canonical) {
    errors.push(`${file}: ${twinUrl} doesn't point back to it`);
  }
  const twinPath = new URL(twinUrl).pathname;
  if (!html.includes(`<a href="${twinPath}" hreflang="${other}"`)) {
    errors.push(`${file}: no link to ${twinPath}`);
  }
};

/** Checks that the not-found page holds both languages, with a link to each home page. */
const notFoundErrors = (file, html) => {
  if (!html.includes(`<html lang="en"`)) {
    errors.push(`${file}: not in English first`);
  }
  if (!html.includes(notFoundEn.heading)) {
    errors.push(`${file}: no English text`);
  }
  if (!html.includes(`lang="fr"`) || !html.includes(notFoundFr.heading)) {
    errors.push(`${file}: no French text marked lang="fr"`);
  }
  for (const home of ["/", "/fr/"]) {
    if (!html.includes(`href="${base}${home}"`)) {
      errors.push(`${file}: no link to ${base}${home}`);
    }
  }
};

const redirectPages = new Set();
const htmlFiles = readdirSync(dist, { recursive: true }).filter((file) =>
  file.endsWith(".html"),
);
for (const file of htmlFiles) {
  const html = readFileSync(join(dist, file), "utf8");
  if (isRedirect(html)) {
    redirectPages.add(file);
    continue;
  }
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (meta(html, "og:title") !== title) {
    errors.push(`${file}: og:title differs from the title`);
  }
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (meta(html, "og:url") !== canonical) {
    errors.push(`${file}: og:url differs from the canonical link`);
  }
  const image = meta(html, "og:image");
  const imagePath = image && new URL(image).pathname;
  if (
    !imagePath?.startsWith(`${base}/`) ||
    !existsSync(join(dist, imagePath.slice(base.length)))
  ) {
    errors.push(`${file}: og:image ${image} is not built`);
  }
  if (file === "404.html") notFoundErrors(file, html);
  else languageErrors(file, html, canonical);
}

// The sitemap lists pages that exist, and no redirect or not-found page.
const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const { pathname } = new URL(loc);
  const file = join(pathname.slice(base.length), "index.html").replace(
    /^\//,
    "",
  );
  if (!existsSync(join(dist, file))) {
    errors.push(`sitemap.xml: ${loc} has no page`);
  } else if (redirectPages.has(file)) {
    errors.push(`sitemap.xml: ${loc} is a redirect`);
  }
}

if (errors.length > 0) {
  console.error(`Addresses that don't resolve:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(
  `${expected.size} former addresses, ${urls.dropped.length} dropped ones and ` +
    `${htmlFiles.length} built pages are right in ${dist}/.`,
);
