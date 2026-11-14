# External services

The external services of the site, their limits and terms of use, and the risks the owner accepts, with their date. Check them again before relying on a figure, since the terms change.

## GitHub Pages (hosting)

Source: [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), checked on 2026-10-27.

| Limit | Value |
|---|---|
| Published site size | 1 GB maximum |
| Source repository | 1 GB recommended |
| Bandwidth | 100 GB per month (soft limit) |
| Builds | 10 per hour (soft limit), not applied to a custom GitHub Actions workflow |
| Deployment | Times out after 10 minutes |

- No server-side code and no server-side redirects: the redirects are static pages, written by Astro.
- Not for sensitive transactions (passwords, credit card numbers).
- **Commercial use**: GitHub Pages « is not intended for or allowed to be used as a free web-hosting service to run your online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions or providing commercial software as a service (SaaS) ». A showcase site with no sale and no payment is a gray area, tolerated in practice. If GitHub ever suspended the site, the static build moves to Cloudflare Pages or Netlify (free plans that allow commercial use) in a few minutes, then the DNS records change. Record here whether the owner accepts this risk, with the date.
- On a free account, the repository must be public for GitHub Pages and for the rulesets that protect `main`.
- **For this site** (2026-11-06): a free tool with no sale and no payment, so the commercial clause above isn't a concern for v0.1. Read it again before the donations of the application's step 18.
- **The video** counts against the 100 GB: at 3 MB, that is about 33,000 plays a month, hence the limit in `specs.md`. The downloads don't count: the release files are served by GitHub Releases, not by Pages.
- **Domain**: `sylent.tools` is verified in the owner's GitHub account (owner, 2026-11-06), which protects it from being claimed by another account.

## Legal notice

Source: [law of 21 June 2004 (LCEN)](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164/) on Légifrance, consolidated text read on 2026-11-06. Article 1-1 is in force since 23 May 2024 (law 2024-449, article 48).

What article 1-1, I asks of « les personnes dont l'activité est d'éditer un service de communication au public en ligne »:

| Item | Asked | On this site |
|---|---|---|
| 1° A natural person | « nom, prénoms, domicile et numéro de téléphone », and the registration number if subject to registration | Not shown: the site follows II, below |
| 3° Director of publication | The name | None: asked of a professional publisher only |
| 4° Host | Name, address and phone number | GitHub, Inc., its address, and the phone number below |
| 5° Storage of the data processed directly by the publisher | Name and address, if any | None |

- **Chosen (owner, 2026-11-14): article 1-1, II**, which lets a publisher « à titre non professionnel » stay anonymous and name only the host, having given their identity to the host. The notice names « Sylent », says the host holds the publisher's identity through their account, and links to the issues of the project. Why: the SIRET, the name and the phone number shown until then led to the owner's address in the public register of companies, while the site sells nothing, shows no advertising, and the donations planned are free gifts without a counterpart. Limits: GitHub holds the data of the owner's account (name, email address), not a postal address, which is the usual practice of a site on GitHub Pages but less than a strict reading of the article; and the choice holds only while the site stays non-professional: if the donations become revenue of the owner's individual business, the notice goes back to I, with a domiciliation address.
- Article 1-2: failing to comply with I and II is punishable by one year of imprisonment and a fine of 75,000 €.
- **Replaced on 2026-11-14**: the risk accepted on 2026-11-06 (a professional notice without the home address) no longer applies. The former details stay in the history of the public repository; rewriting it isn't worth the trouble, since the same details were public elsewhere.
- **Accepted (2026-11-06): the phone number of the host**. GitHub's own pages publish none. The notice uses +1 877 448 4820, the number given for GitHub by third-party records ([datarequests.org](https://www.datarequests.org/db/github.json)), public but without an official source, as on sylent.art.

## Grinding Gear Games: terms and position

Read on 2026-11-06. The application's own record of this risk is `../rust-exile-market/docs/trade-site-usage.md`.

- [Developer documentation](https://www.pathofexile.com/developer/docs): « It is against our Terms of Use (section 7i) to reverse-engineer endpoints outside of this documentation. » Executable applications apart from the game: « While not encouraged, these are permitted. » Macros: invoked manually, one action per invocation. « Introducing features against these guidelines or our Terms of Use can result in account termination for you as well as your users. » The disclaimer: « some form of the following statement », so its wording isn't imposed word for word. « We cannot allow our Intellectual Property to be used to generate commercial revenue », to read again before the donations.
- [Terms of use](https://www.pathofexile.com/legal/terms-of-use-and-privacy-policy): clause 17 lets them cancel a membership « if it believes you have breached these Terms of Use », without notice or explanation; clause 9 has the player indemnify them for a breach. The letters of clause 7 are numbered on the page; 7i is the ninth item, inferred from the documentation's reference.
- Their replies on the forum, labelled Grinding Gear Games: [February 2024](https://www.pathofexile.com/forum/view-thread/3491960) (« we cannot comment on the legality of third-party tools »; « we do not encourage the creation or use of third-party tools »; « we're unable to guarantee if a tool is allowed or would remain allowed in the future »), and the same answer in [2021](https://pathofexile.com/forum/view-thread/3116826) and [2022](https://www.pathofexile.com/forum/view-thread/3303981). No reply read says that an account was or would be closed for a price tool. These threads name other applications, so the page cites the forum without linking to them.

**Why the page doesn't say « tolerated » nor « legal gap »** (owner's request of 2026-11-06, the text in `specs.md`):

- There is no legal gap: the documentation is explicit, and a use that goes unpunished creates no right. Writing « gap » would be a wrong statement on the owner's own page.
- « Tolerated » states the intent of Grinding Gear Games, which they refuse to state themselves, and comes close to saying they approve (`CLAUDE.md`, Project). The page keeps what can be observed: many players have used such tools for years, which is not a permission.

**What the text does and doesn't do**, written by Claude Code, not by a lawyer, and not reviewed by one:

- It informs the player before the download, which is the main thing it can do, hence the line under the buttons.
- It limits the owner's liability to the player only « to the extent the law allows », along with the license: such a clause doesn't cover everything.
- It protects from nothing on the side of Grinding Gear Games, who can close the owner's own account: the risk accepted on 2026-10-23 stays. It also states publicly that the owner knows the rule.

## GoatCounter (audience measurement)

Chosen by the owner on 2026-11-06, as on sylent.art. Read on 2026-11-06: [terms](https://www.goatcounter.com/terms) (dated 2020-01-16), [privacy](https://www.goatcounter.com/help/privacy) (dated 2025-06-08), [GDPR](https://www.goatcounter.com/help/gdpr), [versions of the script](https://www.goatcounter.com/help/countjs-versions), [skip-dev](https://www.goatcounter.com/help/skip-dev).

- **Plan**: free « for reasonable public usage »; « running your personal website or small-to-medium business on it is fine, but sending millions of pageviews/day isn't ». No monthly figure on the pages read; the pricing address gives a 404.
- **Data**: aggregated tables per day or hour (browser, system, location from the IP, language, screen width). No IP address, full User-Agent or tracker ID stored; the site, IP and User-Agent stay in memory for up to 8 hours to detect repeat visits. Nothing stored in the browser. « No information is shared with third parties. »
- **Where**: Hetzner in Finland and Germany; operated by Martin Tournoij, in Ireland.
- **Script**: `https://gc.zgo.at/count.v5.js`, pinned with `integrity="sha384-atnOLvQb9t+jTSipvd75X2yginT4PjVbqDdlJAmxMm+wYElFmeR6EmLP5bYeoRVQ"`, the same file and hash as on sylent.art, so that the browser refuses a file that doesn't match.
- **Consent**: [CNIL rules on audience measurement](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience) (2025-07-04) and [on tracers](https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi). A tool without a cookie is still a tracer when it reads data from the device. The exemption asks for: a purpose limited to the audience of the site, for the publisher only; anonymous statistics only; no cross-referencing nor transfer of non-anonymous data to third parties; no tracking across sites; a provider that doesn't reuse the data for itself. The CNIL also recommends informing the visitors, for example in the privacy policy, and keeping the data 25 months at most.
- **Reading for this site**: according to GoatCounter's own statements, these conditions are met, hence no banner and a mention in the legal notice. No one has audited these statements: GoatCounter itself says it « probably » needs no consent notice and recommends asking a lawyer, and the CNIL's self-assessment tool wasn't filled in. The pages read give no retention period for the aggregated counts, against the 25 months recommended; according to GoatCounter, they hold no personal data. The owner accepted no banner on 2026-11-06.
- **Rejected**: anything more intrusive (Google Analytics needs a banner in France, with cookies and a transfer to the United States).
- **Only the real domain is counted**: the script is left out of the `github.io` preview and of the development server. The site has its own GoatCounter code, `exile-market`, created by the owner on 2026-11-09 and visible in the source of every page, so that its counts don't mix with those of sylent.art. `scripts/check-urls.mjs` fails on a page of the real domain without the script and on a page of the preview with it. The dashboard shows the first visits only once the page is on its domain. No second account is needed: « Create a new site for every domain; this is a completely separate site which has the same user, login, etc. » ([domains](https://www.goatcounter.com/help/domains), read on 2026-11-08). The pages read give no limit on the number of sites.

## Other services

- **GitHub Releases** serves the download files; see the links in `specs.md`. `releases/latest` skips pre-releases and drafts, so `v0.1.0` must be published as a normal release for the buttons to work.
