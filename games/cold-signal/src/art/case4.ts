// COLD SIGNAL — Case 04 "Last Chair" illustrations.
// Every value in `case4Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key.

type Stop = [number, string, number?];
const st = (s: Stop[]): string =>
  s.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? '' : ` stop-opacity="${a}"`}/>`).join('');
const lg = (id: string, s: Stop[], x2 = 0, y2 = 1, x1 = 0, y1 = 0): string =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${st(s)}</linearGradient>`;
const rg = (id: string, s: Stop[], cx = 0.5, cy = 0.5, r = 0.5): string =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${st(s)}</radialGradient>`;
const bl = (id: string, d: number | string): string =>
  `<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${d}"/></filter>`;
/** Mottle / streak texture (wood grain, snow crust). rgb = "r g b" in 0..1. */
const tex = (id: string, fx: number, fy: number, rgb: string, k = -2.2, b = 1.3, seed = 3): string => {
  const c = rgb.split(' ');
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="3" seed="${seed}"/><feColorMatrix values="0 0 0 0 ${c[0]} 0 0 0 0 ${c[1]} 0 0 0 0 ${c[2]} ${k} 0 0 0 ${b}"/><feComposite operator="in" in2="SourceGraphic"/></filter>`;
};
const SANS = 'font-family="Helvetica, Arial, sans-serif"';
const SERIF = 'font-family="Georgia, Times New Roman, serif"';
const HAND = 'font-family="Marker Felt, Chalkboard SE, Comic Sans MS, sans-serif"';
const BOLD = 'font-weight="700"';
const MID = 'text-anchor="middle"';
const n1 = (v: number): string => (Math.round(v * 10) / 10).toString();
const fit = (w: number): string => `textLength="${w}" lengthAdjust="spacingAndGlyphs"`;
const tx = (x: number, y: number, size: number, s: string, fill: string, font = SANS, extra = `${BOLD} ${MID}`): string =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${font} ${extra}>${s}</text>`;

/** Lift Ops orange — staff jackets, beanies, the lift shack. */
const OR = '#F26A1B';
const ORD = '#b3470c';
/** The one red object in the key photos (jerrycan, SP-01 pinstripe). */
const RED = '#E0232B';
/** Lina's purple. */
const PUR = '#7b46b8';
const PURD = '#4f2a80';
const PURL = '#a878e0';

/** Deterministic PRNG so the art is identical on every load. */
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Wraps a picture: adds film grain + vignette. */
const frame = (k: string, w: number, h: number, defs: string, body: string, grain = 0.16, vig = 0.5): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${defs}` +
  `<filter id="${k}gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7"/><feColorMatrix values=".6 .6 .6 0 -.4 .6 .6 .6 0 -.4 .6 .6 .6 0 -.4 0 0 0 0 1"/></filter>` +
  rg(`${k}vg`, [[0.5, '#000', 0], [1, '#000', vig]], 0.5, 0.5, 0.75) +
  `<clipPath id="${k}fr"><rect width="${w}" height="${h}"/></clipPath></defs><g clip-path="url(#${k}fr)">${body}<rect width="${w}" height="${h}" filter="url(#${k}gr)" opacity="${grain}" style="mix-blend-mode:overlay"/><rect width="${w}" height="${h}" fill="url(#${k}vg)"/></g></svg>`;

/** Seven-segment LED glyphs: digits, space, colon. Returns rects (no fill set). */
const SEG: Record<string, string> = {
  '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc',
  '5': 'afgcd', '6': 'afgedc', '7': 'abc', '8': 'abcdefg', '9': 'abcdfg',
};
function seg(s: string, x: number, y: number, h: number): string {
  const w = h * 0.54, t = h * 0.14, m = t * 0.6, hh = h / 2;
  let o = '', cx = x;
  const r = (X: number, Y0: number, W: number, H: number): string =>
    `<rect x="${n1(cx + X)}" y="${n1(y + Y0)}" width="${n1(W)}" height="${n1(H)}" rx="${n1(t * 0.3)}"/>`;
  const P: Record<string, number[]> = {
    a: [m, 0, w - 2 * m, t], g: [m, hh - t / 2, w - 2 * m, t], d: [m, h - t, w - 2 * m, t],
    f: [0, m, t, hh - m * 1.4], b: [w - t, m, t, hh - m * 1.4],
    e: [0, hh + m * 0.4, t, hh - m * 1.4], c: [w - t, hh + m * 0.4, t, hh - m * 1.4],
  };
  for (const ch of s) {
    if (ch === ' ') { cx += w * 0.8; continue; }
    if (ch === ':') { o += r(0, h * 0.24, t, t) + r(0, h * 0.64, t, t); cx += t + w * 0.4; continue; }
    for (const q of SEG[ch] ?? '') { const p = P[q]; o += r(p[0], p[1], p[2], p[3]); }
    cx += w * 1.4;
  }
  return o;
}

// ───────────────────────────────────────────────────────────── scenery kit
/** One pine as a path fragment (base centre x,y; height h). */
const pine = (x: number, y: number, h: number): string => {
  const w = h * 0.36;
  return `M${n1(x)} ${n1(y - h)}L${n1(x - w * 0.45)} ${n1(y - h * 0.62)}h${n1(w * 0.22)}L${n1(x - w * 0.75)} ${n1(y - h * 0.3)}h${n1(w * 0.4)}L${n1(x - w)} ${n1(y)}h${n1(w * 2)}L${n1(x + w * 0.35)} ${n1(y - h * 0.3)}h${n1(w * 0.4)}L${n1(x + w * 0.23)} ${n1(y - h * 0.62)}h${n1(w * 0.22)}Z`;
};
/** A ragged row of pines along a baseline function. */
function pines(R: () => number, x0: number, x1: number, step: number, base: (x: number) => number, hMin: number, hMax: number, fill: string): string {
  let d = '';
  for (let x = x0; x < x1; x += step * (0.6 + R() * 0.8)) d += pine(x, base(x) + 4, hMin + R() * (hMax - hMin));
  return `<path d="${d}" fill="${fill}"/>`;
}
/** Stars / falling snow: round dots. */
function dots(R: () => number, n: number, w: number, h: number, rMin: number, rMax: number, fill: string, op: number, y0 = 0): string {
  let d = '';
  for (let i = 0; i < n; i++) {
    const r = rMin + R() * (rMax - rMin);
    d += `M${n1(R() * w)} ${n1(y0 + R() * h)}h.01`;
    if (R() < 0.18) d += `m${n1(r)} ${n1(r)}h.01`;
  }
  return `<path d="${d}" stroke="${fill}" stroke-width="${n1((rMin + rMax))}" stroke-linecap="round" opacity="${op}" fill="none"/>`;
}
/** Chairlift chair seen from the front; grip (on the cable) at 0,0. ~130 wide, 190 tall. */
const chair = (x: number, y: number, s: number, rot: number, col: string, snow = '', hi = ''): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><g fill="none" stroke="${col}" stroke-linecap="round" stroke-linejoin="round">` +
  `<path d="M-9 0h18" stroke-width="9"/><path d="M0 0V96" stroke-width="6"/><path d="M-60 176V114Q-60 96 0 96Q60 96 60 114V176" stroke-width="6"/>` +
  `<path d="M-58 132H58M-58 146H58" stroke-width="7"/><path d="M-66 176H66" stroke-width="10"/><path d="M-60 176q-4 20 10 26M60 176q4 20-10 26" stroke-width="4"/></g>` +
  (hi ? `<path d="M2 4V94M62 116V172" fill="none" stroke="${hi}" stroke-width="2" stroke-linecap="round" opacity=".8"/>` : '') +
  (snow ? `<path d="M-64 172Q-50 160-30 166Q-8 158 14 165Q40 158 64 172Z" fill="${snow}"/><path d="M-56 128Q-30 121 0 126Q30 121 56 128Z" fill="${snow}"/>` : '') + `</g>`;
/** Lift tower seen from the front: crossarm centred at x,y; pole runs down h. */
const tower = (x: number, y: number, h: number, s: number, col: string, num = '', plate = '#e8eef4'): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-5 0L-9 ${n1(h / s)}h18L5 0Z" fill="${col}"/><path d="M-62-7H62V3H-62Z" fill="${col}"/>` +
  `<path d="M-74-14h26M48-14h26" stroke="${col}" stroke-width="5" stroke-linecap="round"/><g fill="${col}"><circle cx="-70" cy="-15" r="5.500"/><circle cx="-52" cy="-15" r="5.500"/><circle cx="52" cy="-15" r="5.500"/><circle cx="70" cy="-15" r="5.500"/></g>` +
  `<path d="M-30 3L-6 30M30 3L6 30" stroke="${col}" stroke-width="3"/>` +
  (num ? `<rect x="-15" y="36" width="30" height="30" rx="3" fill="${plate}" stroke="#10151c" stroke-width="2"/>${tx(0, 61, 27, num, '#10151c')}` : '') + `</g>`;
/** Little squirrel charm, ~26 tall, feet at 0,0. */
const squirrel = (x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M5 0C19-2 21-21 10-25C3-27-1-20 4-16C9-11 8-4 2 0Z" fill="#a8581a"/><ellipse cx="-1" cy="-6" rx="6.500" ry="8" fill="#cf7d2e"/><circle cx="-5" cy="-16" r="5.500" fill="#cf7d2e"/><path d="M-8-20l1-6 4 4z" fill="#a8581a"/><circle cx="-7" cy="-17" r="1.100" fill="#1a1010"/><ellipse cx="-3" cy="-4" rx="3" ry="5" fill="#f0d0a0"/></g>`;

// ───────────────────────────────────────────────────────────── people
// Bust parts drawn in the avatar coordinate space (200x200, face centred ~100,85).
const HEADP = 'M67 80C67 34 133 34 133 80C133 106 122 131 100 131C78 131 67 106 67 80Z';
const TORSO = 'M12 200C14 166 44 152 80 146H120C156 152 186 166 188 200Z';
const TORSO_L = 'M12 420V200C14 166 44 152 80 146H120C156 152 186 166 188 200V420Z';
const INK = '#1a1318';
/** Neck, ears, head with side shading and rim light. */
const hb = (skin: string, shade: string, rim = ''): string =>
  `<path d="M85 118V150Q100 162 115 150V118Z" fill="${shade}"/><path d="M85 124V149Q90 153 95 155L93 132Z" fill="${skin}" opacity=".55"/>` +
  `<ellipse cx="67" cy="94" rx="5" ry="9" fill="${skin}"/><ellipse cx="133" cy="94" rx="5" ry="9" fill="${shade}"/><path d="${HEADP}" fill="${skin}"/>` +
  `<path d="M109 37C105 60 109 72 106 84C104 97 111 103 108 112C106 122 104 128 99 131C122 131 133 106 133 80C133 60 126 44 109 37Z" fill="${shade}" opacity=".72"/>` +
  `<path d="M70 62Q80 50 96 48Q78 56 72 76Z" fill="#fff" opacity=".13"/>` +
  (rim ? `<path d="M131.500 68V80C131.500 105 121 129.500 100 129.500" fill="none" stroke="${rim}" stroke-width="2.200" opacity=".6"/>` : '');
type EyeKind = 'open' | 'wide' | 'laugh' | 'tired' | 'cold' | 'shut';
const eyes = (iris: string, kind: EyeKind = 'open'): string => {
  if (kind === 'laugh') return `<path d="M79.500 92Q87 85 94.500 92M105.500 92Q113 85 120.500 92" fill="none" stroke="${INK}" stroke-width="2.300" stroke-linecap="round"/>`;
  if (kind === 'shut') return `<path d="M79.500 89Q87 95 94.500 90M105.500 90Q113 95 120.500 89M80 86l-3-2M120 86l3-2" fill="none" stroke="${INK}" stroke-width="2.300" stroke-linecap="round"/>`;
  const one = (cx: number, white: string): string => {
    const r = kind === 'wide' ? 3.3 : 3;
    const top = kind === 'wide' ? 85.6 : kind === 'cold' || kind === 'tired' ? 88.4 : 86.8;
    return `<path d="M${cx - 7} 91.500Q${cx} ${top} ${cx + 7} 91Q${cx} 94.500 ${cx - 7} 91.500Z" fill="${white}"/><circle cx="${cx}" cy="${kind === 'wide' ? 90.2 : 90.7}" r="${r}" fill="${iris}"/><circle cx="${cx - 1.2}" cy="89.600" r=".9" fill="#fff"/>` +
      `<path d="M${cx - 7.5} 91.800Q${cx} ${top - 0.8} ${cx + 7.5} 91" fill="none" stroke="${INK}" stroke-width="1.900" stroke-linecap="round"/>` +
      (kind === 'tired' ? `<path d="M${cx - 6} 97Q${cx} 99.500 ${cx + 6} 96.500" fill="none" stroke="${INK}" stroke-width="1.100" opacity=".4" stroke-linecap="round"/>` : '');
  };
  return one(87, '#f1e9df') + one(113, '#b9ada6');
};
type BrowKind = 'flat' | 'soft' | 'up' | 'worry' | 'angry';
const brows = (col: string, kind: BrowKind = 'soft', w = 3.2): string => {
  const d = {
    soft: 'M77.500 79.500Q86 76.250 95 80M105 80Q114 76.250 122.500 79.500',
    flat: 'M77.500 81L95 82.500M105 82.500L122.500 81',
    up: 'M77 78Q86 72 95 77M105 77Q114 72 123 78',
    worry: 'M77.500 80.500Q85 74 95 74.500M105 74.500Q115 74 122.500 80.500',
    angry: 'M76.500 76.500Q86 78 96 83.500M104 83.500Q114 78 123.500 76.500',
  }[kind];
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
};
const nose = (col: string): string =>
  `<path d="M102 94Q105 104 105.500 108Q101 112 95 108.500" fill="none" stroke="${col}" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round"/>`;
type MouthKind = 'smile' | 'flat' | 'grin' | 'laugh' | 'half' | 'sing';
const mouth = (kind: MouthKind, col: string): string => {
  if (kind === 'grin') return `<path d="M85.500 112.500Q100 117 114.500 112.500Q112 123 100 123Q88 123 85.500 112.500Z" fill="#fff" stroke="${col}" stroke-width="1.600" stroke-linejoin="round"/><path d="M88 117.500Q100 121 112 117.500" fill="none" stroke="${col}" stroke-width=".8" opacity=".5"/>`;
  if (kind === 'laugh') return `<path d="M86 111.500Q100 115 114 111.500Q113 127 100 127Q87 127 86 111.500Z" fill="#4a1418"/><path d="M87.500 112.300Q100 115.800 112.500 112.300L111.500 116.500Q100 119 88.500 116.500Z" fill="#fff"/><path d="M92 124Q100 119 108 124Q100 128 92 124Z" fill="#c8504e"/>`;
  if (kind === 'sing') return `<path d="M89 110Q100 106 111 110Q114 129 100 130Q86 129 89 110Z" fill="#3a0e12"/><path d="M90.500 110.500Q100 107.500 109.500 110.500L109 114Q100 112 91 114Z" fill="#fff"/><path d="M93 126Q100 120 107 126Q100 130.500 93 126Z" fill="#c8504e"/>`;
  if (kind === 'half') return `<path d="M90 116.500Q100 119.500 111 113.500" fill="none" stroke="${col}" stroke-width="2.400" stroke-linecap="round"/><path d="M111 111.500q2 2 1 4.500" fill="none" stroke="${col}" stroke-width="1.300" stroke-linecap="round" opacity=".7"/>`;
  return `<path d="${kind === 'smile' ? 'M90 115.500Q100 121 110 115.500' : 'M91 116.500Q100 118 109 116.500'}" fill="none" stroke="${col}" stroke-width="2.400" stroke-linecap="round"/>`;
};
/** Beard / stubble mask over the jaw. */
const beard = (col: string, op = 1): string =>
  `<path d="M66 88C67 122 80 137 100 137C120 137 133 122 134 88C130 101 123 106 113 104Q100 99 87 104C77 106 70 101 66 88Z" fill="${col}" opacity="${op}"/>`;
/** Knit beanie with a ribbed cuff. */
const beanie = (c: string, d: string): string =>
  `<path d="M63 80C58 38 84 23 100 23C118 23 142 38 137 80Q100 62 63 80Z" fill="${c}"/><path d="M61 84Q100 66 139 84L139 70Q100 52 61 70Z" fill="${d}"/>` +
  `<path d="M70 68v12M80 64v12M90 61v12M100 60v12M110 61v12M120 64v12M130 68v12" stroke="#000" stroke-width="1.500" opacity=".3"/><path d="M76 40Q90 28 106 28" fill="none" stroke="#fff" stroke-width="3" opacity=".18" stroke-linecap="round"/>`;

interface Av { bg: [string, string, string]; rim: string; torso: string; back?: string; inTorso?: string; front: string; defs?: string }
function avatar(k: string, o: Av): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs>` +
    rg(`${k}-b`, [[0, o.bg[0]], [0.55, o.bg[1]], [1, o.bg[2]]], 0.28, 0.2, 1.05) +
    rg(`${k}-v`, [[0.55, '#000', 0], [1, '#000', 0.55]], 0.5, 0.42, 0.75) +
    rg(`${k}-r`, [[0, o.rim, 0.5], [1, o.rim, 0]], 0.82, 0.3, 0.5) +
    `<clipPath id="${k}-s"><path d="${TORSO}"/></clipPath>${o.defs ?? ''}</defs>` +
    `<rect width="200" height="200" fill="url(#${k}-b)"/><rect width="200" height="200" fill="url(#${k}-r)"/>${o.back ?? ''}` +
    `<path d="${TORSO}" fill="${o.torso}"/><g clip-path="url(#${k}-s)">${o.inTorso ?? ''}<path d="M104 140H200V200H112Z" fill="#000" opacity=".26"/>` +
    `<path d="M120 146C156 152 186 166 188 200" fill="none" stroke="${o.rim}" stroke-width="5" opacity=".75"/></g>${o.front}` +
    `<rect width="200" height="200" fill="url(#${k}-v)"/></svg>`;
}

// Rafi — orange Lift Ops beanie, dark curls, short beard, grease smudge
const RAF = { skin: '#c68a5c', shade: '#8f5a3a', hair: '#1a1214' };
const curls = (c: string): string =>
  `<g fill="${c}"><circle cx="63" cy="88" r="7"/><circle cx="61" cy="99" r="6.500"/><circle cx="65" cy="109" r="5.500"/><circle cx="137" cy="88" r="7"/><circle cx="139" cy="99" r="6.500"/><circle cx="135" cy="109" r="5.500"/></g>`;
const liftPatch = `<rect x="89" y="64" width="22" height="13" rx="2" fill="#16171a"/><path d="M95 74l5-8 5 8z" fill="#fff"/>`;
/** Staff jacket details inside the torso clip. */
const staffJacket = `<path d="M12 200C14 166 44 152 80 146L66 168L20 186ZM188 200C186 166 156 152 120 146L134 168L180 186Z" fill="#17181c"/><path d="M100 160V200" stroke="#17181c" stroke-width="3"/><path d="M40 184h22" stroke="#e8eef4" stroke-width="4" opacity=".8"/>`;
const collar = (l: string, d: string): string =>
  `<path d="M72 152L87 138L97 164L80 172Z" fill="${l}"/><path d="M128 152L113 138L103 164L120 172Z" fill="${d}"/>`;
function rafiFace(kind: 'tired' | 'laugh', b: string, bop: number): string {
  return curls(RAF.hair) + hb(RAF.skin, RAF.shade, '#bfe0ff') + collar('#22242a', '#101114') +
    eyes('#3a2416', kind) + brows(RAF.hair, kind === 'laugh' ? 'up' : 'soft', 3.4) + nose('#6e3e28') + beard(b, bop) +
    mouth(kind === 'laugh' ? 'laugh' : 'smile', '#e09a80') +
    `<g fill="${RAF.hair}"><circle cx="69" cy="82" r="5"/><circle cx="76" cy="78" r="4.500"/><circle cx="131" cy="82" r="5"/><circle cx="124" cy="78" r="4.500"/></g>` +
    beanie(OR, ORD) + liftPatch;
}
function avRafi(): string {
  const k = 'av_c4_rafi';
  return avatar(k, {
    bg: ['#4a6ea8', '#1c2c56', '#070c1c'], rim: '#bfe0ff', torso: OR, inTorso: staffJacket,
    front: rafiFace('tired', RAF.hair, 0.82) +
      `<path d="M72 98q8-4 17-1q-2 4-8 4.500q-7 1-9-3.500z" fill="#15120f" opacity=".6"/><path d="M76 103.500l9-1" stroke="#15120f" stroke-width="1.600" opacity=".45" stroke-linecap="round"/>`,
  });
}

// Lina — two messy buns, braces, purple hoodie, squirrel sticker
const LIN = { skin: '#d7a074', shade: '#a66e4c', hair: '#1c1418' };
const linaBuns = `<g fill="${LIN.hair}"><circle cx="66" cy="38" r="17"/><circle cx="134" cy="38" r="17"/><path d="M60 92C54 50 80 30 100 30C120 30 146 50 140 92L136 112H64Z"/></g>` +
  `<path d="M54 30q8-10 20-6M124 24q12-4 20 6M50 44l-5-4M150 44l5-4M60 22l-2-6M140 22l2-6" fill="none" stroke="${LIN.hair}" stroke-width="2.500" stroke-linecap="round"/><path d="M58 34q8-6 16-2M126 32q8-4 16 2" fill="none" stroke="#4a3a48" stroke-width="2" stroke-linecap="round"/>`;
const linaHair = `<path d="M65 86C58 46 84 31 100 31C118 31 142 46 135 86C131 68 121 56 103 52L100 58L97 52C79 56 69 68 65 86Z" fill="${LIN.hair}"/><path d="M74 58Q84 44 98 42M110 44Q122 50 128 62" fill="none" stroke="#4a3a48" stroke-width="2" stroke-linecap="round"/><path d="M66 84q-3 12 1 20M134 84q3 12-1 20" fill="none" stroke="${LIN.hair}" stroke-width="2.500" stroke-linecap="round"/>`;
const braces = `<path d="M88 116.500Q100 120.500 112 116.500" fill="none" stroke="#7c8ea0" stroke-width="1.300"/><path d="M91 115.500v3M95.500 116.500v3M100 117v3M104.500 116.500v3M109 115.500v3" stroke="#5a6c80" stroke-width="2"/>`;
function linaFace(kind: 'wide' | 'laugh'): string {
  return hb(LIN.skin, LIN.shade, '#ffd9a0') + eyes('#3a2416', kind) + brows(LIN.hair, 'up', 2.8) + nose('#8a5236') +
    (kind === 'laugh' ? mouth('laugh', '#5a2420') : mouth('grin', '#7a3a34') + braces) +
    `<ellipse cx="80" cy="104" rx="6" ry="3.500" fill="#e8705a" opacity=".3"/><ellipse cx="121" cy="104" rx="6" ry="3.500" fill="#e8705a" opacity=".25"/>` + linaHair;
}
function avLina(): string {
  const k = 'av_c4_lina';
  return avatar(k, {
    bg: ['#f0a85a', '#a2543a', '#24101a'], rim: '#ffe6a8', torso: PUR,
    back: linaBuns + `<path d="M48 176Q44 126 80 120H120Q156 126 152 176Z" fill="${PURD}"/>`,
    inTorso: `<path d="M92 158L88 196M108 158L112 196" stroke="#efe6f8" stroke-width="2.500" stroke-linecap="round"/><path d="M30 178Q50 166 70 168" fill="none" stroke="${PURL}" stroke-width="3" opacity=".7" stroke-linecap="round"/>`,
    front: `<path d="M66 150Q100 180 134 150L128 140Q100 162 72 140Z" fill="${PURL}"/>` + linaFace('wide') +
      `<circle cx="78" cy="106" r="8" fill="#fff8e8" stroke="#e0d4b8"/>` + squirrel(79, 112, 0.42),
  });
}

// Mama — loose patterned headscarf, grey-streaked hair, reading glasses, thermos
function avMama(): string {
  const k = 'av_c4_mama';
  const skin = '#cf9a70', shade = '#9c6a48', sc = '#2f7a78', scd = '#1d5354';
  return avatar(k, {
    bg: ['#d8a468', '#7a4a34', '#1a0e10'], rim: '#ffe0b0', torso: '#6a4a62',
    defs: `<pattern id="${k}-p" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><rect width="14" height="14" fill="${sc}"/><circle cx="4" cy="4" r="2" fill="#e8c46a"/><path d="M10 9l2 2-2 2-2-2z" fill="#d8684a"/></pattern>`,
    back: `<path d="M56 100C46 40 80 18 100 18C124 18 154 40 144 100C152 132 142 152 128 160H72C58 152 48 132 56 100Z" fill="url(#${k}-p)"/><path d="M112 20C150 34 152 70 144 100C152 132 142 152 128 160H112Z" fill="#000" opacity=".25"/>`,
    inTorso: `<path d="M84 146L100 176L116 146Z" fill="#e8dcc8"/><path d="M84 146L100 190M116 146L100 190" stroke="#523648" stroke-width="3"/>`,
    front: hb(skin, shade, '#ffe0b0') +
      `<path d="M70 142Q100 168 130 142L134 156Q100 184 66 156Z" fill="url(#${k}-p)"/><path d="M100 164Q118 160 134 148V156Q118 172 100 174Z" fill="#000" opacity=".25"/>` +
      eyes('#4a2c1a', 'tired') + brows('#5a4a48', 'worry', 2.8) + nose('#8a5236') + mouth('smile', '#8a3a3a') +
      `<path d="M82 108Q79 114 82 120M118 108Q121 114 118 120" fill="none" stroke="${shade}" stroke-width="1.200" opacity=".7" stroke-linecap="round"/>` +
      // hair under the scarf edge
      `<path d="M65 84C60 48 84 34 100 34C118 34 140 48 135 84C131 66 120 56 100 55C80 56 69 66 65 84Z" fill="#3a3034"/><path d="M76 58Q86 48 98 47M82 66Q90 56 100 55M112 49Q122 54 127 64" fill="none" stroke="#c8c8cc" stroke-width="2.200" stroke-linecap="round"/>` +
      `<path d="M60 88C52 42 82 24 100 24C120 24 148 42 140 88C136 62 122 46 100 45C78 46 64 62 60 88Z" fill="url(#${k}-p)"/><path d="M110 26C142 34 146 62 140 88C136 62 124 48 110 46Z" fill="#000" opacity=".22"/><path d="M62 84C60 56 78 44 100 44" fill="none" stroke="${scd}" stroke-width="1.500" opacity=".6"/>` +
      // reading glasses, low on the nose
      `<g fill="#fff" fill-opacity=".14" stroke="#c8a04a" stroke-width="1.800"><rect x="76" y="89" width="21" height="13" rx="5"/><rect x="103" y="89" width="21" height="13" rx="5"/></g><path d="M97 94q3-2 6 0M76 93l-9-3M124 93l9-3" fill="none" stroke="#c8a04a" stroke-width="1.600"/>` +
      // thermos in hand
      `<g transform="rotate(8 156 170)"><rect x="144" y="134" width="24" height="70" rx="5" fill="#2c6a5a"/><rect x="144" y="134" width="9" height="70" rx="4" fill="#fff" opacity=".2"/><rect x="146" y="124" width="20" height="14" rx="3" fill="#c8ccd0"/><rect x="144" y="150" width="24" height="5" fill="#c8ccd0"/></g>` +
      `<path d="M138 178q6-8 16-6l18 4q8 4 4 12l-22 6q-14 0-16-16z" fill="${skin}"/><path d="M146 180l24 5M146 187l22 4" stroke="${shade}" stroke-width="1.300" stroke-linecap="round"/>`,
  });
}

// Bram Kessler — silver swept-back hair, tan, square jaw, black shell, polished smile
const KES = { skin: '#cf8c5a', shade: '#9a5c34', hair: '#d6dae0', hairD: '#8d939c' };
const kesslerFace = (rim: string): string =>
  hb(KES.skin, KES.shade, rim) +
  // square jaw
  `<path d="M68 96L71 119Q76 130 90 132H100V118Z" fill="${KES.skin}"/><path d="M132 96L129 119Q124 130 110 132H100V118Z" fill="${KES.shade}" opacity=".85"/>` +
  `<path d="M70 150L86 134L99 172L82 178Z" fill="#23262e"/><path d="M130 150L114 134L101 172L118 178Z" fill="#0c0d10"/>` +
  `<path d="M65 80L63 104Q69 98 70 84ZM135 80L137 104Q131 98 130 84Z" fill="#c2c7cf"/>` +
  eyes('#5a7a8a', 'cold') + brows('#a8acb4', 'soft', 3.2) + nose('#8a5030') + mouth('grin', '#7a3c2c') +
  `<path d="M82 106Q78 113 81 121M118 106Q122 113 119 121M74 92l-4 3M74 96l-4-1M126 92l4 3" fill="none" stroke="#8a5030" stroke-width="1.200" opacity=".7" stroke-linecap="round"/>` +
  `<path d="M64 86C57 42 84 27 106 28C130 29 145 48 136 86C135 66 127 52 111 47C92 42 71 58 64 86Z" fill="${KES.hair}"/>` +
  `<path d="M72 60Q88 38 116 36M78 66Q92 46 120 44M86 70Q98 54 124 54" fill="none" stroke="${KES.hairD}" stroke-width="2" stroke-linecap="round"/><path d="M112 30C132 36 142 54 136 86C135 66 127 52 111 47Z" fill="#000" opacity=".2"/>`;
/** Small Silverpine logo: a white pine over an orange dot. */
const spLogo = (x: number, y: number, s = 1): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><circle r="9" fill="#23262e" stroke="#c8ccd4" stroke-width="1.200"/><path d="M0-7l5 8h-3l4 5h-12l4-5h-3z" fill="#f4f6f8"/><circle cx="0" cy="-8" r="0" fill="${OR}"/></g>`;
function avKessler(): string {
  const k = 'av_c4_kessler';
  return avatar(k, {
    bg: ['#9ab4cc', '#3c4e68', '#0b1120'], rim: '#ffe2a0', torso: '#16181d',
    inTorso: `<path d="M100 168V200" stroke="#3a3e48" stroke-width="3"/><path d="M28 180Q50 166 72 168" fill="none" stroke="#3a3e48" stroke-width="3" stroke-linecap="round"/>` + spLogo(62, 184),
    front: kesslerFace('#ffe2a0'),
  });
}

// Mags — close-cropped hair, ear-flap hat, reflective vest over a parka
function avMags(): string {
  const k = 'av_c4_mags';
  const skin = '#8a5636', shade = '#5c3622', hat = '#5a4a36', fur = '#e8dcc0';
  return avatar(k, {
    bg: ['#4a6a9a', '#18284c', '#060a18'], rim: '#ffb040', torso: '#22324e',
    back: `<path d="M57 70L52 128Q62 142 74 128L72 80ZM143 70L148 128Q138 142 126 128L128 80Z" fill="${hat}"/><path d="M143 70L148 128Q138 142 126 128L128 80Z" fill="#000" opacity=".3"/>`,
    inTorso: `<path d="M40 150L74 144L92 200H30ZM160 150L126 144L108 200H170Z" fill="#cfe82e"/><path d="M52 150l12 50M148 150l-12 50" stroke="#e8eef4" stroke-width="7"/><path d="M52 150l12 50M148 150l-12 50" stroke="#9aa4b0" stroke-width="1.500"/><path d="M30 186h60M110 186h60" stroke="#f08a1c" stroke-width="4" opacity=".9"/>`,
    front: hb(skin, shade, '#ffb040') + collar('#2c4066', '#16223a') +
      eyes('#2a1810', 'open') + brows('#1c1210', 'flat', 3) + nose('#4a2a18') + mouth('half', '#4a2020') +
      `<path d="M83 108Q80 113 82 119" fill="none" stroke="${shade}" stroke-width="1.200" opacity=".7" stroke-linecap="round"/>` +
      `<path d="M66 82Q100 60 134 82L133 74Q100 52 67 74Z" fill="#1c1412"/>` +
      `<path d="M62 78C57 36 84 21 100 21C118 21 143 36 138 78Q100 58 62 78Z" fill="${hat}"/><path d="M110 23C136 30 142 54 138 78Q124 68 110 64Z" fill="#000" opacity=".25"/>` +
      `<path d="M59 82Q100 60 141 82L141 66Q100 44 59 66Z" fill="${fur}"/><path d="M110 51Q128 56 141 66V82Q126 72 110 68Z" fill="#000" opacity=".2"/><path d="M68 66v9M80 61v9M92 58v9M108 58v9M120 61v9M132 66v9" stroke="#b8a888" stroke-width="1.500" stroke-linecap="round"/>` +
      `<path d="M57 78L53 126Q57 134 63 130L66 86Z" fill="${fur}"/><path d="M143 78L147 126Q143 134 137 130L134 86Z" fill="#b8a888"/><path d="M58 128q-2 12 4 20M142 128q2 12-4 20" fill="none" stroke="${hat}" stroke-width="2" stroke-linecap="round"/>`,
  });
}

// Dag — red patrol jacket, white cross, blond-grey beard, chest radio
function avDag(): string {
  const k = 'av_c4_dag';
  const skin = '#e0a888', shade = '#b0765a', hair = '#cfc4a0', hairD = '#9a906c';
  return avatar(k, {
    bg: ['#a8d0e8', '#44708e', '#0c1a28'], rim: '#ffffff', torso: '#c4222c',
    inTorso: `<path d="M12 200C14 166 44 152 80 146L70 166L20 190Z" fill="#8a141c"/><path d="M100 164V200" stroke="#7a1018" stroke-width="3"/>` +
      `<path d="M52 170h10v-9h10v9h10v10h-10v9h-10v-9h-10z" fill="#fff"/>` +
      `<rect x="122" y="162" width="22" height="34" rx="3" fill="#15171c"/><rect x="126" y="167" width="14" height="8" fill="#3a4450"/><path d="M127 180h12M127 185h12M127 190h12" stroke="#3a4450" stroke-width="1.500"/><path d="M140 162v-16" stroke="#15171c" stroke-width="3" stroke-linecap="round"/><path d="M124 164q-8-4-4-10q4-5-2-8" fill="none" stroke="#15171c" stroke-width="2"/>`,
    front: hb(skin, shade, '#fff') + collar('#d8343e', '#8a141c') +
      eyes('#4a7a9a', 'open') + brows(hairD, 'flat', 3.4) + nose('#9a5a44') +
      `<ellipse cx="79" cy="103" rx="7" ry="4" fill="#d8604e" opacity=".35"/><ellipse cx="121" cy="103" rx="7" ry="4" fill="#d8604e" opacity=".3"/>` +
      beard(hair) + `<path d="M108 103C122 105 131 100 134 88C133 122 120 137 100 137Z" fill="#000" opacity=".16"/><path d="M76 112q4 12 12 18M90 116q2 10 6 16M110 116q-2 10-6 16M124 112q-4 12-12 18" fill="none" stroke="${hairD}" stroke-width="1.500" stroke-linecap="round" opacity=".8"/>` +
      mouth('flat', '#7a3a34') +
      `<path d="M73 91l-5 2M73 95l-5-1M127 91l5 2M127 95l5-1M82 70q6-1.500 12 0M106 70q6-1.500 12 0" fill="none" stroke="${shade}" stroke-width="1.100" opacity=".55" stroke-linecap="round"/>` +
      `<path d="M64 84C58 42 84 28 102 28C124 28 144 44 136 84C133 66 124 54 108 51C90 48 70 62 64 84Z" fill="${hair}"/><path d="M74 58Q88 42 108 40M84 62Q96 50 116 50" fill="none" stroke="${hairD}" stroke-width="2" stroke-linecap="round"/><path d="M112 30C132 36 142 54 136 84C133 66 124 54 108 51Z" fill="#000" opacity=".18"/>`,
  });
}

// Wes — trucker cap, flannel, stubble, a grin with angry eyes
const WES = { skin: '#dfae8c', shade: '#ae7a5c', hair: '#5a3e28' };
const flannel = (id: string): string =>
  `<pattern id="${id}" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)"><rect width="26" height="26" fill="#9a2a26"/><path d="M0 0h13v26H0z" fill="#000" opacity=".45"/><path d="M0 0h26v13H0z" fill="#000" opacity=".45"/><path d="M19.500 0v26M0 19.500h26" stroke="#e8c88a" stroke-width="1" opacity=".5"/></pattern>`;
const truckerCap = `<path d="M63 78C60 38 84 23 100 23C118 23 140 38 137 78Q100 64 63 78Z" fill="#2c3a34"/><path d="M78 74C74 44 88 26 100 25C114 26 126 44 122 74Q100 66 78 74Z" fill="#e8e2d0"/><path d="M110 27C120 32 126 50 122 74Q116 70 110 69Z" fill="#000" opacity=".15"/>` +
  `<path d="M66 60l10 4M66 68l10 3M68 50l9 6M134 60l-10 4M134 68l-10 3M132 50l-9 6" stroke="#fff" stroke-width="1" opacity=".25"/><circle cx="100" cy="24" r="2.500" fill="#2c3a34"/>` +
  `<path d="M90 44h20v14H90z" fill="#c8862a"/><path d="M94 54l6-8 6 8z" fill="#2c3a34"/>` +
  `<path d="M56 82Q100 62 144 82Q148 90 140 90Q100 76 60 90Q52 90 56 82Z" fill="#1a241f"/><path d="M62 87Q100 73 138 87" fill="none" stroke="#fff" stroke-width="1.200" opacity=".2"/>`;
function wesFace(sing: boolean, rim: string): string {
  return `<path d="M64 84L62 112Q68 108 70 90ZM136 84L138 112Q132 108 130 90Z" fill="${WES.hair}"/>` + hb(WES.skin, WES.shade, rim) +
    `<path d="M84 146L100 172L116 146Q100 156 84 146Z" fill="#e8e4dc"/>` +
    eyes('#5a6a4a', sing ? 'shut' : 'cold') + brows(WES.hair, sing ? 'worry' : 'angry', 3.6) + nose('#9a5a44') + beard('#4a3424', 0.42) +
    (sing ? mouth('sing', '#5a2420') : mouth('grin', '#7a3a34') + `<path d="M84 109q-3 4-1 9M116 109q3 4 1 9" fill="none" stroke="#9a5a44" stroke-width="1.300" stroke-linecap="round"/>`) +
    truckerCap;
}
function avWes(): string {
  const k = 'av_c4_wes';
  return avatar(k, {
    bg: ['#b0406e', '#46183c', '#100610'], rim: '#58e0c0', torso: `url(#${k}-pl)`, defs: flannel(`${k}-pl`),
    inTorso: `<path d="M100 172V200" stroke="#3a1010" stroke-width="2.500"/><circle cx="100" cy="186" r="2.200" fill="#e8dcc0"/>`,
    front: wesFace(false, '#58e0c0') +
      `<path d="M70 150L86 138L99 170L84 178Z" fill="#b83430"/><path d="M130 150L114 138L101 170L116 178Z" fill="#5a1614"/>`,
  });
}

// Det. Abara — short natural hair, navy wool coat, notebook, level gaze
function avAbara(): string {
  const k = 'av_c4_abara';
  const skin = '#7c4c30', shade = '#54301c', hair = '#17110f';
  return avatar(k, {
    bg: ['#8a9a9c', '#36464c', '#0a1114'], rim: '#d6e8f4', torso: '#1c2a4a',
    back: `<path d="M62 92C54 42 82 24 100 24C120 24 146 42 138 92Z" fill="${hair}"/>`,
    inTorso: `<path d="M84 146L100 182L116 146Z" fill="#b8b0a4"/><path d="M84 146L100 182L116 146" fill="none" stroke="#8a8478" stroke-width="2"/>` +
      `<path d="M70 148L84 142L100 194L88 200H66ZM130 148L116 142L100 194L112 200H134Z" fill="#26386a"/><circle cx="96" cy="196" r="3" fill="#0e1830"/>`,
    front: hb(skin, shade, '#d6e8f4') +
      `<path d="M66 156L84 132L96 160L78 176Z" fill="#2c4078"/><path d="M134 156L116 132L104 160L122 176Z" fill="#111c38"/>` +
      eyes('#2a1810', 'cold') + brows(hair, 'flat', 3) + nose('#4a2a18') +
      `<path d="M90 115Q95 112.500 100 114Q105 112.500 110 115Q100 120 90 115Z" fill="#6a2c2a"/><path d="M90 115Q100 116 110 115" fill="none" stroke="#000" stroke-width=".9" opacity=".45"/>` +
      `<circle cx="67" cy="103" r="2" fill="#e8d48a"/><circle cx="133" cy="103" r="2" fill="#a8944a"/>` +
      `<path d="M64 86C57 44 84 29 100 29C120 29 143 44 136 86C134 68 124 56 100 54C78 56 66 68 64 86Z" fill="${hair}"/><path d="M72 50q3-4 6-2M84 41q3-3 6-1M98 37q3-3 6 0M112 41q3-2 6 1M124 50q2-3 5 0M80 59q3-3 6-1M116 58q3-2 6 1" fill="none" stroke="#3a302c" stroke-width="1.800" stroke-linecap="round"/>` +
      // notebook + pen
      `<g transform="rotate(-10 44 170)"><rect x="22" y="146" width="44" height="58" rx="3" fill="#15171c"/><rect x="26" y="152" width="36" height="52" fill="#efe8d8"/><path d="M30 162h28M30 170h28M30 178h20M30 186h26" stroke="#8a8478" stroke-width="1.500"/><path d="M26 148v6M34 148v6M42 148v6M50 148v6M58 148v6" stroke="#c8ccd0" stroke-width="2" stroke-linecap="round"/></g>` +
      `<path d="M56 186q10-8 20-2l4 14H52z" fill="${skin}"/><path d="M48 150l26 44" stroke="#c8a04a" stroke-width="3" stroke-linecap="round"/>`,
  });
}

// ───────────────────────────────────────────────────────────── cover_case4
function cover(): string {
  const k = 'cover_case4', R = rng(41);
  const defs = lg(`${k}sk`, [[0, '#050818'], [0.45, '#0e1a3e'], [1, '#22346a']]) +
    lg(`${k}mt`, [[0, '#4a66a4'], [0.35, '#2a3c72'], [1, '#0e1630']]) +
    rg(`${k}gl`, [[0, '#ffd27a', 0.95], [0.18, '#ff8a2a', 0.7], [0.5, '#e04a10', 0.22], [1, '#e04a10', 0]]) +
    rg(`${k}hl`, [[0, '#fff6d8', 1], [0.3, '#ffe9a0', 0.5], [1, '#ffe9a0', 0]]) +
    lg(`${k}sm`, [[0, '#2a2c40', 0], [0.3, '#4a4258', 0.9], [0.85, '#7a4a3a', 0.9], [1, '#ff9a4a', 0.9]]) +
    bl(`${k}b2`, 2) + bl(`${k}b9`, 9) + bl(`${k}b22`, 22);
  const body =
    `<rect width="600" height="800" fill="url(#${k}sk)"/>` + dots(R, 60, 600, 420, 0.5, 1.1, '#dfe8ff', 0.8) +
    // smoke column, sheared by the wind
    `<g filter="url(#${k}b22)"><path d="M408 244Q380 170 330 120Q250 50 120 20L60 90Q220 90 300 160Q360 200 436 246Z" fill="url(#${k}sm)"/></g>` +
    `<g filter="url(#${k}b9)"><path d="M414 240Q396 190 356 150Q300 100 210 70Q300 120 344 170Q380 210 430 240Z" fill="#6a5058" opacity=".95"/></g>` +
    `<path d="M0 372L70 330L130 356L200 300L262 340L330 290L400 330H0Z" fill="#101b40"/>` +
    // the mountain
    `<path d="M0 560Q110 500 190 420T330 300Q384 252 428 246Q474 254 520 300T600 372V800H0Z" fill="url(#${k}mt)"/>` +
    `<path d="M428 246Q384 252 330 300T190 420Q280 380 330 340Q380 290 428 246Z" fill="#8aa6dc" opacity=".35"/>` +
    `<path d="M428 246Q474 254 520 300T600 372V470Q540 380 500 330Q460 280 428 246Z" fill="#060a1c" opacity=".4"/>` +
    // fire at the summit
    `<circle cx="426" cy="232" r="170" fill="url(#${k}gl)"/><ellipse cx="420" cy="300" rx="120" ry="40" fill="#ff8a2a" opacity=".22" filter="url(#${k}b22)"/>` +
    `<path d="M408 250L426 210L444 250Z" fill="#0a0608"/><path d="M446 250v-26h8v26z" fill="#0a0608"/>` +
    `<g filter="url(#${k}b2)"><path d="M410 236Q404 214 416 200Q416 214 424 216Q420 196 432 184Q434 204 442 212Q448 222 444 238Q430 246 410 236Z" fill="#ff7a1a"/><path d="M418 234Q416 220 424 212Q426 222 432 222Q432 210 436 206Q442 224 436 236Z" fill="#ffe08a"/></g>` +
    // timber bands
    pines(R, -10, 300, 24, (x) => 560 - x * 0.62 + Math.sin(x / 40) * 14, 26, 50, '#0a1228') +
    pines(R, 470, 610, 20, (x) => 290 + (x - 470) * 0.75, 20, 38, '#070c1e') +
    pines(R, -10, 250, 34, (x) => 660 - x * 0.5, 50, 90, '#070c1e') +
    // cat track + one sled headlight
    `<path d="M600 610Q520 566 548 486T492 376Q520 318 454 266" fill="none" stroke="#6a86c4" stroke-width="7" stroke-linecap="round" opacity=".45"/>` +
    `<path d="M600 610Q520 566 548 486T492 376Q520 318 454 266" fill="none" stroke="#a8c0f0" stroke-width="1.500" stroke-dasharray="2 9" opacity=".6"/>` +
    `<path d="M512 420L470 330L520 322Z" fill="#fff0b0" opacity=".2" filter="url(#${k}b9)"/><circle cx="512" cy="420" r="26" fill="url(#${k}hl)"/><path d="M506 424h14l3 7h-20z" fill="#05060c"/><circle cx="512" cy="420" r="3" fill="#fff"/>` +
    // lift line
    `<path d="M-20 505L330 394L388 316L412 281L424 258" fill="none" stroke="#05070f" stroke-width="2.500"/><path d="M-20 505L330 394" fill="none" stroke="#ff9a4d" stroke-width="1" opacity=".5" transform="translate(0 -2)"/>` +
    tower(332, 400, 150, 0.8, '#05070f') + tower(388, 320, 70, 0.42, '#05070f') + tower(412, 284, 34, 0.24, '#05070f') +
    chair(388, 316, 0.16, 0, '#05070f') + chair(262, 416, 0.34, -3, '#05070f') +
    // foreground
    pines(R, 300, 640, 70, () => 830, 150, 280, '#03050c') + pines(R, -30, 120, 60, () => 840, 120, 200, '#03050c') +
    `<g filter="url(#${k}b22)" opacity=".5"><ellipse cx="160" cy="790" rx="200" ry="30" fill="#000"/></g>` +
    chair(186, 440, 1.36, 5, '#04060d', '#c4d6f4', '#ff9a4d') +
    dots(R, 30, 600, 800, 1, 2.2, '#e8f0ff', 0.55) + `<g filter="url(#${k}b2)">${dots(R, 16, 600, 800, 3, 5, '#e8f0ff', 0.35)}</g>`;
  return frame(k, 600, 800, defs, body, 0.18, 0.6);
}

// ───────────────────────────────────────────────────────────── wall_c4_lock
/** Painted timber board with snow cap. Needs filter `${k}wd`. */
const plank = (k: string, x: number, y: number, w: number, h: number, c: string, shade = 0.3): string =>
  `<rect x="${x + 6}" y="${y + 10}" width="${w}" height="${h}" fill="#000" opacity=".4"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${c}"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" filter="url(#${k}wd)" opacity=".55"/><path d="M${x} ${y + h - 9}h${w}v4q0 5-5 5h${10 - w}q-5 0-5-5z" fill="#000" opacity="${shade}"/>` +
  `<path d="M${x} ${y + 3}h${w}" stroke="#fff" stroke-width="2" opacity=".18"/>`;
const snowCap = (x: number, y: number, w: number, t = 14): string =>
  `<path d="M${x - 5} ${y + 5}Q${x - 6} ${y - t} ${n1(x + w * 0.2)} ${y - t}Q${n1(x + w * 0.5)} ${n1(y - t * 1.5)} ${n1(x + w * 0.8)} ${y - t}Q${x + w + 6} ${y - t} ${x + w + 5} ${y + 5}Q${n1(x + w * 0.7)} ${y + 10} ${n1(x + w * 0.45)} ${y + 3}Q${n1(x + w * 0.2)} ${y + 12} ${x - 5} ${y + 5}Z" fill="#f4f8ff"/>`;
const bolts = (pts: number[][], r = 5): string =>
  pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#2a2c34"/><circle cx="${x - 1}" cy="${y - 1}" r="${n1(r * 0.45)}" fill="#9aa0aa"/>`).join('');
/** Faded Lift Ops beanie hanging limp from a point. */
const hangBeanie = (x: number, y: number, s: number, rot: number): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0-4Q-30 8-36 52Q-38 74-32 86H30Q36 70 32 46Q26 6 0-4Z" fill="#d97a3c"/><path d="M4-2Q26 10 32 46Q36 70 30 86H10Q20 50 4-2Z" fill="#000" opacity=".22"/>` +
  `<path d="M-36 82H34V104Q0 112-36 104Z" fill="#b85c24"/><path d="M-26 84v20M-14 85v22M-2 85v23M10 85v22M22 84v20" stroke="#000" stroke-width="2" opacity=".28"/><path d="M-24 30Q-18 14-4 8" fill="none" stroke="#ffd0a0" stroke-width="3" opacity=".4" stroke-linecap="round"/><circle cx="0" cy="-6" r="6" fill="#2a2c34"/></g>`;
function wallLock(): string {
  const k = 'wall_c4_lock', R = rng(12);
  const defs = lg(`${k}sk`, [[0, '#141640'], [0.28, '#3c2a66'], [0.5, '#a8466e'], [0.66, '#f08048'], [0.76, '#ffd690']]) +
    rg(`${k}sun`, [[0, '#fff4c8', 1], [0.25, '#ffc070', 0.7], [1, '#ff9a4a', 0]]) +
    lg(`${k}sn`, [[0, '#c890a8'], [0.25, '#6a5a94'], [1, '#161a40']]) +
    lg(`${k}po`, [[0, '#1a1c2a'], [0.6, '#30303e'], [0.86, '#c8683a'], [1, '#3a2a30']], 1, 0) +
    tex(`${k}wd`, 0.012, 0.5, '0.08 0.04 0.02', -1.6, 0.95, 5) + bl(`${k}b3`, 3) + bl(`${k}b14`, 14);
  const body =
    `<rect width="600" height="1300" fill="url(#${k}sk)"/><circle cx="430" cy="930" r="330" fill="url(#${k}sun)"/>` +
    dots(R, 40, 600, 300, 0.5, 1, '#fff', 0.6) +
    `<path d="M0 330Q160 300 330 318T600 296V312Q470 336 330 330T0 346Z" fill="#ffb0a0" opacity=".3" filter="url(#${k}b3)"/>` +
    `<path d="M0 900L60 850L130 880L210 820L280 870L360 800L440 860L520 810L600 850V1000H0Z" fill="#7a4a7e"/>` +
    `<path d="M0 950L90 900L170 936L260 880L350 930L450 890L540 930L600 906V1040H0Z" fill="#4a346e"/>` +
    `<path d="M0 990Q150 950 300 972T600 950V1300H0Z" fill="url(#${k}sn)"/>` +
    pines(R, -10, 620, 30, (x) => 978 - Math.sin(x / 90) * 12, 40, 80, '#1a1638') +
    `<path d="M0 1060Q200 1020 400 1050T600 1030" fill="none" stroke="#ffb890" stroke-width="3" opacity=".25"/>` +
    // top terminal + haul rope
    `<path d="M-20 60H300Q360 60 384 110L410 190H-20Z" fill="#12112a"/><path d="M-20 190H410L400 214H-20Z" fill="#0b0a1c"/><path d="M-20 62H300Q360 62 384 112" fill="none" stroke="#f08a5a" stroke-width="2.500" opacity=".5"/>` +
    `<path d="M380 130L640 250M360 196L640 330" stroke="#0b0a1c" stroke-width="3.500"/>` + chair(520, 195, 0.6, 3, '#0b0a1c', '', '#f08a5a') +
    // post
    `<rect x="92" y="200" width="56" height="1110" fill="url(#${k}po)"/><path d="M92 214h56" stroke="#000" stroke-width="6" opacity=".4"/>` +
    // main sign
    plank(k, 62, 404, 476, 262, '#5c3a22') + `<rect x="74" y="416" width="452" height="238" rx="3" fill="none" stroke="#f0dcb4" stroke-width="3" opacity=".7"/>` +
    tx(300, 520, 108, 'EAGLE', '#f6e8c8', SERIF, `${BOLD} ${MID} ${fit(330)}`) +
    `<path d="M120 540H480" stroke="#f0dcb4" stroke-width="3" opacity=".8"/>` +
    tx(300, 580, 34, 'TOP TERMINAL', '#f0dcb4', SANS, `${BOLD} ${MID} ${fit(300)} letter-spacing="3"`) +
    tx(300, 636, 46, 'ELEV. 11,240 FT', '#fff3d6', SANS, `${BOLD} ${MID} ${fit(400)}`) +
    bolts([[104, 428], [104, 642], [136, 428], [136, 642]]) + snowCap(62, 404, 476, 16) +
    // arrow board
    `<path d="M96 696H452L512 730L452 764H96Z" fill="#000" opacity=".4" transform="translate(6 9)"/><path d="M96 696H452L512 730L452 764H96Z" fill="#4e3220"/><path d="M96 696H452L512 730L452 764H96Z" filter="url(#${k}wd)" opacity=".5"/>` +
    tx(250, 744, 38, 'THE AERIE', '#f6e8c8', SERIF, `${BOLD} ${MID} ${fit(230)}`) +
    `<path d="M392 730h66M436 714l24 16-24 16" fill="none" stroke="#f6e8c8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` + bolts([[110, 730], [136, 730]], 4) +
    `<path d="M92 694Q150 682 220 690T380 688Q430 684 452 694L456 700Q300 706 92 702Z" fill="#f4f8ff"/>` +
    // his father's beanie on the corner
    hangBeanie(520, 410, 0.95, 8) +
    // the other lift: smaller, half in shadow
    `<rect x="498" y="1040" width="18" height="270" fill="#14122c"/>` + plank(k, 356, 1052, 228, 84, '#2c2030', 0.4) +
    tx(452, 1086, 24, 'LYNX LIFT', '#a89880', SANS, `${BOLD} ${MID} ${fit(128)}`) +
    `<path d="M548 1066v20M540 1078l8 9 8-9" fill="none" stroke="#a89880" stroke-width="3.500" stroke-linecap="round" stroke-linejoin="round"/>` +
    tx(470, 1122, 24, 'TOP 10,560 FT', '#a89880', SANS, `${BOLD} ${MID} ${fit(190)}`) +
    // foreground drift
    `<path d="M0 1210Q120 1160 260 1196T600 1170V1300H0Z" fill="#221f52"/><path d="M0 1210Q120 1160 260 1196T600 1170" fill="none" stroke="#f0a080" stroke-width="2.500" opacity=".4"/>` +
    pines(R, -30, 60, 50, () => 1310, 200, 260, '#0c0a20') +
    `<rect width="600" height="1300" fill="#0a0820" opacity=".12"/>`;
  return frame(k, 600, 1300, defs, body, 0.14, 0.5);
}

// ───────────────────────────────────────────────────────────── wall_c4_home
function wallHome(): string {
  const k = 'wall_c4_home', R = rng(77);
  const defs = lg(`${k}sk`, [[0, '#050818'], [0.3, '#0e1c48'], [0.62, '#2c4a8c'], [1, '#6f86c0']]) +
    lg(`${k}sn`, [[0, '#7c98d0'], [0.3, '#3c5492'], [1, '#101a3e']]) + rg(`${k}gl`, [[0, '#a8c0ff', 0.5], [1, '#a8c0ff', 0]]) + bl(`${k}b3`, 3);
  const P = (z: number, off: number, up: number): number[] => [300 + off / z, 330 - up / z];
  let trees = '', far = '';
  for (let z = 0.8; z < 9; z *= 1.27) {
    for (const sgn of [-1, 1]) {
      const j = 0.9 + R() * 0.25, d = pine(300 + (sgn * (400 + R() * 60)) / z, 330 + 300 / z + 4, (340 * j) / z);
      if (z > 2.6) far += d; else trees += d;
      if (z < 4) trees += pine(300 + (sgn * (560 + R() * 80)) / z, 330 + 310 / z, (380 * j) / z);
    }
  }
  const zs: [number, string][] = [[1, '7'], [1.5, '8'], [2.2, '9'], [3.6, ''], [6.5, '']];
  let tw = '', cabL = 'M', cabR = 'M';
  const cab = (z: number, sgn: number): string => { const p = P(z, 110 + sgn * 84, 220); return `${n1(p[0])} ${n1(p[1])}`; };
  cabL += cab(0.4, -1); cabR += cab(0.4, 1);
  for (const [z, num] of zs) {
    const [x, y] = P(z, 110, 200);
    tw = tower(Math.round(x), Math.round(y), 500 / z, 1.35 / z, z > 2 ? '#0b1230' : '#070b1c', num, '#dfe8f6') + `<path d="M${n1(x - 4 / z)} ${n1(y + 6 / z)}L${n1(x - 9 / z)} ${n1(y + 500 / z)}" stroke="#8aa8e8" stroke-width="${n1(2.5 / z)}" opacity=".55"/>` + tw;
    cabL += `L${cab(z, -1)}`; cabR += `L${cab(z, 1)}`;
  }
  cabL += `L${cab(30, -1)}`; cabR += `L${cab(30, 1)}`;
  const ch = (z: number, sgn: number): string => { const p = P(z, 110 + sgn * 84, 220); return chair(Math.round(p[0]), Math.round(p[1]), 0.72 / z, 0, '#070b1c', z < 1.5 ? '#9ab4e8' : ''); };
  const body =
    `<rect width="600" height="1300" fill="url(#${k}sk)"/>` + dots(R, 80, 600, 520, 0.5, 1.2, '#e6eeff', 0.85) +
    `<ellipse cx="300" cy="350" rx="300" ry="90" fill="url(#${k}gl)"/>` +
    `<path d="M0 470Q150 360 300 332Q450 360 600 470V1300H0Z" fill="url(#${k}sn)"/>` +
    `<path d="${far}" fill="#0d1838"/><path d="${trees}" fill="#060a1c"/>` +
    // corduroy converging on the line
    `<path d="M300 334L120 1300M300 334L250 1300M300 334L380 1300M300 334L520 1300M300 334L-40 1300M300 334L680 1300" stroke="#a8c0f0" stroke-width="2" opacity=".1"/>` +
    `<path d="M0 760Q300 700 600 770V1300H0Z" fill="#0c1434" opacity=".35"/>` +
    tw + `<path d="${cabL}" fill="none" stroke="#070b1c" stroke-width="2.500"/><path d="${cabR}" fill="none" stroke="#070b1c" stroke-width="2.500"/>` +
    `<path d="${cabL}" fill="none" stroke="#cfe0ff" stroke-width="1" opacity=".7" stroke-dasharray="40 90" transform="translate(0 -1.500)"/><path d="${cabR}" fill="none" stroke="#cfe0ff" stroke-width="1" opacity=".7" stroke-dasharray="30 120" transform="translate(0 -1.500)"/>` +
    ch(1.25, -1) + ch(1.85, 1) + ch(2.9, -1);
  return frame(k, 600, 1300, defs, body, 0.14, 0.55);
}

// ───────────────────────────────────────────────────────────── map_c4
function mapC4(): string {
  const k = 'map_c4', R = rng(5);
  const defs = lg(`${k}mt`, [[0, '#ffffff'], [1, '#b4c8e6']]) + rg(`${k}bg`, [[0, '#1c3058'], [1, '#0a1228']], 0.5, 0.45, 0.8) + bl(`${k}b6`, 6);
  // forest: little pines scattered over the flanks, kept off the lift, the bowl and the town
  const A = [240, 480], B = [496, 72];
  let trees = '';
  for (let i = 0; i < 330; i++) {
    const x = 150 + R() * 640, y = 80 + R() * 510;
    const t = ((x - A[0]) * (B[0] - A[0]) + (y - A[1]) * (B[1] - A[1])) / 232000;
    const dl = Math.abs((x - A[0]) * 408 + (y - A[1]) * 256) / 481.7;
    const inMt = y > 70 + Math.abs(x - 496) * (x < 496 ? 1.28 : 2.6) && y < 548 && x < 668;
    const ridge = x > 664 + (600 - y) * 0.1 && y > 260 - (x - 700) * 0.5;
    if (!(inMt || ridge) && !(x > 600 && x < 700 && y > 380)) continue;
    if (dl < 24 && t > -0.05 && t < 1.05) continue;
    if ((x - 338) ** 2 / 4900 + (y - 250) ** 2 / 2100 < 1) continue;
    if (x < 290 && y > 440) continue;
    if (inMt && y < 150 + R() * 60) continue;
    if (Math.abs(x - 688) < 30 && Math.abs(y - 348) < 24) continue;
    const s = 4 + R() * 3;
    trees += `M${n1(x)} ${n1(y - s * 2)}l${n1(-s)} ${n1(s * 2.2)}h${n1(s * 2)}z`;
  }
  let ticks = '', nums = '';
  for (let i = 1; i <= 14; i++) {
    const x = A[0] + ((B[0] - A[0]) * i) / 15, y = A[1] + ((B[1] - A[1]) * i) / 15;
    ticks += `M${n1(x - 6)} ${n1(y - 3.8)}l12 7.600`;
    nums += `<text x="${n1(x + 14)}" y="${n1(y + 12)}">${i}</text>`;
  }
  const hs: number[] = [396, 436, 476, 516, 540, 570], vs: number[] = [40, 64, 96, 144, 192];
  let blocks = '';
  for (let i = 0; i < hs.length - 1; i++) for (let j = 0; j < vs.length - 1; j++)
    if (R() < 0.9) blocks += `M${vs[j] + 5} ${hs[i] + 5}h${vs[j + 1] - vs[j] - 10}v${hs[i + 1] - hs[i] - 10}h${-(vs[j + 1] - vs[j] - 10)}z`;
  const lab = (x: number, y: number, s: string, size = 12, rot = 0, fill = '#dfe8f6', sp = 2): string =>
    `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${SANS} ${BOLD} ${MID} letter-spacing="${sp}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}>${s}</text>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}bg)"/>` +
    `<path d="M0 60H800M0 180H800M0 300H800M0 420H800M0 540H800M100 0V600M300 0V600M500 0V600M700 0V600" stroke="#5a78b0" stroke-width=".8" opacity=".14"/>` +
    // massif
    `<path d="M130 548Q170 430 250 330Q340 220 420 130Q466 82 496 54Q530 92 566 170Q616 280 642 400Q660 480 650 548Q400 580 130 548Z" fill="#000" opacity=".5" filter="url(#${k}b6)" transform="translate(6 10)"/>` +
    `<path d="M130 548Q170 430 250 330Q340 220 420 130Q466 82 496 54Q530 92 566 170Q616 280 642 400Q660 480 650 548Q400 580 130 548Z" fill="url(#${k}mt)"/>` +
    `<path d="M496 54Q530 92 566 170Q616 280 642 400Q660 480 650 548Q590 420 548 290Q512 170 496 54Z" fill="#6f8cc0" opacity=".55"/>` +
    `<path d="M496 54Q480 150 420 250M496 54Q520 180 560 300M420 130Q400 200 330 270" fill="none" stroke="#8aa4d0" stroke-width="1.500" opacity=".6"/>` +
    // Ridge Rd ridge
    `<path d="M664 600Q672 480 700 400Q740 300 800 250V600Z" fill="#9fb4d8"/><path d="M664 600Q672 480 700 400Q740 300 800 250" fill="none" stroke="#dfe8f6" stroke-width="2"/>` +
    // Ptarmigan Bowl
    `<ellipse cx="338" cy="250" rx="70" ry="46" fill="#d2e2f8"/><path d="M276 236Q338 196 400 232M284 256Q338 226 394 252M296 276Q338 254 382 272" fill="none" stroke="#8aa4d0" stroke-width="1.300"/>` +
    `<path d="${trees}" fill="#1f6a4c"/>` +
    // runs
    `<g fill="none" stroke-width="3" stroke-linecap="round"><path d="M500 76Q566 200 560 330Q540 440 300 476" stroke="#3a86dc"/><path d="M488 80Q560 150 610 300Q630 420 560 500Q420 540 270 496" stroke="#2f9e5e"/><path d="M478 96Q372 150 318 240Q276 340 246 456" stroke="#10151c" stroke-dasharray="7 5"/></g>` +
    `<rect x="556" y="318" width="10" height="10" fill="#3a86dc" stroke="#fff"/><circle cx="614" cy="330" r="5.500" fill="#2f9e5e" stroke="#fff"/><path d="M288 318l6 7-6 7-6-7z" fill="#10151c" stroke="#fff"/>` +
    // cat track
    `<path d="M256 488Q350 470 392 400Q350 344 430 300Q486 268 452 208Q480 160 530 128Q540 96 506 78" fill="none" stroke="#c8862a" stroke-width="2.500" stroke-dasharray="2 5" stroke-linecap="round"/>` +
    lab(470, 330, 'CAT TRACK', 9, -38, '#8a5a14', 1.5) +
    // Eagle lift
    `<path d="M240 480L496 72" stroke="#fff" stroke-width="6" opacity=".9"/><path d="M240 480L496 72" stroke="#d8262c" stroke-width="2.500" stroke-dasharray="9 5"/><path d="${ticks}" stroke="#10151c" stroke-width="2.500"/>` +
    `<g font-size="9" fill="#10151c" ${SANS} ${BOLD} ${MID}>${nums}</g>` + lab(322, 322, 'EAGLE', 13, -57.9, '#b0181e', 4) +
    lab(336, 262, 'PTARMIGAN BOWL', 11.5, -6, '#1c3a70', 1.2) +
    // town
    `<rect x="22" y="378" width="206" height="210" rx="6" fill="#14244a" opacity=".85"/><path d="${blocks}" fill="#2a4276"/>` +
    `<path d="${hs.map((y) => `M26 ${y}H224`).join('')}${vs.map((x) => `M${x} 382V584`).join('')}" stroke="#7088b8" stroke-width="1.500" opacity=".8"/><path d="M26 540H224" stroke="#e8c88a" stroke-width="3"/>` +
    `<path d="M192 516Q220 506 240 486M224 540Q420 600 640 560Q680 520 690 420Q710 320 800 220" fill="none" stroke="#e8c88a" stroke-width="2.500"/>` +
    lab(122, 372, "CUTTER'S GAP", 13, 0, '#e8c88a', 3) + lab(742, 330, 'RIDGE RD', 10, -52, '#e8c88a', 2) +
    // place icons
    `<g stroke="#10151c" stroke-width="1.200" stroke-linejoin="round">` +
    // Silverpine base (240,480)
    `<path d="M222 486v-9l9-7 9 7v9zM240 488v-12l11-8 11 8v12z" fill="${OR}"/><rect x="262" y="492" width="14" height="14" rx="2" fill="#3a86dc"/><circle cx="240" cy="480" r="4" fill="#fff"/>` +
    // The Aerie (496,72)
    `<path d="M484 82L496 56L508 82Z" fill="#5c3a22"/><path d="M491 82L496 70L501 82Z" fill="#ffd27a"/>` +
    // tower 9 (400,228)
    `<circle cx="394" cy="235" r="9" fill="#ffd27a" fill-opacity=".5" stroke="#b0181e" stroke-width="2"/>` +
    // Kenzie's house (96,396)
    `<path d="M87 404v-10l9-8 9 8v10z" fill="#e8c88a"/>` +
    // Haddad apt (64,516)
    `<rect x="56" y="505" width="16" height="22" fill="#e8c88a"/><path d="M60 510h3M66 510h3M60 516h3M66 516h3M60 522h3M66 522h3" stroke="#10151c" stroke-width="2"/>` +
    // Rooster's (144,540)
    `<circle cx="144" cy="540" r="10" fill="#f4e4c0"/><path d="M139 546q-2-10 5-12q-1-4 3-5q0 3 3 3q-2 1-1 3q5 0 4 5l-4 1q1 5-10 5z" fill="#c8262c" stroke-width=".8"/>` +
    // PD (192,570)
    `<path d="M192 559l3.200 7 7.600.800-5.700 5.100 1.700 7.500-6.800-3.900-6.800 3.900 1.700-7.500-5.700-5.100 7.600-.800z" fill="#e8c048"/>` +
    // Kessler house (688,348)
    `<path d="M670 358v-14l18-12 18 12v14z" fill="#16181d" stroke="#fff"/><path d="M652 352h18v6h-18z" fill="#8a5a34" stroke="#fff"/><rect x="682" y="342" width="12" height="8" fill="#ffd27a"/>` +
    `</g>` +
    // title, legend, compass
    `<g ${SANS} ${BOLD} fill="#dfe8f6"><text x="30" y="46" font-size="24" letter-spacing="6">SILVERPINE</text><text x="31" y="66" font-size="10.500" letter-spacing="3.500" fill="#8aa4d0">MOUNTAIN RESORT · TRAIL MAP</text></g>` +
    `<path d="M30 78h250" stroke="${OR}" stroke-width="2.500"/>` +
    `<g transform="translate(740 76)" opacity=".85"><circle r="24" fill="#0a1228" stroke="#7088b8" stroke-width="1"/><path d="M0-30l7 30-7 30-7-30z" fill="#14244a" stroke="#dfe8f6" stroke-width="1"/><path d="M0-30l7 30h-14z" fill="#dfe8f6"/>${tx(0, -36, 11, 'N', '#dfe8f6')}</g>`;
  return frame(k, 800, 600, defs, body, 0.1, 0.4);
}

// ───────────────────────────────────────────────────────────── photo figures
/** Places an avatar-space bust (face centre 100,85) into a photo. */
const bust = (x: number, y: number, s: number, rot: number, inner: string): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-100 -85)">${inner}</g>`;
const longTorso = (fill: string, extra = ''): string =>
  `<path d="${TORSO_L}" fill="${fill}"/>${extra}<path d="M104 146H120C156 152 186 166 188 200V420H112Z" fill="#000" opacity=".22"/>`;
const frost = `<path d="M76 114h.01M83 124h.01M92 130h.01M101 133h.01M110 129h.01M118 122h.01M125 112h.01M96 124h.01M106 121h.01M88 127h.01M114 126h.01" stroke="#fff" stroke-width="2.400" stroke-linecap="round" opacity=".85"/>`;
const staffYoke = `<path d="M12 200C14 166 44 152 80 146L66 168L20 186ZM188 200C186 166 156 152 120 146L134 168L180 186Z" fill="#17181c"/><path d="M100 160V420" stroke="#17181c" stroke-width="3"/>`;
/** Matte-black snowmobile SP-01, nose to the left; skis on the ground at y=0. ~430 long. */
const sled = (x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="220" ry="9" fill="#000" opacity=".35"/>` +
  `<path d="M36-34H196Q214-32 210-14L198 0H52Q34-2 34-18Z" fill="#0b0c0f"/><path d="M52-3h146" stroke="#2c2e36" stroke-width="5" stroke-dasharray="6 6"/><g fill="#25272e"><circle cx="70" cy="-15" r="7"/><circle cx="110" cy="-15" r="7"/><circle cx="150" cy="-15" r="7"/><circle cx="188" cy="-17" r="7"/></g>` +
  `<path d="M196-72l20 5v22" fill="none" stroke="#2c2e36" stroke-width="5" stroke-linejoin="round"/>` +
  `<path d="M-104-38L-152-8M-78-36L-130-8" stroke="#2c2e36" stroke-width="6" stroke-linecap="round"/>` +
  `<path d="M-220-13Q-228-2-212 0H-70q9 0 9-7H-204Q-211-8-209-14Z" fill="#0b0c0f"/><path d="M-204-7H-66" stroke="#4a4e58" stroke-width="1.500" opacity=".7"/>` +
  `<path d="M-74-96L-46-142Q-36-150-28-140L-12-104Z" fill="#6a7c94" opacity=".5"/><path d="M-72-97L-45-141" stroke="#cfe0f4" stroke-width="2" opacity=".6"/>` +
  `<path d="M-14-104L4-130h16" fill="none" stroke="#0b0c0f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="M-160-42Q-160-86-90-100L-18-106Q8-106 22-90L64-94H178Q200-92 204-74L200-36H-30Q-110-30-160-42Z" fill="#17181c"/>` +
  `<path d="M-155-50Q-152-82-90-96L-18-102Q4-102 16-92" fill="none" stroke="#4e525e" stroke-width="2.500" opacity=".85"/><path d="M-160-42Q-110-30-30-36H200L201-42H-30Q-110-37-159-47Z" fill="#000" opacity=".5"/>` +
  `<path d="M24-92Q70-110 150-104Q186-102 196-86L64-90Z" fill="#292b32"/><path d="M40-94Q80-104 150-99" fill="none" stroke="#565a66" stroke-width="2" opacity=".7"/>` +
  `<path d="M-157-60q2-14 20-20l5 13q-14 2-25 7z" fill="#e8f0ff"/>` +
  `<path d="M-154-46Q-70-54 20-50H202" fill="none" stroke="${RED}" stroke-width="3.200"/>` +
  `<g font-size="24" fill="#f4f6f8" ${SANS} font-weight="900" ${MID}><text x="-104" y="-64">S</text><text x="-84.500" y="-64">P</text><text x="-65" y="-64">-</text><text x="-45.500" y="-64">0</text><text x="-26" y="-64">1</text></g></g>`;
const SKY_DAY: Stop[] = [[0, '#1650b4'], [0.55, '#4c94e0'], [1, '#a8d4f8']];

// ───────────────────────────────────────────────────────────── c4_ph_dad
function phDad(): string {
  const k = 'c4_ph_dad', R = rng(9);
  const defs = lg(`${k}sk`, SKY_DAY) + rg(`${k}sun`, [[0, '#fff', 0.95], [0.3, '#fff6d0', 0.4], [1, '#fff6d0', 0]]) + bl(`${k}b3`, 3) + bl(`${k}b2`, 1.5);
  const dad = { skin: '#b87c52', shade: '#845236' };
  const father = longTorso(OR, staffYoke) + curls('#5a5a60') + hb(dad.skin, dad.shade, '#fff') + collar('#22242a', '#101114') +
    eyes('#3a2416', 'laugh') + brows('#4a4a50', 'up', 3.6) + nose('#6e3e28') + beard('#c4c8cf') +
    `<path d="M84 109Q92 103 100 107Q108 103 116 109Q108 113 100 110Q92 113 84 109Z" fill="#9a9ea6"/>` + mouth('laugh', '#4a1418') + frost +
    `<path d="M74 90l-5-2M74 94l-5 1M126 90l5-2M126 94l5 1" stroke="${dad.shade}" stroke-width="1.300" stroke-linecap="round"/>` + beanie('#d97a3c', '#a8541c') + liftPatch;
  const son = longTorso(OR, staffYoke) + rafiFace('laugh', RAF.hair, 0.55) + frost;
  const body =
    `<rect width="600" height="800" fill="url(#${k}sk)"/><circle cx="540" cy="60" r="260" fill="url(#${k}sun)"/>` +
    `<g filter="url(#${k}b2)"><path d="M0 500L80 430L150 470L250 390L330 450L430 380L520 440L600 400V620H0Z" fill="#e4eefa"/><path d="M250 390L330 450L300 500L230 470ZM430 380L520 440L500 500L420 460ZM80 430L150 470L120 520Z" fill="#8fb0e0" opacity=".7"/>` +
    `<path d="M0 560Q300 500 600 540V800H0Z" fill="#f2f7ff"/>${pines(R, -10, 620, 34, (x) => 560 - Math.sin(x / 100) * 22, 50, 100, '#143a30')}</g>` +
    // up the line: tower 9
    `<path d="M620 250L200 53L-20-50M620 318L40 53L-20 30" fill="none" stroke="#2a3340" stroke-width="3"/>` + tower(120, 70, 600, 1.15, '#4a586c', '9') +
    // chair
    `<path d="M300-10V170" stroke="#2c323c" stroke-width="16"/><path d="M58 800V330Q58 172 300 172Q542 172 542 330V800" fill="none" stroke="#2c323c" stroke-width="16"/><path d="M52 800V330Q52 166 300 166" fill="none" stroke="#8a96a8" stroke-width="3" opacity=".7"/>` +
    `<path d="M60 560H540V640H60Z" fill="#23272f"/><path d="M60 596H540" stroke="#3c424e" stroke-width="4"/>` +
    bust(410, 352, 1.72, 5, son) + bust(196, 338, 1.72, -4, father) +
    // dad's arm, pointing up the line
    `<g transform="translate(600 0) scale(-1 1)">` +
    `<path d="M520 640Q570 520 548 330" fill="none" stroke="#17181c" stroke-width="74" stroke-linecap="round"/><path d="M520 640Q570 520 548 330" fill="none" stroke="${OR}" stroke-width="66" stroke-linecap="round"/><path d="M548 420Q560 380 548 330" fill="none" stroke="#17181c" stroke-width="66" stroke-linecap="round"/><path d="M560 600Q592 500 574 360" fill="none" stroke="#000" stroke-width="14" opacity=".2" stroke-linecap="round"/>` +
    `<path d="M516 322Q512 286 534 272L530 222Q532 210 542 212Q550 214 550 226L552 270Q580 276 580 312Q578 338 548 340Q522 340 516 322Z" fill="#17181c"/><path d="M536 276q10-4 18 0" fill="none" stroke="#3c424e" stroke-width="2.500"/>` + `</g>` +
    // safety bar + gloves
    `<path d="M-20 716H620" stroke="#2c323c" stroke-width="20"/><path d="M-20 709H620" stroke="#8a96a8" stroke-width="2.500" opacity=".7"/>` +
    `<g fill="#17181c"><rect x="212" y="690" width="62" height="52" rx="20"/><rect x="320" y="690" width="62" height="52" rx="20"/><rect x="452" y="690" width="62" height="52" rx="20"/></g><path d="M220 704h46M328 704h46M460 704h46" stroke="#3c424e" stroke-width="3" stroke-linecap="round"/>` +
    dots(R, 16, 600, 800, 1.2, 2.4, '#fff', 0.8);
  return frame(k, 600, 800, defs, body, 0.2, 0.4);
}

// ───────────────────────────────────────────────────────────── c4_ph_tower9
function phTower9(): string {
  const k = 'c4_ph_tower9', R = rng(19);
  const defs = lg(`${k}sk`, [[0, '#26306e'], [0.4, '#8a5a8e'], [0.7, '#f08a62'], [1, '#ffe0a0']]) +
    rg(`${k}sun`, [[0, '#fffbe0', 1], [0.2, '#ffd890', 0.8], [1, '#ff9a5a', 0]]) +
    lg(`${k}sn`, [[0, '#ffd8c4'], [0.3, '#d8b4cc'], [1, '#56689e']]) + lg(`${k}bd`, [[0, '#6a4426'], [1, '#4a2e1a']]) +
    tex(`${k}wd`, 0.012, 0.5, '0.08 0.04 0.02', -1.6, 0.95, 5) + bl(`${k}b3`, 3) + bl(`${k}b12`, 12);
  const body =
    `<rect width="800" height="330" fill="url(#${k}sk)"/><circle cx="452" cy="300" r="260" fill="url(#${k}sun)"/>` +
    `<path d="M0 290L80 240L150 276L240 220L330 270L420 250L520 282L620 226L720 270L800 240V340H0Z" fill="#7a5a94"/><path d="M0 310L120 276L230 300L360 280L470 300L600 272L800 300V350H0Z" fill="#5c4a86"/>` +
    // the bowl
    `<path d="M0 318Q200 300 420 322T800 304V600H0Z" fill="url(#${k}sn)"/>` +
    `<g filter="url(#${k}b12)"><path d="M120 420Q380 340 700 380Q460 400 300 470Q160 520 0 500Z" fill="#fff0d8" opacity=".55"/><path d="M0 560Q260 470 560 500Q700 510 800 560V600H0Z" fill="#3c4c88" opacity=".6"/><path d="M500 330Q640 340 800 380V330Z" fill="#6a78b4" opacity=".5"/></g>` +
    `<path d="M0 318Q200 300 420 322T800 304" fill="none" stroke="#fff4e0" stroke-width="2.500" opacity=".8"/>` +
    pines(R, 560, 820, 26, (x) => 314 - (x - 560) * 0.03, 22, 46, '#2a2450') +
    // tower 9
    `<path d="M-20 60L58 96L800-30M-20 110L262 96L800 20" fill="none" stroke="#161a30" stroke-width="3"/><path d="M262 96L800 20" stroke="#ffc890" stroke-width="1" opacity=".7" transform="translate(0 -2)"/>` +
    `<path d="M150 540L0 600H150Z" fill="#2c3870" opacity=".5" filter="url(#${k}b3)"/>` + tower(160, 120, 430, 1.65, '#161a30', '9', '#f4ecdc') +
    `<path d="M168 126L176 550" stroke="#ffb878" stroke-width="3" opacity=".7"/>` +
    // cairn + faded beanie
    `<path d="M392 520L200 588L270 600L440 530Z" fill="#33407a" opacity=".55" filter="url(#${k}b3)"/>` +
    `<g transform="translate(396 524) scale(1.5)"><g stroke="#2a2438" stroke-width="1.200" stroke-linejoin="round"><path d="M-46 0q-4-14 8-22l50-4q18 4 20 18l-10 10q-40 6-68-2z" fill="#6a6478"/><path d="M-34-22q-2-14 10-20l34-2q14 4 12 18l-8 6z" fill="#847c8c"/><path d="M-22-42q0-14 10-18l24-2q10 4 8 18z" fill="#5e586e"/><path d="M-14-60q0-12 8-14h14q8 4 6 14z" fill="#8a8292"/></g>` +
    `<path d="M32-8l-10 10q-12 2-22 2q20-10 32-12zM32-26l-8 6-20 0q16-6 28-6zM20-44l-8 2 0 0q4-10 8-2z" fill="#ffb070" opacity=".55"/><path d="M-40-20q12-6 26-4M-26-41q8-4 18-3" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>` +
    `<g transform="translate(-2 -74) rotate(-7)"><path d="M-17 0Q-18-26 0-30Q18-26 17 0Z" fill="#d97a3c"/><path d="M4-30Q18-26 17 0H8Q10-18 4-30Z" fill="#ffc890" opacity=".5"/><path d="M-19-2H19V8H-19Z" fill="#b85c24"/><path d="M-12-1v8M-4-1v8M4-1v8M12-1v8" stroke="#000" stroke-width="1.500" opacity=".3"/></g></g>` +
    // trail sign
    `<rect x="528" y="350" width="16" height="220" fill="#3a2616"/><rect x="752" y="350" width="16" height="230" fill="#3a2616"/>` +
    plank(k, 500, 356, 292, 132, `url(#${k}bd)`) +
    tx(646, 414, 46, 'PTARMIGAN', '#fff6e0', SANS, `${BOLD} ${MID} ${fit(256)}`) + tx(616, 468, 46, 'BOWL', '#fff6e0', SANS, `${BOLD} ${MID} ${fit(132)}`) +
    `<path d="M712 436l14 16-14 16-14-16zM744 436l14 16-14 16-14-16z" fill="#10121a" stroke="#fff6e0" stroke-width="2"/>` +
    snowCap(500, 356, 292, 13) + `<path d="M500 356v132" stroke="#ffb878" stroke-width="3" opacity=".6"/>` +
    `<path d="M0 600Q200 560 400 580T800 560V600Z" fill="#2c3870" opacity=".5"/>`;
  return frame(k, 800, 600, defs, body, 0.16, 0.45);
}

// ───────────────────────────────────────────────────────────── c4_ph_shop
const gear = (x: number, y: number, r: number, n: number, c: string, d: string, ry = 1): string => {
  const dash = n1((Math.PI * (r + 4)) / n);
  return `<g transform="translate(${x} ${y}) scale(1 ${ry})"><circle r="${r + 4}" fill="none" stroke="${d}" stroke-width="11" stroke-dasharray="${dash} ${dash}"/><circle r="${r}" fill="${c}"/><circle r="${n1(r * 0.72)}" fill="none" stroke="${d}" stroke-width="3"/><circle r="${n1(r * 0.3)}" fill="#14161a"/><circle r="${n1(r * 0.3)}" fill="none" stroke="#c8ccd4" stroke-width="2" opacity=".5"/></g>`;
};
function phShop(): string {
  const k = 'c4_ph_shop';
  const defs = lg(`${k}wl`, [[0, '#4a5048'], [1, '#2a2e2a']]) + rg(`${k}lt`, [[0, '#ffe2a8', 0.75], [0.5, '#ffc070', 0.22], [1, '#ffc070', 0]], 0.5, 0.5, 0.5) +
    lg(`${k}st`, [[0, '#aab2bc'], [0.5, '#6c747e'], [1, '#3a4048']]) + lg(`${k}cb`, [[0, '#2a3038'], [1, '#14181c']]) +
    `<pattern id="${k}pg" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#8a6c4a"/><circle cx="8" cy="8" r="1.800" fill="#3a2a1a"/></pattern>` +
    tex(`${k}wd`, 0.01, 0.4, '0.1 0.06 0.03', -1.6, 0.95, 4) + bl(`${k}b3`, 3) + bl(`${k}b10`, 10);
  const jug = (x: number, c: string, h = 70): string =>
    `<path d="M${x} 150v${-h + 12}q0-12 10-12h8v-10h16v10q14 2 14 16v${h - 16}z" fill="${c}"/><path d="M${x + 4} 150v${-h + 16}" stroke="#fff" stroke-width="3" opacity=".25"/><rect x="${x + 8}" y="${150 - h * 0.6}" width="32" height="${n1(h * 0.34)}" fill="#e8e2d0" opacity=".85"/>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}wl)"/><path d="M0 100H800M0 200H800M0 300H800M0 400H800M100 0V100M300 0V100M520 0V100M740 0V100M200 100V200M420 100V200M640 100V200" stroke="#000" stroke-width="2" opacity=".2"/>` +
    // pegboard + tools
    `<rect x="28" y="36" width="290" height="250" fill="url(#${k}pg)"/><rect x="28" y="36" width="290" height="250" fill="none" stroke="#3a2a1a" stroke-width="6"/>` +
    `<g fill="none" stroke="#22262c" stroke-linecap="round"><path d="M70 70v120" stroke-width="10"/><path d="M58 70a12 12 0 1 1 24 0" stroke-width="8"/><path d="M110 76v96" stroke-width="8"/><path d="M100 76a10 10 0 1 1 20 0" stroke-width="7"/><path d="M146 80v78" stroke-width="7"/><path d="M137 80a9 9 0 1 1 18 0" stroke-width="6"/><path d="M190 70v150" stroke-width="9"/><path d="M250 150v90" stroke="#8a4a1c" stroke-width="12"/></g>` +
    `<path d="M172 64h36v22h-36zM226 96h50v54h-50z" fill="#3a4048"/><path d="M60 224h84l-6 34H66z" fill="#c8ccd4" opacity=".8"/><path d="M52 216h100v12H52z" fill="#1c5a8a"/>` +
    // shelves
    `<rect x="350" y="150" width="436" height="16" fill="#6a4a2c"/><rect x="350" y="150" width="436" height="16" filter="url(#${k}wd)" opacity=".5"/><rect x="350" y="166" width="436" height="5" fill="#000" opacity=".4"/>` +
    `<rect x="350" y="300" width="436" height="18" fill="#6a4a2c"/><rect x="350" y="300" width="436" height="18" filter="url(#${k}wd)" opacity=".5"/><rect x="350" y="318" width="436" height="6" fill="#000" opacity=".4"/>` +
    `<path d="M372 166l0 30 24-30zM764 166l0 30-24-30zM372 318l0 30 24-30zM764 318l0 30-24-30z" fill="#22262c"/>` +
    jug(366, '#2c5a8a', 78) + jug(424, '#3a6a4a', 64) + `<rect x="492" y="96" width="92" height="54" fill="#a8845a"/><path d="M492 114h92M538 96v18" stroke="#6a4a2c" stroke-width="3"/><rect x="600" y="84" width="64" height="66" fill="#8a6c4a"/><path d="M600 100h64" stroke="#6a4a2c" stroke-width="3"/>` +
    `<circle cx="722" cy="114" r="34" fill="none" stroke="#c8a04a" stroke-width="12"/><circle cx="722" cy="114" r="34" fill="none" stroke="#8a6a24" stroke-width="2" stroke-dasharray="4 5"/>` +
    // second shelf: toolbox, THE GAP, cans
    `<rect x="360" y="232" width="84" height="68" rx="4" fill="#8a2c28"/><rect x="360" y="232" width="84" height="20" rx="4" fill="#6a1c1a"/><rect x="390" y="222" width="24" height="12" rx="4" fill="none" stroke="#22262c" stroke-width="5"/><rect x="394" y="262" width="16" height="10" fill="#c8ccd4"/>` +
    `<g fill="#3a4048"><rect x="708" y="236" width="26" height="64" rx="5"/><rect x="740" y="248" width="26" height="52" rx="5"/></g><rect x="708" y="254" width="26" height="22" fill="#e8c048"/><rect x="740" y="262" width="26" height="18" fill="#4a90c8"/><rect x="716" y="226" width="10" height="10" fill="#c8ccd4"/><rect x="748" y="238" width="10" height="10" fill="#c8ccd4"/>` +
    `<rect x="462" y="288" width="232" height="12" fill="#000" opacity=".28" filter="url(#${k}b3)"/><path d="M470 299h216" stroke="#d8c8a8" stroke-width="2" stroke-dasharray="3 7" opacity=".5"/>` +
    // sticky note
    `<g transform="rotate(4 578 232)"><rect x="524" y="186" width="112" height="100" fill="#000" opacity=".35" transform="translate(4 6)"/><rect x="524" y="186" width="112" height="100" fill="#f4dc5a"/><path d="M524 186h112v20H524z" fill="#e0c440"/>` +
    tx(580, 238, 25, 'borrowed', '#22262c', HAND, `${MID} ${fit(96)}`) + tx(564, 272, 26, '— L', '#22262c', HAND, MID) +
    `<path d="M606 256q-8-10-14-3q-5 8 14 21q19-13 14-21q-6-7-14 3z" fill="#d8262c"/></g>` +
    // label tape under the gap
    `<g transform="rotate(-1 578 344)"><rect x="384" y="324" width="388" height="42" fill="#000" opacity=".3" transform="translate(3 4)"/><path d="M384 324h388l-5 10 5 10-5 11 5 11H384l5-10-5-11 5-11z" fill="#efe6cc"/>` +
    tx(578, 356, 29, 'PROPANE HEATER — SHOP', '#1a1c22', HAND, `${BOLD} ${MID} ${fit(364)}`) + `</g>` +
    // work light
    `<ellipse cx="330" cy="330" rx="470" ry="330" fill="url(#${k}lt)"/>` +
    // bench
    `<rect y="436" width="800" height="26" fill="url(#${k}st)"/><rect y="462" width="800" height="138" fill="url(#${k}cb)"/><path d="M0 438H800" stroke="#fff" stroke-width="2" opacity=".4"/>` +
    `<path d="M200 462V600M400 462V600M600 462V600M0 530H800" stroke="#000" stroke-width="3" opacity=".5"/><path d="M80 496h40M280 496h40M480 496h40M680 496h40M80 564h40M280 564h40M480 564h40M680 564h40" stroke="#8a929c" stroke-width="6" stroke-linecap="round"/>` +
    // gearbox in pieces
    `<ellipse cx="200" cy="440" rx="190" ry="10" fill="#000" opacity=".4" filter="url(#${k}b3)"/>` +
    `<path d="M40 436V340Q40 322 58 322H250Q268 322 268 340V436Z" fill="#3c5a7c"/><path d="M40 436V340Q40 322 58 322H150V436Z" fill="#fff" opacity=".1"/><path d="M52 322V306H256V322Z" fill="#2c4664"/><ellipse cx="154" cy="306" rx="102" ry="13" fill="#10141a"/><ellipse cx="154" cy="306" rx="102" ry="13" fill="none" stroke="#5a7ca4" stroke-width="3"/>` +
    `<g fill="#c8ccd4"><circle cx="58" cy="340" r="5"/><circle cx="250" cy="340" r="5"/><circle cx="58" cy="420" r="5"/><circle cx="250" cy="420" r="5"/></g><circle cx="154" cy="384" r="30" fill="#2c4664"/><circle cx="154" cy="384" r="16" fill="#10141a"/><path d="M96 306q20-12 44-6" fill="none" stroke="#c8862a" stroke-width="5" opacity=".7" stroke-linecap="round"/>` +
    gear(140, 300, 42, 14, '#9aa2ac', '#6c747e', 0.3) +
    gear(360, 384, 46, 16, '#aab2bc', '#7a828c') + gear(452, 412, 22, 10, '#c8a04a', '#8a6a24') +
    `<path d="M498 426l70-8 4 12-72 8z" fill="#c8ccd4"/><circle cx="572" cy="424" r="13" fill="none" stroke="#c8ccd4" stroke-width="7"/><ellipse cx="296" cy="430" rx="22" ry="6" fill="none" stroke="#14161a" stroke-width="5"/>` +
    `<g fill="#8a929c"><rect x="516" y="398" width="9" height="14"/><rect x="532" y="400" width="9" height="12"/><rect x="302" y="404" width="9" height="12"/></g><path d="M388 428q30-10 56 4q10 8-8 8h-50q-10-6 2-12z" fill="#b8562a" opacity=".9"/>` +
    // radio
    `<path d="M700 362L742 290" stroke="#aab2bc" stroke-width="3"/><rect x="628" y="362" width="140" height="74" rx="10" fill="#e8b82a"/><rect x="628" y="362" width="140" height="74" rx="10" fill="none" stroke="#14161a" stroke-width="5"/><circle cx="664" cy="400" r="24" fill="#14161a"/><circle cx="664" cy="400" r="24" fill="none" stroke="#3a4048" stroke-width="3" stroke-dasharray="3 3"/><rect x="700" y="376" width="56" height="20" fill="#14161a"/><rect x="704" y="380" width="30" height="12" fill="#6ad08a"/><circle cx="712" cy="416" r="7" fill="#14161a"/><circle cx="740" cy="416" r="7" fill="#14161a"/>`;
  return frame(k, 800, 600, defs, body, 0.18, 0.6);
}

// ───────────────────────────────────────────────────────────── c4_ph_aerie
/** Picnic table, end-on; top centre at x,y. */
const picnic = (x: number, y: number, s: number, snow = '#f4f8ff'): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 4L-44 46M30 4L44 46M-52 26H52" stroke="#3a2616" stroke-width="6" stroke-linecap="round"/><rect x="-46" y="0" width="92" height="8" fill="#6a4a2c"/><rect x="-62" y="24" width="24" height="6" fill="#6a4a2c"/><rect x="38" y="24" width="24" height="6" fill="#6a4a2c"/>` +
  `<path d="M-48 1Q-46-12-20-10Q0-16 22-10Q46-12 48 1Z" fill="${snow}"/><path d="M-62 24q10-8 24 0zM38 24q14-8 24 0z" fill="${snow}"/></g>`;
function phAerie(): string {
  const k = 'c4_ph_aerie', R = rng(31);
  const defs = lg(`${k}sk`, SKY_DAY) + lg(`${k}tb`, [[0, '#4a3424'], [1, '#2a1c14']]) + lg(`${k}gl`, [[0, '#3a6aa8'], [0.6, '#16283c'], [1, '#0a1218']]) +
    lg(`${k}sn`, [[0, '#ffffff'], [1, '#b8d0f0']]) + rg(`${k}sun`, [[0, '#fff', 0.9], [0.3, '#fff', 0.3], [1, '#fff', 0]]) +
    `<pattern id="${k}stn" width="26" height="20" patternUnits="userSpaceOnUse"><rect width="26" height="20" fill="#7a7880"/><rect x="1" y="1" width="14" height="8" rx="2" fill="#9a98a0"/><rect x="17" y="1" width="8" height="8" rx="2" fill="#8a8890"/><rect x="1" y="11" width="8" height="8" rx="2" fill="#8a8890"/><rect x="11" y="11" width="14" height="8" rx="2" fill="#a4a2aa"/></pattern>` +
    `<pattern id="${k}cd" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-52)"><rect width="8" height="8" fill="#eef4fc"/><rect width="3" height="8" fill="#c0d2ec"/></pattern>` +
    tex(`${k}wd`, 0.012, 0.5, '0.06 0.03 0.02', -1.6, 0.95, 5) + bl(`${k}b3`, 3);
  const body =
    `<rect width="800" height="600" fill="url(#${k}sk)"/><circle cx="700" cy="50" r="240" fill="url(#${k}sun)"/>` +
    `<path d="M0 400L70 360L140 384L220 350L300 380H500L580 356L660 384L740 350L800 372V440H0Z" fill="#dce8f8"/><path d="M220 350L300 380L260 400ZM740 350L800 372V400ZM70 360L140 384L100 404Z" fill="#8fb0e0" opacity=".7"/>` +
    `<path d="M0 420Q400 392 800 420V600H0Z" fill="url(#${k}sn)"/>` + pines(R, -10, 100, 26, () => 420, 30, 60, '#173c32') + pines(R, 770, 820, 20, () => 420, 30, 50, '#173c32') +
    // cat track round the north side
    `<path d="M800 440L690 448Q600 500 520 600H800Z" fill="url(#${k}cd)"/><path d="M690 448Q600 500 520 600" fill="none" stroke="#9ab4dc" stroke-width="3"/>` +
    // chimney
    `<rect x="396" y="120" width="46" height="220" fill="url(#${k}stn)"/><rect x="420" y="120" width="22" height="220" fill="#000" opacity=".25"/><rect x="390" y="110" width="58" height="14" fill="#5a5860"/><path d="M388 112q30-16 62 0z" fill="#fff"/>` +
    // kitchen wing (north)
    `<path d="M500 330H772V446H500Z" fill="#2c1e16"/><path d="M500 330H772V446H500Z" filter="url(#${k}wd)" opacity=".5"/><path d="M486 334L780 318V336L486 352Z" fill="#1c120c"/><path d="M484 334Q630 304 782 316L780 326L486 342Z" fill="#fff"/>` +
    `<rect x="606" y="378" width="54" height="68" fill="#5a6470"/><rect x="606" y="378" width="54" height="68" fill="none" stroke="#14181c" stroke-width="4"/><circle cx="650" cy="414" r="3.500" fill="#d8dce4"/><path d="M606 446h54l6 8h-66z" fill="#c0d2ec"/>` +
    `<rect x="516" y="346" width="244" height="28" rx="3" fill="#f4f1e6" stroke="#14181c" stroke-width="2"/>` + tx(638, 367, 21, 'KITCHEN — SERVICE', '#14181c', SANS, `${BOLD} ${MID} ${fit(224)}`) +
    // A-frame
    `<path d="M330 78L126 446H534Z" fill="url(#${k}tb)"/><path d="M330 78L126 446H534Z" filter="url(#${k}wd)" opacity=".55"/>` +
    `<path d="M330 150L222 352H438Z" fill="url(#${k}gl)"/><path d="M330 150L276 251H330Z" fill="#8fc0f0" opacity=".3"/><path d="M330 150V352M262 278H398" stroke="#2a1c14" stroke-width="7"/><path d="M222 352H438" stroke="#2a1c14" stroke-width="9"/>` +
    `<rect x="196" y="362" width="268" height="84" fill="#221610"/><g fill="url(#${k}gl)"><rect x="210" y="372" width="70" height="60"/><rect x="380" y="372" width="70" height="60"/></g><rect x="302" y="372" width="56" height="74" fill="#3a2a20" stroke="#14100c" stroke-width="3"/>` +
    `<path d="M330 66L110 462" stroke="#1c120c" stroke-width="20" stroke-linecap="round"/><path d="M330 66L550 462" stroke="#120c08" stroke-width="20" stroke-linecap="round"/>` +
    `<path d="M330 54L112 446" stroke="#fff" stroke-width="13" stroke-linecap="round"/><path d="M330 54L548 446" stroke="#d4e2f6" stroke-width="13" stroke-linecap="round"/><path d="M330 48q10 0 14 12l-14 10-14-10q4-12 14-12z" fill="#fff"/>` +
    // south deck
    `<rect x="70" y="440" width="520" height="12" fill="#5a3e26"/><path d="M66 440Q200 428 330 436T594 440Z" fill="#fff"/>` +
    picnic(140, 398, 0.95) + picnic(236, 404, 0.8) + picnic(470, 398, 0.95) +
    `<path d="M92 452v60M200 452v60M460 452v60M568 452v60" stroke="#2a1c14" stroke-width="12"/><path d="M92 470L200 506M568 470L460 506" stroke="#2a1c14" stroke-width="5"/>` +
    plank(k, 106, 452, 448, 50, '#3a2616') + tx(330, 489, 32, 'THE AERIE · EST. 1961', '#f6e8c8', SERIF, `${BOLD} ${MID} ${fit(410)}`) +
    // foreground snow
    `<path d="M0 520Q200 496 420 516T800 600H0Z" fill="#fff"/><path d="M0 548Q240 520 470 560Q600 580 640 600H0Z" fill="#c8daf4" opacity=".7"/>` +
    `<path d="M120 600Q200 560 330 540M150 600Q230 566 350 548" fill="none" stroke="#9ab4dc" stroke-width="3" opacity=".8"/>` +
    `<path d="M126 446L60 520H126Z" fill="#7a98cc" opacity=".3"/>` + dots(R, 16, 800, 180, 1, 2, '#fff', 0.9, 420);
  return frame(k, 800, 600, defs, body, 0.14, 0.35);
}

// ───────────────────────────────────────────────────────────── c4_ph_sled
function phSled(): string {
  const k = 'c4_ph_sled', R = rng(55);
  const defs = lg(`${k}sk`, SKY_DAY) + lg(`${k}sn`, [[0, '#ffffff'], [1, '#b0c8ec']]) + rg(`${k}sun`, [[0, '#fff', 0.9], [0.3, '#fff', 0.3], [1, '#fff', 0]]) +
    tex(`${k}wd`, 0.012, 0.5, '0.06 0.03 0.02', -1.6, 0.95, 5) + bl(`${k}b3`, 3) + bl(`${k}b2`, 1.6);
  const kes = longTorso('#20232b', `<path d="M100 168V420" stroke="#3a3e48" stroke-width="3"/>` + spLogo(62, 190, 1.2)) + kesslerFace('#fff');
  const body =
    `<rect width="800" height="600" fill="url(#${k}sk)"/><circle cx="90" cy="40" r="240" fill="url(#${k}sun)"/>` +
    `<g filter="url(#${k}b2)"><path d="M120 400Q260 250 400 150Q470 100 520 120Q640 220 800 330V420H120Z" fill="#eef4fc"/><path d="M520 120Q640 220 800 330V420H640Q600 260 520 120Z" fill="#8fb0e0" opacity=".6"/>` +
    `<path d="M300 400L492 132" stroke="#3a4658" stroke-width="2"/>${tower(352, 320, 70, 0.3, '#3a4658')}${tower(410, 240, 50, 0.22, '#3a4658')}${tower(456, 176, 34, 0.16, '#3a4658')}` +
    pines(R, 120, 300, 20, (x) => 400 - (x - 120) * 0.5, 30, 60, '#173c32') + pines(R, 540, 820, 24, (x) => 330 + (x - 540) * 0.2, 36, 70, '#173c32') + `</g>` +
    // base lodge
    `<path d="M-20 400V250L90 180L200 250V400Z" fill="#3a2a20"/><path d="M-20 400V250L90 180L200 250V400Z" filter="url(#${k}wd)" opacity=".5"/><path d="M-30 256L90 172L212 256" fill="none" stroke="#fff" stroke-width="14" stroke-linejoin="round"/>` +
    `<rect x="20" y="290" width="54" height="60" fill="#16283c"/><rect x="104" y="290" width="54" height="60" fill="#16283c"/><path d="M47 290v60M131 290v60" stroke="#3a2a20" stroke-width="4"/><rect x="0" y="262" width="180" height="16" fill="${OR}"/>` +
    `<path d="M0 404Q400 380 800 410V600H0Z" fill="url(#${k}sn)"/><path d="M0 470Q300 450 800 500" fill="none" stroke="#c0d2ec" stroke-width="4"/>` +
    `<path d="M0 560Q200 520 430 540T800 520V600H0Z" fill="#c8daf4" opacity=".8"/>` +
    // Kessler
    bust(672, 160, 1.4, 3, kes) +
    `<g transform="translate(54 -6)">` +
    `<path d="M580 440Q496 430 508 318" fill="none" stroke="#0c0d10" stroke-width="54" stroke-linecap="round"/><path d="M580 440Q496 430 508 318" fill="none" stroke="#262930" stroke-width="46" stroke-linecap="round"/>` +
    `<path d="M480 286Q478 262 496 258L494 226Q496 214 506 216Q514 218 513 230L512 258L530 262Q538 266 536 290Q532 306 508 306Q484 306 480 286Z" fill="${KES.skin}"/><path d="M500 268h30M500 280h32M500 292h28" stroke="${KES.shade}" stroke-width="2.500" stroke-linecap="round"/><path d="M498 222q6-6 12 0" fill="none" stroke="#f0d0b0" stroke-width="3" stroke-linecap="round"/>` + `</g>` +
    // SP-01
    sled(318, 524, 1.32) +
    `<path d="M40 520h30M90 524h50M700 530h60" stroke="#9ab4dc" stroke-width="3" stroke-linecap="round"/>` + dots(R, 10, 800, 120, 1, 2, '#fff', 0.9, 440);
  return frame(k, 800, 600, defs, body, 0.14, 0.35);
}

// ───────────────────────────────────────────────────────────── c4_ph_alldown
interface Kid { j: string; jd: string; hat: string; skin: string; pose: 'hug' | 'peace' | 'hold' | 'hop'; mouth?: string; buns?: boolean }
/** Bundled-up teenager, feet at 0,0, ~180 tall. */
function kid(x: number, y: number, s: number, o: Kid, flip = 1): string {
  const arm = (d: string): string => `<path d="${d}" stroke="${o.jd}" stroke-width="16"/><path d="${d}" stroke="${o.j}" stroke-width="12"/>`;
  const legs = o.pose === 'hop'
    ? `<path d="M-8 0V-72" stroke="#1a2030" stroke-width="15" stroke-linecap="round"/><path d="M9-72L18-44L6-22" fill="none" stroke="#1a2030" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><rect x="-18" y="-10" width="22" height="12" rx="5" fill="#0c0e14"/><rect x="-4" y="-28" width="20" height="12" rx="5" fill="#0c0e14" transform="rotate(20 6 -22)"/>`
    : `<path d="M-9 0V-72M9 0V-72" stroke="#1a2030" stroke-width="15" stroke-linecap="round"/><rect x="-20" y="-10" width="20" height="12" rx="5" fill="#0c0e14"/><rect x="2" y="-10" width="20" height="12" rx="5" fill="#0c0e14"/>`;
  const arms = o.pose === 'peace'
    ? arm('M-24-122Q-40-100-24-88L6-94') + arm('M24-122Q46-124 48-152') + `<circle cx="48" cy="-160" r="8" fill="${o.skin}"/><path d="M45-165l-6-17M51-165l5-17" stroke="${o.skin}" stroke-width="5" stroke-linecap="round"/>`
    : o.pose === 'hold' ? arm('M-24-122Q-40-100-24-88L4-92') + arm('M24-122Q50-128 72-116')
    : o.pose === 'hop' ? arm('M24-122Q38-100 22-86') + arm('M-24-122Q-48-130-70-122')
    : arm('M-24-122Q-42-100-24-88L8-94') + arm('M24-122Q42-100 24-84L-8-92');
  const top = o.buns
    ? `<circle cx="-14" cy="-170" r="9" fill="#1c1418"/><circle cx="14" cy="-170" r="9" fill="#1c1418"/><path d="M-18-150Q-19-170 0-170Q19-170 18-150Q0-162-18-150Z" fill="#1c1418"/>`
    : `<path d="M-19-152Q-19-173 0-173Q19-173 19-152Z" fill="${o.hat}"/><rect x="-20" y="-158" width="40" height="9" rx="3" fill="${o.hat}"/><rect x="-20" y="-158" width="40" height="9" rx="3" fill="#000" opacity=".25"/><circle cx="0" cy="-176" r="6" fill="${o.hat}"/>`;
  return `<g transform="translate(${x} ${y}) scale(${n1(s * flip)} ${s})"><ellipse cx="4" cy="2" rx="34" ry="6" fill="#000" opacity=".35"/>${legs}` +
    `<path d="M-27-64Q-34-118-19-132H19Q34-118 27-64Z" fill="${o.j}"/><path d="M4-132H19Q34-118 27-64H8Z" fill="#000" opacity=".22"/><path d="M-29-84H28M-31-106H30" stroke="${o.jd}" stroke-width="2.500"/>` +
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round">${arms}</g>` + `<rect x="-15" y="-138" width="30" height="11" rx="5" fill="${o.jd}"/><circle cx="0" cy="-150" r="17" fill="${o.skin}"/><path d="M3-167A17 17 0 0 1 3-133Z" fill="#000" opacity=".2"/>` +
    `<path d="M-6-152h.01M7-152h.01" stroke="${INK}" stroke-width="3.400" stroke-linecap="round"/><path d="${o.mouth ?? 'M-5-141q5-3 10 0'}" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>${top}</g>`;
}
function phAllDown(): string {
  const k = 'c4_ph_alldown', R = rng(23);
  const defs = lg(`${k}sk`, [[0, '#04060f'], [1, '#101a38']]) + lg(`${k}sn`, [[0, '#9cb4dc'], [1, '#2c3c68']]) +
    lg(`${k}cn`, [[0, '#e8f2ff', 0.55], [1, '#e8f2ff', 0]]) + rg(`${k}pl`, [[0, '#f4f8ff', 0.9], [0.6, '#cfe0ff', 0.3], [1, '#cfe0ff', 0]]) +
    rg(`${k}lp`, [[0, '#fff', 1], [0.3, '#dfeaff', 0.6], [1, '#dfeaff', 0]]) + lg(`${k}wn`, [[0, '#ffd890'], [1, '#c8862a']]) + bl(`${k}b3`, 3) + bl(`${k}b8`, 8);
  const body =
    `<rect width="800" height="600" fill="url(#${k}sk)"/>` + pines(R, -10, 820, 70, () => 400, 110, 220, '#070b18') +
    `<path d="M0 396Q400 372 800 400V600H0Z" fill="url(#${k}sn)"/>` +
    // bottom terminal: gantry + bullwheel
    `<path d="M40 60V420M540 60V410" stroke="#1c2230" stroke-width="22"/><path d="M34 60V420M534 60V410" stroke="#5a6a88" stroke-width="3"/>` +
    `<rect x="-20" y="40" width="600" height="46" fill="#232a3a"/><rect x="-20" y="40" width="600" height="6" fill="#6a7c9c"/><path d="M-20 86H580" stroke="#0a0d14" stroke-width="5"/>` +
    `<path d="M290 86V112" stroke="#1c2230" stroke-width="26"/><ellipse cx="290" cy="128" rx="210" ry="26" fill="#12161f"/><ellipse cx="290" cy="124" rx="210" ry="26" fill="#2c3446"/><ellipse cx="290" cy="124" rx="184" ry="20" fill="#1a1f2c"/><ellipse cx="290" cy="124" rx="210" ry="26" fill="none" stroke="${OR}" stroke-width="4"/>` +
    `<path d="M290 124L120 112M290 124L460 112M290 124L200 142M290 124L380 142" stroke="#3c465c" stroke-width="6"/><circle cx="290" cy="124" r="14" fill="#3c465c"/>` +
    `<path d="M80 124L-20 96M500 124L820 30" stroke="#0a0d14" stroke-width="4"/>` + chair(668, 76, 0.62, 2, '#0a0d14', '#b8cdf0') +
    // work lights
    `<path d="M150 92L20 470H330Z" fill="url(#${k}cn)"/><path d="M430 92L290 480H600Z" fill="url(#${k}cn)"/>` +
    `<rect x="132" y="80" width="36" height="16" rx="3" fill="#0a0d14"/><rect x="412" y="80" width="36" height="16" rx="3" fill="#0a0d14"/><circle cx="150" cy="98" r="40" fill="url(#${k}lp)"/><circle cx="430" cy="98" r="40" fill="url(#${k}lp)"/>` +
    `<ellipse cx="330" cy="500" rx="330" ry="70" fill="url(#${k}pl)"/>` +
    // lift shack + clock
    `<path d="M590 206H800V452H590Z" fill="${ORD}"/><path d="M590 206H800V452H590Z" fill="#000" opacity=".25"/><path d="M590 206h10v246h-10z" fill="${OR}"/><path d="M620 206V452M660 206V452M700 206V452M740 206V452M780 206V452" stroke="#000" stroke-width="2" opacity=".25"/>` +
    `<path d="M574 212L810 190V206L574 228Z" fill="#12161f"/><path d="M572 212Q690 180 812 188L810 198L574 220Z" fill="#dce8fa"/>` +
    `<rect x="606" y="232" width="184" height="72" rx="6" fill="#06070a" stroke="#3c465c" stroke-width="3"/><g id="${k}ck" fill="#ffb060">${seg('23:33', 618, 244, 48)}</g><use href="#${k}ck" filter="url(#${k}b3)" opacity=".7"/>` +
    `<rect x="612" y="322" width="120" height="84" fill="url(#${k}wn)"/><path d="M672 322V406M612 364H732" stroke="#12161f" stroke-width="5"/><rect x="612" y="322" width="120" height="84" fill="none" stroke="#12161f" stroke-width="6"/><path d="M624 406v-22h30v-12h22v34z" fill="#3a2410" opacity=".7"/>` +
    `<rect x="746" y="330" width="46" height="122" fill="#7a3208"/><circle cx="756" cy="394" r="4" fill="#d8dce4"/><ellipse cx="700" cy="456" rx="130" ry="12" fill="#ffb060" opacity=".2" filter="url(#${k}b8)"/>` +
    // six kids
    kid(150, 508, 1.2, { j: '#2f8a8a', jd: '#1d5c60', hat: '#e8c048', skin: '#e8c0a0', pose: 'hug' }) +
    kid(232, 520, 1.3, { j: '#c89a2c', jd: '#8a6a14', hat: '#3a5a9a', skin: '#b8805a', pose: 'hug', mouth: 'M-5-140h10' }, -1) +
    kid(478, 512, 1.25, { j: '#3a5a9a', jd: '#263c6a', hat: '#c8ccd4', skin: '#d8a880', pose: 'hug' }, -1) +
    kid(318, 530, 1.3, { j: '#4a8a4a', jd: '#2c5a2e', hat: '#dfe8f6', skin: '#8a5a3c', pose: 'hold' }) +
    kid(398, 532, 1.25, { j: '#c8ccd8', jd: '#8a90a4', hat: '#2f8a8a', skin: '#f0c8a8', pose: 'hop', mouth: 'M-5-139q5-5 10 0' }) +
    kid(540, 556, 1.45, { j: PUR, jd: PURD, hat: PUR, skin: LIN.skin, pose: 'peace', mouth: 'M-7-143q7 6 14-1', buns: true }) +
    `<g filter="url(#${k}b8)" fill="#fff" opacity=".35"><ellipse cx="176" cy="318" rx="20" ry="9"/><ellipse cx="344" cy="322" rx="18" ry="8"/><ellipse cx="574" cy="318" rx="22" ry="9"/></g>` +
    `<path d="M0 570Q300 540 800 580V600H0Z" fill="#0a1020" opacity=".5"/>` + dots(R, 30, 800, 600, 1, 2.4, '#fff', 0.75) + `<g filter="url(#${k}b3)">${dots(R, 8, 800, 600, 4, 6, '#fff', 0.4)}</g>`;
  return frame(k, 800, 600, defs, body, 0.22, 0.6);
}

// ───────────────────────────────────────────────────────────── c4_ph_deck
/** Lina's purple backpack, base centre at x,y. ~124 wide, 160 tall. */
const bag = (x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-24-150Q-24-176 0-176Q24-176 24-150" fill="none" stroke="${PURD}" stroke-width="9" stroke-linecap="round"/>` +
  `<path d="M-62 0V-108Q-62-152 0-152Q62-152 62-108V0Q0 10-62 0Z" fill="${PUR}"/><path d="M8-152Q62-152 62-108V0Q36 6 14 6Z" fill="#000" opacity=".25"/><path d="M-52-110Q-50-140-14-144" fill="none" stroke="${PURL}" stroke-width="5" stroke-linecap="round" opacity=".8"/>` +
  `<path d="M-50-112Q0-128 50-112" fill="none" stroke="${PURD}" stroke-width="4"/><rect x="-44" y="-78" width="88" height="66" rx="12" fill="${PURD}"/><path d="M-36-62H36" stroke="#c8ccd4" stroke-width="3" stroke-dasharray="3 3"/>` +
  `<path d="M-62-60q-10 30 0 56M62-60q10 30 0 56" fill="none" stroke="${PURD}" stroke-width="8" stroke-linecap="round"/>` +
  `<path d="M36-62q10 8 8 20" fill="none" stroke="#c8ccd4" stroke-width="2.500"/><circle cx="44" cy="-38" r="5" fill="none" stroke="#c8ccd4" stroke-width="2.500"/>${squirrel(46, -2, 1.25)}` +
  `<path d="M-52-134Q-30-158 0-156Q34-158 52-132Q30-144 0-140Q-30-146-52-134Z" fill="#f4f8ff"/></g>`;
/** The shop's propane heater, base centre at x,y. ~136 wide, 220 tall. Dial reads OFF. */
const heater = (k: string, x: number, y: number, s: number): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-42-190Q-42-220 0-220Q42-220 42-190" fill="none" stroke="#4a4e56" stroke-width="10" stroke-linecap="round"/>` +
  `<rect x="-68" y="-196" width="136" height="196" rx="14" fill="#7c3a34"/><rect x="-68" y="-196" width="136" height="196" rx="14" fill="none" stroke="#3a1a18" stroke-width="3"/><path d="M-60-186h18v176h-18z" fill="#fff" opacity=".12"/>` +
  `<rect x="-54" y="-182" width="108" height="98" rx="6" fill="#14161a"/><rect x="-46" y="-174" width="92" height="82" rx="3" fill="#3a3430"/>` +
  `<path d="M-54-164H54M-54-146H54M-54-128H54M-54-110H54M-36-182V-84M-18-182V-84M0-182V-84M18-182V-84M36-182V-84" stroke="#aab2bc" stroke-width="2.500"/>` +
  `<rect x="-54" y="-182" width="108" height="98" rx="6" fill="#eaf2ff" opacity=".2"/>${dots(rng(3), 22, 104, 94, 0.8, 1.6, '#fff', 0.9, 0).replace('<path', '<path transform="translate(-52 -180)"')}` +
  `<path d="M-54-90Q-30-102-6-94Q20-104 54-92V-84H-54Z" fill="#f4f8ff" opacity=".85"/>` +
  `<rect x="-58" y="-76" width="116" height="66" rx="6" fill="#b4bac2"/><rect x="-58" y="-76" width="116" height="66" rx="6" fill="none" stroke="#5a6068" stroke-width="2"/>` +
  `<circle cx="0" cy="-36" r="19" fill="#1a1c20"/><circle cx="0" cy="-36" r="19" fill="none" stroke="#5a6068" stroke-width="2.500"/><path d="M0-36L-16-40" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="-23" cy="-42" r="3" fill="#fff" stroke="#1a1c20"/>` +
  `<g font-size="15" ${SANS} font-weight="900" fill="#14161a"><text x="-40" y="-52" ${MID}>OFF</text><text x="0" y="-60" ${MID} font-size="11" fill="#4a4e56">LOW</text><text x="38" y="-52" ${MID} font-size="11" fill="#4a4e56">HIGH</text></g>` +
  `<rect x="-58" y="-49" width="36" height="3" fill="#14161a"/>` +
  `<path d="M-68-196Q-30-214 0-208Q36-216 68-196Q30-200 0-198Q-34-202-68-196Z" fill="#f4f8ff"/><rect x="-74" y="-6" width="148" height="10" rx="4" fill="#3a3e46"/><rect x="-68" y="-196" width="136" height="196" rx="14" fill="url(#${k}fx)" opacity=".5"/></g>`;
function phDeck(): string {
  const k = 'c4_ph_deck', R = rng(61);
  const defs = rg(`${k}fl`, [[0, '#fff', 0.5], [0.5, '#fff', 0.12], [1, '#fff', 0]], 0.45, 0.82, 0.7) +
    rg(`${k}dk`, [[0.25, '#000', 0], [0.7, '#000', 0.55], [1, '#000', 0.92]], 0.45, 0.85, 0.95) +
    lg(`${k}fx`, [[0, '#fff', 0.5], [1, '#fff', 0]], 0.6, 1) + lg(`${k}wl`, [[0, '#120c08'], [1, '#4a3424']]) + lg(`${k}tb`, [[0, '#8a98b4'], [1, '#f4f8ff']]) +
    lg(`${k}hc`, [[0, '#fff2b8', 0.95], [1, '#ffe08a', 0]], 0.4, 1, 0.9, 0) + rg(`${k}hg`, [[0, '#fff', 1], [0.25, '#fff2b8', 0.7], [1, '#fff2b8', 0]]) +
    tex(`${k}wd`, 0.3, 0.012, '0.03 0.02 0.01', -1.6, 0.95, 5) + bl(`${k}b3`, 3) + bl(`${k}b8`, 8) + bl(`${k}b1`, 1.2);
  const body =
    `<rect width="600" height="800" fill="#02040a"/>` +
    // past the corner: night slope, and the nose of a black sled
    `<path d="M430 0H600V420H430Z" fill="#050916"/>` + dots(R, 12, 170, 250, 0.6, 1, '#cfe0ff', 0.6).replace('<path', '<path transform="translate(430 0)"') +
    pines(R, 440, 620, 34, () => 392, 90, 150, '#03060d') +
    `<path d="M430 400Q520 376 600 384V560H430Z" fill="#26324e"/><path d="M430 400Q520 376 600 384" fill="none" stroke="#5a6c94" stroke-width="2"/>` +
    `<g filter="url(#${k}b1)">${sled(643, 478, 1.3)}</g><path d="M436 478h170" stroke="#8a9cc0" stroke-width="2" opacity=".3"/>` +
    // lodge wall
    `<rect width="440" height="560" fill="url(#${k}wl)"/><rect width="440" height="560" filter="url(#${k}wd)" opacity=".7"/>` +
    `<path d="M44 0V560M88 0V560M132 0V560M176 0V560M220 0V560M264 0V560M308 0V560M352 0V560M396 0V560" stroke="#000" stroke-width="2.500" opacity=".5"/>` +
    `<rect x="424" width="16" height="560" fill="#5a4230"/><rect x="436" width="4" height="560" fill="#000" opacity=".5"/>` +
    // the big dark window
    `<rect x="26" y="56" width="372" height="366" fill="#1a120c"/><rect x="42" y="72" width="340" height="334" fill="#04070c"/>` +
    // inside: headlamp cone, a figure, a red jerrycan
    `<g filter="url(#${k}b8)"><path d="M262 176L74 300L150 406H300Z" fill="url(#${k}hc)" opacity=".55"/></g>` +
    `<path d="M214 406Q214 262 240 226Q270 208 300 226Q330 262 332 406Z" fill="#141922"/><path d="M240 226Q226 262 222 406" fill="none" stroke="#6a7690" stroke-width="3.500" opacity=".85"/>` +
    `<path d="M246 208Q240 160 272 152Q304 156 300 208Q274 226 246 208Z" fill="#0d1016"/><path d="M248 196Q246 164 270 156" fill="none" stroke="#5a6478" stroke-width="2.500" opacity=".8"/><path d="M246 178H300" stroke="#1c2230" stroke-width="7"/>` +
    `<path d="M236 250Q196 290 190 318" fill="none" stroke="#161a22" stroke-width="30" stroke-linecap="round"/><path d="M228 250Q190 286 180 316" fill="none" stroke="#4a5468" stroke-width="2.500" opacity=".7"/>` +
    `<g transform="rotate(-6 166 352)"><path d="M130 320h56l14 12v58q0 8-8 8h-62q-8 0-8-8v-62q0-8 8-8z" fill="${RED}"/><path d="M134 334l60 54M194 334l-60 54" stroke="#8a0e14" stroke-width="5"/><path d="M130 320h56l14 12v6h-78v-10q0-8 8-8z" fill="#ff5a5e" opacity=".6"/><rect x="146" y="306" width="36" height="16" rx="5" fill="none" stroke="${RED}" stroke-width="7"/><rect x="186" y="308" width="16" height="12" rx="3" fill="#1c1e24"/></g>` +
    `<circle cx="180" cy="318" r="12" fill="#0d1016"/><circle cx="252" cy="176" r="34" fill="url(#${k}hg)"/><circle cx="252" cy="176" r="6" fill="#fff"/><path d="M222 176h60M252 156v40" stroke="#fff" stroke-width="1.500" opacity=".7"/>` +
    // glass: mullion + flash bounce
    `<rect x="320" y="72" width="12" height="334" fill="#1a120c"/><path d="M42 72L160 72L42 250Z" fill="#fff" opacity=".05"/><path d="M60 406L340 72H382V110L130 406Z" fill="#fff" opacity=".035"/>` +
    `<circle cx="96" cy="118" r="40" fill="url(#${k}hg)" opacity=".5"/><circle cx="96" cy="118" r="5" fill="#fff" opacity=".9"/>` +
    `<rect x="26" y="56" width="372" height="366" fill="none" stroke="#3a2a1c" stroke-width="6"/><path d="M20 424H404V440H20Z" fill="#5a4230"/><path d="M18 424Q120 410 210 420T406 422V430H18Z" fill="#f4f8ff"/>` +
    // deck boards + snow
    `<path d="M0 560H600V800H0Z" fill="#3a2a1e"/><path d="M0 556Q150 540 320 552T600 540V640H0Z" fill="#c4d2ea"/><path d="M0 590H600" stroke="#8a98b8" stroke-width="2" opacity=".5"/>` +
    // picnic table, bag, heater
    `<path d="M-20 660L560 628L640 800H-20Z" fill="#5a4230"/><path d="M-20 652Q140 630 300 640T566 620L640 800H-20Z" fill="url(#${k}tb)"/>` +
    `<path d="M40 800L80 652M250 800L262 642M470 800L436 632" stroke="#8a98b4" stroke-width="2.500" opacity=".5"/>` +
    `<g filter="url(#${k}b3)" fill="#1a2238" opacity=".5"><ellipse cx="196" cy="716" rx="120" ry="16"/><ellipse cx="430" cy="722" rx="130" ry="16"/></g>` +
    bag(172, 716, 1.5) + heater(k, 418, 722, 1.5) +
    `<path d="M70 716Q120 700 170 720Q230 704 276 720Q200 736 70 716ZM296 724Q360 706 420 728Q480 708 540 722Q430 744 296 724Z" fill="#fff"/>` +
    // flash
    `<rect width="600" height="800" fill="url(#${k}fl)"/><rect width="600" height="800" fill="url(#${k}dk)"/>` +
    `<g filter="url(#${k}b3)">${dots(R, 14, 600, 800, 4, 8, '#fff', 0.5)}</g>` + dots(R, 18, 600, 800, 1.2, 2.6, '#fff', 0.8);
  return frame(k, 600, 800, defs, body, 0.26, 0.55);
}

// ───────────────────────────────────────────────────────────── c4_ph_burn
function phBurn(): string {
  const k = 'c4_ph_burn', R = rng(88);
  const defs = lg(`${k}sk`, [[0, '#4a5878'], [0.5, '#9a94a8'], [0.85, '#e8c4b0'], [1, '#f4dcc0']]) + lg(`${k}mt`, [[0, '#b8c2d8'], [1, '#5a6a8e']]) +
    lg(`${k}sm`, [[0, '#4a4a54', 0.2], [0.5, '#56565f', 0.85], [1, '#3a3a42', 0.95]]) + lg(`${k}sn`, [[0, '#aab6d0'], [1, '#4a5a80']]) + bl(`${k}b4`, 4) + bl(`${k}b16`, 16);
  const body =
    `<rect width="800" height="600" fill="url(#${k}sk)"/>` +
    `<g filter="url(#${k}b16)"><path d="M520 200Q500 120 540 40Q570-30 480-90H60Q280-30 360 50Q430 130 462 204Z" fill="url(#${k}sm)"/></g>` +
    `<g filter="url(#${k}b4)"><path d="M504 198Q486 150 500 96Q510 50 450-10H380Q440 50 450 104Q462 160 476 200Z" fill="#33333b" opacity=".9"/></g>` +
    `<path d="M0 330L90 290L170 310L260 250L350 290L420 240L500 280H0Z" fill="#7a86a4" opacity=".7"/>` +
    `<path d="M100 470Q260 380 360 290Q440 210 490 196Q540 204 600 270Q700 380 800 420V600H100Z" fill="url(#${k}mt)"/>` +
    `<path d="M490 196Q540 204 600 270Q700 380 800 420V470Q660 380 580 300Q530 240 490 196Z" fill="#3a4668" opacity=".5"/>` +
    `<path d="M478 198l4-12 3 12 5-16 4 16 5-10 3 10z" fill="#14161c"/><circle cx="490" cy="194" r="4" fill="#ff8a3a" opacity=".9" filter="url(#${k}b4)"/>` +
    `<path d="M300 470L484 200" stroke="#2a3248" stroke-width="2"/>` + tower(356, 386, 60, 0.3, '#2a3248') + tower(412, 304, 44, 0.22, '#2a3248') + tower(456, 240, 30, 0.15, '#2a3248') +
    pines(R, 100, 300, 18, (x) => 470 - (x - 100) * 0.4, 30, 60, '#1a2238') + pines(R, 560, 820, 22, (x) => 330 + (x - 560) * 0.38, 30, 64, '#1a2238') +
    `<path d="M0 480Q400 440 800 474V600H0Z" fill="url(#${k}sn)"/>` + pines(R, -10, 820, 60, () => 486, 60, 130, '#10162a') +
    // still chairs in the foreground
    `<path d="M-20 100L820 40" stroke="#0c1020" stroke-width="5"/><path d="M-20 97L820 37" stroke="#e8c4b0" stroke-width="1" opacity=".5"/>` +
    chair(170, 88, 1.5, 0, '#0c1020', '#d0dcf0', '#e8c4b0') + chair(620, 55, 1.05, 0, '#0c1020', '#d0dcf0', '#e8c4b0') +
    tower(800, 60, 560, 1.6, '#0c1020') + `<path d="M0 560Q300 530 800 570V600H0Z" fill="#1a2238" opacity=".6"/>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.5);
}

// ───────────────────────────────────────────────────────────── c4_ph_newspaper
function phNewspaper(): string {
  const k = 'c4_ph_newspaper';
  const defs = lg(`${k}tb`, [[0, '#7a5434'], [1, '#4a301c']]) + lg(`${k}pp`, [[0, '#f2ecdc'], [1, '#dcd4c0']]) + rg(`${k}lt`, [[0, '#ffe8b8', 0.35], [1, '#ffe8b8', 0]], 0.3, 0.2, 0.8) +
    lg(`${k}ph`, [[0, '#9a9a98'], [1, '#d8d6d0']]) + tex(`${k}wd`, 0.008, 0.3, '0.1 0.05 0.02', -1.6, 0.95, 5) + bl(`${k}b6`, 6) + bl(`${k}b2`, 2);
  const bars = (x: number, y: number, w: number, n: number, gap = 11): string => {
    let d = '';
    for (let i = 0; i < n; i++) d += `M${x} ${y + i * gap}h${i === n - 1 ? Math.round(w * 0.6) : w}`;
    return `<path d="${d}" stroke="#55524c" stroke-width="3.500" opacity=".55"/>`;
  };
  const INKP = '#1a1816';
  const body =
    `<rect width="600" height="800" fill="url(#${k}tb)"/><rect width="600" height="800" filter="url(#${k}wd)" opacity=".6"/><path d="M0 266H600M0 534H600" stroke="#2a1a0e" stroke-width="3" opacity=".6"/>` +
    `<g transform="rotate(-2.500 300 400)"><rect x="34" y="34" width="536" height="740" fill="#000" opacity=".45" filter="url(#${k}b6)" transform="translate(6 10)"/><rect x="30" y="26" width="540" height="748" fill="url(#${k}pp)"/>` +
    `<path d="M48 44H552M48 112H552" stroke="${INKP}" stroke-width="3"/><path d="M48 49H552M48 107H552" stroke="${INKP}" stroke-width="1"/>` +
    tx(300, 92, 37, "THE CUTTER'S GAP COURIER", INKP, SERIF, `${BOLD} ${MID} ${fit(490)}`) +
    `<g font-size="11" fill="${INKP}" ${SANS}><text x="48" y="128">WEDNESDAY, MARCH 11, 2026</text><text x="552" y="128" text-anchor="end">$1.50</text></g><path d="M48 136H552" stroke="${INKP}" stroke-width="1"/>` +
    `<g font-size="47" fill="${INKP}" ${SERIF} ${BOLD}><text x="48" y="186" ${fit(504)}>FIRE MARSHAL: AERIE</text><text x="48" y="236" ${fit(392)}>BLAZE BEGAN IN</text><text x="48" y="286" ${fit(504)}>KITCHEN STOREROOM</text></g>` +
    `<text x="48" y="328" font-size="31" fill="#3a3632" ${SERIF} font-style="italic" ${BOLD}>Accelerant suspected</text><path d="M48 344H552" stroke="${INKP}" stroke-width="1.500"/>` +
    // photo of the burned lodge
    `<rect x="48" y="358" width="262" height="178" fill="url(#${k}ph)"/><g filter="url(#${k}b2)"><path d="M48 480Q180 450 310 476V536H48Z" fill="#eeeae2"/><path d="M190 440Q170 400 200 372Q240 360 300 362" fill="none" stroke="#6a6a68" stroke-width="22" opacity=".5"/></g>` +
    `<path d="M120 486L172 404M150 486L186 430M228 486L196 420M96 486h150" stroke="#1a1816" stroke-width="5" stroke-linecap="round"/><rect x="232" y="408" width="24" height="78" fill="#3a3836"/><path d="M110 486l10-14 12 8 16-12 20 10 18-8 22 16z" fill="#1a1816"/>` +
    `<rect x="48" y="358" width="262" height="178" fill="none" stroke="${INKP}" stroke-width="1.500"/>` + bars(48, 550, 262, 2, 9) +
    `<g font-size="22" fill="${INKP}" ${SERIF} ${BOLD}><text x="328" y="378">Lift mechanic's</text><text x="328" y="404">account of deck</text><text x="328" y="430">heater 'inconsistent</text><text x="328" y="456">with findings'</text></g>` +
    `<path d="M328 470h60" stroke="${INKP}" stroke-width="2"/>` + bars(328, 486, 224, 8) +
    `<path d="M48 584H552" stroke="${INKP}" stroke-width="1"/>` + bars(48, 600, 156, 14) + bars(222, 600, 156, 14) + bars(396, 600, 156, 9) +
    `<path d="M30 400H570" stroke="#000" stroke-width="2" opacity=".08"/></g>` +
    // teacup
    `<ellipse cx="478" cy="716" rx="112" ry="40" fill="#000" opacity=".4" filter="url(#${k}b6)"/><ellipse cx="470" cy="700" rx="104" ry="36" fill="#e8ecf0"/><ellipse cx="470" cy="698" rx="74" ry="24" fill="#c8ccd4"/>` +
    `<path d="M536 660q44-6 42 22q-4 24-46 22" fill="none" stroke="#f4f6f8" stroke-width="11"/><path d="M400 640q0 62 70 62q70 0 70-62z" fill="#f4f6f8"/><path d="M470 702q70 0 70-62h-30q0 50-40 62z" fill="#000" opacity=".12"/>` +
    `<ellipse cx="470" cy="640" rx="70" ry="20" fill="#fbfcfd"/><ellipse cx="470" cy="642" rx="60" ry="15" fill="#a8581a"/><path d="M424 640q20-10 50-8" fill="none" stroke="#e8b070" stroke-width="3" opacity=".7" stroke-linecap="round"/><path d="M408 664q60 14 124 0" fill="none" stroke="#2f7a78" stroke-width="5"/>` +
    `<rect width="600" height="800" fill="url(#${k}lt)"/>`;
  return frame(k, 600, 800, defs, body, 0.16, 0.5);
}

// ───────────────────────────────────────────────────────────── c4_ph_karaoke
const rooster = (x: number, y: number, s: number, c: string, comb: string): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 20Q-22-8-4-18Q-6-28 4-30Q4-24 10-24Q6-20 8-14Q22-12 20 2L10 4Q12 20-14 20Z" fill="${c}"/><path d="M-4-18q-8-10 0-16q2 6 6 4q-2-8 6-10q0 8 6 10q-4 2-4 6z" fill="${comb}"/><path d="M20-4l10 3-10 4z" fill="#e8c048"/><path d="M12 4q4 8-2 12" fill="none" stroke="${comb}" stroke-width="4" stroke-linecap="round"/><circle cx="10" cy="-8" r="2.200" fill="#14161a"/></g>`;
function phKaraoke(): string {
  const k = 'c4_ph_karaoke', R = rng(14);
  const defs = lg(`${k}wl`, [[0, '#1c0f18'], [1, '#0c060c']]) + lg(`${k}c1`, [[0, '#ff4aa0', 0.6], [1, '#ff4aa0', 0]]) + lg(`${k}c2`, [[0, '#3ad8c8', 0.5], [1, '#3ad8c8', 0]]) +
    rg(`${k}ng`, [[0, '#ff4aa0', 0.5], [1, '#ff4aa0', 0]]) + rg(`${k}ag`, [[0, '#ffb040', 0.45], [1, '#ffb040', 0]]) + flannel(`${k}pl`) +
    tex(`${k}wd`, 0.3, 0.01, '0.02 0.01 0.02', -1.6, 0.95, 5) + bl(`${k}b3`, 3) + bl(`${k}b5`, 5);
  const wes = `<path d="${TORSO_L}" fill="url(#${k}pl)"/><path d="M104 146H120C156 152 186 166 188 200V420H112Z" fill="#000" opacity=".3"/><path d="M100 172V420" stroke="#3a1010" stroke-width="2.500"/>` +
    wesFace(true, '#ff6ab0') + `<path d="M70 150L86 138L99 170L84 178Z" fill="#b83430"/><path d="M130 150L114 138L101 170L116 178Z" fill="#5a1614"/>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}wl)"/><rect width="600" height="800" filter="url(#${k}wd)" opacity=".6"/><path d="M0 250H600" stroke="#000" stroke-width="6" opacity=".5"/>` +
    // neon clock
    `<circle cx="150" cy="130" r="150" fill="url(#${k}ng)"/><circle cx="150" cy="130" r="88" fill="#0a060c"/><circle cx="150" cy="130" r="88" fill="none" stroke="#ff4aa0" stroke-width="12" filter="url(#${k}b5)"/><circle cx="150" cy="130" r="88" fill="none" stroke="#ffd0e8" stroke-width="4.500"/>` +
    `<g id="${k}ck" fill="#e4fffa">${seg('1:41', 82, 104, 52)}</g><use href="#${k}ck" filter="url(#${k}b3)" opacity=".8"/>` +
    // chalkboard
    `<rect x="286" y="50" width="292" height="170" rx="4" fill="#5a3e26"/><rect x="298" y="62" width="268" height="146" fill="#1c2a26"/><rect x="298" y="62" width="268" height="146" fill="#fff" opacity=".04"/>` +
    `<g fill="#f0eee4" ${HAND}><text x="432" y="118" font-size="36" ${MID} ${BOLD}>SAT 3/7 —</text><text x="432" y="170" font-size="27" ${MID} ${BOLD} ${fit(244)}>KARAOKE TIL CLOSE</text></g>` +
    `<path d="M330 186q50-8 100 0t106-2" fill="none" stroke="#e8c048" stroke-width="3" stroke-linecap="round" opacity=".8"/>` +
    // rooster logo
    `<circle cx="96" cy="350" r="110" fill="url(#${k}ag)"/><circle cx="96" cy="350" r="58" fill="#1a0f0c"/><circle cx="96" cy="350" r="58" fill="none" stroke="#ffb040" stroke-width="5"/>` + rooster(92, 356, 1.7, '#ffcf70', '#ff5a3a') +
    // back bar bottles
    `<rect x="250" y="330" width="350" height="10" fill="#3a2616"/><g fill="#0c1410" stroke="#3ad8c8" stroke-width="1" stroke-opacity=".4">${[270, 306, 500, 536, 570].map((x, i) => `<path d="M${x} 330v-${40 + i * 4}q0-8 6-10v-16h8v16q6 2 6 10v${40 + i * 4}z"/>`).join('')}</g>` +
    // stage lights
    `<path d="M430-20L160 800H560Z" fill="url(#${k}c1)" opacity=".7"/><path d="M120-20L60 800H420Z" fill="url(#${k}c2)" opacity=".5"/>` +
    // speaker + stage
    `<rect x="470" y="520" width="150" height="230" fill="#0c0c10"/><circle cx="548" cy="590" r="34" fill="#1c1c24" stroke="#3a3a48" stroke-width="4"/><circle cx="548" cy="680" r="48" fill="#1c1c24" stroke="#3a3a48" stroke-width="4"/><circle cx="548" cy="680" r="16" fill="#0c0c10"/>` +
    `<path d="M0 740H600V800H0Z" fill="#2a1a12"/><path d="M0 740H600" stroke="#ff6ab0" stroke-width="3" opacity=".5"/>` +
    // Wes
    bust(318, 400, 1.95, -8, wes) +
    `<path d="M60 820Q120 640 226 590" fill="none" stroke="#3a1010" stroke-width="96" stroke-linecap="round"/><path d="M60 820Q120 640 226 590" fill="none" stroke="url(#${k}pl)" stroke-width="88" stroke-linecap="round"/>` +
    `<path d="M186 640L262 524" stroke="#1c1c24" stroke-width="20" stroke-linecap="round"/><circle cx="272" cy="508" r="27" fill="#aab2bc"/><circle cx="272" cy="508" r="27" fill="none" stroke="#5a6068" stroke-width="3" stroke-dasharray="3 3"/><path d="M256 494q12-12 28-6" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>` +
    `<path d="M182 566Q210 540 244 562L262 606Q250 640 214 644Q180 636 174 604Z" fill="${WES.skin}"/><path d="M192 578l44 22M186 594l42 22M184 610l36 20" stroke="${WES.shade}" stroke-width="3" stroke-linecap="round"/>` +
    `<rect width="600" height="800" fill="#ff4aa0" opacity=".06"/>` + dots(R, 16, 600, 500, 1, 2, '#ffd0e8', 0.5);
  return frame(k, 600, 800, defs, body, 0.24, 0.6);
}

// ───────────────────────────────────────────────────────────── c4_ph_lina
function phLina(): string {
  const k = 'c4_ph_lina', R = rng(70);
  const defs = lg(`${k}sk`, SKY_DAY) + lg(`${k}sn`, [[0, '#ffffff'], [1, '#bcd2f2']]) + rg(`${k}sun`, [[0, '#fff', 0.95], [0.3, '#fff', 0.35], [1, '#fff', 0]]) +
    lg(`${k}gg`, [[0, '#ffb040'], [0.5, '#ff5aa0'], [1, '#6a4ad8']], 1, 1) + bl(`${k}b3`, 3) + bl(`${k}b10`, 10);
  const head = linaBuns + hb(LIN.skin, LIN.shade, '#fff') + eyes('#3a2416', 'laugh') + brows(LIN.hair, 'up', 2.8) + nose('#8a5236') + mouth('laugh', '#5a2420') +
    `<ellipse cx="80" cy="104" rx="7" ry="4" fill="#e8705a" opacity=".4"/><ellipse cx="121" cy="104" rx="7" ry="4" fill="#e8705a" opacity=".35"/><path d="M74 96l-4-3M126 96l4-3" stroke="#3a2416" stroke-width="1.600" stroke-linecap="round"/>` + linaHair +
    // goggles shoved up, askew
    `<g transform="rotate(-9 100 56)"><path d="M62 60Q100 44 138 60" fill="none" stroke="#14161a" stroke-width="9"/><rect x="72" y="42" width="58" height="26" rx="12" fill="#14161a"/><rect x="76" y="46" width="50" height="18" rx="9" fill="url(#${k}gg)"/><path d="M82 51q10-4 20-2" fill="none" stroke="#fff" stroke-width="2.500" opacity=".7" stroke-linecap="round"/></g>`;
  const leg = (d: string): string => `<path d="${d}" fill="none" stroke="#123a48" stroke-width="64" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#1c5a6c" stroke-width="56" stroke-linecap="round" stroke-linejoin="round"/>`;
  const arm = (d: string): string => `<path d="${d}" fill="none" stroke="${PURD}" stroke-width="58" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${PUR}" stroke-width="50" stroke-linecap="round"/>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}sk)"/><circle cx="500" cy="70" r="280" fill="url(#${k}sun)"/>` +
    `<g filter="url(#${k}b3)">${pines(R, -10, 620, 44, (x) => 330 + Math.sin(x / 70) * 14, 70, 150, '#173c32')}</g>` +
    `<path d="M0 340Q140 290 300 316T600 280V800H0Z" fill="url(#${k}sn)"/><path d="M0 420Q200 380 380 420T600 400V800H0Z" fill="#fff"/>` +
    // one ski still on
    `<g transform="rotate(24 204 196)"><rect x="188" y="-40" width="32" height="470" rx="14" fill="#14161a"/><rect x="191" y="-36" width="26" height="462" rx="12" fill="#f4f6f8"/><path d="M191 30h26v60h-26zM191 300h26v40h-26z" fill="${OR}"/><path d="M194-20v440" stroke="#000" stroke-width="2" opacity=".12"/></g>` +
    // legs in the air
    leg('M262 470Q250 330 214 236') + leg('M338 470Q370 360 420 296') +
    `<path d="M178 250L246 216L232 150Q224 132 204 140L164 162Q150 174 158 196Z" fill="#2a2e38"/><path d="M168 190l54-28M176 214l56-28" stroke="#c8ccd4" stroke-width="5"/><rect x="150" y="226" width="110" height="16" rx="6" fill="#8a929c" transform="rotate(-26 205 234)"/>` +
    `<path d="M392 318L458 328L474 262Q476 244 458 238L420 232Q402 234 398 252Z" fill="#2a2e38"/><path d="M408 262l56 10M402 288l58 10" stroke="#c8ccd4" stroke-width="5"/>` +
    // purple jacket, arms flung out
    arm('M232 566Q130 520 70 590') + arm('M368 566Q470 520 534 580') +
    `<circle cx="64" cy="596" r="32" fill="#1c5a6c"/><circle cx="540" cy="586" r="32" fill="#1c5a6c"/><path d="M48 580q14-10 30-2M524 570q14-10 30-2" fill="none" stroke="#fff" stroke-width="4" opacity=".4" stroke-linecap="round"/>` +
    `<path d="M206 610Q196 470 250 440H350Q404 470 394 610Q300 650 206 610Z" fill="${PUR}"/><path d="M310 440H350Q404 470 394 610Q350 628 320 630Z" fill="#000" opacity=".2"/><path d="M300 446V620" stroke="${PURD}" stroke-width="4"/><path d="M226 520Q230 470 258 452" fill="none" stroke="${PURL}" stroke-width="6" opacity=".7" stroke-linecap="round"/>` +
    `<path d="M228 440H372L370 474Q300 500 230 474Z" fill="#123a48"/>` +
    bust(300, 650, 1.55, 176, head) +
    // snow piled over her
    `<g fill="#fff"><path d="M150 600Q200 560 250 590Q230 630 170 640ZM360 590Q410 556 460 596Q440 640 380 630Z"/><path d="M0 770Q120 730 220 768Q300 750 400 770Q500 736 600 764V800H0Z"/><circle cx="262" cy="520" r="16"/><circle cx="350" cy="548" r="12"/></g>` +
    `<path d="M150 600Q200 560 250 590M360 590Q410 556 460 596M0 770Q120 730 220 768Q300 750 400 770Q500 736 600 764" fill="none" stroke="#a8c0e8" stroke-width="3" opacity=".7"/>` +
    `<g filter="url(#${k}b10)"><ellipse cx="300" cy="700" rx="200" ry="30" fill="#7a98cc" opacity=".35"/></g>` +
    // a pole, planted
    `<path d="M520 520L556 300" stroke="#2a2e38" stroke-width="6" stroke-linecap="round"/><circle cx="524" cy="498" r="16" fill="none" stroke="#2a2e38" stroke-width="4"/><rect x="548" y="290" width="14" height="40" rx="6" fill="${OR}" transform="rotate(9 555 310)"/>` +
    dots(R, 40, 600, 500, 1.5, 4, '#fff', 0.95, 250);
  return frame(k, 600, 800, defs, body, 0.14, 0.3);
}

export const case4Art: Record<string, string> = {
  cover_case4: cover(),
  wall_c4_lock: wallLock(),
  wall_c4_home: wallHome(),
  map_c4: mapC4(),
  av_c4_rafi: avRafi(),
  av_c4_lina: avLina(),
  av_c4_mama: avMama(),
  av_c4_kessler: avKessler(),
  av_c4_mags: avMags(),
  av_c4_dag: avDag(),
  av_c4_wes: avWes(),
  av_c4_abara: avAbara(),
  c4_ph_dad: phDad(),
  c4_ph_tower9: phTower9(),
  c4_ph_shop: phShop(),
  c4_ph_aerie: phAerie(),
  c4_ph_sled: phSled(),
  c4_ph_alldown: phAllDown(),
  c4_ph_deck: phDeck(),
  c4_ph_burn: phBurn(),
  c4_ph_newspaper: phNewspaper(),
  c4_ph_karaoke: phKaraoke(),
  c4_ph_lina: phLina(),
};
