# Roadmap

The steps chosen for the site described in [specs.md](specs.md), following [process.md](process.md). Each step is delivered in its own pull request, which checks its box. What is noted and not chosen yet lives in [backlog.md](backlog.md).

## Size of the project

One page (owner's choice on 2026-11-06, process.md, Size the project): short specifications, one wireframe, 2 styles in the mock-up, tokens written straight into `src/styles/tokens.css`, build, launch. The steps are split finely, each with its own pull request: the owner prefers that to larger ones.

## Timeline

The order is: the Windows test of the application, the page on its domain, the tag `v0.1.0`, the first stream with the tool. The tag is aimed between 2026-11-11 and 2026-11-15, and a week later is fine: quality comes before speed (owner, 2026-11-09). The first stream comes around the tag (owner, 2026-11-06). The placeholder stays online until the page goes live on the day of the tag; if the stream comes before the tag, the page goes live first, with « Coming soon » in place of the download buttons.

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
- [x] **0b. Languages** ([#5](https://github.com/aunimhsn/exile-market.sylent.tools/pull/5)).
- [x] **1. Specifications** ([#6](https://github.com/aunimhsn/exile-market.sylent.tools/pull/6)).
- [x] **2. Wireframe** ([#7](https://github.com/aunimhsn/exile-market.sylent.tools/pull/7)).
- [x] **3. Mock-up** ([#8](https://github.com/aunimhsn/exile-market.sylent.tools/pull/8), [#9](https://github.com/aunimhsn/exile-market.sylent.tools/pull/9)).
- [x] **4a. Skeleton and deployment** ([#10](https://github.com/aunimhsn/exile-market.sylent.tools/pull/10)).
- [x] **4b. The simple pages** ([#11](https://github.com/aunimhsn/exile-market.sylent.tools/pull/11)).
- [x] **4c. The home page, still** ([#12](https://github.com/aunimhsn/exile-market.sylent.tools/pull/12)).
- [x] **4d. The light motion** ([#13](https://github.com/aunimhsn/exile-market.sylent.tools/pull/13)).
- [x] **4e. The video** ([#14](https://github.com/aunimhsn/exile-market.sylent.tools/pull/14)).
- [x] **4f. The burst and the statistics** ([#15](https://github.com/aunimhsn/exile-market.sylent.tools/pull/15)).
- [x] **4g. The icon** ([#16](https://github.com/aunimhsn/exile-market.sylent.tools/pull/16)).
- [ ] **5a. The final images**: the video and the screenshots captured again in both languages from a fresh release build, the owner given the exact list of what only they can capture; the `alt` of the screens read again against the final captures. Done once the audit of the application (its step 17e) has passed, since its fixes may change the interface, and as close to the tag as possible, since the prices and the league date age. The icon of step 17a2 doesn't wait: it shows in the taskbar only, not in the captures. To decide here: the status line of the screenshots names poe2scout. Tool: launch.
- [ ] **5b. The site on its domain**: the site checked by the owner on the preview, the DNS switched by the owner, the custom domain and HTTPS, the repository variables `SITE_URL` and `BASE_PATH` removed (the statistics count only a build at the root) and a first visit read on the GoatCounter dashboard, the placeholder deleted at Cloudflare. If the stream comes before the captures, 5b goes first, with the images of 5a following. Tool: launch.
- [ ] **5c. The downloads open**: once the tag is out and its archives answer, `downloadsOpen` turned on, with a pass of `scripts/check-overflow.mjs` under the identity of an iPhone at 320 px on the home pages, since only that shows the sentence for a phone and measures its address. Tools: launch, code review.
- [ ] **6. Retrospective**: the lessons in `process.md` (and in the template when they apply to every website), the backlog sorted, the memory moved to the files. To talk over with the owner: the table of a code review summary and its priority column (`CLAUDE.md`, Code review), found missing on 2026-11-09, and carrying that rule to the template. Tool: retrospective.

The steps may be split into sub-steps when a pull request grows too large. When no step is left, Claude Code proposes the next items of the backlog to the owner.

## Needed in rust-exile-market

Done in the application's repository, before its tag, and not by a pull request here:

- The copy to the system clipboard (Copy whisper, Copy the log of the bug report), found broken on 2026-11-06: fixed by its pull requests 174 and 175, the paste check of the owner left to the Windows guides of its step 17f.
- The icon chosen at step 4g of this page, before the tag: its step 17a2 (`roadmap.md` of the application), so that a player finds the same icon in the taskbar.
- The Windows alert test, on a fresh download of the release archive, reading the state of Smart App Control: on 2026-11-06, the first launch showed a dialog with only an OK button (blocked because the publisher couldn't be verified, Microsoft will review the application), and the second launch ran normally. The cause is unknown; the page says only what is observed (`specs.md`, Why does Windows show an alert?). Done by the owner on 2026-11-08: the alert shows about one time in two; to refine with the feedback of players.
- Two improvements decided by the owner on 2026-11-06, not blockers, to write in its roadmap: the name of the orb under the pointer in the price block (step 21, with a wireframe and a mock-up first); a setting to close Exile Market when Path of Exile 2 closes (step 19, off by default, acting only once the game has been seen running, written to the log, the case of a crash or of a restart for a patch decided then).
- Archives with a stable name in `release.yml`, `exile-market-windows-x64.zip` and `exile-market-linux-x64.tar.gz` (owner, 2026-11-08), so that the buttons of the page link to `releases/latest/download/<name>`, an address that never changes (`src/lib/application.ts`).
- Step 17b of its roadmap still says a VPS with Coolify: the page is on GitHub Pages.
- Its specifications say the owner has no Windows: the owner now tests on a Windows laptop.
- Its specifications and `release.yml` still count macOS among the systems, while the page offers no macOS download (owner, 2026-11-06): keep the macOS archives on the release page, untested, or remove them.
- The license at the root in a file named `LICENSE` (step 17d, `GPL-3.0-or-later`): the footer of the page links to `blob/main/LICENSE`, which answers 404 as long as the repository has `LICENSE-APACHE` and `LICENSE-MIT`.
- `v0.1.0` published as a normal release, never a pre-release: `releases/latest` skips them.
- Donations for its step 18 (owner, 2026-11-06): free donations only, nothing paid in the tool, no perks, no image or logo of Grinding Gear Games near the button; email support@grindinggear.com before turning them on; ask the tax office how to declare them (the owner has no accountant); read again the rule of the developer documentation on commercial revenue. The banner of this page is designed and waits for that step (`backlog.md`).
- Its README (step 17d) states the risk for the account with the same words as the page (`specs.md`, The risk for your account), and the audit (step 17e) reads Ctrl + D against the macro rules of the developer documentation.
- The launch plan is only in Claude Code's memory: write it as a document there, with the steps and without the names of the streamers.
