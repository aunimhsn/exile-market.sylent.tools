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
| 1° A natural person | « nom, prénoms, domicile et numéro de téléphone », and the registration number if subject to registration | Name, phone, SIRET, status, email address. **No home address.** |
| 3° Director of publication | The name | The same person |
| 4° Host | Name, address and phone number | GitHub, Inc., its address, and the phone number below |
| 5° Storage of the data processed directly by the publisher | Name and address, if any | None |

- Article 1-1, II lets a publisher « à titre non professionnel » stay anonymous and name only the host, having given their identity to the host. This lead isn't taken: the owner is a registered individual entrepreneur who shows their details, and the donations planned later would weaken it. To ask the accountant, with the question of the donations.
- Article 1-2: failing to comply with I and II is punishable by one year of imprisonment and a fine of 75,000 €.
- **Risk of the home address**: the owner chose on 2026-11-06 not to show it, as on sylent.art (accepted there on 2026-10-27), before the text above was read. Confirmation asked in the pull request of step 1. A domiciliation address would remove the risk.
- **Phone number of the host**: GitHub's own pages publish none. The notice uses +1 877 448 4820, the number given for GitHub by third-party records ([datarequests.org](https://www.datarequests.org/db/github.json)), public but without an official source, as on sylent.art (accepted there on 2026-10-30). Confirmation asked with the point above.

## GoatCounter (audience measurement)

Chosen by the owner on 2026-11-06, as on sylent.art. Read on 2026-11-06: [terms](https://www.goatcounter.com/terms) (dated 2020-01-16), [privacy](https://www.goatcounter.com/help/privacy) (dated 2025-06-08), [GDPR](https://www.goatcounter.com/help/gdpr), [versions of the script](https://www.goatcounter.com/help/countjs-versions), [skip-dev](https://www.goatcounter.com/help/skip-dev).

- **Plan**: free « for reasonable public usage »; « running your personal website or small-to-medium business on it is fine, but sending millions of pageviews/day isn't ». No monthly figure on the pages read; the pricing address gives a 404.
- **Data**: aggregated tables per day or hour (browser, system, location from the IP, language, screen width). No IP address, full User-Agent or tracker ID stored; the site, IP and User-Agent stay in memory for up to 8 hours to detect repeat visits. Nothing stored in the browser. « No information is shared with third parties. »
- **Where**: Hetzner in Finland and Germany; operated by Martin Tournoij, in Ireland.
- **Script**: `https://gc.zgo.at/count.v5.js`, pinned with `integrity="sha384-atnOLvQb9t+jTSipvd75X2yginT4PjVbqDdlJAmxMm+wYElFmeR6EmLP5bYeoRVQ"`, the same file and hash as on sylent.art, so that the browser refuses a file that doesn't match.
- **Consent**: [CNIL rules on audience measurement](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience) (2025-07-04) and [on tracers](https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi). A tool without a cookie is still a tracer when it reads data from the device. The exemption asks for: a purpose limited to the audience of the site, for the publisher only; anonymous statistics only; no cross-referencing nor transfer of non-anonymous data to third parties; no tracking across sites; a provider that doesn't reuse the data for itself. The CNIL also recommends informing the visitors, for example in the privacy policy, and keeping the data 25 months at most.
- **Reading for this site**: according to GoatCounter's own statements, these conditions are met, hence no banner and a mention in the legal notice. No one has audited these statements: GoatCounter itself says it « probably » needs no consent notice and recommends asking a lawyer, and the CNIL's self-assessment tool wasn't filled in. The pages read give no retention period for the aggregated counts, against the 25 months recommended; according to GoatCounter, they hold no personal data. The owner accepted no banner on 2026-11-06.
- **Rejected**: anything more intrusive (Google Analytics needs a banner in France, with cookies and a transfer to the United States).
- **Only the real domain is counted**: the script is left out of the `github.io` preview and of the development server. The site has its own GoatCounter code, created by the owner at step 4a, so that its counts don't mix with those of sylent.art.

## Other services

- **GitHub Releases** serves the download files; see the links in `specs.md`. `releases/latest` skips pre-releases and drafts, so `v0.1.0` must be published as a normal release for the buttons to work.
