# Roadmap archive

The detail of the steps of [roadmap.md](../roadmap.md) whose pull request is merged, the most recent first. `roadmap.md` keeps one line per step done.

## 4f. The burst and the statistics

Pull request: [#15](https://github.com/aunimhsn/exile-market.sylent.tools/pull/15).

The burst of shards (Three.js from npm, loaded after the page is shown); the GoatCounter script, on the real domain only, with the code of the site created on goatcounter.com. Tools: build, code review.

## 4e. The video

Pull request: [#14](https://github.com/aunimhsn/exile-market.sylent.tools/pull/14).

The video in each language, its pause and play buttons, its slight tilt under the pointer, the still image when the visitor asked to reduce motion. Tools: build, code review.

## 4d. The light motion

Pull request: [#13](https://github.com/aunimhsn/exile-market.sylent.tools/pull/13).

The red grid under the pointer on every page that has the grid, the grid of the first screen and that of the block « What it does » becoming one shared rule (code review of 4c); the entrance of the large sentences. No dependency. Tools: build, code review.

## 4c. The home page, still

Pull request: [#12](https://github.com/aunimhsn/exile-market.sylent.tools/pull/12).

Every block and text in both languages, the download area with its states behind a single setting (« Coming soon » until the tag) and the detection of the system, the three cards, the still image in place of the video. Complete and usable without JavaScript. Tools: build, code review.

## 4b. The simple pages

Pull request: [#11](https://github.com/aunimhsn/exile-market.sylent.tools/pull/11).

The legal notice with the real details (those public on sylent.art) and the not-found page, from the mock-up; the outlined button and the grid shared with the home page; the address of the application repository in one place. Tools: build, code review.

## 4a. Skeleton and deployment

Pull request: [#10](https://github.com/aunimhsn/exile-market.sylent.tools/pull/10).

The tokens and fonts of the mock-up in `src/styles/` (its `:root` becomes `tokens.css`, the components its CSS), the brand assets (`npm run brand:images`), the header and footer, the deployment to the `github.io` preview. Tools: build, code review.

## 3. Mock-up

Pull requests: [#8](https://github.com/aunimhsn/exile-market.sylent.tools/pull/8), [#9](https://github.com/aunimhsn/exile-market.sylent.tools/pull/9).

The home page, the legal notice and the not-found page in the chosen style, the video of the first screen; checked on the owner's phone; decisions in `docs/branding.md`, tokens in the `:root` of the mock-up. Tools: mock-up, design system.

## 2. Wireframe

Pull request: [#7](https://github.com/aunimhsn/exile-market.sylent.tools/pull/7).

One Excalidraw wireframe of the page, phone first, with grey frames for the video and the screenshots. It is removed by the pull request of the mock-up: the history keeps it.

## 1. Specifications

Pull request: [#6](https://github.com/aunimhsn/exile-market.sylent.tools/pull/6).

`specs.md` from what the owner decided on 2026-11-06, the terms of GoatCounter (chosen by the owner on 2026-11-06) and the French legal notice (LCEN article 1-1, read on Légifrance) checked and written in `docs/external-services.md`. Tool: specifications.

## 0b. Languages

Pull request: [#5](https://github.com/aunimhsn/exile-market.sylent.tools/pull/5).

English at the root and French under `/fr/`: the texts in `src/i18n/` and `src/content/` for each language, `lang` per page, the link between the languages and `hreflang` (the tag that tells search engines the page exists in the other language), the rules and descriptions that assume one French site adapted (the Language and Development sections of `CLAUDE.md`, `.claude/agents/code-reviewer.md`, the Content section of `docs/technical-choices.md`, the `$comment` of `src/i18n/fr.json`).

## 0a. Project setup

Pull request: [#4](https://github.com/aunimhsn/exile-market.sylent.tools/pull/4).

the size of the project, the Project section of `CLAUDE.md`, the name of the site, the port of the mock-up server, the README, the backlog, the repository settings checked.
