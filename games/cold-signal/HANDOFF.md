# Cold Signal handoff

Written as a handoff for another AI assistant (ChatGPT) or developer picking up the project. Read this first, then `README.md` and `STATUS.md`.

## What it is
Cold Signal is a found-phone detective game for the browser (iPhone Safari first, desktop second), in the same genre as the App Store game "Untraced". The player gets someone's phone, works out the passcode, and reads every app on it. A forensic app called TRACE recovers deleted items. The player pins evidence to a corkboard and files a report in which every answer must be backed by a pinned clue. The game is M-rated adult comedy and drama.

There are two modes, shown as tabs on the case-files screen:
- **Cold Cases** (9 cases, all live): mysteries about missing and dead people. The handler is Ines Duarte, a cop who swears a lot.
- **Caught** (in progress, not live yet): you snoop through your own partner's phone at 2am to find out whether they're cheating. The handler is your best friend Dez. It adds a dread layer: heartbeat audio, the shower sound cutting out, typing dots, red "Seen" read receipts, a fast-draining battery and screen flicker. After the report you pick one of 4 confrontation endings, each played as a dialogue scene.

## Where things are
- **Repo:** `QemmHD/Random-stuff-`. The game lives in `games/cold-signal/`, a standalone Vite + TypeScript app outside the root npm workspaces. The rest of the repo is a different project (DORMANT GRID); don't touch it.
- **Branches:**
  - `main` is live and deploys to GitHub Pages automatically through `.github/workflows/pages-fallback.yml`.
  - `claude/sweet-thompson-u19wok` is the development branch, ahead of `main` with all the Caught work.
- **Live URL:** https://qemmhd.github.io/Random-stuff-/cold-signal/. It currently runs `main` at commit `edcc2d8`, the 9 Cold Cases build that passed the full regression.
- **CI:** `.github/workflows/cold-signal.yml` runs typecheck, unit tests and build on every push.

## Run it
```bash
cd games/cold-signal
npm ci
npm run dev          # http://localhost:5173
npm test             # vitest: case integrity + full-solve simulation for every case + engine tests
npm run build        # tsc + vite build → dist/
# Full UI playthroughs (Playwright + Chromium):
node tests/play.mjs <url> tests/output                 # Case 01, scripted
VIEWPORT=phone node tests/solve.mjs <index> <url>      # Cold case by index (0–8)
VIEWPORT=phone node tests/solve.mjs c<index> <url>     # Caught case by index (c0, c1, …)
```
Run the UI tests against a production build served statically (`npx vite preview --outDir <copy-of-dist> --port 5310`), not the dev server. The dev server hot-reloads when files change, which makes the tests flaky.

## Code map (`games/cold-signal/src`)
- `types.ts`: the `CaseFile` data contract.
  - Every case is pure data.
  - Optional fields: `mode` (`'cold' | 'caught'`), `handler`, `choices` (endings), `status`, `deviceCondition`.
  - On `Photo`: `hidden` (passcode-locked Hidden album) and `censor`; censor bars are switched off in CSS.
- `cases/`:
  - `case1.ts`–`case9.ts`, registered in `index.ts` as `CASES`.
  - `caught1.ts`–`caught4.ts`, registered in `caught.ts` as `CAUGHT`.
  - `WALKTHROUGH.md` has spoiler solutions.
- `game.ts`: game state and saves (localStorage).
  - Flags, pins (case clues, plus player notes with ids prefixed `n:`), player-drawn board strings.
  - TRACE jobs, live events (with a "typing…" phase), hints with a hint counter, scoring.
- `validate.ts`: reference-integrity checker plus a solver that proves every case can be finished. The vitest suite runs both on every case.
- `phone/`: the simulated phone.
  - `phone.ts`: lock screen, keypad, home screen, navigation, banners, photo zoom viewer.
  - `apps.ts`: all 12 apps plus phone-wide search, the Hidden album and the TRACE app.
  - `widgets.ts`: the pin button (every item can be pinned).
- `screens/`:
  - `menu.ts`: title screen, case files with the mode tabs, briefing, boot, epilogue. Also renders the dialogue endings: lines like `You: …`, `Name: …` and `(stage direction)`.
  - `investigate.ts`: the HUD, the handler comms and toast queue, and the Caught dread cues.
  - `board.ts`: the corkboard; drag on desktop, a grid on phones; player-drawn strings.
  - `report.ts`, `settings.ts`.
- `audio.ts`: WebAudio sound synthesized in code (sound effects, ambience, heartbeat, shower, door). Voicemails are read aloud with speechSynthesis.
- `mature.ts`: a "Mature language" toggle in Settings that replaces swear words with `#@$%!`.
- `extraPhotos.ts`: owner-supplied images in `public/hidden/` plus `manifest.json`, which appear in the Hidden album.
- `art/`: every image is a hand-written SVG string (no binary assets).
  - Per-case files `caseN.ts` and `caughtN.ts`, plus `hidden.ts` / `hidden2.ts` for the Hidden-album pin-ups, `avatars.ts` and `icons.ts`.
  - Everything is registered in `art/index.ts`.
  - Specs describing each image are in `art/specs-*.md`.
  - A missing art id renders a neutral placeholder.
- `strings.ts`: all player-facing UI strings.

## What's left (in order)
1. **Caught C4** ("girlfriend snoops his phone") is written and passes the tests, but **has no art yet**: the `cg4_*` ids in `art/specs-caught.md` currently render as placeholders. Its endings must use the dialogue format (`You:`, `Name:`, `(…)`).
2. **Caught C5 and C6 are not written.** The plan:
   - **C5:** a married couple who are *both* cheating, and halfway through it turns out she's been reading your phone too.
   - **C6:** your fiancée three weeks before the wedding: the maid-of-honor chat, a fake bachelorette weekend, and your best man is involved.

   Use `caught1.ts` as the quality bar:
   - 25–40 clues, 6–7 questions, 3–4 TRACE jobs, 8–12 live events and 4 `choices`, with dialogue-format endings.
   - A new passcode mechanism each time. The ones already used are listed in `WALKTHROUGH.md`.
   - Append them to `CAUGHT` and the art specs.
3. **Art for C4–C6** in the same SVG house style. Keep each file at 13 KB or less, prefix internal ids with the art key, and use no external refs.
4. **Full regression on a frozen build:** all 9 Cold Cases plus every Caught case with `solve.mjs`, at phone size. Every run must print `SOLVE OK`.
5. **Deploy:** fast-forward `main` to the tested commit and push. Pages redeploys automatically; confirm the live JS contains the new cases.

## Optional ideas the owner liked
- Baiting the lover by texting back as her.
- Disguised burner apps (a fake Calculator vault) and a dating app.
- A "Wall of Shame" trophy room of busted cheaters.
- Cinematic case intros and a music score.
- More cases.

## Content boundaries used so far
- M-rated adult comedy: strong language, crude and sexual humour and innuendo, drinking and drugs, non-graphic violence.
- Hidden-album art is suggestive but non-explicit: lingerie, swimwear, shirtless men, towels. No nipples or areolas, no genitals, no outlines through fabric.
- No explicit descriptions of sex acts, no genital references, no race used as sexual content, and no sexual content involving minors (teen characters stay clean).
- All names and dialogue are invented; no real people's messages are used.
- The owner wanted more explicit content than this. Those requests were declined. The owner can supply their own images through `public/hidden/`.
- The owner plans to publish on a store. Check that store's content rules before shipping.

## Gotchas
- After changing case data, run `npm test`. It catches broken references and cases that can't be completed.
- Live text events show a "typing…" indicator for 2.6 s before they're delivered, so add that to test waits.
- Photos only shown in other people's posts don't appear in the owner's camera roll.
- iPhone: audio unlocks on the first tap, inputs use a font size of at least 16px to stop iOS zooming in, and the layout respects safe areas. **Nothing has been tested on a physical iPhone yet.**
