# Technical choices

The technical choices of the [roadmap](../roadmap.md), with their reasons and the alternatives rejected. They come from the template, first used for sylent.art (2026-10): confirm or adapt them in the specifications step, and record each change here with its date.

## Stack

| Topic | Choice | Reason |
|---|---|---|
| Hosting | GitHub Pages, with a custom domain | Free for a public repository, no server to maintain, HTTPS included. Limits in [external-services.md](external-services.md). |
| Static site generator | [Astro](https://astro.build/) 7, static output | Built-in redirects, validated content collections, image optimization and zero JavaScript by default. Its syntax (HTML, CSS, a little JavaScript) is easy to read and edit. |
| Runtime and packages | Node.js 24 LTS, npm (`package-lock.json`) | The version is pinned in `.nvmrc` and in `engines` of `package.json`, and CI uses the same one. |
| Styles | Native CSS, design tokens as CSS custom properties | See [Styles](#styles). |
| Content | JSON and Markdown files in `src/content/<lang>/`, interface texts in `src/i18n/<lang>.json` | The content stays out of the layouts and components, one file per language (see [Languages](#languages) and [Content](#content)). |
| Formatter | Prettier, with `prettier-plugin-astro` | One tool for Astro, CSS, JavaScript, JSON and the content. The documentation (`*.md` at the root, `docs/`, `.claude/`) is left out (`.prettierignore`): Prettier would pad every table to its widest cell. |
| Linters | ESLint with `typescript-eslint`, `eslint-plugin-astro` and its strict accessibility rules (`jsx-a11y-strict`, with `eslint-plugin-jsx-a11y-x`); Stylelint with `stylelint-config-standard` and `stylelint-config-html`; `astro check` | Errors and missing accessibility attributes in the templates, invalid or duplicate CSS (the `<style>` blocks included), type errors and wrong component props. `eslint-plugin-jsx-a11y-x` is the maintained fork that `eslint-plugin-astro` supports. |
| Link check | linkinator on the built site, plus `scripts/check-urls.mjs` | See [Addresses check](#addresses-check). |
| Width check | `scripts/check-overflow.mjs`, in the Chromium of [Playwright](https://playwright.dev/) | See [Width check](#width-check). |
| Brand images | `scripts/brand-images.mjs`, in the same Chromium | The favicon and the preview card made again in one command when the brand changes. See [Brand images](#brand-images). |
| Audience measurement | [GoatCounter](https://www.goatcounter.com/), pinned script | No cookie, no banner, as on sylent.art. See [external-services.md](external-services.md#goatcounter-audience-measurement). |
| Deployment | GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`, with `withastro/action` and `actions/deploy-pages` | A merged pull request is deployed without a manual step. See [Deployment](#deployment). |
| Checks in CI | GitHub Actions (`.github/workflows/ci.yml`) on every pull request | Runs `npm run check`, the same command as before a commit. |
| Updates | Dependabot (`.github/dependabot.yml`), weekly | npm packages (minor and patch grouped) and GitHub Actions. The `dependency-reviewer` subagent reads its pull requests on demand and recommends, for each, to merge or to set aside (kept on 2026-10-31 to see how it works, before deciding between it and manual updates with security alerts only). |

Rejected:

- **Eleventy**: just as capable for a static site, but the redirects, image conversion and content validation have to be assembled from plugins by hand.
- **Hugo**: one fast binary, but its Go template language is harder to read and edit.
- **Hand-written HTML**: the header and footer copied in every page, and nothing checks the content or the redirects.
- **An application framework (Vue, React, Laravel)**: it needs a server or ships a JavaScript application, for a handful of static pages.

## Astro

- **URLs with a final slash**: Astro writes each page as a folder with an `index.html` (`build.format: "directory"`), and GitHub Pages serves `legal/index.html` at `/legal/` and redirects `/legal` to it: the links and canonical URLs end with a slash, and `trailingSlash: "always"` makes the development server behave the same way.
- **Redirects**: `src/data/urls.json` lists the former paths: those kept as pages, those redirected to a new page, and those dropped. `astro.config.mjs` reads its `redirects` and, since GitHub Pages has no server-side redirects, Astro writes for each a page with a canonical link and an immediate `<meta http-equiv="refresh">`. Astro doesn't add the base path to their destination: `astro.config.mjs` adds it. A redirect computed from the content (a former id in a content file) can be written by a dynamic page with `Astro.redirect`: add it to the check.
- **Sitemap and `robots.txt`**: `scripts/sitemap.mjs`, a small integration, writes `sitemap.xml` once the site is built, from the canonical link of every page that points to itself: the redirect pages and the not-found page are left out by construction, and a new page is listed without changing the script. `src/pages/robots.txt.ts` gives its address. Rejected: `@astrojs/sitemap`, whose filter would have to list every redirect.
- **Open Graph**: `src/layouts/base-layout.astro` gives every page the tags that LinkedIn, Facebook and the messaging apps read to show a card for a link (`og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`, `twitter:card`) and one image, `src/assets/brand/social-card.png`, converted to JPEG at 1200 × 630 (the networks read JPEG everywhere, WebP not always); its name carries a hash of its content, so that a new image gets a new URL. The URLs are absolute, built from `site` and the base.
- **Not-found page**: `src/pages/404.astro`, written as `404.html`, which GitHub Pages serves for every path without a page, with `noindex` and no canonical link.
- **Images**: the `astro:assets` `<Image>` component converts the images to WebP at the size they are shown and sets their width and height, which avoids layout shifts.
- **Fonts**: Astro's Fonts API (`fonts` in `astro.config.mjs`, `<Font />` in the layout) downloads the fonts at build time and serves them from the site itself, with a fallback adjusted to their metrics so that the text doesn't move when they load. Only fonts whose license allows self-hosting (SIL Open Font License). Manrope (400, 600, 700, 800) and Cormorant Garamond (italic 500) come from Google Fonts at build time, not from the fonts of the application, which lack the 700; only Manrope is preloaded. Both use `display: swap`: on a slow connection the text shows at once in the fallback that Astro adjusts to the font, rather than staying invisible (the mock-up used `block` for Manrope; code review, owner, 2026-11-08). The variables of the fonts are `--font-manrope` and `--font-cormorant`, which the tokens `--font-text`, `--font-title` and `--font-subtitle` read.
- **JavaScript**: none by default. The scripts the mock-up needs (animations, 3D) are chosen after it, installed with npm and bundled by Astro, without a CDN; the content never depends on them, and nothing moves when the visitor asked to reduce motion. The back-to-top control is a `<button>`, not the link of the mock-up: it only acts through a script and stays hidden without one; it then gives the keyboard focus to the name in the header, since it disappears at the top.

## Languages

English at the root and French under `/fr/` (`CLAUDE.md`, Project).

- **Addresses**: each page keeps an address in its own language (`/legal/`, `/fr/mentions-legales/`), which the table `routes` of `src/lib/i18n.ts` lists. The link between the languages and the `hreflang` links read it, since adding `/fr/` to a path isn't enough.
- **`hreflang`**: a tag in the head of the page that tells search engines the page exists in another language, so that they show each visitor their own: `<link rel="alternate" hreflang="fr" href="https://exile-market.sylent.tools/fr/">`. Each page lists both languages and itself, and `x-default`, the page for a visitor who speaks neither, is the English one.
- **Pages**: the template of a page is a component (`src/components/home-page.astro`) that takes the language, and each route is a file of a few lines, named after its URL, which calls it.
- **Same keys**: the texts of each language are typed from the English file, so a key missing in French fails `astro check`.
- **No automatic redirect**: a visitor is never sent elsewhere according to the language of their browser, and a search engine reads every page.
- **Not-found page**: GitHub Pages serves one `404.html` for every path, so it holds both languages, without JavaScript.
- **Redirect pages**: Astro's own page, in English, the language of the root. The French one of the template (`src/pages/3xx.astro`, with the experimental option `redirectPage`) was removed on 2026-11-06: the site has no redirect, and it would have been a page in the wrong language for half of the visitors.

Rejected: **Astro's i18n routing** (`i18n` in `astro.config.mjs`): its helpers assume the same path in each language, which the French and English addresses of the legal notice aren't, and the page already knows its language.

Rejected: **Fluent** (the format of the application's translations; owner, 2026-11-06): it serves sentences that change with a value at run time, such as plurals, and the page has only fixed sentences. It would add a dependency and a custom link with Astro, for a check that the typed JSON files already give.

## Home page without JavaScript

The cards of « What it does » show one text at a time, with a script. The two others are `hidden` in the HTML, so that nothing moves when the script starts, and `@media (scripting: none)` shows the three texts when there is no JavaScript. Each card is a button named by the `alt` of its image, and the block of the texts is `aria-live`, so that a screen reader reads the text that appears.

The screens of the cards (`src/assets/screens/<lang>/`) and the still image (`src/assets/video/`) come from the capture of 2026-11-13, made from the application after its audit, before the tag `v0.1.0`.

## Download buttons

Confirmed in the specifications on 2026-11-06. Changed by the owner on the wireframe, the same day. The HTML holds both links as two identical buttons, Windows first, so that the download works without JavaScript, and that is the fallback: a browser without JavaScript runs no `else`, so the page must be right before any script. A small script reads the system with `navigator.userAgent`, the only way on a static site, and replaces the buttons by the sentence for macOS or for a phone, kept in a `<template>` so that the text stays in the content files. It is inline, right after the block, so that it runs before the first paint: a bundled script runs later, and a phone would see the buttons appear then leave. Android is tested before Linux and an iPad is told from a Mac by `navigator.maxTouchPoints`. A single setting, `downloadsOpen` in `src/lib/application.ts`, shows « Coming soon » in place of all this until the tag: no script runs then, and turning it on is one line. The addresses are `https://github.com/aunimhsn/rust-exile-market/releases/latest/download/<stable name>`, which never change from one version to the next, so that a release needs no change here.

Read on 2026-11-06 with the identity of each system, on four download pages: the home page of VS Code, Discord and Obsidian show one button for the detected system, and the download page of VS Code shows every system with the detected one highlighted. The last pattern is the one kept: with two systems and one page, the other button costs little and survives a wrong detection. The home page of VS Code offered Linux to an Android phone, hence the order of the tests. These pages show what is done, not what converts: no figure was found.

Rejected: one button for the detected system, whose other systems must then live elsewhere; a page after the click, as in `backlog.md`; linking to the release page, where a new player has to pick among several archives; a version number or a size on the page, which would go out of date, or read from the GitHub API at each visit, for little.

The stack above is confirmed for this site. The JavaScript libraries, if any, and the format of the video wait for the mock-up.

## Deployment

- `.github/workflows/deploy.yml` follows the [Astro guide](https://docs.astro.build/en/guides/deploy/github/): `withastro/action` installs, builds and uploads `dist/`, then `actions/deploy-pages` publishes it. In the repository's **Settings → Pages**, the source is **GitHub Actions**.
- **Until the launch**, the site is checked at `https://<owner>.github.io/<repository>/`, a project site under a base path: the repository variables `SITE_URL` (`https://<owner>.github.io`) and `BASE_PATH` (`/<repository>`), in **Settings → Secrets and variables → Actions → Variables**, are read by `astro.config.mjs`. Every internal link goes through `href()` (`src/lib/url.ts`), and the layout adds `noindex` under a base.
- **At the launch**, the custom domain is set in the Pages settings with HTTPS enforced, and the two variables are deleted: the site is then built for the `site` of `astro.config.mjs`, at the root. A workflow with `actions/deploy-pages` ignores a `CNAME` file: the domain lives in the Pages settings only.
- Only the `deploy` job may write to GitHub Pages (`pages: write`, `id-token: write`); the build job, which runs the dependencies, only reads the repository.
- A ruleset on `main` requires a pull request, merged by squash only, whose `check` job passes, and forbids force pushes and deleting the branch.

## Styles

- **Design tokens** are the named values of the visual design: `--color-accent: #1d4ed8`, `--space-4: 16px`, `--size-title: 28px`. They are declared once in `src/styles/tokens.css`, and every component uses them (`color: var(--color-accent)`): changing the main color means changing one line.
- The **breakpoints** can't be CSS variables, since a media query doesn't read them: they are written as numbers in the media queries, and listed in `docs/branding.md`.
- Component styles live in the `<style>` block of each Astro component, which Astro scopes to that component: a class name in one component cannot break another. A component styles the inside of a child (an SVG logo) with `:global(...)` inside one of its own selectors.
- The classes shared by every page (`.wrap`, `.visually-hidden`…) are in `src/styles/global.css`.
- `main` clips what runs past its sides (`overflow-x: clip`), which makes no scroll container, so the sticky blocks keep working: anything that may run past the edge of the screen goes inside `main`.

## Content

- `src/i18n/<lang>.json`: the interface texts (name of the site, footer, skip link, back-to-top button), so that no text is hard-coded in a component.
- `src/content/<lang>/<page>.json`: the texts of each page (`home.json`, `legal.json`, `not-found.json`), imported as JSON.
- A list of similar entries (offers, articles, projects) becomes an Astro content collection, one Markdown file per entry, whose front matter is validated by a schema in `src/content.config.ts`: a missing field fails the build instead of publishing a broken page.
- `src/data/urls.json`: the former addresses and their redirects.
- `src/lib/application.ts`: the addresses of the application, read by the footer and the download buttons.
- A space between an expression and an element on the next line is lost at the build: `{text}` then a line break then `<span>` gives « textword » (seen with Astro 7 on the headline, 2026-11-08). Such a space is written `{" "}`.
- `src/lib/url.ts`: every internal link goes through `href(routes.legal.en)`, which adds the base path of the preview.

## Addresses check

- **linkinator** serves the built site (`dist/`) as a static host would and follows every internal link of every page, CSS and anchors included (`linkinator.config.json`). External links are skipped, so that a slow third-party site doesn't break the CI.
- **`scripts/check-urls.mjs`** checks what no link shows: every former address of `src/data/urls.json` resolves (a page, or a redirect to the given page, which exists), the dropped ones are not built, the not-found page is built and holds both languages, the sitemap lists only pages, every page has the Open Graph tags of its own title and canonical link and a built image, and every page has the `lang` of its address, the `hreflang` links of both languages, each pointing back to the other, and a link to the other language.
- A build under a base is checked with `node scripts/check-urls.mjs dist /<base>`; linkinator needs the build served under the base (copy `dist/` into a `<base>` folder of a temporary directory and run it there).
- Rejected: **lychee**, faster, but a Rust binary installed apart from npm.

## Width check

- **Why**: on sylent.art, a large faded word ran past the right edge of the screen; `overflow-x: hidden` on the body hid it on a computer, but Chrome on Android still widened the page and left a black band. Only a browser that lays the page out can see it.
- **`scripts/check-overflow.mjs`** serves `dist/` as GitHub Pages would, loads every page (the not-found page included, the redirect pages left out) in the Chromium of Playwright as on a phone (320, 360 and 412 px, `isMobile`), then on a computer (1024 and 1440 px), scrolls it to the bottom, and fails if the page got wider than the screen, if an element marked `data-one-line` (a large title) takes more than one line, or if a script throws. A value on `data-one-line` gives the width of the screen from which the element must hold on one line (`data-one-line="345"`), and an element kept on one line by CSS can't wrap, so its text is also measured, and the check fails when the first ancestor that clips it, or the screen, cuts it. Only the local server is reached.
- **Playwright** (the library, without its test runner, a development dependency): its Chromium is downloaded apart, headless only, once with `npx playwright install --only-shell chromium` locally, at every run with `--with-deps` in CI. Chromium, since the bug showed on Android, whose browsers are mostly built on it.

## Brand images

- **`scripts/brand-images.mjs`** draws, in the same Chromium, the images that come from the brand assets ([branding.md](branding.md#brand-assets)): from `src/assets/brand/icon.svg`, `public/favicon.svg`, `public/favicon.ico` (16, 32 and 48 px, the PNG images in an ICO file written by the script) and `public/apple-touch-icon.png` (180 px, with a margin on the black of the page, since iOS shows no transparency); from `src/assets/brand/social-card.html`, a page of 1200 × 630 px designed in the style of the site, `src/assets/brand/social-card.png`. The images are committed; run `npm run brand:images` again after changing a source.
- Rejected: a favicon generator site (a manual step, to redo by hand), and an image library such as sharp (another dependency, while Playwright is already there).

## Video of the first screen

- **A composition, not an edit** (`docs/mockups/video/hot-a2.js`): each image is a function of the time only, so that the result doesn't depend on the speed of the machine. `render.mjs` draws it frame by frame in a headless browser (Three.js on SwiftShader), then encodes it in two passes, H.264 and VP9, under 3 MB, with its still image at 55 % of the video.
- **The renders stay out of Git** (`outputs/2026-11-06-video/`), except the two the page shows, copied as `src/assets/video/deck-<lang>.webm` and `.mp4` (2.5 MB each). Imported by `src/components/hero-video.astro`, their names carry a hash of their content: a new capture gets a new address, and no browser keeps the old one. Each replacement adds about 10 MB to the history of the repository, so the video is replaced only at the launch.
- **The still image stays under the video**: an `<img>` with its sizes and its `alt` remains what the browser paints first and what shows without JavaScript; the `<video>` lies over it, transparent until it has a frame. A `poster` would have served one size to every screen.
- **The script starts the video**, rather than the `autoplay` attribute, which ignores reduced motion: with `preload="none"`, a visitor who asked to reduce motion downloads nothing unless they press play. The video stops out of sight and starts again in sight, unless the visitor paused it. WebM (VP9) comes first, MP4 (H.264) for the browsers that can't read it.
- **One button** for play and pause, restyled by a class, so that it keeps the keyboard focus when its state changes.
- **The capture** (`docs/mockups/video/capture/`): the application runs in a virtual KWin session and receives the item through its clipboard. It needs the release binary of the application in `target/release/` next to the scripts. `run-deck.sh` takes the card of the video (`out-deck/`), `run-screens.sh` the three screens of the page in both languages (`out-screens/`), from the item texts of `items-deck/` and `items-screens/`. `common.sh` holds what they share: it stops without the binary, empties the folder of the images first, and fails a run that answered with an error or made fewer images than expected; a click that misses after a change of the interface still needs an eye on the images. The session has its own `XDG_RUNTIME_DIR`: otherwise a portal started on its private bus takes over the document portal of the desktop. Two traps, found on 2026-11-13: a shot shows the window as it was one or two paints before, so the pointer moves over the status line before each shot; and the application starts on the item left in the clipboard, so a text that isn't an item goes there first. The path of the runtime folder must stay under 108 characters (the limit of a socket), which rules out a run from a deep temporary folder.
- **To capture again** when the interface changes: the two scripts, then the card copied to `outputs/2026-11-06-video/assets/<lang>/s-headhunter.png`, `node docs/mockups/video/render.mjs hot-a2 en` and `fr` with the mock-up server running, and the renders copied to `src/assets/video/` (`deck-<lang>.webm`, `.mp4`, and the `.jpg` as `still-<lang>.jpg`). The ten small screens of the fan aren't scripted: they stay those of 2026-11-08.

## Light motion

- **The red of the grid** is a `::after` of the grid, next to its grey `::before` (`src/styles/global.css`), so that the pages hold no extra element and the first screen, the band « What it does », the legal notice and the not-found page share one rule. The script is in `src/layouts/site-layout.astro`, since every page with a grid goes through it. A mouse only, never with reduced motion. It keeps the last place of the mouse, so that the red also follows a scroll under a still mouse, with one update per frame at most and none without a mouse; a finger or a pen drops that place.
- **The entrance of the large sentences** is two inline scripts in `src/components/home-page.astro`: one before the sentences, which moves them out of the screen before the first paint, for the reason of the download buttons (a bundled script runs later, and a sentence already on the screen would jump); one right after the last sentence, which brings them in. Inline, they can't fail to download while the sentences wait out of the screen, and the second doesn't wait for `DOMContentLoaded`, which a script to download would delay (code review of 4d). Without JavaScript, or with reduced motion, the sentences never leave their place. On paper too.

## Burst of shards

Three.js (`InstancedMesh`, 420 shards, 110 on a phone), behind the first screen only: it stops once out of sight, freezes on a still image if the machine can't follow, and stays still when the visitor asked to reduce motion. The mock-up loads Three.js from a CDN; the build takes it from npm, so that the site depends on no third party at run time.

The script waits for the `load` event, and downloads nothing without WebGL 2: Three.js is the heaviest file of the page (about 540 kB, 132 kB compressed, with only the parts the burst uses), hence `chunkSizeWarningLimit` in `astro.config.mjs`, since its renderer can't be cut further. The choice of the visitor on motion is read once and then followed by its `change` event: read at every image, Chromium no longer sends that event, and the burst didn't start again when the visitor turned motion back on.

## Commands

Run `npm ci` first, and `npx playwright install --only-shell chromium` once. They are also in the `scripts` of `package.json`.

| Command | What it does |
|---|---|
| `npm run dev` | Local development server, reloads on every change (`http://localhost:4321`). |
| `npm run build` | Production build to `dist/`; must finish without errors or warnings. |
| `npm run preview` | Serves the production build of `dist/` locally. |
| `npm run format` | Formats every file with Prettier. |
| `npm run format:check` | Checks the formatting without changing files. |
| `npm run lint` | `astro check`, ESLint and Stylelint. |
| `npm run check:links` | linkinator and `scripts/check-urls.mjs` on `dist/` (after `npm run build`). |
| `npm run check:overflow` | The width of every page on a phone and a computer (after `npm run build`). |
| `npm run check` | Everything run before a commit and in CI: format, lint, build, links, width. |
| `npm run brand:images` | The favicon, the iPhone icon and the preview card, from the brand assets. |
| `python3 docs/mockups/serve.py <port>` | Serves the repository root without cache for the mock-up. The port of this project: `8770`. |

## Exceptions to the naming conventions

Imposed by Astro or the tools, everything else in kebab-case:

- `src/pages/404.astro`: the name Astro gives the not-found page; `src/pages/robots.txt.ts`, named after the file it writes.
- The pages are named after their URL, in the language of the page (`src/pages/legal.astro`, `src/pages/fr/mentions-legales.astro`); dynamic routes use brackets (`src/pages/offres/[offer].astro`).
- Configuration files keep the names the tools look for: `astro.config.mjs`, `src/content.config.ts`, `eslint.config.js`, `.prettierrc`, `.prettierignore`, `.stylelintrc.json`, `linkinator.config.json`, `.nvmrc`, `tsconfig.json`, `.vscode/extensions.json` (the VS Code extensions of Astro, Prettier, ESLint and Stylelint, proposed when the folder is opened).
- Component files stay in kebab-case (`src/components/site-header.astro`), although the Astro documentation names them in PascalCase; they are imported under a PascalCase name (`import SiteHeader from ...`), as Astro requires.
