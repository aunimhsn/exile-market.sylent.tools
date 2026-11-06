# Backlog

What is noted and not being done: an evolving list, read when the next work is chosen (process.md, The backlog), not at every session. When the owner picks an item, it leaves this file and becomes a step of [roadmap.md](roadmap.md).

## Polish

- Real figures on the page (size of the download, start time, memory), once measured on Windows. Noted on 2026-11-06.

- The legal notes of the template and of sylent.art cite article 6 of the LCEN; the article in force is 1-1, since 23 May 2024. Depends on: the retrospective of this cycle, which carries it to the template. Noted on 2026-11-06.

## Edge cases

- A Windows installer or a bare `.exe` instead of a `.zip`, if players stumble on the archive. Depends on: the feedback on v0.1 and the application's release workflow. Noted on 2026-11-06.

## Features

- An « I'm interested » button with an anonymous counter (no IP stored, at most a daily-salted hash). Depends on: a back-end or a third-party service, checked in `docs/external-services.md`. Noted on 2026-11-05.
- A « notify me » email form with two separate unchecked consents (the release of the next versions, the news of the owner's next tools), an unsubscribe link in every mail, a service such as Buttondown, MailerLite or Brevo, and a privacy policy. Depends on: the choice of the service. Noted on 2026-11-05.
- Counting the clicks on the download buttons with GoatCounter (`data-goatcounter-click`), to see which source brings downloads and not only visits. GitHub already counts the downloads of each file. Depends on: the first figures. Noted on 2026-11-06.
- A page after the click, in both languages: the download starts by itself, a direct link stands in if it doesn't, and the steps of the system are shown at the moment they are needed, the Windows alert first. It would also count the downloads as visits of that page. It changes the rule that the buttons link straight to the file and that the visitor stays on the page. Depends on: the feedback on v0.1, if players stop at the alert. Noted on 2026-11-06.
- Clips of the streams on the page, if they don't distract from the download. Depends on: the first streams. Noted on 2026-11-06.

## Large works

- Signing the Windows executable, so that SmartScreen warns less: without a signature, each new version starts from zero. The SignPath Foundation offers it for free to open source projects, after an approval. Depends on: the feedback on v0.1 and the license of the application. Noted on 2026-11-06.

- Move the build to Node.js 26 LTS: `.nvmrc`, `engines`, `node-version` in `deploy.yml`, `@types/node` 26 and `docs/technical-choices.md`. Cost: one small pull request, about an hour with the checks. Node.js 24 is supported until 2028-04-30, so nothing urgent. If Dependabot proposes `@types/node` 25, post `@dependabot ignore this major version`: Node.js 25 is no longer maintained. Depends on: the launch of 2026-12-11, not to change the build just before it. Noted on 2026-11-06.
- Move to TypeScript 7 once the tools accept it, by hand since Dependabot ignores the 7.x line: `typescript` 7.1 or later, `typescript-eslint` with its support, and `tsc` with `@astrojs/ts-content-mapper` in place of `astro check`. Cost: about half a day (dependencies, `npm run lint`, the editor, `docs/technical-choices.md`), for little gain on a site this small. Depends on: a stable TypeScript 7.1, and the support of typescript-eslint and Astro. Noted on 2026-11-06.

## Waiting on others

## Explorations kept
