// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "./scripts/sitemap.mjs";
import urls from "./src/data/urls.json" with { type: "json" };

// The address of the site once its domain points to GitHub Pages. Until the launch, the deployment
// workflow builds the github.io preview under a base path, from the SITE_URL and BASE_PATH
// variables of the repository (docs/technical-choices.md, Deployment).
const site = process.env.SITE_URL || "https://exile-market.sylent.tools";
const base = process.env.BASE_PATH || "/";

/** Prefixes a redirect destination with the base, which Astro leaves out. */
const to = (/** @type {string} */ path) => `${base.replace(/\/$/, "")}${path}`;

export default defineConfig({
  site,
  base,
  // GitHub Pages serves legal/index.html at /legal/ and redirects /legal to it: links and
  // canonical URLs end with a slash, in the development server too.
  trailingSlash: "always",
  // The former addresses that lead to a new page (src/data/urls.json): GitHub Pages has no
  // server-side redirects, so Astro writes a page that leads on at once.
  redirects: Object.fromEntries(
    Object.entries(urls.redirects).map(([from, path]) => [from, to(path)]),
  ),
  integrations: [sitemap()],
  // Self-hosted fonts, downloaded at build time and served by the site itself (docs/branding.md,
  // Typography). The tokens --font-text, --font-title and --font-subtitle read these variables.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Manrope",
      cssVariable: "--font-manrope",
      weights: [400, 600, 700, 800],
      styles: ["normal"],
      display: "swap",
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Cormorant Garamond",
      cssVariable: "--font-cormorant",
      weights: [500],
      styles: ["italic"],
      display: "swap",
      fallbacks: ["serif"],
    },
  ],
});
