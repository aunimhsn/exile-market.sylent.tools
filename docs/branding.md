# Branding

The visual identity of the site: the brand assets, then every design decision settled with the owner during the mock-up, with its tokens. Each decision is written here in the same commit as the change; the options set aside go to [Set aside](#set-aside). The tokens are applied in `src/styles/tokens.css`.

## Brand assets

What the owner provides (process.md, Specifications), where it is kept, and what is missing. The sources go in `src/assets/brand/`; the images derived from them are made by `npm run brand:images`.

| Asset | Format | File | Status |
|---|---|---|---|
| Emblem, in white, and icon, in bronze | SVG | `src/assets/brand/emblem.svg`, `icon.svg`, copied from `../rust-exile-market/assets/logo/` | In place |
| Full logo | PNG | `../rust-exile-market/assets/logo/exile-market.png` | Given |
| Favicon (SVG, ICO 16/32/48 px) and iPhone icon (180 px) | Made from the icon | `public/` | Made by the script |
| Preview card of the links (1200 × 630 px) | HTML drawn to PNG, converted to JPEG by the build | `src/assets/brand/social-card.html` | In place |
| Colors | Tokens of the application | `../rust-exile-market/specs.md`, Visual style | Reference for one of the two styles of the mock-up |
| Font | Manrope, SIL Open Font License, self-hosting allowed | `../rust-exile-market/assets/fonts/` | Given |
| Video and screenshots | Silent video, images | `docs/mockups/video/`, renders in `outputs/` | The video is made, to capture again just before the launch; the screens of the cards and the still image are provisional in `src/assets/screens/` and `src/assets/video/`; the final screenshots of the application are asked of the owner at the launch |
| Public contact details and legal information | Text | `src/content/<lang>/legal.json`, from sylent.art | At step 4b |

## Principles

Style H, chosen by the owner on 2026-11-06: the fonts and the grid of a dark, sharp page, and a burst of white shards in 3D on the first screen. The page says at once that the tool is serious and alive, for a player arriving from a dark game. Neutral blacks and white carry everything; red, the blood of the game, appears only under the pointer, on the end of the headline, on the end of the large sentences (after the download, the help), on the two links under the download buttons and on the links of the footer. The motion stays on the first screen, and the rest of the page is calm, so that the steps and the risk read without distraction.

## Logo

In the header, the emblem in white, 26 px, next to the name in capitals; under the pointer or the keyboard focus, the name alone grows a little (+6 %) and doesn't turn red (owner, 2026-11-08). In the footer, the name alone in capitals, at the size of the header, at the bottom right, clear of the back-to-top button (owner, 2026-11-07). On its own line under it, right-aligned, « by Sylent » (« par Sylent ») in `--color-text-weak`, 14 px, the whole phrase a link to sylent.art, white under the pointer or the keyboard focus (owner, 2026-11-08): the author is named without a second brand beside the product.

## Icon and preview card

The icon of the browser tab is the bronze of the application, the only bronze of the site: a player finds the same icon in the taskbar after the download (owner, 2026-11-08). The preview card of the links is one image for both languages: the white emblem, the name in capitals and the address on the black of the page, over the grid of the first screen; no sentence, since the description next to it is translated (owner, 2026-11-08).

## Colors

<!-- One line per token: name, value, use, contrast checked against WCAG AA. -->

The values below are in `src/styles/tokens.css`, taken from the `:root` of the mock-up (`docs/mockups/home-page.html`). The contrast is computed against WCAG AA.

| Token | Value | Use |
|---|---|---|
| `--color-background` | `#0a0a0a` | The page. White text on it: 19.8:1. Weak text: 7.9:1. |
| `--color-band` | `#0d0d0d` | Every other block. |
| `--color-surface` | `#1a1a1a` | Keys, grey frames. |
| `--color-border` | `#262626` | Separators. |
| `--color-text` | `#ffffff` | Main text. |
| `--color-text-weak` | `#a3a3a3` | Secondary text. |
| `--color-text-faint` | `#858585` | The text around a link without an underline: 5.3:1 on the page, 3.7:1 against the white link. |
| `--color-accent-deep` | `#a80f18`, « Blood », chosen by the owner on 2026-11-06 | The lines of the grid under the pointer, one shard in five and the line around the download buttons under the pointer, decorative. |
| `--color-accent` | `#e5383b`, 4.7:1 | The end of the headline, the links under the buttons, the hover of the other links. |

## Typography

Two fonts only (owner, 2026-11-06 and 2026-11-08), under the SIL Open Font License: Manrope for everything, titles, text, buttons, keys and commands, which only a heavier weight marks; Cormorant Garamond in italics for the subtitle only. The sizes per role are the `--size-*` tokens of the mock-up. The headline is white, its last words « Its price. » / « Son prix. » in red (owner, 2026-11-06). The section titles are in capitals and keep their accents in French, over a large faded word.

## Spacing

`--space-N` = N × 4 px.

Vertical rhythm of the download area (owner, 2026-11-06): the same gap above and below the links, between the buttons and the links, and between the links and the video (`--download-rhythm`, 12 px, which leaves the first screen as tall as before). The links carry their own font and line height, so that the visible text also sits at the same distance from both.

## Layout and shapes

Content width 1120 px, sharp corners, breakpoints at 720 px, and at 860 px for the not-found page, where the two languages take the whole width. A page shorter than the screen keeps its footer at the bottom of the screen (owner, 2026-11-08).

Gap under the first screen (owner, 2026-11-08): the end of the first screen keeps `--band-padding` before the next band, 80 px on a computer and 48 px on a phone, the same as under the fan of cards, so that the vertical rhythm is even. On a laptop of 1366 × 768, the change of background then falls just under the end of the screen; the video stays whole.

First screen on a computer (owner, 2026-11-06): centered, the headline, the subtitle, the download buttons, then the video under them, which puts the tool forward. The video follows the height of the screen, about 600 × 338 px on a screen of 1280 × 720, so that it stays whole and the title of the next block shows under it, which invites the visitor to scroll.

## Components

Language link (owner, 2026-11-06): the flag of the other language alone, without text, drawn in SVG since an emoji flag shows as two letters on Windows. The owner accepts that it says less than a word. Its name stays for screen readers (`aria-label`) and under the pointer (`title`), and it is clickable on 44 × 44 px.

Links under the download buttons (owner, 2026-11-06): one per line and centered, in bold red, white under the pointer, without an underline. No text sits around them, so that their color doesn't have to tell them from it (WCAG 1.4.1).

Links of the footer (owner, 2026-11-08): the same, in red, white under the pointer, without an underline, at their weight and size; they sit in a list, without text around them.

Order of the links under the buttons (owner, 2026-11-08): on a computer, « All versions and checksums » first, right under the buttons since it belongs to the download, then the risk for the account, then « Why does Windows show an alert? », which leads to its question, the first obstacle of a Windows player. On a phone, without buttons, the risk first, then the versions.

Questions (owner, 2026-11-08): in blood red like the small links, but at `--size-subtitle` and in 700, so that they read as titles and not as links; the answers stay in the body color.

Back-to-top button (owner, 2026-11-08): at 60 % opacity at rest, so that it hinders less when it passes over the content; under the pointer or the keyboard focus, fully opaque, with a white chevron, a white border and a nearly opaque background. It scrolls smoothly, and at once when the visitor asked to reduce motion. The name in the footer stays clear of it at every width, the scrollbar included.

Bands (owner, 2026-11-08): no line between them nor above the footer, on any page; on the home page, two very close blacks alternate.

Legal notice (owner, 2026-11-08): one column, its title on the grid of the first screen with the red under the pointer, its headings like the questions, then a button back to the home page in the style of the Linux download button, so as not to weigh as much as the main action.

Not-found page (owner, 2026-11-08): the grid of the first screen; a huge 404 in blood red behind, at 15 % opacity; the two languages one under the other, in the second half of the page on a computer, the text aligned on the left, each with a button in the style of the Linux download button. Its sentence holds on one line down to phones of 345 px, at a font size a little smaller than in the mock-up (the room divided by 25 and not 24), where it was cut on a phone of 390 px. No link to the other language, and a footer reduced to the name, since the page holds both languages.

Donation banner (owner, 2026-11-08): one thin line above the header, 36 px high plus its border, on the background of the page: « Exile Market is free. » in `--color-text-faint`, then the link to Ko-fi in red, white under the pointer or the keyboard focus, like the links under the download buttons, 14 px. The grey and the red have nearly the same luminance, so the 700 weight of the link is what tells it from the text around it (WCAG 1.4.1). It stays in the mock-up, hidden by default behind the tab « Donation banner (later) », ready to be added (`backlog.md`): donations stay out of this version (`specs.md`) and the banner isn't published before the conditions of step 18 of the application are met (`roadmap.md`).

Download buttons (owner, 2026-11-06): Windows and Linux side by side, with the same size and always in this order. Both are outlined, without a background even under the pointer, and the detected system changes nothing. Windows has a white border and Linux a grey one, which gives Windows a little more weight (owner, 2026-11-06).

The titles of the blocks are centered on a computer and have no faded word behind them, which took too much height for what it adds (owner, 2026-11-06).

Under the first screen, no block of steps and no title: one sentence at the size of the headline, the game mode in white then in blood red, each on its own line (owner, 2026-11-07). It is the only thing players can't guess after the download: they know how to extract and run an executable, and the Windows alert is handled in the questions. Its band has no border, only its background, and keeps the padding of the other bands, so that on a laptop the sentence starts below the first screen (owner, 2026-11-07). Once, when 60 % of it is on the screen, its two lines come in from outside the screen in 1.2 s, the first from the right, the second from the left 0.12 s later, with the ease-out of the button line. On a large screen or a phone, the sentence is already in sight, so it comes in at the arrival. With reduced motion, it is in place at once.

The help block, last before the footer, takes the same style (owner, 2026-11-08): no visible title (« Help » stays for screen readers), « A problem? » large and in blood red, then the rest of the sentence on its own line, much smaller (`--size-subtitle`, in the text font), coming in the same way. Its link has no underline: it stands out from the text around it by its white and its 700 weight, the text being in `--color-text-faint` (#858585, 3.7:1 against the white, WCAG 1.4.1; 5.3:1 against the background). It turns blood red under the pointer or the keyboard focus, like the other white links. Its band keeps the plain background, so that the bands still alternate.

The block « What it does » has no visible title (it stays for screen readers) and no video (owner, 2026-11-07). Three real screens of the application stand side by side, straight, overlapping by half, without border or rounded corners: copy an item, see its price, refine. The middle card lies over the two others, as in a hand, so that each keeps a side to point at. The card under the pointer (on a phone, the card tapped; with the keyboard, the card focused) comes in front of all, a little larger and lit, the others stay dimmed; the price card is in front by default. Its title and text show on the right of the cards on a computer, aligned on the left; the title holds on one line, its size following the width of its column up to the size of the block titles, and the text has the size of the subtitle; on a phone, under the cards, centered, at the size of the body text. The cards follow the width of their column, so that they never reach the text. The grid of the first screen comes back in the lower half of the block only, the mirror of the first screen, faded upwards, and turns red under the pointer, as on the first screen (owner, 2026-11-07). The hero shows the deck video (C) by default, the owner's preference, still waiting for the friends' feedback.

The questions of the block « Questions » are in blood red (`--color-accent`, 4.6:1 on the band, AA), their answers in white: all in white, the block read as one mass of text (owner, 2026-11-07). The line on the left of the answer about the account is grey (`--color-button-line`, the grey of the Linux button), so that the red stays for the questions.

## Motion

The burst (Three.js): 420 shards, one in five in blood red and the others white (owner, 2026-11-06), leave the center at load and at each click on a download button, 110 on a phone, dimmed there behind the text. It covers the first screen only and stops once out of sight. Below 24 images per second over 3 s, it freezes on a still image; with reduced motion, it starts as one. Without WebGL, the page stays whole.

The grid of the first screen holds the upper half and fades out towards the middle, with no sharp edge (owner, 2026-11-06); it turns red under the pointer, within 190 px of it (`--grid-light-radius`), with a mouse only, in the upper half too, and the red follows the page when it scrolls under a still mouse.

A blood line of 2 px with a glow draws itself around a download button under the pointer or the keyboard focus, clockwise from the top left corner, fast then slower in 0.7 s, so that it answers the pointer at once, and goes back in 0.25 s (owner, 2026-11-06). With reduced motion, it appears at once.

The video, « The deck » reworked (owner, 2026-11-08), 10.9 s, silent, tells the headline in order. One item: a card with a real unique, Headhunter, sober like the application, without frame or image of the game (clause 8), its lines appearing one by one so that its modifiers can be read. One shortcut: Ctrl + D in 3D in front of the dimmed card, with a shock wave. Its price: the card turns over and its back is the real window of the application, with the name of the item readable under the word and the prices of poe2scout. Then the fan of real screens, and the name, which closes it. The three words have no final period, unlike the headline, since they appear one at a time; each stands out of a black fade over the card, long and eased so that no edge shows on it (owner, 2026-11-08), then keeps growing slowly (3 % per second) and sinks a little (6 px per second). The prices and the league are those of the capture of 2026-11-08: capture it again just before the launch.

The video tilts slightly under the pointer.

## Tone of the texts

French addresses the visitor with « vous », like the application. Short, factual sentences in plain words, for a new player; no superlatives and no exclamation marks. The headline goes straight to the point: the item, the gesture, the price (`specs.md`, Value proposition, chosen by the owner on 2026-11-06).

## Icons and images

<!-- Where they come from, their license, their format and sizes. -->

## Accessibility

<!-- Contrast, focus, the minimum size of touch targets, the alternative texts. -->

## Set aside

<!-- The options compared and not kept, with the reason, so that they are not proposed again. -->

- A preview card per language with the headline on it, and the white emblem as the icon of the browser tab (2026-11-08): see Icon and preview card.
- The other videos, compared with the friends of the owner: The gesture, The corridor, The big bang, The blood, and the first version of The deck, whose words didn't match the images (« One item » over a price, « One shortcut » over an empty window). Removed on 2026-11-08. The guided tour is kept, in case (`docs/mockups/video/normal-b.js`, its renders in `outputs/`), not used on the page.
- Bodoni Moda italic as the second font, and the second font on all the text: Cormorant Garamond on the subtitle alone was kept (2026-11-08).
- A pause button for the burst of shards: the owner sees no place for it and doesn't want it (2026-11-08). The burst stays still when the visitor asked to reduce motion.
- For the legal notice, two columns on a computer: the order of reading gets less clear for no gain (2026-11-08).
- For the not-found page: the two languages side by side with a line between them, then the text aligned on the right, then buttons in the style of the Windows button, too strong for this page (2026-11-08).
- For the questions, three treatments compared on 2026-11-08: white questions with grey answers; the same with a red shard before each question; large white titles separated by lines. The owner kept the red, larger, since white text everywhere lacks contrast.
- The white Sylent wordmark next to the name in the footer: two brands side by side compete, and the owner prefers the author in grey text under the name (2026-11-08).
- « by @sylent » in the footer: the @ reads as an account, and `@sylent` on GitHub is someone else's, while the source code link leads to `aunimhsn` (2026-11-08).
- The video The Guided Tour, small, in the block « What it does on your computer »: this block reassures about what the tool touches, and the interface would be hard to read in that column (owner, 2026-11-08).
- For the donation banner, three louder treatments compared on 2026-11-08: a full red band with a cup and « buy Sylent a coffee on Ko-fi », which competes with the download buttons; a ticker, which moves all the time and would need a pause button; a band that fills with red under the pointer, with a button to close it. The owner kept the discreet line.
- For the hover of the help link, three livelier effects compared with the plain red on 2026-11-08: a glowing red line drawn under the words; an explosion (letters blown away and back, shards, a shock wave); a bug that walks under the words and is crushed at the end, the words turning red behind it. The owner kept the plain red.
- A title « Help » above a sentence in the body size: the owner prefers the help as a large sentence, like the one after the download.
- The name very large across the footer: the owner prefers it at the size of the header, at the bottom right.
- The first screen with the text on the left and the video on the right (wireframe v1, lead A): the centered layout puts the tool forward better.
- A main button for the system of the visitor, with the other system as a small link: the owner wants both systems plainly visible.
- A filled button for the detected system: it leads the eye straight to the right one, but it treats Linux as second. Two grey borders: nothing then marks the main action of the page.
- A video cut by the end of the first screen, to make the visitor scroll: it would hide the proof, and that end moves with each screen. The title of the next block does this job.
- A link « How to start it » under the buttons: the title of the next block shows that the steps exist, unless the mock-up finds otherwise on a laptop.
- The other styles compared on 2026-11-06, not kept when the owner chose H: A · Slate (the colors of the application), B · Catalogue (warm paper, a serif), C · Night (the base of H, without the burst), D · Rare (the yellow of a rare item floods the page), E · Voltage (electric indigo and lime), F · Burst (the burst of H in the colors of the rarities, behind the whole page), G · Meltdown (a molten shader through cut-out letters), I · Line art (shards in wire), J · 3D grid (the grid as a floor of the scene). The Git history keeps the mock-up with them once committed; the code of F, I and J can be found there.
- Shards in several colors: the owner wants fewer colors, white with the blood red of the page.
- Anaheim for the text and JetBrains Mono for the keys and the commands: the first looks odd to the owner and widens in bold, and three fonts are enough.
- A metro map of the steps after the download, white for Windows, grey for Linux, joining into a red line, with the blood walking the route under the pointer: kept for a while, then the owner chose a single sentence, since players know how to extract and run an executable (2026-11-07). A copy of the page with the metro is in `outputs/2026-11-07-home-page-with-metro.html`, not committed.
- Other drawings of the path (a fork, a tree, a vertical metro, a circuit, a river of blood, blades), and two calmer versions of the metro (lines that only draw themselves; signs on the lines with a slow train): the owner keeps the explosive metro, read from left to right.
- A final node at the end of the red line: not interesting for the owner.
- A glow on the red of the metro, and a gradient from the branches to the red line: the owner wants flat colors.
- An animation at the entry of the block (lines drawn, a shock, sparks, trains): the owner wants it slower and only under the pointer.
- Veins of blood in place of the metro (veins, capillaries, a beat, a heart, a hemorrhage, a tissue): tried on a canvas, the owner stays on the metro.
- A video at normal temperature (A or B) next to the cards: the text of the card in front takes its place (2026-11-07).
- A fan of cards held as in a hand, tilted, with a red rim and rounded corners: the owner prefers them straight, plain and larger (2026-11-07).
- Three screenshots side by side under the title « What it does », each with its title and text: replaced by the fan of cards and a video (2026-11-07).
- Faded words behind the titles of the blocks: too much height for what they add.
- The path after the download in Three.js: the information of this block must stay still and readable.
- A grey background on the buttons under the pointer: it dulls the red line. A line of 1 px without a glow: not marked enough for the owner.
- Orange under the pointer: the owner wants red, for the blood of the game.
- A darker red (`#7a0c12`, `#e03a3e`) and a brighter one (`#d9121f`, `#ff4d4f`): the owner chose the one between them.
- The other headlines, the former one being hard to read and far-fetched: « What’s your loot worth? » / « Votre loot vaut combien ? », « Stop giving your loot away. » / « Ne bradez plus votre loot. », « Stop selling blind. » / « Ne vendez plus à l’aveugle. », « Ctrl + D. The price. » / « Ctrl + D. Le prix. », « The price of your loot, in one move. » / « Le prix de votre loot, en un geste. ».
- The other fonts tried on the subtitle on 2026-11-06, the owner keeping Cormorant Garamond italic and Bodoni Moda italic to choose between later: Instrument Serif, Playfair Display, Fraunces, Newsreader, DM Serif Display, Spectral; the scripts Caveat, Dancing Script, Kaushan Script, Satisfy, Pacifico, Sacramento, Allura, Great Vibes, Homemade Apple; the atypical Grenze Gotisch, Pirata One, UnifrakturCook, Cinzel, Almendra, IM Fell English, Special Elite, Space Mono, VT323, Silkscreen, Major Mono Display.
- « Before installing, » before the link to the risk, and both links on one line: the line was too long.
- A language link with text, with or without a flag: the owner prefers the flag alone.
