# 82-0 teardown: look, UI, gameplay, economy, and how it was built

Research for **Perfect Season**, our own game (decisions and spec in [`../perfect-season/SPEC.md`](../perfect-season/SPEC.md)).

> **About the name.** I couldn't find an app called "93-0", and 93-0.com doesn't resolve. The original is **82-0** (82-0.com, June 2026). The NHL clone is **98-0**.
>
> **Method.** On 2026-10-24 I played 82-0.com in a headless phone browser: **about 80 automated games** across 8 fresh guest accounts, one full 1v1, Hoop IQ, a paid respin, and the Double Pick and Prime boosters (Trade is described from the UI text). I logged every API call, read the remote config, the full UI text, and the CSS/JS bundles. Web research covers history, store listings, and community knowledge. Anything inferred rather than observed is marked.

---

## 1. The game in one paragraph

You get five rounds. In each round you hit **SPIN**, and two slot-machine reels land on a random **NBA franchise** and **decade** (1960s–2020s). A drawer lists every player who appeared for that team in that decade, with games-weighted per-game averages. You tap a player and drop them on an eligible open position (PG / SG / SF / PF / C) on a half-court. After five picks there's "Calculating results…", then a **projected record** (`56 - 26`), a **score** in points (`86.5 pts`), and a **grade** (`C SOLID`). The goal is 82-0. It's about 60 seconds of luck plus knowledge, with a screenshot-able, arguable result.

---

## 2. Gameplay rules

### 2.1 Draft loop and API

| Step | Client → server | Notes |
|---|---|---|
| Start | `POST /game-session/v4/session/start {league:"nba", game_mode:"classic", opponent:"solo"\|"bot", stats:"visible"\|"hidden"}` | Returns a session id, slots, and reel contents (45 team identities × eras, 7 decades). In 1v1 it **also returns the bot's full lineup and final score** (§2.4). |
| Spin | `POST /session/spin {session_id, seq, action:null}` | **The server rolls the team and decade.** The client only animates. The response is a "cell": team, era, the full squad (30–80 players), `legal` actions, and booster allowances. |
| Pick | Tap a player, then an eligible glowing slot | Players who can't fill any open slot are **greyed out**. |
| Next spin | `{seq, action:{type:"pick_player", slot, player_id, team_id, era}, lineup:[…]}` | The pick is committed together with the next roll. |
| Respin | `{action:{type:"respin", booster_id:"respin_team", scope:"team", funded_by:"coins"}}` | Replaces the current cell. |
| Double Pick | `{action:{type:"pick_player", booster_id:"double_pick", picks:[{slot,…},{slot,…}]}}` | Two picks in one round. |
| Final pick | The same call with `final_roster` | Response: `score`, `score_display {name:"56-26", detail:{wins, losses, grade, grade_label}}`, `rewards`, `progression`, `reward_boost`, `roster`. Sessions expire after 1 h. |

### 2.2 Rules and data details

- **Five rounds, five positions, one pick per round** (two with Double Pick). There's no "one per decade" rule, so teams and decades can repeat.
- **Positions:** each player has 1–3 historical positions (Durant `PF SF SG`, Ewing `C PF`, Barkley `PF` only). The original let you move players between slots; the September 2026 redesign removed that, and players complained.
- **Rosters are complete.** Everyone who appeared counts: NYK 1990s has 51 players, DAL 2010s has 80.
- **How the stats are built (verified):** a **games-weighted per-game average over all of the player's seasons with that team, for seasons ending in that decade**. Ewing NYK "1990s" = 24.08 ppg / 11.02 rpg = exactly his 1989-90 → 1998-99 seasons weighted by games. The fan claim of a "best 5-season stretch" is wrong. ABA is excluded.
- **Missing pre-1973-74 steals and blocks:** the API sends `null`, but the scorer **estimates** them. Across 15 affected games, the actual score always beat the "count as zero" prediction, by about +0.7 for a bench player up to +3 for a star. Apple's editorial saying they "count as zero" is wrong.
- **Historical franchise names:** 45 reel entries with decade ranges and colors, e.g. St. Louis Hawks (1960s) → Atlanta, Buffalo Braves → Clippers, Vancouver → Memphis, New Orleans/Utah Jazz, Charlotte Bobcats vs Hornets, Washington Bullets (WSB). Early 82-0 used current names only; it switched after complaints.
- **Respins:**
  - Originally **1 free team + 1 free era respin per draft**.
  - App v1.10.0 (Oct 3, 2026) replaced that with the coin store. A respin now costs **150 coins** (green "buy" modal), with at most 6 of each per draft.
  - Respin buttons show "Respin TEAM (0 left)" and grey out when you have none.
  - Removing the free respins is the most-cited complaint in recent reviews.
- **Spin randomness:** looks uniform. Users report streaks (e.g. "2010s PHI in 9 of 10 games"). There's no visible no-repeat rule.

### 2.3 Boosters

| Booster | Effect | Unlock | Price | Observed flow |
|---|---|---|---|---|
| **Respin Team / Era** | Re-roll one reel | Lv1 | 150 coins each | Modal "RESPIN TEAM ×1 [🪙150]" → `funded_by:"coins"` |
| **Double Pick** | "Draft two players from the same team & era" | Lv2 (also a level-2 reward) | 180 (×1, hidden), 900 (×5) | Tray icon glows purple; banner "YOU CAN SELECT 2 PLAYERS IN THIS ROUND 0/2"; pick, place, pick, place |
| **Trade** | "Swap your pick with a player already on your team" | Lv2 store / Lv3 reward | 200 (×1, hidden), 1000 (×5) | Prompt "Select a player to trade him with occupied position": pick from the new cell, drop him on an **occupied** slot, and he replaces that player. (Taken from the game's UI text; not exercised in testing.) |
| **Prime** | "Upgrade the player to their best-ever version. Any team, any era" | Lv4 | 300 (×1, hidden), 1500 (×5) | Tray icon glows gold; banner "CHOOSE A PLAYER TO PRIME". Players with a better version get a **gold frame showing their prime stats in gold** and a crown tag with the prime team and decade (CJ McCollum → "POR · 20's"). Players already at their best are dimmed. ([screen](screens/21-prime-armed.jpg)) |
| Bundle | 10 each of Double Pick, Trade, Prime | Lv4 | 5,400 coins ("MOST POPULAR") | |

- Each player in a cell carries a `prime` object: their best team-decade line, e.g. Jeremy Lin GSW 2.6 ppg → NYK 14.6 ppg.
- **Nudges:** "Good moment for a PRIME!" when the predicted gain is at least 5 (or it's the last slot). Limited per round, per draft and per day. They can be turned off in Settings ("Boosters Hints").
- A short booster explainer video is linked from the tray's ⓘ button.

### 2.4 Modes

| Mode | What's really going on |
|---|---|
| **Classic** | Stats visible. Leaderboard "Classic". |
| **Hoop IQ** (`/draft?mode=hoopiq`) | The **server strips the stats from the API**, so it can't be cheated client-side. The list is alphabetical with names and positions only. Separate leaderboard. |
| **1 VS 1** (`opponent:"bot"`) | A "SEARCHING FOR MATCH… VS ?" screen, then "MATCH FOUND", a coin flip for first pick, and a 20-second turn timer that turns urgent at 5s and auto-picks. **Each side has its own spins** (it's not a shared draft). **The bot's whole lineup, pick order and final score arrive at session start** (e.g. Jokić/Nance/Kidd/Russell/Gervin = 79.4 pts, 51-31), so "Opponent is picking…" is theater and the result is known in advance. The result screen says "YOU WON!" or "YOU LOST" with the two lineups side by side (you in gold, rival in purple). Reviewers suspect the opponents are bots; they are. |
| **Trivia** | Separate quiz: "Playoff Run" (best-of-7, 4 rounds) or "Classic 20". 20s per question; speed scoring (full points at 3s or under, down to 65% at 20s); difficulty tiers Fan → Elite; helpers 50/50, +time, replace. |
| College | "Coming soon". |
| Sister games | **Ultimate 11** (soccer: formations, 11 slots, tournament sim, player ratings) and **All Dubs** (NFL: offense + defense, aim for 17-0, college legends). Same backend, same store. |

### 2.5 Scoring (reverse-engineered from about 70 games)

**Score ("Strength Rating", shown as pts) is a weighted sum of the five players' totals:**

```
score ≈ 0.33·PTS + 0.67·REB + 0.64·AST + 1.20·STL + 1.13·BLK
```

This fits **27 games with complete stats within ±1.2** (mean error −0.2). In score terms, 1 rebound ≈ 2 points and 1 steal or block ≈ 3.5 points.

**Record is a power curve of the score:**

```
wins ≈ 0.332 · score^1.15    (capped at 82)
```

This fits all samples (4–65 wins) within about ±1 win. Extrapolated: 66 pts → 41 wins, 105 → 70, about 120 → 82-0. The top of the curve may bend flatter; nothing above 97.9 was observed without boosters. A fan guide puts 82-0 at about 109.5+ on its own (different) scale. The developer told a reviewer that lineups are scored "against a near-perfect benchmark", and the How to Play page says "a deficiency in even one category can prevent a perfect season." That suggests extra balance logic near the top that our samples couldn't reach.

**Scoring is deterministic.** The same lineup always gets the same record. The 1v1 bot's score uses the same formula (our prediction: 79.7 vs actual 79.4).

### 2.6 Grades (observed)

| Grade | Wins observed | UI label | API `grade_label` | Coins | Color / sound |
|---|---|---|---|---|---|
| F | 4–36 | TANKING | TANKING | 5 | `#ef4444` / result_low |
| D | 41–42 | CASUAL | LOTTERY | 5 | `#64748b` / result_mid |
| C | 51–56 | SOLID | PLAYOFF | 5 (score <80) or 10 | `#f59e0b` / result_mid |
| B | 57–61 | CONTENDER | CONTENDER | 10 (score <90.5) or 15 | `#3b82f6` / result_mid |
| A | 62–65 | DYNASTY | DYNASTY | 15 | `#00df91` / result_mid |
| A+ | (73-9 reported) | DYNASTY | ? | ? | `#00df91` |
| S | (82-0 reported, June) | LEGENDARY | ? | ? | `#a855f7` / result_high |
| S+ | ? | PERFECT | ? | ? | `#feaf4c` / result_top |

- Cut-offs: **C/B at 56/57 wins** and **B/A at 61/62**. F/D falls somewhere in 37–40, and D/C in 43–50.
- **Coins follow the score, not the grade:** under about 80 pts = 5, about 80–90.4 = 10, 90.5 and up = 15.
- Confetti density: 2 for A/B, 1 for C/D.
- The June version used different bands: Lottery <45, Playoff 45–53, Contender 54–64, Dynasty 65+, "Historic" 70+.

---

## 3. Economy and progression (live, October 2026)

**XP is a flat 36 per game**, whatever the score, mode or result (observed in about 70 games, including 1v1).

| Level | Total XP | XP for this level | Level-up reward |
|---|---|---|---|
| 2 | 70 | 70 | 20 coins + 1 Double Pick |
| 3 | 180 | 110 | 20 coins + 1 Trade |
| 4 | 320 | 140 | 20 coins + 1 Prime |
| 5 | 490 | 170 | 20 coins |
| … | | +30 per level (inferred) | |

**Coin income:** 5 / 10 / 15 per game (by score), plus 20 per level-up. After each game there's an offer to watch an ad for 2× (app only), and a store ad gives 50 coins once every 8 hours. So a free player earns about **10 coins per game**:

| Spend | Cost | Games of grinding |
|---|---|---|
| One respin | 150 | ~15 |
| One Prime | 300 | ~30 |

That gap is the monetization pressure.

**Store** (catalog segment "C1", so prices are probably A/B tested per segment):

| Item | Price |
|---|---|
| 2,000 coins | $2.99 |
| 3,800 coins | $4.99 |
| 9,000 coins | $9.99 |
| 21,000 coins | $19.99 |
| 60,000 coins ("BEST VALUE") | $49.99 |
| 50 coins | Watch an ad (8 h cooldown) |
| Double Pick ×5 / Trade ×5 / Prime ×5 | 900 / 1,000 / 1,500 coins |
| Boosters bundle (10 of each) | 5,400 coins |
| Respin team / era | 150 coins (bought in-game) |

The iOS listing also shows "No Ads $7.99" and named packs (Silver, Gold, Platinum, Diamond, Champion, Mega). On the web the store says "AVAILABLE IN THE APP": purchases are app-only.

**Ads:**
- App: AppLovin MAX interstitials (configured for one every 2 games after the first 3), plus rewarded video for 2× coins, respins and 50 coins.
- Web: Nitropay banners on the lobby, leaderboard, challenges and profile.
- Android SDK trackers list 11 ad networks.

**Other retention features:**
- Leaderboards (Classic / Hoop IQ × All-time / Weekly / Daily, **cumulative points**).
- Private challenge boards with invite links (sign-in required).
- Profile: games played, best score, best record, and recent games with grade, label, record, points, mode and date.
- Rate-us popup after 4 games, push-permission prompt on first play, a "Get the App" popup on the first web click, force-update gate, a giveaway modal.
- Settings: Language, Sounds, Haptics, Booster Hints, T&C, Privacy, Cookies.

---

## 4. Screen by screen

All screenshots are in [`screens/`](screens/) at 390 px wide.

| # | Screen | Key details |
|---|---|---|
| 01 | [Home](screens/01-home.jpg) | AI-rendered hero player in an orange #82 jersey in a dark arena; huge italic mode name; league carousel; skewed orange PLAY and navy MODE buttons; tab bar (Friends · Leaderboards · **Home** · Challenges · Store); avatar with level ring, XP bar and coin wallet. |
| 02 | [Mode picker](screens/02-mode-picker.jpg) | Bottom sheet with a notched top edge; chamfered mode cards with player art; the selected card glows. |
| 03 | [Draft board](screens/03-draft-empty-court.jpg) | "ROUND 1 / 5 - CLASSIC" with a 5-segment bar; TEAM reel (orange frame) and ERA reel (purple); half-court with 5 grey jerseys; big SPIN button. |
| 04 | [Spinning](screens/04-reels-spinning.jpg) | Motion-blurred reels; the era reel stops 250 ms after the team reel. |
| 05 | [Player drawer](screens/05-player-drawer.jpg) | "NYK • 90's", search, G/F/C filter, sort; rows with name, positions and 5 stats; booster tray. |
| 06 | [Selected](screens/06-eligible-slots-glow.jpg) | Eligible jerseys turn orange with a pulsing halo and a "+". |
| 07 | [Placed](screens/07-jerseys-placed.jpg) | Jerseys tinted in the team's colors with the player's initials. |
| 08 | [Calculating](screens/08-calculating.jpg) | Arena photo, "82-0" scoreboard, bouncing ball. |
| 09 | [Reward](screens/09-reward-popup.jpg) | Coin claim (app: "WATCH → GET x2"). |
| 10 | [Results](screens/10-results.jpg) | Big record, pts and grade, XP bar, roster rows tinted by team, totals, Sign in, Share, Draft again. |
| 11 | [1v1 board](screens/11-1v1-turn-timer.jpg) | The same board plus an orange 20s timer bubble. |
| 12 | [Leaderboard](screens/12-leaderboard.jpg) | Podium with gold, silver and bronze; cumulative points in the millions. |
| 13 | [Paid respin](screens/13-paid-respin-150-coins.jpg) | "RESPIN TEAM ×1" modal with a green 🪙150 button. |
| 14 | [Double Pick](screens/14-double-pick-armed.jpg) | "YOU CAN SELECT 2 PLAYERS IN THIS ROUND 0/2"; ineligible players greyed. |
| 15 | [B result + confetti](screens/15-results-B-confetti.jpg) | 60-22, B CONTENDER in blue, confetti. |
| 16 | [1v1 searching](screens/16-1v1-searching.jpg) | Split orange/purple "SEARCHING FOR MATCH", avatar VS "?". |
| 17 | [1v1 won](screens/17-1v1-you-won.jpg) | "CONGRATULATIONS YOU WON!" with both lineups side by side. |
| 18 | [Hoop IQ](screens/18-hoopiq-no-stats.jpg) | Alphabetical names and positions only. |
| 19 | [Profile](screens/19-profile.jpg) | Level, XP, games played, best score, best record, recent games. |
| 20 | [Settings](screens/20-settings.jpg) | Language, Sounds, Haptics, Booster Hints, legal links. |
| 21 | [Prime armed](screens/21-prime-armed.jpg) | "CHOOSE A PLAYER TO PRIME"; upgradeable players framed in gold with a crown tag showing the prime team and decade. |

---

## 5. Visual design system

**Feel:** a dark, glossy, console-game menu: skewed and chamfered shapes, glows, sheen sweeps, italic uppercase type. Orange is the action color, navy the secondary, purple marks the era reel and the 1v1 rival.

| Token | Value |
|---|---|
| App background | `#000914` / `#010a14` |
| Card | `#091220`, `#1a1f2e` |
| Border | `#242f41`, `#2d3548` |
| Primary | `#fd6a00` (glow `#fe8200`) |
| Accent warm | `#ff8d28`, edge `#ffcc00` |
| Text | `#f3f4f4` / `#889cb0` / `#5d6a83` |
| Points blue | `#2d6fea` |
| Medals | `#ffce54` / silver / `#cd7f32` |
| Era / rival purple | `#7c4eff` |
| Respin "buy" button | bright green |

- **Fonts:** Fira Sans for UI; **Barlow Condensed / Teko / Saira** for heavy italic display text; Geist Mono for some numbers.
- **Layout:** a fixed **390×844 design frame** scaled with CSS variables (`--td-k:min(100dvw/390, 100dvh/844)`), portrait only ("Please rotate your device"), safe-area aware.
- **Motion vocabulary** (from keyframe names): `reel-land`, `spin-pulse`, `va-jersey-eligible-pulse/halo`, `va-jersey-place/impact/burst/cheer`, `court-flash/shake`, `classic-result-rec-land/rec-shine/loss-hit/pts-bump/row-in`, `td-play-boom/spark`, `level-up-popup-in`, confetti.

**Slot-machine tuning (remote config):**
```json
{ "totalDurationMs": 1300, "rowsPerSecond": 30, "delay": 250,
  "windup": {"distance": 12, "duration": 140},
  "acceleration": {"duration": 80, "blur": [0,1], "smear": [0,0.5]},
  "maxSpeed": {"duration": 300, "blur": 1, "smear": 0.5},
  "deceleration": {"duration": 700, "blur": [1,0], "smear": [0.5,0]},
  "stopBounce": {"distance": 6, "duration": 130, "returnDuration": 150} }
```

**Sounds (24 cues):** spin_start, reel_tick, reel_stop, respin, player_select, player_place, draft_complete, calculating_loop, rating_roll_up, result_low/mid/high/top, xp_grant, level_up, coin_appear, coin_land, buy, button_click, drawer_open/close, store_tab, store_back. In the app, haptics (land / win / lose) go with results.

**Art:** AI-rendered generic players (no real likenesses), arena photos, and a jersey sprite with body and trim tint masks. Teams appear as **abbreviation plus colors only, no logos**.

---

## 6. How it was built

### 6.1 History

| When | What |
|---|---|
| Early June 2026 | Created by **Roy Saar** as a web game, originally scaffolded with **Vercel v0** (`<meta name="generator" content="v0.app">`). It went viral on Jun 3. Tyrese Haliburton's 77-5 lineup (LeBron, Kobe, MJ, Bird, Moses) spread it. People reached 82-0 within days. |
| Mid June | Israeli studio **PlayVault** (CEO Bar Almog) partnered with Saar and promised "free, leaderboards, more gamification." |
| Jun 15 / Jun 24 | Android and iOS apps. Each passed 500K downloads in under 30 days. iOS: 1M+ by July, 4.8★ from 14K ratings, #3 Sports. Android: 500K+ installs, 4.4★. |
| July | 1v1, challenges, and ads for extra spins appear (per reviews). |
| Mid September | UI overhaul. Reviews complain that filter and sort are gone, the result shows one composite score, and players can't be moved. |
| Oct 3 (v1.10.0) | **Coin store and boosters.** The free respins were removed. |
| Oct 8 | PlayVault renamed itself **All-Time Studios**; **All Dubs** (NFL) launched with Athletes First as investor. Games are published as "Vaulty Studios". |

Estimated scale: about 700K installs per platform and about 80–125K monthly active users on mobile, plus web. Revenue estimates are small so far ($10K+/month on Android); that's an estimate from AppGoblin.

### 6.2 Tech stack

| Layer | What | Evidence |
|---|---|---|
| Web frontend | **Next.js** (App Router, RSC, Turbopack), React | `/_next/static/chunks/turbopack-*`, `?_rsc=` |
| Styling | **Tailwind CSS v4** + shadcn-style tokens + many custom vars and keyframes | CSS bundle |
| Hosting | **Vercel** | `eighty-two-and-0-git-prod-play-vault.vercel.app` |
| Auth | **Firebase Auth**: anonymous guest first, then Google / Facebook / email; one tenant per game | identitytoolkit calls |
| Backend | Own platform `api.vaultystudios.com`: `users`, `config`, `game-session v4`, `events`, `liveops`, `iap`. Shared by 82-0, Ultimate 11 and All Dubs | Network log |
| Game logic | **Server-authoritative**: rolls, rosters, validation, scoring, and stat stripping in Hoop IQ | session API |
| Config | **Remote config for everything**: modes, slots, boosters, nudges, reel animation, sounds, grade styling, ads, store, leaderboards, trivia rules, popups | `/config/api/v1/configs` |
| Assets | GCS (sounds, i18n en-GB / es-MX / pt-BR), WebP in Next `public/` | URLs |
| Telemetry | Sentry (5%), GA4 via GTM, TikTok pixel, AppsFlyer, own `/events` batched every 60s | Network log |
| Monetization | Cookiebot, Nitropay (web), AppLovin MAX + AdMob mediation (app), IAP | Config, trackers |
| Mobile | Android in Kotlin per AppGoblin; the cross-platform framework is unknown | AppGoblin |

---

## 7. Community and clones (ideas for differentiation)

**What fans liked:** the speed, arguing about lineups, the Wilt 1960s "cheat code", Hoop IQ, and sharing.

**What fans complained about:**
- free respins removed and ads/paywalls added;
- strict positions;
- defense and fit ignored ("PRA machine");
- repeated rolls;
- bot opponents passed off as people;
- the lost sort/filter and lineup editing;
- they want playoffs and a transparent formula.

**Clones and their twists:**

| Clone | Twist |
|---|---|
| **98-0** (NHL) | 82 + 16 playoff wins, slot multipliers, salary-cap mode |
| **20-0.com** family | Daily shared spins, ranked pools, GM mode with salaries, multi-sport "Triple Crown"; claims "only 4% go undefeated" |
| **17-0** (NFL) | A head-coach pick; the daily shows "today's optimal roster" |
| **Better 82-0** | Salary-cap mode; scores spacing, defense and fit; brought back filter and sort |
| **82-0 Challenge** | Playstyles (Small Ball, Twin Towers), a game-by-game season reveal, a cap gauntlet, a daily, 8 languages |
| **82-0game.org** | "Boss Battle" playoff series, 1v1 snake draft |
| **go82-0** | Era multipliers and chemistry bonuses |
| **Sportsdle** | Sixth man and role chemistry |

---

## Sources

- Live inspection of https://www.82-0.com (2026-10-24): screenshots, network and API logs, remote config, translations, store catalog, JS/CSS bundles
- Press: [Yahoo Sports](https://sports.yahoo.com/articles/addicting-82-0-basketball-game-040936999.html), [Complex](https://www.complex.com/bets/a/matt-burke/82-0-nba-twitter-viral-game), [Kottke](https://kottke.org/26/06/0049075-can-you-go-82-0), [ESPN](https://www.espn.com/nba/story/_/id/48976391/82-0-viral-game-tyrese-haliburton-milwaukee-bucks-trey-murphy), [PHNX interview with Bar Almog](https://gophnx.com/suns/82-0-nba-game-starting-lineup-viral-interview/), [interview (republished)](https://thednvr.com/?p=267747), [Fansided](https://fansided.com/nba/can-you-go-82-0-every-player-who-is-a-cheat-code-in-new-viral-nba-game), [8 Points 9 Seconds](https://8points9seconds.com/pacers-tyrese-haliburton-inspired-quest-uncovered-unexpected-dream-team), [OutKick](https://www.foxnews.com/outkick-sports/took-couple-days-tech-bro-already-ruined-82-0-internet-game), [PR Newswire: All-Time Studios / All Dubs](https://www.prnewswire.com/news-releases/all-time-studios-launches-all-dubs-the-football-follow-up-to-viral-hit-82-0-partners-with-athletes-first-to-develop-and-market-the-game-302902671.html)
- Guides: [Hans Cho, "82-0: A User Guide"](https://hcho.substack.com/p/82-0-a-user-guide), [82-0-guide.com](https://82-0-guide.com/), [Grueling Truth](https://thegruelingtruth.com/basketball/nba-the-perfect-82-0-starting-five-what-is-the-best-possible-lineup-in-the-game/)
- Stores and trackers: [App Store](https://apps.apple.com/us/app/82-0-com/id6780195090), [Google Play](https://play.google.com/store/apps/details?id=com.vaultystudios.eightytwoand0&hl=en_US), [Apple story "You're Undefeated!"](https://apps.apple.com/us/iphone/story/id6803164312), [AppGoblin Android](https://appgoblin.info/apps/com.vaultystudios.eightytwoand0), [AppGoblin iOS](https://appgoblin.info/apps/6780195090), [mwm.ai](https://mwm.ai/apps/82-0-com/6780195090)
- Clones: [98-0game.com](https://98-0game.com/), [20-0.com](https://www.20-0.com/162-0), [17-0 (firstdown.studio)](https://www.firstdown.studio/build-a-17-0-team), [Better 82-0](https://better-82-0.com/), [82-0 Challenge](https://www.82-0-challenge.com/), [82-0game.org](https://82-0game.org/), [go82-0](https://go82-0.com/), [Sportsdle](https://www.sportsdle.com/nba/82-0)
