# Specifications

## Goal

`exile-market.sylent.tools` is the official download page of Exile Market, a desktop price checker for Path of Exile 2 items, by Sylent. A visitor must understand in a few seconds what the tool does, decide whether to trust it, and download it in one click.

It must be online before the tag `v0.1.0` of the application (timeline in [roadmap.md](roadmap.md)), then serve the players who arrive at Path of Exile 2 1.0, on 2026-12-11. It replaces the placeholder page served today at this address, which has no URL to keep.

## Audiences

- **Players without a price tool**, many of them new at 1.0, on a computer: they want to know what it does and to get it without reading much.
- **Careful players**: an unsigned executable from an unknown author worries them, and the Windows alert confirms the worry. They look for what the tool does on their computer and whether their account risks anything.
- **Players on a phone**, coming from a clip or a post: they can't install anything there, and must leave with the address to open later.
- **French speakers** are a main audience: every text exists in French, addressing the visitor with « vous », like the application.

## Value proposition

The promise, as the headline:

- « One item. One shortcut. Its price. »
- « Un objet. Un raccourci. Son prix. »

The subtitle carries the game and the gesture:

- « Copy an item in Path of Exile 2 and see its price in a small window over the game. »
- « Copiez un objet dans Path of Exile 2 et voyez son prix dans une petite fenêtre par-dessus le jeu. »

What proves it: the video of the tool at work, and the open code. No invented proof: no count of users, no testimonial, no figure that hasn't been measured (backlog, Polish).

The page shows what the tool does; it never compares it with another tool and never names another application. It never presents the tool as approved by Grinding Gear Games, as following their terms, as safe, or as early access.

## Main action

Download the application. The buttons link straight to the file (`releases/latest/download/<stable name>` of `aunimhsn/rust-exile-market`), never through the release page; the browser downloads it and the visitor stays on the page, where the steps after the download are written.

| Visitor | Download area |
|---|---|
| Before the tag `v0.1.0` | « Coming soon » / « Bientôt disponible » in a single frame with the shape of the main button, in place of the buttons: a text, never a link to `#` |
| Windows, Linux, system not detected, or no JavaScript | Two outlined buttons of the same size, side by side, Windows with a white border then Linux with a grey one: this is the HTML of the page, which works alone; the script only replaces them for macOS or a phone |
| macOS | No button. « Exile Market isn't available on macOS. » / « Exile Market n’est pas disponible sur macOS. » |
| Phone or tablet | No button. « Exile Market runs on a computer. Open exile-market.sylent.tools on yours. » / « Exile Market s’installe sur un ordinateur. Ouvrez exile-market.sylent.tools sur le vôtre. » The address never breaks on two lines. |

The buttons read « Download for Windows », « Download for Linux » / « Télécharger pour Windows », « Télécharger pour Linux ». The detection must test Android before Linux, since Android also calls itself Linux, and tell an iPad from a Mac by its touch screen.

Under the buttons, one link per line, centered on a computer (owner, 2026-11-08): all the versions and their checksums (the release page), « All versions and checksums » / « Toutes les versions et leurs checksums »: players who know the subject say checksum, not « somme de contrôle »; the risk, « Know the risk for your account » / « Connaître le risque pour votre compte », linked to [that passage](#home-page); then « Why does Windows show an alert? » / « Pourquoi Windows affiche-t-il une alerte ? », linked to that question. On a phone or a tablet, without buttons: the risk, then the versions. They are absent on macOS and before the tag. The page shows no version number nor file size, which it couldn't keep up to date without a change at each release.

The wording about macOS says what the tool does, not what the game does: Steam lists the game for Windows only (checked on 2026-11-06), but a third-party source speaks of a Mac client, and the standalone client wasn't checked.

**After the download** (owner, 2026-11-07): one sentence, the only thing players can't guess: « Do not forget to set the game in windowed fullscreen or in a window. » / « N'oubliez pas de mettre le jeu en plein écran fenêtré ou en fenêtré. » The Windows alert is answered in the questions, reached by a link under the buttons; the help for Linux (Wayland, the clipboard) stays in the README of the application.

## Content tree

One page and its legal notice, in both languages. There is no navigation beyond the logo, the language link and the footer.

## Pages

The mock-up (`docs/mockups/home-page.html`, approved by the owner on 2026-11-08) is the reference of the three pages, and `docs/branding.md` records each decision. The blocks below are in their order of reading, the same on every width.

### Home page

1. **Header**: the logo and the name, the link to the other language.
2. **First screen**: the headline, the subtitle, the download area, and a short silent video of the tool at work, the first thing seen.
   - Everything is centered on a computer, in one column: the headline, the subtitle, the buttons and their links, then the video.
   - The size of the video follows the height of the screen, about 600 × 338 px on a screen of 1280 × 720, with a ceiling on tall screens, so that it stays whole. No video is ever cut by the end of the screen.
   - The video is « The deck » (`docs/branding.md`, Motion): a card with a real unique, Ctrl + D, the card turns over on the real window of the application and its price, a fan of real screens, the name. No image of the game beyond what the window of the tool shows: clause 8 of the terms of Grinding Gear Games covers streams and video sharing sites, not clearly a video hosted on this page.
   - The video has no sound, loops, and plays only when the visitor hasn't asked to reduce motion; otherwise it shows a still image, with a way to play it. It weighs about 3 MB at most (`docs/external-services.md`, GitHub Pages).
   - The video is captured again just before the launch, so that its prices and its league are current (`docs/technical-choices.md`, Video of the first screen).
3. **After the download** / **Après le téléchargement**: the sentence of [Main action](#main-action), large and centered, without title and without steps.
4. **What it does**: no visible title; three real screens of the application overlapping, and the text of the one in front next to them (`docs/branding.md`): copy an item (Ctrl + D, or Ctrl + C), see its price (from poe2scout for currencies and uniques, from the trade site for the rest), its stats and filters, the offers, in a small window over the game.
5. **What it does on your computer** / **Ce qu'il fait sur votre ordinateur** (not « Safety »: the word would promise what the page can't), a short list, to the left of the questions on a computer and above them on a phone:
   - It watches the clipboard while it runs and keeps only what looks like a Path of Exile 2 item.
   - Ctrl + D sends the game the Ctrl + C of one copy, once per press. It doesn't modify the game nor read its memory.
   - It connects only to poe2scout, the trade site and GitHub. A search on the trade site runs only when the player clicks.
6. **Questions** / **Questions** (owner, 2026-11-06): six questions, every answer open: nothing folds, no JavaScript. They replace the former blocks « What it needs » and part of « What it does on your computer », so that no text exists twice. Real questions from the streams and GitHub Issues may be added after the launch.
   1. « Is it free? » / « Est-il gratuit ? »: yes, and it asks for no account. Its code is open, and each release is built in public by GitHub Actions, with the checksums of each file.
   2. « Why does Windows show an alert? » / « Pourquoi Windows affiche-t-il une alerte ? »: it isn't signed for now, so Windows may show a warning at the first launch (about one launch in two in the owner's test of 2026-11-08). If it offers « More info », choose it, then « Run anyway »; if it only offers OK, confirm and start the tool again. To refine with the feedback of players.
   3. « Can my account be at risk? » / « Mon compte risque-t-il quelque chose ? »: the passage below, which the line under the download buttons links to.
   4. « Why must the game run in windowed fullscreen? » / « Pourquoi le jeu doit-il être en plein écran fenêtré ? »: windowed fullscreen or a window both work. In exclusive fullscreen, the game lets no application copy the item or show its price over it.
   5. « Which languages of the game are supported? » / « Quelles langues du jeu sont prises en charge ? »: a game client in English or in French: the tool reads no other language.
   6. « Does it work on macOS or on a console? » / « Fonctionne-t-il sur macOS ou sur console ? »: no. It needs Windows or Linux, 64 bits; on Linux, the game through Proton, and X11 or XWayland.

   The technical claims of these two blocks are checked by the audit of the application (its step 17e) before the page goes live with its buttons.

   **The risk for your account** / **Le risque pour votre compte** (owner, 2026-11-06). No word of « tolerated » or of a legal gap: see [why](docs/external-services.md#grinding-gear-games-terms-and-position).

   > Exile Market looks up offers on the official trade site through an interface Grinding Gear Games doesn't document. Their developer documentation says that working out such an interface goes against their terms of use (section 7i), and those terms allow them to close an account without notice.
   >
   > Asked about tools like this one, Grinding Gear Games answers that it can't comment on their legality, doesn't encourage creating or using them, and can't guarantee that a tool is allowed or will remain allowed (its forum, February 2024).
   >
   > In practice, many players have used tools of this kind for years. That is an observation, not a permission: it can change at any time.
   >
   > Grinding Gear Games doesn't endorse or guarantee any third-party tool: using it is at your own risk. Exile Market is free and comes with no warranty, as its license states. To the extent the law allows, Sylent isn't liable for what may happen to your account.

   > Exile Market cherche les offres sur le site d’échange officiel, par une interface que Grinding Gear Games ne documente pas. Sa documentation pour les développeurs indique que reconstituer une telle interface est contraire à ses conditions d’utilisation (section 7i), et ces conditions lui permettent de fermer un compte sans préavis.
   >
   > Interrogé sur ce type d’outil, Grinding Gear Games répond qu’il ne peut pas se prononcer sur leur légalité, qu’il n’encourage ni leur création ni leur usage, et qu’il ne peut pas garantir qu’un outil est autorisé ou le restera (son forum, février 2024).
   >
   > Dans les faits, de nombreux joueurs utilisent des outils de ce type depuis des années. C’est un constat, pas une autorisation : cela peut changer à tout moment.
   >
   > Grinding Gear Games n’encourage ni ne garantit aucun outil tiers : l’utiliser reste à vos risques. Exile Market est gratuit et fourni sans garantie, comme le prévoit sa licence. Dans les limites permises par la loi, Sylent n’est pas responsable de ce qui pourrait arriver à votre compte.

   The words « developer documentation » link to the official page. The forum reply is cited without a link: its thread names another application in its title.

7. **Help**: a problem goes to GitHub Issues, or to the bug report button of the application.
8. **Footer**: the legal notice, the source code and its license (`GPL-3.0-or-later` from v0.1), the disclaimer, and the name with « by Sylent » / « par Sylent » under it, a discreet link to sylent.art.

### Legal notice

One column: the publisher, the director of publication, the host, the statistics of the site, the credits, then a button back to the home page. See [Contact details and legal information](#contact-details-and-legal-information).

### Not-found page

Both languages on one page, one above the other, each with a button to its home page, and a huge 404 as a watermark behind (`docs/branding.md`). It has no link to the other language, and its footer holds the name only.

## URLs and redirects

| URL | Page or redirect |
|---|---|
| `/` | Home page, in English |
| `/fr/` | Home page, in French |
| `/legal/` | Legal notice, in English |
| `/fr/mentions-legales/` | Legal notice, in French |

Each page links to the same page in the other language, without any automatic redirect. A path without a page shows the not-found page, in both languages. There is no former URL to redirect: the placeholder has a single page, at the root.

## Content

- **Languages**: every text of the site exists in English and in French, the legal notice included, and each page shows only its own language. The pages the site links to and doesn't own stay as they are: the release page, the README and the documentation of Grinding Gear Games, in English.
- **Tone**: short and factual, like the application. Plain words for a new player. No superlatives and no exclamation marks.
- **Titles and descriptions**, for the search engines and the link previews:
  - « Exile Market: Path of Exile 2 price checker » / « Exile Market : le prix de vos objets dans Path of Exile 2 »
  - « Copy an item in Path of Exile 2 and see its price in a small window over the game. For Windows and Linux, free and open source. » / « Copiez un objet dans Path of Exile 2 et voyez son prix dans une petite fenêtre par-dessus le jeu. Pour Windows et Linux, gratuit et open source. »
- **The disclaimer**, which the developer documentation of Grinding Gear Games asks of every public application (« some form of the following statement »), in the footer of every page. English pages: « This product isn't affiliated with or endorsed by Grinding Gear Games in any way. » French pages: the sentence of the application, alone, « Ce produit n’est ni affilié à Grinding Gear Games ni approuvé par ce studio, de quelque manière que ce soit. » (owner, 2026-11-06: everything translated).
- **To provide**, asked of the owner at the launch, with their exact list (the interface can still change until v0.1): the screenshots and a last capture of the video, likely a rare item, a unique, and the window over the game, each in English and in French, the tool and the item in the language of the page. The window shows the currency icons of the game, which belong to Grinding Gear Games (`../rust-exile-market/docs/images.md`): the page shows them only there, inside the tool, and no other image of the game.
- **Not on this version**: clips of the streams, an interest counter, an email list (`backlog.md`), and donations (step 18 of the application; their banner is designed and waits, `backlog.md`).

## Brand assets

From the application (`docs/branding.md`, Brand assets): the emblem and the logo, Manrope (SIL Open Font License). Nothing else is missing but the video and the screenshots above.

## Contact details and legal information

- **Identity**: the page says « Sylent »; the legal notice gives the details already public on sylent.art.
- **Publisher**: name, status (individual entrepreneur), SIRET, email address, phone number. The director of publication is the same person. The home address isn't shown ([accepted risk](docs/external-services.md#legal-notice)).
- **Host**: GitHub, Inc. (GitHub Pages), its address and phone number.
- **Statistics**: the site counts its visits with GoatCounter, without a cookie, without storing anything in the browser and without a banner. The notice says what is counted (pages, source of the visit, browser, system, screen size, country), that the counts are anonymous, who hosts them, and where to read GoatCounter's privacy policy. The site has no form and collects nothing else.
- **Contact for players**: GitHub Issues and the bug report button of the application. The email address and the phone number are in the legal notice only.
- **Credits**: Manrope and Cormorant Garamond, under the SIL Open Font License. Three.js, with its copyright, under the MIT License, linked to its text. Path of Exile and its images belong to Grinding Gear Games.

## Constraints

- The site is static, hosted on GitHub Pages: no server, no server-side redirects.
- Every page has a title, a meta description, the language of its address (`lang`), and is usable at phone width.
- Accessibility: semantic HTML, contrast WCAG AA, keyboard access, reduced motion respected.
- The download works without JavaScript; JavaScript only replaces the buttons with the sentence for macOS or for a phone.
