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

- « Know what your loot is worth before you sell it. »
- « Sachez ce que vaut votre butin avant de le vendre. »

The subtitle carries the game and the gesture:

- « Copy an item in Path of Exile 2 and see its price in a small window over the game. »
- « Copiez un objet dans Path of Exile 2 et voyez son prix dans une petite fenêtre par-dessus le jeu. »

What proves it: the video of the tool at work, and the open code. No invented proof: no count of users, no testimonial, no figure that hasn't been measured (backlog, Polish).

The page shows what the tool does; it never compares it with another tool and never names another application. It never presents the tool as approved by Grinding Gear Games, as following their terms, as safe, or as early access.

## Main action

Download the application. The buttons link straight to the file (`releases/latest/download/<stable name>` of `aunimhsn/rust-exile-market`), never through the release page; the browser downloads it and the visitor stays on the page, where the steps after the download are written.

| Visitor | Download area |
|---|---|
| Before the tag `v0.1.0` | « Coming soon » / « Bientôt disponible » as text, in place of the buttons: never a link to `#` |
| Windows detected | Main button for Windows, a link for Linux below it |
| Linux detected | Main button for Linux, a link for Windows below it |
| System not detected, or no JavaScript | Main button for Windows, a link for Linux below it: both work without JavaScript |
| macOS | No button. « Exile Market isn't available on macOS. » / « Exile Market n’est pas disponible sur macOS. » |
| Phone or tablet | No button. « Exile Market runs on a computer. Open exile-market.sylent.tools on yours. » / « Exile Market s’installe sur un ordinateur. Ouvrez exile-market.sylent.tools sur le vôtre. » |

Under the buttons, a short line sends to the risk before the download: « Before installing, read the risk for your account. » / « Avant d’installer, lisez le risque pour votre compte. », linked to [that passage](#home-page); then a link to all the versions and their checksums (the release page). The page shows no version number nor file size, which it couldn't keep up to date without a change at each release.

The wording about macOS says what the tool does, not what the game does: Steam lists the game for Windows only (checked on 2026-11-06), but a third-party source speaks of a Mac client, and the standalone client wasn't checked.

**After the download**, for each system, in a few short steps:

- Windows: open the archive, extract it, run `exile-market.exe`. The tool isn't signed for now, so Windows shows an alert: the exact steps through it, and the text of the alert, are written after the owner's Windows test.
- Linux: extract the archive and run `exile-market`, with a link to the help in the README for Wayland and the clipboard.
- Then: set the game in windowed fullscreen or in a window, and press Ctrl + D on an item.

## Content tree

One page and its legal notice, in both languages. There is no navigation beyond the logo, the language link and the footer.

## Pages

The layout comes from the wireframe (`docs/wireframes/`, step 2), then the mock-up is the reference. The blocks below are in their order of reading; the wireframe may still move them.

### Home page

1. **Header**: the logo and the name, the link to the other language.
2. **First screen**: the headline, the subtitle, the download area, and a short silent video of the tool at work, the first thing seen.
   - The mock-up compares A, the tool alone on a neutral background, and B, the game behind it, blurred or dark, without logos: clause 8 of the terms of Grinding Gear Games covers streams and video sharing sites, not clearly a video hosted on this page.
   - The video has no sound, loops, and plays only when the visitor hasn't asked to reduce motion; otherwise it shows a still image, with a way to play it. It weighs about 3 MB at most (`docs/external-services.md`, GitHub Pages).
   - Until the video and the screenshots are made, just before the launch, grey frames with their caption stand in for them.
3. **What it does**: in a few short items, with screenshots: copy an item (Ctrl + D, or Ctrl + C), see its price (from poe2scout for currencies and uniques, from the trade site for the rest), its stats and filters, the offers, in a small window over the game.
4. **What it needs**: three facts to read before downloading.
   - The display mode: windowed fullscreen or a window. In exclusive fullscreen, the game lets no application copy the item or show its price over it.
   - A game client in English or in French: the tool reads no other language.
   - Windows or Linux, 64 bits; on Linux, the game through Proton, and X11 or XWayland.
5. **What it does on your computer** / **Ce qu’il fait sur votre ordinateur** (not « Safety »: the word would promise what the page can't), five points:
   - Its code is open, and each release is built in public by GitHub Actions, with the checksums of each file.
   - It isn't signed for now, hence the Windows alert, and how to go through it.
   - It watches the clipboard while it runs and keeps only what looks like a Path of Exile 2 item. Ctrl + D sends the game the Ctrl + C of one copy, once per press. It doesn't modify the game nor read its memory.
   - It connects only to poe2scout, the trade site and GitHub, and asks for no account. A search on the trade site runs only when the player clicks.
   - The risk for the account of the player, in its own passage below.

   The technical claims are checked by the audit of the application (its step 17e) before the page goes live with its buttons.

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

6. **Help**: a problem goes to GitHub Issues, or to the bug report button of the application.
7. **Footer**: the legal notice, the source code and its license (`GPL-3.0-or-later` from v0.1), the disclaimer.

### Legal notice

The publisher, the director of publication, the host, the statistics of the site, the credits. See [Contact details and legal information](#contact-details-and-legal-information).

### Not-found page

Both languages on one page, with a link to each home page, as already built.

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
- **To provide**, asked of the owner at the launch, with their exact list (the interface can still change until v0.1): the video and the screenshots, likely a rare item, a unique, and the window over the game, each in English and in French, the tool and the item in the language of the page. The window shows the currency icons of the game, which belong to Grinding Gear Games (`../rust-exile-market/docs/images.md`): the page shows them only there, inside the tool, and no other image of the game.
- **Not on this version**: clips of the streams, an interest counter, an email list (`backlog.md`), and donations (step 18 of the application).

## Brand assets

From the application (`docs/branding.md`, Brand assets): the bronze emblem and the logo, Manrope (SIL Open Font License). Nothing else is missing but the video and the screenshots above.

## Contact details and legal information

- **Identity**: the page says « Sylent »; the legal notice gives the details already public on sylent.art.
- **Publisher**: name, status (individual entrepreneur), SIRET, email address, phone number. The director of publication is the same person. The home address isn't shown ([accepted risk](docs/external-services.md#legal-notice)).
- **Host**: GitHub, Inc. (GitHub Pages), its address and phone number.
- **Statistics**: the site counts its visits with GoatCounter, without a cookie, without storing anything in the browser and without a banner. The notice says what is counted (pages, source of the visit, browser, system, screen size, country), that the counts are anonymous, who hosts them, and where to read GoatCounter's privacy policy. The site has no form and collects nothing else.
- **Contact for players**: GitHub Issues and the bug report button of the application. The email address and the phone number are in the legal notice only.
- **Credits**: Manrope, under the SIL Open Font License. Path of Exile and its images belong to Grinding Gear Games.

## Constraints

- The site is static, hosted on GitHub Pages: no server, no server-side redirects.
- Every page has a title, a meta description, the language of its address (`lang`), and is usable at phone width.
- Accessibility: semantic HTML, contrast WCAG AA, keyboard access, reduced motion respected.
- The download works without JavaScript; JavaScript only chooses which system comes first.
