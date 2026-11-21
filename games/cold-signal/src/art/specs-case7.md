# Art specs — Case 07 "The Copyist"

Palette & mood: a grand 19th-century art museum after hours. Deep oxblood gallery walls, gilt frames, parquet, and pools of low guard lighting with long shadows. The tone is cool and hushed, with a touch of Vermeer: one warm light source in a dark room. The painting at the centre of everything, **Agathe Lorne's "Girl with a Storm Lantern" (1891)**, must look the same in every image where it appears. Accents: **the lantern's warm amber glow**, **the moth's pink-and-olive**, and the cold blue of the night-guard torch.

Sizes: photos portrait 600x800 / landscape 800x600 · cover 600x800 · wallpapers 600x1300 · map 800x600 · avatars 200x200.

Reused existing art: `av_unknown` (the unknown number, Conrad Vey's private line). Handler uses `av_ines`.

Recurring objects:
- **The Lorne** is an oil painting, portrait format. A barefoot girl in a grey shawl stands on a dark stony shore at dusk, holding up a brass storm lantern with **four glass panes** (numbered left to right as you look at it). A candle flame burns inside, and a stormy green-grey sea is behind her. A fine crack in the varnish runs near her right wrist.
- **The moth** is a tiny elephant hawk-moth (pink and olive-green wings, folded, torpedo body) painted inside the **third pane** of the lantern. It is only visible up close. It appears ONLY in `c7_ph_moth`, the sketchbook, and nowhere on the painting at normal viewing size.
- **The bracket clock** is a small gilt-and-ebony 18th-century bracket clock with a white enamel dial, Roman numerals (with "IIII" for four), blued steel hour and minute hands and a thin red seconds hand.

## Cover

- `cover_case7` (600x800): Gallery 6 at night, seen from the doorway. An empty gilt frame hangs on an oxblood wall. A dropped guard torch on the wet parquet shines a cold blue beam into the frame. The torch beam catches, floating in the air, a single small pink-and-olive moth. Water glistens on the floor. Title area: "THE COPYIST".

## Wallpapers

- `wall_c7_lock` (600x1300). **PASSCODE CLUE.** Close, straight-on photo of the bracket clock on its wall bracket in Gallery 6, dial filling the upper half of the frame, every Roman numeral legible. The hands must read **exactly 2:47:15**:
  - The **hour hand** sits about three-quarters of the way from II to III.
  - The **minute hand** points at the 47th minute: two small ticks past IX.
  - The thin red **seconds hand** points exactly at **III** (15 seconds).
  - Below the clock, a small brass museum label, legible: **"Bracket clock, London, c. 1780. Stopped 1931."** (no AM/PM given).
  - Trap: on the bench in the lower foreground, a guard radio's green LCD reads **"02:05"**. It is the wrong time.
  - The edge of the Lorne's gilt frame is just visible at the right edge.
  - The afternoon comes from the Hollin Museum's lock-screen Glimpse notification (2:47:15 pm → **14 47 15**).
- `wall_c7_home` (600x1300): A charcoal sketch on cream paper of a single elephant hawk-moth, wings open, with small pencil handwriting below: "a copy is not allowed to be perfect".

## Map

- `map_c7` (800x600): Stylised old-city map in ink, oxblood and gold-leaf tones. A river curls along the bottom. There are tight old streets in the centre and a park on the north hill. Label positions (x,y in 0..1):
  - Hollin Museum of Art: (0.48, 0.44), columned museum icon
  - Kestrel Court (home): (0.16, 0.70), apartment block
  - Tallow Lane Studios: (0.30, 0.24), old warehouse with skylights, palette icon
  - State Conservation Lab: (0.74, 0.62), modern building with a microscope icon
  - Hollis School of Art: (0.84, 0.20), building with an easel icon
  - Linden Hill (Vey residence): (0.62, 0.12), large villa among trees on the hill
  - ArtCrate Supply: (0.60, 0.84), warehouse with a crate icon by the river
  - St. Brannoc's Cemetery: (0.10, 0.38), small chapel with headstones

## Avatars (200x200)

- `av_c7_ilse`: **Owner portrait.** Ilse Kade, 41. Dark-blond hair pulled back hard, a few greys, pale steady grey eyes and faint shadows from night shifts. Navy security uniform jacket with a "HOLLIN" shoulder patch and a radio clipped at the collar. A tiny enamel moth pin on the lapel that nobody ever notices. Composed, watchful, a little sad.
- `av_c7_sami`: Sami Kade, 43, Ilse's husband, a schoolteacher. Curly black hair, stubble, cable-knit sweater, worried kind eyes.
- `av_c7_anand`: Dr. Priya Anand, 50, chief conservator. Silver-streaked hair in a low bun, magnifier visor pushed up on her forehead, white lab coat over a silk blouse.
- `av_c7_gil`: Gil Sato, 58, head of security. Grey crew cut, black suit and earpiece, reading glasses, the face of a decent man who follows orders.
- `av_c7_felix`: Felix Lunn, 24, art student copyist. Shaggy hair, paint on his cheek and hands, beat-up denim jacket covered in pins, eager grin.
- `av_c7_bea`: Bea Ostrowski, 30, day guard. Round face, bright lipstick, matching Hollin uniform, a lanyard full of keys and a cactus keyring.
- `av_c7_hanne`: Hanne Marek, about 70 (photo from her last years). Short white hair, paint-flecked smock, reading glasses, holding a fine brush between two fingers like a cigarette. A wicked grin.
- `av_c7_vey`: Conrad Vey, 71, board chair. Silver swept-back hair, tailored charcoal three-piece suit, pocket square, thin practised smile, cold eyes.

## Photos

- `c7_ph_gallery6` (landscape): Gallery 6 at night under low guard lighting. On the far oxblood wall in a gilt frame, **the Lorne** (see recurring), with the lantern glowing. Left of it on a bracket, the gilt bracket clock. In the foreground, a leather museum bench with a thermos and a guard radio.
- `c7_ph_moth` (portrait). **KEY CLUE.** Extreme close-up through the rim of a jeweller's loupe. The brass lantern from the Lorne fills the frame and its four panes are distinct. Inside the **third pane** from the left, painted on the glass reflection, is a tiny **pink-and-olive moth with folded wings**, crisp and deliberate. A cold blue torch beam rakes across the cracked varnish. The rest of the painting is out of focus.
- `c7_ph_easel1996` (portrait). **KEY CLUE.** A slightly faded 1996 colour print, scanned. A woman in her forties (Hanne Marek: dark-blond bob, paint on her sleeves, wicked grin) stands at a tall easel in a white-walled conservation studio with a north skylight, painting a **full-size** copy of the Lorne. Right beside her, on a second easel, stands the unframed original Lorne. On her lapel, a laminated badge, legible: **"HOLLIN — COPYIST PERMIT — H. MAREK — 1996"**. Pencil on the print's white border, legible: **"the Vey job, April"**.
- `c7_ph_ledger` (portrait). **KEY CLUE.** An open, worn ledger book on a paint-spattered studio table. Neat fountain-pen entries, legible:
  - **"4 MAR 1996 — C. Vey (Hollin, director) — full-size copy, Lorne, Girl w/ Storm Lantern, 91 × 122 — 'for the conservation period' — $4,000 cash — moth: 3rd pane"**
  - **"30 SEP — copy collected by C.V. personally, at night. Odd."**
  - Other entries above and below are ordinary copy commissions with smaller sizes.
- `c7_ph_workorder` (portrait). **KEY CLUE.** A printed work order taped to a security desk beside a CCTV monitor. Legible:
  - **"HOLLIN FACILITIES — WORK ORDER 2291"**
  - **"Gallery 6 · Sprinkler zone 6 · Flow test"**
  - **"Night of Fri Oct 30 · 03:55–04:25"**
  - **"DRY TEST"**
  - **"DO NOT COVER OR RELOCATE WORKS — normal gallery conditions required"**
  - **"Authorized: C. Vey, Board Chair"**, with a flourishing signature.
- `c7_ph_study` (landscape). **KEY CLUE.** A phone screenshot of a glossy magazine spread. Header legible: **"INTERIORS QUARTERLY"**, headline legible: **"A Life Among Pictures: Conrad Vey at Home"**. Photo: a silver-haired man (Vey) in a leather chair in a book-lined study with a green banker's lamp. Above the desk hangs **the Lorne**, full size, in a plain dark frame. Caption legible: **"Above the desk, a copy of the Hollin's beloved Lorne. 'A copy, naturally,' Vey laughs. 'I couldn't live without her.'"**
- `c7_ph_studyzoom` (portrait). **KEY CLUE.** The same screenshot pinched in on the lantern above Vey's desk, slightly pixelated. All four panes show **clear glass**, candle flame inside, and **no moth** in the third. Red phone-markup handwriting over it, legible: **"3rd pane — NO MOTH. Same size. Same crack in the varnish by her wrist. It's HER."** A red circle around the third pane and an arrow to the wrist crack.
- `c7_ph_sketchbook` (landscape). **KEY CLUE (note password).** An open sketchbook on a kitchen table. Both pages are covered in pencil-and-watercolour studies of one moth (pink and olive, wings folded and open, torpedo body). Pencil label at the top of the left page, legible: **"elephant hawk-moth — again — smaller"**. The scientific name must NOT appear (it comes from the Browser).
- `c7_ph_memorial` (portrait). **KEY CLUE.** A small exhibition flyer pinned to a whitewashed brick wall. Legible: **"HANNE MAREK (1952–2024)"**, **"THE COPYIST'S HAND"**, **"forty years of copies, one moth each"**, **"Tallow Lane Studios · May 10"**. A black-and-white photo of a smiling white-haired woman holding a paintbrush like a cigarette.
- `c7_ph_marathon` (landscape). **KEY CLUE.** A packed art-school studio at night under bright work lights, forty students at easels around a draped model. A banner legible: **"HOLLIS 24-HOUR DRAWING MARATHON"**. A whiteboard, legible: **"HOUR 17 · 3:00 AM · SAT OCT 31"**. Front row: a shaggy-haired young man (Felix) with charcoal on his cheek, waving a stick of charcoal at the camera.
- `c7_ph_felixcopy` (landscape): Daytime in Gallery 6. Felix's easel stands beside the Lorne. His copy is visibly **smaller**, and its lantern is only blocked in, with grey empty panes. A tag on the easel leg, legible: **"COPYIST PERMIT — F. LUNN — RULE 4: 10% SMALLER"**.
- `c7_ph_case` (landscape). **KEY CLUE.** The open boot of a small grey hatchback in a warehouse car park at dusk. Inside, a large black padded art transport case, lid open to show grey foam. A printed label on the lid, legible: **"ARTCRATE · 40 × 52 IN · CLIMATE-SEALED"**.
