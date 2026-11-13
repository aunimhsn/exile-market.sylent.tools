# Backlog

What is noted and not being done: an evolving list, read when the next work is chosen (process.md, The backlog), not at every session. When the owner picks an item, it leaves this file and becomes a step of [roadmap.md](roadmap.md).

## Polish

- The answer about the Windows alert, written from two observations of the owner: refine it with what players see. Noted on 2026-11-08.

- Real figures on the page (size of the download, start time, memory), once measured on Windows. Noted on 2026-11-06.

- The legal notes of the template and of sylent.art cite article 6 of the LCEN; the article in force is 1-1, since 23 May 2024. Depends on: the retrospective of this cycle, which carries it to the template. Noted on 2026-11-06.

- A new shape for the emblem, for a stronger identity than a new color alone: too long and uncertain before the tag, so step 4g keeps the current shape (owner, 2026-11-09). Depends on: the feedback after v0.1. Noted on 2026-11-09.

## Edge cases

- The sources of the video out of Git: its card and the ten small screens of its fan are read from `outputs/2026-11-06-video/assets/` (`docs/mockups/video/lib.js`), so the video can't be made again if `outputs/` is emptied. Depends on: the skill for the videos, at the retrospective (step 6). Noted on 2026-11-13.

- The video of the page on a real iPhone and in Safari: it starts, no black flash before its first image, Low Power Mode (if iOS draws its own play triangle, hide it with `::-webkit-media-controls-start-playback-button`). Left out of the launch by the owner on 2026-11-09, since the application doesn't address those visitors. Depends on: access to an iPhone or a Mac. Noted on 2026-11-09.

- A Windows installer or a bare `.exe` instead of a `.zip`, if players stumble on the archive. Depends on: the feedback on v0.1 and the application's release workflow. Noted on 2026-11-06.

## Features

- The donation banner, designed and ready to add (owner, 2026-11-08): one thin line above the header. Its design is in `docs/branding.md` (Components), and the mock-up shows it with the tab « Donation banner (later) ». Its words: « Exile Market is free. » and the link « Support it on Ko-fi »; « Exile Market est gratuit. » and the link « Soutenez-le sur Ko-fi ». To add then: the address of the donation page, the words in the content files, the service in `docs/external-services.md`. Depends on: step 18 of the application, which chooses the service (the words change if it isn't Ko-fi), and the conditions written in `roadmap.md` (Donations for its step 18). Noted on 2026-11-08.

- An « I'm interested » button with an anonymous counter (no IP stored, at most a daily-salted hash). Depends on: a back-end or a third-party service, checked in `docs/external-services.md`. Noted on 2026-11-05.
- A « notify me » email form with two separate unchecked consents (the release of the next versions, the news of the owner's next tools), an unsubscribe link in every mail, a service such as Buttondown, MailerLite or Brevo, and a privacy policy. Depends on: the choice of the service. Noted on 2026-11-05.
- Counting the clicks on the download buttons with GoatCounter (`data-goatcounter-click`), to see which source brings downloads and not only visits. GitHub already counts the downloads of each file. Depends on: the first figures. Noted on 2026-11-06.
- A page after the click, in both languages: the download starts by itself, a direct link stands in if it doesn't, and the steps of the system are shown at the moment they are needed, the Windows alert first. It would also count the downloads as visits of that page. It changes the rule that the buttons link straight to the file and that the visitor stays on the page. Depends on: the feedback on v0.1, if players stop at the alert. Noted on 2026-11-06.
- Clips of the streams on the page, if they don't distract from the download. Depends on: the first streams. Noted on 2026-11-06.
- The teasers of the page in a vertical format (9:16) for short clips and the streams, from the same compositions (`docs/mockups/video/`). Depends on: the choice of the video and of the launch channels. Noted on 2026-11-06.
- The demo video with the window over the real game, captured by the owner in the game. Depends on: the decision on images of the game on the page (clause 8 of the terms of Grinding Gear Games). Noted on 2026-11-06.
- Sound for the video of the page, starting with « The deck » (`hot-a`): sound effects rather than music (keys, cards, a thud on each word), the video still starts muted, and a speaker button lets the visitor turn the sound on, reachable with the keyboard and placed next to the pause button. One file can then serve the page, the streams and the social networks, for about 100 KB more on a 10 s video. Effects synthesized by code or from a CC0 sound bank, with their license in `docs/branding.md`, and judged by the owner's ear, since Claude Code can't listen to them. It changes the rule « The video has no sound » of `specs.md`. Depends on: the feedback of the owner's friends and the choice of the video. Noted on 2026-11-06.
- Not starting the video by itself when the visitor turned on the data saver of their phone (`navigator.connection.saveData`, Chrome on Android only): the still image and the play button, as with reduced motion, to spare them 2.5 MB. Kind: a small touch. Depends on: nothing. Noted on 2026-11-09.
- A screen of the estimated price of a rare item in the video: both rare items tried found no offer with their default filters. Depends on: a rare item with offers at capture time. Noted on 2026-11-06.

## Large works

- Signing the Windows executable, so that SmartScreen warns less: without a signature, each new version starts from zero. The SignPath Foundation offers it for free to open source projects, after an approval. Depends on: the feedback on v0.1 and the license of the application. Noted on 2026-11-06.

- Move the build to Node.js 26 LTS: `.nvmrc`, `engines`, `node-version` in `deploy.yml`, `@types/node` 26 and `docs/technical-choices.md`. Cost: one small pull request, about an hour with the checks. Node.js 24 is supported until 2028-04-30, so nothing urgent. If Dependabot proposes `@types/node` 25, post `@dependabot ignore this major version`: Node.js 25 is no longer maintained. Depends on: the launch of 2026-12-11, not to change the build just before it. Noted on 2026-11-06.
- Move to TypeScript 7 once the tools accept it, by hand since Dependabot ignores the 7.x line: `typescript` 7.1 or later, `typescript-eslint` with its support, and `tsc` with `@astrojs/ts-content-mapper` in place of `astro check`. Cost: about half a day (dependencies, `npm run lint`, the editor, `docs/technical-choices.md`), for little gain on a site this small. Depends on: a stable TypeScript 7.1, and the support of typescript-eslint and Astro. Noted on 2026-11-06.

## Waiting on others

## Explorations kept

- A project skill for product videos, from the six videos of step 3: capture the real application in a virtual session with its own display and clipboard, build the collection of assets, compose with Three.js, render frame by frame through Playwright and ffmpeg, compare the variants by heat on a review page. Lessons to carry: the sandbox limits of the capture, a private D-Bus session that starts the desktop portals on the host (crashes, leftover processes, and probably the unmounted Flatpak document portal that stopped Haruna from starting), the clipboard deadlock, `pkill -f` matching its own command, the two-pass encoding under the weight limit, and judging the motion on the owner's real screen. A lesson that holds for every project goes back to the template. Depends on: the retrospective of this cycle, and the owner's idea for automating the videos. Noted on 2026-11-06.
