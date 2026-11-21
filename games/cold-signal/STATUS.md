# Cold Signal — status

**Live URL (once Pages is enabled):** https://qemmhd.github.io/Random-stuff-/cold-signal/

## Done
- **Engine:**
  - simulated phone: lock screen, keypad, home screen, 12 apps, phone-wide search, photo zoom and metadata, locked notes, spoken voicemails with transcript
  - TRACE forensic recovery
  - evidence board with red-string links, a draggable desk layout and a phone grid
  - case report with an evidence picker
  - live events, handler comms, hints, scoring, stars and rank
  - autosave, offline play (service worker) and PWA install
- **5 cases, each with full art:**
  - 01 Low Tide
  - 02 Dead Air
  - 03 The Long Quiet
  - 04 Last Chair
  - 05 The Last Room
- **Tests:**
  - `npm test` checks every case's references and runs a simulated full solve, so a case cannot ship soft-locked.
  - `tests/play.mjs` and `tests/solve.mjs` play cases through the real UI at desktop 1440×900 and phone 390×844. All 5 cases solve with zero console errors.

## Not verified
- Not tested on a physical iPhone, so Safari audio unlock, speech voices and PWA install are untested on device.
- Spoken voices depend on the voices the device has.

## Next ideas
- More cases (the data format makes this mostly writing and art).
- A "detective notes" scratchpad.
- A timeline reconstruction mini-game before the report.
- Achievements for no-hint solves.
