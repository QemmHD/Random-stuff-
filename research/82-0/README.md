# 82-0 teardown: look, UI, gameplay, and how it was built

Research for building our own "spin a random team and era, draft five players, try to go undefeated" game.

> **About the name.** I could not find an app called "93-0", and 93-0.com doesn't resolve. The game this describes is **82-0** (82-0.com), the viral original from June 2026. The NHL clone is called **98-0**. Everything below comes from playing 82-0.com in a headless phone browser on 2026-10-24: screenshots, the network calls it makes, its CSS and JS bundles, its remote config, and its UI text. Press coverage is used for the history.

---

## 1. The game in one paragraph

You get five rounds. In each round you hit **SPIN**, and two slot-machine reels land on a random **NBA franchise** and a random **decade** (1960s–2020s). A drawer slides up listing every player who played for that team in that decade, with their per-game averages for that stint. You pick one player and drop them on an open position (PG / SG / SF / PF / C) on a half-court graphic. After five picks, a "Calculating results…" screen plays, then you get a **projected record** (e.g. `56 - 26`), a **score** in points (e.g. `86.5 pts`), and a **letter grade** with a label (`C SOLID`). The goal is to hit **82-0**, and almost nobody does. It takes about 60 seconds, it's luck plus knowledge, and the result is a screenshot-able, arguable record, which is why it spread.

---

## 2. Core gameplay rules

### 2.1 The draft loop

| Step | What happens |
|---|---|
| Start | `POST /game-session/v4/session/start` with `{league:"nba", game_mode:"classic", opponent:"solo"\|"bot", stats:"visible"\|"hidden"}`. The server returns a session id, the 5 slots, and the reel contents (45 team identities, 7 eras). |
| Spin | `POST /session/spin {session_id, seq, action:null}`. **The server decides the team and era.** The client only animates the reels to land on the server's answer. |
| Pick | Tap a player row. The drawer collapses and the eligible positions on the court **glow orange with a "+"**. Tap one to place the player. |
| Next spin | The pick is sent **with the next spin request** (`action:{type:"pick_player", slot, player_id, team_id, era}`), and the response is the next cell. |
| Final pick | The 5th pick request also includes `final_roster`. The response is the result: score, record, grade, rewards, and XP. |

Other rules:

- **One player per round, five rounds, five positions.** There's no explicit "one per decade" rule. Teams and eras can repeat.
- **Multi-position eligibility.** Each player has 1–3 listed positions from historical usage, e.g. Kevin Durant `PF SF SG`, Ewing `C PF`, Barkley `PF` only. Flexible players are valuable because they keep your options open later.
- **The roster pool is the whole roster, not just starters.** NYK 1990s returned **51 players**. Stats are **averaged over that player's games for that team in that decade**, so a star who arrived late or declined there can look worse than you'd expect.
- **Historical team identities.** The reel has 45 entries mapping to about 30 franchises, each with era ranges and colors, e.g. St. Louis Hawks (1960s) → Atlanta Hawks (1970s+), Buffalo Braves → LA Clippers, Vancouver → Memphis, NO/Utah Jazz, Charlotte Bobcats vs Hornets. Expansion franchises only appear in decades they existed.
- **Old-era defensive stats.** Steals and blocks weren't tracked before 1973-74, so the site says "Missing defensive stats from older eras are estimated fairly."
- **Respins.** The original game gave **1 free team respin and 1 free era respin per draft** (buttons under each reel). In the current live version these became **boosters** that cost coins or a rewarded video ad (max 6 per draft) and show greyed out when you have none.

### 2.2 Boosters (added later as monetization)

Boosters sit in a tray at the bottom of the drawer. They unlock by player level and can be bought with coins.

| Booster | Effect (their wording) |
|---|---|
| **Respin Team / Respin Era** | Re-roll one reel. |
| **Prime** | "Upgrade the player to their best-ever version. Any team, any era." Every player in a cell carries a `prime` object: their best team-decade stat line, e.g. Jeremy Lin GSW 2.6 ppg → NYK 14.6 ppg. |
| **Trade** | "Swap your pick with a player already on your team." |
| **Double Pick** | "Draft two players from the same team & era into your lineup." |

There is also a **nudge system** that pops "Good moment for a PRIME!" when a booster would add value (e.g. Prime gains at least 5, or it's the last slot), limited to once per round.

### 2.3 Modes

| Mode | Difference |
|---|---|
| **Classic** | Stats visible. |
| **Hoop IQ** | Stats hidden. Pick from memory. Separate leaderboard. |
| **1 VS 1** | Matchmaking screen ("Finding an opponent…"), a **coin flip for first pick**, alternating turns, a **20-second turn timer** (urgent styling at 5s, auto-pick on timeout), then a higher-points-wins comparison. The opponent is a bot (`opponent:"bot"`). |
| **Trivia** | Separate quiz game: "Playoff Run" (best-of-7 series) or "Classic 20". 20s per question, faster answers score more. |
| **College** | Listed as "coming soon". |
| Sister games | **Ultimate 11** (soccer) and **All Dubs** (NFL), built by the same company on the same backend. |

### 2.4 Scoring and the win curve

The score is computed **on the server** and never shown as a formula. The How to Play text says:

- It uses five stats only: **PTS, REB, AST, STL, BLK** (per game), summed across the five players. There are no positional or synergy penalties.
- "Your team's **Strength Rating** is a cumulative total of these categories." That rating is the `pts` number on the results screen.
- "The engine runs your aggregate stats through a **win-projection curve**… not linear. As your team strength increases, each additional win becomes significantly harder to earn."
- "A deficiency in even one category can prevent a perfect season."
- The founder calls the grading "the secret sauce" and says they keep adding stats to it.

**What I measured.** I played 14 automated games (picking the best, a random, or the worst available player each round) and logged the server's result with the five players' stats. Two formulas fit every sample.

**1. Score ("Strength Rating") is a weighted sum of the five players' totals:**

```
score ≈ 0.33·PTS + 0.67·REB + 0.64·AST + 1.20·STL + 1.13·BLK
```

This fits the 8 games without missing old-era stats to within ±0.6. Per point of score, **a rebound is worth about 2 points scored, and a steal or block about 3.5**. That's why a Truck Robinson (23/15) team beats a pure-scorer team.

**2. Record is a power curve of the score:**

```
wins ≈ 0.332 · score^1.15     (capped at 82)
```

This fits all 13 distinct samples (4 to 64 wins) within ±0.6 wins.

| Score | Record (observed) | Grade |
|---|---|---|
| 8.4 | 4-78 | F |
| 30.8 | 17-65 | F |
| 49.1 | 29-53 | F |
| 82.9 | 54-28 | C |
| 86.5 | 56-26 | C |
| 96.5 | 64-18 | A |

Extrapolating the curve gives about **66 pts → 41 wins**, **105 pts → 70 wins**, and **120 pts → 82-0**. I couldn't sample above 96.5, and their docs say wins get harder at the top, so the real curve probably bends flatter than this above about 100.

**Grade thresholds observed:** 4–29 wins is F, 54–56 is C, and 64 is A. The exact cut-offs between those weren't hit.

### 2.5 Grades

| Grade | Label (UI) | Color | Sound / haptic |
|---|---|---|---|
| S+ | PERFECT | `#feaf4c` gold | `result_top` / win |
| S | LEGENDARY | `#a855f7` purple | `result_high` / win |
| A+, A | DYNASTY | `#00df91` green | `result_mid` / land |
| B | CONTENDER | `#3b82f6` blue | `result_mid` / land |
| C | SOLID | `#f59e0b` amber | `result_mid` / land |
| D | CASUAL | `#64748b` slate | `result_mid` / land |
| F | TANKING | `#ef4444` red | `result_low` / lose |

Each grade also sets the result card's background gradient and confetti density (2 for A/B, 1 for C/D).

---

## 3. Screen by screen

Reference screenshots are in [`screens/`](screens/), captured at an iPhone size of 390×844.

| # | Screen | Key details |
|---|---|---|
| 01 | **Home** ([screen](screens/01-home.jpg)) | Full-bleed AI-rendered hero (a player in an orange #82 jersey in a dark arena with blue and orange stage lights). The mode name ("CLASSIC") is in a huge italic display font. The league is a carousel (‹ PRO BASKETBALL • COLLEGE ›). There's a big skewed orange **PLAY** button, a navy skewed **MODE** button, and a bottom tab bar (Friends · Leaderboards · **Home** · Challenges · Store) whose active tab is a raised orange plate. The top bar has an avatar with a level ring, an XP bar, a coin wallet, and a hamburger menu. |
| 02 | **Mode picker** ([screen](screens/02-mode-picker.jpg)) | A bottom sheet with an angular notched top edge. The hero blurs behind it. Each mode is a chamfered-corner card with a player render, an underline accent, and a chevron. The selected card glows orange. |
| 03 | **Draft board** ([screen](screens/03-draft-empty-court.jpg)) | "ROUND 1 / 5 - CLASSIC" with a 5-segment progress bar. **Two reel windows**: TEAM in an orange frame, ERA in a purple frame, both with metallic bezels and "?" before spinning. Below is a dark perspective **half-court** with five grey jerseys in basketball formation (C and PF near the rim, SF and SG on the wings, PG at the top). There's a big orange **SPIN** CTA. |
| 04 | **Spinning** ([screen](screens/04-reels-spinning.jpg)) | Reels scroll with motion blur. Team stops first, era 250 ms later. |
| 05 | **Player drawer** ([screen](screens/05-player-drawer.jpg)) | The drawer slides up with a notched top tab. Header "NYK • 90's". There's a search box, position filter chips (ALL / G / F / C), and a sort dropdown (PPG…). Each row is a rounded dark card showing the name, positions ("C • PF"), and a 5-stat grid. The booster tray is pinned at the bottom (locked icons). |
| 06 | **Player selected** ([screen](screens/06-eligible-slots-glow.jpg)) | The drawer collapses. Only the jerseys at eligible positions turn **orange with a pulsing halo and a "+"**, and their labels turn gold. |
| 07 | **Jerseys placed** ([screen](screens/07-jerseys-placed.jpg)) | Placed jerseys are tinted in the **team's primary/secondary colors** with the player's **initials** (PE, TR, DD…). Tinting uses a mask: one base image plus body and trim masks. |
| 08 | **Calculating** ([screen](screens/08-calculating.jpg)) | Full-screen dark arena photo, a scoreboard reading "82-0", a bouncing basketball, and "CALCULATING RESULTS..." with animated dots. A looping sound plays. |
| 09 | **Reward popup** ([screen](screens/09-reward-popup.jpg)) | "Reward / [coin] 10 / CLAIM". In the app there's also "WATCH (ad) → GET x2". |
| 10 | **Results** ([screen](screens/10-results.jpg)) | A huge record `56 - 26` (orange dash), `85.5 pts • C SOLID`, and an XP bar filling "+36 XP / 36 / 70 XP". Then a "CLASSIC" divider and five roster rows, each **tinted with the team color**, showing slot, name, "ATL · 20's", and 5 stats. A totals row follows (110.6 PPG, 31.9 RPG…). Then a Sign-in card, **SHARE RESULTS**, and **DRAFT AGAIN**. The header shows "Can you go 82-0?" next to the logo. |
| 11 | **1v1** ([screen](screens/11-1v1-turn-timer.jpg)) | Same board with "ROUND 1 / 5 - 1V1" and an orange **20** countdown bubble. |
| 12 | **Leaderboard** ([screen](screens/12-leaderboard.jpg)) | Classic / Hoop IQ tabs, All Time / Weekly / Daily, and a **podium** (gold #1 center, silver #2, bronze #3) with initial avatars. Points are **cumulative across all your games** (top players have millions). |

---

## 4. Visual design system

**Overall feel:** dark, glossy "mobile sports game" UI (think 2K/FIFA menus) rather than a flat web app. Lots of skewed and chamfered shapes, glows, sheen sweeps, and italic uppercase type. Orange is the main action color, navy/blue the secondary, and purple marks the era reel and the 1v1 rival.

**Colors (from their CSS):**

| Token | Value | Use |
|---|---|---|
| App background | `#000914` / `#010a14` | Near-black navy |
| Card | `#091220`, `#1a1f2e` | Panels and rows |
| Border | `#242f41`, `#2d3548` | Hairlines |
| Primary / brand | `#fd6a00` (`#fe8200` glow) | PLAY, SPIN, active tab, selected states |
| Accent warm | `#ff8d28`, edge `#ffcc00` | Highlights |
| Text | `#f3f4f4` / secondary `#889cb0` / muted `#5d6a83` | |
| Rating / points blue | `#2d6fea` | Leaderboard points |
| Medal | gold `#ffce54`, silver, bronze `#cd7f32` | Podium |
| Era reel / rival | purple `#7c4eff` / `#8d54ff` | |
| Grade colors | see §2.5 | |

**Typography:** **Fira Sans** for body and UI. Display text uses **Barlow Condensed / Teko / Saira** in heavy italic uppercase (PLAY, SPIN, CLASSIC, records). **Geist Mono** for numbers in places.

**Layout trick:** everything is designed on a **fixed 390×844 frame** and scaled to the viewport with CSS variables (`--td-frame-w:390; --td-frame-h:844; --td-k:min(100dvw/390, 100dvh/844)`). That keeps it pixel-perfect on every phone. It's **portrait only**: landscape shows "Please rotate your device." Safe-area insets are handled.

**Motion (keyframe names give the vocabulary):** `reel-land`, `spin-pulse` (the SPIN button breathes, which is why automated clicks see it as "unstable"), `va-jersey-eligible-pulse/halo` (glowing open slots), `va-jersey-place/impact/burst/cheer/ini-pop` (jersey drop-in when you place someone), `court-flash` and `court-shake`, `classic-result-rec-land/rec-shine/loss-hit/pts-bump/row-in/glint` (the results reveal is choreographed: the record slams in, then the points bump, then rows cascade), `td-play-boom/spark/halo` (PLAY button press), `level-up-popup-in`, and `confetti`.

**Slot-machine tuning (remote config):**
```json
{ "totalDurationMs": 1300, "rowsPerSecond": 30, "delay": 250,
  "windup": {"distance": 12, "duration": 140},
  "acceleration": {"duration": 80,  "blur": [0,1], "smear": [0,0.5], "spacing": [0,12]},
  "maxSpeed":     {"duration": 300, "blur": 1, "smear": 0.5, "spacing": 12},
  "deceleration": {"duration": 700, "blur": [1,0], "smear": [0.5,0], "spacing": [12,0]},
  "stopBounce":   {"distance": 6, "duration": 130, "returnDuration": 150} }
```
So: a small wind-up, a fast blurred spin, a long ease-out, and a 6 px overshoot bounce. The era reel starts 250 ms after the team reel.

**Sound cues (24 short .m4a files):** `spin_start`, `reel_tick`, `reel_stop`, `respin`, `player_select`, `player_place`, `draft_complete`, `calculating_loop`, `rating_roll_up`, `result_low/mid/high/top`, `xp_grant`, `level_up`, `coin_appear`, `coin_land`, `buy`, `button_click`, `drawer_open/close`, `store_tab`, `store_back`. In the app, haptics (`land`, `win`, `lose`) are paired with results.

**Art:** AI-rendered hero players in generic numbered jerseys (no real players or NBA logos), an arena-at-night background, a court texture, and a jersey sprite with tint masks. Teams are shown only as **abbreviation plus primary/secondary color**, with no logos.

---

## 5. Meta, retention, and monetization

- **Guest-first.** On first load you're silently signed in as an anonymous guest ("Playing as Guest, User ID #84060420"). Sign-in (Google / Facebook / email) is pitched as "save your progress & compete on the leaderboard."
- **XP and levels.** Each game grants XP that scales with the score (36 XP for a C; level 2 at 70 XP). Levels unlock boosters. There's a level-up popup with rewards.
- **Coins.** 10 coins for a C game, and you can watch an ad for 2x. Coins buy boosters and respins. The store sells coins and boosters (IAP only in the app; the web store says "Available in the app").
- **Leaderboards.** Classic and Hoop IQ, each with All-time / Weekly / Daily windows. Ranking is **accumulative**: the sum of all your scores, which rewards volume.
- **Challenges.** Create a private board, share an invite link, and compete with friends ("{username} got {wins}-{losses} — can you get more?").
- **Share.** "I just went {score}, think you can go 82-0?" This plus screenshots is the main growth loop.
- **Profile.** Games played, best score, best record, and recent games per mode.
- **Ads.** Web: Nitropay display banners on lobby, leaderboard, and other pages. App: AppLovin MAX interstitials (configured for one every 2 games, after the first 3), plus rewarded video for respins and 2x coins.
- **Live ops.** Remote "campaigns", popups, a force-update gate, rate-us prompts (after 4 games), a giveaway modal, and a "Get the App" popup.

---

## 6. How it was built

### 6.1 History

- **Created by Roy Saar**, an NBA fan. It went viral in early June 2026, mainly after Pacers guard **Tyrese Haliburton** posted his lineup (77-5).
- Israeli game company **PlayVault** (CEO Bar Almog) partnered with Saar soon after. They now publish it, along with Ultimate 11 (soccer) and All Dubs (NFL), under their publishing label **Vaulty Studios**, plus iOS and Android apps (`com.vaultystudios.eightytwoand0`).
- The page still carries `<meta name="generator" content="v0.app">`, so **the original site was scaffolded with Vercel's v0 AI builder**, then grown into a full product.
- Dozens of clones followed: NHL **98-0**, MLB **162-0**, NFL **17-0**, "Better 82-0", "82-0 Challenge", and multi-sport **84-0**.

### 6.2 Tech stack (observed)

| Layer | What they use | Evidence |
|---|---|---|
| Frontend | **Next.js** (App Router, React Server Components, Turbopack build), React | `/_next/static/chunks/turbopack-*.js`, `?_rsc=` requests |
| Styling | **Tailwind CSS v4** plus shadcn/ui-style theme tokens (`--background`, `--primary`, `--card`…), and lots of custom CSS variables and keyframes | CSS bundle |
| Hosting | **Vercel** | `eighty-two-and-0-git-prod-play-vault.vercel.app` in auth domains |
| Auth | **Firebase Auth** (anonymous first, then Google/Facebook/email), a tenant per game | `identitytoolkit` calls |
| Backend | Their own multi-game platform at `api.vaultystudios.com`: `users`, `config`, `game-session v4`, `events`, `liveops`, `iap` services. The same backend serves ultimate11.com and alldubs.com. | Network log |
| Game logic | **Server-authoritative.** The server rolls team and era, holds the player database, validates picks, and computes the score. The client is a renderer, which is what makes leaderboards cheat-resistant. | `/session/start`, `/session/spin` |
| Config | **Everything is remote-config driven**: modes, slots, boosters, reel animation, sounds, grade styling, ad placements, leaderboard boards. They can tune the game without shipping code. | `/config/api/v1/configs` (23 KB) |
| Assets | Google Cloud Storage for sounds and i18n JSON (en-GB, es-MX, pt-BR). WebP images in the Next.js `public/`. | `storage.googleapis.com/vaulty-studios-prod-assets/...` |
| Telemetry | Sentry (5% trace sampling), GA4 via GTM, TikTok pixel, AppsFlyer (web-to-app attribution), own `/events` batching every 60s | Network log |
| Consent / ads | Cookiebot, Nitropay (web), AppLovin MAX (app) | Network log, config |

### 6.3 Data model (as the API returns it)

```jsonc
// reel entry (one per franchise identity)
{ "team_id": "340", "name": "St. Louis Hawks", "abbr": "STL",
  "primary_color": "#C8102E", "secondary_color": "#FFFFFF", "eras": ["1960s"] }

// a spin result ("cell")
{ "seq": 0, "era": "1990s",
  "team": { "team_id": "359", "abbr": "NYK", "name": "New York Knicks", "primary_color": "#006BB6", "secondary_color": "#F58426" },
  "squad": [
    { "player_id": "23621", "name": "Patrick Ewing", "positions": ["C","PF"],
      "stats": { "ppg": 24.08, "rpg": 11.02, "apg": 2.16, "spg": 0.95, "bpg": 2.7 },
      "prime": { /* same player, best team+decade line, with its team */ } }
    // …all ~30–55 players who played for that team that decade
  ],
  "legal": ["pick_player"], "boosters": { /* per-booster allowance */ } }

// final response
{ "score": 86.5,
  "score_display": { "name": "56-26", "detail": { "wins": 56, "losses": 26, "grade": "C", "grade_label": "PLAYOFF" } },
  "rewards": [ {"amount": 36, "currency": "xp"}, {"amount": 10, "currency": "coin"} ],
  "roster": [ /* 5 slots with full player + team objects */ ] }
```

---

## 7. What this means for our version

**Copy the loop, not the brand.** The mechanics (spin, draft, place, simulate, share) are a genre now; the clones prove it. We need our own name, art, sounds, and colors, and like them we should show teams as abbreviation plus colors only (no logos).

**Suggested MVP (one weekend of work):**
1. Home → Draft (5 rounds: spin, drawer, place on court) → Calculating → Results + Share. Add a Classic / Hoop IQ toggle.
2. 1 team respin and 1 era respin per draft (the original rule; it's more fun than paid boosters).
3. All client-side: a static JSON player database and a pure `score(roster) → {pts, wins, grade}` function. Move the roll and the scoring to a server only when we add leaderboards.
4. Mobile-first, portrait, built on a fixed 390×844 design frame. Next.js or Vite + React + Tailwind.

**The hard part is the data.** We need, for every team × decade, every player's per-game PTS/REB/AST/STL/BLK averaged over their games with that team in that decade, plus listed positions and historical team names and colors. Options: a public historical NBA dataset (e.g. the Kaggle NBA databases built from stats.nba.com), `nba_api` for modern seasons, and season-by-team totals from reference sites (check their terms before scraping). STL/BLK before 1973-74 must be estimated (they do the same).

**Scoring.** Start from the measured formula in §2.4 (weighted totals, then `wins = 0.332·score^1.15`, capped at 82) and tune it to our own data. **Tuning targets:** a random team should land around .500 (about 41 wins). A "pick the best guy every round" team should land around 55–65. 70+ should be rare and exciting. 82-0 should be possible but basically a lottery ticket.

**Ideas after the MVP, in order of payoff:** shareable result image and text, daily seeded challenge (everyone gets the same spins), 1v1 vs bot with a turn timer, leaderboards (server-side scoring), then boosters (Prime / Trade / Double Pick).

---

## Sources

- Live inspection of https://www.82-0.com (2026-10-24): screenshots, network log, `/config/api/v1/configs`, en-GB translations, JS/CSS bundles
- [Yahoo Sports: "Addicting" 82-0 basketball game goes viral](https://sports.yahoo.com/articles/addicting-82-0-basketball-game-040936999.html)
- [Complex: 82-0 NBA Twitter viral game](https://www.complex.com/bets/a/matt-burke/82-0-nba-twitter-viral-game)
- [Hans Cho: "82-0: A User Guide"](https://hcho.substack.com/p/82-0-a-user-guide)
- [Interview with PlayVault CEO Bar Almog (republished)](https://thednvr.com/?p=267747)
- Clones: [98-0 (NHL)](https://98-0.com/), [162-0 (MLB)](https://diamond-draft.app/), [17-0 (NFL)](https://17-0game.com/), [Better 82-0](https://better-82-0.com/), [82-0 Challenge](https://82-0-challenge.com/), [NHL 82-0](https://nhl82.ca/)
