// COLD SIGNAL — "Hidden album" photos, batch 2 (passcode-locked comedy pin-ups).
// Every value in `hiddenArt2` is a complete standalone 600x800 SVG document string.
// Ids inside each SVG are prefixed with the art key. Suggestive, never explicit.

const SANS = 'font-family="Helvetica, Arial, sans-serif"';
const HAND = 'font-family="Marker Felt, Chalkboard SE, Comic Sans MS, sans-serif"';
const R = (v: number): number => Math.round(v);
const tx = (x: number, y: number, size: number, s: string, fill: string, extra = '', font = SANS): string =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${font} font-weight="700" text-anchor="middle" ${extra}>${s}</text>`;
const lg = (id: string, a: string, b: string, x2 = 0, y2 = 1): string =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const glow = (id: string, c: string, a = 0.8): string =>
  `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${a}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;

/** Form-shadow + rim-light filter: shades the right edge of whatever silhouette it is applied to. */
const shf = (id: string, rim: string, dx = -11, d = 0.36): string =>
  `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feOffset in="SourceAlpha" dx="${dx}" dy="3" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="e"/><feFlood flood-color="#1a0612" flood-opacity="${d}"/><feComposite in2="e" operator="in" result="s"/><feOffset in="SourceAlpha" dx="-4" result="p"/><feComposite in="SourceAlpha" in2="p" operator="out" result="q"/><feFlood flood-color="${rim}" flood-opacity=".95"/><feComposite in2="q" operator="in" result="r"/><feOffset in="SourceAlpha" dx="5" dy="1" result="g"/><feComposite in="SourceAlpha" in2="g" operator="out" result="h"/><feFlood flood-color="#fff" flood-opacity=".17"/><feComposite in2="h" operator="in" result="w"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="s"/><feMergeNode in="w"/><feMergeNode in="r"/></feMerge></filter>`;

/** Wraps a picture: defs + clip + film grain + vignette. */
const frame = (k: string, rim: string, defs: string, body: string, vig = 0.55): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800"><defs>${defs}${shf(`${k}f`, rim)}` +
  `<filter id="${k}gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7"/><feColorMatrix values=".6 .6 .6 0 -.4 .6 .6 .6 0 -.4 .6 .6 .6 0 -.4 0 0 0 0 1"/></filter>` +
  `<radialGradient id="${k}vg" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${vig}"/></radialGradient>` +
  `<clipPath id="${k}fr"><rect width="600" height="800"/></clipPath></defs><g clip-path="url(#${k}fr)">${body}<rect width="600" height="800" filter="url(#${k}gr)" opacity=".14" style="mix-blend-mode:overlay"/><rect width="600" height="800" fill="url(#${k}vg)"/></g></svg>`;

/** Tapered limb through joints [x, y, radius]. */
function limb(...p: number[][]): string {
  let d = '';
  for (let i = 0; i < p.length; i++) {
    const [x, y, r] = p[i];
    d += `M${R(x - r)} ${R(y)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
    if (i) {
      const [a, b, q] = p[i - 1];
      const L = Math.hypot(x - a, y - b) || 1, nx = -(y - b) / L, ny = (x - a) / L;
      d += `M${R(a + nx * q)} ${R(b + ny * q)}L${R(x + nx * r)} ${R(y + ny * r)}L${R(x - nx * r)} ${R(y - ny * r)}L${R(a - nx * q)} ${R(b - ny * q)}Z`;
    }
  }
  return `<path d="${d}"/>`;
}
const at = (x: number, y: number, s: number, rot: number, body: string): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${body}</g>`;

// ---------- faces (same 200-unit geometry as the contact avatars; head centre = 100,85) ----------
interface Face {
  sk: string; sh: string; rim: string; iris: string; brows: string; browC: string; mouth: string;
  lid?: number; lash?: boolean; shadow?: string; back?: string; front?: string; under?: string; noEars?: boolean;
}
const HEAD = 'M67 80C67 34 133 34 133 80C133 106 122 131 100 131C78 131 67 106 67 80Z';
function face(o: Face): string {
  const lid = o.lid ?? 0.9;
  const c = 85.4 + lid * 1.6;
  const eye = (x: number): string =>
    `<path d="M${x - 7} 91.5Q${x} 85.500 ${x + 7} 91Q${x} 96.500 ${x - 7} 91.5Z" fill="#f1e9df"/><circle cx="${x}" cy="91" r="3.5" fill="${o.iris}"/><circle cx="${x - 1.2}" cy="90.4" r=".9" fill="#fff"/>` +
    `<path d="M${x - 8.5} 92Q${x} ${c} ${x + 8.5} 91.4V82H${x - 8.5}Z" fill="${o.sk}"/>` +
    (o.shadow ? `<path d="M${x - 8.5} 92Q${x} ${c} ${x + 8.5} 91.4Q${x} ${c - 9} ${x - 8.5} 92Z" fill="${o.shadow}" opacity=".6"/>` : '');
  return (o.back ?? '') +
    (o.noEars ? '' : `<ellipse cx="67" cy="94" rx="5" ry="9" fill="${o.sk}"/><ellipse cx="133" cy="94" rx="5" ry="9" fill="${o.sh}"/>`) +
    `<path d="${HEAD}" fill="${o.sk}"/>${o.under ?? ''}${eye(87)}${eye(113)}` +
    `<path d="M109 37C105 60 109 72 106 84C104 97 111 103 108 112C106 122 104 128 99 131C122 131 133 106 133 80C133 60 126 44 109 37Z" fill="${o.sh}" opacity=".72"/>` +
    `<path d="M70 62Q80 50 96 48Q78 56 72 76Z" fill="#fff" opacity=".13"/><path d="M131.500 68V80C131.500 105 121 129.500 100 129.500" fill="none" stroke="${o.rim}" stroke-width="2.4" opacity=".7"/>` +
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M79 92Q87 ${c} 95 91.4M105 91.400Q113 ${c} 121 92${o.lash ? 'M79 92l-4-2.800M121 92l4-2.800' : ''}" stroke="#1a1318" stroke-width="${o.lash ? 2.5 : 2}"/>` +
    `<path d="${o.brows}" stroke="${o.browC}" stroke-width="3.2"/><path d="M102 95Q105 104 105.500 108Q101 112 95 108.500" stroke="#000" stroke-opacity=".38" stroke-width="1.9"/>${o.mouth}</g>${o.front ?? ''}`;
}
/** Place a face: (x,y) is the head centre. */
const hd = (x: number, y: number, s: number, rot: number, o: Face): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-100 -85)">${face(o)}</g>`;
const lips = (c: string, d: string, open = false): string =>
  `<path d="M88 114Q94 110.500 100 113Q106 110.500 112 114Q100 ${open ? 127 : 123} 88 114Z" fill="${c}" stroke="${d}" stroke-width="1"/>` +
  (open ? '<path d="M91 115Q100 117.500 109 115L107 118Q100 120 93 118Z" fill="#fff" stroke="none"/>' : `<path d="M88 114Q100 117.500 112 114" stroke="${d}" stroke-width="1.300"/>`) +
  '<path d="M94 120.500q5-2 9-.5" stroke="#fff" stroke-width="1.200" opacity=".45"/>';
const smirk = (c: string): string => `<path d="M90 116.500Q100 119.500 111 113" stroke="${c}" stroke-width="2.600"/><path d="M111 113q2.500-1 3-4" stroke="${c}" stroke-width="1.500"/>`;
const grin = (c: string): string => `<path d="M85.500 112.500Q100 117 114.500 112.500Q112 124 100 124Q88 124 85.500 112.500Z" fill="#fff" stroke="${c}" stroke-width="1.600"/><path d="M88 118Q100 121.500 112 118" stroke="${c}" stroke-width=".8" opacity=".5"/>`;

// ---------- bodies (origin = pit of the neck; 1 unit = avatar head scale 1) ----------
const TF = 'M-15-44V-8Q-34-2-58 6Q-70 10-70 26L-56 60C-62 84-42 118-38 146C-40 176-79 194-81 240V262H81V240C79 194 40 176 38 146C42 118 62 84 56 60L70 26Q70 10 58 6Q34-2 15-8V-44Z';
const BUST = '<circle cx="-29" cy="84" r="33"/><circle cx="29" cy="84" r="33"/>';
const TM = 'M-17-44V-10Q-40-4-70 4Q-84 8-84 28L-70 70C-70 110-56 150-54 190V262H54V190C56 150 70 110 70 70L84 28Q84 8 70 4Q40-4 17-10V-44Z';
/** Balconette bra cups + straps + band. */
const bra = (c: string, trim: string, lace = true): string =>
  `<path d="M-58 62L-40 2M58 62L40 2" stroke="${c}" stroke-width="4" fill="none"/><path d="M-60 104Q0 122 60 104L58 116Q0 132-58 116Z" fill="${c}"/>` +
  [-1, 1].map((m) => `<g transform="scale(${m} 1)"><path d="M-63 80Q-60 62-40 62Q-18 64-3 82Q-1 106-10 114Q-30 126-54 114Q-66 100-63 80Z" fill="${c}"/>` +
    (lace ? `<path d="M-58 72Q-40 62-22 68Q-10 74-4 84" fill="none" stroke="${trim}" stroke-width="4" stroke-dasharray="1 6" stroke-linecap="round"/>` : '') + '</g>').join('') +
  `<path d="M-4 96h8" stroke="${trim}" stroke-width="5" stroke-linecap="round"/>`;
/** Triangle bikini top. */
const tri = (c: string, trim: string): string =>
  `<path d="M-38 44L-14-12M38 44L14-12M-58 106Q0 120 58 106" stroke="${trim}" stroke-width="3.500" fill="none"/>` +
  [-1, 1].map((m) => `<path transform="scale(${m} 1)" d="M-38 42Q-14 70-3 100Q-8 114-30 116Q-54 114-60 98Q-52 66-38 42Z" fill="${c}" stroke="${trim}" stroke-width="2.500" stroke-linejoin="round"/>`).join('');
/** High-cut briefs. */
const brief = (c: string, trim: string, lace = true): string =>
  `<path d="M-79 214Q-40 232 0 234Q40 232 79 214L82 240Q40 254 9 278Q0 283-9 278Q-40 254-82 240Z" fill="${c}"/>` +
  (lace ? `<path d="M-78 221Q-40 239 0 241Q40 239 78 221" fill="none" stroke="${trim}" stroke-width="4" stroke-dasharray="1 6" stroke-linecap="round"/>` : `<path d="M-79 216Q-40 234 0 236Q40 234 79 216" fill="none" stroke="${trim}" stroke-width="3"/>`);
/** Body line-work drawn over the skin: collarbones, cleavage, navel. */
const marks = (c: string, bust = true): string =>
  `<g fill="none" stroke="${c}" stroke-width="2.500" stroke-linecap="round" opacity=".8"><path d="M-48 8Q-28 14-8 6M48 8Q28 14 8 6${bust ? 'M0 60Q-3 80 0 98' : ''}M0 186v9"/></g>` + (bust ? '<path d="M-50 66Q-38 54-22 58M12 62Q24 54 38 58" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/>' : '');
/** A hand: palm blob with finger hints. */
const hand = (x: number, y: number, rot: number, sh: string, s = 1): string =>
  at(x, y, s, rot, `<path d="M-12-6Q-12-16 0-16Q12-16 12-6V10Q12 20 0 20Q-12 20-12 10Z"/><path d="M-5 6v12M1 7v13M7 6v11" stroke="${sh}" stroke-width="1.600" fill="none" opacity=".7"/>`);
/** Phone held up for a mirror selfie (centre x,y). */
const phone = (x: number, y: number, rot: number, c: string, sk: string): string =>
  at(x, y, 1, rot, `<rect x="-26" y="-46" width="52" height="92" rx="9" fill="${c}"/><rect x="-18" y="-39" width="20" height="20" rx="6" fill="#0c0c12"/><circle cx="-12" cy="-33" r="3.500" fill="#39405a"/><circle cx="-4" cy="-25" r="3.500" fill="#39405a"/>` +
    `<g fill="${sk}"><rect x="8" y="-6" width="24" height="11" rx="5.500"/><rect x="10" y="7" width="23" height="11" rx="5.500"/><rect x="10" y="20" width="21" height="11" rx="5.500"/><rect x="9" y="33" width="18" height="10" rx="5"/></g>`);
const stars = (pts: number[][], c: string): string =>
  pts.map(([x, y, r]) => `<path d="M${x} ${y - r}L${x + r * 0.25} ${y - r * 0.25}L${x + r} ${y}L${x + r * 0.25} ${y + r * 0.25}L${x} ${y + r}L${x - r * 0.25} ${y + r * 0.25}L${x - r} ${y}L${x - r * 0.25} ${y - r * 0.25}Z" fill="${c}"/>`).join('');

const gloss = (d: string, w = 6, o = 0.32): string => `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`;
/** Male chest/abs line-work. `cut` = how shredded (0 dad-bod .. 1 ripped). */
const mmarks = (c: string, cut: number): string =>
  `<g fill="none" stroke="${c}" stroke-width="2.600" stroke-linecap="round" opacity=".8"><path d="M-56 8Q-32 14-10 6M56 8Q32 14 10 6M-60 80Q-30 98-3 82M60 80Q30 98 3 82M0 44V84M0 196v8"/>` +
  (cut > 0.5 ? '<path d="M0 104V184M-28 120Q-14 126 0 122Q14 126 28 120M-27 148Q-14 154 0 150Q14 154 27 148M-25 176Q-13 181 0 178Q13 181 25 176M-52 214Q-34 240-18 258M52 214Q34 240 18 258"/>' : '') + '</g>';

const navel = '<circle cy="197" r="4.500" fill="none" stroke="#ffd24a" stroke-width="2.200"/><circle cy="203" r="2.600" fill="#fff"/>';
const tat = (d: string, c = '#14323a', w = 2.2): string => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/>`;
const EARS = '<g fill="none" stroke="#f4f6fa" stroke-width="1.700"><circle cx="64.500" cy="87" r="2.600"/><circle cx="63.500" cy="94" r="2.600"/><circle cx="65" cy="101" r="2.600"/></g>';
const NOSE = '<circle cx="107.500" cy="106" r="1.700" fill="#f4f6fa"/>';
const SEPTUM = '<path d="M97 110a3.600 3.600 0 0 0 7.200 0" fill="none" stroke="#f4f6fa" stroke-width="1.800"/>';
// ---------- the cast ----------
const JUNE: Face = {
  sk: '#8a5236', sh: '#572e22', rim: '#ffd08a', iris: '#1c100c', browC: '#17100f', lash: true, shadow: '#c2507a',
  brows: 'M77.500 80Q86 75.500 95 78.500M105 78.500Q114 75.500 122.500 80', mouth: lips('#d81e3c', '#6e0a20'),
  back: '<g fill="#17100f"><circle cx="72" cy="62" r="17"/><circle cx="88" cy="46" r="18"/><circle cx="110" cy="45" r="18"/><circle cx="128" cy="60" r="17"/><circle cx="135" cy="78" r="10"/><circle cx="65" cy="78" r="10"/></g>',
  front: '<path d="M66 84C62 58 82 47 100 47C118 47 138 58 134 84C129 69 116 60 100 60C84 60 71 69 66 84Z" fill="#17100f"/><path d="M76 44Q86 34 98 34M118 40Q130 46 134 58" fill="none" stroke="#4a2e2a" stroke-width="2.500" stroke-linecap="round" opacity=".8"/><circle cx="66" cy="108" r="6" fill="none" stroke="#f3c64a" stroke-width="2.400"/><circle cx="134" cy="108" r="6" fill="none" stroke="#c8962a" stroke-width="2.400"/>',
};
const CASS: Face = {
  sk: '#e8b895', sh: '#b47c62', rim: '#ffb060', iris: '#4a6a80', browC: '#6a5236', lash: true, shadow: '#7a5aa8',
  brows: 'M77.500 80.500Q85 74 95 75.500M105 75.500Q115 74 122.500 80.500', mouth: lips('#e0486a', '#8a2038', true),
  back: '<path d="M58 96C50 44 82 26 102 26C132 26 150 48 142 98L147 130L137 123L133 136L124 124H76L67 136L63 123L53 130Z" fill="#eadfb4"/><path d="M110 28C142 36 148 70 142 98L147 130L137 123L133 136L124 124H112Z" fill="#b9a878"/>',
  front: EARS + NOSE + '<path d="M65 86C58 44 84 30 104 31C126 32 142 50 135 86L130 68L124 80L117 60L108 76L99 57L90 76L83 62L76 80L70 70Z" fill="#eadfb4"/><path d="M74 50Q100 26 130 50Q116 40 101 40Q84 40 74 50Z" fill="#4a3826"/>' +
    '<path d="M60 88C52 14 148 14 140 88" fill="none" stroke="#1c1c26" stroke-width="8"/><rect x="50" y="74" width="20" height="40" rx="9" fill="#f07818"/><rect x="130" y="74" width="20" height="40" rx="9" fill="#b0500c"/><path d="M54 80v28" stroke="#ffb060" stroke-width="3" stroke-linecap="round"/>',
};
const MAGS: Face = {
  sk: '#8a5636', sh: '#5c3622', rim: '#ffb040', iris: '#2a1810', browC: '#1c1210', lash: true,
  brows: 'M77.500 81L95 82.500M105 82.500L122.500 80', mouth: lips('#b8324a', '#5a1020') + '<path d="M112 114q3-1 4-5" stroke="#4a2020" stroke-width="1.500"/>',
  back: '<path d="M57 70L52 128Q62 142 74 128L72 80ZM143 70L148 128Q138 142 126 128L128 80Z" fill="#5a4a36"/>',
  front: '<path d="M66 82Q100 60 134 82L133 74Q100 52 67 74Z" fill="#1c1412"/><path d="M62 78C57 36 84 21 100 21C118 21 143 36 138 78Q100 58 62 78Z" fill="#5a4a36"/><path d="M110 23C136 30 142 54 138 78Q124 68 110 64Z" fill="#000" opacity=".25"/><path d="M59 82Q100 60 141 82L141 66Q100 44 59 66Z" fill="#e8dcc0"/><path d="M110 51Q128 56 141 66V82Q126 72 110 68Z" fill="#000" opacity=".2"/><path d="M68 66v9M80 61v9M92 58v9M108 58v9M120 61v9M132 66v9" stroke="#b8a888" stroke-width="1.500" stroke-linecap="round"/><path d="M57 78L53 126Q57 134 63 130L66 86Z" fill="#e8dcc0"/><path d="M143 78L147 126Q143 134 137 130L134 86Z" fill="#b8a888"/>',
};
const WES: Face = {
  sk: '#dfae8c', sh: '#ae7a5c', rim: '#58e0c0', iris: '#5a6a4a', browC: '#5a3e28', lid: 0.6,
  brows: 'M76.500 77.500Q86 77 96 81M104 81Q114 77 123.500 77.500', mouth: grin('#7a3a34'),
  back: '<path d="M64 84L62 112Q68 108 70 90ZM136 84L138 112Q132 108 130 90Z" fill="#5a3e28"/>',
  under: '<path d="M68 82Q100 76 132 82V99Q100 105 68 99Z" fill="#f6dcc8" opacity=".75"/><path d="M66 88C67 122 80 137 100 137C120 137 133 122 134 88C130 101 123 106 113 104Q100 99 87 104C77 106 70 101 66 88Z" fill="#4a3424" opacity=".42"/>',
  front: '<path d="M68 64C60 14 86-2 100 10C114-2 140 14 132 64Z" fill="#c89a58"/><path d="M110 6C134 4 138 30 132 64H112Z" fill="#000" opacity=".2"/><path d="M68 52Q100 64 132 52L132 64Q100 74 68 64Z" fill="#3a2418"/><path d="M12 40Q50 62 100 60Q150 62 188 40Q180 72 100 76Q20 72 12 40Z" fill="#b98846"/><path d="M100 60Q150 62 188 40Q180 72 100 76Z" fill="#000" opacity=".22"/><path d="M96 58l4-5 4 5-4 5Z" fill="#58e0c0"/>',
};
const NADIA: Face = {
  sk: '#d9a886', sh: '#996e58', rim: '#ff8fb0', iris: '#3a2618', browC: '#1c1418', lash: true, shadow: '#3a1c38', lid: 2,
  brows: 'M77.500 82Q86 78 95 76.500M105 76.500Q114 78 122.500 82', mouth: lips('#a01c34', '#50081a', true),
  back: '<path d="M58 100C46 34 86 22 100 22C116 22 154 34 142 100C146 134 154 160 146 196H54C46 160 54 134 58 100Z" fill="#1c1418"/><path d="M110 24C150 34 148 80 142 100C146 134 154 160 146 196H124Z" fill="#000" opacity=".3"/>',
  front: '<path d="M62 104C54 44 84 31 100 31C116 31 146 44 138 104C137 76 128 60 104 50C90 62 66 70 62 104Z" fill="#1c1418"/><path d="M68 74Q78 48 100 41M108 52Q124 60 131 80" fill="none" stroke="#5a4454" stroke-width="2" stroke-linecap="round"/><g fill="none" stroke="#eef2f6" stroke-width="2.400"><circle cx="64" cy="114" r="9"/><circle cx="136" cy="114" r="9" opacity=".7"/></g>',
};
const MIRA: Face = {
  sk: '#e2b494', sh: '#a2745c', rim: '#ffd0c0', iris: '#3a4a3a', browC: '#1a1216', lash: true, shadow: '#b0463e',
  brows: 'M77 78Q87 78 95.500 82M104.500 82Q113 78 123 78', mouth: lips('#b02a40', '#5a0e1e') + '<path d="M103.500 107.500a3 3 0 1 0 2.500 2" stroke="#e4e8ec" stroke-width="1.600"/>',
  front: '<path d="M64 88C58 44 86 30 104 31C128 33 142 50 136 86C132 74 128 66 122 60C104 62 84 56 76 62C70 68 66 78 64 88Z" fill="#1a1216"/><path d="M76 62L70 80L82 60L80 74L90 58M122 60L128 76" stroke="#1a1216" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M72 58Q86 40 108 38" fill="none" stroke="#5a3a48" stroke-width="2.200" stroke-linecap="round"/>',
};
const TONI: Face = {
  sk: '#8a5636', sh: '#52301e', rim: '#fff0c0', iris: '#24140c', browC: '#1a1210', lash: true, lid: 0.8,
  brows: 'M77.500 81.500Q86 77 95 79.500M105 79.500Q114 77 122.500 81.500', mouth: grin('#4a1e18') + '<path d="M84 108Q81 113 83 119M116 108Q119 113 117 119" stroke="#3a1e12" stroke-width="1.200" opacity=".6"/>',
  back: '<ellipse cx="100" cy="58" rx="112" ry="40" fill="#e8c476"/><ellipse cx="100" cy="62" rx="100" ry="33" fill="#b8904a"/>',
  front: '<path d="M62 92C52 40 82 24 100 24C118 24 148 40 138 92C136 74 130 62 118 58C104 54 86 56 74 62C68 70 64 80 62 92Z" fill="#17100e"/><path d="M58 64C52 10 148 10 142 64Q100 46 58 64Z" fill="#f2d48a"/><path d="M110 22C140 26 146 44 142 64Q126 56 110 54Z" fill="#000" opacity=".15"/><path d="M57 54Q100 36 143 54L142 66Q100 48 58 66Z" fill="#2a4a8a"/><circle cx="67" cy="106" r="3" fill="#ffd24a"/>',
};
const VIC: Face = {
  sk: '#dba783', sh: '#a2705a', rim: '#ffc9d6', iris: '#3a2a1c', browC: '#1c1214', lid: 2,
  brows: 'M77.500 81Q86 78.500 95 81.500M105 80Q114 74 122.500 77', mouth: smirk('#7a3a34'),
  under: '<path d="M68 100Q100 140 132 100V134H68Z" fill="#2a1c1c" opacity=".2"/>',
  front: '<path d="M64 90C58 44 82 30 102 30C126 30 142 48 136 90C134 74 130 62 122 54C104 50 84 50 72 60C68 68 66 78 64 90Z" fill="#1a1216"/><path d="M74 54Q92 36 120 40M78 58Q96 44 124 48M72 62Q78 50 88 44" fill="none" stroke="#6a5660" stroke-width="1.800" stroke-linecap="round"/>',
};
const BEA: Face = {
  sk: '#f0cdb0', sh: '#b48a70', rim: '#ffe2c8', iris: '#4a3020', browC: '#3a1e16', lash: true, shadow: '#5a7ab0',
  brows: 'M77.500 79Q86 74 95 77.500M105 77.500Q114 74 122.500 79', mouth: lips('#e8203c', '#a81028', true),
  back: '<path d="M56 100C46 36 86 22 100 22C116 22 154 36 144 100C148 116 144 130 136 138H64C56 130 52 116 56 100Z" fill="#3a1e16"/><path d="M110 24C150 34 150 80 144 100C148 116 144 130 136 138H120Z" fill="#000" opacity=".28"/>',
  under: '<circle cx="76" cy="106" r="10" fill="#f08a8a" opacity=".4"/><circle cx="124" cy="106" r="10" fill="#c85a5a" opacity=".35"/>',
  front: '<path d="M60 104C52 44 84 30 100 30C116 30 148 44 140 104C139 78 130 62 112 56C96 66 70 66 60 104Z" fill="#3a1e16"/><path d="M66 78Q76 50 100 42M112 54Q128 62 134 84" fill="none" stroke="#7a4a34" stroke-width="2" stroke-linecap="round"/>' +
    '<g fill="#fff" fill-opacity=".14" stroke="#e8203c" stroke-width="2.800" stroke-linejoin="round"><path d="M75 86Q74 80 68 76Q82 82 96 84Q98 98 87 99Q75 99 75 86Z"/><path d="M125 86Q126 80 132 76Q118 82 104 84Q102 98 113 99Q125 99 125 86Z"/><path d="M96 87Q100 84 104 87" fill="none"/></g>',
};
const SAMI: Face = {
  sk: '#cfa078', sh: '#8e6648', rim: '#ffe0aa', iris: '#2e1e14', browC: '#17121a', lid: 2,
  brows: 'M77 83Q86 77.500 95.500 76M104.500 76Q114 77.500 123 83', mouth: smirk('#7a3e3a'),
  back: '<g fill="#17121a"><circle cx="68" cy="66" r="13"/><circle cx="132" cy="66" r="13"/><circle cx="64" cy="84" r="9"/><circle cx="136" cy="84" r="9"/><circle cx="80" cy="46" r="14"/><circle cx="120" cy="46" r="14"/><circle cx="100" cy="38" r="15"/></g>',
  under: '<path d="M67 96C70 112 80 108 90 110Q100 106 110 110C120 108 130 112 133 96C132 120 120 131 100 131C80 131 68 120 67 96Z" fill="#2a1e1c" opacity=".42"/>',
  front: '<g fill="#17121a"><circle cx="76" cy="58" r="11"/><circle cx="91" cy="49" r="12"/><circle cx="109" cy="49" r="12"/><circle cx="124" cy="58" r="11"/><circle cx="69" cy="72" r="7"/><circle cx="131" cy="72" r="7"/></g><path d="M70 58a9 9 0 0 1 11-8M86 46a9 9 0 0 1 11-6M105 44a9 9 0 0 1 12 1M120 52a9 9 0 0 1 9 8" stroke="#4a3e52" stroke-width="1.800" fill="none"/>',
};
const HS = 1.14; // head scale relative to body units
const HY = -70; // head centre above the pit of the neck

// ---------- hp_c1_june2 — red lace fit-check, one heel missing ----------
function june2(): string {
  const k = 'hp_c1_june2';
  const S = JUNE.sk, RD = '#e0182f', LC = '#ffa0b0';
  const foot = '<path d="M22 572L46 570L50 620Q46 640 30 640Q20 628 24 606Z"/>';
  const lace = (d: string, w: number): string => `<path d="${d}" stroke="${RD}" stroke-width="${w}" fill="none"/><path d="${d}" stroke="${LC}" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round" fill="none"/>`;
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([62, 24, 17], [124, 112, 14], [84, 196, 10])}<path d="${TF}"/>${BUST}` +
    `${limb([-41, 250, 42], [-44, 420, 25], [-44, 572, 13])}${limb([41, 250, 42], [56, 416, 25], [34, 566, 13])}${foot}` +
    `<g fill="#1a060c" opacity=".42">${limb([-42, 334, 34], [-44, 420, 25], [-44, 572, 13])}${limb([48, 334, 34], [56, 416, 25], [34, 566, 13])}${foot}</g>` +
    `${lace('M-78 322Q-42 338-6 324M12 324Q48 338 84 320', 10)}<path d="M-56 240L-58 318M-20 252L-22 324M56 240L64 318M20 252L28 324" stroke="${RD}" stroke-width="4"/>` +
    `<path d="M-58 572Q-44 564-30 574L-25 608Q-40 626-64 640H-80Q-82 630-70 624Z" fill="${RD}"/><path d="M-27 596L-23 640" stroke="${RD}" stroke-width="6" stroke-linecap="round"/>` +
    `${bra(RD, LC)}${brief(RD, LC)}${lace('M-74 200Q0 220 74 200', 11)}${hand(80, 204, 30, JUNE.sh)}</g>${marks(JUNE.sh)}` +
    navel + tat('M58 196q6-8 12 0q-6 10-12 0M64 204v10M60 210h8') +
    `<g filter="url(#${k}f)" fill="${S}">${limb([-62, 24, 17], [-114, 92, 14], [-96, -14, 10])}</g>${phone(-100, -56, -8, '#ff5c8a', S)}` +
    hd(4, HY, HS, 5, JUNE);
  const dog =
    `<g transform="translate(486 452)"><ellipse cx="6" cy="34" rx="62" ry="30" fill="#e9d9bd"/><path d="M40 20Q70 0 74 34Q60 52 40 44Z" fill="#b98a5a"/><circle cx="-30" cy="-6" r="32" fill="#e9d9bd"/><path d="M-58-22Q-76 0-62 26Q-50 12-52-12ZM-4-26Q16-10 6 20Q-6 8-8-10Z" fill="#8a5a36"/><circle cx="-42" cy="-12" r="4.500" fill="#1a1010"/><circle cx="-20" cy="-12" r="4.500" fill="#1a1010"/><circle cx="-43" cy="-13.500" r="1.500" fill="#fff"/><circle cx="-21" cy="-13.500" r="1.500" fill="#fff"/><path d="M-50-22l10 3M-12-22l-10 3" stroke="#8a5a36" stroke-width="2.500" stroke-linecap="round"/><ellipse cx="-31" cy="2" rx="6" ry="4.500" fill="#1a1010"/>` +
    `<path d="M-64 16Q-40 4-6 12L-2 22Q-28 30-52 30L-74 44Z" fill="${RD}"/><path d="M-70 40L-78 8" stroke="${RD}" stroke-width="5" stroke-linecap="round"/><path d="M-50 10q8 8 20 4" stroke="#e9d9bd" stroke-width="9" stroke-linecap="round" fill="none"/></g>`;
  const bg =
    `<rect width="600" height="800" fill="url(#${k}w)"/><rect y="640" width="600" height="160" fill="#2e1420"/><path d="M0 640H600" stroke="#1c0a0e" stroke-width="6"/>` +
    `<rect x="388" y="80" width="150" height="190" fill="#f0e2c8" transform="rotate(3 463 175)"/>${at(463, 175, 1, 3, tx(0, -40, 26, 'TUESDAY', '#b3261e') + tx(0, -8, 15, 'TO-DO', '#3a2a2a') + `<g ${HAND} font-size="15" fill="#3a2a2a"><text x="-58" y="20">☐ laundry</text><text x="-58" y="44">☐ lab report</text><text x="-58" y="68">☑ look insane</text></g>`)}` +
    `<circle cx="70" cy="330" r="200" fill="url(#${k}l)"/><path d="M40 300L100 300L116 372H24Z" fill="#ffd9a0"/><rect x="64" y="372" width="12" height="150" fill="#2a1414"/><rect x="20" y="520" width="110" height="120" fill="#4a2420"/><rect x="20" y="520" width="110" height="10" fill="#6a3830"/>` +
    `<path d="M352 500H600V640H352Z" fill="#5a2440"/><path d="M340 470Q470 440 600 470V540Q470 520 340 540Z" fill="#f0dcd0"/><path d="M340 536Q470 516 600 536V560Q470 540 340 560Z" fill="#c9a9a0"/><rect x="540" y="330" width="60" height="150" rx="14" fill="#4a1c34"/>${dog}` +
    `<path d="M0 700Q40 640 110 664Q170 650 196 720L210 800H0Z" fill="#3f6296"/><path d="M30 716Q70 690 120 700" stroke="#e9c27a" stroke-width="2.500" stroke-dasharray="6 5" fill="none"/><path d="M430 742Q480 706 540 724Q590 736 600 770V800H410Z" fill="#d8c8a8"/>`;
  return frame(k, '#ffd9a0',
    lg(`${k}w`, '#a8482c', '#3a1430') + glow(`${k}l`, '#ffd08a', 0.75) + glow(`${k}fl`, '#fff', 0.95) + glow(`${k}h`, '#ff9a5a', 0.55),
    `${bg}<ellipse cx="290" cy="420" rx="230" ry="380" fill="url(#${k}h)"/><ellipse cx="290" cy="764" rx="130" ry="16" fill="#000" opacity=".4"/>${at(292, 216, 0.86, -2, fig)}` +
    `<circle cx="204" cy="150" r="50" fill="url(#${k}fl)"/>${stars([[204, 150, 32]], '#fff')}` +
    `<rect x="9" y="9" width="582" height="782" fill="none" stroke="#c9a050" stroke-width="18"/><rect x="20" y="20" width="560" height="760" fill="none" stroke="#6a4a1c" stroke-width="3"/><path d="M60 40L150 40L40 240L40 110Z" fill="#fff" opacity=".07"/>`);
}

// ---------- hp_c1_bumble — the sheets guy's dating profile ----------
function bumble(): string {
  const k = 'hp_c1_bumble';
  const S = '#e9b48e', SH = '#b07a58';
  const DALE: Face = {
    sk: S, sh: SH, rim: '#fff2c8', iris: '#4a6a8a', browC: '#8a6a3a', lid: 0.3, brows: 'M77 79Q86 75 95 78M105 78Q114 75 123 79', mouth: grin('#7a3a34'),
    front: '<path d="M64 86C58 40 84 28 102 29C128 30 142 50 136 86C132 68 124 58 108 56C92 60 76 58 70 66Z" fill="#c8a25a"/><path d="M74 54Q92 38 118 42" fill="none" stroke="#f0d890" stroke-width="2.500" stroke-linecap="round"/><path d="M86 108Q100 102 114 108L112 112Q100 108 88 112Z" fill="#a8823e"/>',
  };
  const tote =
    `<g transform="translate(96 96) rotate(8)"><path d="M-70 40Q-80-40-30-52Q-10-90 30-60Q80-70 76 30Z" fill="#fff"/><path d="M-40-30Q-10-10 10-44M20-20Q40-40 60-24M-50 10Q-20 0 0 14" fill="none" stroke="#c8d4e4" stroke-width="5" stroke-linecap="round"/><path d="M50-50q20-14 34 6" fill="none" stroke="#9ab" stroke-width="4" stroke-dasharray="3 4"/>` +
    `<path d="M-74 20H80L66 210H-62Z" fill="#e8d9b0"/><path d="M30 20H80L66 210H24Z" fill="#000" opacity=".12"/><path d="M-50 22Q-40-70 0-30M10-30Q50-70 56 22" fill="none" stroke="#c9b580" stroke-width="10"/>` +
    `${tx(2, 78, 22, 'I', '#3a2a2a')}<path d="M2 92c-14-14-24 2-12 12l12 12 12-12c12-10 2-26-12-12Z" fill="#e0182f"/>${tx(2, 150, 19, 'THREAD', '#3a2a2a')}${tx(2, 174, 19, 'COUNT', '#3a2a2a')}</g>`;
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([-76, 26, 20], [-128, 120, 16], [-150, 30, 12])}<path d="${TM}"/><ellipse cy="176" rx="60" ry="46"/><path d="M-60 236H60V330H-60Z" fill="#3a5a8a"/><path d="M-60 236H60V252H-60Z" fill="#2a2a34"/>${at(-152, 6, 1.2, 0, '<path d="M-12-6Q-12-16 0-16H8V-36Q14-40 16-32V-8Q14 18 0 18Q-12 18-12 8Z"/>')}</g>` +
    `${mmarks(SH, 0.2)}<path d="M-30 60q8 6 14 0M10 62q8 6 14 0M-10 78q8 6 16 0" stroke="#a8823e" stroke-width="2.500" fill="none" stroke-linecap="round"/>${gloss('M-74 30q-6 20 2 40M-40 30q14-8 28 0')}` +
    `${tote}<g filter="url(#${k}f)" fill="${S}">${limb([76, 26, 20], [156, 100, 16], [100, 150, 13])}${hand(94, 154, 80, SH, 1.2)}</g>` + hd(0, HY, HS, -4, DALE);
  const chip = (x: number, y: number, w: number, s: string): string => `<rect x="${x}" y="${y}" width="${w}" height="30" rx="15" fill="#fff" opacity=".2"/><text x="${x + w / 2}" y="${y + 20}" font-size="15" fill="#fff" ${SANS} font-weight="700" text-anchor="middle">${s}</text>`;
  return frame(k, '#fff2c8',
    lg(`${k}p`, '#7ab8d8', '#e8d8b0') + lg(`${k}d`, '#000', '#000') + `<linearGradient id="${k}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></linearGradient><clipPath id="${k}c"><rect x="18" y="92" width="564" height="596" rx="26"/></clipPath>`,
    `<rect width="600" height="800" fill="#fff"/><text x="34" y="34" font-size="17" fill="#222" ${SANS} font-weight="700">22:15</text><rect x="520" y="20" width="40" height="17" rx="4" fill="none" stroke="#222" stroke-width="2"/><rect x="523" y="23" width="22" height="11" rx="2" fill="#222"/>` +
    `<path d="M282 50l12-7 12 7v14l-12 7-12-7Z" fill="#f5b800"/>${tx(346, 68, 30, 'hivr', '#f5b800', 'text-anchor="start"').replace('text-anchor="middle" ', '')}<path d="M36 52h30M36 62h30M36 72h30" stroke="#999" stroke-width="3.500" stroke-linecap="round"/>` +
    `<g clip-path="url(#${k}c)"><rect x="18" y="92" width="564" height="596" fill="url(#${k}p)"/><rect x="18" y="470" width="564" height="220" fill="#8a6a4a"/>` +
    // bare mattress behind him
    `<rect x="330" y="380" width="260" height="130" rx="16" fill="#e8e4dc"/><path d="M340 410h240M340 440h240M340 470h240" stroke="#c4c0d0" stroke-width="2" stroke-dasharray="2 14"/><rect x="330" y="496" width="260" height="60" fill="#5a4636"/><rect x="40" y="130" width="120" height="150" fill="#f4ecd8" stroke="#5a4636" stroke-width="6"/>${tx(100, 190, 17, 'LIVE', '#5a4636')}${tx(100, 214, 17, 'LAUGH', '#5a4636')}${tx(100, 238, 17, 'LINEN', '#e0182f')}` +
    `${at(262, 262, 1.02, 0, fig)}<rect x="18" y="470" width="564" height="220" fill="url(#${k}s)"/>` +
    `<text x="44" y="590" font-size="38" fill="#fff" ${SANS} font-weight="700">Dale, 36</text><circle cx="222" cy="577" r="13" fill="#3a9af0"/><path d="M215 577l5 5 9-10" stroke="#fff" stroke-width="3.500" fill="none"/>` +
    `${chip(44, 606, 136, '2 miles away')}${chip(190, 606, 176, 'Brings own sheets')}<text x="44" y="668" font-size="17" fill="#fff" ${SANS} font-style="italic">“600 thread count. Non-negotiable. I'll make the bed.”</text></g>` +
    `<circle cx="180" cy="744" r="34" fill="#fff" stroke="#ddd" stroke-width="3"/><path d="M166 730l28 28M194 730l-28 28" stroke="#e0556a" stroke-width="7" stroke-linecap="round"/><circle cx="300" cy="744" r="26" fill="#fff" stroke="#ddd" stroke-width="3"/>${stars([[300, 744, 16]], '#3a9af0')}<circle cx="420" cy="744" r="34" fill="#f5b800"/><path d="M420 760c-22-18-22-34-10-34q7 0 10 8q3-8 10-8c12 0 12 16-10 34Z" fill="#fff"/>`, 0.12);
}

// ---------- hp_c2_cass2 — satin slip + studio cans at the Coop ----------
function cass2(): string {
  const k = 'hp_c2_cass2';
  const S = CASS.sk, G = '#ffcc1e', GD = '#d99a06';
  const slip =
    `<path d="M-60 66Q0 96 60 66C62 92 42 118 38 146C40 176 80 194 84 240L92 336Q0 356-92 336L-84 240C-80 194-40 176-38 146C-42 118-62 92-60 66Z" fill="${G}"/>${bra(G, '#fff4c0')}` +
    `<path d="M-92 336Q0 356 92 336" stroke="#fff4c0" stroke-width="5" stroke-dasharray="1 7" stroke-linecap="round" fill="none"/>` +
    `<path d="M-30 150Q-50 220-40 320M20 130Q50 200 30 330M-10 250q6 40 0 80" stroke="${GD}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>`;
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([-62, 24, 17], [-120, 120, 14], [-150, 226, 11])}${hand(-152, 240, 10, CASS.sh, 1.1)}<path d="${TF}"/>${BUST}` +
    `${limb([-41, 250, 42], [-14, 440, 27], [-10, 600, 16])}${limb([41, 250, 42], [34, 440, 27], [50, 600, 16])}${slip}</g>${marks(CASS.sh)}` +
    tat('M-58 18l-8 12h8l-6 12M-48 14q6 6 0 14M-42 10q10 10 0 22') +
    `<g filter="url(#${k}f)" fill="${S}">${limb([62, 24, 17], [130, 60, 14], [88, -40, 11])}${hand(78, -52, -150, CASS.sh, 1.1)}</g>` + hd(6, HY, HS, 7, CASS);
  const bulbs = [[30, 62], [96, 92], [168, 104], [240, 96], [318, 72], [392, 60], [462, 78], [530, 108], [584, 120]];
  const chicken =
    `<g transform="translate(64 524)"><path d="M-20 30Q-40-10-14-40Q-20-70 6-70Q30-66 22-40Q44-10 26 30Z" fill="#ffd21e"/><path d="M-2-72q-6-16 4-14q2-10 10-2q8-2 4 14Z" fill="#e0182f"/><path d="M22-52l18 6-16 6Z" fill="#f07818"/><circle cx="12" cy="-54" r="3.500" fill="#1a1010"/><path d="M-22-56C-26-96 30-96 26-56" fill="none" stroke="#1c1c26" stroke-width="5"/><rect x="-28" y="-62" width="11" height="20" rx="5" fill="#f07818"/><path d="M-10 30v14M12 30v14" stroke="#f07818" stroke-width="5"/></g>`;
  const desk =
    `<path d="M0 560L600 540V800H0Z" fill="#1c1830"/><path d="M0 560L600 540V566L0 588Z" fill="#3a3460"/>` +
    [0, 1, 2, 3, 4, 5].map((i) => `<rect x="${420 + i * 28}" y="${612 - i}" width="6" height="110" rx="3" fill="#0c0a18"/><rect x="${414 + i * 28}" y="${640 + ((i * 37) % 60)}" width="18" height="12" rx="3" fill="${i % 2 ? '#f07818' : '#e8e4f0'}"/><circle cx="${423 + i * 28}" cy="${594 - i}" r="6" fill="${i === 2 ? '#e0182f' : '#58e0c0'}"/>`).join('') +
    `<rect x="20" y="620" width="150" height="56" rx="6" fill="#0c0a18"/><path d="M34 664A60 60 0 0 1 86 632" fill="none" stroke="#58e0c0" stroke-width="3"/><path d="M40 664L88 630" stroke="#e0182f" stroke-width="3"/><path d="M104 664A60 60 0 0 1 156 632" fill="none" stroke="#58e0c0" stroke-width="3"/><path d="M110 664L160 634" stroke="#e0182f" stroke-width="3"/>`;
  return frame(k, '#ffb060',
    lg(`${k}w`, '#4a3aa0', '#160c30') + glow(`${k}b`, '#ffd890', 0.9) + glow(`${k}o`, '#ff2a3a', 0.7) + glow(`${k}h`, '#ff9a4a', 0.5),
    `<rect width="600" height="800" fill="url(#${k}w)"/>` +
    // egg-crate foam + sign
    
    `<circle cx="112" cy="240" r="140" fill="url(#${k}o)"/><rect x="26" y="206" width="170" height="68" rx="10" fill="#2a0810" stroke="#ff2a3a" stroke-width="4"/>${tx(111, 254, 40, 'ON AIR', '#ff6a6a', 'textLength="140"')}` +
    `<path d="M0 40Q100 110 240 92Q380 50 470 76Q560 110 600 120" fill="none" stroke="#0c0a18" stroke-width="2.500"/>${bulbs.map(([x, y]) => `<circle cx="${x}" cy="${y + 8}" r="26" fill="url(#${k}b)"/><circle cx="${x}" cy="${y + 8}" r="6" fill="#fff4d0"/>`).join('')}` +
    `${desk}${chicken}` +
    // boom mic pointing at her, live
    `<path d="M600 330L500 420" stroke="#0c0a18" stroke-width="8" stroke-linecap="round"/><rect x="440" y="402" width="74" height="40" rx="20" fill="#2a2a3a" transform="rotate(-38 477 422)"/><path d="M448 424l22-18" stroke="#8a8aa0" stroke-width="3"/>` +
    `<ellipse cx="300" cy="440" rx="220" ry="330" fill="url(#${k}h)"/>${at(292, 262, 1.28, 5, fig)}` +
    // speech from the mixing desk
    `<rect x="20" y="700" width="210" height="60" rx="10" fill="#fff" transform="rotate(-3 125 730)"/>${at(125, 730, 1, -3, tx(0, -4, 15, 'MIC IS LIVE, CASS', '#e0182f') + tx(0, 16, 13, '— 3 listeners (hi mom)', '#3a2a4a'))}`);
}

// ---------- hp_c2_moth — Mothwing's fan photo ----------
function moth(): string {
  const k = 'hp_c2_moth';
  const S = '#e4d2c4', SH = '#8a7a86';
  const wing = '<path d="M-30-6C-70-60-150-50-140 4C-134 40-80 36-34 14C-70 40-104 70-84 96C-60 112-36 60-30 22Z" fill="#b08a56" stroke="#5a4028" stroke-width="3"/><circle cx="-100" cy="-8" r="15" fill="#2a1c2a"/><circle cx="-100" cy="-8" r="6" fill="#e9a23a"/><path d="M-60-30l-40 10M-50 40l-26 30" stroke="#5a4028" stroke-width="2" stroke-dasharray="5 4"/>';
  const mask =
    `<g transform="translate(0 -84)">${wing}<g transform="scale(-1 1)">${wing}</g><path d="M-44-20C-44-70 44-70 44-20C44 14 30 30 0 30C-30 30-44 14-44-20Z" fill="#c9a26a" stroke="#5a4028" stroke-width="3"/>` +
    `<circle cx="-20" cy="-18" r="15" fill="#0a0a10"/><circle cx="20" cy="-18" r="15" fill="#0a0a10"/><circle cx="-24" cy="-23" r="4" fill="#6af0d0"/><circle cx="16" cy="-23" r="4" fill="#6af0d0"/>` +
    `<path d="M-14-58C-30-110-60-120-70-96M14-58C30-110 60-120 70-96" fill="none" stroke="#3a2a1c" stroke-width="5" stroke-linecap="round"/><path d="M-24-84l-12-4M-34-98l-12 0M-48-108l-8 6M24-84l12-4M34-98l12 0M48-108l8 6" stroke="#3a2a1c" stroke-width="3" stroke-linecap="round"/>` +
    `<rect x="-58" y="-34" width="26" height="12" fill="#c8ccd0" transform="rotate(-20 -45 -28)"/><rect x="34" y="6" width="26" height="12" fill="#c8ccd0" transform="rotate(30 47 12)"/><path d="M-6 6h12" stroke="#5a4028" stroke-width="3" stroke-linecap="round"/></g>`;
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([-58, 24, 14], [-84, 130, 11], [-22, 196, 9])}${limb([58, 24, 14], [84, 130, 11], [22, 196, 9])}<path transform="scale(.8 1)" d="${TM}"/>` +
    `<path d="M-46 232H46V330H-46Z" fill="#2c7a78"/><path d="M-46 232H46V246H-46Z" fill="#e8e4dc"/><circle cy="204" r="26"/></g>` +
    `${mmarks(SH, 0)}<path d="M-34 104q14 6 26 0M-32 124q13 6 24 0M34 104q-14 6-26 0M32 124q-13 6-24 0" stroke="${SH}" stroke-width="2" fill="none" opacity=".7"/>` +
    tat('M0 52v22M0 56c-10-14-30-10-26 2c2 8 16 6 26 2c10 4 24 6 26-2c4-12-16-16-26-2M0 64c-8 4-12 12-6 14M0 64c8 4 12 12 6 14', '#1c3a40', 2.4) +
    `<g fill="#f4e9d0" opacity=".9"><path d="M-20 262l6-4 6 4-6 4ZM16 290l6-4 6 4-6 4ZM-30 306l6-4 6 4-6 4Z"/></g>` +
    // candle
    `<rect x="-11" y="150" width="22" height="64" fill="#f4ecd8"/><path d="M-11 160q6 14 0 26M11 170q-5 10 0 20" stroke="#d8ccb0" stroke-width="3" fill="none"/><path d="M0 150C-12 132 0 122 0 108C8 122 12 134 0 150Z" fill="#ffc23a"/><path d="M0 150C-5 140 0 134 0 128C4 136 5 142 0 150Z" fill="#fff"/>` +
    `<g fill="${S}"><circle cx="-16" cy="206" r="13"/><circle cx="16" cy="206" r="13"/></g>` +
    // chin + the smile
    `<path d="M-30-60Q-30-22 0-22Q30-22 30-60Z" fill="${S}"/><path d="M-19-50Q0-40 19-50Q14-30 0-30Q-14-30-19-50Z" fill="#f4fff8" stroke="#0b2a26" stroke-width="2"/><path d="M-15-43Q0-36 15-43" fill="none" stroke="#0b2a26" stroke-width="1"/>${mask}`;
  const mo = (x: number, y: number, r: number): string => `<path transform="translate(${x} ${y}) rotate(${r})" d="M0 0C-8-12-20-8-16 2C-12 8-4 6 0 2C4 6 12 8 16 2C20-8 8-12 0 0Z" fill="#e8dcc0"/>`;
  return frame(k, '#6af0d0',
    lg(`${k}w`, '#16303a', '#06080e') + glow(`${k}c`, '#ffb040', 0.75) + glow(`${k}z`, '#a070ff', 0.9),
    `<rect width="600" height="800" fill="url(#${k}w)"/>` +
    // shrine to the show
    `<rect x="24" y="110" width="170" height="200" fill="#f0e8d4" transform="rotate(-4 109 210)"/>${at(109, 210, 1, -4, tx(0, -52, 40, '104.3', '#16303a') + tx(0, -22, 15, 'THE LONG QUIET', '#16303a') + '<path d="M0 60c-30-26-52-2-30 22l30 28 30-28c22-24 0-48-30-22Z" fill="#e0182f"/>' + tx(0, 78, 13, 'CALLER #1', '#fff'))}` +
    `<path d="M150 150L420 96M190 290L440 330" stroke="#e0182f" stroke-width="2.500"/>` +
    `<circle cx="490" cy="130" r="120" fill="url(#${k}z)"/><rect x="462" y="60" width="56" height="130" rx="8" fill="#1c1c2a" stroke="#a070ff" stroke-width="3"/><path d="M474 76v98M490 76v98M506 76v98" stroke="#c8a8ff" stroke-width="3"/><path d="M490 20v40" stroke="#1c1c2a" stroke-width="4"/>${mo(440, 96, 20)}${mo(540, 150, -30)}${mo(430, 190, 60)}${mo(550, 60, 10)}` +
    `<rect x="400" y="290" width="170" height="110" fill="#ffe680" transform="rotate(5 485 345)"/>${at(485, 345, 1, 5, `<g ${HAND} font-size="15" fill="#3a2a1c" text-anchor="middle"><text y="-22">Kevin — dinner at 6.</text><text y="4">Put a shirt on.</text><text y="32">Love, Mom ♥</text></g>`)}` +
    `<ellipse cx="300" cy="520" rx="330" ry="330" fill="url(#${k}c)"/>${at(300, 330, 1.42, 0, fig)}${mo(210, 560, -20)}${mo(380, 500, 30)}` +
    `${tx(300, 770, 19, '“i am drawn to your signal”', '#6af0d0', 'font-style="italic"')}`, 0.75);
}

// ---------- hp_c4_mags2 — staff hot tub at -19 ----------
function mags2(): string {
  const k = 'hp_c4_mags2';
  const S = MAGS.sk, HV = '#d6f020', OR = '#ff7a1c';
  const M2: Face = {
    ...MAGS,
    mouth: '<path d="M87 112Q100 108 113 112Q114 124 100 125Q86 124 87 112Z" fill="#6a8ae0" stroke="#3a4a9a" stroke-width="1.500"/><path d="M90 115l3 5 3-5 4 5 4-5 3 5 3-5v-2H90Z" fill="#fff" stroke="none"/><path d="M78 122l-6 3M79 128l-6 1M122 122l6 3M121 128l6 1" stroke="#cfe6ff" stroke-width="1.600"/>',
    front: MAGS.front + '<path d="M97 110a3.600 3.600 0 0 0 7.200 0" fill="none" stroke="#f4f6fa" stroke-width="1.800"/><path d="M54 128l3 16 3-14M142 126l3 18 3-16" fill="#cfe6ff"/><path d="M78 80h16M106 80h16" stroke="#e8f4ff" stroke-width="2" stroke-dasharray="2 2"/>' +
      '<g transform="translate(100 2)"><rect x="-13" y="-34" width="26" height="42" rx="4" fill="#d8dce4"/><rect x="-13" y="-22" width="26" height="18" fill="#2a5ac8"/><text y="-9" font-size="8" fill="#fff" font-family="Helvetica, Arial, sans-serif" font-weight="700" text-anchor="middle">BEER</text><path d="M-13-34q13-8 26 0q-13 6-26 0Z" fill="#b8bcc8"/><path d="M-11 6l3 12 4-10 4 14 4-12 4 10 3-12" fill="#e8f4ff"/></g>',
  };
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([-62, 24, 17], [-150, 128, 14], [-236, 112, 11])}${hand(-250, 110, 95, MAGS.sh)}<path d="${TF}"/>${BUST}${tri(HV, OR)}` +
    `<path d="M-52 62l24 34M-46 84l30 22M52 62l-24 34M46 84l-30 22" stroke="#eef2f6" stroke-width="5"/><path d="M-80 222Q-40 240 0 240Q40 240 80 222L82 262H-82Z" fill="${HV}" stroke="${OR}" stroke-width="3"/><path d="M-80 222q-16-8-22 6M-80 224q-14 6-12 20M80 222q16-8 22 6M80 224q14 6 12 20" stroke="${OR}" stroke-width="3.500" fill="none" stroke-linecap="round"/></g>` +
    `${marks(MAGS.sh)}${navel}${tat('M44 16l0 22M33 27l22 0M36 19l16 16M52 19l-16 16', '#bfe6ff', 2.4)}` +
    // goosebumps
    `<path d="M-60 30h.1M-52 44h.1M-66 52h.1M-44 34h.1M60 34h.1M50 46h.1M-20 140h.1M-8 152h.1M14 144h.1M24 158h.1M-28 166h.1M-96 70h.1M-108 88h.1M100 60h.1" stroke="#c89a78" stroke-width="3.500" stroke-linecap="round"/>` +
    `<g filter="url(#${k}f)" fill="${S}">${limb([62, 24, 17], [144, 112, 14], [160, 4, 11])}</g>` +
    `<g transform="translate(164 -26) rotate(10)"><rect x="-15" y="-30" width="30" height="50" rx="4" fill="#d8dce4"/><rect x="-15" y="-16" width="30" height="22" fill="#2a5ac8"/><path d="M-15 20l4 16 5-12 5 18 5-14 5 12 6-20" fill="#e8f4ff"/></g>${at(160, -8, 1.1, 100, `<g fill="${S}"><rect x="-10" y="-20" width="12" height="34" rx="6"/><rect x="-10" y="-22" width="34" height="11" rx="5"/><rect x="-10" y="-9" width="34" height="11" rx="5"/><rect x="-10" y="4" width="32" height="11" rx="5"/></g>`)}` +
    hd(0, HY, HS, -3, M2);
  return frame(k, '#ffb040',
    lg(`${k}s`, '#0c1838', '#2a4a7a') + lg(`${k}t`, '#3ad0c8', '#0c5a70') + glow(`${k}h`, '#fff4c0', 0.9) + glow(`${k}g`, '#ff9a3a', 0.5) + glow(`${k}st`, '#fff', 0.4) +
    `<pattern id="${k}sn" width="150" height="170" patternUnits="userSpaceOnUse"><g fill="#fff"><circle cx="20" cy="30" r="3"/><circle cx="90" cy="12" r="2"/><circle cx="130" cy="70" r="3.500"/><circle cx="60" cy="96" r="2.500"/><circle cx="12" cy="130" r="2"/><circle cx="104" cy="150" r="3"/></g></pattern>`,
    `<rect width="600" height="800" fill="url(#${k}s)"/><path d="M0 330L60 180L110 320L170 150L240 330Z" fill="#0a1a2a"/><path d="M0 300Q300 250 600 310V560H0Z" fill="#cfe0f4"/>` +
    // the snowcat
    `<g transform="translate(446 232)"><circle cx="-150" cy="-10" r="120" fill="url(#${k}h)" opacity=".6"/><path d="M-110 20H140V70H-110Z" fill="#1a1a22"/><path d="M-120 44a26 26 0 0 1 26-26H130a26 26 0 0 1 0 52H-94a26 26 0 0 1-26-26Z" fill="#2a2a34"/><path d="M-96 44h230" stroke="#555" stroke-width="10" stroke-dasharray="8 12"/><path d="M-96-40H120L136 20H-110Z" fill="${OR}"/><path d="M-60-110H60L84-40H-76Z" fill="#e8601a"/><path d="M-48-98H50L66-48H-58Z" fill="#9ad0f0"/><path d="M-140 10L-96-30V24Z" fill="#888"/><circle cx="-92" cy="-16" r="9" fill="#fff4c0"/>${tx(30, 2, 26, 'SP-01', '#fff')}</g>` +
    `<rect x="18" y="330" width="150" height="104" rx="6" fill="#f4f0e0" stroke="#b3261e" stroke-width="5"/>${tx(93, 358, 15, 'STAFF HOT TUB', '#b3261e')}${tx(93, 382, 13, 'NO GLASS', '#222')}${tx(93, 402, 13, 'NO GUESTS', '#222')}${tx(93, 422, 13, 'NO KESSLER', '#222')}` +
    `<circle cx="540" cy="420" r="30" fill="#fff"/><circle cx="540" cy="420" r="30" fill="none" stroke="#b3261e" stroke-width="4"/>${tx(540, 427, 19, '-19°', '#1c3a8a')}` +
    // tub
    `<ellipse cx="300" cy="560" rx="340" ry="130" fill="#6a4426"/><ellipse cx="300" cy="566" rx="306" ry="106" fill="url(#${k}t)"/><ellipse cx="300" cy="500" rx="200" ry="220" fill="url(#${k}g)"/>` +
    `${at(300, 300, 1.3, 0, fig)}` +
    `<path d="M0 604Q150 590 300 606Q450 590 600 604V800H0Z" fill="#1a8a96" opacity=".8"/><path d="M150 612q30-10 60 0M380 616q40-10 80 0M240 650q40-8 80 0" stroke="#bff" stroke-width="3" fill="none" opacity=".6"/>` +
    `<path d="M0 690Q300 760 600 690V800H0Z" fill="#7a4e2a"/><path d="M60 706V800M160 722V800M270 730V800M380 728V800M480 716V800M560 700V800" stroke="#4a2c14" stroke-width="4"/><path d="M0 690Q300 760 600 690" fill="none" stroke="#fff" stroke-width="14"/>` +
    `<g fill="url(#${k}st)"><ellipse cx="110" cy="520" rx="90" ry="110"/><ellipse cx="490" cy="500" rx="100" ry="130"/><ellipse cx="250" cy="640" rx="120" ry="70"/><ellipse cx="420" cy="380" rx="60" ry="110"/></g>` +
    `<rect width="600" height="800" fill="url(#${k}sn)"/><rect width="600" height="800" fill="url(#${k}sn)" transform="translate(70 90) scale(.7)" opacity=".7"/>`);
}

// ---------- hp_c4_wes — karaoke night at Rooster's ----------
function wes(): string {
  const k = 'hp_c4_wes';
  const S = WES.sk, SH = WES.sh, J = '#3a5a9a';
  const boot = (m: number): string =>
    `<g transform="translate(${m * 96} 540) scale(${m} 1)"><path d="M-26-30H26L30 60H70Q84 62 84 84V96H-30Z" fill="#e8e4dc"/><path d="M-30 96H84V108H-30Z" fill="#1a1a22"/><path d="M-26-30H26L27-6H-27Z" fill="#ff7a1c"/><path d="M-28 14H30M-29 40H32" stroke="#ff7a1c" stroke-width="9"/><rect x="14" y="8" width="20" height="12" fill="#888"/><rect x="16" y="34" width="20" height="12" fill="#888"/></g>`;
  const fig =
    `<g filter="url(#${k}f)" fill="${J}">${limb([-34, 262, 36], [-76, 410, 28], [-96, 520, 24])}${limb([34, 262, 36], [76, 410, 28], [96, 520, 24])}${boot(-1)}${boot(1)}</g>` +
    `<g filter="url(#${k}f)" fill="${S}">${limb([76, 26, 20], [150, -30, 17], [176, -150, 13])}${hand(180, -172, 0, SH, 1.2)}<path d="${TM}"/><ellipse cy="182" rx="66" ry="56"/>` +
    `<path d="M-64 224Q0 262 64 224L70 262Q0 300-70 262Z" fill="url(#${k}pl)"/><path d="M-20 252l-34 90 40-10 14-70ZM10 256l4 100 36-20-10-80Z" fill="url(#${k}pl)"/><circle cx="-4" cy="256" r="15" fill="#8a1c1a"/></g>` +
    `${mmarks(SH, 0)}<path d="M-34 50q9 7 16 0M-12 58q9 7 16 0M12 50q9 7 16 0M-24 72q9 7 16 0M4 74q9 7 16 0M-6 96q7 6 13 0M-4 150q6 5 11 0" stroke="#5a3e28" stroke-width="2.600" fill="none" stroke-linecap="round"/>` +
    tat('M106 2l8 10M116-6l8 10M126-14l8 10M112 6l4-8M122-2l4-8M132-10l4-8M104 8L140-20', '#1c2a3a', 2.6) + tat('M-52 150h30l6 10h-42ZM-48 150v-10h16l4 10M-56 164h44', '#1c2a3a') +
    `<g filter="url(#${k}f)" fill="${S}">${limb([-76, 26, 20], [-136, 112, 17], [-58, 60, 13])}${hand(-44, 50, -70, SH, 1.2)}</g>` +
    `<rect x="-52" y="-6" width="16" height="56" rx="7" fill="#1a1a22" transform="rotate(-24 -44 22)"/><circle cx="-30" cy="-10" r="15" fill="#8a8a98"/><path d="M-40-18l20 16M-42-8l22 8" stroke="#555" stroke-width="2"/>` +
    hd(0, HY, HS, -8, WES);
  const gal = (x: number, y: number, hair: string, s: number, extra = ''): string =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-60 0L-76-150M60 0L84-140" stroke="#2a1040" stroke-width="22" stroke-linecap="round"/><path d="M-80 200Q-80 40 0 40Q80 40 80 200Z" fill="#2a1040"/><circle r="46" fill="${hair}"/><path d="M-80 200Q-80 40 0 40" fill="none" stroke="#ff4ab0" stroke-width="4" opacity=".8"/>${extra}</g>`;
  return frame(k, '#58e0c0',
    lg(`${k}w`, '#5a1050', '#14061e') + glow(`${k}m`, '#ff3aa8', 0.7) + glow(`${k}t`, '#3af0d0', 0.6) +
    `<pattern id="${k}pl" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#c8302c"/><path d="M0 6h24M6 0v24" stroke="#5a1010" stroke-width="6"/><path d="M0 18h24M18 0v24" stroke="#f0d0a0" stroke-width="1.500" opacity=".6"/></pattern>`,
    `<rect width="600" height="800" fill="url(#${k}w)"/><path d="M120 0L-40 640H260Z" fill="#ff3aa8" opacity=".25"/><path d="M470 0L330 640H640Z" fill="#3af0d0" opacity=".22"/>` +
    // lyric screen + neon rooster
    `<rect x="26" y="100" width="210" height="126" rx="8" fill="#0a0a2a" stroke="#888" stroke-width="5"/>${tx(131, 140, 15, '♪ SHE LEFT ME FOR', '#fff')}${tx(131, 166, 17, 'A SNOWBOARDER', '#ffe040')}${tx(131, 192, 15, '(AGAIN) ♪', '#fff')}<rect x="50" y="204" width="160" height="6" fill="#333"/><rect x="50" y="204" width="96" height="6" fill="#ffe040"/>` +
    `<circle cx="131" cy="50" r="110" fill="url(#${k}m)"/>${tx(131, 56, 34, 'ROOSTER’S', '#ff9ad8', 'textLength="190"')}${tx(131, 82, 13, 'KARAOKE • $2 BEERS', '#3af0d0')}` +
    `<path d="M0 640H600V800H0Z" fill="#241030"/><path d="M0 640H600" stroke="#ff3aa8" stroke-width="5"/><ellipse cx="300" cy="652" rx="200" ry="20" fill="#000" opacity=".5"/>` +
    `<ellipse cx="300" cy="380" rx="250" ry="330" fill="url(#${k}t)" opacity=".5"/>${at(300, 232, 0.8, 0, fig)}` +
    // dollar bills
    [[150, 420, 20], [470, 360, -30], [430, 560, 14], [130, 590, -16], [520, 250, 40]].map(([x, y, r]) => `<rect x="${x - 22}" y="${y - 10}" width="44" height="20" rx="2" fill="#7ac87a" stroke="#2a6a3a" stroke-width="2" transform="rotate(${r} ${x} ${y})"/>`).join('') +
    // the bachelorette party
    gal(40, 640, '#e8c060', 0.8) + gal(160, 668, '#3a1c14', 0.9, `<path d="M-40-30Q0-90 40-30L60 120H-60Z" fill="#fff" opacity=".6"/><path d="M-26-40l8-20 8 14 10-22 10 22 8-14 8 20Z" fill="#ffe040"/><path d="M-70 80L50 190h30L-56 70Z" fill="#fff"/>${at(4, 132, 1, 42, tx(0, 6, 17, 'BRIDE', '#ff3aa8'))}`) +
    gal(470, 660, '#c84a2a', 0.86, '<rect x="70" y="-180" width="30" height="50" rx="5" fill="#111"/><rect x="74" y="-176" width="22" height="42" fill="#bff"/>') + gal(580, 640, '#1a1014', 0.8) +
    `<rect x="250" y="700" width="150" height="78" rx="4" fill="#fff" transform="rotate(-6 325 739)"/>${at(325, 739, 1, -6, tx(0, -8, 17, 'TAKE IT OFF', '#e0182f') + tx(0, 16, 13, '(the boots)', '#222'))}`);
}

// ---------- hp_c5_nadia2 — sheer robe, red wine, tarot card ----------
function nadia2(): string {
  const k = 'hp_c5_nadia2';
  const S = NADIA.sk, B = '#14080e', RB = '#0a0410';
  const N2: Face = { ...NADIA, front: NADIA.front + SEPTUM };
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([62, 24, 17], [136, -44, 14], [112, -160, 11])}${hand(110, -178, 0, NADIA.sh, 1.1)}<path d="${TF}"/>${BUST}` +
    `${limb([-41, 250, 42], [-10, 430, 27], [-6, 600, 16])}${limb([41, 250, 42], [40, 430, 27], [52, 600, 16])}${bra(B, '#d04a78')}${brief(B, '#d04a78')}` +
    `<path d="M-60 104Q-64 150-80 214M60 104Q64 150 80 214M-22 118L-30 226M22 118L30 226" stroke="${B}" stroke-width="3" fill="none"/>` +
    `<g fill="${RB}" opacity=".5"><path d="M-30-8L-78 10L-150 420H-58Q-36 240-50 150Q-66 90-46 44Z"/><path d="M92 52L150 420H60Q38 240 50 150Q64 110 62 78Z"/>${limb([62, 24, 23], [136, -44, 20])}<path d="M150-50L170 150Q130 90 110 0Z"/></g>` +
    `<path d="M-46 44Q-66 90-50 150Q-36 240-58 420M62 78Q64 110 50 150Q38 240 60 420" stroke="#d04a78" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round" fill="none"/></g>` +
    `${marks(NADIA.sh)}${navel}${tat('M-12 30a8 8 0 1 0 0 14a10 10 0 0 1 0-14M4 37h.1M14 37h.1M-26 37h.1', '#2a1a3a', 2.6)}${tat('M62 196q8-10 14 0q-8 4-6 12M70 190v-8M60 192l-6-6', '#2a1a3a')}` +
    `<g filter="url(#${k}f)"><g fill="${S}">${limb([-62, 24, 17], [-124, 104, 14], [-128, 4, 11])}</g><g fill="${RB}" opacity=".5">${limb([-62, 24, 23], [-124, 104, 20])}<path d="M-146 96Q-130 180-90 200L-104 100Z"/></g></g>` +
    // wine glass
    `<g transform="translate(-134 -40) rotate(-8)"><path d="M-24-50H24Q28 0 0 8Q-28 0-24-50Z" fill="#fff" opacity=".25"/><path d="M-23-28H23Q24 0 0 8Q-24 0-23-28Z" fill="#8a0c24"/><path d="M0 8V40M-16 42H16" stroke="#e8e8f0" stroke-width="3.500"/><path d="M-16-44v30" stroke="#fff" stroke-width="3" opacity=".6"/></g>${at(-126, 0, 1.1, -10, `<g fill="${S}"><circle r="13"/><rect x="-14" y="-12" width="26" height="10" rx="5"/></g>`)}` +
    hd(0, HY, HS, -6, N2) +
    // the card in her teeth
    `<g transform="translate(-6 -24) rotate(14)"><rect x="-28" y="0" width="56" height="88" rx="5" fill="#f4ecd8" stroke="#2a1a3a" stroke-width="3"/><rect x="-21" y="8" width="42" height="54" fill="#2a1a3a"/><path d="M0 46c-14-12-20 0-10 8l10 8 10-8c10-8 4-20-10-8Z" fill="#e0182f"/><circle cx="-8" cy="22" r="6" fill="#ffd24a"/><circle cx="8" cy="22" r="6" fill="#ffd24a"/>${tx(0, 78, 8.500, 'THE LOVERS', '#2a1a3a')}</g>`;
  const cat =
    `<g transform="translate(60 606)"><path d="M-40 60Q-50-10-10-20Q30-10 24 60Z" fill="#0c0810"/><circle cx="-6" cy="-34" r="28" fill="#0c0810"/><path d="M-30-48l-2-30 22 16ZM18-48l4-30-22 16Z" fill="#0c0810"/><ellipse cx="-16" cy="-36" rx="5" ry="7" fill="#d8f040"/><ellipse cx="6" cy="-36" rx="5" ry="7" fill="#d8f040"/><path d="M-16-42v12M6-42v12" stroke="#0c0810" stroke-width="2"/><path d="M20 20Q50 10 62 28" stroke="#0c0810" stroke-width="13" stroke-linecap="round" fill="none"/></g>`;
  return frame(k, '#ff8fb0',
    lg(`${k}w`, '#7a1030', '#1c0614') + glow(`${k}l`, '#ff3a4a', 0.85) + glow(`${k}b`, '#c8a8ff', 0.9) + glow(`${k}h`, '#ff5a7a', 0.6),
    `<rect width="600" height="800" fill="url(#${k}w)"/><circle cx="470" cy="230" r="230" fill="url(#${k}l)"/>` +
    `${tx(130, 110, 44, 'PSYCH', '#ff9ad0', 'textLength="150"')}<text x="210" y="110" font-size="44" fill="#5a2a4a" ${SANS} font-weight="700">IC</text>${tx(140, 140, 15, 'READINGS $5 • NO REFUNDS', '#c8a8ff')}` +
    `<path d="M506 0H560V800H506Z" fill="#3a1420"/><path d="M506 0H518V800H506Z" fill="#5a2434"/>` +
    // table: cat shoving the crystal ball
    `<path d="M0 660H250V800H0Z" fill="#2a0c1a"/><path d="M0 646H262V668H0Z" fill="#5a1c34"/>${cat}<circle cx="150" cy="618" r="60" fill="url(#${k}b)"/><circle cx="150" cy="614" r="32" fill="#c8a8ff" opacity=".7"/><circle cx="140" cy="604" r="9" fill="#fff" opacity=".7"/><path d="M190 590l16-8M194 606l18 0M186 574l10-14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>` +
    `<g stroke="#2a1a3a" stroke-width="2" fill="#f4ecd8"><rect x="14" y="690" width="34" height="52" rx="3" transform="rotate(-14 31 716)"/><rect x="200" y="700" width="34" height="52" rx="3" transform="rotate(24 217 726)"/></g>` +
    `<ellipse cx="300" cy="430" rx="220" ry="360" fill="url(#${k}h)"/>${at(326, 262, 1.26, 3, fig)}`);
}

// ---------- hp_c5_mira — leopard, price tag still on ----------
function mira(): string {
  const k = 'hp_c5_mira';
  const S = MIRA.sk, L = `url(#${k}leo)`;
  const M2: Face = { ...MIRA, front: MIRA.front + EARS + '<circle cx="121" cy="79" r="3" fill="none" stroke="#f4f6fa" stroke-width="1.700"/>' };
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([62, 24, 17], [126, -36, 14], [66, -96, 11])}<path d="${TF}"/>${BUST}` +
    `${limb([-41, 250, 42], [-30, 430, 27], [-34, 600, 16])}${limb([41, 250, 42], [52, 430, 27], [40, 600, 16])}${bra(L, '#1a1216', false)}${brief(L, '#1a1216', false)}<path d="M-79 214q-10-14-22-4M79 214q10-14 22-4" stroke="#1a1216" stroke-width="3" fill="none"/></g>` +
    `${marks(MIRA.sh)}${navel}` +
    tat('M-66 30q-14 20-4 40q-14 14-8 34M-70 46q-12-2-14 10M-66 66q10 0 12 10M-78 90q-10 6-8 16M-62 36l8 4M-80 60l-8-2M-72 100l10 2', '#1c3a2a', 2.4) + tat('M52 222l6-10 6 10-6 10ZM58 206v-8M58 240v8', '#1c2a3a') +
    // the price tag
    `<path d="M58 62Q96 70 104 110" fill="none" stroke="#f4f6fa" stroke-width="1.800"/><g transform="translate(108 112) rotate(14)"><path d="M-18 0L0-14L18 0V66H-18Z" fill="#fff8e0" stroke="#3a2a2a" stroke-width="2"/><circle cy="-2" r="3.500" fill="#3a2a2a"/>${tx(0, 22, 11, 'FINAL', '#e0182f')}${tx(0, 35, 11, 'SALE', '#e0182f')}${tx(0, 54, 13, '$89', '#222')}</g>` +
    `<g filter="url(#${k}f)" fill="${S}">${limb([-62, 24, 17], [-114, 92, 14], [-96, -14, 10])}</g>${tat('M-106 20l8 2M-108 30l8 2M-110 40l8 2', '#1c3a2a')}${phone(-100, -56, -8, '#22262e', S)}` +
    hd(4, HY, HS, 6, M2);
  const jacket = (x: number): string =>
    `<g transform="translate(${x} 150)"><path d="M0-36q-8-10 0-14q8 4 0 14M-40 0L0-34L40 0" fill="none" stroke="#c8ccd0" stroke-width="4"/><path d="M-46 0L-14-12L0 10L14-12L46 0L52 190H-52Z" fill="#5279b3"/><path d="M0 10V190M-30 60h18M12 60h18" stroke="#e9c27a" stroke-width="2" stroke-dasharray="5 4"/><path d="M20 0L46 0L52 190H24Z" fill="#000" opacity=".2"/></g>`;
  return frame(k, '#ffd0c0',
    lg(`${k}w`, '#b05a5a', '#3a1424') + glow(`${k}h`, '#ffb090', 0.6) + glow(`${k}fl`, '#fff', 0.95) +
    `<pattern id="${k}leo" width="34" height="30" patternUnits="userSpaceOnUse"><rect width="34" height="30" fill="#f0a830"/><g fill="#8a4a10"><ellipse cx="9" cy="8" rx="5" ry="4"/><ellipse cx="26" cy="22" rx="5" ry="4"/></g><g fill="none" stroke="#1a1216" stroke-width="2.600"><path d="M3 8a6 6 0 0 1 10-4M15 10a6 6 0 0 1-9 4M20 22a6 6 0 0 1 10-4M32 24a6 6 0 0 1-9 4"/></g></pattern>`,
    `<rect width="600" height="800" fill="url(#${k}w)"/><rect x="0" y="100" width="600" height="14" fill="#2a1014"/><rect x="0" y="60" width="600" height="14" fill="#c8ccd0" opacity=".0"/>` +
    `${[52, 132, 212, 388, 468, 548].map(jacket).join('')}` +
    `<rect x="386" y="470" width="200" height="60" fill="#f4ecd8" transform="rotate(-3 486 500)"/>${at(486, 500, 1, -3, `<text ${HAND} font-size="17" fill="#3a2a2a" text-anchor="middle"><tspan x="0" y="-4">6 identical jackets.</tspan><tspan x="0" y="18">0 regrets.</tspan></text>`)}` +
    `<path d="M0 690H600V800H0Z" fill="#2a1014"/><path d="M420 600L440 720H580L596 600Z" fill="#ff5c8a"/><path d="M450 600q40-70 110 0" fill="none" stroke="#ffb0c8" stroke-width="5"/>${tx(508, 670, 17, 'treat yo self', '#fff', 'font-style="italic"')}` +
    `<path d="M20 720L40 640H150L170 720Z" fill="#e8d9b0"/>${tx(95, 690, 13, 'RECEIPT INSIDE', '#3a2a2a')}` +
    `<ellipse cx="300" cy="420" rx="230" ry="380" fill="url(#${k}h)"/>${at(300, 238, 1.16, -3, fig)}` +
    `<circle cx="188" cy="160" r="54" fill="url(#${k}fl)"/>${stars([[188, 160, 34]], '#fff')}` +
    `<rect x="7" y="7" width="586" height="786" fill="none" stroke="#f4f0ec" stroke-width="14"/><path d="M70 30L170 30L30 290L30 120Z" fill="#fff" opacity=".07"/>`);
}

// ---------- hp_c6_toni — beach selfie, fries under attack ----------
function toni(): string {
  const k = 'hp_c6_toni';
  const S = TONI.sk, BL = '#4ac0ff', NV = '#16306a';
  const gull = (x: number, y: number, s: number, r: number, fry = ''): string =>
    `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M-10-6Q-70-70-130-40Q-80-30-50 10ZM20-8Q70-80 140-60Q90-40 50 6Z" fill="#e8ecf4"/><path d="M-130-40l-14-4M140-60l14-6" stroke="#222" stroke-width="8" stroke-linecap="round"/><ellipse cx="6" cy="8" rx="46" ry="24" fill="#fff"/><circle cx="-40" cy="2" r="20" fill="#fff"/><circle cx="-46" cy="-4" r="4" fill="#111"/><path d="M-54-12l14 3" stroke="#111" stroke-width="3"/><path d="M-58 2L-90 12L-56 16Z" fill="#ffb020"/><path d="M44 10l34 8-30 6Z" fill="#b8c0d0"/>${fry}</g>`;
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([62, 24, 17], [140, 96, 14], [176, -6, 11])}<path d="${TF}"/>${BUST}${tri(BL, NV)}` +
    `<path d="M-80 216Q-40 236 0 236Q40 236 80 216L82 262H-82Z" fill="${NV}"/><path d="M-80 216Q-40 236 0 236Q40 236 80 216" fill="none" stroke="${BL}" stroke-width="4"/></g>` +
    `${marks(TONI.sh)}${navel}${tat('M40 22h24v14H40ZM44 36v4M60 36v4M44 26h6v5h-6ZM54 26h6v5h-6ZM38 44q14 6 28 0', '#0c1c3a', 2.2)}` +
    // fries
    `<g transform="translate(184 -44) rotate(12)"><path d="M-14-30l4 34M-4-40l2 44M8-36l-2 40M18-26l-6 30" stroke="#ffd24a" stroke-width="8" stroke-linecap="round"/><path d="M-24-4H26L18 46H-16Z" fill="#e0182f"/><path d="M-10 14h22M-8 26h18" stroke="#fff" stroke-width="4"/></g>${at(180, -4, 1.15, 20, `<g fill="${S}"><circle r="13"/><rect x="-16" y="-10" width="30" height="10" rx="5"/><rect x="-16" y="2" width="28" height="10" rx="5"/></g>`)}` +
    `<g filter="url(#${k}f)" fill="${S}">${limb([-62, 24, 17], [-140, 110, 19], [-250, 260, 30])}</g>` + hd(-4, HY, HS, -8, TONI);
  return frame(k, '#fff0c0',
    lg(`${k}s`, '#2a8af0', '#bfe8ff') + lg(`${k}o`, '#0a6ac8', '#3ad0d8') + glow(`${k}u`, '#fff8d0', 1) + glow(`${k}h`, '#fff', 0.45),
    `<rect width="600" height="800" fill="url(#${k}s)"/><circle cx="90" cy="90" r="150" fill="url(#${k}u)"/><circle cx="90" cy="90" r="44" fill="#fffbe0"/>` +
    `<rect y="330" width="600" height="130" fill="url(#${k}o)"/><path d="M0 372q60-12 120 0t120 0t120 0t120 0t120 0M0 420q80-12 160 0t160 0t160 0t160 0" stroke="#fff" stroke-width="4" fill="none" opacity=".6"/><path d="M0 450Q300 430 600 456V800H0Z" fill="#f4d890"/>` +
    // umbrella + cooler with a queue
    `<path d="M70 300V560" stroke="#8a6a3a" stroke-width="7"/><path d="M-60 330Q70 190 200 330Q166 310 136 330Q104 310 70 330Q36 310 4 330Q-30 310-60 330Z" fill="#ff5a3a"/><path d="M4 330Q30 240 70 262Q104 240 136 330Q104 310 70 330Q36 310 4 330Z" fill="#fff"/>` +
    `<rect x="470" y="520" width="130" height="90" rx="8" fill="#a9c8ea"/><rect x="462" y="500" width="146" height="30" rx="8" fill="#1c2c50"/>${tx(536, 574, 15, 'TRANSIT', '#1c2c50')}${tx(536, 594, 11, 'LOST &amp; FOUND', '#1c2c50')}${gull(520, 474, 0.42, 0)}${gull(574, 478, 0.36, 0)}` +
    `<ellipse cx="300" cy="520" rx="260" ry="330" fill="url(#${k}h)"/>${at(316, 330, 1.42, -5, fig)}` +
    `${gull(520, 196, 0.95, -18, '<path d="M-92 4l-34 30" stroke="#ffd24a" stroke-width="9" stroke-linecap="round"/>')}<path d="M440 120l-20-16M470 96l-8-24M400 160l-26-4" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>` +
    `<g ${SANS} font-weight="700" fill="#fff"><rect x="330" y="724" width="252" height="54" rx="27" fill="#e0182f"/><text x="456" y="748" font-size="15" text-anchor="middle">Send to: CHESS IN THE PARK ♟</text><text x="456" y="768" font-size="13" text-anchor="middle" opacity=".9">(not Hinge)  ✓ Delivered</text></g>`, 0.35);
}

// ---------- hp_c6_vic — oiled up by the chessboard ----------
function vic(): string {
  const k = 'hp_c6_vic';
  const S = VIC.sk, SH = VIC.sh;
  const V2: Face = { ...VIC, front: VIC.front + '<circle cx="66" cy="104" r="3" fill="#ffd24a"/>' };
  const piece = (x: number, y: number, c: string, h: number, top: string): string =>
    `<g transform="translate(${x} ${y})" fill="${c}"><path d="M-12 0H12L7-${h}H-7Z"/><ellipse rx="14" ry="5"/><circle cy="-${h + 6}" r="9"/>${top}</g>`;
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([76, 26, 22], [138, 112, 17], [196, 190, 13])}${hand(206, 200, -40, SH, 1.2)}<path d="${TM}"/>` +
    `<path d="M-56 214Q0 240 56 214L62 420H-62Z" fill="#fffdf6"/><path d="M-56 214Q0 240 56 214" fill="none" stroke="#cfc8b6" stroke-width="5"/><path d="M-4 236q-8 30 0 50M6 236q10 30 2 56M0 300V420" stroke="#cfc8b6" stroke-width="3" fill="none"/></g>` +
    `${mmarks(SH, 1)}<path d="M-34-4Q0 40 34-4" fill="none" stroke="#ffd24a" stroke-width="4" stroke-dasharray="4 2"/>` +
    tat('M-44 44q4-16 16-14q10 2 8 14l4 22h-30l8-10q-8-4-6-12M-30 38h.1', '#1c1c2a', 2.4) +
    gloss('M-66 16q12-10 28-6M30 10q20-4 34 8M-40 60q14-8 30 0M10 60q16-8 30 0M-20 112q8-4 14 0M8 112q8-4 14 0M-20 140q8-4 14 0M8 140q8-4 14 0', 6, 0.55) +
    `<g filter="url(#${k}f)" fill="${S}">${limb([-76, 26, 22], [-156, 10, 19], [-128, -96, 14])}<circle cx="-118" cy="-2" r="29"/>${hand(-124, -116, 10, SH, 1.25)}</g>${gloss('M-136-18q14-12 30-2M-150-60q4-16 12-24', 6, 0.55)}` +
    hd(0, HY, HS, 5, V2);
  const sq = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [0, 1, 2, 3].map((j) => ((i + j) % 2 ? '' : `<path d="M${i * 30} ${j * 22}h30v22h-30Z"/>`)).join('')).join('');
  return frame(k, '#ffc9d6',
    lg(`${k}w`, '#a03a6a', '#2a0c24') + glow(`${k}r`, '#fff', 0.9) + glow(`${k}h`, '#ff8ab0', 0.6),
    `<rect width="600" height="800" fill="url(#${k}w)"/>` +
    // ring light
    `<circle cx="96" cy="210" r="130" fill="url(#${k}r)" opacity=".6"/><circle cx="96" cy="210" r="56" fill="none" stroke="#fff" stroke-width="16"/><path d="M96 270V640M60 640L96 560L132 640" stroke="#1a1014" stroke-width="7" fill="none"/>` +
    `<rect x="400" y="80" width="170" height="210" fill="#1a1014" stroke="#ffd24a" stroke-width="6"/>${tx(485, 132, 22, 'BLITZ KING', '#ffd24a')}${tx(485, 160, 13, 'Halsey Park Open', '#fff')}${tx(485, 230, 60, '2ND', '#fff')}${tx(485, 262, 13, '(of 3)', '#ffd24a')}` +
    `<path d="M0 640H600V800H0Z" fill="#1c0a18"/><path d="M40 760L60 660H100L120 760Z" fill="#ffd21e"/>${tx(80, 706, 11, 'WET', '#222')}${tx(80, 720, 11, 'FLOOR', '#222')}<ellipse cx="250" cy="770" rx="110" ry="14" fill="#e8d060" opacity=".45"/>` +
    `<ellipse cx="270" cy="400" rx="240" ry="360" fill="url(#${k}h)"/>${at(262, 250, 1.2, -2, fig)}` +
    // table, board, oil
    `<path d="M330 560H600V584H330Z" fill="#5a2a1c"/><path d="M350 584H600V800H350Z" fill="#3a1810"/><g transform="translate(356 486) skewX(-16)"><rect width="240" height="88" fill="#f4ecd8"/><g fill="#3a1810">${sq}</g></g>` +
    `${piece(390, 548, '#1a1014', 34, '')}${piece(520, 520, '#fffdf6', 30, '')}${piece(566, 556, '#1a1014', 44, '<path d="M-3-70h6v8h6v6h-6v10h-6v-10h-6v-6h6Z"/>')}` +
    `${piece(478, 566, '#fffdf6', 50, '<path d="M-10-66l4 8 6-10 6 10 4-8v12h-20Z"/><path d="M-9-34Q0-22 9-34" fill="none" stroke="#ffd24a" stroke-width="3" stroke-dasharray="3 1.500"/>')}` +
    `<g transform="translate(420 440)"><rect x="-22" y="-10" width="44" height="100" rx="8" fill="#6a8a2a"/><rect x="-9" y="-36" width="18" height="28" fill="#3a5a14"/><rect x="-18" y="14" width="36" height="52" fill="#f4ecd8"/>${tx(0, 30, 8.500, 'EXTRA', '#3a5a14')}${tx(0, 42, 8.500, 'VIRGIN', '#3a5a14')}${tx(0, 54, 8.500, 'OLIVE OIL', '#3a5a14')}${tx(0, 84, 7, '3 LITRES', '#fff')}</g>`);
}

// ---------- hp_c7_bea2 — cactus society calendar shoot ----------
function bea2(): string {
  const k = 'hp_c7_bea2';
  const S = BEA.sk, P = `url(#${k}pk)`, RD = '#e8203c';
  const B2: Face = { ...BEA, lid: 0.2, front: BEA.front + '<circle cx="66" cy="104" r="3" fill="#fff"/><circle cx="134" cy="104" r="3" fill="#fff"/>' };
  const shoe = (x: number, y: number, r: number): string => `<path transform="translate(${x} ${y}) rotate(${r})" d="M-12 6Q-14-10 0-12Q14-12 16 0L50-16Q62-16 60-4L16 22Q-6 26-12 6ZM-6 4L-22 46h6L4 14Z" fill="${RD}"/>`;
  const girl =
    `<g filter="url(#${k}f)" fill="${S}">${limb([545, 492, 28], [528, 360, 19], [545, 270, 12])}${limb([575, 498, 28], [590, 372, 19], [572, 286, 12])}${shoe(545, 256, -150)}${shoe(572, 272, -160)}` +
    `${limb([462, 458, 48], [552, 496, 30])}${limb([278, 458, 50], [366, 470, 35], [450, 442, 60])}` +
    `<path d="M404 408Q450 366 500 404Q520 440 500 494Q446 510 398 478Q388 440 404 408Z" fill="${P}"/><path d="M404 408Q450 388 500 404" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="1 6" stroke-linecap="round"/><path d="M450 392q-10-12-20-4q8 8 20 4q10-12 20-4q-8 8-20 4" fill="${RD}"/>` +
    `<path d="M322 420q22 10 44 4" stroke="${P}" stroke-width="12" fill="none"/>${limb([250, 400, 19], [256, 450, 22])}<circle cx="246" cy="528" r="37"/><circle cx="306" cy="532" r="37"/>` +
    `<path d="M208 524Q244 504 276 526Q280 506 312 508Q342 514 346 536Q346 566 320 570Q290 572 276 560Q262 572 236 570Q208 564 208 524Z" fill="${P}"/><path d="M208 524Q244 504 276 526Q280 506 312 508Q342 514 346 536" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="1 6" stroke-linecap="round"/>` +
    `${limb([226, 452, 21], [186, 592, 16])}${limb([330, 462, 21], [366, 604, 16])}</g>` +
    `<path d="M276 490Q272 508 276 526" stroke="${BEA.sh}" stroke-width="2.500" fill="none"/>${gloss('M250 498q-14 4-18 14M312 500q12 2 18 12M424 408q24-14 50-2M250 436q20-10 44-4', 5, 0.5)}` +
    tat('M352 474v-22M352 466h-7v-8M352 460h7v-7M346 476h12', '#1c5a34', 2.6) +
    `<g filter="url(#${k}f)" fill="${S}">${limb([366, 604, 16], [240, 622, 12])}${hand(224, 622, 90, BEA.sh, 1.2)}${limb([186, 592, 16], [222, 440, 11])}${hand(228, 424, 20, BEA.sh, 1.1)}</g>` +
    `<rect x="214" y="614" width="16" height="9" rx="2" fill="#f0d0a0" stroke="#b08a5a" stroke-width="1"/>` + hd(250, 340, 1.22, -8, B2);
  const cactus =
    `<g transform="translate(72 318)"><circle cy="-60" r="90" fill="url(#${k}sp)"/><path d="M-30 0H30L24 44H-24Z" fill="#c8623a"/><rect x="-34" y="-8" width="68" height="14" rx="4" fill="#e07a4a"/><path d="M-18-6V-80a18 18 0 0 1 36 0V-6Z" fill="#3aa85a"/><path d="M-18-36h-14a10 10 0 0 1-10-10v-14M18-50h14a10 10 0 0 0 10-10v-10" fill="none" stroke="#3aa85a" stroke-width="14" stroke-linecap="round"/><path d="M-8-80v70M6-84v74" stroke="#1e6e38" stroke-width="2" stroke-dasharray="3 6"/><circle cy="-100" r="7" fill="#e0569a"/>` +
    `<path d="M0-22l-18-10v20ZM0-22l18-10v20Z" fill="#111"/><circle cy="-22" r="4" fill="#111"/><circle cx="-7" cy="-62" r="3" fill="#111"/><circle cx="7" cy="-62" r="3" fill="#111"/><path d="M-6-50q6 5 12 0" stroke="#111" stroke-width="2" fill="none"/></g>`;
  return frame(k, '#ffe2c8',
    lg(`${k}w`, '#c8687a', '#5a2440') + glow(`${k}sp`, '#fff4c0', 0.7) + glow(`${k}h`, '#ffd0a0', 0.6) +
    `<pattern id="${k}pk" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#1c3a8a"/><circle cx="6" cy="6" r="3.200" fill="#fff"/><circle cx="17" cy="17" r="3.200" fill="#fff"/></pattern>`,
    `<rect width="600" height="800" fill="url(#${k}w)"/>` +
    // calendar
    `<rect x="246" y="40" width="200" height="190" fill="#fff8e8"/><rect x="246" y="40" width="200" height="34" fill="#3aa85a"/>${tx(346, 64, 15, 'CACTUS SOCIETY 2027', '#fff')}${tx(346, 104, 17, 'MISS SEPTEMBER', '#e8203c')}${tx(346, 126, 13, '(the cactus. obviously.)', '#3a2a2a', 'font-style="italic"')}<path d="M264 146h164M264 170h164M264 194h164M264 218h164" stroke="#c8bca0" stroke-width="2" stroke-dasharray="14 9"/>` +
    // headboard, nightstand, bed
    `<path d="M150 300Q375 230 600 300V520H150Z" fill="#4a1c3a"/><path d="M190 330Q375 270 600 330" fill="none" stroke="#7a3460" stroke-width="5"/>` +
    `<rect x="6" y="360" width="134" height="250" fill="#5a2a1c"/><rect x="0" y="350" width="148" height="18" fill="#7a3c28"/><circle cx="72" cy="430" r="7" fill="#ffd24a"/>${cactus}` +
    `<path d="M0 520Q300 470 600 500V800H0Z" fill="#b8446a"/><path d="M0 660Q300 620 600 670" fill="none" stroke="#8a2c50" stroke-width="5"/><path d="M430 500Q520 470 600 500V560Q520 540 440 560Z" fill="#fff4f0"/>` +
    `<ellipse cx="330" cy="470" rx="290" ry="250" fill="url(#${k}h)"/><ellipse cx="330" cy="560" rx="230" ry="40" fill="#b05a70" opacity=".4"/>${girl}` +
    // tripod timer remote + note
    `<rect x="30" y="680" width="210" height="96" fill="#fffbe0" transform="rotate(-4 135 728)"/>${at(135, 728, 1, -4, `<text ${HAND} font-size="17" fill="#3a2a2a" text-anchor="middle"><tspan x="0" y="-20">take 47.</tspan><tspan x="0" y="4">he keeps upstaging me</tspan><tspan x="0" y="28">(band-aids: 3)</tspan></text>`)}`);
}

// ---------- hp_c7_sami2 — nothing but an apron ----------
function sami2(): string {
  const k = 'hp_c7_sami2';
  const S = SAMI.sk, SH = SAMI.sh;
  const mitt = (m: number): string => `<g transform="translate(${m * 78} 236) scale(${m} 1)"><path d="M-30-30Q-34 30 0 34Q36 30 30-20Q28-44 0-44Q-12-44-16-34Q-30-52-36-36Q-36-26-30-30Z" fill="#e0182f"/><path d="M-26-64H24L28-40H-30Z" fill="#fff"/><circle cx="-8" cy="-6" r="5" fill="#fff"/><circle cx="12" cy="10" r="5" fill="#fff"/><circle cx="10" cy="-22" r="5" fill="#fff"/></g>`;
  const smoke = (x: number, y: number, s: number): string => `<g transform="translate(${x} ${y}) scale(${s})" fill="#3a3a44" opacity=".55"><circle r="30"/><circle cx="24" cy="-34" r="24"/><circle cx="-6" cy="-70" r="20"/><circle cx="20" cy="-104" r="14"/></g>`;
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([-32, 258, 34], [-36, 430, 25], [-36, 560, 16])}${limb([32, 258, 34], [40, 430, 25], [38, 560, 16])}<path d="${TM}"/>` +
    `<path d="M-44 30L-18-16M44 30L18-16M-94 232q-30 6-34 40M-92 236q-10 20-2 44" stroke="#e0182f" stroke-width="5" fill="none"/>` +
    `<path d="M-46 28H46L54 150Q92 172 98 250L104 404Q0 426-104 404L-98 250Q-92 172-54 150Z" fill="#fff8e8" stroke="#e0182f" stroke-width="5" stroke-linejoin="round"/>` +
    `<path d="M-104 404Q0 426 104 404" fill="none" stroke="#e0182f" stroke-width="5" stroke-dasharray="1 9" stroke-linecap="round"/></g>` +
    `<path d="M-56 8Q-32 14-10 6M56 8Q32 14 10 6" fill="none" stroke="${SH}" stroke-width="2.600" stroke-linecap="round" opacity=".8"/>` +
    `${tx(0, 74, 22, 'KISS', '#e0182f')}${tx(0, 100, 22, 'THE COOK', '#e0182f')}<path d="M-30 66h60" stroke="#222" stroke-width="3"/><text y="126" font-size="17" fill="#222" ${HAND} text-anchor="middle" transform="rotate(-4)">PITY ↑</text>` +
    `<g filter="url(#${k}f)" fill="${S}">${limb([-76, 26, 20], [-130, 130, 16], [-84, 206, 13])}${limb([76, 26, 20], [130, 130, 16], [84, 206, 13])}</g>` +
    tat('M-104 62c-7-7-12 0-7 5l7 7 7-7c5-5 0-12-7-5', '#1c2a3a', 2.4) + `<text x="-108" y="94" font-size="9" fill="#1c2a3a" ${SANS} font-weight="700" text-anchor="middle" opacity=".8">ILSE</text>` +
    // the lasagna
    `<path d="M-72 214H72L62 262H-62Z" fill="#b8d8e8" stroke="#7a9ab0" stroke-width="3"/><path d="M-66 216Q-50 190-30 206Q-14 184 6 204Q24 186 40 204Q58 192 66 216Z" fill="#14100e"/><path d="M-40 206l8 6M0 200l6 8M34 204l6 6" stroke="#e0182f" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M-14 198Q-24 176-10 164Q-8 178 0 180Q0 160 12 152Q12 174 20 182Q22 192 14 200Z" fill="#ff8a1c"/><path d="M-2 198Q-8 188 2 180Q8 190 6 198Z" fill="#ffe040"/>${mitt(-1)}${mitt(1)}` +
    hd(0, HY, HS, 6, SAMI);
  const cat =
    `<g transform="translate(520 470)"><path d="M-44 60Q-50-10-10-16Q36-10 30 60Z" fill="#e8e0d4"/><circle cx="-8" cy="-34" r="30" fill="#e8e0d4"/><path d="M-34-48l-2-32 24 18ZM18-48l4-32-24 18Z" fill="#c8b8a8"/><path d="M-26-40l14 5M12-40l-14 5" stroke="#222" stroke-width="4" stroke-linecap="round"/><circle cx="-18" cy="-32" r="3.500" fill="#222"/><circle cx="4" cy="-32" r="3.500" fill="#222"/><path d="M-12-20q5-5 10 0" stroke="#222" stroke-width="2" fill="none"/></g>`;
  return frame(k, '#ffe0aa',
    lg(`${k}w`, '#d8a84a', '#6a3a1c') + glow(`${k}a`, '#ff2a2a', 0.9) + glow(`${k}h`, '#ffd890', 0.6),
    `<rect width="600" height="800" fill="url(#${k}w)"/><path d="M0 120h600M0 220h600M0 320h600M100 20v400M220 20v400M340 20v400M460 20v400" stroke="#fff" stroke-width="2" opacity=".14"/>` +
    // smoke alarm
    `<circle cx="486" cy="96" r="110" fill="url(#${k}a)"/><circle cx="486" cy="96" r="40" fill="#f4f0e8"/><circle cx="486" cy="96" r="26" fill="none" stroke="#c8c4b8" stroke-width="3"/><circle cx="500" cy="82" r="6" fill="#ff2a2a"/>${tx(404, 60, 19, 'BEEP', '#fff', 'transform="rotate(-14 404 60)"')}${tx(556, 174, 19, 'BEEP', '#fff', 'transform="rotate(12 556 174)"')}${tx(410, 176, 15, 'BEEP', '#fff', 'transform="rotate(8 410 176)" opacity=".8"')}` +
    // fridge note + oven + counter + judge
    `<rect x="20" y="150" width="150" height="110" fill="#fff8e8" transform="rotate(-3 95 205)"/>${at(95, 205, 1, -3, tx(0, -22, 17, 'PLAN B:', '#e0182f') + tx(0, 4, 17, 'PIZZA', '#222') + tx(0, 28, 15, '555-0142', '#222'))}` +
    `<rect x="0" y="530" width="600" height="270" fill="#4a2a1a"/><rect x="0" y="516" width="600" height="22" fill="#e8dcc0"/><rect x="16" y="560" width="190" height="240" rx="6" fill="#2a2a30"/><rect x="34" y="600" width="154" height="150" rx="6" fill="#0c0c10"/><path d="M40 740q30-60 70-20t70-30" stroke="#ff8a1c" stroke-width="6" fill="none"/><circle cx="50" cy="580" r="7" fill="#e0182f"/><circle cx="76" cy="580" r="7" fill="#888"/>` +
    `${smoke(110, 560, 1.2)}${cat}` +
    `<path d="M430 760L436 640Q452 610 468 640L474 760Z" fill="#e0182f"/><rect x="442" y="610" width="20" height="26" fill="#222"/>${tx(452, 706, 9.500, 'JUST IN', '#fff')}${tx(452, 720, 9.500, 'CASE', '#fff')}` +
    `<ellipse cx="300" cy="430" rx="230" ry="370" fill="url(#${k}h)"/>${at(300, 250, 1.16, 0, fig)}${smoke(410, 470, 0.9)}${smoke(196, 440, 0.7)}`);
}

export const hiddenArt2: Record<string, string> = {
  hp_c1_june2: june2(),
  hp_c1_bumble: bumble(),
  hp_c2_cass2: cass2(),
  hp_c2_moth: moth(),
  hp_c4_mags2: mags2(),
  hp_c4_wes: wes(),
  hp_c5_nadia2: nadia2(),
  hp_c5_mira: mira(),
  hp_c6_toni: toni(),
  hp_c6_vic: vic(),
  hp_c7_bea2: bea2(),
  hp_c7_sami2: sami2(),
};
