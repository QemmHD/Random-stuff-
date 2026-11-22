# COLD SIGNAL

A found-phone detective mystery for the browser (desktop and iPhone/Android, installable as a PWA).

You work for a police cold-case unit. Each case is one recovered phone: get past the lock screen, read messages, mail, notes, voicemails (spoken aloud), photo metadata, location history, browsing, bank and Wi-Fi records; use the **TRACE** forensic app to carve deleted files out of storage; pin evidence to a corkboard that strings related clues together; and file a **Case Report** where every answer must be backed by a pinned clue. Live texts arrive from unknown numbers while you work, and your handler Ines pings you with leads and hints.

- Nine Cold Cases and six Caught investigations (difficulty 1–3). Caught is an adult relationship mystery series with animated openings in C4–C6 and branching confrontation scenes.
- The game’s art uses self-contained SVG, and its sound effects and ambience are synthesized with WebAudio.
- Saves automatically (localStorage). Works offline after the first visit.

## Develop

```bash
cd games/cold-signal
npm ci
npm run dev        # http://localhost:5173
npm test           # case integrity + solvability + engine tests
npm run build      # typecheck + production build into dist/
npm run preview -- --port 5310
VIEWPORT=phone node tests/solve.mjs 0 http://localhost:5310/  # Cold Case 01
VIEWPORT=phone node tests/solve.mjs c0 http://localhost:5310/ # Caught C1
```

## Layout

- `src/types.ts`: the case data contract. Cases are pure data (`src/cases/caseN.ts`).
- `src/game.ts`: flags, pins, TRACE jobs, live events, hints, scoring, saves.
- `src/phone/`: the simulated phone (lock screen, home, apps, viewer, search).
- `src/screens/`: title, case files, briefing, investigation HUD, evidence board, report, epilogue.
- `src/art/`: SVG art registry (icons, avatars, per-case art).
- `src/validate.ts`: referential-integrity checks and a solver that proves every case can be finished.
- Spoiler walkthroughs: `src/cases/WALKTHROUGH.md`.

## Adding a case

Write a `CaseFile` in `src/cases/`, add its art to `src/art/`, and register both. `npm test` then fails if anything is unreachable or inconsistent.

## Your own Hidden-album images

Put image files (jpg/png/webp/gif) in `public/hidden/` and list them in `public/hidden/manifest.json` under a case id (e.g. `"low-tide"`) or `"*"` for every case:

```json
{ "*": [{ "file": "pic1.jpg", "place": "Bathroom mirror", "t": "2026-10-02T23:14" }] }
```

They appear in that phone's passcode-locked **Hidden** album after the next deploy.
