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
  `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feOffset in="SourceAlpha" dx="${dx}" dy="3" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="e"/><feFlood flood-color="#1a0612" flood-opacity="${d}"/><feComposite in2="e" operator="in" result="s"/><feOffset in="SourceAlpha" dx="-4" result="p"/><feComposite in="SourceAlpha" in2="p" operator="out" result="q"/><feFlood flood-color="${rim}" flood-opacity=".95"/><feComposite in2="q" operator="in" result="r"/><feOffset in="SourceAlpha" dx="7" dy="2" result="g"/><feComposite in="SourceAlpha" in2="g" operator="out" result="h"/><feFlood flood-color="#fff" flood-opacity=".2"/><feComposite in2="h" operator="in" result="w"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="s"/><feMergeNode in="w"/><feMergeNode in="r"/></feMerge></filter>`;

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
  const lid = o.lid ?? 1.5;
  const c = 85.4 + lid * 1.6;
  const eye = (x: number): string =>
    `<path d="M${x - 7} 91.5Q${x} 86 ${x + 7} 91Q${x} 95 ${x - 7} 91.5Z" fill="#f1e9df"/><circle cx="${x}" cy="90.9" r="3.3" fill="${o.iris}"/><circle cx="${x - 1.2}" cy="90.4" r=".9" fill="#fff"/>` +
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
  front: '<path d="M65 86C58 44 84 30 104 31C126 32 142 50 135 86L130 68L124 80L117 60L108 76L99 57L90 76L83 62L76 80L70 70Z" fill="#eadfb4"/><path d="M74 50Q100 26 130 50Q116 40 101 40Q84 40 74 50Z" fill="#4a3826"/>' +
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
    gloss('M-66 300Q-72 360-62 410M-60 250q-10 20-10 40') + gloss('M-52 76q8-10 20-8M10 74q10-8 22-6', 5, 0.5) +
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
    `<g transform="translate(86 150) rotate(8)"><path d="M-70 40Q-80-40-30-52Q-10-90 30-60Q80-70 76 30Z" fill="#fff"/><path d="M-40-30Q-10-10 10-44M20-20Q40-40 60-24M-50 10Q-20 0 0 14" fill="none" stroke="#c8d4e4" stroke-width="5" stroke-linecap="round"/><path d="M50-50q20-14 34 6" fill="none" stroke="#9ab" stroke-width="4" stroke-dasharray="3 4"/>` +
    `<path d="M-74 20H80L66 210H-62Z" fill="#e8d9b0"/><path d="M30 20H80L66 210H24Z" fill="#000" opacity=".12"/><path d="M-50 22Q-40-70 0-30M10-30Q50-70 56 22" fill="none" stroke="#c9b580" stroke-width="10"/>` +
    `${tx(2, 78, 22, 'I', '#3a2a2a')}<path d="M2 92c-14-14-24 2-12 12l12 12 12-12c12-10 2-26-12-12Z" fill="#e0182f"/>${tx(2, 150, 19, 'THREAD', '#3a2a2a')}${tx(2, 174, 19, 'COUNT', '#3a2a2a')}</g>`;
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([-76, 26, 20], [-128, 120, 16], [-150, 30, 12])}<path d="${TM}"/><ellipse cy="176" rx="60" ry="46"/><path d="M-60 236H60V330H-60Z" fill="#3a5a8a"/><path d="M-60 236H60V252H-60Z" fill="#2a2a34"/>${at(-152, 6, 1.2, 0, '<path d="M-12-6Q-12-16 0-16H8V-36Q14-40 16-32V-8Q14 18 0 18Q-12 18-12 8Z"/>')}</g>` +
    `${mmarks(SH, 0.2)}<path d="M-30 60q8 6 14 0M10 62q8 6 14 0M-10 78q8 6 16 0" stroke="#a8823e" stroke-width="2.500" fill="none" stroke-linecap="round"/>${gloss('M-74 30q-6 20 2 40M-40 30q14-8 28 0')}` +
    `${tote}<g filter="url(#${k}f)" fill="${S}">${limb([76, 26, 20], [150, 130, 16], [90, 196, 13])}${hand(84, 202, 80, SH, 1.2)}</g>` + hd(0, HY, HS, -4, DALE);
  const chip = (x: number, y: number, w: number, s: string): string => `<rect x="${x}" y="${y}" width="${w}" height="30" rx="15" fill="#fff" opacity=".2"/><text x="${x + w / 2}" y="${y + 20}" font-size="15" fill="#fff" ${SANS} font-weight="700" text-anchor="middle">${s}</text>`;
  return frame(k, '#fff2c8',
    lg(`${k}p`, '#7ab8d8', '#e8d8b0') + lg(`${k}d`, '#000', '#000') + `<linearGradient id="${k}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></linearGradient><clipPath id="${k}c"><rect x="18" y="92" width="564" height="596" rx="26"/></clipPath>`,
    `<rect width="600" height="800" fill="#fff"/><text x="34" y="34" font-size="17" fill="#222" ${SANS} font-weight="700">22:15</text><rect x="520" y="20" width="40" height="17" rx="4" fill="none" stroke="#222" stroke-width="2"/><rect x="523" y="23" width="22" height="11" rx="2" fill="#222"/>` +
    `<path d="M282 50l12-7 12 7v14l-12 7-12-7Z" fill="#f5b800"/>${tx(346, 68, 30, 'hivr', '#f5b800', 'text-anchor="start"').replace('text-anchor="middle" ', '')}<path d="M36 52h30M36 62h30M36 72h30" stroke="#999" stroke-width="3.500" stroke-linecap="round"/>` +
    `<g clip-path="url(#${k}c)"><rect x="18" y="92" width="564" height="596" fill="url(#${k}p)"/><rect x="18" y="470" width="564" height="220" fill="#8a6a4a"/>` +
    // bare mattress behind him
    `<rect x="330" y="380" width="260" height="130" rx="16" fill="#e8e4dc"/><path d="M340 410h240M340 440h240M340 470h240" stroke="#c4c0d0" stroke-width="2" stroke-dasharray="2 14"/><rect x="330" y="496" width="260" height="60" fill="#5a4636"/><rect x="40" y="130" width="120" height="150" fill="#f4ecd8" stroke="#5a4636" stroke-width="6"/>${tx(100, 190, 17, 'LIVE', '#5a4636')}${tx(100, 214, 17, 'LAUGH', '#5a4636')}${tx(100, 238, 17, 'LINEN', '#e0182f')}` +
    `${at(270, 300, 1.08, 0, fig)}<rect x="18" y="470" width="564" height="220" fill="url(#${k}s)"/>` +
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
    gloss('M-66 190Q-84 230-84 290M-50 130q-6 20 2 34', 8, 0.5) + gloss('M-50 74q8-12 22-10M10 72q10-10 24-8', 5, 0.55) + gloss('M-26 400q-8 60 4 120', 7, 0.3) +
    `<g filter="url(#${k}f)" fill="${S}">${limb([62, 24, 17], [130, 60, 14], [88, -40, 11])}${hand(78, -52, -150, CASS.sh, 1.1)}</g>` + hd(6, HY, HS, 7, CASS);
  const bulbs = [[30, 62], [96, 92], [168, 104], [240, 96], [318, 72], [392, 60], [462, 78], [530, 108], [584, 120]];
  const chicken =
    `<g transform="translate(92 520)"><path d="M-20 30Q-40-10-14-40Q-20-70 6-70Q30-66 22-40Q44-10 26 30Z" fill="#ffd21e"/><path d="M-2-72q-6-16 4-14q2-10 10-2q8-2 4 14Z" fill="#e0182f"/><path d="M22-52l18 6-16 6Z" fill="#f07818"/><circle cx="12" cy="-54" r="3.500" fill="#1a1010"/><path d="M-22-56C-26-96 30-96 26-56" fill="none" stroke="#1c1c26" stroke-width="5"/><rect x="-28" y="-62" width="11" height="20" rx="5" fill="#f07818"/><path d="M-10 30v14M12 30v14" stroke="#f07818" stroke-width="5"/></g>`;
  const desk =
    `<path d="M0 560L600 540V800H0Z" fill="#1c1830"/><path d="M0 560L600 540V566L0 588Z" fill="#3a3460"/>` +
    [0, 1, 2, 3, 4, 5].map((i) => `<rect x="${420 + i * 28}" y="${612 - i}" width="6" height="110" rx="3" fill="#0c0a18"/><rect x="${414 + i * 28}" y="${640 + ((i * 37) % 60)}" width="18" height="12" rx="3" fill="${i % 2 ? '#f07818' : '#e8e4f0'}"/><circle cx="${423 + i * 28}" cy="${594 - i}" r="6" fill="${i === 2 ? '#e0182f' : '#58e0c0'}"/>`).join('') +
    `<rect x="20" y="620" width="150" height="56" rx="6" fill="#0c0a18"/><path d="M34 664A60 60 0 0 1 86 632" fill="none" stroke="#58e0c0" stroke-width="3"/><path d="M40 664L88 630" stroke="#e0182f" stroke-width="3"/><path d="M104 664A60 60 0 0 1 156 632" fill="none" stroke="#58e0c0" stroke-width="3"/><path d="M110 664L160 634" stroke="#e0182f" stroke-width="3"/>`;
  return frame(k, '#ffb060',
    lg(`${k}w`, '#4a3aa0', '#160c30') + glow(`${k}b`, '#ffd890', 0.9) + glow(`${k}o`, '#ff2a3a', 0.7) + glow(`${k}h`, '#ff9a4a', 0.5),
    `<rect width="600" height="800" fill="url(#${k}w)"/>` +
    // egg-crate foam + sign
    `<g fill="#241a58" opacity=".7">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${i * 80 - 20} 300l40-34 40 34-40 34ZM${i * 80 + 20} 368l40-34 40 34-40 34Z"/>`).join('')}</g>` +
    `<circle cx="476" cy="210" r="130" fill="url(#${k}o)"/><rect x="392" y="176" width="170" height="68" rx="10" fill="#2a0810" stroke="#ff2a3a" stroke-width="4"/>${tx(477, 224, 40, 'ON AIR', '#ff5a5a', 'textLength="140"')}` +
    `<rect x="40" y="200" width="140" height="96" fill="#f2c318" transform="rotate(-5 110 248)"/>${at(110, 248, 1, -5, tx(0, -6, 30, '104.3', '#1c1c26') + tx(0, 24, 17, 'THE COOP', '#1c1c26'))}` +
    `<path d="M0 40Q100 110 240 92Q380 50 470 76Q560 110 600 120" fill="none" stroke="#0c0a18" stroke-width="2.500"/>${bulbs.map(([x, y]) => `<circle cx="${x}" cy="${y + 8}" r="26" fill="url(#${k}b)"/><circle cx="${x}" cy="${y + 8}" r="6" fill="#fff4d0"/>`).join('')}` +
    `${desk}${chicken}` +
    // boom mic pointing at her, live
    `<path d="M600 330L500 420" stroke="#0c0a18" stroke-width="8" stroke-linecap="round"/><rect x="440" y="402" width="74" height="40" rx="20" fill="#2a2a3a" transform="rotate(-38 477 422)"/><path d="M448 424l22-18" stroke="#8a8aa0" stroke-width="3"/>` +
    `<ellipse cx="300" cy="440" rx="220" ry="330" fill="url(#${k}h)"/>${at(292, 262, 1.28, 5, fig)}` +
    // speech from the mixing desk
    `<rect x="20" y="700" width="210" height="60" rx="10" fill="#fff" transform="rotate(-3 125 730)"/>${at(125, 730, 1, -3, tx(0, -4, 15, 'MIC IS LIVE, CASS', '#e0182f') + tx(0, 16, 13, '— 3 listeners (hi mom)', '#3a2a4a'))}`);
}

export const hiddenArt2: Record<string, string> = {
  hp_c1_june2: june2(),
  hp_c1_bumble: bumble(),
  hp_c2_cass2: cass2(),
};
