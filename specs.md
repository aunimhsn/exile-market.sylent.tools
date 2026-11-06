# Specifications

<!--
Describe what the site says and does, before writing any code (process.md, Specifications).
Write behavior and content, not implementation: technical choices go in docs/technical-choices.md.
Remove or add sections as needed.
-->

## Goal

<!-- What the site is for, why now, and what replaces what (a former site?). -->

## Audiences

<!-- Who visits, who decides, what each one must find before acting. -->

## Value proposition

<!-- The promise, the differentiators, and what proves them (no invented proof). -->

## Main action

<!-- What the visitor should do (get in touch, call, buy elsewhere…), and what happens after it. -->

## Content tree

<!-- The contents and how they are grouped, as agreed on the Excalidraw drawing (docs/wireframes/). -->

## Pages

<!-- One subsection per page type: its blocks, in order, what each shows; the layout agreed on the wireframes, then "the mock-up is the reference". -->

## URLs and redirects

<!-- The path of every page, in the language of the page, ending with a slash (/fr/mentions-legales/).
The former URLs: kept as pages, redirected (to which page), or dropped; written in src/data/urls.json. -->

| URL | Page or redirect |
|---|---|
| `/` | Home page, in English |
| `/fr/` | Home page, in French |
| `/legal/` | Legal notice, in English |
| `/fr/mentions-legales/` | Legal notice, in French |

Each page links to the same page in the other language, without any automatic redirect. A path without a page shows the not-found page, in both languages.

## Content

<!-- Where each text comes from, its tone, its length; the content still to provide. -->

## Brand assets

<!-- What the owner provides, from docs/branding.md (Brand assets), and what is still missing. -->

## Contact details and legal information

<!-- The public contact details, the legal notice (publisher, host), and a privacy policy if the site collects data (a form, analytics). -->

## Constraints

- The site is static, hosted on GitHub Pages: no server, no server-side redirects.
- Every page has a title, a meta description, the language of its address (`lang`), and is usable at phone width.
- Accessibility: semantic HTML, contrast WCAG AA, keyboard access, reduced motion respected.
