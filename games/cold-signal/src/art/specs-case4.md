# Art specs — Case 04 "Last Chair"

Palette & mood: a high-altitude ski resort at night in March. Deep navy sky, blue-white snow under sodium and LED work lights, black pines, dark weathered timber. Accent: **Lift Ops orange** (Silverpine staff jackets, beanies, the lift shack) and, in the key photos, **one red object** (the jerrycan, the pinstripe on SP-01). Phone-camera realism for Rafi's photos: grainy night shots, harsh flash, slight motion blur.

Sizes: photos portrait 600x800 / landscape 800x600 · cover 600x800 · wallpapers 600x1300 · map 800x600 · avatars 200x200.

Reused existing art: `av_unknown` (the unknown number — Mags texting from her son's phone). Handler uses `av_ines`.

Recurring objects (keep consistent across photos):
- **The Aerie** — steep A-frame lodge in dark timber with a stone chimney; carved sign "THE AERIE · EST. 1961"; wide **south deck** with snowy picnic tables and big dark windows; a small **kitchen service door** on the north side by the cat track.
- **SP-01** — matte-black snowmobile, thin red pinstripe, "SP-01" in white block letters on the cowling.
- **The heater** — a small red-and-grey portable propane heater ("buddy" style), a round dial marked OFF / LOW / HIGH.
- **Lina's bag** — a purple backpack with a squirrel keychain.

## Cover

- `cover_case4` (600x800) — Night on a ski mountain. A single empty chairlift chair hangs in the foreground, swaying, snow on the seat. Far up the slope at the summit, an orange glow and a column of smoke where a lodge is burning. One snowmobile headlight on the cat track below it. Title area at the top: "LAST CHAIR".

## Wallpapers

- `wall_c4_lock` (600x1300) — **PASSCODE CLUE.** Sunset photo at the top of a chairlift. In the centre, a weathered wooden sign bolted to a lift-terminal post, legible: **"EAGLE"** (large) · **"TOP TERMINAL"** · **"ELEV. 11,240 FT"**. A faded orange Lift Ops beanie hangs from the sign's corner (his father's). Below it, a carved arrow **"THE AERIE →"**. In the lower corner, smaller and half in shadow, a second sign as a trap: **"LYNX LIFT ↓ · TOP 10,560 FT"**. The base elevation must NOT appear anywhere on the wallpaper (it comes from the lock-screen snow report: 9,148 ft; 11,240 − 9,148 = 2092).
- `wall_c4_home` (600x1300) — Looking straight up an empty chairlift line at blue hour: a row of towers with numbered plates (7, 8, **9**) climbing into the stars, cables glinting.

## Map

- `map_c4` (800x600) — Stylised resort map in navy, white and pine-green, like a trail map. The EAGLE lift is a straight dashed line with tower ticks numbered 1–14 running from the base (lower-left centre) up to the summit (top centre-right); a dotted "CAT TRACK" winds up beside it. A town grid ("CUTTER'S GAP") fills the bottom-left; "RIDGE RD" curves along the right edge on a separate ridge with a view of the summit. Label positions (x,y in 0..1):
  - Silverpine base & lift shop — (0.30, 0.80), lodge cluster and parking at the bottom of Eagle
  - The Aerie (summit) — (0.62, 0.12), small A-frame icon at the top of Eagle
  - Eagle tower 9 · Ptarmigan Bowl — (0.50, 0.38), a wide open bowl beside tower 9, labelled **"PTARMIGAN BOWL"** in trail-map lettering
  - Kenzie Park's house — (0.12, 0.66), town edge
  - Rooster's Bar — (0.18, 0.90), main street, rooster sign
  - Haddad apt. — (0.08, 0.86), town grid
  - Kessler house — Ridge Rd — (0.86, 0.58), large house with a deck facing the summit
  - Cutter's Gap PD — (0.24, 0.95), small star badge icon

## Avatars (200x200)

- `av_c4_rafi` — Rafi Haddad, 27. Dark curly hair under an orange Lift Ops beanie, short beard, grease smudge on one cheekbone, tired kind eyes. Orange-and-black staff jacket.
- `av_c4_lina` — Lina Haddad, 16. Big grin, braces, dark hair in two messy buns, oversized purple hoodie, a squirrel sticker on her cheek.
- `av_c4_mama` — Samira Haddad, 55. Soft grey-streaked hair under a loose patterned headscarf, reading glasses, warm worried eyes, a thermos in hand.
- `av_c4_kessler` — Bram Kessler, 58, resort owner. Silver hair swept back, tanned, square jaw, expensive black shell jacket with a small Silverpine logo, polished smile.
- `av_c4_mags` — Mags Okafor, 45, snowcat groomer. Close-cropped hair, ear-flap hat, reflective vest over a work parka, a no-nonsense half-smile.
- `av_c4_dag` — Dag Lindqvist, 50, ski patrol. Red patrol jacket with a white cross, weathered face, blond-grey beard, radio on his chest.
- `av_c4_wes` — Wes Tolliver, 40, fired groomer. Unshaven, trucker cap, flannel, a beer-bottle grin with angry eyes.
- `av_c4_abara` — Det. Simone Abara, 42. Short natural hair, navy wool coat, notebook in hand, level unreadable gaze.

## Photos

- `c4_ph_dad` (portrait) — Two men on a chairlift chair, frosted beards, matching orange Lift Ops jackets: young Rafi (20) and his father, laughing. His father points up the line at a tower whose plate reads **"9"**.
- `c4_ph_tower9` (landscape) — **NOTE-PASSWORD CLUE.** Sunrise below a chairlift tower with a plate **"9"**. A wide untouched snow bowl, a small stone cairn with a faded orange beanie on top. A trail sign at the edge, legible: **"PTARMIGAN BOWL"** (exact spelling, with the silent P).
- `c4_ph_shop` (landscape) — A lift-maintenance workshop: a big gearbox in pieces on a steel bench, tools, a radio. A shelf with an empty gap; the label taped under it reads **"PROPANE HEATER — SHOP"**; a yellow sticky note on the shelf: **"borrowed — L ♥"**.
- `c4_ph_aerie` (landscape) — The Aerie on a bluebird day (see recurring description): A-frame, chimney, carved sign **"THE AERIE · EST. 1961"**, south deck with picnic tables. Around the north corner, a small door marked **"KITCHEN — SERVICE"** beside a groomed cat track.
- `c4_ph_sled` (landscape) — **KEY CLUE.** A new matte-black snowmobile at a resort base, thin red pinstripe, cowling legible: **"SP-01"**. A silver-haired man in a black shell jacket gives a thumbs-up beside it.
- `c4_ph_alldown` (landscape) — **KEY CLUE.** Night, under work lights at the bottom bullwheel of a chairlift. Six bundled teenagers in a shivering huddle; one girl holds up another who stands on one foot. A girl in a purple hoodie (Lina) flashes a guilty peace sign. The lift shack's digital clock, legible: **"23:33"**.
- `c4_ph_deck` (portrait) — **KEY CLUE (the whole case).** Harsh phone-flash photo on a snowy timber deck at night. Foreground: a purple backpack with a squirrel keychain on a picnic table, and beside it the small propane heater, its dial clearly at **"OFF"**, frost on the grille. Background: a big dark lodge window; inside, a cone of **headlamp light** and a dim figure in a black jacket holding a **red jerrycan**. At the far right edge of the frame, past the corner of the building, the nose of a black snowmobile with partial white lettering **"SP-0"** (the 1 is cut off).
- `c4_ph_burn` (landscape) — Dawn from the resort base: still chairlift chairs in the foreground, a long grey column of smoke rising from the summit where a lodge stood.
- `c4_ph_newspaper` (portrait) — **KEY CLUE.** A newspaper on a kitchen table next to a teacup. Masthead **"THE CUTTER'S GAP COURIER"**. Headline legible: **"FIRE MARSHAL: AERIE BLAZE BEGAN IN KITCHEN STOREROOM"**, deck: **"Accelerant suspected"**, sub-head: **"Lift mechanic's account of deck heater 'inconsistent with findings'"**. A small photo of the burned lodge.
- `c4_ph_karaoke` (portrait) — **KEY CLUE.** A dive bar's tiny karaoke stage; a man in a trucker cap and flannel (Wes) belts into a mic, eyes shut. Above the bar a neon clock legible: **"1:41"**. A chalkboard: **"SAT 3/7 — KARAOKE TIL CLOSE"**. Rooster logo on the wall.
- `c4_ph_lina` (portrait) — A 16-year-old girl in a purple jacket upside-down in a snowbank, one ski still on, laughing helplessly. Bright afternoon.
