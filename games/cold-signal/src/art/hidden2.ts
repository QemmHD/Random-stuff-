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
  `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feOffset in="SourceAlpha" dx="${dx}" dy="3" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="e"/><feFlood flood-color="#1a0612" flood-opacity="${d}"/><feComposite in2="e" operator="in" result="s"/><feOffset in="SourceAlpha" dx="-3" result="p"/><feComposite in="SourceAlpha" in2="p" operator="out" result="q"/><feFlood flood-color="${rim}" flood-opacity=".7"/><feComposite in2="q" operator="in" result="r"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="s"/><feMergeNode in="r"/></feMerge></filter>`;

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
  const lid = o.lid ?? 2.4;
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
const TF = 'M-15-44V-8Q-34-2-58 6Q-70 10-70 26L-56 60C-62 84-44 118-40 146C-42 176-70 196-72 240V262H72V240C70 196 42 176 40 146C44 118 62 84 56 60L70 26Q70 10 58 6Q34-2 15-8V-44Z';
const BUST = '<circle cx="-28" cy="84" r="31"/><circle cx="28" cy="84" r="31"/>';
const TM = 'M-17-44V-10Q-40-4-70 4Q-84 8-84 28L-70 70C-70 110-56 150-54 190V262H54V190C56 150 70 110 70 70L84 28Q84 8 70 4Q40-4 17-10V-44Z';
/** Balconette bra cups + straps + band. */
const bra = (c: string, trim: string, lace = true): string =>
  `<path d="M-58 62L-40 2M58 62L40 2" stroke="${c}" stroke-width="4" fill="none"/><path d="M-60 104Q0 122 60 104L58 116Q0 132-58 116Z" fill="${c}"/>` +
  [-1, 1].map((m) => `<g transform="scale(${m} 1)"><path d="M-60 80Q-58 64-40 63Q-18 64-3 82Q-1 104-10 112Q-30 124-52 112Q-63 100-60 80Z" fill="${c}"/>` +
    (lace ? `<path d="M-58 72Q-40 62-22 68Q-10 74-4 84" fill="none" stroke="${trim}" stroke-width="4" stroke-dasharray="1 6" stroke-linecap="round"/>` : '') + '</g>').join('') +
  `<path d="M-4 96h8" stroke="${trim}" stroke-width="5" stroke-linecap="round"/>`;
/** Triangle bikini top. */
const tri = (c: string, trim: string): string =>
  `<path d="M-38 44L-14-12M38 44L14-12M-58 106Q0 120 58 106" stroke="${trim}" stroke-width="3.500" fill="none"/>` +
  [-1, 1].map((m) => `<path transform="scale(${m} 1)" d="M-38 42Q-14 70-3 100Q-8 114-30 116Q-54 114-60 98Q-52 66-38 42Z" fill="${c}" stroke="${trim}" stroke-width="2.500" stroke-linejoin="round"/>`).join('');
/** High-cut briefs. */
const brief = (c: string, trim: string, lace = true): string =>
  `<path d="M-71 216Q-36 232 0 234Q36 232 71 216L73 238Q36 252 9 276Q0 281-9 276Q-36 252-73 238Z" fill="${c}"/>` +
  (lace ? `<path d="M-70 222Q-36 238 0 240Q36 238 70 222" fill="none" stroke="${trim}" stroke-width="4" stroke-dasharray="1 6" stroke-linecap="round"/>` : `<path d="M-71 217Q-36 233 0 235Q36 233 71 217" fill="none" stroke="${trim}" stroke-width="3"/>`);
/** Body line-work drawn over the skin: collarbones, cleavage, navel. */
const marks = (c: string, bust = true): string =>
  `<g fill="none" stroke="${c}" stroke-width="2.500" stroke-linecap="round" opacity=".8"><path d="M-48 8Q-28 14-8 6M48 8Q28 14 8 6${bust ? 'M0 60Q-3 80 0 98' : ''}M0 186v9"/></g>`;
/** A hand: palm blob with finger hints. */
const hand = (x: number, y: number, rot: number, sh: string, s = 1): string =>
  at(x, y, s, rot, `<path d="M-12-6Q-12-16 0-16Q12-16 12-6V10Q12 20 0 20Q-12 20-12 10Z"/><path d="M-5 6v12M1 7v13M7 6v11" stroke="${sh}" stroke-width="1.600" fill="none" opacity=".7"/>`);
/** Phone held up for a mirror selfie (centre x,y). */
const phone = (x: number, y: number, rot: number, c: string, sk: string): string =>
  at(x, y, 1, rot, `<rect x="-26" y="-46" width="52" height="92" rx="9" fill="${c}"/><rect x="-18" y="-39" width="20" height="20" rx="6" fill="#0c0c12"/><circle cx="-12" cy="-33" r="3.500" fill="#39405a"/><circle cx="-4" cy="-25" r="3.500" fill="#39405a"/>` +
    `<g fill="${sk}"><rect x="8" y="-6" width="24" height="11" rx="5.500"/><rect x="10" y="7" width="23" height="11" rx="5.500"/><rect x="10" y="20" width="21" height="11" rx="5.500"/><rect x="9" y="33" width="18" height="10" rx="5"/></g>`);
const stars = (pts: number[][], c: string): string =>
  pts.map(([x, y, r]) => `<path d="M${x} ${y - r}L${x + r * 0.25} ${y - r * 0.25}L${x + r} ${y}L${x + r * 0.25} ${y + r * 0.25}L${x} ${y + r}L${x - r * 0.25} ${y + r * 0.25}L${x - r} ${y}L${x - r * 0.25} ${y - r * 0.25}Z" fill="${c}"/>`).join('');

// ---------- the cast ----------
const JUNE: Face = {
  sk: '#8a5236', sh: '#572e22', rim: '#ffd08a', iris: '#1c100c', browC: '#17100f', lash: true, shadow: '#c2507a',
  brows: 'M77.500 80Q86 75.500 95 78.500M105 78.500Q114 75.500 122.500 80', mouth: lips('#c4183c', '#6e0a20'),
  back: '<g fill="#17100f"><circle cx="72" cy="62" r="17"/><circle cx="88" cy="46" r="18"/><circle cx="110" cy="45" r="18"/><circle cx="128" cy="60" r="17"/><circle cx="135" cy="78" r="10"/><circle cx="65" cy="78" r="10"/></g>',
  front: '<path d="M66 84C62 58 82 47 100 47C118 47 138 58 134 84C129 69 116 60 100 60C84 60 71 69 66 84Z" fill="#17100f"/><path d="M76 44Q86 34 98 34M118 40Q130 46 134 58" fill="none" stroke="#4a2e2a" stroke-width="2.500" stroke-linecap="round" opacity=".8"/><circle cx="66" cy="108" r="6" fill="none" stroke="#f3c64a" stroke-width="2.400"/><circle cx="134" cy="108" r="6" fill="none" stroke="#c8962a" stroke-width="2.400"/>',
};

// ---------- hp_c1_june2 — red lace fit-check, one heel missing ----------
function june2(): string {
  const k = 'hp_c1_june2';
  const S = JUNE.sk;
  const fig =
    `<g filter="url(#${k}f)" fill="${S}">${limb([62, 24, 17], [120, 118, 14], [78, 196, 10])}<path d="${TF}"/>${BUST}` +
    `${limb([-37, 250, 38], [-42, 420, 24], [-44, 572, 13])}${limb([37, 250, 38], [52, 418, 24], [34, 566, 13])}` +
    `<path d="M22 572L46 570L50 620Q46 640 30 640Q20 628 24 606Z"/>` +
    // stockings + heel
    `<g fill="#1a060c" opacity=".5">${limb([-39, 330, 33], [-42, 420, 24], [-44, 572, 13])}${limb([44, 330, 33], [52, 418, 24], [34, 566, 13])}<path d="M22 572L46 570L50 620Q46 640 30 640Q20 628 24 606Z"/></g>` +
    `<path d="M-74 322Q-40 336-4 324M8 324Q44 336 80 322" stroke="#c4183c" stroke-width="9" fill="none"/><path d="M-74 322Q-40 336-4 324M8 324Q44 336 80 322" stroke="#ff8fa3" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round" fill="none"/>` +
    `<path d="M-52 240L-56 318M-18 250L-20 322M52 240L60 318M18 250L24 322" stroke="#c4183c" stroke-width="4"/>` +
    `<path d="M-58 572Q-44 564-30 574L-25 608Q-40 626-64 640H-80Q-82 630-70 624Z" fill="#d81e3c"/><path d="M-27 596L-23 640" stroke="#d81e3c" stroke-width="6" stroke-linecap="round"/>` +
    `${bra('#c4183c', '#ff8fa3')}${brief('#c4183c', '#ff8fa3')}<path d="M-71 204Q0 222 71 204" stroke="#c4183c" stroke-width="10" fill="none"/><path d="M-70 204Q0 222 70 204" stroke="#ff8fa3" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round" fill="none"/>` +
    `${hand(74, 204, 30, JUNE.sh)}</g>${marks(JUNE.sh)}` +
    `<g filter="url(#${k}f)" fill="${S}">${limb([-62, 24, 17], [-112, 96, 14], [-92, -8, 10])}</g>${phone(-96, -50, -8, '#e8537a', S)}` +
    hd(4, -68, 1, 4, JUNE);
  const dog =
    `<g transform="translate(486 452)"><ellipse cx="6" cy="34" rx="62" ry="30" fill="#e9d9bd"/><path d="M40 20Q70 0 74 34Q60 52 40 44Z" fill="#b98a5a"/><circle cx="-30" cy="-6" r="32" fill="#e9d9bd"/><path d="M-58-22Q-76 0-62 26Q-50 12-52-12ZM-4-26Q16-10 6 20Q-6 8-8-10Z" fill="#8a5a36"/><circle cx="-42" cy="-12" r="4.500" fill="#1a1010"/><circle cx="-20" cy="-12" r="4.500" fill="#1a1010"/><circle cx="-43" cy="-13.500" r="1.500" fill="#fff"/><circle cx="-21" cy="-13.500" r="1.500" fill="#fff"/><path d="M-50-22l10 3M-12-22l-10 3" stroke="#8a5a36" stroke-width="2.500" stroke-linecap="round"/><ellipse cx="-31" cy="2" rx="6" ry="4.500" fill="#1a1010"/>` +
    `<path d="M-64 16Q-40 4-6 12L-2 22Q-28 30-52 30L-74 44Z" fill="#d81e3c"/><path d="M-70 40L-78 8" stroke="#d81e3c" stroke-width="5" stroke-linecap="round"/><path d="M-50 10q8 8 20 4" stroke="#e9d9bd" stroke-width="9" stroke-linecap="round" fill="none"/></g>`;
  const bg =
    `<rect width="600" height="800" fill="url(#${k}w)"/><rect y="640" width="600" height="160" fill="#3a1c1c"/><path d="M0 640H600" stroke="#1c0a0e" stroke-width="6"/>` +
    // fairy bulbs + poster
    `<rect x="372" y="92" width="150" height="190" fill="#f0e2c8" transform="rotate(3 447 187)"/>${at(447, 187, 1, 3, tx(0, -40, 26, 'TUESDAY', '#b3261e') + tx(0, -8, 15, 'TO-DO', '#3a2a2a') + `<g ${HAND} font-size="15" fill="#3a2a2a"><text x="-58" y="20">☐ laundry</text><text x="-58" y="44">☐ lab report</text><text x="-58" y="68">☑ look insane</text></g>`)}` +
    // lamp
    `<circle cx="70" cy="330" r="190" fill="url(#${k}l)"/><path d="M40 300L100 300L116 372H24Z" fill="#ffd9a0"/><rect x="64" y="372" width="12" height="150" fill="#2a1414"/><rect x="20" y="520" width="110" height="120" fill="#4a2420"/><rect x="20" y="520" width="110" height="10" fill="#6a3830"/>` +
    // bed
    `<path d="M352 500H600V640H352Z" fill="#7a3440"/><path d="M340 470Q470 440 600 470V540Q470 520 340 540Z" fill="#f0dcd0"/><path d="M340 536Q470 516 600 536V560Q470 540 340 560Z" fill="#c9a9a0"/><rect x="540" y="330" width="60" height="150" rx="14" fill="#5a2630"/>${dog}` +
    // floordrobe
    `<path d="M0 700Q40 640 110 664Q170 650 196 720L210 800H0Z" fill="#3f6296"/><path d="M30 716Q70 690 120 700" stroke="#e9c27a" stroke-width="2.500" stroke-dasharray="6 5" fill="none"/><path d="M120 720Q170 690 214 730L230 800H110Z" fill="#e8537a"/><path d="M420 742Q470 700 540 724Q590 736 600 770V800H400Z" fill="#d8c8a8"/>`;
  return frame(k, JUNE.rim,
    lg(`${k}w`, '#c96a3c', '#5a2230') + glow(`${k}l`, '#ffd08a', 0.75) + glow(`${k}fl`, '#fff', 0.95),
    `${bg}<ellipse cx="290" cy="742" rx="120" ry="16" fill="#000" opacity=".35"/>${at(292, 236, 0.79, 0, fig)}` +
    `<circle cx="206" cy="170" r="46" fill="url(#${k}fl)"/>${stars([[206, 170, 30]], '#fff')}` +
    // mirror frame + smudge
    `<rect x="9" y="9" width="582" height="782" fill="none" stroke="#c9a050" stroke-width="18"/><rect x="20" y="20" width="560" height="760" fill="none" stroke="#6a4a1c" stroke-width="3"/><path d="M60 40L150 40L40 240L40 110Z" fill="#fff" opacity=".07"/>`);
}

export const hiddenArt2: Record<string, string> = {
  hp_c1_june2: june2(),
};
