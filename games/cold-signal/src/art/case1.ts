// COLD SIGNAL — Case 01 "Low Tide" illustrations.
// Every value in `case1Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key.

type Stop = [number, string, number?];
const st = (s: Stop[]): string =>
  s.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? '' : ` stop-opacity="${a}"`}/>`).join('');
const lg = (id: string, s: Stop[], x2 = 0, y2 = 1, x1 = 0, y1 = 0): string =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${st(s)}</linearGradient>`;
const rg = (id: string, s: Stop[], cx = 0.5, cy = 0.5, r = 0.5): string =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${st(s)}</radialGradient>`;
const bl = (id: string, d: number): string =>
  `<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${d}"/></filter>`;
/** Streaky grain (wood / brushed steel / water). fx,fy = base frequencies; rgb = streak colour. */
const streak = (id: string, fx: number, fy: number, rgb: string, k = -2.2, b = 1.3, seed = 3): string =>
  `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="3" seed="${seed}"/><feColorMatrix values="0 0 0 0 ${rgb.split(' ')[0]} 0 0 0 0 ${rgb.split(' ')[1]} 0 0 0 0 ${rgb.split(' ')[2]} ${k} 0 0 0 ${b}"/></filter>`;
const SANS = 'font-family="Helvetica, Arial, sans-serif"';
const MONO = 'font-family="Courier New, monospace"';
const SERIF = 'font-family="Georgia, serif"';
const n1 = (v: number): string => (Math.round(v * 10) / 10).toString();

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

/** Seven-segment LCD/LED glyphs: digits, space, apostrophe, colon. Returns rects (no fill set). */
const SEG: Record<string, string> = {
  '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc',
  '5': 'afgcd', '6': 'afgedc', '7': 'abc', '8': 'abcdefg', '9': 'abcdfg',
};
function seg(s: string, x: number, y: number, h: number): string {
  const w = h * 0.54, t = h * 0.14, m = t * 0.6, hh = h / 2;
  let o = '', cx = x;
  const r = (X: number, Y: number, W: number, H: number): string =>
    `<rect x="${n1(cx + X)}" y="${n1(y + Y)}" width="${n1(W)}" height="${n1(H)}" rx="${n1(t * 0.3)}"/>`;
  const P: Record<string, number[]> = {
    a: [m, 0, w - 2 * m, t], g: [m, hh - t / 2, w - 2 * m, t], d: [m, h - t, w - 2 * m, t],
    f: [0, m, t, hh - m * 1.4], b: [w - t, m, t, hh - m * 1.4],
    e: [0, hh + m * 0.4, t, hh - m * 1.4], c: [w - t, hh + m * 0.4, t, hh - m * 1.4],
  };
  for (const ch of s) {
    if (ch === ' ') { cx += w * 0.8; continue; }
    if (ch === "'") { o += r(0, 0, t, h * 0.28); cx += t + w * 0.4; continue; }
    if (ch === ':') { o += r(0, h * 0.24, t, t) + r(0, h * 0.64, t, t); cx += t + w * 0.4; continue; }
    for (const q of SEG[ch] ?? '') { const p = P[q]; o += r(p[0], p[1], p[2], p[3]); }
    cx += w * 1.4;
  }
  return o;
}

// ───────────────────────────────────────────────────────────── ph_biscuit
function phBiscuit(): string {
  const k = 'ph_biscuit';
  const defs =
    lg(`${k}w`, [[0, '#6d3f26'], [1, '#b0723f']]) +
    lg(`${k}f`, [[0, '#6a3d22'], [1, '#2e170c']]) +
    rg(`${k}fur`, [[0, '#fbd688'], [0.55, '#e7a94c'], [1, '#b9742a']], 0.42, 0.3, 0.8) +
    rg(`${k}rug`, [[0, '#b9473a'], [1, '#6f2220']]) +
    rg(`${k}lamp`, [[0, '#ffe2a0', 0.95], [0.4, '#ffb45a', 0.4], [1, '#ff9a3a', 0]]) +
    lg(`${k}bow`, [[0, '#f0453f'], [1, '#a3141c']]) +
    lg(`${k}leak`, [[0, '#ff7a2a', 0.55], [1, '#ff7a2a', 0]], 1, 0) +
    bl(`${k}b4`, 4) + bl(`${k}b9`, 9) + bl(`${k}b20`, 20) +
    `<filter id="${k}gl" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}w)"/>` +
    // soft background (out of focus)
    `<g filter="url(#${k}b9)">` +
    `<path d="M330 0h200l-150 520h-230z" fill="#ffd9a0" opacity=".16"/>` +
    `<rect x="60" y="90" width="150" height="120" fill="#3b2416"/><rect x="74" y="104" width="122" height="92" fill="#c7a26a"/><path d="M74 196l40-50 30 28 26-36 26 58z" fill="#5d7a6a"/>` +
    `<rect x="-60" y="290" width="290" height="250" rx="46" fill="#3e5a50"/><rect x="-60" y="380" width="320" height="170" rx="40" fill="#2f463f"/><rect x="60" y="320" width="130" height="110" rx="26" fill="#d9a441" transform="rotate(-10 125 375)"/>` +
    `<rect x="455" y="330" width="150" height="14" fill="#3a2114"/><rect x="520" y="344" width="16" height="180" fill="#3a2114"/>` +
    `<path d="M478 330l22-110h70l22 110z" fill="#ffe7b0"/><rect x="530" y="205" width="10" height="20" fill="#3a2114"/>` +
    `<circle cx="535" cy="270" r="170" fill="url(#${k}lamp)"/>` +
    `<rect y="492" width="600" height="30" fill="#d8b384"/><rect y="518" width="600" height="8" fill="#4a2a17"/></g>` +
    `<rect y="524" width="600" height="276" fill="url(#${k}f)"/>` +
    `<g stroke="#2a150a" stroke-width="2" opacity=".5"><path d="M0 560h600M0 610h600M-40 800l150-276M640 800l-150-276M210 800l50-276M390 800l-50-276"/></g>` +
    // rug
    `<ellipse cx="300" cy="700" rx="372" ry="150" fill="#e8d2a6"/>` +
    `<ellipse cx="300" cy="700" rx="350" ry="138" fill="url(#${k}rug)"/>` +
    `<ellipse cx="300" cy="700" rx="318" ry="122" fill="none" stroke="#edd6a4" stroke-width="5"/>` +
    `<ellipse cx="300" cy="700" rx="290" ry="108" fill="none" stroke="#2f5d5a" stroke-width="12" stroke-dasharray="26 14"/>` +
    `<ellipse cx="300" cy="700" rx="246" ry="90" fill="#8a2c28"/>` +
    `<ellipse cx="300" cy="700" rx="226" ry="80" fill="none" stroke="#e0a948" stroke-width="4" stroke-dasharray="4 10"/>` +
    // toy ball
    `<circle cx="86" cy="716" r="34" fill="#3d7f8a" filter="url(#${k}b4)"/><path d="M58 700q28-20 56 4" stroke="#f3e7c9" stroke-width="7" fill="none" filter="url(#${k}b4)"/>` +
    // puppy
    `<ellipse cx="305" cy="716" rx="190" ry="34" fill="#200a05" opacity=".55" filter="url(#${k}b9)"/>` +
    `<path d="M392 650c60 0 96-34 92-84-22 40-58 44-100 40z" fill="#c98632"/>` +
    `<ellipse cx="222" cy="694" rx="50" ry="26" fill="#d39239"/><ellipse cx="378" cy="694" rx="50" ry="26" fill="#d39239"/>` +
    `<path d="M206 696C182 600 204 500 252 450h96c48 50 70 150 46 246z" fill="url(#${k}fur)"/>` +
    `<path d="M258 468q42 96 84 0 2 130-42 160-44-30-42-160z" fill="#fbe2ab" opacity=".85"/>` +
    `<rect x="254" y="560" width="40" height="146" rx="19" fill="#e9b055"/><rect x="306" y="560" width="40" height="146" rx="19" fill="#e2a64b"/>` +
    `<ellipse cx="274" cy="708" rx="27" ry="14" fill="#f8dca0"/><ellipse cx="326" cy="708" rx="27" ry="14" fill="#f8dca0"/>` +
    `<path d="M262 712v-8M274 714v-9M286 712v-8M314 712v-8M326 714v-9M338 712v-8" stroke="#b9853d" stroke-width="2"/>` +
    // ears + head
    `<path d="M222 288c-58-4-82 76-56 150 40-8 66-56 72-116z" fill="#b8722a"/><path d="M378 288c58-4 82 76 56 150-40-8-66-56-72-116z" fill="#a9661f"/>` +
    `<ellipse cx="300" cy="348" rx="103" ry="94" fill="url(#${k}fur)"/>` +
    `<path d="M252 270q48-26 96 0-48-10-96 0z" fill="#fde3a6" opacity=".7"/>` +
    `<ellipse cx="300" cy="394" rx="56" ry="43" fill="#fbe8bd"/>` +
    `<path d="M279 368q21-12 42 0-3 20-21 24-18-4-21-24z" fill="#2a1712"/><ellipse cx="294" cy="371" rx="6" ry="3" fill="#8a6a60"/>` +
    `<path d="M300 392v12m0 0q-14 16-30 2m30-2q14 16 30 2" stroke="#6b3520" stroke-width="3.5" fill="none" stroke-linecap="round"/>` +
    `<path d="M286 409q14 40 28 0-14 8-28 0z" fill="#ee7480"/>` +
    `<circle cx="260" cy="338" r="13" fill="#1f120d"/><circle cx="340" cy="338" r="13" fill="#1f120d"/>` +
    `<circle cx="265" cy="333" r="4.5" fill="#fff"/><circle cx="345" cy="333" r="4.5" fill="#fff"/>` +
    `<path d="M242 316q16-12 32-4M326 312q16-8 32 4" stroke="#c28434" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    // red bow
    `<path d="M292 474l-26 62 24-8 14-48zM308 474l26 62-24-8-14-48z" fill="#a3141c"/>` +
    `<path d="M300 456l-72-34q-14 34 0 70zM300 456l72-34q14 34 0 70z" fill="url(#${k}bow)"/>` +
    `<path d="M300 456l-56-12M300 456l-56 16M300 456l56-12M300 456l56 16" stroke="#8a0f16" stroke-width="3" opacity=".7"/>` +
    `<rect x="283" y="438" width="34" height="38" rx="10" fill="#e3353a"/><path d="M290 444q10-4 20 0" stroke="#ff8a84" stroke-width="3" fill="none"/>` +
    // film look
    `<rect width="600" height="800" fill="#ffae5a" opacity=".13"/><rect width="600" height="800" fill="#3a2a4a" opacity=".1"/>` +
    `<rect width="170" height="800" fill="url(#${k}leak)" opacity=".5"/>` +
    // date stamp
    `<rect x="300" y="702" width="284" height="72" rx="20" fill="#2a0a06" opacity=".55" filter="url(#${k}b9)"/><g transform="translate(322 716) skewX(-7)" filter="url(#${k}gl)" fill="#ffc04a">${seg("02 14 '18", 0, 0, 46)}</g>`;
  return frame(k, 600, 800, defs, body, 0.22, 0.6);
}

// ───────────────────────────────────────────────────────────── ph_selfie
function phSelfie(): string {
  const k = 'ph_selfie';
  const defs =
    lg(`${k}sky`, [[0, '#6f9aa8'], [0.45, '#e9c592'], [0.8, '#ffb866'], [1, '#ff9d52']]) +
    lg(`${k}sea`, [[0, '#f0a25c'], [1, '#4f8590']]) +
    lg(`${k}sand`, [[0, '#c9925e'], [0.5, '#8b6c5c'], [1, '#4d4148']]) +
    rg(`${k}sun`, [[0, '#fff6d6', 1], [0.18, '#ffe0a0', 0.85], [1, '#ffb45a', 0]]) +
    lg(`${k}coat`, [[0, '#ffd94a'], [1, '#d99a14']]) +
    lg(`${k}den`, [[0, '#6c93bd'], [1, '#2f4a70']]) +
    lg(`${k}m`, [[0, '#f0b98e'], [1, '#c98a62']], 1, 0.3) +
    lg(`${k}j`, [[0, '#a56a42'], [1, '#6a3f27']], 1, 0.3) +
    lg(`${k}warm`, [[0, '#ffb14e', 0.2], [0.7, '#ff9a4e', 0]], 1, 0.2) +
    bl(`${k}b3`, 3) + bl(`${k}b8`, 8);
  const face = (cx: number, cy: number, ink: string, lip: string): string =>
    `<path d="M${cx - 42} ${cy - 22}q14-11 28-2M${cx + 14} ${cy - 24}q14-9 28 2" stroke="${ink}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<path d="M${cx - 38} ${cy + 2}q11-13 22 0M${cx + 16} ${cy + 2}q11-13 22 0" stroke="${ink}" stroke-width="5.5" fill="none" stroke-linecap="round"/>` +
    `<path d="M${cx - 3} ${cy + 8}q-8 20 6 24" stroke="${lip}" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".7"/>` +
    `<path d="M${cx - 30} ${cy + 46}q30 16 62 0-8 30-31 30t-31-30z" fill="#fff8ee" stroke="${lip}" stroke-width="3"/>`;
  const body =
    `<rect width="600" height="340" fill="url(#${k}sky)"/>` +
    `<circle cx="118" cy="296" r="250" fill="url(#${k}sun)"/>` +
    `<g filter="url(#${k}b3)"><path d="M430 332l50-22 46-6 22-12 8 0 0-26 6 0 0 26 38 14v34z" fill="#a8788a" opacity=".75"/>` +
    `<path d="M0 60q120 20 240-6t360 22" stroke="#fff3d6" stroke-width="16" opacity=".25" fill="none"/></g>` +
    `<rect y="330" width="600" height="80" fill="url(#${k}sea)"/>` +
    `<path d="M40 342h170M70 356h120M20 372h220M90 388h150M330 350h150M300 380h260" stroke="#fff0c0" stroke-width="3" opacity=".6" stroke-linecap="round"/>` +
    `<rect y="404" width="600" height="396" fill="url(#${k}sand)"/>` +
    `<g filter="url(#${k}b3)"><path d="M0 404q150 18 300 4t300 8v10H0z" fill="#fff0d0" opacity=".7"/>` +
    `<ellipse cx="120" cy="470" rx="160" ry="16" fill="#ffd08a" opacity=".65"/><ellipse cx="470" cy="500" rx="150" ry="13" fill="#f6c890" opacity=".4"/><ellipse cx="80" cy="560" rx="170" ry="18" fill="#ffc47a" opacity=".4"/>` +
    `<ellipse cx="520" cy="440" rx="40" ry="9" fill="#3d3038" opacity=".6"/><ellipse cx="24" cy="505" rx="34" ry="8" fill="#3d3038" opacity=".5"/></g>` +
    // June
    `<g transform="rotate(-7 410 420)">` +
    `<path d="M236 800c8-140 54-204 128-232l44 44 36-44c80 28 132 100 142 232z" fill="url(#${k}den)"/>` +
    `<path d="M372 566l36 60 30-60-10 150h-44z" fill="#f4efe6"/>` +
    `<path d="M364 568l-34 42 48 60 30-58zM444 568l34 42-50 62-20-60z" fill="#7ea4cc"/>` +
    `<path d="M300 640q-20 70-22 160M520 640q22 70 26 160M330 610l48 60M478 610l-50 62" stroke="#b9d6f2" stroke-width="2.5" stroke-dasharray="7 6" fill="none" opacity=".7"/>` +
    `<rect x="378" y="490" width="60" height="100" rx="24" fill="#7a4a2e"/>` +
    `<circle cx="352" cy="350" r="42"/><circle cx="392" cy="322" r="46"/><circle cx="436" cy="324" r="44"/><circle cx="468" cy="356" r="40"/><circle cx="410" cy="350" r="62"/>` +
    `<ellipse cx="408" cy="420" rx="70" ry="86" fill="url(#${k}j)"/>` +
    `<ellipse cx="338" cy="428" rx="12" ry="20" fill="#8a5535"/><ellipse cx="478" cy="428" rx="12" ry="20" fill="#6a3f27"/>` +
    `<circle cx="336" cy="460" r="11" fill="none" stroke="#f2c14e" stroke-width="3.5"/><circle cx="480" cy="460" r="11" fill="none" stroke="#f2c14e" stroke-width="3.5"/>` +
    `<path d="M338 408c2-52 34-70 70-70s70 20 70 70c-18-30-42-40-70-40s-54 12-70 40z"/>` +
    `<ellipse cx="366" cy="446" rx="16" ry="10" fill="#d0624e" opacity=".3"/><ellipse cx="452" cy="446" rx="16" ry="10" fill="#d0624e" opacity=".3"/>` +
    face(408, 420, '#1c100c', '#4a1f18') +
    `<path d="M322 366q-6-46 40-74 30-22 70-10" stroke="#ffd08a" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/>` +
    `<path d="M240 780q10-130 110-202" stroke="#ffd9a0" stroke-width="5" fill="none" opacity=".6"/>` +
    `</g>` +
    // Mara
    `<g transform="rotate(6 210 450)">` +
    `<path d="M112 450c-14-110 28-158 102-158 80 0 120 54 106 160q22 30 4 62-16 34 10 62 14 30-6 52l-70 30H96q-24-34 2-64 22-34-4-66-10-40 18-78z" fill="#1c1110"/>` +
    `<path d="M-40 800c0-150 70-212 190-238l64 50 56-50c84 22 122 100 126 238z" fill="url(#${k}coat)"/>` +
    `<path d="M142 572q72-64 144-2-70 62-144 2z" fill="#c48d12"/>` +
    `<path d="M214 612v188" stroke="#a87708" stroke-width="5"/><path d="M190 600l-8 90M240 600l8 90" stroke="#f7f0dc" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M60 640q-70 60-80 160" stroke="#fff0a0" stroke-width="6" fill="none" opacity=".7"/>` +
    `<rect x="186" y="500" width="56" height="86" rx="22" fill="#c98a62"/>` +
    `<ellipse cx="214" cy="440" rx="72" ry="88" fill="url(#${k}m)"/>` +
    `<path d="M140 432c-4-76 34-108 78-106 50 2 76 44 70 108-16-44-44-66-82-70-32 10-54 34-66 68z" fill="#221513"/>` +
    `<path d="M142 420c-26 50 10 84-18 150 40-16 46-70 34-122zM288 428c24 48-10 80 20 150-38-18-44-72-34-122z" fill="#1c1110"/>` +
    `<path d="M150 380q30-44 80-40M124 500q-2 40 6 70M300 500q4 44-4 80M170 350q40-26 86-6" stroke="#5a3a26" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>` +
    `<ellipse cx="172" cy="466" rx="16" ry="10" fill="#e8705e" opacity=".35"/><ellipse cx="256" cy="466" rx="16" ry="10" fill="#e8705e" opacity=".35"/>` +
    face(214, 440, '#2a1a17', '#9a4038') +
    `<path d="M108 468c-16-112 28-172 104-174" stroke="#ffd48a" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9"/>` +
    `<path d="M118 500c-8 50 12 84-8 130" stroke="#ffc878" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>` +
    `</g>` +
    `<rect width="600" height="800" fill="url(#${k}warm)"/>` +
    `<circle cx="60" cy="250" r="30" fill="#ffe0a0" opacity=".14"/><circle cx="20" cy="210" r="14" fill="#fff" opacity=".14"/>`;
  return frame(k, 600, 800, defs, body, 0.14, 0.45);
}

// ───────────────────────────────────────────────────────────── ph_tidepool
function phTidepool(): string {
  const k = 'ph_tidepool';
  const R = rng(11);
  const defs =
    rg(`${k}pool`, [[0, '#58b7a6'], [0.5, '#2a8588'], [0.85, '#144f5c'], [1, '#0d3340']], 0.45, 0.42, 0.62) +
    rg(`${k}star`, [[0, '#f5a83a'], [0.6, '#dc7f22'], [1, '#a9530f']]) +
    lg(`${k}sunl`, [[0, '#ffe6b0', 0.5], [0.5, '#ffe6b0', 0.08], [1, '#06202a', 0.35]], 1, 1) +
    bl(`${k}b2`, 2) + bl(`${k}b6`, 6) + bl(`${k}b14`, 14) +
    streak(`${k}rock`, 0.02, 0.03, '.05 .07 .09', -3, 1.6, 5) +
    `<filter id="${k}ca" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.011 0.016" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .85 0 0 0 0 1 0 0 0 0 .9 -9 0 0 0 1.5"/></filter>` +
    `<clipPath id="${k}cp"><path d="M70 150C150 60 330 40 450 96c90 40 130 150 110 270 30 120-20 260-120 320-110 60-260 50-340-30C20 580 10 420 40 320 30 250 30 200 70 150z"/></clipPath>`;
  const pool = `M70 150C150 60 330 40 450 96c90 40 130 150 110 270 30 120-20 260-120 320-110 60-260 50-340-30C20 580 10 420 40 320 30 250 30 200 70 150z`;
  let barn = '';
  for (let i = 0; i < 34; i++) {
    const a = R() * 6.283, d = 1.05 + R() * 0.28;
    const x = 300 + Math.cos(a) * 300 * d, y = 400 + Math.sin(a) * 390 * d, r = 4 + R() * 6;
    if (x < 5 || x > 595 || y < 5 || y > 795) continue;
    barn += `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(r)}" fill="#c9c4b4"/><circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(r * 0.4)}" fill="#3a3a3a"/>`;
  }
  let peb = '';
  const pc = ['#7d8a80', '#a89a7c', '#5d7078', '#b9a98c', '#6b6f6a', '#8f7f6f'];
  for (let i = 0; i < 26; i++) {
    const x = 90 + R() * 420, y = 130 + R() * 560;
    peb += `<ellipse cx="${n1(x)}" cy="${n1(y)}" rx="${n1(10 + R() * 22)}" ry="${n1(8 + R() * 14)}" fill="${pc[i % 6]}" transform="rotate(${Math.round(R() * 180)} ${n1(x)} ${n1(y)})"/>`;
  }
  const star = (): string => {
    let p = '', dots = '';
    for (let i = 0; i < 10; i++) {
      const a = (i * 36 - 90) * Math.PI / 180, r = i % 2 ? 46 : 128;
      p += `${i ? 'L' : 'M'}${n1(Math.cos(a) * r)} ${n1(Math.sin(a) * r)}`;
      if (i % 2 === 0) dots += `M0 0L${n1(Math.cos(a) * 126)} ${n1(Math.sin(a) * 126)}`;
    }
    return `<g transform="translate(292 392) rotate(14)">` +
      `<path d="${p}z" transform="translate(10 16)" fill="#04202a" opacity=".5" stroke="#04202a" stroke-width="30" stroke-linejoin="round" filter="url(#${k}b6)"/>` +
      `<path d="${p}z" fill="url(#${k}star)" stroke="#c96d1a" stroke-width="30" stroke-linejoin="round"/>` +
      `<path d="${p}z" fill="url(#${k}star)" stroke="#e58b28" stroke-width="16" stroke-linejoin="round"/>` +
      `<path d="${dots}" stroke="#ffe3a8" stroke-width="5" stroke-dasharray="1 10" stroke-linecap="round" fill="none"/>` +
      `<path d="${dots}" stroke="#ffd08a" stroke-width="3.5" stroke-dasharray="1 9" stroke-linecap="round" fill="none" transform="rotate(5) scale(.8)"/>` +
      `<path d="${dots}" stroke="#ffd08a" stroke-width="3.5" stroke-dasharray="1 9" stroke-linecap="round" fill="none" transform="rotate(-5) scale(.8)"/>` +
      `<circle r="16" fill="none" stroke="#ffe9bd" stroke-width="4" stroke-dasharray="1 8" stroke-linecap="round"/><circle r="5" fill="#ffe9bd"/>` +
      `<path d="M-20-110l14 60M-96-48l60 24" stroke="#ffd9a0" stroke-width="5" stroke-linecap="round" opacity=".45"/></g>`;
  };
  const anem = (x: number, y: number, r: number, c: string, c2: string): string =>
    `<g transform="translate(${x} ${y})"><circle r="${r * 1.25}" fill="#04202a" opacity=".35" filter="url(#${k}b6)"/>` +
    `<circle r="${n1(r * 0.78)}" fill="none" stroke="${c}" stroke-width="${n1(r * 0.6)}" stroke-dasharray="5 4"/>` +
    `<circle r="${n1(r * 0.62)}" fill="none" stroke="${c2}" stroke-width="${n1(r * 0.5)}" stroke-dasharray="4 5" transform="rotate(9)"/>` +
    `<circle r="${n1(r * 0.36)}" fill="${c2}"/><circle r="${n1(r * 0.12)}" fill="#12303a"/></g>`;
  const body =
    `<rect width="600" height="800" fill="#30363b"/><rect width="600" height="800" filter="url(#${k}rock)"/>` +
    `<path d="M0 0h260l-60 70-120 30L0 200zM600 800H380l70-60 110-40 40-110zM600 0v160l-50-70-90-50zM0 800V620l50 90 90 60z" fill="#4a5157" opacity=".7"/>` +
    barn +
    `<path d="${pool}" fill="#d9c9a0" stroke="#e9dcb8" stroke-width="16" opacity=".5" filter="url(#${k}b6)"/>` +
    `<path d="${pool}" fill="url(#${k}pool)"/>` +
    `<g clip-path="url(#${k}cp)">` +
    `<g opacity=".55" filter="url(#${k}b2)">${peb}</g>` +
    `<path d="M40 640c50-70 30-150 80-210M70 700c70-60 60-150 120-190M30 560c40-30 40-90 70-120" stroke="#55702c" stroke-width="22" stroke-linecap="round" fill="none"/>` +
    `<path d="M40 640c50-70 30-150 80-210M70 700c70-60 60-150 120-190" stroke="#8aa23e" stroke-width="5" stroke-linecap="round" fill="none" opacity=".8"/>` +
    `<path d="M520 110c-40 50-10 100-50 150M560 180c-30 30-20 70-50 100" stroke="#7a3550" stroke-width="16" stroke-linecap="round" fill="none"/>` +
    anem(452, 250, 46, '#7fe0b0', '#3f9d83') + anem(496, 338, 30, '#9aeac0', '#4aa98c') + anem(150, 200, 38, '#f08aa8', '#b8486e') + anem(400, 610, 42, '#7fe0b0', '#3f9d83') + anem(216, 646, 26, '#f6a2bb', '#b8486e') +
    // mussels
    `<g fill="#1a2334" stroke="#5a6a8c" stroke-width="2.5"><path d="M486 520q30-34 54 0-24 30-54 0zM500 560q34-24 52 14-34 20-52-14zM462 556q24-30 44-4-18 30-44 4zM520 486q26-24 44 6-24 22-44-6z"/></g>` +
    // crab
    `<g transform="translate(150 520) rotate(-20)"><path d="M-30-6l-22-16M-30 4l-26 2M-28 12l-20 18M30-6l22-16M30 4l26 2M28 12l20 18" stroke="#b84a2a" stroke-width="5" stroke-linecap="round"/><ellipse rx="32" ry="22" fill="#d9603a"/><ellipse rx="20" ry="11" cy="-4" fill="#f08a5a" opacity=".7"/><circle cx="-10" cy="-20" r="4" fill="#1a1a1a"/><circle cx="10" cy="-20" r="4" fill="#1a1a1a"/><path d="M-26-18q-16-22 4-30M26-18q16-22-4-30" stroke="#d9603a" stroke-width="8" fill="none" stroke-linecap="round"/></g>` +
    star() +
    `<rect width="600" height="800" filter="url(#${k}ca)" opacity=".3"/>` +
    `<rect width="600" height="800" fill="url(#${k}sunl)"/>` +
    `<path d="M110 250q80-90 210-110M360 690q110-30 160-140" stroke="#fff" stroke-width="5" fill="none" opacity=".35" stroke-linecap="round" filter="url(#${k}b2)"/>` +
    `<path d="M-40 420L330-40h130L-40 590z" fill="#fff6dc" opacity=".12" filter="url(#${k}b14)"/>` +
    `</g>` +
    `<path d="${pool}" fill="none" stroke="#0b2a33" stroke-width="7" opacity=".6"/>` +
    `<path d="M70 150C150 60 330 40 450 96" fill="none" stroke="#ffe9c0" stroke-width="3" opacity=".6"/>`;
  return frame(k, 600, 800, defs, body, 0.14, 0.5);
}

// ───────────────────────────────────────────────────────────── ph_coffee
function phCoffee(): string {
  const k = 'ph_coffee';
  const defs =
    lg(`${k}t`, [[0, '#9a6638'], [1, '#63391d']], 1, 1) +
    streak(`${k}wd`, 0.5, 0.008, '.16 .07 .02', -2.4, 1.35, 8) +
    rg(`${k}sau`, [[0.6, '#f6f1e8'], [0.82, '#e2dacb'], [1, '#f3ede2']]) +
    rg(`${k}cup`, [[0.8, '#fffdf8'], [1, '#d8d0c2']]) +
    rg(`${k}cof`, [[0, '#d39a5c'], [0.7, '#a86a34'], [1, '#6e3f1c']]) +
    lg(`${k}sp`, [[0, '#f4f4f0'], [0.5, '#9aa0a2'], [1, '#e2e2de']], 1, 0) +
    bl(`${k}b3`, 3) + bl(`${k}b12`, 12) + bl(`${k}b30`, 30) +
    `<clipPath id="${k}cp"><circle cx="300" cy="400" r="150"/></clipPath>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}t)"/><rect width="600" height="800" filter="url(#${k}wd)" opacity=".75"/>` +
    `<path d="M196 0v800M418 0v800" stroke="#3a1f0e" stroke-width="3" opacity=".7"/><path d="M199 0v800M421 0v800" stroke="#c08a55" stroke-width="1.5" opacity=".5"/>` +
    // window light
    `<g filter="url(#${k}b12)" opacity=".34"><path d="M-40 60L420-80l150 0L-40 330z" fill="#ffe2b0"/><path d="M-40 420L640 40v170L-40 640z" fill="#ffe2b0"/></g>` +
    // notebook + pencil
    `<g transform="rotate(-14 90 110)"><rect x="-60" y="-40" width="250" height="210" rx="6" fill="#0c2a30" opacity=".45" filter="url(#${k}b12)"/><rect x="-70" y="-50" width="250" height="210" rx="6" fill="#1f4a50"/><rect x="-70" y="-50" width="250" height="210" rx="6" fill="none" stroke="#2f6a70" stroke-width="3"/><rect x="130" y="-50" width="14" height="210" fill="#e8b84a"/><rect x="-30" y="60" width="110" height="46" rx="3" fill="#efe6d0"/><path d="M-18 76h80M-18 90h56" stroke="#5a5a5a" stroke-width="3"/></g>` +
    `<g transform="rotate(38 520 690)"><rect x="420" y="684" width="190" height="14" rx="3" fill="#e2b33a"/><path d="M420 684l-26 7 26 7z" fill="#e9cfa0"/><path d="M400 689.500l-6 1.500 6 1.500z" fill="#222"/><rect x="596" y="684" width="18" height="14" fill="#d98a8a"/></g>` +
    // saucer + cup
    `<circle cx="322" cy="428" r="222" fill="#1c0d05" opacity=".6" filter="url(#${k}b30)"/>` +
    `<circle cx="300" cy="400" r="218" fill="url(#${k}sau)"/><circle cx="300" cy="400" r="214" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>` +
    `<path d="M446 372q92-10 96 28t-96 28z" fill="#c9c1b2" filter="url(#${k}b3)" transform="translate(8 12)"/>` +
    `<path d="M440 368q98-14 104 32t-104 32v-22q76 4 74-10t-74-10z" fill="#fbf8f1"/>` +
    `<circle cx="312" cy="414" r="170" fill="#3a2a1c" opacity=".4" filter="url(#${k}b12)"/>` +
    `<circle cx="300" cy="400" r="166" fill="url(#${k}cup)"/>` +
    `<circle cx="300" cy="400" r="150" fill="url(#${k}cof)"/>` +
    `<g clip-path="url(#${k}cp)">` +
    `<path d="M150 400q30-40 0-90M176 300q60-60 150-64M440 330q30 60 0 130" stroke="#e7b77c" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/>` +
    // the wave
    `<path d="M150 452c26-70 86-134 168-140 52-4 86 26 84 62-2 30-34 44-54 28-16-14-6-38 14-34-28-22-76-2-92 44 30-22 66-6 62 30 60 8 104-22 122-70 14 90-52 168-152 170-78 0-140-34-152-90z" fill="#fdf5e6"/>` +
    `<path d="M180 470c30-70 76-116 140-124M214 500c40-20 80-20 110-4M250 530q60 16 130-20" stroke="#d9a468" stroke-width="5" fill="none" stroke-linecap="round" opacity=".75"/>` +
    `<circle cx="392" cy="300" r="9" fill="#fdf5e6"/><circle cx="420" cy="322" r="6" fill="#fdf5e6"/><circle cx="366" cy="282" r="5" fill="#fdf5e6"/><circle cx="430" cy="352" r="4" fill="#fdf5e6"/>` +
    `<path d="M170 330q50-70 150-74" stroke="#fff" stroke-width="10" fill="none" opacity=".2" stroke-linecap="round" filter="url(#${k}b3)"/>` +
    `</g>` +
    `<circle cx="300" cy="400" r="150" fill="none" stroke="#5a3418" stroke-width="4" opacity=".5"/>` +
    `<path d="M170 318a158 158 0 0 1 150-76" stroke="#fff" stroke-width="7" fill="none" opacity=".9" stroke-linecap="round"/>` +
    // spoon
    `<g transform="rotate(-32 150 560)"><rect x="60" y="566" width="150" height="12" rx="6" fill="#3a2a1c" opacity=".4" filter="url(#${k}b3)"/><rect x="60" y="556" width="150" height="11" rx="5.500" fill="url(#${k}sp)"/><ellipse cx="50" cy="562" rx="32" ry="21" fill="url(#${k}sp)"/><ellipse cx="46" cy="560" rx="20" ry="12" fill="#fff" opacity=".5"/></g>` +
    // sugar packet + crumbs
    `<g transform="rotate(18 500 130)"><rect x="446" y="96" width="120" height="70" rx="3" fill="#2a1408" opacity=".4" filter="url(#${k}b3)" transform="translate(5 7)"/><rect x="446" y="96" width="120" height="70" rx="3" fill="#f3ece0"/><rect x="446" y="96" width="120" height="16" fill="#3d7f8a"/><path d="M462 132h60M462 146h40" stroke="#9a8f80" stroke-width="4"/></g>`;
  return frame(k, 600, 800, defs, body, 0.14, 0.55);
}

// ───────────────────────────────────────────────────────────── ph_seawren
function phSeawren(): string {
  const k = 'ph_seawren';
  const defs =
    lg(`${k}sky`, [[0, '#8fb3c2'], [0.6, '#d5e2de'], [1, '#f4e6c8']]) +
    lg(`${k}sea`, [[0, '#8fb8b6'], [0.35, '#3f7f88'], [1, '#143e4a']]) +
    lg(`${k}hull`, [[0, '#2c6068'], [0.6, '#1c4750'], [1, '#12333b']]) +
    lg(`${k}cab`, [[0, '#f3ead2'], [1, '#c9bb9a']], 1, 0) +
    lg(`${k}dock`, [[0, '#9a7754'], [1, '#5a3f2a']]) +
    lg(`${k}sun`, [[0, '#fff2cc', 0.4], [0.6, '#fff2cc', 0]], 0, 1, 1, 0) +
    streak(`${k}wd`, 0.012, 0.4, '.1 .07 .05', -2.4, 1.3, 2) +
    bl(`${k}b2`, 2) + bl(`${k}b5`, 5) +
    `<clipPath id="${k}hc"><path d="M88 282c50 16 96 30 166 36h380c34 0 58-12 76-30l-16 112c-8 26-36 34-66 34H216c-56-2-102-56-128-152z"/></clipPath>`;
  const hull = 'M88 282c50 16 96 30 166 36h380c34 0 58-12 76-30l-16 112c-8 26-36 34-66 34H216c-56-2-102-56-128-152z';
  const body =
    `<rect width="800" height="260" fill="url(#${k}sky)"/>` +
    `<g filter="url(#${k}b2)"><path d="M0 232q120-50 260-30t240-10 300 30v40H0z" fill="#7f9ea8" opacity=".7"/>` +
    `<path d="M0 248q200-20 420-6t380-4v24H0z" fill="#587f86"/>` +
    `<g fill="#e9e2d0" opacity=".8"><rect x="40" y="236" width="18" height="12"/><rect x="64" y="230" width="14" height="18"/><rect x="84" y="238" width="22" height="10"/><rect x="590" y="234" width="16" height="14"/><rect x="612" y="238" width="24" height="10"/><rect x="742" y="232" width="14" height="16"/></g>` +
    `<path d="M700 250v-70l26 62zM170 250v-46l16 40z" fill="#f4f0e4"/></g>` +
    `<rect y="256" width="800" height="344" fill="url(#${k}sea)"/>` +
    `<path d="M30 276h120M240 270h90M520 274h150M690 284h90M10 300h60M720 312h70M20 470h90M700 452h90M560 470h70" stroke="#e6f2ea" stroke-width="2.500" opacity=".5" stroke-linecap="round"/>` +
    // reflection
    `<g filter="url(#${k}b5)"><path d="M120 436h560c-10 60-60 100-130 110H260c-70-16-120-60-140-110z" fill="#0c2a32" opacity=".7"/><rect x="392" y="440" width="12" height="150" fill="#3a2a20" opacity=".5"/><rect x="430" y="440" width="130" height="70" fill="#d9cdb0" opacity=".25"/></g>` +
    `<path d="M150 462h220M300 486h260M210 512h180M420 530h120M180 448h90M500 452h130" stroke="#7fb0b0" stroke-width="3" opacity=".55" stroke-linecap="round"/>` +
    // rigging + mast
    `<path d="M398 60L96 282M398 60l306 228M398 110l160 106" stroke="#2a2a2a" stroke-width="2" opacity=".7"/>` +
    `<rect x="393" y="56" width="10" height="262" fill="#6b4a32"/><rect x="393" y="56" width="4" height="262" fill="#a37a55"/>` +
    `<path d="M398 150l-190 120" stroke="#5a3d28" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M403 66l44 12-44 14z" fill="#c8402e"/><circle cx="398" cy="54" r="5" fill="#e9e2d0"/>` +
    // wheelhouse
    `<rect x="420" y="208" width="150" height="14" rx="3" fill="#6e4630"/><rect x="430" y="220" width="130" height="100" fill="url(#${k}cab)"/>` +
    `<rect x="442" y="236" width="42" height="40" rx="3" fill="#1d3a44"/><rect x="496" y="236" width="52" height="40" rx="3" fill="#1d3a44"/><path d="M446 270l30-30M500 272l34-34" stroke="#9fc4c8" stroke-width="5" opacity=".5"/>` +
    `<circle cx="520" cy="298" r="13" fill="none" stroke="#d9432e" stroke-width="7"/><path d="M520 285v8M520 303v8M507 298h8M525 298h8" stroke="#f4efe2" stroke-width="7"/>` +
    `<rect x="286" y="290" width="144" height="30" fill="#d9cdb0"/><rect x="286" y="284" width="148" height="8" fill="#6e4630"/><circle cx="322" cy="306" r="7" fill="#1d3a44"/><circle cx="356" cy="306" r="7" fill="#1d3a44"/>` +
    `<path d="M476 208v-34M470 174h34" stroke="#333" stroke-width="3"/><rect x="560" y="286" width="90" height="32" rx="4" fill="#3b6a52"/><path d="M566 294h78M566 304h78" stroke="#9ac0a0" stroke-width="2" opacity=".6"/>` +
    // hull
    `<path d="${hull}" fill="url(#${k}hull)"/>` +
    `<g clip-path="url(#${k}hc)"><rect x="60" y="404" width="700" height="40" fill="#8a3226"/><rect x="60" y="398" width="700" height="7" fill="#e9dfc8"/>` +
    `<path d="M90 300q150 40 620 14M100 330q150 34 600 16M112 362q150 24 590 14" stroke="#0c262c" stroke-width="2" fill="none" opacity=".5"/>` +
    `<rect x="60" y="270" width="700" height="180" filter="url(#${k}wd)" opacity=".45"/>` +
    `<path d="M250 400l8 30M470 402l-6 28M610 400l4 30" stroke="#5a1d14" stroke-width="5" opacity=".6"/></g>` +
    `<path d="M88 282c50 16 96 30 166 36h380c34 0 58-12 76-30" fill="none" stroke="#efe6cf" stroke-width="9" stroke-linecap="round"/>` +
    `<path d="M88 282c50 16 96 30 166 36h380c34 0 58-12 76-30" fill="none" stroke="#7a5236" stroke-width="3" stroke-linecap="round" transform="translate(0 -6)"/>` +
    `<text x="170" y="386" ${SERIF} font-size="56" font-weight="bold" letter-spacing="4" fill="#f4ecd6" transform="rotate(1.500 170 386)">SEA WREN</text>` +
    `<text x="640" y="350" ${SANS} font-size="15" font-weight="bold" fill="#f4ecd6" opacity=".8">HB 214</text>` +
    `<circle cx="600" cy="352" r="17" fill="#f08a2a"/><circle cx="600" cy="352" r="6" fill="#b85a14"/><path d="M600 318v18" stroke="#ddd" stroke-width="2"/>` +
    `<circle cx="560" cy="366" r="15" fill="#e8e0cc"/><path d="M560 318v34" stroke="#ddd" stroke-width="2"/>` +
    // dock
    `<path d="M0 520l800-30v110H0z" fill="url(#${k}dock)"/>` +
    `<path d="M0 520l800-30" stroke="#d9b88c" stroke-width="4"/><path d="M90 517l-30 83M230 512l-20 88M370 506l-8 94M510 501l6 99M650 496l20 104M770 491l30 80" stroke="#3a2718" stroke-width="3" opacity=".7"/>` +
    `<rect y="490" width="800" height="110" filter="url(#${k}wd)" opacity=".35"/>` +
    `<path d="M440 508c-130-24-280-80-344-224" stroke="#e2d2a8" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M440 508c-130-24-280-80-344-224" stroke="#8a7a58" stroke-width="5" fill="none" stroke-dasharray="3 6"/>` +
    `<rect x="416" y="440" width="46" height="120" rx="6" fill="#5a4030"/><rect x="416" y="440" width="14" height="120" rx="6" fill="#8a6a4c"/><ellipse cx="439" cy="442" rx="23" ry="8" fill="#a68a66"/><path d="M416 500h46M416 510h46" stroke="#e2d2a8" stroke-width="5"/>` +
    `<rect x="704" y="410" width="50" height="140" rx="6" fill="#4e382a"/><rect x="704" y="410" width="15" height="140" rx="6" fill="#806046"/><ellipse cx="729" cy="412" rx="25" ry="9" fill="#a68a66"/>` +
    // gull
    `<g transform="translate(729 386)"><path d="M-22 6q10-22 34-14l14-6-8 12q-4 22-26 22z" fill="#f6f4ee"/><path d="M-22 6q14-10 34 2l-10 12q-16 4-24-14z" fill="#8a949c"/><path d="M26-14l12 2-12 4z" fill="#e8a82a"/><circle cx="18" cy="-13" r="2" fill="#222"/><path d="M-4 20v8M4 20v8" stroke="#e8a82a" stroke-width="2"/></g>` +
    `<path d="M60 560c0-22 60-22 60 0s-60 22-60 0M70 556c0-14 40-14 40 0" fill="none" stroke="#d9c8a0" stroke-width="7"/>` +
    `<rect width="800" height="600" fill="url(#${k}sun)"/>`;
  return frame(k, 800, 600, defs, body, 0.14, 0.4);
}

// ───────────────────────────────────────────────────────────── ph_blackrock
function phBlackrock(): string {
  const k = 'ph_blackrock';
  const defs =
    lg(`${k}sky`, [[0, '#b9c6c8'], [1, '#e9e2d0']]) +
    lg(`${k}sea`, [[0, '#6f9fa2'], [1, '#1d525e']]) +
    lg(`${k}pad`, [[0, '#b9a78a'], [1, '#7a6a58']]) +
    lg(`${k}pipe`, [[0, '#9aa2a4'], [0.4, '#d8dcd8'], [1, '#4a5458']]) +
    rg(`${k}plume`, [[0, '#a8742a', 0.95], [0.45, '#8f7a32', 0.75], [0.8, '#6f8a52', 0.4], [1, '#5f8f7a', 0]]) +
    lg(`${k}bb`, [[0, '#18262e'], [1, '#0d171d']]) +
    lg(`${k}bbs`, [[0, '#2f7f8a'], [1, '#e8b25a']], 1, 0) +
    bl(`${k}b2`, 2) + bl(`${k}b6`, 6) + bl(`${k}b16`, 16);
  const body =
    `<rect width="800" height="300" fill="url(#${k}sky)"/>` +
    `<g filter="url(#${k}b2)"><path d="M0 250q200-40 420-20t380-30v80H0z" fill="#93a8a8"/><path d="M300 262q200-30 500-12v40H300z" fill="#7a9396"/></g>` +
    // crane (far)
    `<g stroke="#c9a02a" stroke-width="5" fill="none" opacity=".9"><path d="M610 300V70M610 84l-150 30M610 84l110 20M610 70l-20 30M610 70l20 30"/><path d="M470 112v70" stroke="#444" stroke-width="2"/></g><rect x="462" y="180" width="18" height="14" fill="#444"/><rect x="596" y="96" width="30" height="24" fill="#d9b03a"/>` +
    // water
    `<rect y="330" width="800" height="270" fill="url(#${k}sea)"/>` +
    `<path d="M0 330h800" stroke="#d6e6e0" stroke-width="2" opacity=".5"/>` +
    // pad / shore
    `<path d="M0 270h800v70q-90 20-170 10t-150 30-130 50-120 60-140 40-90 20z" fill="url(#${k}pad)"/>` +
    `<path d="M800 340q-90 20-170 10t-150 30-130 50-120 60-140 40-90 20" fill="none" stroke="#4a4038" stroke-width="16" stroke-dasharray="26 8" stroke-linecap="round"/>` +
    `<path d="M800 348q-90 20-170 10t-150 30-130 50-120 60-140 40-90 20" fill="none" stroke="#857868" stroke-width="9" stroke-dasharray="14 20" stroke-linecap="round"/>` +
    // site clutter
    `<g><rect x="640" y="250" width="130" height="50" fill="#e9e4d8"/><rect x="640" y="250" width="130" height="8" fill="#9aa2a4"/><rect x="654" y="266" width="24" height="18" fill="#3a5560"/><rect x="690" y="266" width="24" height="34" fill="#5a6a70"/>` +
    `<path d="M420 300h200" stroke="#e8792a" stroke-width="16" stroke-dasharray="4 10"/><path d="M420 292h200M420 308h200" stroke="#e8792a" stroke-width="2"/>` +
    // excavator
    `<g transform="translate(500 250)"><rect x="-10" y="40" width="110" height="20" rx="10" fill="#2a2a2a"/><rect x="6" y="6" width="74" height="36" rx="4" fill="#e3ad1e"/><rect x="50" y="-14" width="34" height="34" rx="3" fill="#f0c23a"/><rect x="56" y="-8" width="22" height="18" fill="#30444c"/><path d="M14 10l-60-50 -26 50" stroke="#e3ad1e" stroke-width="11" fill="none" stroke-linejoin="round"/><path d="M-84 10l24 0-6 22-20-6z" fill="#3a3a3a"/></g>` +
    `<path d="M150 330l34-40 30 26 26-34 40 48z" fill="#8a7a66"/><path d="M184 290l30 26 26-34" fill="none" stroke="#cdbb9a" stroke-width="3"/>` +
    `<g fill="#6a7478"><rect x="330" y="296" width="60" height="9"/><rect x="336" y="286" width="60" height="9"/><rect x="326" y="306" width="70" height="9"/></g></g>` +
    // plume
    `<g filter="url(#${k}b6)"><ellipse cx="470" cy="500" rx="300" ry="96" fill="url(#${k}plume)" transform="rotate(-8 470 500)"/><ellipse cx="400" cy="486" rx="150" ry="46" fill="#b0702a" opacity=".6" transform="rotate(-8 400 486)"/></g>` +
    `<path d="M330 470q70-22 150 0t170-10M360 510q90-24 170 0t150-4M420 540q80-14 180 6M560 452q60-10 120 4" stroke="#d9b070" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>` +
    `<path d="M40 560h110M620 580h120M700 400h80M640 420h60" stroke="#cfe6e0" stroke-width="2.500" opacity=".5" stroke-linecap="round"/>` +
    // pipe
    `<ellipse cx="300" cy="470" rx="80" ry="16" fill="#0c2a30" opacity=".5" filter="url(#${k}b6)"/>` +
    `<g transform="rotate(24 120 330)"><rect x="70" y="300" width="260" height="62" fill="url(#${k}pipe)"/><path d="M110 300v62M150 300v62M190 300v62M230 300v62M270 300v62" stroke="#3a4448" stroke-width="3" opacity=".6"/><rect x="60" y="294" width="16" height="74" fill="#6a7478"/><rect x="318" y="294" width="16" height="74" rx="4" fill="#6a7478"/>` +
    `<ellipse cx="334" cy="331" rx="14" ry="33" fill="#1a1a16"/><ellipse cx="334" cy="344" rx="10" ry="18" fill="#a06a22"/></g>` +
    `<path d="M300 436q30 10 26 60-30 10-58-2 4-40 32-58z" fill="#b0702a"/><path d="M296 446q12 20 8 46M312 446q8 20 6 46" stroke="#e2b46a" stroke-width="3" fill="none" opacity=".7"/>` +
    `<ellipse cx="300" cy="500" rx="56" ry="14" fill="#e6d2a0" opacity=".75"/><ellipse cx="300" cy="500" rx="86" ry="22" fill="none" stroke="#e6d2a0" stroke-width="3" opacity=".5"/>` +
    `<path d="M214 364l30 10-8 20z" fill="#4a4038"/><rect x="170" y="380" width="54" height="12" fill="#3a3a3a" transform="rotate(24 170 380)"/>` +
    // billboard
    `<rect x="52" y="36" width="398" height="208" fill="#111" opacity=".3" filter="url(#${k}b6)" transform="translate(10 12)"/>` +
    `<rect x="96" y="230" width="16" height="130" fill="#4a3a2c"/><rect x="390" y="230" width="16" height="110" fill="#4a3a2c"/><path d="M104 250l294 60M398 250L104 310" stroke="#4a3a2c" stroke-width="5" opacity=".8"/>` +
    `<rect x="48" y="30" width="404" height="212" rx="4" fill="#f1ece0"/><rect x="56" y="38" width="388" height="196" fill="url(#${k}bb)"/>` +
    `<rect x="56" y="38" width="388" height="10" fill="url(#${k}bbs)"/>` +
    `<path d="M76 222q40-40 80-10t70-14 60 10 60-16 80 20v12H76z" fill="#2f7f8a" opacity=".5"/><path d="M300 208v-30l16 26zM340 206v-22l12 20zM260 208v-18l10 16z" fill="#f1ece0" opacity=".7"/>` +
    `<text x="250" y="104" text-anchor="middle" ${SANS} font-size="54" font-weight="bold" letter-spacing="3" fill="#f4f0e6">BLACKROCK</text>` +
    `<text x="250" y="152" text-anchor="middle" ${SANS} font-size="42" letter-spacing="17" fill="#e8b25a">MARINA</text>` +
    `<rect x="120" y="164" width="260" height="2" fill="#e8b25a" opacity=".6"/>` +
    `<text x="250" y="196" text-anchor="middle" ${SANS} font-size="27" font-weight="bold" letter-spacing="3" fill="#f4f0e6">— COMING 2027 —</text>` +
    `<rect width="800" height="600" fill="#fff2d0" opacity=".06"/>`;
  return frame(k, 800, 600, defs, body, 0.14, 0.38);
}

// ───────────────────────────────────────────────────────────── ph_labsheets
function phLabsheets(): string {
  const k = 'ph_labsheets';
  const defs =
    lg(`${k}bench`, [[0, '#20262a'], [1, '#0c1114']]) +
    rg(`${k}lamp`, [[0, '#fff0c8', 0.55], [0.5, '#ffd9a0', 0.14], [1, '#000', 0]], 0.5, 0.2, 0.8) +
    rg(`${k}dark`, [[0.45, '#000', 0], [1, '#02060a', 0.85]], 0.5, 0.35, 0.8) +
    lg(`${k}pa`, [[0, '#fffaf0'], [1, '#e2dccc']]) +
    bl(`${k}b3`, 3) + bl(`${k}b10`, 10);
  const rows = (x: number, y: number, list: [string, string][]): string =>
    list.map(([a, b], i) =>
      `<text x="${x}" y="${y + i * 30}" ${MONO} font-size="17" fill="#5d646a">${a}</text><text x="${x + 300}" y="${y + i * 30}" text-anchor="end" ${MONO} font-size="17" fill="#5d646a">${b}</text>`).join('');
  const sheet = (x: number, rot: number, inner: string): string =>
    `<g transform="translate(${x} 44) rotate(${rot})"><rect x="8" y="12" width="350" height="500" fill="#000" opacity=".6" filter="url(#${k}b10)"/>` +
    `<rect width="350" height="500" fill="url(#${k}pa)"/>${inner}</g>`;
  const left =
    `<rect x="24" y="26" width="302" height="5" fill="#1f2a30"/>` +
    `<text x="24" y="66" ${MONO} font-size="27" font-weight="bold" fill="#141c22">RAW INSTRUMENT</text>` +
    `<text x="24" y="100" ${MONO} font-size="27" font-weight="bold" fill="#141c22">LOG — HB-17</text>` +
    `<rect x="24" y="114" width="302" height="2" fill="#1f2a30"/>` +
    `<text x="24" y="140" ${MONO} font-size="14" fill="#6a7278">ICP-MS run 0917 · unedited output</text>` +
    rows(24, 180, [['As (arsenic)', '1.2 ppb'], ['Cd (cadmium)', '0.3 ppb']]) +
    `<rect x="14" y="232" width="322" height="92" fill="#fff3b8" opacity=".55"/>` +
    `<text x="24" y="292" ${MONO} font-size="25" font-weight="bold" fill="#141c22">Pb (lead)</text>` +
    `<text x="258" y="302" text-anchor="end" ${MONO} font-size="68" font-weight="bold" fill="#0c1216">48</text>` +
    `<text x="266" y="302" ${MONO} font-size="27" font-weight="bold" fill="#141c22">ppb</text>` +
    `<path d="M170 246c50-26 150-22 162 26 10 44-60 62-116 58-50-4-80-30-64-62 12-22 50-34 90-32" fill="none" stroke="#d8232a" stroke-width="5.500" stroke-linecap="round"/>` +
    rows(24, 372, [['Hg (mercury)', '&lt;0.1 ppb'], ['Cu (copper)', '6.4 ppb'], ['Zn (zinc)', '11.0 ppb']]) +
    `<text x="24" y="476" ${MONO} font-size="13" fill="#8a9096">file: HB17_raw_0917.csv   pg 1/1</text>`;
  const right =
    `<rect x="24" y="26" width="302" height="5" fill="#1f4a5a"/>` +
    `<text x="24" y="66" ${SANS} font-size="28" font-weight="bold" fill="#141c22">SIGNED REPORT</text>` +
    `<text x="24" y="100" ${SANS} font-size="28" font-weight="bold" fill="#1f4a5a">— HB-17</text>` +
    `<rect x="24" y="114" width="302" height="2" fill="#1f4a5a"/>` +
    `<text x="24" y="140" ${SANS} font-size="14" fill="#6a7278">Harrow Marine Station · Water Quality</text>` +
    rows(24, 180, [['As (arsenic)', '1.2 ppb'], ['Cd (cadmium)', '0.3 ppb']]) +
    `<text x="24" y="292" ${MONO} font-size="20" font-weight="bold" fill="#141c22">Pb (lead)</text>` +
    `<text x="258" y="302" text-anchor="end" ${MONO} font-size="68" font-weight="bold" fill="#0c1216">4.8</text>` +
    `<text x="266" y="302" ${MONO} font-size="27" font-weight="bold" fill="#141c22">ppb</text>` +
    `<path d="M24 318h302" stroke="#9aa2a8" stroke-width="1.500"/>` +
    `<text x="24" y="348" ${SANS} font-size="15" font-weight="bold" fill="#2f7a4a">WITHIN PERMIT LIMIT (15 ppb)</text>` +
    `<path d="M40 430c10-40 26-60 34-30 6 24-20 40-10 10 12-34 40-40 44-14 2 14 10-20 24-16 12 4 4 22 18 14 16-10 20-30 34-18 10 8 0 24 16 16 20-10 40-16 80-20" fill="none" stroke="#16307a" stroke-width="3.500" stroke-linecap="round"/>` +
    `<path d="M24 446h302" stroke="#141c22" stroke-width="1.500"/>` +
    `<text x="24" y="476" ${SERIF} font-size="27" font-style="italic" fill="#141c22">A. Pryce</text>` +
    `<text x="326" y="474" text-anchor="end" ${SANS} font-size="13" fill="#6a7278">Dr. Alan Pryce, PI</text>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}bench)"/>` +
    `<path d="M0 30h800M0 34h800" stroke="#3a444a" stroke-width="2"/><rect width="800" height="30" fill="#0a0e10"/>` +
    // bench clutter
    `<g filter="url(#${k}b3)"><rect x="690" y="-10" width="60" height="90" rx="8" fill="#2f6a70" opacity=".8"/><rect x="620" y="0" width="46" height="60" rx="6" fill="#8a5a2a" opacity=".8"/><rect x="20" y="-6" width="120" height="60" rx="6" fill="#39424a"/></g>` +
    sheet(26, -3, left) + sheet(416, 2.5, right) +
    // pen
    `<g transform="translate(-40 56) rotate(-7 420 520)"><rect x="330" y="512" width="170" height="16" rx="8" fill="#000" opacity=".5" filter="url(#${k}b3)" transform="translate(4 8)"/><rect x="330" y="512" width="170" height="15" rx="7" fill="#c8242a"/><rect x="330" y="512" width="170" height="5" rx="2.500" fill="#f0666a"/><path d="M500 512l22 7.500-22 7.500z" fill="#e2dccc"/><rect x="330" y="512" width="36" height="15" rx="7" fill="#8a1218"/></g>` +
    `<rect width="800" height="600" fill="url(#${k}lamp)" style="mix-blend-mode:screen"/>` +
    `<rect width="800" height="600" fill="url(#${k}dark)"/>` +
    `<rect width="800" height="600" fill="#ffb060" opacity=".07"/>`;
  return frame(k, 800, 600, defs, body, 0.12, 0.4);
}

// ───────────────────────────────────────────────────────────── ph_station
function phStation(): string {
  const k = 'ph_station';
  const defs =
    lg(`${k}sky`, [[0, '#0f2a3d'], [0.45, '#3d4f6a'], [0.75, '#b0707a'], [1, '#f0a05a']]) +
    lg(`${k}sea`, [[0, '#a8707a'], [0.3, '#34506a'], [1, '#0a1c28']]) +
    lg(`${k}bld`, [[0, '#33424e'], [1, '#18222b']]) +
    lg(`${k}bld2`, [[0, '#28343f'], [1, '#121a21']]) +
    lg(`${k}win`, [[0, '#ffe9a8'], [1, '#ffb650']]) +
    lg(`${k}gnd`, [[0, '#1c2830'], [1, '#090f14']]) +
    rg(`${k}glow`, [[0, '#ffc060', 0.75], [1, '#ffa040', 0]]) +
    rg(`${k}sod`, [[0, '#ffb04a', 0.9], [0.3, '#ff9030', 0.35], [1, '#ff8020', 0]]) +
    lg(`${k}up`, [[0, '#fff0c8', 0], [1, '#fff0c8', 0.5]]) +
    bl(`${k}b2`, 2) + bl(`${k}b8`, 8) + bl(`${k}b20`, 20);
  let wins = '', wins2 = '', refl = '';
  for (let i = 0; i < 7; i++) {
    wins += `<rect x="${452 + i * 44}" y="286" width="34" height="46" fill="url(#${k}win)"/>`;
    refl += `<rect x="${452 + i * 44}" y="452" width="34" height="90" fill="#ffb650" opacity=".3"/>`;
  }
  for (let i = 0; i < 6; i++) wins2 += `<rect x="${150 + i * 44}" y="300" width="34" height="38" fill="#0c151c"/><path d="M${152 + i * 44} 336l20-34" stroke="#5a6f86" stroke-width="3" opacity=".5"/>`;
  const body =
    `<rect width="800" height="380" fill="url(#${k}sky)"/>` +
    `<g filter="url(#${k}b8)" opacity=".5"><path d="M0 250q200-30 420-6t380-24" stroke="#f0a070" stroke-width="20" fill="none"/><path d="M100 170q200-20 380 0t320-20" stroke="#c07a8a" stroke-width="14" fill="none"/></g>` +
    `<circle cx="120" cy="60" r="1.500" fill="#fff"/><circle cx="300" cy="40" r="1.200" fill="#fff"/><circle cx="520" cy="80" r="1.500" fill="#fff"/><circle cx="700" cy="50" r="1.200" fill="#fff"/><circle cx="420" cy="26" r="1" fill="#fff"/>` +
    // far headland + lighthouse
    `<path d="M560 372q80-40 160-44l30-14 50 4v60z" fill="#3a3f58" filter="url(#${k}b2)"/><rect x="744" y="282" width="7" height="34" fill="#2a2f44"/><circle cx="747" cy="280" r="4" fill="#fff0c0"/><circle cx="747" cy="280" r="16" fill="url(#${k}glow)"/>` +
    // water right
    `<rect x="380" y="372" width="420" height="228" fill="url(#${k}sea)"/>` +
    `<path d="M600 384h160M560 398h110M640 414h150M700 432h90" stroke="#f0b080" stroke-width="2.500" opacity=".5" stroke-linecap="round"/>` +
    // pines
    `<g fill="#0c1820"><path d="M0 380V230l20 40-6 0 22 40-8 0 24 46-8 0 22 40zM60 380l26-150 30 150zM100 380l36-190 40 190zM330 380l22-120 26 120zM20 380l30-110 30 110z"/><path d="M700 380l14-60 16 60z" opacity=".7"/></g>` +
    // building
    `<rect x="120" y="270" width="320" height="110" fill="url(#${k}bld2)"/><rect x="112" y="262" width="336" height="12" fill="#3f505e"/>` +
    wins2 +
    `<rect x="400" y="230" width="60" height="150" fill="#202c36"/><rect x="394" y="222" width="72" height="10" fill="#465866"/><rect x="418" y="330" width="26" height="50" fill="#0c151c"/><rect x="418" y="330" width="26" height="50" fill="#ffb650" opacity=".25"/>` +
    `<rect x="440" y="258" width="330" height="122" fill="url(#${k}bld)"/><rect x="432" y="250" width="348" height="12" fill="#4a5c6a"/>` +
    `<ellipse cx="605" cy="318" rx="210" ry="74" fill="url(#${k}glow)" filter="url(#${k}b20)"/>` +
    wins +
    `<path d="M468 286v46M512 286v46M600 286v46M688 286v46" stroke="#b07a2a" stroke-width="2"/><rect x="556" y="300" width="10" height="32" fill="#3a2a1a" opacity=".7"/><circle cx="561" cy="295" r="6" fill="#3a2a1a" opacity=".7"/>` +
    `<text x="604" y="278" text-anchor="middle" ${SANS} font-size="11" font-weight="bold" letter-spacing="3" fill="#c8d6e0" opacity=".8">LAB B</text>` +
    // roof gear
    `<circle cx="230" cy="246" r="18" fill="#cfd8dc"/><rect x="224" y="258" width="12" height="8" fill="#465866"/><path d="M320 262v-60M312 214h16M316 226h8" stroke="#465866" stroke-width="3"/><circle cx="320" cy="200" r="3" fill="#ff4a3a"/><circle cx="320" cy="200" r="10" fill="#ff4a3a" opacity=".3"/>` +
    // ground
    `<path d="M0 378h470q30 30 10 70t40 152H0z" fill="url(#${k}gnd)"/>` +
    `<path d="M470 378q30 30 10 70t40 152" fill="none" stroke="#5a6a78" stroke-width="3" opacity=".7"/>` +
    `<g filter="url(#${k}b8)">${refl}</g><rect x="380" y="440" width="420" height="160" fill="#0a1c28" opacity=".35"/>` +
    `<path d="M560 480h180M540 510h210M580 540h170" stroke="#f0b080" stroke-width="2" opacity=".25" stroke-linecap="round"/>` +
    `<path d="M300 380q-20 80-160 220h150q60-150 110-220z" fill="#2a3640"/><path d="M350 380q-34 100-140 220" stroke="#8a96a0" stroke-width="3" stroke-dasharray="20 18" fill="none" opacity=".6"/>` +
    `<ellipse cx="440" cy="392" rx="190" ry="20" fill="#ffb650" opacity=".16" filter="url(#${k}b8)"/>` +
    // lamp post
    `<circle cx="96" cy="250" r="90" fill="url(#${k}sod)"/><rect x="92" y="250" width="6" height="170" fill="#0a1218"/><path d="M95 252h-26" stroke="#0a1218" stroke-width="6"/><ellipse cx="74" cy="256" rx="12" ry="5" fill="#ffd9a0"/><ellipse cx="80" cy="424" rx="80" ry="12" fill="#ff9a3a" opacity=".2" filter="url(#${k}b8)"/>` +
    // car
    `<g transform="translate(170 392)"><path d="M0 22q4-10 20-12l14-16h50l20 16q18 2 20 12v10H0z" fill="#101a22"/><path d="M38-2h20v12H30zM62-2h20l10 12H62z" fill="#3a5068"/><circle cx="26" cy="32" r="9" fill="#05090c"/><circle cx="98" cy="32" r="9" fill="#05090c"/><rect x="118" y="18" width="6" height="5" fill="#ff5040"/></g>` +
    // sign
    `<g transform="translate(-150 0)"><path d="M150 600l60-150h320l70 150z" fill="url(#${k}up)" opacity=".5" filter="url(#${k}b8)"/>` +
    `<rect x="196" y="452" width="372" height="112" fill="#000" opacity=".5" filter="url(#${k}b8)" transform="translate(6 10)"/>` +
    `<rect x="210" y="556" width="340" height="18" fill="#3a444c"/><rect x="196" y="448" width="368" height="110" rx="3" fill="#0f2028"/><rect x="196" y="448" width="368" height="110" rx="3" fill="url(#${k}up)" opacity=".35"/><rect x="196" y="448" width="8" height="110" fill="#3fa0a8"/>` +
    `<path d="M224 470q10-10 20 0t20 0" stroke="#3fa0a8" stroke-width="4" fill="none" stroke-linecap="round"/>` +
    `<text x="224" y="512" ${SANS} font-size="37" font-weight="bold" letter-spacing="2" fill="#f4f6f2">HARROW MARINE</text>` +
    `<text x="224" y="546" ${SANS} font-size="29" letter-spacing="13" fill="#cfe6e4">STATION</text>` +
    `</g>` +
    `<rect width="800" height="600" fill="#2a1a4a" opacity=".1"/>`;
  return frame(k, 800, 600, defs, body, 0.15, 0.5);
}

// ───────────────────────────────────────────────────────────── ph_key
function phKey(): string {
  const k = 'ph_key';
  const defs =
    lg(`${k}t`, [[0, '#6a4226'], [1, '#2e1a0e']], 1, 1) +
    streak(`${k}wd`, 0.007, 0.45, '.08 .04 .02', -2.6, 1.45, 12) +
    rg(`${k}lamp`, [[0, '#ffd9a0', 0.6], [0.5, '#ffb060', 0.18], [1, '#000', 0]], 0.42, 0.45, 0.7) +
    lg(`${k}br`, [[0, '#fbe6a0'], [0.35, '#dba83e'], [0.7, '#a8742a'], [1, '#6a4416']], 0.3, 1) +
    lg(`${k}her`, [[0, '#9cc8d0'], [1, '#4f8290']]) +
    lg(`${k}tag`, [[0, '#f2e2b8'], [1, '#d9c290']]) +
    bl(`${k}b3`, 3) + bl(`${k}b7`, 7) + bl(`${k}b16`, 16);
  const key = `<path fill-rule="evenodd" d="M40-52a52 52 0 1 0 0 104q30 0 44-40h206l16-12-16-12H84q-14-40-44-40zM14-14a14 14 0 1 1 0 28 14 14 0 0 1 0-28zM196 12v26h16v-12h12v18h16v-14h12v20h18v-14h14v-24z"/>`;
  const heron =
    `<path d="M92 150l-8 80h-16M110 150l6 80h-16" stroke="#c9c2a8" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M70 116C36 92 84 62 62 30" stroke="#d9d2b8" stroke-width="24" fill="none" stroke-linecap="round"/>` +
    `<path d="M48 16L-14 30l64 6z" fill="#e8b23a" stroke="#d9d2b8" stroke-width="4" stroke-linejoin="round"/>` +
    `<path d="M56 110c12-34 76-36 106 8 10 16 2 34-22 34-34 6-72 0-84-42z" fill="url(#${k}her)" stroke="#d9d2b8" stroke-width="5"/>` +
    `<path d="M70 116C36 92 84 62 62 30" stroke="url(#${k}her)" stroke-width="15" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="60" cy="24" rx="18" ry="14" fill="url(#${k}her)" stroke="#d9d2b8" stroke-width="5"/>` +
    `<path d="M66 14q30-2 46 16" stroke="#1f3a4a" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<path d="M84 112c26-14 62-2 76 18-24 12-58 8-76-18z" fill="#2f5a6a"/><path d="M96 118q24-6 46 8M104 128q18-2 32 6" stroke="#9cc8d0" stroke-width="2.500" fill="none"/>` +
    `<circle cx="56" cy="22" r="3.500" fill="#12222a"/><path d="M70 60q8 20-2 40" stroke="#fff" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>` +
    `<circle cx="138" cy="84" r="10" fill="none" stroke="#d9d2b8" stroke-width="5"/>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}t)"/><rect width="600" height="800" filter="url(#${k}wd)" opacity=".8"/>` +
    `<path d="M0 262h600M0 540h600" stroke="#1c0e06" stroke-width="4" opacity=".8"/><path d="M0 266h600M0 544h600" stroke="#9a6a3e" stroke-width="1.500" opacity=".45"/>` +
    `<rect width="600" height="800" fill="url(#${k}lamp)" style="mix-blend-mode:screen"/>` +
    // ceramic dish, top-left
    `<circle cx="52" cy="70" r="150" fill="#000" opacity=".5" filter="url(#${k}b16)"/><circle cx="40" cy="56" r="146" fill="#d9d0c0"/><circle cx="40" cy="56" r="118" fill="#b8ad9a"/><circle cx="40" cy="56" r="118" fill="none" stroke="#f4eee0" stroke-width="4" opacity=".7"/>` +
    `<circle cx="70" cy="112" r="24" fill="#a8742a"/><circle cx="70" cy="112" r="17" fill="none" stroke="#dba83e" stroke-width="3"/><circle cx="110" cy="76" r="20" fill="#9aa2a4"/><circle cx="110" cy="76" r="14" fill="none" stroke="#d8dcd8" stroke-width="3"/>` +
    // envelope corner, bottom-left
    `<g transform="rotate(-18 60 760)"><rect x="-80" y="690" width="300" height="180" fill="#000" opacity=".4" filter="url(#${k}b7)" transform="translate(6 8)"/><rect x="-80" y="690" width="300" height="180" fill="#e9e2d0"/><path d="M-80 690l150 90 150-90" fill="none" stroke="#b8ad98" stroke-width="3"/></g>` +
    // heron charm
    `<g transform="translate(300 84) rotate(15) scale(1.150)"><g transform="translate(8 12)" opacity=".55" filter="url(#${k}b7)"><path d="M56 110c12-34 76-36 106 8 10 16 2 34-22 34-34 6-72 0-84-42zM70 116C36 92 84 62 62 30l-76 0 64 6" fill="#000" stroke="#000" stroke-width="22" stroke-linejoin="round"/></g>${heron}</g>` +
    // chain
    `<g fill="none" stroke="#000" stroke-width="5" opacity=".4" transform="translate(5 7)" filter="url(#${k}b3)"><circle cx="300" cy="330" r="52"/></g>` +
    `<g fill="none" stroke="#c9c9c2" stroke-width="4"><ellipse cx="398" cy="222" rx="12" ry="8" transform="rotate(-46 398 222)"/><ellipse cx="382" cy="240" rx="12" ry="8" transform="rotate(-46 382 240)"/><ellipse cx="365" cy="258" rx="12" ry="8" transform="rotate(-46 365 258)"/><ellipse cx="348" cy="276" rx="12" ry="8" transform="rotate(-46 348 276)"/></g>` +
    // key
    `<g transform="translate(270 360) rotate(125)"><g transform="translate(-10 -12)" fill="#000" opacity=".55" filter="url(#${k}b7)">${key}</g><g fill="url(#${k}br)" stroke="#5a3a12" stroke-width="2">${key}</g>` +
    `<path d="M92 -3h206" stroke="#6a4416" stroke-width="3"/><path d="M92 -9h200" stroke="#fff3c0" stroke-width="2" opacity=".7"/><path d="M8-38a40 40 0 0 1 62 8" stroke="#fff6d0" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/></g>` +
    // ring
    `<circle cx="300" cy="330" r="52" fill="none" stroke="#8a8f90" stroke-width="7"/><circle cx="300" cy="330" r="52" fill="none" stroke="#eef0ec" stroke-width="2.500" stroke-dasharray="90 60"/>` +
    // tag + string
    `<path d="M330 590C300 540 262 470 290 384" stroke="#e9dcc0" stroke-width="3.500" fill="none"/><path d="M334 586C330 520 316 450 318 382" stroke="#cdbf9e" stroke-width="3" fill="none"/>` +
    `<g transform="translate(292 528) rotate(-9)"><path d="M32 0h238v140H32L0 108V32z" fill="#000" opacity=".5" filter="url(#${k}b7)" transform="translate(8 12)"/>` +
    `<path d="M32 0h238v140H32L0 108V32z" fill="url(#${k}tag)"/><path d="M32 0h238v140H32L0 108V32z" fill="none" stroke="#b8a070" stroke-width="2"/>` +
    `<circle cx="30" cy="70" r="15" fill="#c8402e" opacity=".85"/><circle cx="30" cy="70" r="7" fill="#3a2414"/>` +
    `<text x="160" y="100" text-anchor="middle" ${MONO} font-size="88" font-weight="bold" fill="#18222e" transform="rotate(-2 160 100)">LH-4</text>` +
    `<path d="M64 118q90 8 190-2" stroke="#18222e" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/></g>` +
    `<rect width="600" height="800" fill="#ff9a40" opacity=".06"/>`;
  return frame(k, 600, 800, defs, body, 0.16, 0.6);
}

// ───────────────────────────────────────────────────────────── ph_drybag
function phDrybag(): string {
  const k = 'ph_drybag';
  const defs =
    lg(`${k}st`, [[0, '#7d8a90'], [0.5, '#aab4b8'], [1, '#5a666c']]) +
    streak(`${k}br`, 0.004, 0.8, '.95 .98 1', 2.6, -1.1, 6) +
    lg(`${k}bag`, [[0, '#a83c0a'], [0.3, '#ff9330'], [0.62, '#f06c18'], [1, '#9c3608']], 1, 0) +
    rg(`${k}in`, [[0, '#06080a'], [0.7, '#2a1206'], [1, '#6a2a0c']], 0.5, 0.3, 0.7) +
    rg(`${k}fl`, [[0, '#fff', 0.3], [0.5, '#fff', 0.06], [1, '#000', 0]], 0.5, 0.55, 0.6) +
    rg(`${k}dk`, [[0.5, '#000', 0], [1, '#01060a', 0.8]], 0.5, 0.55, 0.75) +
    lg(`${k}gl`, [[0, '#f4fbfc', 0.85], [0.3, '#bfd6da', 0.5], [1, '#8fb0b8', 0.7]], 1, 0) +
    bl(`${k}b3`, 3) + bl(`${k}b8`, 8) + bl(`${k}b18`, 18);
  const vial = (x: number, y: number, rot: number): string =>
    `<g transform="translate(${x} ${y}) rotate(${rot})">` +
    `<rect x="-38" y="6" width="88" height="250" rx="14" fill="#000" opacity=".45" filter="url(#${k}b8)"/>` +
    `<rect x="-42" y="0" width="84" height="212" rx="14" fill="url(#${k}gl)"/>` +
    `<rect x="-38" y="40" width="76" height="168" rx="10" fill="#b8ad6a" opacity=".75"/><rect x="-38" y="40" width="76" height="12" fill="#8a7f44" opacity=".6"/>` +
    `<rect x="-44" y="206" width="88" height="46" rx="7" fill="#1c3a5c"/><path d="M-36 208v42M-18 208v42M0 208v42M18 208v42M36 208v42" stroke="#3f6a9a" stroke-width="3"/>` +
    `<rect x="-41" y="86" width="82" height="74" fill="#fdfbf4"/><rect x="-41" y="86" width="82" height="9" fill="#d8402e"/>` +
    `<text x="0" y="128" text-anchor="middle" ${MONO} font-size="26" font-weight="bold" fill="#10161c">HB-17</text>` +
    `<path d="M-34 142h46M-34 151h30" stroke="#6a7278" stroke-width="3"/>` +
    `<path d="M-32 10v70M-32 164v38" stroke="#fff" stroke-width="5" opacity=".7" stroke-linecap="round"/></g>`;
  const body =
    `<rect width="600" height="800" fill="#0c1216"/>` +
    // back shelf
    `<g filter="url(#${k}b3)"><rect y="0" width="600" height="120" fill="#141c22"/><rect x="30" y="20" width="60" height="100" rx="8" fill="#2f5a5c"/><rect x="48" y="4" width="24" height="20" fill="#1c3a3c"/><rect x="104" y="40" width="50" height="80" rx="8" fill="#6a4420"/><rect x="430" y="28" width="150" height="92" rx="6" fill="#c9d0d2"/><rect x="446" y="44" width="70" height="30" fill="#12262e"/><circle cx="556" cy="60" r="6" fill="#3fe08a"/><circle cx="556" cy="60" r="14" fill="#3fe08a" opacity=".3"/><rect x="200" y="60" width="180" height="60" rx="4" fill="#39444c"/></g>` +
    `<rect y="112" width="600" height="688" fill="url(#${k}st)"/><rect y="112" width="600" height="688" filter="url(#${k}br)" opacity=".35"/>` +
    `<rect y="112" width="600" height="5" fill="#dfe8ea" opacity=".7"/>` +
    // blue glove
    `<g transform="rotate(20 80 690)"><path d="M30 640q-10-40 16-44t20 30l6-52q4-22 20-20t14 24l6-38q4-20 20-16t12 26l-4 44q10-28 26-22t6 30l-18 70q-10 40-60 44t-64-34z" fill="#000" opacity=".4" filter="url(#${k}b8)" transform="translate(6 10)"/><path d="M30 640q-10-40 16-44t20 30l6-52q4-22 20-20t14 24l6-38q4-20 20-16t12 26l-4 44q10-28 26-22t6 30l-18 70q-10 40-60 44t-64-34z" fill="#3f7fc0"/><path d="M70 630l6-40M110 620l6-50M146 630l4-40" stroke="#2a5a94" stroke-width="3" fill="none"/></g>` +
    // bag
    `<path d="M150 170C150 100 450 100 450 170l44 310c-90 50-300 50-388 0z" fill="#000" opacity=".55" filter="url(#${k}b18)" transform="translate(14 18)"/>` +
    `<path d="M162 168C162 104 438 104 438 168q-8 80 20 150t24 166c-90 44-274 44-364 0q-8-90 22-160t22-156z" fill="url(#${k}bag)"/>` +
    `<ellipse cx="300" cy="150" rx="132" ry="32" fill="#c85a14" opacity=".8"/><ellipse cx="300" cy="150" rx="132" ry="32" fill="none" stroke="#ffb060" stroke-width="3" opacity=".7"/>` +
    `<path d="M150 260q150 40 296-6M140 340q160 30 320 0M172 200q120 30 250 0M134 420q170 22 332-6" stroke="#8a3006" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>` +
    `<rect x="226" y="150" width="34" height="300" fill="#fff" opacity=".28" filter="url(#${k}b8)"/>` +
    `<rect x="196" y="214" width="208" height="124" rx="6" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>` +
    `<text x="300" y="296" text-anchor="middle" ${SANS} font-size="76" font-weight="bold" fill="#fff" opacity=".92">20L</text>` +
    `<text x="300" y="326" text-anchor="middle" ${SANS} font-size="15" font-weight="bold" letter-spacing="5" fill="#fff" opacity=".8">TIDELINE DRY BAG</text>` +
    `<rect x="126" y="330" width="22" height="50" rx="4" fill="#1a1c1e"/><circle cx="130" cy="392" r="15" fill="none" stroke="#9aa2a4" stroke-width="5"/>` +
    // mouth
    `<ellipse cx="300" cy="486" rx="184" ry="62" fill="url(#${k}in)"/>` +
    `<path d="M116 486a184 62 0 0 0 368 0" fill="none" stroke="#17191c" stroke-width="16"/>` +
    `<path d="M120 500q-40 30-70 80" stroke="#17191c" stroke-width="18" fill="none" stroke-linecap="round"/><rect x="26" y="566" width="44" height="50" rx="6" fill="#2a2e32" transform="rotate(32 48 590)"/><rect x="36" y="578" width="24" height="22" rx="3" fill="#0c0e10" transform="rotate(32 48 590)"/>` +
    `<path d="M480 500q44 20 74 70" stroke="#17191c" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M540 556l34 4 6 50-30 8z" fill="#2a2e32"/><path d="M560 600l10 36M574 596l10 34" stroke="#2a2e32" stroke-width="7" stroke-linecap="round"/>` +
    // folded printout
    `<g transform="translate(84 470) rotate(-24)"><rect x="6" y="8" width="118" height="210" fill="#000" opacity=".4" filter="url(#${k}b8)"/><rect width="118" height="210" fill="#f6f2e6"/><rect y="104" width="118" height="106" fill="#e6e0d0"/><path d="M0 104h118" stroke="#b8b09c" stroke-width="2"/>` +
    `<text x="10" y="134" ${MONO} font-size="13" font-weight="bold" fill="#1c242a">RAW LOG HB-17</text><path d="M10 148h98M10 160h80M10 172h92M10 190h60" stroke="#8a9096" stroke-width="3"/><ellipse cx="80" cy="172" rx="28" ry="11" fill="none" stroke="#d8232a" stroke-width="3"/></g>` +
    vial(226, 448, -7) + vial(330, 456, 1) + vial(436, 446, 9) +
    // near lip over the vial tops
    `<path d="M116 486a184 62 0 0 1 368 0" fill="none" stroke="#f06c18" stroke-width="30"/>` +
    `<path d="M116 478a184 62 0 0 1 368 0" fill="none" stroke="#17191c" stroke-width="16"/>` +
    `<path d="M150 452q150-50 300 0" fill="none" stroke="#5a6066" stroke-width="3" opacity=".8"/>` +
    `<rect width="600" height="800" fill="url(#${k}fl)" style="mix-blend-mode:screen"/><rect width="600" height="800" fill="url(#${k}dk)"/>` +
    `<rect width="600" height="800" fill="#2a6a8a" opacity=".08"/>`;
  return frame(k, 600, 800, defs, body, 0.18, 0.5);
}

// ───────────────────────────────────────────────────────────── ph_gullpoint
function phGullpoint(): string {
  const k = 'ph_gullpoint';
  const defs =
    lg(`${k}sky`, [[0, '#040a14'], [0.45, '#0b1e2e'], [0.8, '#1f3d4c'], [1, '#35545c']]) +
    lg(`${k}sea`, [[0, '#2a4a54'], [0.3, '#10303c'], [1, '#050f16']]) +
    lg(`${k}beam`, [[0, '#fff4c8', 0.9], [0.5, '#e6f0d8', 0.3], [1, '#cfe6e0', 0]], 0, 0.3, 1, 0.6) +
    lg(`${k}beam2`, [[0, '#fff4c8', 0.6], [1, '#cfe6e0', 0]], 1, 0.5, 0, 0.5) +
    lg(`${k}tw`, [[0, '#d2dcd8'], [0.5, '#7f9096'], [1, '#27343c']], 1, 0) +
    rg(`${k}glow`, [[0, '#fff8d8', 1], [0.2, '#ffe9a0', 0.6], [1, '#ffd070', 0]]) +
    lg(`${k}rock`, [[0, '#14222b'], [1, '#03070a']]) +
    lg(`${k}fl`, [[0, '#fff0b8', 0.85], [1, '#fff0b8', 0]], 0, 1, 1, 0) +
    bl(`${k}b1`, 1.2) + bl(`${k}b4`, 4) + bl(`${k}b12`, 12);
  const body =
    `<rect width="600" height="800" fill="url(#${k}sky)"/>` +
    `<g fill="#cfe0e6"><circle cx="60" cy="40" r="1.300"/><circle cx="200" cy="90" r="1"/><circle cx="470" cy="50" r="1.400"/><circle cx="540" cy="130" r="1"/><circle cx="120" cy="150" r="1"/><circle cx="330" cy="30" r="1.200"/><circle cx="560" cy="24" r="1"/></g>` +
    `<g filter="url(#${k}b12)" opacity=".5"><path d="M-40 400q200-50 420-20t260-30v90H-40z" fill="#5a7f86"/><path d="M-20 300q160-30 300-10" stroke="#3f6068" stroke-width="30" fill="none"/></g>` +
    // beams
    `<path d="M362 186L-80 20v200z" fill="url(#${k}beam)" filter="url(#${k}b4)"/>` +
    `<path d="M362 186L-80 86v70z" fill="url(#${k}beam)" opacity=".7" filter="url(#${k}b1)"/>` +
    `<path d="M362 186l300-50v90z" fill="url(#${k}beam2)" opacity=".5" filter="url(#${k}b4)"/>` +
    // sea
    `<rect y="452" width="600" height="250" fill="url(#${k}sea)"/>` +
    `<path d="M0 470h150M30 490h200M0 516h120M60 540h190M10 570h130" stroke="#cfe6e0" stroke-width="2.500" opacity=".28" stroke-linecap="round"/>` +
    `<path d="M0 462h260" stroke="#e6f0d8" stroke-width="5" opacity=".25" filter="url(#${k}b4)"/>` +
    // headland
    `<path d="M120 474l80-30c56-18 96-56 150-66l76-4c50-6 100-22 174-44v400H380c-50-70-80-90-130-130S160 540 120 474z" fill="#060c12"/>` +
    `<path d="M200 444c56-18 96-56 150-66l76-4c50-6 100-22 174-44" fill="none" stroke="#5f8088" stroke-width="2.500" opacity=".7"/>` +
    `<path d="M112 480q20 0 30 26m10 14q30 0 40 30m24 16q26 6 30 30m30 24q20 4 30 24" stroke="#dfeeea" stroke-width="5" fill="none" opacity=".22" stroke-linecap="round" filter="url(#${k}b4)"/><path d="M116 482q16 2 24 22m54 60q20 4 26 22" stroke="#eef6f2" stroke-width="2.500" fill="none" opacity=".35" stroke-linecap="round"/>` +
    // cliff path
    `<path d="M600 520c-50-30-10-70-56-96-30-16-18-42-52-58" fill="none" stroke="#6f8a88" stroke-width="3.500" opacity=".55" stroke-linecap="round" stroke-dasharray="14 5"/>` +
    // lighthouse
    `<rect x="378" y="348" width="46" height="28" fill="#1a262e"/><path d="M374 350l27-16 27 16z" fill="#0c141a"/><rect x="394" y="358" width="9" height="10" fill="#ffc060" opacity=".8"/>` +
    `<path d="M342 378l8-172h24l8 172z" fill="url(#${k}tw)"/><path d="M345.500 310h33l-1.500-34h-30z" fill="#7a2a26" opacity=".85"/><rect x="356" y="236" width="6" height="12" fill="#12202a"/>` +
    `<rect x="340" y="198" width="44" height="8" fill="#0c141a"/><rect x="350" y="172" width="24" height="26" fill="#fff6cc"/><path d="M346 172h32l-16-18z" fill="#0c141a"/><path d="M356 172v26M368 172v26" stroke="#0c141a" stroke-width="2"/>` +
    `<circle cx="362" cy="186" r="70" fill="url(#${k}glow)"/>` +
    // second figure with flashlight
    `<path d="M496 328l-70 62 40 16z" fill="url(#${k}fl)" filter="url(#${k}b1)"/>` +
    `<ellipse cx="442" cy="400" rx="26" ry="7" fill="#ffe9a8" opacity=".4" filter="url(#${k}b4)"/>` +
    `<g fill="#01040a"><circle cx="508" cy="306" r="7.500"/><path d="M500 314h16l5 24-3 22h-6l-2-18-3 18h-6l-3-22z"/><path d="M501 318l-7 9 3 3 8-6z"/></g>` +
    `<circle cx="495" cy="328" r="3.200" fill="#fffbe6"/><circle cx="495" cy="328" r="9" fill="#fff0b8" opacity=".5"/>` +
    // foreground rocks
    `<path d="M0 800V610c50-26 110-14 164 20 50-26 124 0 160 50 60-34 130-30 180-54 40-20 76-10 96 4v170z" fill="url(#${k}rock)"/>` +
    `<path d="M0 610c50-26 110-14 164 20 50-26 124 0 160 50 60-34 130-30 180-54 40-20 76-10 96 4" fill="none" stroke="#7fa8ae" stroke-width="3" opacity=".6"/>` +
    `<path d="M0 604q40-22 80-14M170 626q60-18 110 18M340 672q70-30 140-40" stroke="#eef6f2" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round" filter="url(#${k}b1)"/>` +
    `<path d="M40 650q40-10 70 10M210 660q30 0 50 26M400 690q50-20 90-16M520 660q30-6 60 6" stroke="#9fc6c8" stroke-width="2.500" fill="none" opacity=".45" stroke-linecap="round"/>` +
    // tide pool
    `<ellipse cx="250" cy="730" rx="150" ry="30" fill="#23434e"/><ellipse cx="250" cy="730" rx="150" ry="30" fill="none" stroke="#6a8f96" stroke-width="2" opacity=".7"/>` +
    `<rect x="238" y="712" width="7" height="36" rx="3.500" fill="#ffe9a0" opacity=".4" filter="url(#${k}b1)"/><path d="M150 726h70M270 738h90" stroke="#cfe6e0" stroke-width="2" opacity=".4"/>` +
    `<path d="M0 800v-70c40-20 80-10 110 20 20 20 10 50 10 50zM600 800V700c-50-20-110 0-140 40-16 30-6 60-6 60z" fill="#020508"/>` +
    `<path d="M0 730c40-20 80-10 110 20M600 700c-50-20-110 0-140 40" fill="none" stroke="#5f8088" stroke-width="2.500" opacity=".6"/>` +
    `<rect width="600" height="800" fill="#0c2a3a" opacity=".12"/>`;
  return frame(k, 600, 800, defs, body, 0.24, 0.65);
}

// ───────────────────────────────────────────────────────────── ph_anchor
function phAnchor(): string {
  const k = 'ph_anchor';
  const R = rng(5);
  const defs =
    lg(`${k}wall`, [[0, '#1c0d08'], [1, '#2c160c']]) +
    lg(`${k}amb`, [[0, '#ffb040', 0.9], [1, '#c85a14', 0.5]]) +
    lg(`${k}bar`, [[0, '#7a4420'], [1, '#34180a']]) +
    lg(`${k}brass`, [[0, '#6a4416'], [0.4, '#f2d27a'], [1, '#7a5418']], 1, 0) +
    lg(`${k}skin`, [[0, '#b87a52'], [0.5, '#e6ae84'], [1, '#f0b888']], 1, 0) +
    lg(`${k}jak`, [[0, '#4f5f3e'], [1, '#1c2416']]) +
    lg(`${k}pint`, [[0, '#ffc850'], [1, '#c86a14']]) +
    rg(`${k}glow`, [[0, '#ffc060', 0.7], [1, '#ff9030', 0]]) +
    lg(`${k}cone`, [[0, '#ffd08a', 0.5], [1, '#ffb060', 0]]) +
    bl(`${k}b2`, 1.500) + bl(`${k}b6`, 6) + bl(`${k}b14`, 14) +
    `<filter id="${k}ne" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  const cols = ['#2d5a3a', '#6a3a16', '#a8742a', '#1f4a5a', '#c89a3a', '#5a1f1a', '#3a6a4a'];
  let bottles = '';
  for (const sy of [318, 448]) {
    for (let x = 66; x < 540; x += 24 + R() * 14) {
      const h = 52 + R() * 40, w = 13 + R() * 8, c = cols[Math.floor(R() * 7)];
      bottles += `<path d="M${n1(x)} ${sy}v${n1(-h * 0.62)}q0-8 ${n1(w * 0.3)}-12v${n1(-h * 0.3)}h${n1(w * 0.4)}v${n1(h * 0.3)}q${n1(w * 0.3)} 4 ${n1(w * 0.3)} 12v${n1(h * 0.62)}z" fill="${c}"/>`;
    }
  }
  const body =
    `<rect width="600" height="800" fill="url(#${k}wall)"/>` +
    `<g stroke="#120805" stroke-width="3" opacity=".7"><path d="M0 60h600M0 120h600M0 180h600"/></g>` +
    // back bar
    `<g filter="url(#${k}b2)"><rect x="36" y="196" width="528" height="280" fill="#1a0c06"/>` +
    `<rect x="52" y="208" width="496" height="112" fill="url(#${k}amb)"/><rect x="52" y="338" width="496" height="112" fill="url(#${k}amb)" opacity=".8"/>` +
    bottles +
    `<rect x="36" y="318" width="528" height="14" fill="#3f2010"/><rect x="36" y="448" width="528" height="16" fill="#3f2010"/><rect x="36" y="190" width="528" height="14" fill="#4a2814"/></g>` +
    // neon anchor
    `<g transform="translate(96 112)" fill="none" stroke="#5ff0e0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#${k}ne)"><circle cy="-40" r="10"/><path d="M0-30v76M-20-12h40M-36 16q4 32 36 32t36-32M-36 16l-8 12M-36 16l12 6M36 16l8 12M36 16l-12 6"/></g>` +
    `<circle cx="96" cy="118" r="110" fill="#3fe0d0" opacity=".1" filter="url(#${k}b14)"/>` +
    // clock over the taps
    `<rect x="184" y="46" width="232" height="104" rx="12" fill="#000" opacity=".6" filter="url(#${k}b6)" transform="translate(4 8)"/>` +
    `<rect x="184" y="46" width="232" height="104" rx="12" fill="url(#${k}brass)"/><rect x="192" y="54" width="216" height="88" rx="7" fill="#120403"/>` +
    `<g fill="#ff5a2c" opacity=".05">${seg('88:88', 210, 68, 60)}</g>` +
    `<g fill="#ff6a30" filter="url(#${k}ne)">${seg('11:47', 210, 68, 60)}</g>` +
    `<circle cx="300" cy="100" r="150" fill="#ff5a2c" opacity=".1" filter="url(#${k}b14)"/>` +
    // pendant lamp
    `<path d="M500 0v96" stroke="#0a0504" stroke-width="3"/><path d="M468 130q32-60 64 0z" fill="#0f0705"/><ellipse cx="500" cy="131" rx="30" ry="6" fill="#ffe0a0"/><path d="M470 132l-80 400h220z" fill="url(#${k}cone)" opacity=".5" filter="url(#${k}b6)"/><circle cx="500" cy="136" r="60" fill="url(#${k}glow)"/>` +
    // taps
    `<rect x="288" y="470" width="24" height="80" fill="url(#${k}brass)"/><rect x="232" y="462" width="136" height="18" rx="9" fill="url(#${k}brass)"/>` +
    `<rect x="244" y="404" width="16" height="60" rx="6" fill="#c8402e"/><rect x="292" y="398" width="16" height="66" rx="6" fill="#f1e6c8"/><rect x="340" y="404" width="16" height="60" rx="6" fill="#2f7f6a"/>` +
    `<path d="M252 480v16M300 480v16M348 480v16" stroke="#b8862e" stroke-width="7"/>` +
    // bar counter
    `<rect y="540" width="600" height="64" fill="url(#${k}bar)"/><rect y="540" width="600" height="4" fill="#d99a5a" opacity=".6"/>` +
    `<g filter="url(#${k}b6)" opacity=".5"><rect x="90" y="546" width="60" height="52" fill="#ffb040"/><rect x="250" y="546" width="90" height="52" fill="#ff7a3a"/><rect x="60" y="546" width="30" height="52" fill="#3fe0d0" opacity=".7"/></g>` +
    `<rect y="604" width="600" height="196" fill="#150a06"/><rect y="604" width="600" height="8" fill="#000" opacity=".5"/><path d="M0 660h600M0 760h600" stroke="#2c160c" stroke-width="4"/>` +
    `<path d="M150 548h40l-6 44h-28z" fill="#ffc850" opacity=".35"/><ellipse cx="170" cy="548" rx="20" ry="4" fill="#f4ecd8" opacity=".6"/>` +
    // Theo
    `<g>` +
    `<path d="M214 800c6-130 60-196 150-218l42 34 42-34c84 22 132 92 142 218z" fill="url(#${k}jak)"/>` +
    `<path d="M364 582l42 60 42-60-6 218h-72z" fill="#d9d0bc"/><path d="M406 642v158" stroke="#b8ad98" stroke-width="2"/>` +
    `<path d="M352 586l-26 54 62 60 18-58zM460 586l26 54-62 60-18-58z" fill="#8a2a22"/><path d="M340 612l50 50M330 632l44 44M472 612l-50 50M482 632l-44 44" stroke="#3a100c" stroke-width="5" opacity=".6"/>` +
    // raised arm + pint
    `<circle cx="520" cy="330" r="90" fill="url(#${k}glow)" opacity=".8"/>` +
    `<path d="M486 640c60-20 104-80 96-150l-30-70-56 24c26 50 12 100-48 136z" fill="url(#${k}jak)"/>` +
    `<path d="M582 490l-30-70" stroke="#ffb060" stroke-width="4" opacity=".7" stroke-linecap="round"/>` +
    `<path d="M480 268h84l-10 150h-64z" fill="url(#${k}pint)"/><path d="M476 262q0-16 14-14 8-12 22-6 12-10 26-2 14-6 20 6 12 4 10 16v14h-92z" fill="#fff6e0"/>` +
    `<path d="M494 292l6 110" stroke="#fff" stroke-width="6" opacity=".55" stroke-linecap="round"/><path d="M546 300l-4 100" stroke="#8a4a0c" stroke-width="4" opacity=".4" stroke-linecap="round"/>` +
    `<rect x="474" y="366" width="96" height="22" rx="11" fill="#e6ae84"/><rect x="476" y="390" width="92" height="22" rx="11" fill="#d99c72"/><rect x="480" y="414" width="84" height="20" rx="10" fill="#c98a62"/><rect x="490" y="344" width="70" height="20" rx="10" fill="#f0b888"/>` +
    // head
    `<rect x="378" y="530" width="56" height="76" rx="20" fill="#b87a52"/>` +
    `<ellipse cx="336" cy="478" rx="11" ry="18" fill="#c98a62"/><ellipse cx="474" cy="478" rx="11" ry="18" fill="#e6ae84"/>` +
    `<ellipse cx="405" cy="478" rx="66" ry="80" fill="url(#${k}skin)"/>` +
    `<path d="M346 500q14 60 59 60t59-60q-14 34-59 34t-59-34z" fill="#5a3420" opacity=".3"/>` +
    `<path d="M338 440q-4 24 6 40l8-44zM472 440q4 24-6 40l-8-44z" fill="#3a2214"/>` +
    `<path d="M334 446c-8-84 30-112 71-112s80 28 71 112c-44-20-98-20-142 0z" fill="#2f6f80"/>` +
    `<path d="M332 448q73-30 146 0l2-30q-75-28-150 0z" fill="#3f8a9c"/><path d="M350 424v20M372 418v20M394 414v20M416 414v20M438 418v20M460 424v20" stroke="#245460" stroke-width="3"/>` +
    `<circle cx="405" cy="334" r="12" fill="#3f8a9c"/>` +
    `<path d="M362 462q14-10 28-2M420 460q14-8 28 2" stroke="#3a2214" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="376" cy="482" rx="7" ry="7.500" fill="#20120c"/><ellipse cx="434" cy="482" rx="7" ry="7.500" fill="#20120c"/><path d="M366 476h20M424 476h20" stroke="#b87a52" stroke-width="5"/>` +
    `<circle cx="378" cy="481" r="2" fill="#fff"/><circle cx="436" cy="481" r="2" fill="#fff"/>` +
    `<path d="M402 488q-8 22 6 26" stroke="#9a5a3a" stroke-width="3.500" fill="none" stroke-linecap="round"/>` +
    `<path d="M374 526q32 14 62-6-4 26-30 28t-32-22z" fill="#fff8ee" stroke="#6a2a20" stroke-width="3"/>` +
    `<ellipse cx="360" cy="508" rx="14" ry="9" fill="#e8604e" opacity=".3"/><ellipse cx="450" cy="508" rx="14" ry="9" fill="#e8604e" opacity=".35"/>` +
    // rim lights
    `<path d="M334 446c-8-84 30-112 71-112M338 500q6 34 30 50M216 790c8-120 58-186 146-208" stroke="#5ff0e0" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>` +
    `<path d="M476 440c8-70-22-102-60-106M472 506q-8 30-28 46" stroke="#ffb060" stroke-width="4" fill="none" opacity=".75" stroke-linecap="round"/>` +
    `</g>` +
    // foreground silhouette + bokeh
    `<g filter="url(#${k}b6)" fill="#070302"><circle cx="60" cy="640" r="74"/><path d="M-60 800c0-90 60-120 130-110s110 50 110 110z"/></g>` +
    `<circle cx="210" cy="30" r="22" fill="#ffb040" opacity=".25" filter="url(#${k}b6)"/><circle cx="560" cy="250" r="16" fill="#ffb040" opacity=".25" filter="url(#${k}b6)"/><circle cx="30" cy="300" r="20" fill="#3fe0d0" opacity=".2" filter="url(#${k}b6)"/>` +
    `<rect width="600" height="800" fill="#ff8a30" opacity=".08"/>`;
  return frame(k, 600, 800, defs, body, 0.22, 0.6);
}

// ───────────────────────────────────────────────────────────── cover_case1
function coverCase1(): string {
  const k = 'cover_case1';
  const defs =
    lg(`${k}sky`, [[0, '#03080f'], [0.35, '#0a1c2a'], [0.62, '#1c3a48'], [0.75, '#2c4c54']]) +
    lg(`${k}sea`, [[0, '#24444e'], [1, '#081a22']]) +
    lg(`${k}beam`, [[0, '#fff4c8', 0.85], [0.6, '#dfeee0', 0.2], [1, '#cfe6e0', 0]], 0, 0.3, 1, 0.6) +
    lg(`${k}beam2`, [[0, '#fff4c8', 0.6], [1, '#cfe6e0', 0]], 1, 0.5, 0, 0.5) +
    lg(`${k}tw`, [[0, '#d2dcd8'], [0.5, '#7f9096'], [1, '#27343c']], 1, 0) +
    rg(`${k}glow`, [[0, '#fff8d8', 1], [0.2, '#ffe9a0', 0.6], [1, '#ffd070', 0]]) +
    lg(`${k}rock`, [[0, '#15242d'], [1, '#03070a']]) +
    rg(`${k}pool`, [[0, '#2f8f9c'], [0.5, '#12505e'], [1, '#06222c']], 0.5, 0.5, 0.6) +
    rg(`${k}ph`, [[0, '#bff6ff', 0.95], [0.3, '#5fd8ea', 0.55], [1, '#2fb0c8', 0]]) +
    lg(`${k}scr`, [[0, '#f0feff'], [1, '#6fdcec']]) +
    bl(`${k}b1`, 1.2) + bl(`${k}b4`, 4) + bl(`${k}b10`, 10) + bl(`${k}b24`, 24) +
    `<clipPath id="${k}cp"><path d="M70 640c40-60 150-84 250-76s190 30 220 80-30 96-130 110-230 6-300-30-70-50-40-84z"/></clipPath>`;
  const pool = 'M70 640c40-60 150-84 250-76s190 30 220 80-30 96-130 110-230 6-300-30-70-50-40-84z';
  const body =
    `<rect width="600" height="800" fill="url(#${k}sky)"/>` +
    `<g fill="#cfe0e6"><circle cx="50" cy="60" r="1.300"/><circle cx="160" cy="30" r="1"/><circle cx="250" cy="110" r="1.200"/><circle cx="520" cy="50" r="1.400"/><circle cx="470" cy="150" r="1"/><circle cx="90" cy="180" r="1"/><circle cx="560" cy="210" r="1"/><circle cx="330" cy="50" r="1"/></g>` +
    `<g filter="url(#${k}b24)" opacity=".55"><path d="M-40 430q200-60 400-30t280-30v110H-40z" fill="#5a8088"/><ellipse cx="150" cy="330" rx="200" ry="24" fill="#345660"/></g>` +
    `<path d="M392 176L-80-10v230z" fill="url(#${k}beam)" filter="url(#${k}b4)"/><path d="M392 176L-80 70v80z" fill="url(#${k}beam)" opacity=".7" filter="url(#${k}b1)"/>` +
    `<path d="M392 176l280-60v100z" fill="url(#${k}beam2)" opacity=".5" filter="url(#${k}b4)"/>` +
    `<rect y="470" width="600" height="130" fill="url(#${k}sea)"/>` +
    `<path d="M0 486h180M40 504h220M0 526h140M80 548h160" stroke="#cfe6e0" stroke-width="2.500" opacity=".25" stroke-linecap="round"/>` +
    // cliff + lighthouse
    `<path d="M160 490l70-34c50-20 80-60 130-70l80-4c60-8 110-30 160-52v260H160z" fill="#050b10"/>` +
    `<path d="M230 456c50-20 80-60 130-70l80-4c60-8 110-30 160-52" fill="none" stroke="#5f8088" stroke-width="2.500" opacity=".7"/>` +
    `<path d="M160 492q40 12 70-2t60 10" stroke="#dfeeea" stroke-width="4" fill="none" opacity=".5" stroke-linecap="round" filter="url(#${k}b1)"/>` +
    `<rect x="412" y="352" width="52" height="30" fill="#18242c"/><path d="M406 354l32-18 32 18z" fill="#0a1218"/><rect x="430" y="362" width="10" height="11" fill="#ffc060" opacity=".85"/>` +
    `<path d="M368 386l10-190h28l10 190z" fill="url(#${k}tw)"/><path d="M372 312h40l-2-38h-36z" fill="#7a2a26" opacity=".85"/><rect x="388" y="230" width="7" height="14" fill="#12202a"/>` +
    `<rect x="366" y="188" width="52" height="9" fill="#0a1218"/><rect x="378" y="160" width="28" height="28" fill="#fff6cc"/><path d="M373 160h38l-19-20z" fill="#0a1218"/><path d="M386 160v28M398 160v28" stroke="#0a1218" stroke-width="2"/>` +
    `<circle cx="392" cy="175" r="84" fill="url(#${k}glow)"/>` +
    // foreground rocks
    `<path d="M0 800V560c60-30 120-10 170 14 60-30 150-20 200 6 50-26 120-20 160 0 30-12 56-6 70 4v216z" fill="url(#${k}rock)"/>` +
    `<path d="M0 560c60-30 120-10 170 14 60-30 150-20 200 6 50-26 120-20 160 0 30-12 56-6 70 4" fill="none" stroke="#7fa8ae" stroke-width="3" opacity=".55"/>` +
    `<path d="M10 556q40-18 80-10M190 570q60-22 130-6M400 574q50-18 100-8" stroke="#eef6f2" stroke-width="5" fill="none" opacity=".4" stroke-linecap="round" filter="url(#${k}b1)"/>` +
    // pool with the phone
    `<path d="${pool}" fill="#5fd8ea" opacity=".35" filter="url(#${k}b10)"/>` +
    `<path d="${pool}" fill="url(#${k}pool)"/>` +
    `<g clip-path="url(#${k}cp)">` +
    `<ellipse cx="300" cy="668" rx="230" ry="110" fill="url(#${k}ph)"/>` +
    `<g transform="translate(300 668) scale(1 .6) rotate(-32)">` +
    `<rect x="-52" y="-98" width="104" height="196" rx="18" fill="#04141a" opacity=".7" transform="translate(10 16)" filter="url(#${k}b4)"/>` +
    `<rect x="-52" y="-98" width="104" height="196" rx="18" fill="#0a1a22" stroke="#9fe6f0" stroke-width="2.500"/>` +
    `<rect x="-44" y="-90" width="88" height="180" rx="12" fill="url(#${k}scr)"/>` +
    `<rect x="-22" y="-62" width="44" height="12" rx="6" fill="#0a3a48" opacity=".55"/><rect x="-32" y="-10" width="64" height="20" rx="6" fill="#fff" opacity=".7"/><rect x="-32" y="18" width="64" height="20" rx="6" fill="#fff" opacity=".5"/>` +
    `<path d="M-44 40l30-22 14 30 40-40" stroke="#0a3a48" stroke-width="2" fill="none" opacity=".5"/></g>` +
    `<ellipse cx="300" cy="668" rx="120" ry="64" fill="#dffcff" opacity=".35" filter="url(#${k}b10)"/>` +
    `<g fill="none" stroke="#bff6ff"><ellipse cx="300" cy="668" rx="112" ry="46" stroke-width="2.500" opacity=".55"/><ellipse cx="300" cy="668" rx="168" ry="68" stroke-width="2" opacity=".35"/><ellipse cx="300" cy="668" rx="222" ry="90" stroke-width="1.500" opacity=".22"/></g>` +
    `<path d="M120 640q40-12 70 0M400 720q50 10 90-6M150 716q30 8 60 0" stroke="#dffcff" stroke-width="3" opacity=".4" fill="none" stroke-linecap="round"/>` +
    `</g>` +
    `<path d="${pool}" fill="none" stroke="#7fe6f0" stroke-width="3" opacity=".7"/>` +
    `<path d="${pool}" fill="none" stroke="#02060a" stroke-width="10" opacity=".55" transform="translate(0 -6)"/>` +
    // sea star + near rocks
    `<g transform="translate(96 728) rotate(-12)"><path d="M0-30L8-9 30-9 12 5 19 27 0 14-19 27-12 5-30-9-8-9z" fill="#d9822a" stroke="#d9822a" stroke-width="8" stroke-linejoin="round"/><path d="M0-30L8-9 30-9" stroke="#7fe6f0" stroke-width="2" fill="none" opacity=".7"/></g>` +
    `<path d="M0 800v-50c50-20 100-6 130 20l20 30zM600 800v-70c-50-16-110 4-150 40l-20 30z" fill="#020508"/>` +
    `<path d="M0 750c50-20 100-6 130 20M600 730c-50-16-110 4-150 40" fill="none" stroke="#5fd8ea" stroke-width="2.500" opacity=".45"/>` +
    `<rect width="600" height="800" fill="#0c2a3a" opacity=".12"/>`;
  return frame(k, 600, 800, defs, body, 0.22, 0.7);
}

// ───────────────────────────────────────────────────────────── wall_tide
function wallTide(): string {
  const k = 'wall_tide';
  const defs =
    lg(`${k}bg`, [[0, '#061722'], [0.4, '#0a2a36'], [1, '#040f17']]) +
    rg(`${k}moon`, [[0, '#7fd0d0', 0.35], [1, '#7fd0d0', 0]], 0.5, 0.5, 0.5) +
    lg(`${k}w`, [[0, '#2a8f96', 0.5], [0.25, '#14505c', 0.35], [1, '#061a24', 0]]) +
    bl(`${k}b3`, 3);
  let waves = '';
  for (let i = 0; i < 10; i++) {
    const y0 = 170 + i * 118, A = 20 + (i % 3) * 9, ph = i * 1.9, lam = 150 + (i % 4) * 34;
    const pts: [number, number][] = [];
    for (let x = -80; x <= 680; x += 76) pts.push([x, y0 + A * Math.sin(x / lam + ph) + A * 0.4 * Math.sin(x / 61 + ph * 2.3)]);
    let d = `M${pts[0][0]} ${n1(pts[0][1])}`;
    for (let j = 1; j < pts.length - 1; j++) {
      d += `Q${pts[j][0]} ${n1(pts[j][1])} ${n1((pts[j][0] + pts[j + 1][0]) / 2)} ${n1((pts[j][1] + pts[j + 1][1]) / 2)}`;
    }
    const op = n1(0.35 + 0.5 * Math.sin((i + 1) / 11 * Math.PI));
    waves += `<g opacity="${op}"><path d="${d}V${y0 + 330}H-80z" fill="url(#${k}w)"/>` +
      `<path d="${d}" fill="none" stroke="#8fe0dc" stroke-width="1.600" opacity=".4"/>` +
      `<path d="${d}" fill="none" stroke="#bff0ea" stroke-width="5" opacity=".1" transform="translate(0 7)" stroke-dasharray="${60 + i * 9} ${90 + i * 13}" filter="url(#${k}b3)"/></g>`;
  }
  const body =
    `<rect width="600" height="1300" fill="url(#${k}bg)"/>` +
    `<circle cx="440" cy="250" r="420" fill="url(#${k}moon)"/>` +
    waves +
    `<rect width="600" height="1300" fill="#03101a" opacity=".25"/>`;
  return frame(k, 600, 1300, defs, body, 0.12, 0.55);
}

// ───────────────────────────────────────────────────────────── map_harrow
function mapHarrow(): string {
  const k = 'map_harrow';
  const R = rng(21);
  const defs =
    rg(`${k}sea`, [[0, '#0d2a36'], [1, '#06151d']], 0.75, 0.6, 0.8) +
    lg(`${k}land`, [[0, '#17242d'], [1, '#1b2932']], 1, 1) +
    rg(`${k}tl`, [[0, '#ffb060', 0.3], [1, '#ffb060', 0]]) +
    rg(`${k}lh`, [[0, '#fff0b8', 0.9], [0.25, '#ffe090', 0.35], [1, '#ffe090', 0]]) +
    bl(`${k}b3`, 3) + bl(`${k}b8`, 8) +
    `<clipPath id="${k}cp"><path d="M-30-30H600V0C640 30 690 60 720 84c32 20 40 56 14 76-34 26-84 20-114 50-30 30-60 26-68 52-6 28 48 38 60 88 12 50 38 90 16 130-16 30-58 40-98 32-30-6-50 8-68 0v-24h-82v28c-40 14-120 24-200 32-70 8-130 12-180 18h-30z"/></clipPath>` +
    `<pattern id="${k}ht" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><rect width="3" height="8" fill="#e8923a" opacity=".5"/></pattern>`;
  const land = 'M-30-30H600V0C640 30 690 60 720 84c32 20 40 56 14 76-34 26-84 20-114 50-30 30-60 26-68 52-6 28 48 38 60 88 12 50 38 90 16 130-16 30-58 40-98 32-30-6-50 8-68 0v-24h-82v28c-40 14-120 24-200 32-70 8-130 12-180 18h-30z';
  let trees = '';
  for (let i = 0; i < 70; i++) {
    const a = R() * 1.6, d = Math.sqrt(R()) * 250;
    const x = Math.cos(a) * d * 1.05, y = Math.sin(a) * d * 0.78;
    trees += `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(3 + R() * 5)}"/>`;
  }
  let blocks = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
    if (R() < 0.12) continue;
    const x = -138 + c * 46, y = -70 + r * 36;
    blocks += R() < 0.3
      ? `<rect x="${x}" y="${y}" width="17" height="28"/><rect x="${x + 21}" y="${y}" width="17" height="28"/>`
      : `<rect x="${x}" y="${y}" width="38" height="28"/>`;
  }
  const body =
    `<rect width="800" height="600" fill="url(#${k}sea)"/>` +
    // graticule
    `<g stroke="#1c4250" stroke-width="1" opacity=".35"><path d="M0 150h800M0 300h800M0 450h800M200 0v600M400 0v600M600 0v600"/></g>` +
    // bathymetry bands
    `<g fill="none" stroke-linejoin="round"><path d="${land}" stroke="#103440" stroke-width="150" opacity=".5"/><path d="${land}" stroke="#144250" stroke-width="90" opacity=".5"/><path d="${land}" stroke="#1a5260" stroke-width="40" opacity=".5"/>` +
    `<path d="${land}" stroke="#3fb0b8" stroke-width="10" opacity=".5" filter="url(#${k}b8)"/></g>` +
    `<path d="${land}" fill="url(#${k}land)"/>` +
    `<g clip-path="url(#${k}cp)">` +
    // beach
    `<path d="M0 566c50-6 110-10 180-18 80-8 160-18 200-32" fill="none" stroke="#b8a878" stroke-width="12" opacity=".28"/>` +
    `<path d="M612 350c12 50 38 90 16 130" fill="none" stroke="#b8a878" stroke-width="10" opacity=".2"/>` +
    // forest + hills
    `<path d="M0 0h300c-10 70-50 120-110 150S60 200 0 230z" fill="#122a26"/><path d="M0 0h210c-10 50-40 90-90 110S40 150 0 170z" fill="#153229"/>` +
    `<g fill="#1c4234" opacity=".9">${trees}</g>` +
    `<g fill="none" stroke="#3a7a60" stroke-width="1.200" opacity=".45"><ellipse cx="110" cy="70" rx="40" ry="24" transform="rotate(-20 110 70)"/><ellipse cx="110" cy="70" rx="74" ry="46" transform="rotate(-20 110 70)"/><ellipse cx="112" cy="74" rx="112" ry="72" transform="rotate(-20 112 74)"/><ellipse cx="660" cy="130" rx="40" ry="18" transform="rotate(-24 660 130)" stroke="#4a6a70"/><ellipse cx="664" cy="130" rx="66" ry="30" transform="rotate(-24 664 130)" stroke="#4a6a70"/></g>` +
    // creek
    `<path d="M0 120c60 40 130 80 170 150 30 60 40 120 90 170 30 30 60 60 76 100" fill="none" stroke="#14404e" stroke-width="5" stroke-linecap="round"/><path d="M0 120c60 40 130 80 170 150 30 60 40 120 90 170 30 30 60 60 76 100" fill="none" stroke="#2a7080" stroke-width="1.500" opacity=".7"/>` +
    // parks
    `<path d="M440 330q40-20 70 0t10 50-70 20-10-70z" fill="#16302a" opacity=".8"/><rect x="186" y="430" width="50" height="40" rx="8" fill="#16302a" opacity=".8" transform="rotate(-8 210 450)"/>` +
    // town blocks
    `<circle cx="340" cy="420" r="150" fill="url(#${k}tl)"/><circle cx="500" cy="244" r="70" fill="url(#${k}tl)" opacity=".7"/>` +
    `<g transform="translate(336 418) rotate(-9)"><g stroke="#2a3944" stroke-width="3"><path d="M-150-78h290M-150-42h290M-150-6h290M-150 30h290M-150 66h290M-146-80v150M-100-80v150M-54-80v150M-8-80v150M38-80v150M84-80v150M130-80v150"/></g><g fill="#22323d">${blocks}</g></g>` +
    // minor roads
    `<g fill="none" stroke="#2c3c47" stroke-width="3.500" stroke-linecap="round"><path d="M522 196c50-10 100-50 168-62q26-2 44-6M548 300c-20-20-30-40-52-58M470 440c40 20 80 30 108 52M330 506c40-20 90-26 150-22M250 392c-30 40-60 70-70 150M120 322c40 60 60 100 60 110M560 320c30 20 50 60 60 110"/></g>` +
    // trail to the hills (unpaved)
    `<path d="M150 338c-40-60 0-130-30-196-12-28-20-50-24-78" fill="none" stroke="#b8a878" stroke-width="2.500" stroke-dasharray="3 6" stroke-linecap="round" opacity=".8"/>` +
    // highway
    `<path d="M0 306c100 10 180 44 250 84s150 60 220 50 100-60 90-120c-8-50-40-90-40-140 0-60 20-120 40-180" fill="none" stroke="#0e171d" stroke-width="10" stroke-linecap="round"/>` +
    `<path d="M0 306c100 10 180 44 250 84s150 60 220 50 100-60 90-120c-8-50-40-90-40-140 0-60 20-120 40-180" fill="none" stroke="#3b4e5b" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M0 306c100 10 180 44 250 84s150 60 220 50 100-60 90-120c-8-50-40-90-40-140 0-60 20-120 40-180" fill="none" stroke="#c9a85a" stroke-width="1" stroke-dasharray="8 8" opacity=".45"/>` +
    // station campus
    `<g transform="rotate(-14 496 240)" fill="#2a3e4a" stroke="#4f8f98" stroke-width="1"><rect x="462" y="222" width="42" height="14"/><rect x="500" y="228" width="36" height="16"/><rect x="474" y="246" width="20" height="14"/><rect x="508" y="252" width="14" height="10"/></g>` +
    // blackrock site
    `<g transform="rotate(-12 578 492)"><rect x="548" y="470" width="62" height="40" fill="url(#${k}ht)" stroke="#e8923a" stroke-width="1.500" stroke-dasharray="5 4" opacity=".8"/></g>` +
    // lighthouse lot + buildings
    `<g fill="#22323d"><rect x="676" y="138" width="12" height="8"/><rect x="420" y="476" width="30" height="8" transform="rotate(-4 420 476)"/><rect x="384" y="476" width="26" height="8"/><rect x="60" y="324" width="14" height="10"/><rect x="100" y="52" width="10" height="8" fill="#2c4a3c"/></g>` +
    `</g>` +
    `<path d="${land}" fill="none" stroke="#5aa8b0" stroke-width="1.500" opacity=".85"/>` +
    // harbor: piers, breakwater, boats
    `<g stroke="#4a5f6c" stroke-width="3" stroke-linecap="round"><path d="M396 492v18M412 492v18M428 492v18M444 492v18"/></g>` +
    `<path d="M352 544q50 26 120 12" fill="none" stroke="#3b4e5b" stroke-width="5" stroke-linecap="round"/><path d="M486 524l14 22" stroke="#3b4e5b" stroke-width="5" stroke-linecap="round"/>` +
    `<g fill="#9fc0c8" opacity=".8"><rect x="401" y="500" width="6" height="3"/><rect x="417" y="506" width="6" height="3"/><rect x="433" y="498" width="6" height="3"/><rect x="390" y="532" width="7" height="3" transform="rotate(20 390 532)"/></g>` +
    // planned marina piers (dashed)
    `<g stroke="#e8923a" stroke-width="1.500" stroke-dasharray="4 4" opacity=".6" fill="none"><path d="M590 516l14 40M610 508l16 44M572 522l10 38M576 566l56-18"/></g>` +
    // lighthouse glow
    `<path d="M742 126l58-40v70z" fill="#fff0b8" opacity=".12"/><circle cx="740" cy="128" r="30" fill="url(#${k}lh)"/><circle cx="740" cy="128" r="3" fill="#fff6d8"/>` +
    // sea texture
    `<g stroke="#2a6a78" stroke-width="1.200" opacity=".5" fill="none" stroke-linecap="round"><path d="M680 300q10-6 20 0t20 0M720 420q10-6 20 0t20 0M660 540q10-6 20 0t20 0M230 584q10-6 20 0t20 0M700 220q10-6 20 0t20 0"/></g>` +
    // compass + scale
    `<g transform="translate(744 540)" opacity=".7"><circle r="24" fill="none" stroke="#3a7a88" stroke-width="1"/><path d="M0-30l7 30-7 30-7-30z" fill="#16323c" stroke="#5aa8b0" stroke-width="1"/><path d="M0-30l7 30h-14z" fill="#5aa8b0"/><path d="M-30 0h60" stroke="#3a7a88" stroke-width="1"/></g>` +
    `<g transform="translate(600 574)" stroke="#5aa8b0" stroke-width="1.500" opacity=".6"><path d="M0 0h80M0-4v8M40-3v6M80-4v8"/></g>`;
  return frame(k, 800, 600, defs, body, 0.1, 0.45);
}

/** Art registry for Case 01. Keys are the art ids referenced by src/cases/case1.ts. */
export const case1Art: Record<string, string> = {
  ph_biscuit: phBiscuit(),
  ph_selfie: phSelfie(),
  ph_tidepool: phTidepool(),
  ph_coffee: phCoffee(),
  ph_key: phKey(),
  ph_drybag: phDrybag(),
  ph_gullpoint: phGullpoint(),
  ph_anchor: phAnchor(),
  ph_seawren: phSeawren(),
  ph_blackrock: phBlackrock(),
  ph_labsheets: phLabsheets(),
  ph_station: phStation(),
  cover_case1: coverCase1(),
  wall_tide: wallTide(),
  map_harrow: mapHarrow(),
};
