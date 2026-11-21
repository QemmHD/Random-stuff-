# COLD SIGNAL

A found-phone detective mystery for the browser (desktop and iPhone/Android, installable as a PWA).

You work for a police cold-case unit. Each case is one recovered phone: get past the lock screen, read messages, mail, notes, voicemails (spoken aloud), photo metadata, location history, browsing, bank and Wi-Fi records; use the **TRACE** forensic app to carve deleted files out of storage; pin evidence to a corkboard that strings related clues together; and file a **Case Report** where every answer must be backed by a pinned clue. Live texts arrive from unknown numbers while you work, and your handler Ines pings you with leads and hints.

- 3 original cases: *Low Tide*, *Dead Air*, *The Long Quiet* (difficulty 1–3).
- All art is hand-authored SVG and all sound is synthesized with WebAudio, so the whole game is about 100 KB gzipped.
- Saves automatically (localStorage). Works offline after the first visit.

## Develop

```bash
cd games/cold-signal
npm ci
npm run dev        # http://localhost:5173
npm test           # case integrity + solvability + engine tests
npm run build      # typecheck + production build into dist/
node tests/play.mjs http://localhost:5173/ tests/output   # full UI playthrough of case 01 (VIEWPORT=phone for iPhone size)
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
