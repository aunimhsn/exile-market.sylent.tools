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
- [x] **0b. Languages** ([#5](https://github.com/aunimhsn/exile-market.sylent.tools/pull/5)).
- [x] **1. Specifications** ([#6](https://github.com/aunimhsn/exile-market.sylent.tools/pull/6)).
- [ ] **2. Wireframe**: one Excalidraw wireframe of the page, phone first, with grey frames for the video and the screenshots. Tool: wireframes.
- [ ] **3. Mock-up**: 2 styles, one following the application, the other exploring; the two treatments of the video (the tool alone, the game behind it); the language link with and without a flag; checked on the owner's phone; decisions in `docs/branding.md`, tokens in `src/styles/tokens.css`. Tools: mock-up, design system.
- [ ] **4a. Skeleton and deployment**: the tokens and fonts of the mock-up in `src/styles/`, the brand assets (`npm run brand:images`), the header and footer, the deployment to the `github.io` preview. Tools: build, code review.
- [ ] **4b. The page**: the home page and the legal notice in both languages, the download buttons by system. Tools: build, code review.
- [ ] **5. Launch**: the video and the screenshots asked of the owner with their exact list, the site checked on the preview, the DNS switched by the owner, the custom domain and HTTPS, the placeholder deleted at Cloudflare; once the tag is out, the download buttons turned on. Tool: launch.
- [ ] **6. Retrospective**: the lessons in `process.md` (and in the template when they apply to every website), the backlog sorted, the memory moved to the files. Tool: retrospective.

The steps may be split into sub-steps when a pull request grows too large. When no step is left, Claude Code proposes the next items of the backlog to the owner.

## Needed in rust-exile-market

Done in the application's repository, before its tag, and not by a pull request here:

- **A blocker of the tag**: nothing written with `ctx.copy_text` reaches the system clipboard (Copy whisper, Copy the log of the bug report), while the pill reads « Copied ». Found in the owner's Windows test on 2026-11-06, on every system since the cause is in `Cargo.toml`: `eframe` has `default-features = false` without its `clipboard` feature, so the text stays inside the application. Likely fix, not run yet: add `"clipboard"` to the features of `eframe`, with a check that catches it and a line for Copy whisper in the guides of `docs/tests/`. The owner then repeats the paste check.
- The Windows alert test, on a fresh download of the release archive, reading the state of Smart App Control: on 2026-11-06, the first launch showed a dialog with only an OK button (blocked because the publisher couldn't be verified, Microsoft will review the application), and the second launch ran normally. The cause is unknown; the page says only what is observed (`specs.md`, Why does Windows show an alert?).
- Two improvements decided by the owner on 2026-11-06, not blockers, to write in its roadmap: the name of the orb under the pointer in the price block (step 21, with a wireframe and a mock-up first); a setting to close Exile Market when Path of Exile 2 closes (step 19, off by default, acting only once the game has been seen running, written to the log, the case of a crash or of a restart for a patch decided then).
- Archives with a stable name in `release.yml` (for example `exile-market-windows-x64.zip`, `exile-market-linux-x64.tar.gz`), so that the buttons of the page link to `releases/latest/download/<name>`, an address that never changes.
- Step 17b of its roadmap still says a VPS with Coolify: the page is on GitHub Pages.
- Its specifications say the owner has no Windows: the owner now tests on a Windows laptop.
- Its specifications and `release.yml` still count macOS among the systems, while the page offers no macOS download (owner, 2026-11-06): keep the macOS archives on the release page, untested, or remove them.
- `v0.1.0` published as a normal release, never a pre-release: `releases/latest` skips them.
- Donations for its step 18 (owner, 2026-11-06): free donations only, nothing paid in the tool, no perks, no image or logo of Grinding Gear Games near the button; email support@grindinggear.com before turning them on; ask the tax office how to declare them (the owner has no accountant); read again the rule of the developer documentation on commercial revenue.
- Its README (step 17d) states the risk for the account with the same words as the page (`specs.md`, The risk for your account), and the audit (step 17e) reads Ctrl + D against the macro rules of the developer documentation.
- The launch plan is only in Claude Code's memory: write it as a document there, with the steps and without the names of the streamers.
