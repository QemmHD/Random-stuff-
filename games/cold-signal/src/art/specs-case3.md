# Art specs — Case 03 "The Long Quiet"

Palette & mood: northern lake town in November — slate-blue fog, black pines, wet asphalt, washed-out 2006 film colours for the old photos (warm, faded, slight grain). Accent: **yellow roses** (Eli's favourite) and the **dark green Corwin pickup**, which should look like the same truck family across photos.

Sizes: photos portrait 600x800 / landscape 800x600 · cover 600x800 · wallpapers 600x1300 · map 800x600 · avatars 200x200.

Reused existing art: `av_unknown` (the unknown number). Handler uses `av_ines`.

## Cover

- `cover_case3` (600x800) — A two-lane road curving along a fogged lake at night, a dented guardrail, a single yellow rose tied to it. A faded MISSING poster on a telephone pole in the foreground, its photo washed out. Far up the hill in the pines, one tiny lit cabin window. Title area: "THE LONG QUIET".

## Wallpapers

- `wall_c3_lock` (600x1300) — **PASSCODE CLUE.** A weathered 2006 MISSING poster stapled to a wooden telephone pole, multiple staple holes, rain-stained. Legible text, top to bottom: **"MISSING"** · photo of a smiling teen boy in a letterman jacket with **"22"** on it · **"ELI CALLOWAY"** · **"AGE 17 · BORN 03/03/89"** · **"Last seen walking home on Route 9 after the Pinecrest Homecoming dance, 2006"** · **"5'11\", brown hair, green Lakers letterman jacket #22"** · **"CALL PINECREST SHERIFF"**. IMPORTANT: the poster must NOT show the exact date he went missing — only the year 2006 (the day comes from the lock-screen "On This Day" notification; the birth date is a deliberate wrong answer).
- `wall_c3_home` (600x1300) — A podcast-cover-style image: a lone microphone on a stand at the end of a dock in fog, the words "THE LONG QUIET" small at the bottom.

## Map

- `map_c3` (800x600) — Stylized small-town map in muted slate and pine-green. A large lake ("SAWMILL LAKE") fills the upper-middle; ROUTE 9 hugs the lake's south shore and sweeps to the east edge with a sign "→ ASHBY 70 mi". Forest in the northeast with a thin dirt road "TAMARACK RD". Label positions (x,y in 0..1):
  - Cedar St. apartment — (0.30, 0.58), town grid
  - Pinecrest Marina — (0.46, 0.34), docks on the lake's south shore
  - Tamarack Rd (unnamed parcel) — (0.86, 0.12), a small clearing in dense pines at the end of the dirt road (no name on the map — just a pin)
  - Route 9 — Sawmill curve — (0.62, 0.52), a tight bend in Route 9 right at the water
  - Pinecrest High — field house — (0.20, 0.76), football field shape
  - Pinecrest Post Office — (0.38, 0.70), small flag icon
  - Ashby County Records — (0.93, 0.86), at the "Ashby" edge inset
  - Hollins garage (Ashby) — (0.94, 0.68), also in the Ashby inset

## Avatars (200x200)

- `av_c3_mom` — Joanne Calloway, 60. Grey bob, cardigan, tired gentle eyes, a small gold locket.
- `av_c3_marcus` — Marcus Bell, 31, co-producer. Round glasses, beanie, big studio headphones around his neck, stubble.
- `av_c3_ray` — Ray Corwin, 68, retired sheriff. Weathered face, white mustache, waxed barn jacket, ball cap with a deer silhouette. Warm grandfatherly smile.
- `av_c3_travis` — Travis Corwin, 38, high-school football coach. Lakers green windbreaker, whistle on a lanyard, buzz cut, haunted eyes.
- `av_c3_pruett` — Lyle Pruett, 70. Gaunt, unshaven, flannel shirt buttoned to the top, a hard defensive stare.
- `av_c3_dee` — Dee Hollins, 50s. Reading glasses on a chain, auto-shop work shirt with "HOLLINS" name patch, kind face.
- `av_c3_sana` — Sana Iqbal, 40, podcast network editor. Sharp black blazer, hijab in deep plum, reading glasses pushed up.

## Photos

- `c3_ph_homecoming` (portrait, faded 2006 print look) — A sunny autumn afternoon on a small-town football field: teenage Eli in a green **#22** Lakers jersey, grass-stained, laughing, with a nine-year-old girl (Wren) on his shoulders. A shaggy golden mutt sits at his feet. Print border, slight colour fade.
- `c3_ph_yearbook` (landscape) — **KEY CLUE.** Photo of an open yearbook page. One captioned photo, caption legible: **"HOMECOMING '06 — Travis Corwin & Kayla Moss roll up in style in Dad's F-150!"** The photo shows a teen boy in a suit leaning on a **dark green pickup** with a "LAKERS" bumper decal, a girl with a corsage beside him.
- `c3_ph_roster` (landscape) — **KEY CLUE.** A photocopied typed duty roster on a records-office table, a pencil beside it. Legible row (highlighted in yellow): **"SAT 10/21/06 — Dep. R. Corwin — PATROL — Cruiser #4 — 21:00–05:00"**. Other rows blurred.
- `c3_ph_index` (landscape) — **KEY CLUE.** A photocopied case-file index page, header **"CASE 06-1147 — CALLOWAY, ELI — INDEX"**. Numbered lines; line 14 legible: **"14 — Vehicle stop — Rte 9 @ Sawmill curve — 23:50 — R.C."** with a red clerk's stamp beside it: **"PAGE NOT PRESENT"**.
- `c3_ph_marina` (landscape) — **KEY CLUE.** Dark marina parking lot under one sodium lamp, lake black behind. A **dark green pickup**, headlights on, rear plate legible: **"SHRF 4"**. A broad older man in a barn jacket and ball cap stands by the driver's door, face in shadow. Slight handheld blur.
- `c3_ph_camp` (landscape) — **KEY CLUE.** Summer afternoon in pine woods: a log cabin and a smaller plank **bunkhouse with a heavy padlock** on its door. A routed wooden sign on a post, legible: **"CORWIN CAMP — TAMARACK RD — EST. 1979"**. Two microphones and a recorder on a picnic table, antlers over the cabin door.
- `c3_ph_invoice` (portrait) — **KEY CLUE.** A yellowed carbon-copy shop invoice, flat-lay. Legible: **"HOLLINS BODY & GLASS — ASHBY"**, **"DATE: 10/23/06"**, **"CUST: R. CORWIN"**, **"VEH: '97 FORD F-150 — GREEN"**, **"REPLACE GRILLE · HOOD · R HEADLAMP"**, **"PAID: CASH"**, and handwritten in the margin **"no paperwork per cust."**
- `c3_ph_ticket` (portrait) — **KEY CLUE.** A faded bus ticket on a kitchen table: **"GREYHOUND"**, **"PINECREST → DULUTH"**, **"SAT OCT 21 2006"**, **"DEP 6:15 PM"**, with a driver's punch hole through it.
- `c3_ph_route9` (landscape) — Dusk at a tight bend in a two-lane road beside a lake; an old dented guardrail; a field recorder with a fuzzy windscreen sitting on the gravel shoulder.
- `c3_ph_bridge` (portrait) — Night vigil on a small road bridge: candles in glass jars, bunches of yellow roses, a laminated photo of Eli zip-tied to the rail.
- `c3_ph_studio` (portrait) — A closet converted into a studio: grey acoustic foam, a mic with a pop filter, a corkboard covered in photos and red string. The newest index card pinned in the centre reads **"EP 9 — THE GRILLE"**.
- `c3_ph_hideout` (landscape) — A small packed bar venue, a man (Marcus) on stage at one of two stools with mics, banner behind: **"LONG QUIET LIVE"**. The second stool is empty with a paper sign taped to it: **"WREN"**.
- `c3_ph_lake` (landscape) — Thick fog over a still lake at dawn, a single wooden dock fading into white.
