// COLD SIGNAL — CAUGHT mode, case C1 "Zero Threat" art (+ the shared handler avatar av_cg_bff).
// Every value in `caught1Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key. Suggestive, never explicit. All adults.

const SANS = 'font-family="Helvetica, Arial, sans-serif"';
const HAND = 'font-family="Marker Felt, Chalkboard SE, Comic Sans MS, sans-serif"';
const R = (v: number): number => Math.round(v);
const tx = (x: number, y: number, size: number, s: string, fill: string, extra = '', font = SANS): string =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${font} font-weight="700" text-anchor="middle" ${extra}>${s}</text>`;
const lg = (id: string, a: string, b: string, x2 = 0, y2 = 1): string =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const glow = (id: string, c: string, a = 0.8): string =>
  `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${a}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
const fade = (id: string, c: string, a0: number, a1: number, x2 = 0, y2 = 1): string =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${c}" stop-opacity="${a0}"/><stop offset="1" stop-color="${c}" stop-opacity="${a1}"/></linearGradient>`;
const blur = (id: string, d: number): string => `<filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${d}"/></filter>`;

/** Form-shadow + rim-light filter: shades the right edge of whatever silhouette it is applied to. */
const shf = (id: string, rim: string, dx = -11, d = 0.36): string =>
  `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feOffset in="SourceAlpha" dx="${dx}" dy="3" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="e"/><feFlood flood-color="#1a0612" flood-opacity="${d}"/><feComposite in2="e" operator="in" result="s"/><feOffset in="SourceAlpha" dx="-4" result="p"/><feComposite in="SourceAlpha" in2="p" operator="out" result="q"/><feFlood flood-color="${rim}" flood-opacity=".95"/><feComposite in2="q" operator="in" result="r"/><feOffset in="SourceAlpha" dx="5" dy="1" result="g"/><feComposite in="SourceAlpha" in2="g" operator="out" result="h"/><feFlood flood-color="#fff" flood-opacity=".17"/><feComposite in2="h" operator="in" result="w"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="s"/><feMergeNode in="w"/><feMergeNode in="r"/></feMerge></filter>`;

/** Wraps a picture: defs + clip + film grain + vignette. Figures use filter `${k}f`. */
const frame = (k: string, w: number, h: number, rim: string, defs: string, body: string, vig = 0.55, grain = 0.14): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs>${defs}${shf(`${k}f`, rim)}` +
  `<filter id="${k}gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7"/><feColorMatrix values=".6 .6 .6 0 -.4 .6 .6 .6 0 -.4 .6 .6 .6 0 -.4 0 0 0 0 1"/></filter>` +
  `<radialGradient id="${k}vg" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${vig}"/></radialGradient>` +
  `<clipPath id="${k}fr"><rect width="${w}" height="${h}"/></clipPath></defs><g clip-path="url(#${k}fr)">${body}<rect width="${w}" height="${h}" filter="url(#${k}gr)" opacity="${grain}" style="mix-blend-mode:overlay"/><rect width="${w}" height="${h}" fill="url(#${k}vg)"/></g></svg>`;

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
/** Cheap untapered limb: a round-capped stroke. */
const sl = (c: string, w: number, d: string): string => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const at = (x: number, y: number, s: number, rot: number, body: string): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${body}</g>`;

// ---------- faces (same 200-unit geometry as the contact avatars; head centre = 100,85) ----------
interface Face {
  sk: string; sh: string; rim: string; iris: string; brows: string; browC: string; mouth: string;
  lid?: number; lash?: boolean; shadow?: string; back?: string; front?: string; under?: string; noEars?: boolean; lite?: boolean;
}
const HEAD = 'M67 80C67 34 133 34 133 80C133 106 122 131 100 131C78 131 67 106 67 80Z';
function face(o: Face): string {
  const lid = o.lid ?? 0.9;
  const c = 85.4 + lid * 1.6;
  const L = !!o.lite;
  const eye = (x: number): string => L ? `<circle cx="${x}" cy="91.5" r="3.3" fill="${o.iris}"/>` :
    `<path d="M${x - 7} 91.5Q${x} 85.5 ${x + 7} 91Q${x} 96.5 ${x - 7} 91.5Z" fill="#f1e9df"/><circle cx="${x}" cy="91" r="3.5" fill="${o.iris}"/><circle cx="${x - 1.2}" cy="90.4" r=".9" fill="#fff"/>` +
    `<path d="M${x - 8.5} 92Q${x} ${c} ${x + 8.5} 91.4V82H${x - 8.5}Z" fill="${o.sk}"/>` +
    (o.shadow ? `<path d="M${x - 8.5} 92Q${x} ${c} ${x + 8.5} 91.4Q${x} ${c - 9} ${x - 8.5} 92Z" fill="${o.shadow}" opacity=".6"/>` : '');
  return (o.back ?? '') +
    (o.noEars ? '' : `<ellipse cx="67" cy="94" rx="5" ry="9" fill="${o.sk}"/><ellipse cx="133" cy="94" rx="5" ry="9" fill="${o.sh}"/>`) +
    `<path d="${HEAD}" fill="${o.sk}"/>${o.under ?? ''}${eye(87)}${eye(113)}` +
    `<path d="M109 37C105 60 109 72 106 84C104 97 111 103 108 112C106 122 104 128 99 131C122 131 133 106 133 80C133 60 126 44 109 37Z" fill="${o.sh}" opacity=".72"/>` +
    (L ? '' : `<path d="M70 62Q80 50 96 48Q78 56 72 76Z" fill="#fff" opacity=".13"/><path d="M131.5 68V80C131.5 105 121 129.5 100 129.5" fill="none" stroke="${o.rim}" stroke-width="2.4" opacity=".7"/>`) +
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M79 92Q87 ${c} 95 91.4M105 91.4Q113 ${c} 121 92${o.lash && !L ? 'M79 92l-4-2.8M121 92l4-2.8' : ''}" stroke="#1a1318" stroke-width="${o.lash ? 2.5 : 2}"/>` +
    `<path d="${o.brows}" stroke="${o.browC}" stroke-width="3.2"/><path d="M102 95Q105 104 105.5 108Q101 112 95 108.5" stroke="#000" stroke-opacity=".38" stroke-width="1.9"/>${o.mouth}</g>${o.front ?? ''}`;
}
/** Place a face: (x,y) is the head centre. */
const hd = (x: number, y: number, s: number, rot: number, o: Face): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-100 -85)">${face(o)}</g>`;
/** Hair behind the body: draw before the torso, then hd() with back:''. */
const hb = (x: number, y: number, s: number, rot: number, o: Face): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-100 -85)">${o.back ?? ''}</g>`;
const lips = (c: string, d: string, open = false): string =>
  `<path d="M88 114Q94 110.5 100 113Q106 110.5 112 114Q100 ${open ? 127 : 123} 88 114Z" fill="${c}" stroke="${d}" stroke-width="1"/>` +
  (open ? '<path d="M91 115Q100 117.5 109 115L107 118Q100 120 93 118Z" fill="#fff" stroke="none"/>' : `<path d="M88 114Q100 117.5 112 114" stroke="${d}" stroke-width="1.3"/>`) +
  '<path d="M94 120.5q5-2 9-.5" stroke="#fff" stroke-width="1.2" opacity=".45"/>';
const smirk = (c: string): string => `<path d="M90 116.5Q100 119.5 111 113" stroke="${c}" stroke-width="2.6"/><path d="M111 113q2.5-1 3-4" stroke="${c}" stroke-width="1.5"/>`;
const grin = (c: string): string => `<path d="M85.5 112.5Q100 117 114.5 112.5Q112 124 100 124Q88 124 85.5 112.5Z" fill="#fff" stroke="${c}" stroke-width="1.6"/><path d="M88 118Q100 121.5 112 118" stroke="${c}" stroke-width=".8" opacity=".5"/>`;

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
/** High-cut briefs. */
const brief = (c: string, trim: string, lace = true): string =>
  `<path d="M-79 214Q-40 232 0 234Q40 232 79 214L82 240Q40 254 9 278Q0 283-9 278Q-40 254-82 240Z" fill="${c}"/>` +
  (lace ? `<path d="M-78 221Q-40 239 0 241Q40 239 78 221" fill="none" stroke="${trim}" stroke-width="4" stroke-dasharray="1 6" stroke-linecap="round"/>` : `<path d="M-79 216Q-40 234 0 236Q40 234 79 216" fill="none" stroke="${trim}" stroke-width="3"/>`);
/** Body line-work drawn over the skin: collarbones, cleavage, navel. */
/** Collarbones only, for dressed figures. */
const collar = (c: string): string => `<path d="M-48 8Q-28 14-8 6M48 8Q28 14 8 6" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>`;
const marks = (c: string, bust = true): string =>
  `<g fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" opacity=".8"><path d="M-48 8Q-28 14-8 6M48 8Q28 14 8 6${bust ? 'M0 60Q-3 80 0 98' : ''}M0 186v9"/></g>` + (bust ? '<path d="M-50 66Q-38 54-22 58M12 62Q24 54 38 58" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3"/>' : '');
/** A hand: palm blob with finger hints. */
const hand = (x: number, y: number, rot: number, sh: string, s = 1): string =>
  at(x, y, s, rot, `<path d="M-12-6Q-12-16 0-16Q12-16 12-6V10Q12 20 0 20Q-12 20-12 10Z"/><path d="M-5 6v12M1 7v13M7 6v11" stroke="${sh}" stroke-width="1.6" fill="none" opacity=".7"/>`);
/** Phone held up for a mirror selfie (centre x,y). `nails` paints fingertips. */
const phone = (x: number, y: number, rot: number, c: string, sk: string, nails = ''): string =>
  at(x, y, 1, rot, `<rect x="-26" y="-46" width="52" height="92" rx="9" fill="${c}"/><rect x="-18" y="-39" width="20" height="20" rx="6" fill="#0c0c12"/><circle cx="-12" cy="-33" r="3.5" fill="#39405a"/><circle cx="-4" cy="-25" r="3.5" fill="#39405a"/>` +
    `<g fill="${sk}"><rect x="8" y="-6" width="24" height="11" rx="5.5"/><rect x="10" y="7" width="23" height="11" rx="5.5"/><rect x="10" y="20" width="21" height="11" rx="5.5"/><rect x="9" y="33" width="18" height="10" rx="5"/></g>` +
    (nails ? `<g fill="${nails}"><rect x="8" y="-5" width="8" height="9" rx="4"/><rect x="10" y="8" width="8" height="9" rx="4"/><rect x="10" y="21" width="8" height="9" rx="4"/><rect x="9" y="34" width="7" height="8" rx="4"/></g>` : ''));
const gloss = (d: string, w = 6, o = 0.32): string => `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`;
/** Male chest/abs line-work. `cut` = how shredded (0 dad-bod .. 1 ripped). */
const mmarks = (c: string, cut: number): string =>
  `<g fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round" opacity=".8"><path d="M-56 8Q-32 14-10 6M56 8Q32 14 10 6M-60 80Q-30 98-3 82M60 80Q30 98 3 82M0 44V84M0 196v8"/>` +
  (cut > 0.5 ? '<path d="M0 104V184M-28 120Q-14 126 0 122Q14 126 28 120M-27 148Q-14 154 0 150Q14 154 27 148M-25 176Q-13 181 0 178Q13 181 25 176M-52 214Q-34 240-18 258M52 214Q34 240 18 258"/>' : '') + '</g>';
const HS = 1.14; // head scale relative to body units
const HY = -70; // head centre above the pit of the neck

// ---------- the cast ----------
const HOOPS = '<circle cx="65" cy="112" r="9" fill="none" stroke="#f3c64a" stroke-width="2.6"/><circle cx="135" cy="112" r="9" fill="none" stroke="#b8862a" stroke-width="2.6"/>';
const JESSA: Face = {
  sk: '#dba57e', sh: '#9c6a52', rim: '#ffc890', iris: '#3a2416', browC: '#1e1418', lash: true, shadow: '#8a4458', lid: 1.5,
  brows: 'M77.5 81Q86 76 95 78M105 78Q114 76 122.5 81', mouth: lips('#c81e38', '#6e0a20'),
  back: '<path d="M56 100C44 30 84 19 100 19C118 19 156 30 144 100C151 122 141 138 151 158C156 176 150 200 128 214Q136 180 124 150H76Q64 180 72 214C50 200 44 176 49 158C59 138 49 122 56 100Z" fill="#1e1418"/><path d="M58 120Q52 150 58 180M142 124Q150 150 144 182" fill="none" stroke="#5a3a44" stroke-width="2.2" stroke-linecap="round"/>',
  front: '<path d="M62 106C54 44 84 29 102 29C124 29 146 46 138 104C137 78 128 60 110 49C98 64 68 68 62 106Z" fill="#1e1418"/><path d="M68 76Q78 50 102 40M112 52Q126 60 132 82" fill="none" stroke="#5a3a44" stroke-width="2" stroke-linecap="round"/>' + HOOPS,
};
const JN: Face = { ...JESSA, back: '' };
const TRENT: Face = {
  sk: '#e8b692', sh: '#b27e62', rim: '#ffd9a0', iris: '#4a6a8a', browC: '#7a5a34', lid: 0.2,
  brows: 'M77.5 80Q86 76.5 95 75.5M105 75.5Q114 76.5 122.5 80', mouth: grin('#7a3a34'),
  front: '<path d="M65 86C59 46 82 31 100 31C118 31 141 46 135 86C132 68 124 56 100 54C76 56 68 68 65 86Z" fill="#9a7444"/><path d="M74 52Q88 38 108 38" fill="none" stroke="#d0a868" stroke-width="2" stroke-linecap="round"/>',
};
const JULES: Face = {
  sk: '#cf9a74', sh: '#8e5e46', rim: '#ff9a70', iris: '#3a2a1c', browC: '#1c1412', lid: 1.8,
  brows: 'M77.5 81Q86 78.5 95 81.5M105 80Q114 74 122.5 77', mouth: smirk('#5a2420'),
  under: '<path d="M66 90C67 122 80 136 100 136C120 136 133 122 134 90C130 102 123 106 113 104Q100 99 87 104C77 106 70 102 66 90Z" fill="#1c1412" opacity=".78"/>',
  front: '<path d="M63 90C55 40 82 24 102 25C128 26 145 46 137 90C134 72 130 62 122 54C104 52 86 50 74 60C68 68 66 78 63 90Z" fill="#1c1412"/><path d="M74 52Q92 34 120 38M78 56Q96 42 124 46" fill="none" stroke="#5a4840" stroke-width="1.8" stroke-linecap="round"/>',
};
const CATEYE = '<g fill="#fff" fill-opacity=".1" stroke="#1a1216" stroke-width="2.8" stroke-linejoin="round"><path d="M72 82L99 86Q99 101 87 101Q75 101 72 82ZM128 82L101 86Q101 101 113 101Q125 101 128 82Z"/></g><path d="M72 82l-5 4M128 82l5 4" stroke="#1a1216" stroke-width="2.6"/>';
const KAYLA: Face = {
  sk: '#f0c8a8', sh: '#b88a70', rim: '#c0e8ff', iris: '#4a5a3a', browC: '#6a3020', lash: true, lid: 1.2,
  brows: 'M77.5 80Q86 78 95 80.5M105 76Q114 68 122.5 73', mouth: '<path d="M91 116Q100 113.5 110 117" stroke="#b03a48" stroke-width="3.2"/>',
  back: '<circle cx="100" cy="24" r="19" fill="#8a3a22"/><path d="M60 96C52 40 84 26 100 26C116 26 148 40 140 96L134 110H66Z" fill="#8a3a22"/>',
  front: '<path d="M64 88C58 44 84 31 100 31C118 31 142 44 136 88C132 66 122 54 100 52C78 54 68 66 64 88Z" fill="#8a3a22"/><path d="M72 58Q84 40 104 38" fill="none" stroke="#c8683a" stroke-width="2" stroke-linecap="round"/>' + CATEYE,
};
const FELD: Face = {
  sk: '#e8c0a4', sh: '#b08a72', rim: '#d0f0ff', iris: '#5a6a7a', browC: '#b8b4b0', lid: 0.2,
  brows: 'M77.5 79Q86 74 95 77M105 79Q114 79 122.5 82', mouth: '<ellipse cx="100" cy="117" rx="5" ry="4" fill="#6a3030" stroke="#8a4a44" stroke-width="1.4"/>',
  under: '<path d="M80 100q7 3 14 0M106 100q7 3 14 0M84 64q16-5 32 0" fill="none" stroke="#b08a72" stroke-width="1.5"/>',
  front: '<path d="M64 96Q58 70 66 58Q70 70 70 92ZM136 96Q142 70 134 58Q130 70 130 92Z" fill="#c8c4c0"/><path d="M65 66Q100 50 135 66" fill="none" stroke="#22262c" stroke-width="6"/><g fill="#22262c"><rect x="76" y="58" width="20" height="14" rx="4"/><rect x="104" y="58" width="20" height="14" rx="4"/></g><g fill="#8fd0e8"><circle cx="86" cy="65" r="4.5"/><circle cx="114" cy="65" r="4.5"/></g>',
};
const MAMI: Face = {
  sk: '#c8906a', sh: '#8a5c44', rim: '#ffb060', iris: '#2a1810', browC: '#3a3034', lash: true, lid: 2.2,
  brows: 'M77.5 81Q86 77 95 80M105 79Q114 74 122.5 78', mouth: smirk('#8a2a34'),
  under: '<path d="M80 101q7 3 14 0M106 101q7 3 14 0M86 122q-4-4-2-9M114 122q4-4 2-9" fill="none" stroke="#8a5c44" stroke-width="1.4"/>',
  back: '<circle cx="100" cy="26" r="18" fill="#2a2228"/><path d="M92 14q8-4 16 2" stroke="#a8a0a4" stroke-width="3" fill="none"/>',
  front: '<path d="M64 90C58 44 84 31 100 31C118 31 142 44 136 90C132 68 122 54 100 50C78 54 68 68 64 90Z" fill="#2a2228"/><path d="M70 66Q78 46 98 38M76 62Q86 46 104 42" fill="none" stroke="#b0a8ac" stroke-width="2.4" stroke-linecap="round"/><circle cx="66" cy="108" r="4" fill="#f3c64a"/><circle cx="134" cy="108" r="4" fill="#b8862a"/>',
};
const SASHA: Face = {
  sk: '#f0cdb4', sh: '#b48e7c', rim: '#8fd0ff', iris: '#5a7a8a', browC: '#8a6a3a', lash: true, shadow: '#d05868', lid: 1.4,
  brows: 'M77.5 79Q86 77 95 74.5M105 74.5Q114 77 122.5 79', mouth: '<path d="M91 117Q100 115 109 117" stroke="#a04a50" stroke-width="3"/>',
  under: '<path d="M79 97q8 5 16 0M105 97q8 5 16 0" fill="none" stroke="#d05868" stroke-width="2" opacity=".6"/>',
  back: '<path d="M60 96C52 40 84 26 100 26C116 26 148 40 140 96L136 108H64Z" fill="#d8b46a"/><path d="M130 40Q164 50 156 110Q150 140 138 150Q146 110 132 70Z" fill="#c09a50"/>',
  front: '<path d="M64 88C58 44 84 31 100 31C118 31 142 44 136 88C132 66 120 52 100 50C80 52 68 66 64 88Z" fill="#d8b46a"/><path d="M72 58Q84 40 104 38M100 50Q84 56 76 68" fill="none" stroke="#f4dc9a" stroke-width="2" stroke-linecap="round"/>',
};
const DEZ: Face = {
  sk: '#a8704c', sh: '#6a4230', rim: '#7ad0ff', iris: '#1c100c', browC: '#17100f', lid: -1.2,
  brows: 'M76 76Q85 68 95 72M105 72Q115 68 124 76', mouth: '<path d="M88 114Q100 110 112 114Q112 124 100 124Q88 124 88 114Z" fill="#3a1418" stroke="#5a2420" stroke-width="1.4"/><path d="M90 114.5h20v3H90Z" fill="#fff" stroke="none"/>',
  back: '<path d="M44 150C36 60 70 6 100 6C130 6 164 60 156 150Z" fill="#565c78"/><path d="M52 140C48 66 76 22 100 22C124 22 152 66 148 140Z" fill="#14161e"/><g fill="#17100f"><circle cx="70" cy="60" r="17"/><circle cx="86" cy="44" r="18"/><circle cx="110" cy="42" r="18"/><circle cx="130" cy="58" r="17"/><circle cx="137" cy="78" r="11"/><circle cx="63" cy="80" r="11"/></g>',
  front: '<path d="M66 84C62 58 82 47 100 47C118 47 138 58 134 84C129 69 116 60 100 60C84 60 71 69 66 84Z" fill="#17100f"/><g fill="#17100f"><circle cx="78" cy="56" r="9"/><circle cx="94" cy="50" r="9"/><circle cx="110" cy="51" r="9"/><circle cx="124" cy="58" r="8"/></g><path d="M76 44Q86 34 98 34M118 40Q130 46 134 58" fill="none" stroke="#4a2e2a" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>',
};

// ---------- recurring props ----------
/** Marco the French bulldog, front view; (0,0) = head centre, head ~46 units wide each way. */
const marco = (x: number, y: number, s: number, rot = 0, body = true, bow = true): string => at(x, y, s, rot,
  (body ? '<path d="M-46 36Q-66 112-44 152H44Q66 112 46 36Z" fill="#c99a62"/><path d="M-18 56Q0 120 18 56Q0 74-18 56Z" fill="#f0dcc0"/><path d="M20 60Q54 100 44 152H20Z" fill="#000" opacity=".18"/><ellipse cx="-27" cy="152" rx="19" ry="10" fill="#dcb07a"/><ellipse cx="27" cy="152" rx="19" ry="10" fill="#b8884e"/>' : '') +
  '<path d="M-42-18L-56-78Q-28-72-12-34ZM42-18L56-78Q28-72 12-34Z" fill="#b98852"/><path d="M-40-30L-49-66Q-32-58-22-38ZM40-30L49-66Q32-58 22-38Z" fill="#e0a090"/>' +
  '<ellipse rx="47" ry="40" fill="#d2a46c"/><path d="M10-39Q47-30 47 0Q47 30 14 39Z" fill="#000" opacity=".16"/><ellipse cy="17" rx="27" ry="20" fill="#3a2a24"/>' +
  '<circle cx="-21" cy="-4" r="7.5" fill="#140c0c"/><circle cx="21" cy="-4" r="7.5" fill="#140c0c"/><circle cx="-23" cy="-6.5" r="2.2" fill="#fff"/><circle cx="19" cy="-6.5" r="2.2" fill="#fff"/>' +
  '<ellipse cy="8" rx="8.5" ry="5.5" fill="#0c0808"/><path d="M0 13V21M-13 23Q-6 29 0 21Q6 29 13 23M-7-23Q0-19 7-23M-30-16q8-6 16-2M30-16q-8-6-16-2" fill="none" stroke="#0c0808" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>' +
  (bow ? '<path d="M0 46L-24 33V60ZM0 46L24 33V60Z" fill="#d81e3c"/><path d="M0 46L24 33V60Z" fill="#000" opacity=".2"/><circle cy="46" r="6" fill="#8a0e20"/>' : ''));
/** Traditional fire helmet, front view; (0,0) = centre of the brim line. `label` prints the front shield. */
const helmet = (x: number, y: number, s: number, rot = 0, label = false, c = '#22232a'): string => at(x, y, s, rot,
  `<path d="M-74 12Q-60-8 0-10Q60-8 74 12Q84 22 80 30Q40 16 0 16Q-40 16-80 30Q-84 22-74 12Z" fill="#101116"/><path d="M-54 6C-54-76 54-76 54 6Q0-6-54 6Z" fill="${c}"/>` +
  '<path d="M14-54C40-48 54-30 54 6Q34 0 14-2Z" fill="#000" opacity=".3"/><path d="M0-56V-30M-30-46Q-40-22-40 2M30-46Q40-22 40 2" fill="none" stroke="#4a4c58" stroke-width="3"/><path d="M-40-34Q-30-52-10-56" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".35"/>' +
  '<path d="M-31 10L-36-30Q0-52 36-30L31 10Q0 2-31 10Z" fill="#f0e4c4" stroke="#c89a2a" stroke-width="3" stroke-linejoin="round"/><path d="M-28-24Q0-40 28-24" fill="none" stroke="#c81e2e" stroke-width="3"/>' +
  (label ? `<text ${SANS} font-weight="700" text-anchor="middle" fill="#1a1216"><tspan x="0" y="-11" font-size="11.5" textLength="56" lengthAdjust="spacingAndGlyphs">FONTAINE</tspan><tspan x="0" y="1" font-size="8" textLength="50" lengthAdjust="spacingAndGlyphs">· ENGINE 9 ·</tspan></text>` : '<text x="0" y="-2" font-size="26" text-anchor="middle" font-weight="700" fill="#c81e2e" ' + SANS + '>9</text>'));
/** A framed lighthouse canvas, w x h, top-left at (x,y). Every one is suspiciously similar. */
const lhouse = (x: number, y: number, w: number, h: number, sky: string, sea: string, fr = '#2a1c14'): string =>
  `<g transform="translate(${x} ${y}) scale(${w / 100} ${h / 130})"><rect x="-7" y="-7" width="114" height="144" fill="${fr}"/><rect width="100" height="130" fill="${sky}"/><circle cx="24" cy="34" r="11" fill="#fff" opacity=".7"/><path d="M0 84H100V130H0Z" fill="${sea}"/><path d="M0 96q12-5 25 0t25 0M50 112q12-5 25 0t25 0" stroke="#fff" stroke-width="2" fill="none" opacity=".5"/>` +
  '<path d="M40 130Q50 88 100 84V130Z" fill="#3a3a34"/><path d="M57 92L61 36H73L77 92Z" fill="#f6eedc"/><path d="M59.5 64H74.800L75.7 78H58.500Z" fill="#c8323a"/><rect x="59" y="24" width="16" height="13" fill="#ffe27a"/><path d="M57 24L67 14L77 24Z" fill="#c8323a"/><path d="M59 30L0 14V46Z" fill="#ffe9a0" opacity=".4"/><path d="M0 0H100V130H0Z" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="3"/></g>';
const SKIES = ['#e8a05a', '#7ab0d8', '#d87a8a', '#8a7ac0', '#e8c060', '#5a9aa0', '#5a6a8a'];
const SEAS = ['#2a5a7a', '#1c4a6a', '#3a4a7a', '#2a3a6a', '#2a6a7a', '#1c5a5a', '#232c4a'];
/** Lipstick kiss print centred on (x,y). */
const kiss = (x: number, y: number, s: number, rot: number, c = '#d81e3c', o = 0.85): string => at(x, y, s, rot,
  `<g fill="${c}" opacity="${o}"><path d="M-30 0Q-18-16-6-10Q0-7 6-10Q18-16 30 0Q14-5 0-3Q-14-5-30 0Z"/><path d="M-30 3Q-12 1 0 2Q12 1 30 3Q16 20 0 20Q-16 20-30 3Z"/></g><path d="M-14 6v8M-5 6v10M5 6v10M14 6v8M-10-9v4M10-9v4" stroke="#fff" stroke-width="1" opacity=".3"/>`);
/** Martini glass (stem base at x,y) with `n` olives on a pick. */
const martini = (x: number, y: number, s: number, n = 3, liq = '#d8e0b0'): string => at(x, y, s, 0,
  `<path d="M-52-150H52L4-78V-8Q26-4 34 0H-34Q-26-4-4-8V-78Z" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-opacity=".7" stroke-width="2.5"/><path d="M-42-138H42L0-76Z" fill="${liq}" opacity=".8"/><path d="M-40-144L-6-92" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>` +
  (n ? `<path d="M-34-170L26-110" stroke="#e8c27a" stroke-width="2.5"/>` + [0, 1, 2].slice(0, n).map((i) => `<circle cx="${-22 + i * 15}" cy="${-158 + i * 15}" r="9" fill="#7a8a2a"/><circle cx="${-19 + i * 15}" cy="${-160 + i * 15}" r="3" fill="#c8323a"/>`).join('') : ''));
/** Stemmed wine glass (base at x,y). `print` adds a lipstick mark on the rim. */
const wine = (x: number, y: number, s: number, fill = 0.5, print = false): string => at(x, y, s, 0,
  `<path d="M-30-150Q-36-90 0-76Q36-90 30-150Z" fill="#fff" fill-opacity=".16" stroke="#fff" stroke-opacity=".65" stroke-width="2.5"/><path d="M${-32 + fill * 2}-${R(80 + fill * 60)}Q-30-90 0-78Q30-90 ${32 - fill * 2}-${R(80 + fill * 60)}Z" fill="#6a0e24" opacity=".9"/><path d="M0-76V-6M-26 0Q0-12 26 0Z" stroke="#fff" stroke-opacity=".65" stroke-width="3" fill="#fff" fill-opacity=".2"/><path d="M-22-142Q-26-110-14-92" stroke="#fff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".5"/>` +
  (print ? kiss(22, -146, 0.3, -70) : ''));

// ---------- avatars ----------
const av = (k: string, c1: string, c2: string, rim: string, body: string, post = ''): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><radialGradient id="${k}-b" cx=".28" cy=".2" r="1.05"><stop offset="0" stop-color="${c1}"/><stop offset=".55" stop-color="${c2}"/><stop offset="1" stop-color="#0a070c"/></radialGradient>` +
  `<radialGradient id="${k}-v" cx=".5" cy=".42" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient><radialGradient id="${k}-r" cx=".82" cy=".3" r=".5"><stop offset="0" stop-color="${rim}" stop-opacity=".5"/><stop offset="1" stop-color="${rim}" stop-opacity="0"/></radialGradient>${shf(`${k}-f`, rim, -6, 0.3)}</defs>` +
  `<rect width="200" height="200" fill="url(#${k}-b)"/><rect width="200" height="200" fill="url(#${k}-r)"/>${body}${post}<rect width="200" height="200" fill="url(#${k}-v)"/></svg>`;
/** Avatar bust: neck + garment over shoulders, then the face. */
const bust = (k: string, f: Face, garment: string, extra = ''): string =>
  (f.back ?? '') + `<g filter="url(#${k}-f)"><path d="M86 120V152H114V120Z" fill="${f.sh}"/>${garment}</g>${extra}` + face({ ...f, back: '' });
const SHO = 'M22 204C22 164 56 150 84 144Q100 160 116 144C144 150 178 164 178 204Z';
const scrubs = (c: string, d: string): string => `<path d="${SHO}" fill="${c}"/><path d="M84 144L100 176L116 144" fill="none" stroke="${d}" stroke-width="5" stroke-linejoin="round"/><path d="M92 158Q100 150 108 158L100 174Z" fill="${d}" opacity=".5"/>`;
const shaker = (x: number, y: number, s: number, rot = 0): string => at(x, y, s, rot, '<rect x="-15" y="-34" width="30" height="62" rx="5" fill="#e8f0f4" fill-opacity=".85"/><rect x="-15" y="-6" width="30" height="34" rx="5" fill="#f2c0d0"/><rect x="-17" y="-46" width="34" height="14" rx="4" fill="#1c1c22"/><rect x="-6" y="-56" width="14" height="12" rx="3" fill="#e0182f"/><path d="M-9-28v50" stroke="#fff" stroke-width="3" opacity=".6"/>');

function avJessa(): string {
  const k = 'av_cg1_jessa';
  return av(k, '#c8703a', '#5a2430', '#ffc890', bust(k, JESSA, scrubs('#2a9a94', '#126a66') + '<path d="M132 160h22v12h-22Z" fill="#126a66" opacity=".6"/>',
    `<g transform="rotate(-8 100 178)"><rect x="76" y="150" width="46" height="60" rx="7" fill="#15161c"/><rect x="82" y="156" width="15" height="15" rx="5" fill="#000"/><circle cx="87" cy="161" r="2.5" fill="#39405a"/><circle cx="92" cy="166" r="2.5" fill="#39405a"/></g><g fill="${JESSA.sk}"><rect x="112" y="166" width="20" height="9" rx="4.5"/><rect x="113" y="177" width="19" height="9" rx="4.5"/><rect x="113" y="188" width="17" height="9" rx="4.5"/></g><g fill="#d81e3c"><rect x="112" y="167" width="7" height="7" rx="3.5"/><rect x="113" y="178" width="7" height="7" rx="3.5"/><rect x="113" y="189" width="7" height="7" rx="3.5"/></g>`));
}
function avTrent(): string {
  const k = 'av_cg1_trent';
  const cap = '<path d="M62 70C60 30 140 30 138 70Q100 58 62 70Z" fill="#1a8a4a"/><path d="M110 40C132 46 138 58 138 70Q124 64 110 62Z" fill="#000" opacity=".2"/><path d="M58 72Q100 54 142 72Q146 80 140 82Q100 66 60 82Q54 80 58 72Z" fill="#0e5a30"/>' + tx(100, 58, 8.5, 'SWOLE JUICE', '#fff', 'textLength="50" lengthAdjust="spacingAndGlyphs"');
  const T: Face = { ...TRENT, front: cap };
  return av(k, '#4aa0c8', '#1c3a5a', '#ffd9a0',
    `<g filter="url(#${k}-f)" fill="${TRENT.sk}">${limb([166, 168, 17], [188, 128, 15], [164, 92, 12])}<circle cx="182" cy="140" r="19"/><circle cx="162" cy="86" r="12"/></g>` +
    bust(k, T, `<path d="${SHO}" fill="${TRENT.sk}"/><path d="M56 204L66 150Q76 146 84 144Q100 172 116 144Q124 146 134 150L144 204Z" fill="#f4f4f0"/><path d="M84 144Q100 172 116 144" fill="none" stroke="#c8c8c0" stroke-width="3"/>`,
      `<path d="M40 176Q46 168 54 172M146 172Q154 168 160 176" fill="none" stroke="${TRENT.sh}" stroke-width="2.2" stroke-linecap="round"/>` + shaker(34, 168, 0.95, -12) + `<g fill="${TRENT.sk}"><rect x="14" y="160" width="26" height="10" rx="5"/><rect x="14" y="172" width="26" height="10" rx="5"/><rect x="15" y="184" width="24" height="10" rx="5"/></g>`));
}
function avJules(): string {
  const k = 'av_cg1_jules';
  return av(k, '#a83a2a', '#3a1418', '#ff9a70', bust(k, JULES,
    `<path d="M40 160Q60 116 100 116Q140 116 160 160Z" fill="#8a1420"/><path d="${SHO}" fill="#c8242e"/><path d="M80 144Q100 168 120 144L126 152Q100 184 74 152Z" fill="#9a1620"/><path d="M92 170v24M108 170v24" stroke="#f4ecdc" stroke-width="2.5"/>` + tx(150, 186, 9, 'ENGINE 9', '#f4ecdc', 'textLength="38" lengthAdjust="spacingAndGlyphs"'),
    marco(52, 168, 0.56, -6, true) + `<g fill="${JULES.sk}"><rect x="62" y="186" width="26" height="11" rx="5.5"/></g>`));
}
function avKayla(): string {
  const k = 'av_cg1_kayla';
  return av(k, '#c05a9a', '#4a2050', '#c0e8ff', bust(k, KAYLA, scrubs('#e87aa8', '#a84a78') + '<g fill="#fff" opacity=".5"><circle cx="50" cy="182" r="3"/><circle cx="70" cy="192" r="3"/><circle cx="150" cy="180" r="3"/><circle cx="134" cy="194" r="3"/></g>'));
}
function avFeld(): string {
  const k = 'av_cg1_feld';
  return av(k, '#6aa8b8', '#28485a', '#d0f0ff', bust(k, FELD, `<path d="${SHO}" fill="#f4f6f8"/><path d="M84 144L92 204H108L116 144Q100 160 84 144Z" fill="#6a9ac0"/><path d="M84 144L70 172L88 190M116 144L130 172L112 190" fill="none" stroke="#c0c8d0" stroke-width="3" stroke-linejoin="round"/>`,
    tx(160, 60, 34, '?', '#fff', 'opacity=".5" transform="rotate(14 160 60)"')));
}
function avMami(): string {
  const k = 'av_cg1_mami';
  return av(k, '#d08a3a', '#5a2a20', '#ffb060', `<defs>${glow(`${k}-c`, '#ffc060', 0.9)}</defs>` + bust(k, MAMI,
    `<path d="${SHO}" fill="#7a2a4a"/><path d="M70 204L76 150Q100 172 124 150L130 204Z" fill="#f0e0c8"/><path d="M76 150Q100 172 124 150" fill="none" stroke="#c8323a" stroke-width="3" stroke-dasharray="5 4"/><path d="M76 150L84 124M124 150L116 124" stroke="#f0e0c8" stroke-width="4"/>`,
    `<circle cx="158" cy="126" r="44" fill="url(#${k}-c)"/><rect x="147" y="140" width="22" height="64" rx="3" fill="#f6ecd8"/><path d="M164 140v64" stroke="#000" stroke-opacity=".15" stroke-width="8"/><path d="M158 140v-8" stroke="#3a2a20" stroke-width="2"/><path d="M158 110Q168 124 158 134Q148 124 158 110Z" fill="#ffd24a"/><path d="M158 120Q163 128 158 133Q153 128 158 120Z" fill="#fff"/>`));
}
function avSasha(): string {
  const k = 'av_cg1_sasha';
  return av(k, '#2a4a7a', '#141c38', '#8fd0ff', `<defs>${glow(`${k}-c`, '#8fd0ff', 0.75)}</defs>` + bust(k, SASHA,
    `<path d="${SHO}" fill="#4a7ab8"/><path d="M78 142Q100 166 122 142L128 150Q100 180 72 150Z" fill="#3a629a"/><path d="M100 170V204" stroke="#c8d8e8" stroke-width="3" stroke-dasharray="3 3"/>`,
    `<ellipse cx="100" cy="150" rx="80" ry="60" fill="url(#${k}-c)" opacity=".5"/>` +
    `<g transform="rotate(10 160 170)"><rect x="140" y="140" width="44" height="70" rx="6" fill="#0c0e14"/><rect x="144" y="146" width="36" height="60" fill="#12283a"/><path d="M148 176q4-16 8 0t8 0t8-10t6 10" fill="none" stroke="#3ae890" stroke-width="2"/><rect x="148" y="150" width="20" height="5" fill="#e0182f"/><path d="M148 190h28M148 197h18" stroke="#8fd0ff" stroke-width="2" opacity=".7"/></g>` +
    `<g transform="rotate(-8 44 176)"><rect x="24" y="150" width="40" height="64" rx="6" fill="#0c0e14"/><rect x="28" y="156" width="32" height="54" fill="#cfe8ff"/><path d="M32 166h18M32 174h24M32 182h14" stroke="#4a7ab8" stroke-width="3"/></g>`));
}
function avDez(): string {
  const k = 'av_cg_bff';
  return av(k, '#3a2a5a', '#161226', '#7ad0ff', `<defs>${glow(`${k}-c`, '#8fd8ff', 0.8)}</defs>` + bust(k, DEZ,
    `<path d="${SHO}" fill="#3a3f52"/><path d="M76 142Q100 170 124 142L134 152Q100 190 66 152Z" fill="#2a2e3e"/><path d="M90 168v30M110 168v30" stroke="#d8dce8" stroke-width="2.5"/>`,
    `<ellipse cx="80" cy="170" rx="90" ry="70" fill="url(#${k}-c)" opacity=".55"/><path d="M67 100C70 122 82 131 100 131C118 131 130 122 133 100Q100 126 67 100Z" fill="#8fd8ff" opacity=".2"/>` +
    `<g transform="rotate(-12 44 176)"><rect x="24" y="148" width="42" height="68" rx="7" fill="#0c0e14"/><rect x="28" y="154" width="34" height="58" fill="#d8f0ff"/></g><g fill="${DEZ.sk}"><rect x="56" y="168" width="20" height="9" rx="4.5"/><rect x="57" y="179" width="19" height="9" rx="4.5"/></g>` +
    // the chicken wing
    `<g transform="translate(160 150) rotate(24)"><rect x="-4" y="14" width="8" height="34" rx="4" fill="#f4ecdc"/><circle cx="-4" cy="48" r="5" fill="#f4ecdc"/><circle cx="4" cy="48" r="5" fill="#f4ecdc"/><path d="M-17-8Q-20-32 0-32Q20-32 17-8Q14 20 0 22Q-14 20-17-8Z" fill="#c8641c"/><path d="M-10-20q6-8 14-4M-8-4q4 6 12 2" fill="none" stroke="#f0a040" stroke-width="3" stroke-linecap="round"/><path d="M4-30Q20-28 17-8Q14 18 2 22Z" fill="#000" opacity=".2"/></g><g fill="${DEZ.sh}"><rect x="146" y="172" width="24" height="10" rx="5" transform="rotate(24 158 177)"/><rect x="142" y="184" width="24" height="10" rx="5" transform="rotate(24 154 189)"/></g>`));
}
function avFamily(): string {
  const k = 'av_cg1_family';
  const tam = (x: number, y: number, r: number): string => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-34-11Q0-17 34-11Q40 0 34 11Q0 17-34 11Q-40 0-34-11Z" fill="#e8d08a"/><path d="M-30-6Q0-11 30-6M-30 4Q0 0 30 4" stroke="#b89a4a" stroke-width="2" fill="none"/><path d="M-12-13v26M12-13v26" stroke="#8a6a2a" stroke-width="3"/><path d="M6-12Q38-12 34 11Q20 14 6 14Z" fill="#000" opacity=".12"/></g>`;
  return av(k, '#e09a3a', '#7a2a2a', '#ffe0a0',
    `<path d="M100 26L172 86H152V96H48V86H28Z" fill="#c8323a"/><path d="M100 26L172 86H152V96H100Z" fill="#000" opacity=".2"/><rect x="128" y="36" width="16" height="30" fill="#8a1c24"/><path d="M48 96H152V176H48Z" fill="#f6e8cc" opacity=".18"/>` +
    tam(100, 164, 0) + tam(86, 142, -4) + tam(116, 140, 5) + tam(100, 118, -2) + `<path d="M92 100q-6-8 2-14M108 100q-6-8 2-14" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>`);
}
function avDoorcam(): string {
  const k = 'av_cg1_doorcam';
  return av(k, '#3a4a5a', '#141c24', '#8fd0ff',
    `<defs><radialGradient id="${k}-l" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#4a7a9a"/><stop offset=".5" stop-color="#12283a"/><stop offset="1" stop-color="#04080c"/></radialGradient></defs>` +
    `<rect x="56" y="14" width="88" height="172" rx="30" fill="#1c2026"/><rect x="60" y="18" width="80" height="164" rx="27" fill="#2c323a"/><path d="M104 18h9a27 27 0 0 1 27 27v110a27 27 0 0 1-27 27h-9Z" fill="#000" opacity=".22"/>` +
    `<circle cx="100" cy="72" r="34" fill="#0a0c10"/><circle cx="100" cy="72" r="27" fill="url(#${k}-l)"/><path d="M82 62Q90 50 104 50" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".55"/><circle cx="100" cy="72" r="8" fill="#04080c"/><circle cx="97" cy="69" r="2.5" fill="#8fd0ff"/>` +
    `<circle cx="100" cy="144" r="18" fill="#0a0c10" stroke="#8fd0ff" stroke-width="3"/><path d="M92 146a8 8 0 0 1 16 0v4h-16Z" fill="#8fd0ff" opacity=".7"/>` +
    `<circle cx="158" cy="38" r="18" fill="#e0182f" opacity=".3"/><circle cx="158" cy="38" r="10" fill="#ff2a3a"/>` + tx(158, 66, 11, 'REC', '#ff8a8a'));
}

// ---------- shared scenery ----------
const brick = (id: string, a = '#7a3a2a', m = '#3a1c18'): string =>
  `<pattern id="${id}" width="64" height="32" patternUnits="userSpaceOnUse"><rect width="64" height="32" fill="${m}"/><rect x="1" y="1" width="62" height="14" fill="${a}"/><rect x="-31" y="17" width="62" height="14" fill="${a}"/><rect x="33" y="17" width="62" height="14" fill="${a}"/><rect x="1" y="1" width="62" height="3" fill="#fff" opacity=".08"/></pattern>`;
const tile = (id: string, a: string, m: string, w = 60, h = 60): string =>
  `<pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse"><rect width="${w}" height="${h}" fill="${m}"/><rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="3" fill="${a}"/><path d="M5 ${h - 6}V5H${w - 6}" fill="none" stroke="#fff" stroke-width="2" opacity=".14"/></pattern>`;
const steam = (k: string, pts: number[][], o = 0.3): string =>
  `<g filter="url(#${k}bl)" fill="#fff" opacity="${o}">${pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`;
/** Towel folded over a rail, embroidered CALLOWAY LOFTS; top-centre at (x,y). */
const towel = (x: number, y: number, w: number, h: number, c = '#f6f2ea'): string =>
  `<g transform="translate(${x} ${y})"><rect x="${-w / 2}" width="${w}" height="${h}" rx="6" fill="${c}"/><rect x="${w / 4}" width="${w / 4}" height="${h}" rx="6" fill="#000" opacity=".1"/><path d="M${-w / 2} ${h - 34}h${w}M${-w / 2} ${h - 26}h${w}" stroke="#c8a85a" stroke-width="3"/>` +
  `<text x="0" y="${h - 46}" font-size="${R(w / 9.5)}" ${SANS} font-weight="700" text-anchor="middle" fill="#8a6a2a" textLength="${R(w * 0.84)}" lengthAdjust="spacingAndGlyphs">CALLOWAY LOFTS</text></g>`;

// ---------- cg1_cover ----------
function cover(): string {
  const k = 'cg1_cover';
  const frames = [0, 1, 2, 3, 4, 5, 6].map((i) => lhouse(84 + i * 29, 300 + i * 2.5, 21 - i * 0.8, 30 - i, SKIES[i], SEAS[i])).join('');
  return frame(k, 600, 800, '#8fd0ff',
    lg(`${k}w`, '#141a36', '#080a18') + lg(`${k}h`, '#27304e', '#141a30') + glow(`${k}g`, '#ffd9a0', 0.95) + glow(`${k}p`, '#9fe0ff', 0.95) + lg(`${k}l`, '#fff2c8', '#ffb060') + blur(`${k}bl`, 16) + blur(`${k}b2`, 5) +
    lg(`${k}t`, '#3a2a22', '#120c0c') + fade(`${k}sp`, '#ffc880', 1, 0),
    `<rect width="600" height="800" fill="url(#${k}w)"/>` +
    // the hallway through the open bedroom door
    `<rect x="60" y="180" width="250" height="400" fill="#05060e"/><rect x="72" y="190" width="226" height="390" fill="url(#${k}h)"/><path d="M72 470L298 500V580H72Z" fill="#0c0e1c"/><path d="M72 470L298 500" stroke="#3a4468" stroke-width="2"/>${frames}` +
    `<path d="M298 190L330 170V610L298 580Z" fill="#1c2238"/>` +
    // bathroom door ajar: light and steam
    `<ellipse cx="470" cy="400" rx="220" ry="330" fill="url(#${k}g)" opacity=".5"/><rect x="408" y="150" width="150" height="440" fill="#0a0c16"/><rect x="420" y="160" width="70" height="430" fill="url(#${k}l)"/><path d="M490 160L556 140V620L490 590Z" fill="#2a2434"/><path d="M490 160L556 140V620L490 590Z" fill="none" stroke="#ffc880" stroke-width="2.5" opacity=".7"/><circle cx="502" cy="386" r="6" fill="#ffd9a0"/>` +
    `<path d="M420 590H490L400 800H180Z" fill="url(#${k}sp)" opacity=".5"/>` +
    steam(k, [[440, 210, 40], [470, 150, 46], [420, 120, 36], [500, 100, 30], [450, 300, 30], [400, 220, 26]], 0.34) +
    `<g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".3" filter="url(#${k}b2)"><path d="M440 480q-20-40 4-80t-6-90M468 420q18-40-4-80t10-80"/></g>` +
    // bed edge
    `<path d="M0 560Q120 530 250 580L330 800H0Z" fill="#1c2240"/><path d="M0 560Q120 530 250 580" fill="none" stroke="#4a5890" stroke-width="3"/><path d="M40 600q60-10 120 20M20 680q80-20 180 30" fill="none" stroke="#2c3560" stroke-width="4"/>` +
    // nightstand, face-down phone, banner
    `<path d="M150 640H600V800H110Z" fill="url(#${k}t)"/><path d="M150 640H600" stroke="#8a6a4a" stroke-width="3" opacity=".7"/>` +
    `<ellipse cx="350" cy="716" rx="170" ry="46" fill="url(#${k}p)"/><g transform="translate(350 712) rotate(-7)"><rect x="-112" y="-30" width="224" height="62" rx="16" fill="#dff4ff" filter="url(#${k}b2)"/><path d="M-106-30H106L116 20H-116Z" fill="#0b0c12"/><path d="M-116 20H116V30Q0 36-116 30Z" fill="#1c1e28"/><rect x="60" y="-22" width="34" height="26" rx="8" fill="#15161e"/><circle cx="70" cy="-9" r="6" fill="#2a2e44"/><circle cx="85" cy="-9" r="6" fill="#2a2e44"/></g>` +
    `<g transform="translate(340 606) rotate(-3)"><rect x="-150" y="-30" width="300" height="60" rx="20" fill="#dff4ff" opacity=".2" filter="url(#${k}b2)"/><rect x="-146" y="-27" width="292" height="54" rx="18" fill="#1a2434" fill-opacity=".88" stroke="#9fe0ff" stroke-opacity=".6" stroke-width="1.5"/><rect x="-134" y="-16" width="32" height="32" rx="9" fill="#2ad06a"/><path d="M-126-4h16v9h-9l-5 5v-5h-2Z" fill="#fff"/>` +
    `<text x="-92" y="-2" font-size="17" ${SANS} font-weight="700" fill="#fff">Jules</text><g fill="none" stroke-width="2.6" transform="translate(-32 -3)"><path d="M-10 0a10 10 0 0 1 20 0" stroke="#ff4a5a"/><path d="M-7 0a7 7 0 0 1 14 0" stroke="#ffd24a"/><path d="M-4 0a4 4 0 0 1 8 0" stroke="#4aa8ff"/></g><text x="-16" y="-2" font-size="17" ${SANS} font-weight="700" fill="#fff">(bestie)</text><text x="-92" y="16" font-size="12.5" ${SANS} fill="#b8d0e0">u up? he asleep yet</text><text x="136" y="-4" font-size="11" ${SANS} fill="#8aa0b0" text-anchor="end">now</text></g>` +
    // water glass + ring box of his: a protein shaker, loyal as ever
    shaker(540, 640, 1.5), 0.7);
}

// ---------- cg1_wall_lock — the Velvet Fern chalkboard (passcode clue) ----------
function wallLock(): string {
  const k = 'cg1_wall_lock';
  const items: [string, string][] = [['FILTHY MARTINI', '$14.50'], ['ESPRESSO MARTINI', '$15.00'], ['DIRTY SHIRLEY', '$12.00'], ['TRUFFLE FRIES', '$9.25'], ['SWEET POTATO FRIES', '$8.00'], ['OYSTERS (6)', '$18.00'], ['BURRATA', '$13.75']];
  const rows = items.map(([n, p], i) => {
    const y = 548 + i * 54;
    return `<text x="86" y="${y}" font-size="25" fill="#f4f0e4">${n}</text><text x="516" y="${y}" font-size="27" fill="#ffe9a0" text-anchor="end">${p}</text><path d="M${96 + n.length * 16.5} ${y - 6}H${516 - p.length * 16 - 8}" stroke="#f4f0e4" stroke-width="2.5" stroke-dasharray="2 9" stroke-linecap="round" opacity=".45"/>`;
  }).join('');
  const fern = (x: number, y: number, s: number, r: number): string => at(x, y, s, r, `<path d="M0 0Q10-60 0-120" fill="none" stroke="#2a7a4a" stroke-width="4"/><g fill="#3a9a5a">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${3 - i * 0.4}-${14 + i * 18}q${30 - i * 4}-${16}${44 - i * 6}-${2}q-${24 - i * 3} ${14}-${44 - i * 6} ${2}ZM${3 - i * 0.4}-${14 + i * 18}q-${30 - i * 4}-${16}-${44 - i * 6}-${2}q${24 - i * 3} ${14} ${44 - i * 6} ${2}Z"/>`).join('')}</g>`);
  return frame(k, 600, 1300, '#ffd9a0',
    tile(`${k}t`, '#1e5a44', '#0c2a20', 100, 50) + fade(`${k}d`, '#000', 0.55, 0.1) +
    glow(`${k}g`, '#ffd08a', 0.75) + lg(`${k}b`, '#5a3420', '#1c0e0a') + lg(`${k}c`, '#26302c', '#161c1a') + blur(`${k}bl`, 10),
    `<rect width="600" height="1300" fill="url(#${k}t)"/><rect width="600" height="1300" fill="url(#${k}d)"/>` +
    // back-bar shelf (sits under the clock)
    `<rect y="300" width="600" height="14" fill="#3a2418"/><g>${[40, 96, 150, 214, 270, 340, 398, 452, 512, 560].map((x, i) => `<path d="M${x - 16} 300V${230 - (i % 3) * 14}Q${x - 16} ${212 - (i % 3) * 14} ${x - 6} ${206 - (i % 3) * 14}V${170 - (i % 3) * 14}H${x + 6}V${206 - (i % 3) * 14}Q${x + 16} ${212 - (i % 3) * 14} ${x + 16} ${230 - (i % 3) * 14}V300Z" fill="${['#7a4a1c', '#2a6a4a', '#8a2a2a', '#c8a85a', '#3a4a7a'][i % 5]}" opacity=".75"/><path d="M${x - 10} ${240 - (i % 3) * 14}v50" stroke="#fff" stroke-width="3" opacity=".25"/>`).join('')}</g>` +
    `<ellipse cx="300" cy="420" rx="330" ry="240" fill="url(#${k}g)" opacity=".55"/><path d="M300 0V330" stroke="#1a1410" stroke-width="4"/><path d="M256 370L276 330H324L344 370Z" fill="#c8963a"/><ellipse cx="300" cy="372" rx="44" ry="8" fill="#fff2c8"/>` +
    // the chalkboard
    `<rect x="36" y="400" width="528" height="516" rx="8" fill="#6a4426"/><rect x="36" y="400" width="528" height="516" rx="8" fill="none" stroke="#3a2212" stroke-width="4"/><rect x="54" y="418" width="492" height="480" fill="url(#${k}c)"/><path d="M70 440Q200 470 300 440T530 450M80 860Q260 840 520 870" stroke="#fff" stroke-width="26" opacity=".03" fill="none"/>` +
    `<g ${HAND} font-weight="700">` + `<text x="300" y="474" font-size="35" fill="#fff" text-anchor="middle" letter-spacing="2">THE VELVET FERN</text><path d="M96 494Q300 506 504 494" fill="none" stroke="#7ad09a" stroke-width="3" stroke-linecap="round"/>${rows}</g>` +
    fern(78, 482, 0.36, -30) + fern(522, 482, 0.36, 30) +
    `<g fill="#fff" opacity=".75"><rect x="430" y="902" width="46" height="9" rx="3"/><rect x="484" y="903" width="30" height="8" rx="3" fill="#ffb0c8"/></g>` +
    // the bar and her usual
    `<path d="M0 1040H600V1300H0Z" fill="url(#${k}b)"/><path d="M0 1040H600" stroke="#c8963a" stroke-width="6"/><path d="M0 1056H600" stroke="#fff" stroke-width="2" opacity=".2"/><ellipse cx="408" cy="1236" rx="120" ry="22" fill="#000" opacity=".4"/>` +
    martini(408, 1236, 1.55, 3) +
    `<g transform="translate(150 1180)"><path d="M-70 0L-58 76H58L70 0Z" fill="#1c1c22"/><path d="M-70 0H70" stroke="#c8963a" stroke-width="4"/><g stroke="#e8b84a" stroke-width="11" stroke-linecap="round"><path d="M-48 0l-10-56M-28 0l-2-70M-8 0l6-62M14 0l-4-74M32 0l12-58M52 0l8-44"/></g><g stroke="#fff6c8" stroke-width="3" stroke-linecap="round" opacity=".5"><path d="M-30-10l-1.5-50M12-12l-3-50"/></g><g fill="#3a2a1c"><circle cx="-40" cy="-40" r="2"/><circle cx="-4" cy="-48" r="2"/><circle cx="34" cy="-40" r="2"/><circle cx="8" cy="-24" r="2"/></g></g>` +
    fern(20, 1090, 1.1, 24) + fern(590, 1010, 0.9, -28), 0.5);
}

// ---------- cg1_map ----------
function cityMap(): string {
  const k = 'cg1_map';
  const P: number[][] = [[144, 180], [288, 384], [480, 228], [576, 276], [384, 120], [704, 144], [192, 516], [672, 432]];
  const C = ['#ffd9a0', '#8fe0f0', '#f0a0d0', '#ff9a70', '#7ad09a', '#ffd24a', '#8fd0ff', '#ff5a4a'];
  const spots = P.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="34" fill="url(#${k}g${i})"/><rect x="${x - 13}" y="${y - 10}" width="26" height="20" rx="3" fill="#0e1420" stroke="${C[i]}" stroke-width="2"/><path d="M${x - 7} ${y - 3}h4v4h-4ZM${x + 3} ${y - 3}h4v4h-4Z" fill="${C[i]}"/>`).join('');
  return frame(k, 800, 600, '#8fd0ff',
    lg(`${k}b`, '#131b2e', '#0a0f1c', 1, 1) + C.map((c, i) => glow(`${k}g${i}`, c, 0.55)).join('') +
    `<pattern id="${k}p" width="48" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)"><rect x="3" y="3" width="42" height="38" rx="3" fill="#1c2740"/><rect x="8" y="8" width="14" height="12" fill="#243352"/><rect x="27" y="22" width="12" height="13" fill="#212e4a"/></pattern>`,
    `<rect width="800" height="600" fill="url(#${k}b)"/><rect width="800" height="600" fill="url(#${k}p)"/>` +
    // river + park
    `<path d="M-10 330Q120 300 200 380T400 470T620 560T810 540V610H-10Z" fill="#0c2a44"/><path d="M-10 330Q120 300 200 380T400 470T620 560T810 540" fill="none" stroke="#1c4a6a" stroke-width="5"/><path d="M40 420q30-10 60 10M300 510q40 0 70 20M560 580q40-10 80 0" stroke="#2a6a8a" stroke-width="2.5" fill="none" opacity=".7"/>` +
    `<path d="M520 300Q600 300 640 340Q660 400 600 420Q520 420 500 370Q490 320 520 300Z" fill="#12362c"/><g fill="#1c5a40">${[[530, 330], [560, 360], [600, 340], [580, 392], [540, 388], [622, 376]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11"/>`).join('')}</g>` +
    // roads
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><g stroke="#0a0f1c" stroke-width="15"><path d="M-10 196L144 180L384 120L704 144L810 130M144 180L192 516L160 610M288 384L384 120L400-10M144 180L288 384L480 228L576 276L704 144M576 276L672 432L810 470M288 384L192 516M480 228L384 120M672 432L420 610"/></g>` +
    `<g stroke="#4a5a80" stroke-width="9"><path d="M-10 196L144 180L384 120L704 144L810 130M144 180L192 516L160 610M288 384L384 120L400-10M144 180L288 384L480 228L576 276L704 144M576 276L672 432L810 470M288 384L192 516M480 228L384 120M672 432L420 610"/></g>` +
    `<path d="M-10 196L144 180L384 120L704 144L810 130M576 276L672 432L810 470" stroke="#e8b84a" stroke-width="3" opacity=".8"/><path d="M144 180L192 516M288 384L384 120M144 180L288 384L480 228L576 276L704 144M288 384L192 516M672 432L420 610" stroke="#8a9ac0" stroke-width="1.5" stroke-dasharray="8 8" opacity=".8"/></g>` +
    // bridges
    `<g stroke="#8a9ac0" stroke-width="3"><path d="M176 356l32 6M170 366l32 6M476 556l26 20M468 564l26 20"/></g>` + spots +
    `<g transform="translate(748 548)"><circle r="24" fill="#0a0f1c" stroke="#4a5a80" stroke-width="2"/><path d="M0-18L6 0L0 18L-6 0Z" fill="#4a5a80"/><path d="M0-18L6 0H-6Z" fill="#ff5a4a"/></g>`, 0.5, 0.1);
}

// ---------- cg1_ph_lighthouse — seven lighthouses in the hallway ----------
function phLighthouse(): string {
  const k = 'cg1_ph_lighthouse';
  const W = [42, 54, 68, 86, 108, 138, 184];
  let x = 16;
  const frames = W.map((w, i) => { const h = w * 1.3, s = lhouse(x, 250 - h / 2 + i * 3, w, h, SKIES[i], SEAS[i]); x += w + 15; return s; }).join('');
  return frame(k, 800, 600, '#ffd9a0',
    lg(`${k}w`, '#c8b08a', '#8a7458') + glow(`${k}g`, '#fff0c0', 0.8) + lg(`${k}f`, '#6a4426', '#2a180c') + fade(`${k}s`, '#000', 0.6, 0, 1, 0),
    `<rect width="800" height="600" fill="url(#${k}w)"/><ellipse cx="620" cy="90" rx="380" ry="260" fill="url(#${k}g)"/>` +
    `<path d="M0 392L800 470V600H0Z" fill="url(#${k}f)"/><path d="M0 376L800 440V470L0 392Z" fill="#f0e6d0"/><path d="M0 430L800 540M0 470L800 600M0 520L600 600" stroke="#000" stroke-width="2" opacity=".25"/>` +
    `<path d="M0 96L800 40" stroke="#f0e6d0" stroke-width="10"/>${frames}` +
    // the label-maker sticker on #7
    `<g transform="translate(640 408) rotate(-3) scale(1.32)"><rect x="-110" y="-17" width="220" height="34" rx="3" fill="#000" opacity=".3" transform="translate(3 4)"/><rect x="-110" y="-17" width="220" height="34" rx="3" fill="#f8f8f4"/><rect x="-110" y="-17" width="220" height="34" rx="3" fill="none" stroke="#b8b8b0" stroke-width="1.5"/><text x="0" y="7" font-size="19" font-family="Courier New, Courier, monospace" font-weight="700" text-anchor="middle" fill="#14141a" textLength="200" lengthAdjust="spacingAndGlyphs">#7 — about loneliness</text></g>` +
    `<rect width="800" height="600" fill="url(#${k}s)" opacity=".7"/>` +
    // a gym bag and shaker left in the hall
    `<path d="M70 520Q70 470 130 470H210Q260 470 260 520V560H70Z" fill="#1c2a3a"/><path d="M120 470Q165 420 210 470" fill="none" stroke="#14202c" stroke-width="9"/>${shaker(300, 530, 1.1)}`, 0.5);
}

// ---------- cg1_ph_roses ----------
function phRoses(): string {
  const k = 'cg1_ph_roses';
  const rose = (x: number, y: number, r: number, i: number): string =>
    `<g transform="translate(${x} ${y}) rotate(${i * 47})"><circle r="${r}" fill="${['#c8102a', '#a80c22', '#e01c36'][i % 3]}"/><path d="M${R(-r * 0.6)} 0A${R(r * 0.6)} ${R(r * 0.6)} 0 1 1 ${R(r * 0.2)} ${R(r * 0.55)}A${R(r * 0.35)} ${R(r * 0.35)} 0 1 1 ${R(-r * 0.1)} ${R(-r * 0.15)}" fill="none" stroke="#5a0612" stroke-width="2.6" stroke-linecap="round"/><path d="M${R(-r * 0.8)} ${R(-r * 0.3)}Q0 ${R(-r * 1.1)} ${R(r * 0.8)} ${R(-r * 0.3)}" fill="none" stroke="#ff6a7a" stroke-width="2" opacity=".5"/></g>`;
  const pos: number[][] = [[300, 150, 40], [230, 190, 38], [370, 186, 38], [170, 250, 36], [300, 230, 42], [430, 246, 36], [220, 300, 38], [380, 304, 38], [300, 316, 40], [140, 330, 32], [460, 328, 32], [250, 380, 36], [350, 384, 36], [180, 400, 30], [420, 402, 30], [300, 420, 34], [120, 270, 26], [480, 270, 26], [260, 120, 28], [344, 112, 28], [196, 150, 26], [410, 150, 26], [230, 440, 26], [372, 444, 26]];
  return frame(k, 600, 800, '#ffe0c0',
    lg(`${k}w`, '#cfe4e8', '#8ab0b8') + lg(`${k}d`, '#f4f0e8', '#b8b0a4') + glow(`${k}g`, '#fff', 0.7) + lg(`${k}v`, '#bfe0e8', '#6a9aa8', 1, 0),
    `<rect width="600" height="800" fill="url(#${k}w)"/><ellipse cx="140" cy="120" rx="300" ry="260" fill="url(#${k}g)"/>` +
    // wall sign + tooth poster
    `<g opacity=".9"><rect x="372" y="40" width="210" height="84" rx="10" fill="#fff"/><path d="M398 64q10-10 20 0q10-10 20 0q4 20-6 38q-6-16-14-16t-14 16q-10-18-6-38Z" fill="#4ab8d0"/>${tx(510, 76, 17, 'BRIGHT SMILE', '#2a7a90')}${tx(510, 100, 15, 'DENTAL', '#2a7a90')}</g>` +
    `<path d="M0 560H600V800H0Z" fill="url(#${k}d)"/><path d="M0 560H600" stroke="#fff" stroke-width="5"/>` +
    // appointment book + pen
    `<g transform="rotate(-6 120 690)"><rect x="20" y="640" width="210" height="120" rx="6" fill="#1c3a4a"/><rect x="30" y="646" width="190" height="108" fill="#fbf8f0"/><path d="M125 646v108M40 668h76M40 686h60M40 704h70M40 722h50M136 668h74M136 686h56M136 704h66" stroke="#9ab0b8" stroke-width="3"/><path d="M136 722h70" stroke="#e0182f" stroke-width="3"/></g><path d="M250 746L390 716" stroke="#2a7a90" stroke-width="8" stroke-linecap="round"/>` +
    // vase, stems, leaves
    `<path d="M236 470Q220 600 250 700H350Q380 600 364 470Z" fill="url(#${k}v)" opacity=".85"/><path d="M252 480Q244 590 262 690" stroke="#fff" stroke-width="6" fill="none" opacity=".5" stroke-linecap="round"/><g stroke="#2a6a3a" stroke-width="5" fill="none"><path d="M270 690Q280 560 240 440M300 692V430M330 690Q320 560 362 440M285 690Q300 560 300 440"/></g>` +
    `<g fill="#2e7a40"><path d="M120 420q40-50 90-20q-40 40-90 20ZM480 420q-40-50-90-20q40 40 90 20ZM90 300q10-50 60-50q-10 50-60 50ZM510 300q-10-50-60-50q10 50 60 50ZM200 110q20-40 60-30q-20 40-60 30ZM400 100q-20-36-60-24q20 36 60 24Z"/></g>` +
    pos.map(([x, y, r], i) => rose(x, y, r, i)).join('') +
    // the card on its plastic fork
    `<g transform="translate(452 330) rotate(9)"><path d="M0 60V330" stroke="#f4f4f4" stroke-width="7" stroke-linecap="round"/><path d="M-12 60V10M-4 60V4M4 60V4M12 60V10" stroke="#f4f4f4" stroke-width="5" stroke-linecap="round"/><rect x="-104" y="-60" width="208" height="124" rx="5" fill="#000" opacity=".25" transform="translate(5 6)"/><rect x="-104" y="-60" width="208" height="124" rx="5" fill="#fffaf0"/><rect x="-98" y="-54" width="196" height="112" rx="3" fill="none" stroke="#e0b8c0" stroke-width="2"/>` +
    `<text ${HAND} font-weight="700" fill="#2a1c2a" text-anchor="middle"><tspan x="0" y="-10" font-size="27" textLength="180" lengthAdjust="spacingAndGlyphs">For Mrs. Smith.</tspan><tspan x="46" y="38" font-size="31">— J</tspan></text></g>`, 0.4);
}

// ---------- cg1_ph_marco ----------
function phMarco(): string {
  const k = 'cg1_ph_marco';
  return frame(k, 600, 800, '#ffb070',
    brick(`${k}br`) + lg(`${k}c`, '#2a6a5a', '#0e2a26') + glow(`${k}g`, '#ffc070', 0.85) + fade(`${k}d`, '#000', 0.1, 0.7),
    `<rect width="600" height="800" fill="url(#${k}br)"/><rect width="600" height="800" fill="url(#${k}d)"/><ellipse cx="500" cy="170" rx="330" ry="300" fill="url(#${k}g)"/>` +
    // lamp
    `<path d="M440 60L470 0H560L590 60Z" fill="#f4dca0"/><path d="M515 60V330" stroke="#1c1410" stroke-width="6"/>` +
    // velvet couch
    `<path d="M-20 300Q140 230 330 270Q420 290 430 420V640H-20Z" fill="url(#${k}c)"/><path d="M-20 300Q140 230 330 270Q420 290 430 420" fill="none" stroke="#5ab8a0" stroke-width="4" opacity=".7"/><g fill="#0a1e1c">${[[70, 350], [190, 330], [310, 352], [130, 430], [250, 430]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join('')}</g>` +
    `<path d="M-20 560Q200 520 450 560L470 700H-20Z" fill="#348070"/><path d="M-20 560Q200 520 450 560" fill="none" stroke="#7ad8c0" stroke-width="4" opacity=".6"/><path d="M-20 690H480V800H-20Z" fill="#0e2a26"/>` +
    `<path d="M380 420Q470 380 480 470L490 720H400Z" fill="#1c4a42"/><path d="M380 420Q470 380 480 470" fill="none" stroke="#5ab8a0" stroke-width="4" opacity=".6"/>` +
    `<ellipse cx="220" cy="580" rx="150" ry="20" fill="#000" opacity=".35"/><g filter="url(#${k}f)">${marco(220, 350, 1.5)}</g>` +
    // side table + wine
    `<rect x="476" y="560" width="140" height="14" rx="4" fill="#3a2418"/><rect x="530" y="574" width="12" height="230" fill="#2a180e"/>${wine(540, 560, 1.15, 0.45)}`, 0.6);
}

// ---------- cg1_ph_box — the unmarked box on 4B's doormat ----------
function phBox(): string {
  const k = 'cg1_ph_box';
  return frame(k, 600, 800, '#ffd9a0',
    brick(`${k}br`, '#6a3426', '#2a1612') + lg(`${k}d`, '#2a3440', '#141a22') + lg(`${k}fl`, '#6a5440', '#2a2018') + lg(`${k}b`, '#c89a62', '#9a7040') + glow(`${k}g`, '#ffe0a0', 0.6),
    `<rect width="600" height="800" fill="url(#${k}br)"/><rect x="60" y="-10" width="420" height="440" fill="url(#${k}d)"/><rect x="90" y="-10" width="360" height="400" fill="none" stroke="#3a4656" stroke-width="5"/><rect x="60" y="414" width="420" height="16" fill="#c8963a"/>` +
    `<path d="M0 430H600V800H0Z" fill="url(#${k}fl)"/><path d="M0 430H600" stroke="#000" stroke-width="5" opacity=".4"/><ellipse cx="270" cy="520" rx="330" ry="170" fill="url(#${k}g)"/>` +
    // doormat
    `<path d="M70 600H530L590 780H10Z" fill="#3a2a1c"/><path d="M84 612H516L566 766H34Z" fill="#8a6a44"/><path d="M84 612H516L566 766H34Z" fill="none" stroke="#5a4028" stroke-width="3" stroke-dasharray="3 5"/>` +
    `<text x="300" y="754" font-size="96" ${SANS} font-weight="700" text-anchor="middle" fill="#1c1410" letter-spacing="8">4B</text>` +
    // the box
    `<ellipse cx="270" cy="640" rx="210" ry="22" fill="#000" opacity=".4"/><path d="M90 410L130 350H400L450 410Z" fill="#dcb07a"/><path d="M90 410H450V640H90Z" fill="url(#${k}b)"/><path d="M450 410L400 350V560L450 640Z" fill="#000" opacity=".0"/><path d="M250 350L240 410V470H300V410L290 350Z" fill="#e8d8a8" opacity=".85"/><path d="M90 410H450" stroke="#7a5830" stroke-width="3"/>` +
    // shipping label, half under tape
    `<g transform="translate(274 544) rotate(-2)"><rect x="-162" y="-56" width="324" height="112" fill="#fbfaf4"/><path d="M-150-40h60v60h-60Z" fill="none" stroke="#14141a" stroke-width="3"/><path d="M-140-30h8v40h-8ZM-126-30h4v40h-4ZM-116-30h10v40h-10ZM-100-30h4v40h-4Z" fill="#14141a"/>` +
    `<text ${SANS} font-weight="700" fill="#14141a"><tspan x="-76" y="-22" font-size="12">FROM</tspan><tspan x="-76" y="2" font-size="24">BLUE BOX LLC</tspan><tspan x="-76" y="38" font-size="22">→ J. FONTAINE, 4B</tspan></text><path d="M-76 12H150" stroke="#14141a" stroke-width="2"/><path d="M110-70L162-30V56H130Z" fill="#e8d8a8" opacity=".8"/></g>` +
    // Marco investigates
    `<g filter="url(#${k}f)">${marco(486, 470, 1.25, -16)}</g><g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"><path d="M400 470q-10 6-6 16M392 500q-12 2-12 12"/></g>`, 0.5);
}

// ---------- cg1_ph_sink — two toothbrushes ----------
function phSink(): string {
  const k = 'cg1_ph_sink';
  const brush = (x: number, r: number, c: string): string => `<g transform="translate(${x} 330) rotate(${r})"><rect x="-5" y="-190" width="10" height="200" rx="5" fill="${c}"/><rect x="-10" y="-196" width="20" height="46" rx="6" fill="${c}"/><rect x="-14" y="-192" width="10" height="38" rx="3" fill="#fff"/><path d="M-13-184h8M-13-176h8M-13-168h8M-13-160h8" stroke="#c8d8e0" stroke-width="2"/></g>`;
  return frame(k, 800, 600, '#ffe0c0',
    tile(`${k}t`, '#e4ecec', '#a8b8ba', 80, 80) + lg(`${k}c`, '#f8f8f6', '#c0c8cc') + glow(`${k}g`, '#fff4d8', 0.75) + lg(`${k}m`, '#9ab0b8', '#566a74') + lg(`${k}cr`, '#f4f6f8', '#8a9aa4', 1, 0),
    `<rect width="800" height="600" fill="url(#${k}t)"/><rect width="800" height="150" fill="url(#${k}m)"/><rect y="150" width="800" height="12" fill="#3a2a1c"/><ellipse cx="200" cy="120" rx="380" ry="300" fill="url(#${k}g)"/>` +
    // counter + basin
    `<path d="M0 400H800V600H0Z" fill="url(#${k}c)"/><path d="M0 400H800" stroke="#fff" stroke-width="5"/><ellipse cx="330" cy="520" rx="270" ry="96" fill="#b8c2c8"/><ellipse cx="330" cy="528" rx="250" ry="82" fill="#f4f6f8"/><ellipse cx="330" cy="560" rx="150" ry="40" fill="#d8e0e4"/><circle cx="330" cy="566" r="13" fill="#5a6a74"/>` +
    // tap with her hair tie
    `<path d="M300 400V300Q300 240 360 240H400Q430 240 430 270V292H404V274Q404 266 396 266H360Q328 266 328 300V400Z" fill="url(#${k}cr)"/><rect x="286" y="392" width="56" height="16" rx="5" fill="#8a9aa4"/><ellipse cx="314" cy="344" rx="26" ry="9" fill="none" stroke="#1a1216" stroke-width="8"/><path d="M290 342q10-8 26-7" stroke="#5a4a54" stroke-width="2" fill="none"/>` +
    // cup with two brushes
    `${brush(560, -14, '#ff8ab0')}${brush(590, 12, '#e0182f')}<path d="M528 300H624L614 420H538Z" fill="#fff" fill-opacity=".5" stroke="#fff" stroke-width="3"/><path d="M540 310l6 100" stroke="#fff" stroke-width="5" opacity=".7" stroke-linecap="round"/><ellipse cx="576" cy="422" rx="44" ry="8" fill="#000" opacity=".2"/>` +
    // lipstick, cap off
    `<g transform="translate(476 418)"><rect x="-14" y="-52" width="28" height="52" rx="3" fill="#1a1216"/><rect x="-12" y="-66" width="24" height="16" fill="#c8a85a"/><path d="M-9-66V-90L9-102V-66Z" fill="#d81e3c"/><path d="M-9-90L9-102V-94L-9-84Z" fill="#ff6a7a" opacity=".6"/></g><g transform="translate(436 424) rotate(80)"><rect x="-13" y="-50" width="26" height="50" rx="4" fill="#1a1216"/><path d="M-8-44v38" stroke="#fff" stroke-width="3" opacity=".3"/></g>` +
    `<path d="M150 418q20 4 16 14q-22 6-34-6q4-8 18-8Z" fill="#f3c64a" opacity=".0"/>` +
    // towels on the rail
    `<rect x="560" y="180" width="260" height="10" rx="5" fill="url(#${k}cr)"/>${towel(690, 176, 216, 230)}<circle cx="110" cy="440" r="11" fill="none" stroke="#f3c64a" stroke-width="3.5"/><path d="M110 429v-8" stroke="#f3c64a" stroke-width="3"/>`, 0.45);
}

// ---------- cg1_ph_mirror — MRS SMITH WAS HERE ----------
function phMirror(): string {
  const k = 'cg1_ph_mirror';
  return frame(k, 600, 800, '#ffc0c8',
    tile(`${k}t`, '#3a4a4e', '#1c2628', 60, 60) + lg(`${k}m`, '#a8bcc4', '#5a6e78') + blur(`${k}bl`, 14) + blur(`${k}b2`, 3) + glow(`${k}g`, '#fff4e0', 0.8),
    `<rect width="600" height="800" fill="url(#${k}t)"/><rect x="40" y="50" width="520" height="650" rx="14" fill="#1a1410"/><rect x="54" y="64" width="492" height="622" rx="6" fill="url(#${k}m)"/>` +
    // fog, with a wiped streak and the dim reflection of the room
    `<g filter="url(#${k}bl)"><rect x="54" y="64" width="492" height="622" fill="#dfe8ec" opacity=".75"/><ellipse cx="180" cy="180" rx="150" ry="90" fill="url(#${k}g)"/><path d="M80 560Q300 600 520 520L530 660H70Z" fill="#3a4a54" opacity=".5"/></g>` +
    `<g stroke="#fff" stroke-linecap="round" opacity=".35"><path d="M120 600v60M200 520v120M410 560v90M480 500v60M330 600v50" stroke-width="3"/></g><g fill="#fff" opacity=".5"><circle cx="120" cy="664" r="4"/><circle cx="200" cy="644" r="4"/><circle cx="410" cy="654" r="4"/><circle cx="330" cy="654" r="4"/></g>` +
    // the lipstick writing
    `<g ${HAND} font-weight="700" fill="#d81e3c" stroke="#d81e3c" stroke-width="2.5" stroke-linejoin="round" text-anchor="middle" transform="rotate(-5 300 300)"><text x="300" y="230" font-size="78">MRS SMITH</text><text x="300" y="330" font-size="78">WAS HERE</text></g>` +
    `<g ${HAND} font-weight="700" fill="#ff8a9a" opacity=".35" text-anchor="middle" transform="rotate(-5 300 300) translate(-2 -2)"><text x="300" y="230" font-size="78">MRS SMITH</text><text x="300" y="330" font-size="78">WAS HERE</text></g>` +
    kiss(330, 460, 2.4, -14) + `<path d="M150 380Q300 420 470 366" fill="none" stroke="#d81e3c" stroke-width="7" stroke-linecap="round" opacity=".8"/>` +
    // shelf: the guilty lipstick
    `<rect x="0" y="700" width="600" height="100" fill="#e8ecec"/><path d="M0 700H600" stroke="#fff" stroke-width="5"/><g transform="translate(470 760) rotate(74)"><rect x="-14" y="-52" width="28" height="52" rx="3" fill="#1a1216"/><rect x="-12" y="-66" width="24" height="16" fill="#c8a85a"/><path d="M-9-66V-84Q0-92 9-84V-66Z" fill="#d81e3c"/></g>${towel(110, 690, 150, 130)}`, 0.5);
}

// ---------- cg1_ph_collar ----------
function phCollar(): string {
  const k = 'cg1_ph_collar';
  return frame(k, 600, 800, '#ffb890',
    lg(`${k}n`, '#243a66', '#0e1830') + lg(`${k}s`, JULES.sk, JULES.sh, 1, 0) + glow(`${k}g`, '#ffd0a0', 0.6) +
    `<pattern id="${k}r" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M2 0v9" stroke="#0a1226" stroke-width="2.5" opacity=".5"/></pattern>`,
    `<rect width="600" height="800" fill="url(#${k}n)"/>` +
    // neck, stubble, adam's apple
    `<path d="M150-10Q170 220 110 330Q300 480 520 300Q440 200 450-10Z" fill="url(#${k}s)"/><path d="M300 150q16 30 0 70" fill="none" stroke="${JULES.sh}" stroke-width="5" opacity=".6"/><path d="M130-10Q300 90 470-10Z" fill="#1c1412" opacity=".8"/><g fill="#1c1412" opacity=".5">${[[190, 60], [230, 84], [270, 70], [330, 80], [380, 64], [420, 40], [300, 96], [250, 110], [350, 108], [210, 110]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g>` +
    `<path d="M120 330Q210 380 300 400M480 310Q400 380 300 400" fill="none" stroke="${JULES.sh}" stroke-width="5" opacity=".5" stroke-linecap="round"/>` +
    // shirt body + ribbed collar
    `<path d="M-20 330Q60 260 110 300Q300 480 520 276Q570 250 620 300V820H-20Z" fill="url(#${k}n)"/><ellipse cx="200" cy="600" rx="300" ry="300" fill="url(#${k}g)" opacity=".5"/>` +
    `<path d="M80 290Q300 520 540 262L568 300Q300 590 60 330Z" fill="#1c2e56"/><path d="M80 290Q300 520 540 262L568 300Q300 590 60 330Z" fill="url(#${k}r)"/><path d="M60 330Q300 590 568 300" fill="none" stroke="#0a1226" stroke-width="4"/><path d="M80 290Q300 520 540 262" fill="none" stroke="#4a64a0" stroke-width="3" opacity=".8"/>` +
    `<path d="M60 520q60 60 40 200M520 480q-40 100-10 240M300 620v200" stroke="#0a1226" stroke-width="6" fill="none" opacity=".4" stroke-linecap="round"/>` +
    // the print
    kiss(420, 404, 2.3, -40, '#e0203c', 0.9) + `<path d="M470 470q14 14 6 30" stroke="#e0203c" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/>` +
    `<g transform="translate(170 640) rotate(8)" opacity=".85"><path d="M0-40L34-20V16Q34 40 0 52Q-34 40-34 16V-20Z" fill="none" stroke="#c8a85a" stroke-width="4"/>${tx(0, -2, 13, 'ENGINE', '#c8a85a')}${tx(0, 26, 26, '9', '#c8a85a')}</g>`, 0.6);
}

// ---------- wardrobe (torso coordinates) ----------
/** Sweetheart-neck dress/top over the female torso. */
const gown = (c: string, d: string): string =>
  `<path d="M-52 60L-40 2M52 60L40 2" stroke="${c}" stroke-width="5" fill="none"/><g fill="${c}"><circle cx="-29" cy="86" r="34"/><circle cx="29" cy="86" r="34"/><path d="M-62 92C-60 110-42 124-38 146C-40 176-79 194-81 240V262H81V240C79 194 40 176 38 146C42 124 60 110 62 92Q0 130-62 92Z"/></g>` +
  `<path d="M0 70Q-3 86 0 104M-36 150Q0 160 36 150" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round" opacity=".7"/><path d="M-52 70Q-38 56-20 62" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".25"/>`;
/** Gym tank over the male torso. */
const tank = (c: string, d: string): string =>
  `<path d="M-52-2L-30-8Q0 42 30-8L52-2Q46 50 70 78C70 110 56 150 54 190V262H-54V190C-56 150-70 110-70 78Q-46 50-52-2Z" fill="${c}"/><path d="M-30-8Q0 42 30-8M-52-2Q-46 50-70 78M52-2Q46 50 70 78" fill="none" stroke="${d}" stroke-width="3"/>`;
/** Open-collar shirt over the male torso (fill may be a pattern). */
const shirt = (c: string, d: string): string =>
  `<path d="M-22-14Q-40-4-70 4Q-84 8-84 28L-70 70C-70 110-56 150-54 190V262H54V190C56 150 70 110 70 70L84 28Q84 8 70 4Q40-4 22-14L0 44Z" fill="${c}"/><path d="M-22-14L0 44L22-14L40 6L8 60L0 44L-8 60L-40 6Z" fill="${d}"/><path d="M0 50V262" stroke="${d}" stroke-width="4"/><g fill="#f4ecdc"><circle cy="90" r="4"/><circle cy="140" r="4"/><circle cy="190" r="4"/></g>`;
const BLUSH = '<ellipse cx="80" cy="104" rx="10" ry="5.5" fill="#e8405a" opacity=".32"/><ellipse cx="120" cy="104" rx="10" ry="5.5" fill="#e8405a" opacity=".32"/>';
const LEGS_F = limb([-41, 250, 42], [-30, 430, 27], [-34, 600, 16]) + limb([41, 250, 42], [44, 430, 27], [36, 600, 16]);

/** The Velvet Fern, booth 4: tufted green velvet + the brass plate. */
const boothDefs = (k: string): string => lg(`${k}v`, '#2a7a58', '#0c2e22') + glow(`${k}g`, '#ffc070', 0.75) + lg(`${k}t`, '#4a2a18', '#1a0e08') + lg(`${k}br`, '#f4d88a', '#a87a2a') +
  `<pattern id="${k}pl" width="44" height="44" patternUnits="userSpaceOnUse"><rect width="44" height="44" fill="#a8242c"/><path d="M0 11h44M0 33h44M11 0v44M33 0v44" stroke="#1c1418" stroke-width="7" opacity=".6"/><path d="M0 22h44M22 0v44" stroke="#f4d0a0" stroke-width="1.5" opacity=".7"/></pattern>`;
const booth = (k: string): string =>
  `<rect width="600" height="800" fill="#1a0e0c"/><path d="M0 60H600V86H0Z" fill="#3a2014"/><path d="M-10 96Q300 70 610 96V800H-10Z" fill="url(#${k}v)"/><path d="M-10 96Q300 70 610 96" fill="none" stroke="#6ad0a0" stroke-width="5" opacity=".6"/>` +
  `<g stroke="#061a14" stroke-width="5" opacity=".7">${[60, 180, 300, 420, 540].map((x) => `<path d="M${x} 88V800"/>`).join('')}</g>` +
  `<g transform="translate(300 150)"><rect x="-44" y="-36" width="88" height="72" rx="10" fill="url(#${k}br)"/><rect x="-37" y="-29" width="74" height="58" rx="6" fill="none" stroke="#6a4a14" stroke-width="2.5"/><circle cx="-30" cy="0" r="3" fill="#6a4a14"/><circle cx="30" cy="0" r="3" fill="#6a4a14"/>` +
  `<text x="0" y="19" font-size="54" font-family="Georgia, Times New Roman, serif" font-weight="700" text-anchor="middle" fill="#3a2608">4</text></g>`;
const fries = (x: number, y: number, s: number): string => at(x, y, s, 0, '<g stroke="#e8b84a" stroke-width="11" stroke-linecap="round"><path d="M-48 0l-10-56M-28 0l-2-70M-8 0l6-62M14 0l-4-74M32 0l12-58M52 0l8-44"/></g><path d="M-70 0L-58 76H58L70 0Z" fill="#f4ecdc"/><path d="M-66 20H66M-62 44H62" stroke="#c8323a" stroke-width="5"/>');

// ---------- cg1_ph_us_fern — you and her, booth 4 ----------
function phUsFern(): string {
  const k = 'cg1_ph_us_fern';
  const S = TRENT.sk, J = JESSA.sk;
  const trent = `<g filter="url(#${k}f)" fill="${S}">${limb([76, 26, 22], [150, 150, 19], [250, 300, 17])}<path d="${TM}"/>${tank('#f4f4f0', '#b8b8b0')}</g><path d="M-56 8Q-32 14-10 6M56 8Q32 14 10 6" fill="none" stroke="${TRENT.sh}" stroke-width="2.6" stroke-linecap="round"/>` + hd(-2, HY, HS, -7, TRENT);
  const jessa = `<g filter="url(#${k}f)" fill="${J}">${limb([-62, 24, 17], [-84, 120, 14], [-70, 230, 11])}<path d="${TF}"/>${BUST}${gown('#16121a', '#3a3040')}</g>${collar(JESSA.sh)}<path d="M-12 20Q0 34 12 20" fill="none" stroke="#f3c64a" stroke-width="2"/><circle cy="30" r="4" fill="#f3c64a"/>` + hd(6, HY, HS, 9, JN);
  return frame(k, 600, 800, '#ffc890', boothDefs(k),
    booth(k) + `<ellipse cx="300" cy="760" rx="380" ry="420" fill="url(#${k}g)" opacity=".5"/>` +
    at(416, 440, 1.5, 3, trent) + at(196, 486, 1.42, -4, hb(6, HY, HS, 9, JESSA) + jessa) +
    // his arm around her
    `<g filter="url(#${k}f)" fill="${S}">${hand(96, 510, 60, TRENT.sh, 2.5)}</g>` +
    // table: her usual, his usual
    `<path d="M-10 706H610V800H-10Z" fill="url(#${k}t)"/><path d="M-10 706H610" stroke="#c8963a" stroke-width="4" opacity=".8"/>${martini(110, 792, 1.0, 3)}${fries(300, 742, 0.9)}${shaker(500, 742, 1.6)}` +
    `<circle cx="430" cy="770" r="50" fill="url(#${k}g)"/><rect x="418" y="748" width="24" height="40" rx="4" fill="#f6ecd8"/><path d="M430 748Q438 736 430 726Q422 736 430 748Z" fill="#ffd24a"/>`, 0.5);
}

// ---------- cg1_ph_fern_j — same booth, one week later ----------
function phFernJ(): string {
  const k = 'cg1_ph_fern_j';
  const S = JULES.sk, J = JESSA.sk, PL = `url(#${k}pl)`;
  const jules = `<g filter="url(#${k}f)"><g fill="${PL}">${limb([76, 26, 26], [150, 150, 23], [240, 300, 20])}</g><path d="${TM}" fill="${S}"/>${shirt(PL, '#6a141c')}</g><path d="M-12 8Q0 20 12 8" fill="none" stroke="${JULES.sh}" stroke-width="2.6" stroke-linecap="round"/>` + hd(-4, HY, HS, -10, JULES);
  const JE: Face = { ...JN, mouth: lips('#c81e38', '#6e0a20', true) };
  const jessa = `<g filter="url(#${k}f)" fill="${J}"><path d="${TF}"/>${BUST}${gown('#c8102a', '#6e0a20')}</g>${collar(JESSA.sh)}` + hd(8, HY, HS, 14, JE);
  return frame(k, 600, 800, '#ff9a70', boothDefs(k),
    booth(k) + `<ellipse cx="300" cy="760" rx="380" ry="420" fill="url(#${k}g)" opacity=".5"/>` +
    at(404, 420, 1.5, 2, jules) + at(214, 470, 1.42, 7, hb(8, HY, HS, 14, JESSA) + jessa) +
    // his arm around her; her hand on his chest
    `<g filter="url(#${k}f)" fill="${S}">${hand(112, 500, 64, JULES.sh, 2.5)}${sl(J, 34, 'M250 560L330 600L380 540')}<g fill="${J}">${hand(386, 524, -20, JESSA.sh, 2.1)}</g></g><g fill="#d81e3c"><circle cx="372" cy="496" r="6"/><circle cx="386" cy="492" r="6"/><circle cx="400" cy="496" r="6"/></g>` +
    // her legs across his lap
    `<path d="M300 660H620V800H300Z" fill="#1c2a44"/><g filter="url(#${k}f)" fill="${J}">${limb([190, 744, 46], [420, 690, 30], [620, 736, 18])}${sl(J, 70, 'M170 810L400 768L620 806')}</g><path d="M70 690Q160 640 262 676L250 800H50Z" fill="#c8102a"/>` +
    // two martinis
    `<path d="M-10 770H250V800H-10Z" fill="url(#${k}t)"/>${martini(60, 796, 0.95, 3)}${martini(170, 800, 0.95, 2)}`, 0.5);
}

// ---------- cg1_ph_bbq — courtyard barbecue ----------
function bbqDefs(k: string): string {
  return lg(`${k}s`, '#5aa8e0', '#ffe0b0') + brick(`${k}br`, '#a85a3a', '#5a2a1c') + lg(`${k}gr`, '#5a9a4a', '#2a5a2a') + blur(`${k}bl`, 7);
}
const lights = (y: number, w: number): string => `<path d="M0 ${y}Q${w / 4} ${y + 50} ${w / 2} ${y + 10}T${w} ${y}" fill="none" stroke="#2a1c14" stroke-width="2.5"/>` +
  [0.08, 0.24, 0.4, 0.58, 0.76, 0.92].map((t, i) => `<circle cx="${R(t * w)}" cy="${R(y + 22 + Math.sin(t * 6.28 * 2 - 1.2) * 14)}" r="8" fill="${['#ffd24a', '#ff6a5a', '#7ad0ff', '#8ae08a'][i % 4]}"/>`).join('');
const apron = (zero: boolean): string =>
  `<path d="M-40 6L-14-40M40 6L14-40" stroke="#c8323a" stroke-width="5" fill="none"/><path d="M-48 6H48L62 100L72 262H-72L-62 100Z" fill="#fbf6ea"/><path d="M-48 6H48L62 100L72 262H-72L-62 100Z" fill="none" stroke="#c8323a" stroke-width="4"/>` +
  (zero ? `<text ${SANS} font-weight="700" text-anchor="middle" fill="#c8323a"><tspan x="0" y="52" font-size="21">KISS THE</tspan><tspan x="0" y="78" font-size="21">COOK</tspan></text>` : '<path d="M-30 46h60M-22 70h44" stroke="#c8323a" stroke-width="12"/>') +
  (zero ? `<path d="M-52 40L54 50M-40 74L42 66" stroke="#14141a" stroke-width="5" stroke-linecap="round"/><text ${HAND} font-weight="700" text-anchor="middle" fill="#14141a" transform="rotate(-4)"><tspan x="0" y="128" font-size="30">ZERO</tspan><tspan x="0" y="162" font-size="30">THREAT</tspan></text>` : '');
function phBbq(): string {
  const k = 'cg1_ph_bbq';
  const S = TRENT.sk, J = JESSA.sk, U = JULES.sk;
  const trent = `<g filter="url(#${k}f)" fill="${S}">${sl(S, 38, 'M76 26L156 10L128-86M-76 26L-156 10L-128-86')}<circle cx="120" cy="-6" r="30"/><circle cx="-120" cy="-6" r="30"/><circle cx="128" cy="-96" r="17"/><circle cx="-128" cy="-96" r="17"/><path d="${TM}"/>${tank('#f4f4f0', '#b8b8b0')}` +
    `<path d="M-56 214H56L72 400H8L0 310L-8 400H-72Z" fill="#2a4a8a"/></g>` + hd(0, HY, HS, 0, { ...TRENT, lite: true });
  const jessa = `<g filter="url(#${k}f)" fill="${J}">${sl(J, 27, 'M-62 24L-90 120L-60 200M62 24L96 110L70 30')}<path d="${TF}"/>${BUST}<path d="M-70 340L-48 600H-18L-6 340ZM6 340L16 600H46L70 340Z"/>${gown('#f0c83a', '#a8801c')}<path d="M-81 240Q0 262 81 240L96 350Q0 372-96 350Z" fill="#f0c83a"/></g>${collar(JESSA.sh)}` +
    `<g transform="translate(74 4)"><path d="M-14-30H14L10 22H-10Z" fill="#e0182f"/><path d="M-14-30H14" stroke="#fff" stroke-width="3"/></g>` + hd(4, HY, HS, 8, { ...JN, lite: true });
  const jules = `<g filter="url(#${k}f)">${sl(U, 38, 'M-76 26L-110 130L-60 210M76 26L120 130L176 190')}<path d="${TM}" fill="${U}"/><path d="M-17-10Q-40-4-70 4Q-84 8-84 28L-70 70L-54 262H54L70 70L84 28Q84 8 70 4Q40-4 17-10Q0 10-17-10Z" fill="#3a4658"/>${apron(true)}</g>` +
    `<path d="M176 190L250 150M176 190L246 170" stroke="#c8ccd0" stroke-width="5" stroke-linecap="round"/>` + hd(-2, HY, HS, -8, { ...JULES, lite: true });
  return frame(k, 800, 600, '#fff0c0', bbqDefs(k),
    `<rect width="800" height="600" fill="url(#${k}s)"/><rect y="60" width="800" height="330" fill="url(#${k}br)"/>` +
    `<path d="M0 380H800V600H0Z" fill="url(#${k}gr)"/>${lights(70, 800)}` +
    at(176, 268, 0.86, 0, trent) + at(396, 300, 0.78, 0, hb(4, HY, HS, 8, JESSA) + jessa) +
    // the grill
    `<g transform="translate(726 470)"><path d="M-70 40L-90 140M70 40L90 140M0 40V140" stroke="#1c1c22" stroke-width="8"/><path d="M-96 0Q-96 60 0 60Q96 60 96 0Z" fill="#1c1c22"/><ellipse rx="96" ry="16" fill="#3a3a44"/><g fill="#a84a2a"><ellipse cx="-40" cy="-4" rx="24" ry="9"/><ellipse cx="20" cy="-2" rx="24" ry="9"/></g><ellipse cx="60" cy="-8" rx="16" ry="7" fill="#c8641c"/></g>` +
    
    at(590, 230, 1.06, 2, jules) +
    `<ellipse cx="300" cy="590" rx="60" ry="10" fill="#000" opacity=".3"/>${marco(296, 500, 0.6)}`, 0.35);
}

// ---------- cg1_wall_home — the two of you. And him, at the grill. ----------
function wallHome(): string {
  const k = 'cg1_wall_home';
  const S = TRENT.sk, J = JESSA.sk, U = JULES.sk;
  const trent = `<g filter="url(#${k}f)" fill="${S}">${sl(S, 40, 'M76 26L112 140L100 262')}<path d="${TM}"/>${tank('#f4f4f0', '#b8b8b0')}</g>${collar(TRENT.sh)}` + hd(-2, HY, HS, -6, TRENT);
  const jessa = `<g filter="url(#${k}f)" fill="${J}">${sl(J, 28, 'M-62 24L-86 120L-74 230')}<path d="${TF}"/>${BUST}${gown('#f0c83a', '#a8801c')}</g>${collar(JESSA.sh)}` + hd(6, HY, HS, 10, JN);
  const jules = `<path d="${TM}" fill="${U}"/>${sl(U, 38, 'M76 26L116 120L170 170')}<path d="M-17-10Q-40-4-70 4Q-84 8-84 28L-70 70H70L84 28Q84 8 70 4Q40-4 17-10Q0 10-17-10Z" fill="#3a4658"/>${apron(false)}` + hd(-6, HY, HS, -12, { ...JULES, lite: true });
  return frame(k, 600, 1300, '#fff0c0', bbqDefs(k),
    `<rect width="600" height="1300" fill="url(#${k}s)"/><rect y="250" width="600" height="560" fill="url(#${k}br)"/><path d="M0 800H600V1300H0Z" fill="url(#${k}gr)"/>${lights(240, 600)}` +
    // Jules, out of focus, looking her way
    `<g filter="url(#${k}bl)">${at(452, 520, 0.92, 0, jules)}<g transform="translate(540 760)"><path d="M-96 0Q-96 60 0 60Q96 60 96 0Z" fill="#1c1c22"/><ellipse rx="96" ry="16" fill="#3a3a44"/></g><circle cx="556" cy="640" r="40" fill="#fff" opacity=".4"/></g>` +
    at(382, 800, 1.72, 3, trent) + at(196, 870, 1.62, -4, hb(6, HY, HS, 10, JESSA) + jessa) +
    `<g filter="url(#${k}f)" fill="${S}">${hand(84, 900, 60, TRENT.sh, 2.8)}</g>` + shaker(556, 1190, 2.2, 8) + `<g fill="${S}"><rect x="500" y="1170" width="60" height="22" rx="11"/><rect x="500" y="1196" width="60" height="22" rx="11"/><rect x="502" y="1222" width="56" height="22" rx="11"/></g>`, 0.4);
}

// ---------- cg1_ph_kayla_kar — Kayla's story: alone at Ruby Mic, 22:20 ----------
function phKayla(): string {
  const k = 'cg1_ph_kayla_kar';
  const S = KAYLA.sk;
  const K2: Face = { ...KAYLA, lid: 3.2, brows: 'M77.5 78Q86 74 95 77M105 77Q114 74 122.5 78', mouth: '<ellipse cx="100" cy="118" rx="9" ry="8" fill="#5a1420" stroke="#b03a48" stroke-width="2.6"/><path d="M94 114h12v2.500H94Z" fill="#fff" stroke="none"/>',
    front: KAYLA.front + '<path d="M62 70C58 20 142 20 138 70" fill="none" stroke="#14141a" stroke-width="6"/><path d="M68 44L64 6L92 30ZM132 44L136 6L108 30Z" fill="#14141a"/><path d="M72 38L70 18L84 30ZM128 38L130 18L116 30Z" fill="#ff8ab0"/>' };
  const fig = `<g filter="url(#${k}f)" fill="${S}">${limb([-62, 24, 17], [-130, -30, 14], [-150, -130, 11])}${hand(-152, -146, 0, KAYLA.sh, 1.2)}${limb([62, 24, 17], [100, 90, 14], [36, 44, 11])}<path d="${TF}"/>${BUST}${gown('#1c1426', '#5a3a7a')}</g>${collar(KAYLA.sh)}` +
    `<g fill="#fff" opacity=".7">${[[-40, 90], [-10, 130], [30, 100], [50, 170], [-50, 200], [0, 220], [20, 70], [-30, 160]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g>` +
    `<g transform="translate(26 30) rotate(-30)"><rect x="-7" y="-10" width="14" height="60" rx="5" fill="#2a2a34"/><circle cy="-22" r="17" fill="#8a8a98"/><path d="M-12-30l24 16M-16-20l24 16" stroke="#3a3a44" stroke-width="2"/></g><g fill="${S}">${hand(34, 50, -30, KAYLA.sh, 1.1)}</g>` + hd(2, HY, HS, -6, K2);
  return frame(k, 600, 800, '#ff6ab0',
    lg(`${k}w`, '#3a1040', '#12061c') + glow(`${k}g`, '#ff3a8a', 0.6) + glow(`${k}sp`, '#fff0f8', 0.5) + blur(`${k}bl`, 6) + lg(`${k}st`, '#4a1c3a', '#1c0a18'),
    `<rect width="600" height="800" fill="url(#${k}w)"/><circle cx="190" cy="130" r="240" fill="url(#${k}g)"/><path d="M300-20L80 800H520Z" fill="url(#${k}sp)" opacity=".5"/>` +
    // neon sign
    `<g ${SANS} font-weight="700" text-anchor="middle" font-size="58"><g filter="url(#${k}bl)" fill="#ff2a6a"><text x="190" y="120">RUBY</text><text x="190" y="184">MIC</text></g><g fill="#fff0f4" stroke="#ff2a6a" stroke-width="2.5"><text x="190" y="120">RUBY</text><text x="190" y="184">MIC</text></g></g><rect x="60" y="56" width="260" height="150" rx="16" fill="none" stroke="#ff6a9a" stroke-width="4"/>` +
    // the clock: 10:20
    `<g transform="translate(480 120)"><circle r="62" fill="#1c0a18"/><circle r="54" fill="#fbf6ea"/><g stroke="#14141a" stroke-width="4" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<path d="M0-48V-${i % 3 ? 43 : 38}" transform="rotate(${i * 30})"/>`).join('')}</g>${tx(0, -24, 13, '12', '#14141a')}${tx(0, 37, 13, '6', '#14141a')}${tx(31, 5, 13, '3', '#14141a')}${tx(-31, 5, 13, '9', '#14141a')}` +
    `<path d="M0 4V-28" stroke="#14141a" stroke-width="7" stroke-linecap="round" transform="rotate(310)"/><path d="M0 6V-42" stroke="#14141a" stroke-width="4.5" stroke-linecap="round" transform="rotate(120)"/><circle r="5" fill="#e0182f"/></g>` +
    `<path d="M0 640H600V800H0Z" fill="url(#${k}st)"/><path d="M0 640H600" stroke="#ff6ab0" stroke-width="3" opacity=".6"/>` + at(300, 380, 1.2, 2, fig) +
    // lyrics monitor + the empty table she is singing to
    `<g transform="translate(96 600) rotate(-6)"><rect x="-76" y="-50" width="152" height="100" rx="8" fill="#0c0c14"/><rect x="-68" y="-42" width="136" height="76" fill="#1c2a6a"/>${tx(0, -12, 13, '♪ ALL BY MYSELF ♪', '#fff')}<rect x="-54" y="4" width="108" height="6" fill="#3a4a9a"/><rect x="-54" y="4" width="40" height="6" fill="#ffd24a"/></g>` +
    `<g fill="#0a040e"><ellipse cx="470" cy="770" rx="140" ry="30"/><path d="M360 800V700Q360 680 380 680H420Q440 680 440 700V800ZM520 800V690Q520 670 540 670H580Q600 670 600 690V800Z"/></g>`, 0.55);
}

// ---------- cg1_ph_bed — under the duvet (key clue) ----------
function phBed(): string {
  const k = 'cg1_ph_bed';
  const S = JULES.sk, J = JESSA.sk;
  const JE: Face = { ...JESSA, under: BLUSH, lid: 2.2, mouth: lips('#c81e38', '#6e0a20', true),
    back: '<path d="M44 106C12 22 78 0 104 6C152 2 188 42 158 106C168 126 150 138 140 128L134 100H66L60 128C48 138 32 126 44 106Z" fill="#1e1418"/>',
    front: '<path d="M62 106C54 44 84 29 102 29C124 29 146 46 138 104C137 78 128 60 110 49C98 64 68 68 62 106Z" fill="#1e1418"/><path d="M110 49Q124 70 120 96M68 76Q78 50 102 40" fill="none" stroke="#5a3a44" stroke-width="2" stroke-linecap="round"/><path d="M118 50Q134 76 124 104" fill="none" stroke="#1e1418" stroke-width="4" stroke-linecap="round"/>' + HOOPS };
  const JU: Face = { ...JULES, under: (JULES.under ?? '') + BLUSH, lid: 2.4 };
  return frame(k, 600, 800, '#ffc890',
    lg(`${k}p`, '#f4ece0', '#c8b8a8') + lg(`${k}d`, '#fbf6ee', '#bcae9e') + glow(`${k}g`, '#ffd9a0', 0.7) + lg(`${k}h`, '#4a3020', '#1c100a') + brick(`${k}br`, '#5a2c20', '#2a1410'),
    `<rect width="600" height="800" fill="url(#${k}br)"/><rect y="60" width="600" height="110" fill="url(#${k}h)"/><rect y="160" width="600" height="640" fill="#d8ccbc"/><rect x="484" y="40" width="34" height="150" fill="#2a1810"/>` +
    // pillows
    `<path d="M-20 150Q150 110 310 150Q330 300 300 420H-20Z" fill="url(#${k}p)"/><path d="M290 150Q450 110 620 150V420H300Q270 300 290 150Z" fill="url(#${k}p)"/><path d="M290 150Q270 300 300 420" fill="none" stroke="#9a8a7a" stroke-width="4" opacity=".6"/><ellipse cx="300" cy="330" rx="330" ry="260" fill="url(#${k}g)" opacity=".7"/>` +
    // her arm up to the camera
    `<g filter="url(#${k}f)" fill="${J}">${limb([120, 440, 26], [50, 300, 22], [-30, 120, 20])}</g>` +
    at(214, 428, 1.5, -8, `<g filter="url(#${k}f)" fill="${J}"><path d="${TF}"/></g>${collar(JESSA.sh)}`) + at(410, 420, 1.5, 6, `<g filter="url(#${k}f)" fill="${S}"><path d="${TM}"/></g><path d="M-56 8Q-32 14-10 6M56 8Q32 14 10 6M0 44V70" fill="none" stroke="${JULES.sh}" stroke-width="2.6" stroke-linecap="round"/>`) +
    hd(206, 314, 1.72, -16, JE) + hd(412, 300, 1.72, 10, JU) +
    // the duvet + Marco wedged in
    `<g filter="url(#${k}f)">${marco(312, 500, 1.15, 4, false, false)}</g>` +
    `<path d="M-20 520Q60 470 150 500Q230 520 268 560Q312 590 356 556Q420 510 500 520Q570 524 620 500V820H-20Z" fill="url(#${k}d)"/><path d="M-20 520Q60 470 150 500Q230 520 268 560Q312 590 356 556Q420 510 500 520Q570 524 620 500" fill="none" stroke="#fff" stroke-width="6"/>` +
    `<g fill="none" stroke="#a89888" stroke-width="5" stroke-linecap="round" opacity=".6"><path d="M60 560q40 80 10 200M200 590q-20 90 30 190M330 620q20 80-10 170M450 580q40 70 20 200M540 560q30 60 20 120"/></g>` +
    // her hand holding the duvet up
    `<g filter="url(#${k}f)" fill="${J}">${hand(176, 506, 100, JESSA.sh, 2.2)}</g><g fill="#d81e3c"><circle cx="150" cy="494" r="6"/><circle cx="154" cy="508" r="6"/><circle cx="156" cy="522" r="6"/></g>` +
    `<g filter="url(#${k}f)" fill="#d2a46c"><ellipse cx="282" cy="566" rx="16" ry="11"/><ellipse cx="344" cy="564" rx="16" ry="11"/></g>` +
    // helmet on the bedpost
    `<g filter="url(#${k}f)">${helmet(488, 104, 1.2, 12, true)}</g>`, 0.5);
}

export const caught1Art: Record<string, string> = {
  av_cg_bff: avDez(),
  av_cg1_jessa: avJessa(),
  av_cg1_trent: avTrent(),
  av_cg1_jules: avJules(),
  av_cg1_kayla: avKayla(),
  av_cg1_feld: avFeld(),
  av_cg1_mami: avMami(),
  av_cg1_sasha: avSasha(),
  av_cg1_family: avFamily(),
  av_cg1_doorcam: avDoorcam(),
  cg1_cover: cover(),
  cg1_wall_lock: wallLock(),
  cg1_map: cityMap(),
  cg1_ph_lighthouse: phLighthouse(),
  cg1_ph_roses: phRoses(),
  cg1_ph_marco: phMarco(),
  cg1_ph_box: phBox(),
  cg1_ph_sink: phSink(),
  cg1_ph_mirror: phMirror(),
  cg1_ph_collar: phCollar(),
  cg1_wall_home: wallHome(),
  cg1_ph_us_fern: phUsFern(),
  cg1_ph_fern_j: phFernJ(),
  cg1_ph_bbq: phBbq(),
  cg1_ph_kayla_kar: phKayla(),
  cg1_ph_bed: phBed(),
};
