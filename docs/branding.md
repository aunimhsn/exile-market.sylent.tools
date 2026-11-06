# Branding

The visual identity of the site: the brand assets, then every design decision settled with the owner during the mock-up, with its tokens. Each decision is written here in the same commit as the change; the options set aside go to [Set aside](#set-aside). The tokens are applied in `src/styles/tokens.css`.

## Brand assets

What the owner provides (process.md, Specifications), where it is kept, and what is missing. The sources go in `src/assets/brand/`; the images derived from them are made by `npm run brand:images`.

| Asset | Format | File | Status |
|---|---|---|---|
| Emblem and icon, in bronze | SVG | `../rust-exile-market/assets/logo/emblem.svg`, `icon.svg`, copied to `src/assets/brand/` at step 4a | Given, the placeholders still in place |
| Full logo | PNG | `../rust-exile-market/assets/logo/exile-market.png` | Given |
| Favicon (SVG, ICO 16/32/48 px) and iPhone icon (180 px) | Made from the icon | `public/` | Made by the script at step 4a |
| Preview card of the links (1200 × 630 px) | HTML drawn to PNG, converted to JPEG by the build | `src/assets/brand/social-card.html` | Placeholder until step 4a |
| Colors | Tokens of the application | `../rust-exile-market/specs.md`, Visual style | Reference for one of the two styles of the mock-up |
| Font | Manrope, SIL Open Font License, self-hosting allowed | `../rust-exile-market/assets/fonts/` | Given |
| Video and screenshots | Silent video, images | | Asked of the owner at the launch, with their exact list |
| Public contact details and legal information | Text | `src/content/<lang>/legal.json`, from sylent.art | At step 4b |

## Principles

<!-- Three to five sentences: what the site must convey, for whom, and the main rule of the style. -->

## Logo

<!-- Which variant where (header, footer, favicon, card), the minimum size, the clear space. -->

## Colors

<!-- One line per token: name, value, use, contrast checked against WCAG AA. -->

| Token | Value | Use |
|---|---|---|

## Typography

<!-- The fonts and their license, one size per role (display, title, body, label), weights, line heights. -->

## Spacing

<!-- The scale: --space-N = N × 4 px, and where each common value is used. -->

## Layout and shapes

<!-- Content width, gutters, corner radius, the breakpoints (written as numbers in the media queries). -->

First screen on a computer (owner, 2026-11-06): centered, the headline, the subtitle, the download buttons, then the video under them, which puts the tool forward. The video follows the height of the screen, about 600 × 338 px on a screen of 1280 × 720, so that it stays whole and the title of the next block shows under it, which invites the visitor to scroll.

## Components

<!-- Buttons, cards, form fields, navigation: their states (hover, focus, active, disabled). -->

Download buttons (owner, 2026-11-06): Windows and Linux side by side, with the same size and always in this order. The button of the detected system is filled and the other outlined; both are identical when no system is detected.

## Motion

<!-- What moves, how long, and what happens when the visitor asked to reduce motion. -->

## Tone of the texts

French addresses the visitor with « vous », like the application. Short, factual sentences in plain words, for a new player; no superlatives and no exclamation marks. The headline answers the why at once (`specs.md`, Value proposition, chosen by the owner on 2026-11-06).

## Icons and images

<!-- Where they come from, their license, their format and sizes. -->

## Accessibility

<!-- Contrast, focus, the minimum size of touch targets, the alternative texts. -->

## Set aside

<!-- The options compared and not kept, with the reason, so that they are not proposed again. -->

- The first screen with the text on the left and the video on the right (wireframe v1, lead A): the centered layout puts the tool forward better.
- A main button for the system of the visitor, with the other system as a small link: the owner wants both systems plainly visible.
- Two buttons identical in every case: a filled button leads the eye straight to the right one, at the cost of two lines of script.
- A video cut by the end of the first screen, to make the visitor scroll: it would hide the proof, and that end moves with each screen. The title of the next block does this job.
- A link « How to start it » under the buttons: the title of the next block shows that the steps exist, unless the mock-up finds otherwise on a laptop.
