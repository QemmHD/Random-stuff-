# Art specs — Case 05 "The Last Room"

Palette & mood: a converted 1920s bank turned escape-room studio in a grey harbour city. Brass, marble, vault steel, chalkboard black — and, inside Room 9, an unreal **quarry blue** (deep teal water-light rippling on painted rock). The 2008 material is warm, overexposed disposable-camera film: hard flash, red-eye, orange date-less prints. Accents: **the red HATCH XC windbreaker** (must be the same jacket in `c5_ph_2008` and `c5_ph_frame24`) and **yellow** (Low's disposable camera, Vera's yellow-capped EpiPen) against **grey** (the trainer pens).

Sizes: photos portrait 600x800 / landscape 800x600 · cover 600x800 · wallpapers 600x1300 · map 800x600 · avatars 200x200.

Reused existing art: `av_unknown` (the unknown number — Tamsin Dunn). Handler uses `av_ines`.

Recurring objects:
- **The wall phone** — beige 1970s push-button wall telephone with a coiled cord; the keypad shows letters under digits exactly like a phone: 2 ABC, 3 DEF, 4 GHI, 5 JKL, 6 MNO, 7 PQRS, 8 TUV, 9 WXYZ.
- **The final box** — squat brushed-steel lockbox, riveted, with a red seven-segment LED timer on the front.
- **The red windbreaker** — bright red nylon, white stripe, **"HATCH XC"** in white block letters down the left sleeve.

## Cover

- `cover_case5` (600x800) — Looking through the open round door of a bank vault into a room lit quarry-blue: a fake rock ledge over rippling light, a beige wall phone on the far wall, and in the centre on the floor a small steel lockbox with a glowing red timer. A single yellow-capped EpiPen lies on the vault threshold in the foreground. Title area: "THE LAST ROOM".

## Wallpapers

- `wall_c5_lock` (600x1300) — **PASSCODE CLUE.** Close, straight-on photo of the beige 1970s wall phone (see recurring) mounted on a dark painted vault wall, every keypad letter group legible (2 ABC … 9 WXYZ). Above it, chalk handwriting, legible: **"SAY HIS NAME."** and under it, smaller: **"(not what we called him)"**. Taped beside the phone, a small faded snapshot of a grinning teenage boy holding a yellow disposable camera, with a strip of tape reading **"LOW"** — the nickname is the trap (3 letters). The full name **Marlow** must NOT appear on the wallpaper; it comes from the lock-screen notifications. (MARLOW → 6 2 7 5 6 9.)
- `wall_c5_home` (600x1300) — The Lisk & Key logo, minimal: a brass old-fashioned key whose bow is a keyhole shape, on black marble, with "LISK & KEY" small at the bottom.

## Map

- `map_c5` (800x600) — Stylised harbour-city map in slate, ink and brass tones. Harbour water along the bottom-left; a grid of old downtown streets in the centre; wooded hills to the north-east with a jagged pale pit labelled **"HATCH QUARRY"** and a tiny overhang marked **"the Pulpit"**. Label positions (x,y in 0..1):
  - Lisk & Key (old Harbor Savings Bank) — (0.42, 0.56), columned bank icon with a key symbol
  - Hatch Quarry — the Pulpit — (0.84, 0.16), quarry pit in the hills
  - Tannery Lofts (home) — (0.22, 0.40), brick warehouse block
  - Ruth Price's house — (0.62, 0.74), small house with a porch
  - Fenwick St PhotoLab — (0.30, 0.68), camera icon
  - Briar Glen Care — (0.90, 0.82), low building with a garden
  - KPRT studios — (0.12, 0.86), radio/TV mast by the harbour
  - Kettle & Crumb — (0.52, 0.40), bakery icon (a whisk)

## Avatars (200x200)

- `av_c5_owen` — Owen Blake, 38, co-owner. Gentle face, neat brown beard, round tortoiseshell glasses, cardigan over a Lisk & Key polo, a lanyard of keys. Looks like the nicest man in the world.
- `av_c5_julian` — Julian Ashe, 38, DA candidate. Sharp navy suit, campaign pin "ASHE — TRUTH MATTERS", perfect hair, tight smile.
- `av_c5_nadia` — Nadia Fenn, 38. Long dark hair, oversized cream sweater, silver hoop earrings, anxious eyes.
- `av_c5_mira` — Mira Lisk, 33, Vera's younger sister. Pixie cut, nose ring, denim jacket, fierce red-rimmed eyes.
- `av_c5_tess` — "Tess Moreau", 29. Dark-blonde ponytail, Lisk & Key staff T-shirt, a name tag reading "TESS", watchful grey eyes.
- `av_c5_ruth` — Ruth Price, 70, Low's mother. White curls, a lavender cardigan, gentle lined face, a small gold cross.
- `av_c5_ibarra` — Hal Ibarra, 60, Second Look Project attorney. Grey moustache, rumpled tweed jacket, bow tie, a stack of files.

## Photos

- `c5_ph_room9` (landscape) — The finished escape room inside an old bank vault: walls painted quarry-blue, a fibreglass rock ledge jutting over a floor of rippling blue light, the beige wall phone on the far wall, and a squat steel lockbox with a red LED timer in the corner.
- `c5_ph_finalbox` (portrait) — **KEY CLUE.** The steel final box, lid open; inside, grey foam with an empty **phone-shaped cut-out**. Red LED on the front, legible: **"OPENS NOV 02 · 09:00"**. A strip of masking tape on the lid in marker handwriting, legible: **"FOR HAL · RUTH · TAMSIN"**.
- `c5_ph_camera` (landscape) — A yellow disposable camera on a floral kitchen tablecloth, **"LOW"** written on it in silver marker, its frame counter at **"3"**. Beside it a zip bag with a printed label, legible: **"HARBOR CO. SHERIFF — PROPERTY — PRICE, M."**
- `c5_ph_contact` (landscape) — A photo-lab contact sheet: 23 tiny flash-lit thumbnails in a grid (a car, rum bottles, laughing teens, black water). The 24th square is cut out with scissors, leaving a rectangular hole; beside it in red pen: **"24 →"**.
- `c5_ph_frame24` (portrait) — **KEY CLUE (the whole case).** Disposable-camera flash photo, slightly tilted: a reversed-camera selfie of a laughing 17-year-old boy (Low), face big and blown-out by flash, standing on a rock ledge at night with black water far below. Directly behind him, reaching toward his shoulder, a teenage boy in the **red HATCH XC windbreaker** — the face mostly lost in shadow, the white sleeve lettering **"HATCH XC"** clearly legible. No flashlight, no other adult anywhere.
- `c5_ph_statement` (portrait) — **KEY CLUE.** A photocopied typed witness statement on a desk. Header legible: **"HARBOR COUNTY SHERIFF — WITNESS STATEMENT — 08/23/2008"**. Legible lines: **"Name: Owen R. Blake, 17"**, **"I was at the car with Nadia the whole time. We heard Low yell and a man shouting and saw a flashlight coming down the path."** A signature at the bottom.
- `c5_ph_clipping` (portrait) — **KEY CLUE.** Microfiche-reader screen showing a newspaper page, masthead **"HARBOR LEDGER — AUG 24, 2008"**. Headline legible: **"CARETAKER HELD IN QUARRY DEATH"**. Body legible: **"Abel Dunn, 53, was found soaked to the chest at the water's edge."** and **"Four teenagers say Dunn chased them onto the Pulpit ledge with a flashlight."** Grainy photo of a big older man in wet work clothes being led to a cruiser.
- `c5_ph_2008` (landscape) — **KEY CLUE.** Golden-hour 2008 film photo: five teenagers on the hood of an old sedan by a quarry: a dark-haired girl (Vera) with a bandana, a long-haired girl (Nadia), a preppy boy in a polo (Julian), a grinning boy holding a yellow disposable camera (Low), and a slim boy in the **red HATCH XC windbreaker** (Owen) — the only red jacket in the picture.
- `c5_ph_firstaid` (landscape) — **KEY CLUE.** A staff room table: a bearded man in a cardigan (Owen) pressing a **grey-capped pen with "TRAINER" printed on the barrel** into an orange, grinning. Next to the first-aid binder, for comparison, a real auto-injector with a **yellow cap**.
- `c5_ph_brownies` (portrait) — **KEY CLUE.** Two brownies on a paper doily on a mixing console with sliders and a small monitor, one pale gold, one almost black. A bakery box lid propped behind them with a round sticker, legible: **"KETTLE & CRUMB — BLACK SESAME + HONEY"**.
- `c5_ph_debate` (landscape) — **KEY CLUE.** A living-room TV photographed from a couch (popcorn bowl in the foreground). On screen: two podiums; a man in a navy suit (Julian) mid-sentence. Lower third legible: **"KPRT LIVE · HARBOR CO. DA DEBATE"**. Corner bug legible: **"LIVE 11:14 PM"**.
- `c5_ph_abel` (portrait) — Close on an old man's big scarred hands around a paper cup of tea, a knitted care-home blanket over his knees, no face shown. A visitor sticker on the table, legible: **"BRIAR GLEN · VISITOR · ROOM 14"**.
