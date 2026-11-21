# Art specs — Case 06 "Touch Move"

Palette & mood: a city park in a heat wave, late summer. Sodium-orange lamplight and heat haze. Sun-bleached granite chess tables, plane trees, dusty greens. Night shots are humid and hazy, never pitch black. Accents: **the green Conservancy polo** (Curtis, same shade in every photo), **Dez's straw hat** with a black band, and **banded $100 bundles** (pale yellow paper bands, "$1,000"). The tone is warm and hopeful, with dread at the edges.

Sizes: photos portrait 600x800 / landscape 800x600 · cover 600x800 · wallpapers 600x1300 · map 800x600 · avatars 200x200.

Reused existing art: `av_unknown` (the unknown number, Luz the groundskeeper). Handler uses `av_ines`.

Recurring objects:
- **Table 4** is a square granite chess table with an inlaid 8x8 board, a hand-painted white "4" on its edge and a battered green-and-cream analogue chess clock.
- **The Dunmore envelope** is a large white padded cash envelope printed "DUNMORE PROPERTIES" in navy with a small skyline logo.
- **The pavilion** is a low brick building with a green tin roof. The Conservancy office window has a sticker reading "HALSEY PARK CONSERVANCY".

## Cover

- `cover_case6` (600x800): Night in Halsey Park. Table 4 is in the foreground in orange lamplight, with chess pieces mid-game, a tipped-over white king and a straw hat resting on the bench. Behind it, through heat haze, the green-roofed pavilion has one lit office window. A park thermometer on a lamppost reads "104°". Title area at the top: "TOUCH MOVE".

## Wallpapers

- `wall_c6_lock` (600x1300). **PASSCODE CLUE.** Top-down photo of Table 4's inlaid stone board, white pieces at the bottom. File letters **a b c d e f g h** are carved along the bottom edge and rank numbers **1–8** up the left edge, all clearly legible. The position after 1.e4 e5 2.Bc4 Nc6 3.Qh5 Nf6:
  - White: king e1, **queen h5**, bishop c4, pawn e4, and the other pieces and pawns on their starting squares (rook a1, knight b1, bishop c1, knight g1, rook h1, pawns a2 b2 c2 d2 f2 g2 h2).
  - Black: king e8, **queen d8** (the trap: the wrong queen), knights c6 and f6, pawn e5, and the other pieces and pawns on their starting squares (rooks a8 h8, bishops c8 f8, pawns a7 b7 c7 d7 f7 g7 h7).
  - The **white queen on h5** must be unmistakable: a tall white queen with a crown, catching the lamplight. **f7** holds a black pawn.
  - Chalk on the granite border below the board, in shaky capitals: **"THE MOVE THAT ENDS IT."** Do NOT draw an arrow and do NOT write "f7" or "h5" anywhere. The destination comes from Malik's notification and the origin comes from the board. (h5 → f7 = 8 5 6 7.)
- `wall_c6_home` (600x1300): Minimal. A single white knight on a sun-faded granite square, with a long late-afternoon shadow, and small text at the bottom: "TABLE 4 · KIDS PLAY FREE".

## Map

- `map_c6` (800x600): Stylised city-park map in warm parchment, park green and brick tones. A river runs diagonally across the top-right corner with one bridge. Halsey Park is a large green rectangle in the centre with curving paths. Label positions (x,y in 0..1):
  - Halsey Park — chess plaza (table 4): (0.46, 0.48), a small grid of square tables
  - Pavilion & Conservancy office: (0.60, 0.34), green-roofed building icon
  - Heron fountain: (0.50, 0.60), round fountain with a heron
  - Corliss Ave, apt 4F (home): (0.18, 0.72), tenement block
  - Rook & Pawn Café (across the river): (0.88, 0.18), coffee cup with a rook, on the far bank
  - St. Agnes Hospital: (0.24, 0.22), hospital cross
  - Winners Circle OTB, Fulton Ave: (0.78, 0.80), horseshoe icon
  - Halsey Branch Library: (0.32, 0.52), book icon at the park's west edge
  - A dotted footpath links the plaza, the pavilion and the fountain. A small scale bar reads "100 m".

## Avatars (200x200)

- `av_c6_desmond`: **Owner portrait.** Desmond "Dez" Boateng, 66, Ghanaian-American, retired merchant seaman. Close-cropped white hair and a neat white moustache, warm deep-set eyes with laugh lines, a straw porkpie hat with a black band, and a short-sleeved cream guayabera. A wooden chess-piece pendant (a knight) on a cord. He looks amused, as if he already knows your next move.
- `av_c6_malik`: Malik Grant, 14. Skinny, braces, a high-top fade, oversized black T-shirt reading "1. e4", and a too-serious expression he is trying to keep up.
- `av_c6_curtis`: Curtis Brennick, 48, Conservancy events manager. Sunburnt, gym-built going soft, sunglasses pushed up on his head, the **green Conservancy polo** with a lanyard and a big friendly salesman's grin.
- `av_c6_abena`: Abena Boateng, 62, Dez's older sister, a retired nurse. Grey locs tied up in a kente headwrap, reading glasses on a chain, arms folded, unimpressed and loving.
- `av_c6_vic`: Vic Sallow, 35, travelling blitz hustler. Slicked hair, white linen shirt open at the collar, gold chain, smirk.
- `av_c6_hank`: Hank, 74, Dez's oldest rival at table 2. A Navy veteran cap, white stubble, an unlit cigar and a cardigan in August.
- `av_c6_toni`: Toni Grant, 40, Malik's mother, a bus driver. Transit uniform shirt, short natural hair, a tired kind smile.
- `av_c6_pak`: Mr. Pak, 60s, the building super. A grey work shirt with "PAK" stitched on it, a toolbelt, a pencil behind his ear.

## Photos

- `c6_ph_tables` (landscape): Sunset over the stone chess plaza in heat shimmer under plane trees. A lamppost thermometer, legible: **"104°F"**. Table 4 with its painted "4" and the green-and-cream clock. A banner strung over the plaza, legible: **"HALSEY HEAT BLITZ OPEN · FINAL 9PM"**.
- `c6_ph_count` (landscape). **KEY CLUE.** A folding table under fluorescent light inside the pavilion. **Eight** paper-banded bundles of $100 bills fanned in a row (each band legible: **"$1,000"**), with the **Dunmore envelope** beside them. Curtis (green polo) counts with a licked thumb. Toni Grant (transit shirt) watches from the edge of the frame, hand over her mouth.
- `c6_ph_safe` (portrait). **KEY CLUE.** A grey steel office safe under a desk, door open. Curtis (green polo), crouched, pushes the Dunmore envelope inside with one hand and presses the keypad with the other. A label on the safe door, legible: **"CONSERVANCY — EVENTS — C. BRENNICK"**. Dez's shadow and the brim of his straw hat fall across the floor in the foreground.
- `c6_ph_check` (landscape). **KEY CLUE.** Night trophy photo under floodlights. Dez in his straw hat, beaming, holds one end of a giant novelty cheque, legible: **"$8,000 · HALSEY HEAT CHAMPION · DUNMORE PROPERTIES"**. Curtis holds the other end. Dez's free hand holds only a **paper cup of water**. No envelope, no bag. A crowd behind them with phones up.
- `c6_ph_viccart` (portrait). **KEY CLUE.** A white park-police golf cart, door decal legible: **"HALSEY PARK POLICE"**, driving out through a wrought-iron gate with a sign, legible: **"EAST GATE"**. In the back seat, a man in a white linen shirt (Vic) with his arms folded, scowling. A cop is waving the crowd back.
- `c6_ph_cafe` (landscape). **KEY CLUE.** A crowded late-night chess café with warm bulbs and a dozen boards. Vic stands at the centre table inside a ring of opponents. A chalkboard on the wall, legible: **"ROOK & PAWN · VIC SALLOW SIMUL · 100 GAMES · TONIGHT TILL 2AM"**. Through the window, river lights and a bridge.
- `c6_ph_bench` (portrait). **KEY CLUE.** A night selfie taken from above. Dez lies on a park bench beside Table 4 (the painted "4" visible at the frame edge), straw hat on his chest, eyes half shut, smiling. Plane-tree leaves black against a hazy orange sky. A half-empty water bottle on the bench. **No bag, no envelope.**
- `c6_ph_thermostat` (portrait). **KEY CLUE.** A beige wall thermostat, display legible: **"INSIDE 96°F"** and a blinking **"AC FAULT E4"**. A box fan with one broken blade on the floor below.
- `c6_ph_otb` (landscape). **KEY CLUE.** Shot from the street through a shop window. Inside, a dim off-track betting parlour lined with horse-racing screens. A man in the **green Conservancy polo** (Curtis) at a betting window pushes a thick fold of cash under the glass. A sign over the windows, legible: **"WINNERS CIRCLE — WAGERS"**. The shop's address is painted on the glass in reverse: "FULTON AVE".
- `c6_ph_jar` (portrait): A big glass pickle jar stuffed with folded fives and tens on a kitchen counter. Masking tape on it in shaky capitals, legible: **"MALIK — NATIONALS"**. A credit-union deposit slip tucked underneath.
- `c6_ph_malik` (landscape): Daytime at Table 4. A skinny thirteen-year-old boy (Malik) with braces grins behind a much-too-big gold trophy. Dez stands behind him with his arms crossed, pretending to be furious, and failing.
- `c6_ph_fountain` (landscape): Morning in the park. A round stone fountain with a bronze heron, children's toy sailboats bobbing. In the background, about 140 m away, the green-roofed pavilion with the office window and its "HALSEY PARK CONSERVANCY" sticker.
