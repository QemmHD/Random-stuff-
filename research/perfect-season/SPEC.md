# Perfect Season: product spec (v0.1)

A multi-sport "spin a random team and decade, draft legends, chase a perfect season" game. NBA first.
This spec records every decision made so far, with starting numbers for the systems. Every number is a **starting value**, tunable from the admin config (§13).
Research on the game we're learning from is in [`../82-0/README.md`](../82-0/README.md).

> **The name's built-in goal:** a perfect NBA season here is **82-0 in the regular season plus 16-0 in the playoffs**: 98 straight wins.

---

## 1. Decisions log

| Topic | Decision |
|---|---|
| Name | **Perfect Season** (checked: no existing draft game found; perfectseason.gg looked unused, but confirm at a registrar before buying) |
| Sports | Multi-sport engine, **NBA first** |
| Platform | Mobile-first website (portrait), no install |
| Visual style | Glossy video-game look (dark arena, glows, bold italic type, slot reels, court with jerseys) in our own **electric teal + gold** |
| Sound | Full sound and haptics, with toggles in settings |
| Language | English only, with all text in one strings file for later translation |
| Accounts | Guest by default; optional sign-in (Google / email) to save progress and appear on boards |
| Backend | **Supabase** (Postgres + auth + edge functions), free tier |
| Hosting | Vercel, free tier |
| Analytics | Privacy-friendly (Vercel Analytics or PostHog), no ad trackers |
| Money | **Earned coins only.** No real-money store, no ads |
| Coin rate | Generous: about one booster every 2–3 games |
| Modes (v1 scope) | Classic, Blind (stats hidden), Daily challenge, 1v1 vs bot |
| Respins | **1 free team + 1 free era per draft**; extra respins cost coins |
| Boosters | Prime, Trade, Double Pick, extra respins, unlocked by level |
| Eras | 1960s–2020s |
| Rosters | Full roster per team-decade (every player who appeared) |
| Positions | Historical positions (1–3 per player) |
| Team names | Historical names per decade (Seattle SuperSonics, New Jersey Nets, Buffalo Braves…) |
| Spin | Random, but **no repeat team+decade within one draft** |
| Lineup editing | Placed players can be swapped between slots they're both eligible for, until the draft ends |
| Draft feedback | Live category bars during the draft; the record stays hidden until the end |
| Player list | Sort by any stat; show games/seasons played for that team-decade. (No search or position filter for now.) |
| Rating | 5 stats plus a **balance bonus/penalty** against a "near-perfect" benchmark |
| Scoring openness | Show a category breakdown; keep the formula private |
| Result reveal | About 3-second ticker counting the W-L up, with highlight flashes |
| Luck | Regular season is deterministic (same lineup, same record); **playoffs include luck** |
| Playoffs | 4 best-of-7 rounds against **real all-time great teams**, escalating to a Finals boss |
| Grades | Letter grades F → S+ with our own tier names |
| Daily | Same 5 spins for everyone; first try is ranked and shareable, then unlimited practice |
| 1v1 | **Shared spin, snake draft** (both pick from the same team+era and can steal); vs bot at Rookie / Pro / Legend; friend links later |
| Blind mode | +50% coins and XP |
| Leaderboards | **Best single game** (not cumulative) |
| Share | Generated image card plus text with a link |
| Onboarding | Guided first draft with coach marks |
| Admin | Config-driven tuning panel (weights, cut-offs, rewards, prices, animation) |
| Build order | Core first, then layers (§15) |
| Fair modes | **No boosters in Daily or 1v1.** Free respins still apply (seeded in Daily) |
| Tier names | F Rebuilding · D Lottery Bound · C Playoff Team · B Contender · A Juggernaut · A+ Dynasty · S Legendary · S+ Perfect (approved) |
| Ultimate goal | **82-0 and 16-0 in the playoffs** = "PERFECT SEASON" trophy. 82-0 alone earns S+ |
| Daily reset | Midnight **US Eastern** |
| Code repo | New private repo **`perfect-season`**, created when real code starts (needs your OK at that moment) |
| Hero art | Stylized poster/comic illustration (not photoreal) |
| On-court players | Mini player cards in team colors (initials, decade, rating) |
| Next step | **Clickable design mockup** before real code, delivered as a private web link |
| First playable build | `perfect-season/` (Vite + React + TypeScript, client-only, progress saved in the browser). Next.js + Supabase come with accounts (§15, step 3) |
| Phone fit | Built for the iPhone 15 Pro Max first, and every other phone too: full width, height-adaptive, clear of the Dynamic Island and home indicator, installable to the home screen |

---

## 2. Core loop (NBA)

1. **Home**: big PLAY button, a mode picker (Classic / Blind / Daily / 1v1), and a sport carousel (NBA live, others "coming soon").
2. **Draft (5 rounds):**
   - SPIN rolls a TEAM reel and an ERA reel (the era reel lands about 250 ms after the team reel).
   - The drawer slides up with the full roster for that team-decade, showing games and seasons played. It can be sorted by stat.
   - Tap a player; their eligible open slots glow; tap a slot to place them. Placed jerseys take the team colors and the player's initials.
   - Live category bars (Scoring / Rebounding / Playmaking / Defense) update after each pick.
   - Under the reels: **free Team respin ×1** and **free Era respin ×1**; after that, respins cost coins.
   - Booster tray at the bottom (Prime / Trade / Double Pick).
3. **Season reveal**: a scoreboard counts up wins and losses to the final record in about 3 seconds, flashing highlights such as "Won 23 straight" or "Swept the Finals favorite."
4. **Playoffs**: 4 best-of-7 series against all-time great teams. Each series result animates (games tick 4-2, etc.). You can lose.
5. **Results**: record, playoff outcome, grade and tier, category breakdown, the five players, coins and XP earned, then **Share**, **Draft again**, and **Leaderboard**.

---

## 3. Rating model (v1 proposal)

**Inputs:** for each of the five players, per-game PTS, REB, AST, STL, BLK averaged over their games for that team in that decade. Missing pre-1973-74 STL/BLK are **estimated**: a regression on the player's other stats and position, scaled down slightly, which matches what 82-0 does (it adds about +0.7 for bench players up to +3 for stars, not zero).

**Step 1. Base strength:** a weighted team total. We start from 82-0's measured weights, which give rebounds and defense their real value:

```
base = 0.33·PTS + 0.67·REB + 0.64·AST + 1.20·STL + 1.13·BLK      (team totals)
```

**Step 2. Balance against a benchmark ("near-perfect team").** Each category is scored against a benchmark total (starting point: PTS 125, REB 55, AST 32, STL 9, BLK 7, to be calibrated from the data):

```
ratio_k   = team_total_k / benchmark_k            (one per category)
balance   = min(ratio) / mean(ratio)              (1.0 = perfectly balanced)
rating    = base × (0.85 + 0.15 × balance)
```

A lopsided team (huge scoring, no rim protection) loses up to 15%. This is the "a deficiency in one category can cost you" rule, made visible in the breakdown.

**Step 3. Regular-season wins:** a power curve that flattens near the top:

> **Tuned in the build** (`perfect-season/src/engine/rating.ts`, `sim.test.ts`): a piecewise-linear curve through anchor points replaced the formula below.
> - Measured on 3,000 simulated drafts each: random picks give a median of 30 wins, best available 58, smart drafting with respins 59, and 82-0 happens in about 0.1–0.2% of unboosted drafts.
> - Playoffs use `SERIES_K = 16` and opponent pools of 50–55 / 55–59 / 59–63 / 64+ wins. Title odds are about 11% at 62 wins, 47% at 70 and 91% at 82-0.

```
wins = clamp(round(0.332 × rating^1.15), 0, 82)        (82-0's measured curve; used in the mockup)
```

82-0 needs a rating of about 120. Once the data pipeline exists we'll tune the exponent and the benchmark, and optionally flatten the top above about 70 wins, so that:
- a random team lands at about 38–45 wins;
- the best pick every round with no boosters lands at about 58–66;
- 70+ needs good luck plus smart respins;
- **82-0 is about 0.5% of drafts.**

**Grades (by regular-season wins):**

| Grade | Wins | Tier name (ours) | Color |
|---|---|---|---|
| F | 0–37 | Rebuilding | red |
| D | 38–49 | Lottery Bound | slate |
| C | 50–56 | Playoff Team | amber |
| B | 57–62 | Contender | blue |
| A | 63–68 | Juggernaut | teal |
| A+ | 69–74 | Dynasty | bright teal |
| S | 75–81 | Legendary | gold |
| S+ | 82-0 | **Perfect** | animated gold |

On top of the grade there's a **Champion** badge if you win the title, and **PERFECT SEASON** if you go 82-0 and then 16-0.

(Reference: 82-0's observed bands are F ≤36, D 41–42, C 51–56, B 57–61, A 62–64; above that wasn't observed.)

---

## 4. Playoffs

- **Bracket:** 4 rounds, best-of-7. Opponents are **real historical teams**, drawn from a pool by round:
  - Round 1: about 55–60-win teams;
  - Round 2: about 60–64;
  - Conference finals: about 64–67;
  - **Finals boss**: a top-10 all-time team (e.g. '96 Bulls, '17 Warriors, '86 Celtics, '72 Lakers, '67 76ers, '71 Bucks).
- **Opponent rating:** the team's real record mapped back through the same curve.
- **Per-game win chance:** `p = 1 / (1 + e^(−(our_rating − opp_rating)/k))`, with a home-court edge of about +3% for the better seed. Each game is simulated with luck, so a 70-win team can lose a Finals.
- **Rewards:** coins for each series won, plus a title bonus.

---

## 5. Modes

| Mode | Rules |
|---|---|
| **Classic** | Stats visible. Counts toward the Classic board. |
| **Blind** | Stats hidden; the server sends **no stats**, so it can't be cheated. Alphabetical list with the sort control disabled. **+50% coins and XP.** Its own board. |
| **Daily** | Seeded by date: everyone gets the same 5 spins in the same order (respins also seeded). The first attempt is ranked and shareable ("Perfect Season #142: 71-11, lost in the Finals 3-4"). Replays are practice and unranked. Daily board, with a streak counter. |
| **1v1 vs bot** | One shared spin per round; snake order (A-B, B-A, …), with a coin flip for first pick. Both pick from the same team-decade, so you can take the player the bot wants. 20-second turn timer with auto-pick. Bot levels: **Rookie** (random top-50% pick), **Pro** (usually the best by base value), **Legend** (best pick plus smart slot planning). Higher levels pay more. Later: "challenge a friend" async links. **Bots are always labelled as bots**; 82-0 got complaints for passing bots off as people. |

---

## 6. Boosters and respins

| Item | Effect | Unlock | Price (coins) |
|---|---|---|---|
| Team respin | Re-roll the team reel | Lv1 (1 free per draft) | 25 per extra |
| Era respin | Re-roll the era reel | Lv1 (1 free per draft) | 25 per extra |
| Double Pick | Take two players from this team-decade this round | Lv2 (+1 free on unlock) | 60 |
| Trade | Swap the new pick with a player already on your team | Lv3 (+1 free on unlock) | 70 |
| Prime | Upgrade a pick to that player's best team-decade stat line (any team) | Lv4 (+1 free on unlock) | 100 |

- Limit: one booster of each kind per draft. **No boosters in Daily or 1v1**, to keep those fair (free respins still apply).
- **Booster hints:** a "Good moment for a PRIME!" nudge when a booster would add at least 5 rating points. It can be turned off in settings.

---

## 7. Economy (earned only)

| Source | Coins | XP |
|---|---|---|
| Finish a draft, by grade | F 20 · D 25 · C 30 · B 40 · A 50 · A+ 55 · S 60 · S+ 100 | 40 |
| Each playoff series won | +10 | +10 |
| Championship | +25 | +20 |
| Blind mode | ×1.5 on all of the above | ×1.5 |
| 1v1 win | Rookie +15 · Pro +30 · Legend +50 | +20 |
| Daily: first completion | +25 | +20 |
| Level up | +50 and the level's booster | |

**Levels:** XP needed per level is 70, 110, 140, 170, then +30 each (82-0's curve). A typical game gives 40–90 XP, so level 4 comes after about 6 games.

A typical C–B game with one series win earns about 40–50 coins. That's an extra respin almost every game and a Prime every 2–3 games, which matches "generous".

---

## 8. Leaderboards

- Boards: **Classic**, **Blind**, **Daily (today)**; windows: All-time / Weekly / Today.
- Ranking: **best single result** (regular-season wins, then playoff result, then rating as tie-breaks).
- Only **ranked runs** count. Ranked runs are **server-authoritative**: spins are rolled in a Supabase edge function, picks are validated, and the score is computed on the server. Practice runs can be fully client-side.
- Guests can see boards; signing in puts them on the board.

---

## 9. Sharing

- A generated **image card** (record, grade, playoff result, the 5 players with team colors and decades, and "Can you go perfect?"), plus text and a link that opens the same lineup.
- Daily share text: `Perfect Season #142 🏀 71-11 · A+ Dynasty · Lost Finals 3-4 to '96 Bulls → perfectseason.gg/d/142`

---

## 10. Look and feel (to be validated in the mockup)

- **Palette:** background `#04121A`, card `#0A1F2A`, line `#16323F`, **primary teal `#19E3C9`** (actions, active tab, eligible slots), **gold `#F5B83D`** (wins, champion, S grades), text `#F2F6F7` / `#8FA6B2`. TEAM reel in teal, ERA reel in gold.
- **Type:** a heavy condensed italic display face for PLAY / SPIN / records, and a clean sans for UI. Avoid 82-0's exact fonts; candidates are Oswald or Anton for display and Inter for UI.
- **Layout:** a 390px-wide design frame scaled to the phone's width (×1.10 on a 430px iPhone 15 Pro Max). Height is flexible, with four spacing classes from compact (iPhone SE in Safari) to roomy.
  - Backgrounds run under the Dynamic Island and home indicator; content and controls stay inside the safe area.
  - Portrait only, like a native app. iOS can't lock a website's rotation, so on a sideways phone the frame turns itself back to stay upright relative to the phone, with the island still at its top. Tablets and desktops get a phone-shaped frame.
- **Motion:** reel wind-up → blur → ease-out → 6 px bounce; jersey drop and glint on placement; ticker and confetti on results, with confetti density by grade.
- **Sounds:** spin start, reel tick, reel stop, pick, place, draft complete, ticker, playoff win and loss stings, title fanfare, coin, level up, button.
- **Hero art:** **stylized poster/comic illustration** of generic athletes in teal and gold (not photoreal like 82-0). The same style works for every sport.
- **On-court players:** **mini player cards** in team colors (initials, decade, rating number) rather than jerseys.
- **No NBA or team logos**: teams appear as abbreviation plus colors only.

---

## 11. Data pipeline (NBA)

1. **Sources:** per-season, per-team player totals for 1960-61 → today: games, minutes, PTS, REB, AST, STL, BLK, and listed position. Candidates are public historical NBA datasets (e.g. Kaggle databases built from stats.nba.com) and `nba_api` for modern seasons; check reference sites' terms before scraping. **ABA excluded.**
2. **Decades:** a season belongs to the decade it **ends** in (1989-90 counts as the 1990s). This is 82-0's rule, verified: Ewing's NYK 1990s line of 24.08 ppg / 11.02 rpg is exactly the games-weighted average of his 1989-90 → 1998-99 seasons.
3. **Aggregate** per (player, franchise identity, decade): games-weighted per-game averages over **all** of that player's seasons with that team in that decade (not a best-N stretch), plus games and seasons played.
4. **Estimate STL/BLK before 1973-74** (regression; flagged in the data and the UI).
5. **Positions:** career positions weighted by games: every listed position with at least 12% of the player's games, up to three (LeBron SF/PF, Magic PG/SG, Jordan SG/SF, Ewing C). Players with no listed position get the nearest one by stat profile. Checked by hand for the stars.
6. **Franchise identities:** about 45 historical names with decade ranges and colors (St. Louis Hawks 1960s → Atlanta, Buffalo Braves → Clippers, Vancouver → Memphis, Seattle SuperSonics, New Jersey Nets, Charlotte Bobcats…).
7. **Prime line:** each player's best team-decade line by base value.
8. **Output:** a versioned JSON or DB seed, with spot-check reports (top 10 per team-decade).
9. **Playoff opponents:** a curated list of about 60 historical great teams with their records and core players.

---

## 12. Tech architecture

- **Next.js (App Router) + TypeScript + Tailwind** on Vercel. Sound with Howler or the Web Audio API; haptics with `navigator.vibrate` where it's supported.
- **Supabase:** anonymous guest auth that upgrades to Google or email (magic link); Postgres tables for `profiles`, `wallets`, `runs`, `daily_seeds`, `leaderboard` views, and `config`; **edge functions** `start_run`, `spin`, `pick`, `finish_run` for ranked play.
- **Scoring engine:** one pure TypeScript package shared by the client (practice and live bars) and the edge functions (ranked).
- **Sport plugins:** `{ slots, eras, franchises, stats, weights, benchmark, seasonLength, playoffFormat }`, so NFL or soccer can be added without touching the core.
- **Config:** a `config` table, edited in an admin page, cached on the client.

---

## 13. Admin config (tunable without redeploy)

Rating weights, benchmark, curve constants, grade cut-offs, coin and XP tables, level curve, booster prices and unlock levels, respin counts, bot difficulty parameters, playoff opponent pool and k-factor, slot-machine animation timings, feature flags (modes on/off), and the daily seed salt.

---

## 14. Lessons from 82-0 to keep or avoid

- **Keep:** a 60-second loop; screenshot-able results; team colors on jerseys; slot-machine feel; Blind mode; server-side scoring for ranked play.
- **Avoid:**
  - removing the free respins (their biggest backlash);
  - removing sort/filter and lineup editing (complaints);
  - passing bots off as real opponents;
  - cumulative leaderboards that reward grinding;
  - the same team-decade coming up again and again;
  - letting the client know the opponent's whole lineup and score at the start (their 1v1 does this).

---

## 15. Roadmap

1. **Mockup:** a clickable phone prototype (home → spin → draft → reveal → playoffs → results) in teal and gold.
2. **Core:** data pipeline, Classic + Blind draft, rating engine, season reveal, playoffs, results, share card, guided first draft.
3. **Online:** Supabase accounts, Daily challenge, leaderboards, ranked server-side runs.
4. **Progression:** coins, XP and levels, boosters, nudges, profile and history.
5. **1v1 vs bot**, then friend challenge links.
6. **Next sport.**
