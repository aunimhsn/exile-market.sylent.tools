# Roadmap

The steps chosen for the site described in [specs.md](specs.md), following [process.md](process.md). Each step is delivered in its own pull request, which checks its box. What is noted and not chosen yet lives in [backlog.md](backlog.md).

## Size of the project

One page (owner's choice on 2026-11-06, process.md, Size the project): short specifications, one wireframe, 2 styles in the mock-up, tokens written straight into `src/styles/tokens.css`, build, launch. The steps are split finely, each with its own pull request: the owner prefers that to larger ones.

## Timeline

The order is: the Windows test of the application, the page on its domain, the tag `v0.1.0`, the first stream with the tool. The tag is planned around 2026-11-11 and may slide to about 2026-11-15, its date set after the Windows test; the first stream comes between 2026-11-11 and 2026-11-15 (owner, 2026-11-06). The placeholder stays online until the page goes live on the day of the tag; if the stream comes before the tag, the page goes live first, with « Coming soon » in place of the download buttons.

## Reference

Read only by the steps that need them:

- [Technical choices](docs/technical-choices.md): the stack, the commands and the main designs, with their reasons.
- [Branding](docs/branding.md): the brand assets, the visual identity and every design decision of the mock-up, with the tokens.
- [External services](docs/external-services.md): limits and terms of the services, and the risks accepted by the owner.
- [Roadmap archive](docs/roadmap-archive.md): the detail of the steps done, moved there once their pull request is merged.
- [Backlog](backlog.md): what is noted and not chosen yet, read when the next work is chosen.

## Steps

### Cycle 1: the site online

- [x] **0a. Project setup** ([#4](https://github.com/aunimhsn/exile-market.sylent.tools/pull/4)).
- [x] **0b. Languages**: English at the root and French under `/fr/`: the texts in `src/i18n/` and `src/content/` for each language, `lang` per page, the link between the languages and `hreflang` (the tag that tells search engines the page exists in the other language), the rules and descriptions that assume one French site adapted (the Language and Development sections of `CLAUDE.md`, `.claude/agents/code-reviewer.md`, the Content section of `docs/technical-choices.md`, the `$comment` of `src/i18n/fr.json`). Tools: build, code review.
- [ ] **1. Specifications**: `specs.md` from what the owner decided on 2026-11-06, the terms of GoatCounter (chosen by the owner on 2026-11-06) and the French legal notice (LCEN article 1-1, read on Légifrance) checked and written in `docs/external-services.md`. Tool: specifications.
- [ ] **2. Wireframe**: one Excalidraw wireframe of the page, phone first, with grey frames for the video and the screenshots. Tool: wireframes.
- [ ] **3. Mock-up**: 2 styles, one following the application, the other exploring; the two treatments of the video (the tool alone, the game behind it); checked on the owner's phone; decisions in `docs/branding.md`, tokens in `src/styles/tokens.css`. Tools: mock-up, design system.
- [ ] **4a. Skeleton and deployment**: the tokens and fonts of the mock-up in `src/styles/`, the brand assets (`npm run brand:images`), the header and footer, the deployment to the `github.io` preview. Tools: build, code review.
- [ ] **4b. The page**: the home page and the legal notice in both languages, the download buttons by system. Tools: build, code review.
- [ ] **5. Launch**: the video and the screenshots asked of the owner with their exact list, the site checked on the preview, the DNS switched by the owner, the custom domain and HTTPS, the placeholder deleted at Cloudflare; once the tag is out, the download buttons turned on. Tool: launch.
- [ ] **6. Retrospective**: the lessons in `process.md` (and in the template when they apply to every website), the backlog sorted, the memory moved to the files. Tool: retrospective.

The steps may be split into sub-steps when a pull request grows too large. When no step is left, Claude Code proposes the next items of the backlog to the owner.

## Needed in rust-exile-market

Done in the application's repository, before its tag, and not by a pull request here:

- Archives with a stable name in `release.yml` (for example `exile-market-windows-x64.zip`, `exile-market-linux-x64.tar.gz`), so that the buttons of the page link to `releases/latest/download/<name>`, an address that never changes.
- Step 17b of its roadmap still says a VPS with Coolify: the page is on GitHub Pages.
- Its specifications say the owner has no Windows: the owner now tests on a Windows laptop.
- The launch plan is only in Claude Code's memory: write it as a document there, with the steps and without the names of the streamers.
