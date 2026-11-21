// COLD SIGNAL — "Hidden" album illustrations (the passcode-locked private photos).
// Every value in `hiddenArt` is a complete standalone portrait SVG document string (600×800).
// Ids inside each SVG are prefixed with the art key. Original art, no external references.
// Comedy thirst traps: strictly non-explicit (swimwear / underwear / towels / robes stay on).

/** Art registry for the Hidden album. Keys are the art ids referenced by the case files. */
export const hiddenArt: Record<string, string> = {};
const A = hiddenArt;

type Stop = [number, string, number?];
const st = (s: Stop[]): string =>
  s.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? '' : ` stop-opacity="${a}"`}/>`).join('');
const lg = (id: string, s: Stop[], x2 = 0, y2 = 1, x1 = 0, y1 = 0): string =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${st(s)}</linearGradient>`;
const rg = (id: string, s: Stop[], cx = 0.5, cy = 0.5, r = 0.5): string =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${st(s)}</radialGradient>`;
const bl = (id: string, d: number): string =>
  `<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${d}"/></filter>`;
const pat = (id: string, w: number, h: number, body: string): string =>
  `<pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse">${body}</pattern>`;
const SANS = 'font-family="Helvetica, Arial, sans-serif"';
const MONO = 'font-family="Courier New, monospace"';
const BOLD = 'font-weight="bold"';
const MID = 'text-anchor="middle"';
const r0 = (v: number): number => Math.round(v);
const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const fit = (w: number): string => `textLength="${w}" lengthAdjust="spacingAndGlyphs"`;
const tx = (x: number, y: number, size: number, s: string, fill: string, ex = '', font = SANS): string =>
  `<text x="${x}" y="${y}" ${font} font-size="${size}" fill="${fill}"${ex ? ' ' + ex : ''}>${esc(s)}</text>`;
/** Filled path. */
const P = (d: string, fill: string, ex = ''): string => `<path d="${d}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;
/** Round-capped stroke. */
const S = (d: string, c: string, w: number, ex = ''): string =>
  `<path d="${d}" fill="none" stroke="${c}" stroke-width="${+w.toFixed(1)}"${ex ? ' ' + ex : ''}/>`;
const C = (x: number, y: number, r: number, fill: string, ex = ''): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;
const E = (x: number, y: number, rx: number, ry: number, fill: string, ex = ''): string =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;
const R = (x: number, y: number, w: number, h: number, fill: string, ex = ''): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${ex ? ' ' + ex : ''}/>`;

/** Deterministic PRNG so the art is identical on every load. */
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Wraps a 600×800 picture: adds film grain + vignette. */
const frame = (k: string, defs: string, body: string, grain = 0.16, vig = 0.5): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800"><defs>${defs}` +
  `<filter id="${k}gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7"/><feColorMatrix values=".6 .6 .6 0 -.4 .6 .6 .6 0 -.4 .6 .6 .6 0 -.4 0 0 0 0 1"/></filter>` +
  rg(`${k}vg`, [[0.5, '#000', 0], [1, '#000', vig]], 0.5, 0.5, 0.75) +
  `<clipPath id="${k}fr"><rect width="600" height="800"/></clipPath></defs><g clip-path="url(#${k}fr)" stroke-linecap="round" stroke-linejoin="round">${body}<rect width="600" height="800" filter="url(#${k}gr)" opacity="${grain}" style="mix-blend-mode:overlay"/><rect width="600" height="800" fill="url(#${k}vg)"/></g></svg>`;

/** Story-style caption strip burned into the photo. */
const cap = (y: number, s: string): string =>
  R(0, y, 600, 46, '#000', 'opacity=".55"') + tx(300, y + 31, 23, s, '#fff', `${MID} ${fit(Math.min(540, r0(s.length * 12)))}`);
/** Four-point sparkle. */
const star = (x: number, y: number, r: number, c: string, o = 1): string =>
  P(`M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`, c, o < 1 ? `opacity="${o}"` : '');

// ════════════════════════════════════════════════════════════════ FIGURE KIT
// Figures are drawn in the avatars' 200-unit space (head 67..133 × 34..131, chin at 100,131)
// and placed with fig(); faces reuse each avatar's palette, brows, mouth, hair and props.
interface Face {
  skin: string;
  shade: string;
  rim: string;
  iris: string;
  lid?: number;
  low?: number;
  brows: string;
  browC: string;
  mouth: string;
  inFace?: string;
  post?: string;
  lines?: string;
  hair?: string;
  top?: string;
  noEyes?: boolean;
}
const HEAD = 'M67 80C67 34 133 34 133 80C133 106 122 131 100 131C78 131 67 106 67 80Z';
function head(k: string, o: Face): string {
  const lid = o.lid ?? 86.4, low = o.low ?? 94.2;
  const eye = (x: number, white: string): string =>
    `<path d="M${x} 91.500Q${x + 7} ${lid} ${x + 14} 91Q${x + 7} ${low} ${x} 91.500Z" fill="${white}"/>` + C(x + 7, 90.7, 3, o.iris) + C(x + 5.8, 89.6, 0.9, '#fff') +
    S(`M${x - 0.5} 91.800Q${x + 7} ${lid - 1} ${x + 14.5} 91`, '#1a1318', 1.9);
  return (
    P('M85 118V152Q100 164 115 152V118Z', o.shade) + P('M85 124V151Q90 155 95 157L93 132Z', o.skin, 'opacity=".55"') +
    E(67, 94, 5, 9, o.skin) + E(133, 94, 5, 9, o.shade) + P(HEAD, o.skin) +
    `<clipPath id="${k}h"><path d="${HEAD}"/></clipPath><g clip-path="url(#${k}h)">${o.inFace ?? ''}` +
    P('M109 30C105 60 109 72 106 84C104 97 111 103 108 112C106 122 104 128 99 132H140V30Z', o.shade, 'opacity=".72"') +
    P('M70 62Q80 50 96 48Q78 56 72 76Z', '#fff', 'opacity=".13"') + S('M133 66V80C133 106 122 131 100 131', o.rim, 5, 'opacity=".8"') + '</g>' +
    (o.post ?? '') + (o.noEyes ? '' : eye(80, '#f1e9df') + eye(106, '#b9ada6')) +
    S(o.brows, o.browC, 3.2) + S('M102 94Q105 104 105.500 108Q101 112 95 108.500', '#000', 1.9, 'stroke-opacity=".38"') +
    `<g fill="none">${o.mouth}${o.lines ?? ''}</g>` + (o.hair ?? '') + (o.top ?? '')
  );
}
/** Places avatar-space art so the chin lands on (x, y). */
const fig = (x: number, y: number, s: number, body: string, rot = 0): string =>
  `<g transform="translate(${x} ${y})${rot ? ` rotate(${rot})` : ''} scale(${s}) translate(-100 -131)">${body}</g>`;

const MT = (b: number): string =>
  `M80 146C60 149 44 155 40 172L46 216Q${50 - b} 252 ${56 - b * 0.6} 284Q54 304 54 332H146Q146 304 ${144 + b * 0.6} 284Q${150 + b} 252 154 216L160 172C156 155 140 149 120 146Z`;
const MT_R = (b: number): string => `M120 146C140 149 156 155 160 172L154 216Q${150 + b} 252 ${144 + b * 0.6} 284Q146 304 146 332`;
const FT = 'M83 146C68 149 54 155 50 170L55 206Q58 238 68 260Q46 292 42 332H158Q154 292 132 260Q142 238 145 206L150 170C146 155 132 149 117 146Z';
const FT_R = 'M117 146C132 149 146 155 150 170L145 206Q142 238 132 260Q154 292 158 332';
/** Bare torso with the avatar-style half shade + rim light. `b` = belly (men), `fem` = hourglass. */
function torso(k: string, o: Face, det: string, b = 0, fem = false): string {
  const d = fem ? FT : MT(b);
  return (
    P(d, o.skin) + `<clipPath id="${k}t"><path d="${d}"/></clipPath><g clip-path="url(#${k}t)">` +
    P('M110 140C105 180 113 200 108 240C105 270 111 300 107 340H200V140Z', o.shade, 'opacity=".55"') + det + '</g>' +
    S(fem ? FT_R : MT_R(b), o.rim, 5, 'opacity=".85"') + S(fem ? 'M52 174Q52 196 57 208M60 280Q50 296 47 322' : 'M43 176L49 214M56 290v30', '#fff', 3, 'opacity=".3"') + S('M58 158Q70 151 82 150', '#fff', 3, 'opacity=".3"')
  );
}
/** Pecs, collarbones and navel for the gentlemen. */
const chest = (c: string, navelY = 288): string =>
  S('M58 206Q78 223 98 208M102 208Q122 223 142 206', c, 2.4, 'opacity=".85"') +
  S(`M70 160Q86 167 96 162M104 162Q114 167 130 160M100 ${navelY}v6`, c, 1.8, 'opacity=".6"');
/** Two-segment limb with a hand: [shoulder, elbow, wrist] as x,y pairs. */
const arm = (c: string, w: number, a: number[], hand: string | false = c): string =>
  S(`M${a[0]} ${a[1]}L${a[2]} ${a[3]}`, c, w) + S(`M${a[2]} ${a[3]}L${a[4]} ${a[5]}`, c, w * 0.84) + (hand ? C(a[4], a[5], +(w * 0.5).toFixed(1), hand) : '');
const phone = (x: number, y: number, rot: number, skin: string): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot})">${R(-13, -25, 26, 50, '#14161c', 'rx="5" stroke="#4a4e5a" stroke-width="1"')}${R(-10, -22, 12, 12, '#262a34', 'rx="3.500"')}${C(-6.5, -18.5, 2.2, '#5a7a9a')}${C(-2.5, -14, 1.7, '#5a7a9a')}${C(5, -19, 1.6, '#fff', 'opacity=".9"')}${S('M15 4h-9M15 11h-10M15 18h-8', skin, 5.5)}</g>`;
const beanie = (dome: string, band: string, rib: string): string =>
  P('M62 80C54 22 146 22 138 80C120 68 80 68 62 80Z', dome) + P('M104 36C128 40 138 58 138 80C130 74 120 72 110 71Z', '#000', 'opacity=".2"') +
  P('M60 70Q100 53 140 70V86Q100 69 60 86Z', band) + `<path d="M70 67V82M80 64V78M90 62V76M100 61V75M110 62V76M120 64V78M130 67V82" stroke="${rib}" stroke-width="1.600"/>`;
const cans = (cup: string, cupD: string): string =>
  S('M72 146Q100 176 128 146', '#1c1c26', 7) +
  `<rect x="58" y="132" width="20" height="34" rx="9" fill="#23232e" transform="rotate(12 68 149)"/><rect x="62" y="138" width="11" height="22" rx="5" fill="${cup}" transform="rotate(12 68 149)"/>` +
  `<rect x="122" y="132" width="20" height="34" rx="9" fill="#15151c" transform="rotate(-12 132 149)"/><rect x="127" y="138" width="11" height="22" rx="5" fill="${cupD}" transform="rotate(-12 132 149)"/>`;
/** Small curls of body hair inside a box. */
const fuzz = (seed: number, n: number, x0: number, y0: number, w: number, h: number, c: string, taper = 0): string => {
  const r = rng(seed);
  let d = '';
  for (let i = 0; i < n; i++) {
    const v = r(), u = r();
    const x = x0 + w / 2 + (u - 0.5) * w * (1 - taper * v), y = y0 + v * h;
    d += `M${r0(x)} ${r0(y)}q${r() > 0.5 ? 3 : -3}-3 0-5`;
  }
  return S(d, c, 1.2, 'opacity=".8"');
};
const ring = (x: number, y: number, r: number, c = '#e9c66a', w = 1.4): string => C(x, y, r, 'none', `stroke="${c}" stroke-width="${w}"`);
/** Round dots as one path. */
const dots = (pts: number[][], c: string, w: number, ex = ''): string => S(pts.map(([x, y]) => `M${x} ${y}h.01`).join(''), c, w, ex);
/** Soft capsule petals as one path. */
const petals = (seed: number, n: number, x0: number, y0: number, w: number, h: number, c: string): string => {
  const r = rng(seed);
  let d = '';
  for (let i = 0; i < n; i++) d += `M${r0(x0 + r() * w)} ${r0(y0 + r() * h)}l${r0(r() * 16 - 8)} ${r0(r() * 12 - 6)}`;
  return S(d, c, 9);
};
/** Curves for the ladies: collarbones, bust contour, waist, navel (no anatomy beyond silhouettes). */
const femDet = (c: string): string =>
  S('M72 160Q88 167 97 163M103 163Q112 167 128 160', c, 1.6, 'opacity=".55"') + S('M100 190Q98 206 100 222', c, 1.9, 'opacity=".75"') +
  S('M60 204Q57 225 73 231Q91 235 100 222M140 204Q143 225 127 231Q109 235 100 222', c, 2, 'opacity=".6"') + E(74, 207, 9, 6, '#fff', 'opacity=".14"') +
  S('M100 278v6M97 244Q101 258 99 270M58 296Q65 306 63 318M142 296Q135 306 137 318', c, 1.6, 'opacity=".45"');
/** String-triangle top + matching tie-side bottom (smooth fabric shapes only). */
const TRI = 'M80 186Q92 204 99 223Q83 233 65 225Q68 204 80 186ZM120 186Q108 204 101 223Q117 233 135 225Q132 204 120 186Z';
const BOT = 'M56 302Q100 326 144 302L103 356H97Z';
const strings = (c: string): string => S('M80 186L92 150M120 186L108 150M65 225L54 220M135 225L146 220M99 223h2M56 302L42 297M144 302L158 297', c, 1.8);
const bows = (c: string): string => S('M44 298q-12-8-14 4q8 4 14-4q-10 10-8 24M156 298q12-8 14 4q-8 4-14-4q10 10 8 24', c, 2.2);
const fLegs = (f: Face): string =>
  P('M42 332Q38 392 50 456H97L100 354L103 456H150Q162 392 158 332Z', f.skin) + P('M108 332H158Q162 392 150 456H103Z', f.shade, 'opacity=".55"') + S('M158 332Q162 392 150 456', f.rim, 3.5, 'opacity=".7"');
const candle = (g: string, x: number, y: number, h: number, w = 16): string =>
  C(x, y - h - 10, 46, `url(#${g})`) + R(x - w / 2, y - h, w, h, '#efe2c4', 'rx="3"') +
  P(`M${x} ${y - h - 24}q7 16 0 22q-7-6 0-22Z`, '#ffd76a');

// ════════════════════════════════════════════════════════════════ CASE 1
{
  const k = 'hp_c1_theo';
  const f: Face = {
    skin: '#e0b090', shade: '#a87058', rim: '#ff9ac8', iris: '#3a4a52', lid: 87.4, low: 93.5,
    inFace: P('M66 96C72 116 88 109 100 109C112 109 128 116 134 96V134H66Z', '#3a2a22', 'opacity=".14"'),
    brows: 'M77.500 79.500Q86 78 95 83.500M105 82Q114 75 122.500 76', browC: '#3a2a22',
    mouth: `<path d="M91 117.500Q100 117 110 113" stroke="#7a2f33" stroke-width="2.400"/><path d="M110 111q2 2 1 4" stroke="#7a2f33" stroke-width="1.300"/>`,
    hair: P('M65 76L63 100Q68 94 70 80ZM135 76L137 100Q132 94 130 80Z', '#3a2a22') + beanie('#7d8087', '#9da0a6', '#6a6d74'),
  };
  const body =
    torso(k, f, chest(f.shade) + S('M100 214V282M84 238Q92 243 100 238Q108 243 116 238M85 258Q92 263 100 258Q108 263 115 258M64 250Q60 270 62 290M136 250Q140 270 138 290', f.shade, 1.8, 'opacity=".55"')) +
    P('M52 322H148L154 440H46Z', '#2a3550') + P('M100 330V440M56 340Q70 352 84 340', 'none', 'stroke="#1a2238" stroke-width="2"') +
    P('M53 310Q100 320 147 310V326Q100 334 53 326Z', '#ece6d8') + tx(100, 324, 8, 'BRAVADO', '#b0263a', `${MID} ${BOLD} ${fit(46)}`) +
    P('M118 186q5-7 10 0q5-7 10 0q0 8-10 15q-10-7-10-15Z', 'none', 'stroke="#2a3a5a" stroke-width="1.600"') + tx(128, 197, 6, 'MOM', '#2a3a5a', `${MID} ${BOLD}`) +
    head(k, f) + ring(66, 104, 3, '#c8ccd4') +
    // the flex
    arm(f.skin, 25, [47, 180, 4, 176, 16, 122]) + E(27, 166, 19, 13, f.skin) + S('M12 160Q26 148 42 160', '#fff', 2, 'opacity=".25"') +
    S('M27 160v12M22 164h10M21 170q6 6 12 0', '#2a3a5a', 1.6) + S('M9 112q7-4 14 0', f.shade, 1.6) +
    // phone arm
    arm(f.shade, 24, [153, 180, 174, 240, 138, 208]) + S('M153 180L174 240', f.rim, 2.5, 'opacity=".5" transform="translate(11 -2)"') + phone(128, 186, -8, f.shade);
  A[k] = frame(
    k,
    lg(`${k}w`, [[0, '#6f8f84'], [1, '#22302e']]) + pat(`${k}p`, 60, 60, `<path d="M0 0H60V60" fill="none" stroke="#14201e" stroke-width="3" opacity=".5"/>`) +
      lg(`${k}c`, [[0, '#e8ecee'], [0.5, '#9aa2a8'], [1, '#5a6268']]) + rg(`${k}n`, [[0, '#ff4aa8', 0.55], [1, '#ff4aa8', 0]]) + rg(`${k}f`, [[0, '#eaffef', 0.7], [1, '#eaffef', 0]]) + bl(`${k}b`, 14),
    R(0, 0, 600, 800, `url(#${k}w)`) + R(0, 0, 600, 800, `url(#${k}p)`) +
      E(300, 26, 300, 110, `url(#${k}f)`) + R(130, 16, 340, 14, '#f4fff6', 'rx="7"') +
      // stall door + graffiti
      R(0, 110, 118, 690, '#3f5a54') + R(0, 110, 118, 690, '#000', 'opacity=".2"') + R(110, 110, 8, 690, '#2a3c38') + C(96, 470, 7, '#c8ccd0') +
      `<g transform="rotate(-7 60 300)">${tx(8, 290, 22, 'THEO', '#e8e4d0', `${BOLD} ${fit(70)}`)}${tx(8, 318, 22, '10/10', '#e8e4d0', `${BOLD} ${fit(70)}`)}${S('M4 312L84 304', '#ff5a6a', 3)}${tx(22, 348, 24, '4/10', '#ff5a6a', `${BOLD} ${fit(62)}`)}</g>` +
      // hand dryer + sign
      R(452, 286, 120, 104, `url(#${k}c)`, 'rx="14"') + R(488, 376, 48, 26, '#4a5258', 'rx="6"') + C(512, 330, 17, '#2c3338') + C(512, 330, 10, '#dfe4e8') +
      `<g transform="rotate(4 512 200)">${R(438, 140, 148, 116, '#f2eede')}${R(430, 134, 34, 14, '#d8cf9a', 'opacity=".8"')}${R(560, 246, 34, 14, '#d8cf9a', 'opacity=".8"')}` +
      tx(512, 168, 15, 'HAND DRYER', '#1c1c1c', `${MID} ${BOLD} ${fit(120)}`) + tx(512, 196, 21, 'OUT OF ORDER', '#c0202c', `${MID} ${BOLD} ${fit(132)}`) +
      tx(512, 220, 12, 'please do not', '#333', `${MID} ${fit(96)}`) + tx(512, 238, 12, 'flex at it. — mgmt', '#333', `${MID} ${fit(118)}`) + '</g>' +
      fig(292, 306, 2, body) +
      C(600, 420, 330, `url(#${k}n)`, 'style="mix-blend-mode:screen"') +
      // phone flash + mirror grime
      C(363, 380, 60, '#fff', `opacity=".5" filter="url(#${k}b)"`) + star(363, 380, 34, '#fff', 0.95) +
      S('M40 640L260 60M110 760L330 180', '#fff', 26, 'opacity=".05"') + C(70, 706, 46, '#1c2a3a') + C(70, 706, 40, 'none', 'stroke="#e8d9a0" stroke-width="2.500"') +
      S('M70 684v40M56 696h28M52 714q18 20 36 0', '#e8d9a0', 4) + tx(70, 742, 9, 'THE ANCHOR', '#e8d9a0', `${MID} ${BOLD} ${fit(56)}`) +
      R(0, 0, 600, 800, 'none', 'stroke="#101816" stroke-width="18"'),
  );
}

{
  const k = 'hp_c1_june';
  const sk = '#8a5236', sh = '#572e22';
  const f: Face = {
    skin: sk, shade: sh, rim: '#ffd08a', iris: '#1c100c', lid: 86.2, low: 94.4,
    inFace:
      P('M70 81C70 44 130 44 130 81C130 104 120 128 100 128C80 128 70 104 70 81Z', '#edf5f0') + E(87, 90.5, 11, 7.5, sk) + E(113, 90.5, 11, 7.5, sk) + E(100, 116.5, 15, 9, sk) +
      S('M74 70Q80 74 78 80M124 100q-5 6-3 12M82 104q4 5 2 12M96 60q4 3 8 0', '#b4c6c0', 1.3),
    brows: 'M0 0', browC: 'none',
    mouth: `<path d="M88 112.500Q100 127 112 112.500Q100 116.500 88 112.500Z" fill="#4a161c" stroke="#5a1f22" stroke-width="1.600"/><path d="M91 114.300Q100 117.500 109 114.300L107.500 116.800Q100 120 92.500 116.800Z" fill="#f6efe6" stroke="none"/>`,
    hair:
      P('M66 84C62 58 82 47 100 47C118 47 138 58 134 84C129 69 116 60 100 60C84 60 71 69 66 84Z', '#17100f') + S('M65 76Q100 50 135 76', '#f28aa8', 9) + S('M66 73Q100 48 126 64', '#ffc0d0', 2, 'opacity=".7"') +
      C(66, 108, 6, 'none', 'stroke="#f3c64a" stroke-width="2.400"') + C(134, 108, 6, 'none', 'stroke="#c8962a" stroke-width="2.400"') + dots([[65, 96], [66, 88]], '#f3c64a', 2.6) + C(106, 105, 1.6, '#f3c64a'),
  };
  const r = rng(11);
  let bub = '', air = '';
  for (let i = 0; i < 52; i++) {
    const x = r() * 640 - 20, rad = 20 + r() * 30;
    const top = 474 + Math.abs(x - 290) * 0.04;
    const y = top + r() * r() * 330;
    bub += `<circle cx="${r0(x)}" cy="${r0(y)}" r="${r0(rad)}"/>`;
  }
  for (let i = 0; i < 9; i++) air += C(r0(40 + r() * 520), r0(60 + r() * 330), r0(4 + r() * 9), 'none', 'stroke="#fff" stroke-width="1.500" opacity=".5"');
  const bodyU =
    `<g fill="#17100f">${C(72, 62, 17, '')}${C(88, 44, 18, '')}${C(110, 43, 18, '')}${C(128, 60, 17, '')}${C(100, 26, 15, '')}</g>`.replace(/ fill=""/g, '') +
    P('M83 146C62 150 44 158 38 180V250H162V180C156 158 138 150 117 146Z', sk) + P('M108 146C140 152 158 160 162 180V250H110Z', sh, 'opacity=".55"') +
    S('M70 162Q88 170 97 165M103 165Q112 170 130 162', sh, 1.8, 'opacity=".7"') + S('M117 146C138 150 156 158 162 180V250', '#ffd08a', 5, 'opacity=".8"') + S('M100 196Q98 212 100 226', sh, 2, 'opacity=".7"') + S('M48 172Q62 158 80 154', '#fff', 3.5, 'opacity=".3"') +
    arm(sk, 22, [44, 184, 10, 250, -40, 330], false) + head(k, f) + arm(sh, 21, [158, 186, 208, 236, 205, 122]);
  // one leg up on the rim
  const leg = S('M350 640L436 452L560 470', sk, 50) + S('M452 428L566 446', '#ffd08a', 4, 'opacity=".8"') + S('M340 610L420 440', '#fff', 5, 'opacity=".25"') + E(578, 470, 24, 28, sk) + dots([[596, 452], [600, 462], [600, 472], [598, 481], [594, 489]], '#e8203c', 8);
  A[k] = frame(
    k,
    lg(`${k}w`, [[0, '#d07a4a'], [1, '#5a2418']]) + pat(`${k}p`, 50, 50, `<path d="M0 0H50V50" fill="none" stroke="#3a140c" stroke-width="2.500" opacity=".35"/>`) +
      rg(`${k}bb`, [[0, '#fff'], [0.6, '#eef3fb'], [1, '#b4c4e0']], 0.36, 0.3, 0.75) + rg(`${k}cg`, [[0, '#ffd27a', 0.6], [1, '#ffd27a', 0]]) + lg(`${k}n`, [[0, '#1a2450'], [1, '#4a3a70']]) + bl(`${k}b`, 16),
    R(0, 0, 600, 800, `url(#${k}w)`) + R(0, 0, 600, 800, `url(#${k}p)`) +
      // window + shelf
      R(404, 40, 160, 190, '#f1e6d2', 'rx="6"') + R(414, 50, 140, 170, `url(#${k}n)`) + C(520, 92, 20, '#fdf3d0') + C(512, 86, 18, '#27306a') + S('M484 50V220M414 135H554', '#f1e6d2', 6) +
      R(20, 250, 250, 12, '#f1e6d2') + candle(`${k}cg`, 60, 250, 46) + candle(`${k}cg`, 98, 250, 28, 20) + candle(`${k}cg`, 236, 250, 60, 14) +
      R(134, 190, 34, 60, '#3a8a7a', 'rx="6"') + R(143, 172, 16, 20, '#2a6a5c') + R(138, 208, 26, 22, '#f2e8d8') + P('M182 250V226q-16-20-6-36q8 14 10 30q2-26 16-36q4 22-10 42v20Z', '#5a9a52') +
      candle(`${k}cg`, 30, 478, 44, 18) +
      // tub
      P('M-10 492Q300 404 610 492V800H-10Z', '#f6f2ea') + P('M34 500Q300 430 566 500L590 800H10Z', '#cfc8be') +
      fig(285, 352, 1.9, bodyU) +
      // wine
      `<g transform="translate(486 316) rotate(8)">${S('M0 0V-52', '#f4f0f0', 4, 'opacity=".8"')}${P('M-30 -128Q-34 -62 0 -52Q34 -62 30 -128Z', '#fff', 'opacity=".25"')}${P('M-31 -100Q-30 -62 0 -53Q30 -62 31 -100Z', '#7a1230')}${S('M-22 -120Q-24 -82 -12 -66', '#fff', 3, 'opacity=".6"')}${E(0, -128, 30, 5, 'none', 'stroke="#fff" stroke-width="2" opacity=".7"')}${S('M-10 -14h20M-10 -4h20M-9 6h18', sh, 9)}</g>` +
      R(-10, 540, 620, 290, '#e4ebf7') + `<g fill="url(#${k}bb)">${bub}</g>` + leg +
      // duck
      C(340, 650, 44, `url(#${k}bb)`) + C(296, 620, 34, `url(#${k}bb)`) + C(386, 640, 34, `url(#${k}bb)`) + C(366, 596, 26, `url(#${k}bb)`) +
      `<g transform="translate(112 560)">${E(0, 10, 44, 28, '#f6cf3a')}${C(26, -22, 24, '#f6cf3a')}${P('M44 -22l26 6l-24 10Z', '#f08a2a')}${R(12, -34, 34, 9, '#16161c', 'rx="4"')}${P('M-40 4q-16-14-22 4q12 10 22 4Z', '#e0b424')}${S('M-14 8q14 12 30 0', '#e0b424', 3)}</g>` +
      C(70, 590, 28, `url(#${k}bb)`) + C(150, 604, 32, `url(#${k}bb)`) + air +
      P('M-10 770Q300 730 610 770V800H-10Z', '#fbf8f2') +
      `<g filter="url(#${k}b)" opacity=".3" fill="#fff">${E(120, 380, 90, 40, '')}${E(470, 330, 80, 50, '')}${E(300, 150, 120, 40, '')}</g>`.replace(/ fill=""/g, '') +
      cap(716, 'self care sunday (it is saturday)'),
    0.14,
  );
}

// ════════════════════════════════════════════════════════════════ CASE 2
{
  const k = 'hp_c2_jonah';
  const f: Face = {
    skin: '#c08458', shade: '#8a573a', rim: '#ffcf8a', iris: '#3a2418', lid: 86.8, low: 94.5,
    brows: 'M77.500 79.500Q86 75 95 79M105 80Q114 76.250 122.500 79.500', browC: '#2a1a14',
    post:
      P('M66 88C67 122 80 137 100 137C120 137 133 122 134 88C130 101 123 106 113 104Q100 99 87 104C77 106 70 101 66 88Z', '#2a1a14', 'opacity=".5"') +
      S('M76 112h.01M82 121h.01M90 127h.01M100 130h.01M110 127h.01M118 121h.01M124 112h.01M95 122h.01M105 122h.01', '#2a1a14', 1.6, 'opacity=".7"'),
    mouth: `<path d="M90 115Q100 121 110 115" stroke="#e0a888" stroke-width="2.400"/>`,
    hair:
      P('M63 80C58 38 84 23 100 23C118 23 142 38 137 80Q100 62 63 80Z', '#9a3230') + P('M61 84Q100 66 139 84L139 70Q100 52 61 70Z', '#6e2222') +
      `<path d="M70 68v12M80 64v12M90 61v12M100 60v12M110 61v12M120 64v12M130 68v12" stroke="#000" stroke-width="1.500" opacity=".3"/>`,
  };
  const owl = (x: number): string =>
    `<g transform="translate(${x} 548)">${E(0, 0, 24, 15, '#8a5a2a')}${P('M-20 -8l-2 -14l12 8ZM20 -8l2 -14l-12 8Z', '#6a4220')}${C(-9, -3, 8, '#fff')}${C(9, -3, 8, '#fff')}${C(-8, -2, 3.6, '#16161c')}${C(8, -2, 3.6, '#16161c')}${P('M-4 4h8l-4 7Z', '#f08a2a')}</g>`;
  const body =
    S('M78 358L75 450', f.skin, 31) + S('M75 450L77 530', f.skin, 24) + S('M122 358L126 450', f.shade, 31) + S('M126 450L124 530', f.shade, 24) +
    fuzz(4, 16, 62, 440, 76, 80, '#2a1a14') + owl(76) + owl(125) +
    torso(k, f, chest(f.shade, 290) + fuzz(3, 30, 66, 184, 68, 44, '#2a1a14', 0.5) + S('M100 296v14', '#2a1a14', 1.4, 'stroke-dasharray="1 3" opacity=".7"') +
      `<g transform="rotate(-24 68 246)">${R(58, 242, 22, 9, '#f0d8b4', 'rx="4"')}${R(65, 242, 8, 9, '#e0c094')}</g>`, 5) +
    P('M51 312Q100 322 149 312L152 372H106L100 356L94 372H48Z', '#1d2c5a') + P('M104 316H152V372H106Z', '#000', 'opacity=".22"') +
    `<path d="M64 336l6-9l-2 7h5l-6 9l2-7ZM82 352l6-9l-2 7h5l-6 9l2-7ZM120 334l6-9l-2 7h5l-6 9l2-7ZM134 354l6-9l-2 7h5l-6 9l2-7Z" fill="#e8c048"/>` +
    P('M51 308Q100 318 149 308V320Q100 330 51 320Z', '#e8c048') + tx(100, 321, 7.5, 'STATIC FM', '#1d2c5a', `${MID} ${BOLD} ${fit(44)}`) +
    S('M132 170l-6 22h12ZM132 170v-8M126 160q6-6 12 0M123 156q9-9 18 0', '#1c2a3a', 1.4) + head(k, f) + cans('#c8862a', '#7a4a10') + ring(66, 104, 3) +
    // soldering iron arm
    arm(f.skin, 23, [46, 180, 20, 236, 6, 186]) + S('M4 196L-2 150', '#2a6ac8', 8) + S('M-2 150L-6 124', '#c8ccd4', 3) + C(-6, 122, 3, '#ffb040') +
    S('M5 200Q10 260 30 300Q46 340 20 420Q4 480 30 560', '#111', 2) + S('M-7 114q-8-12 0-22q8-10 0-22q-6-10 2-20', '#fff', 2.4, 'opacity=".4"') + S('M-1 192h10M-2 199h10', f.skin, 5) +
    arm(f.shade, 22, [154, 180, 176, 240, 142, 212]) + phone(132, 190, -8, f.shade);
  A[k] = frame(
    k,
    lg(`${k}w`, [[0, '#3a4a44'], [1, '#121a18']]) + lg(`${k}m`, [[0, '#5a4636'], [1, '#1c1612']]) + rg(`${k}o`, [[0, '#ff4a3a', 0.6], [1, '#ff4a3a', 0]]) +
      rg(`${k}l`, [[0, '#ffc878', 0.55], [1, '#ffc878', 0]]) + rg(`${k}s`, [[0, '#6ab0ff', 0.5], [1, '#6ab0ff', 0]]) + bl(`${k}b`, 12) + `<clipPath id="${k}g"><rect x="88" y="48" width="424" height="709"/></clipPath>`,
    R(0, 0, 600, 800, `url(#${k}w)`) + `<path d="M30 0V800M150 0V800M270 0V800M390 0V800M510 0V800" stroke="#000" stroke-width="18" opacity=".12"/>` +
      R(0, 752, 600, 48, '#3a2a1c') + R(0, 742, 600, 12, '#1a2420') + R(68, 28, 464, 749, '#7a5430', 'rx="10"') + R(76, 36, 448, 733, '#4a3018', 'rx="6"') + R(88, 48, 424, 709, `url(#${k}m)`) +
      `<g clip-path="url(#${k}g)">` +
      // hallway reflection: studio door, ON AIR, coat hooks
      R(366, 150, 150, 520, '#16202c') + R(366, 150, 150, 520, `url(#${k}s)`) + R(356, 140, 10, 540, '#2a2018') +
      C(440, 112, 90, `url(#${k}o)`) + R(390, 92, 100, 38, '#2a0c0c', 'rx="6"') + tx(440, 119, 22, 'ON AIR', '#ff5a4a', `${MID} ${BOLD} ${fit(80)}`) +
      R(100, 150, 150, 10, '#2a2018') + P('M118 160q-18 40-14 150q30 16 64 0q6-100-12-150Z', '#2f4a44') + P('M150 160q14 60 12 150q-14 8-30 8V160Z', '#1f3430') + C(136, 158, 5, '#c8ccd0') + C(220, 158, 5, '#c8ccd0') +
      S('M220 160q-6 30 2 50', '#c8862a', 5) + C(150, 380, 140, `url(#${k}l)`) +
      R(88, 668, 424, 90, '#4a3524') + `<path d="M88 700H512M88 730H512" stroke="#2a1c12" stroke-width="2"/>` + E(300, 716, 150, 24, '#7a2a2a') +
      E(300, 722, 96, 10, '#000', 'opacity=".4"') + fig(300, 210, 1.2, body) +
      C(338, 281, 44, '#fff', `opacity=".45" filter="url(#${k}b)"`) + star(338, 281, 26, '#fff', 0.95) +
      S('M110 600L330 60M180 760L420 150', '#fff', 30, 'opacity=".05"') + '</g>' +
      `<g transform="rotate(-6 126 96)">${R(98, 66, 58, 58, '#f6e27a')}${tx(127, 90, 11, 'BUY', '#333', `${MID} ${BOLD}`)}${tx(127, 106, 11, 'SOLDER', '#333', `${MID} ${BOLD} ${fit(44)}`)}</g>` +
      R(88, 48, 424, 709, 'none', 'stroke="#000" stroke-width="3" opacity=".5"'),
    0.16, 0.6,
  );
}

{
  const k = 'hp_c2_cass';
  const f: Face = {
    skin: '#e8b895', shade: '#b47c62', rim: '#ffb060', iris: '#4a6a80', lid: 85.6, low: 94.5,
    inFace: C(76, 106, 9, '#f08a7a', 'opacity=".3"') + C(124, 106, 9, '#c85a5a', 'opacity=".25"'),
    brows: 'M77.500 80.500Q85 74 95 74.500M105 74.500Q115 74 122.500 80.500', browC: '#6a5236',
    mouth: `<path d="M85.500 112.500Q100 117 114.500 112.500Q112 123 100 123Q88 123 85.500 112.500Z" fill="#fff" stroke="#7a3a34" stroke-width="1.600"/><path d="M88 117.500Q100 121 112 117.500" stroke="#7a3a34" stroke-width=".8" opacity=".5"/>`,
    hair:
      P('M65 86C58 44 84 30 104 31C126 32 142 50 135 86L130 68L124 80L117 60L108 76L99 57L90 76L83 62L76 80L70 70Z', '#eadfb4') + P('M74 50Q100 26 130 50Q116 40 101 40Q84 40 74 50Z', '#4a3826', 'opacity=".7"') +
      // sunglasses pushed up
      `<g stroke="#e8562a" stroke-width="2.400" fill="#3a1c3a" fill-opacity=".85">${C(84, 50, 11, '')}${C(116, 50, 11, '')}</g>`.replace(/ fill=""/g, '') + S('M95 49h10', '#e8562a', 2.4) + S('M78 46l6-4M110 46l6-4', '#fff', 2, 'opacity=".7"'),
  };
  const Y = '#ffd21a', YD = '#b98a0c';
  const r = rng(21);
  const gl: number[][] = [[74, 100], [79, 106], [71, 108], [126, 101], [121, 107], [128, 108]], gp: number[][] = [];
  for (let i = 0; i < 18; i++) (i % 3 ? gl : gp).push([r0(58 + r() * 84), r0(150 + r() * 44)]);
  const body =
    P('M58 96C50 44 82 26 102 26C132 26 150 48 142 98L147 132L137 125L133 138L124 126H76L67 138L63 125L53 132Z', '#eadfb4') + P('M110 28C142 36 148 70 142 98L147 132L137 125L133 138L124 126H112Z', '#b9a878') +
    fLegs(f) + torso(k, f, femDet(f.shade), 0, true) +
    P(BOT, Y) + P('M103 312L144 302L103 356Z', '#000', 'opacity=".18"') + P(TRI, Y) + P('M120 186L102 224Q116 233 133 226Z', '#000', 'opacity=".15"') + S('M72 222L80 194M60 304Q80 314 96 318', '#fff8c0', 2, 'opacity=".8"') +
    strings(YD) + bows(YD) + ring(100, 287, 3) + C(100, 291, 1.8, '#9af0ff') + S('M60 284Q100 300 140 284', '#e9c66a', 1.4) + dots([[80, 291], [100, 295], [120, 291]], '#9af0ff', 3) +
    star(60, 370, 5, '#e8562a') + ring(60, 370, 8, '#e8562a', 1.2) + head(k, f) + ring(107, 107, 2.6) + dots([[65, 98], [64, 90], [66, 83], [135, 98], [136, 90]], '#e9c66a', 2.6) + cans('#f2701c', '#a84a10') + dots(gl, '#fff6c0', 3) + dots(gp, '#ff9ad0', 3) + star(64, 172, 5, '#fff') + star(132, 164, 4, '#fff') + star(88, 184, 3.5, '#fff') +
    // beer arm
    arm(f.skin, 20, [51, 178, 16, 160, 20, 102]) + `<g transform="rotate(-8 20 82)">${R(8, 60, 26, 42, '#d8dce0', 'rx="4"')}${R(8, 70, 26, 22, '#c0202c')}${tx(21, 85, 8, 'LAGR', '#fff', `${MID} ${BOLD} ${fit(20)}`)}${E(21, 61, 11, 3, '#9aa2a8')}</g>` +
    S('M9 96h22M9 104h21', f.skin, 6) + S('M12 134h12', '#ff5a9a', 4) +
    arm(f.shade, 19, [149, 178, 184, 232, 156, 290]) + S('M149 178L184 232', f.rim, 3, 'opacity=".8" transform="translate(9 -4)"');
  const goose =
    `<g transform="translate(470 250) rotate(-8)">` +
    P('M-10 10Q-80 -90 -30 -170Q-20 -100 30 -30Z', '#f4f1ea') + P('M40 0Q120 -110 150 -170Q150 -80 80 20Z', '#dcd6ca') + S('M-28 -130q10 40 28 66M120 -134q-8 50-38 100', '#b8b0a2', 2) +
    E(40, 30, 62, 44, '#f4f1ea') + P('M60 20Q110 30 96 64Q70 80 40 72Z', '#dcd6ca') +
    S('M-6 20Q-60 30 -84 -6Q-96 -24 -110 -20', '#f4f1ea', 26) + C(-112, -22, 20, '#f4f1ea') +
    P('M-124 -32L-170 -24L-128 -16Z', '#f08a2a') + P('M-126 -12L-164 6L-118 -2Z', '#e0701a') + P('M-128 -18L-152 -12L-126 -10Z', '#ff8a9a') +
    C(-112, -28, 5, '#16161c') + C(-113, -29, 1.5, '#fff') + S('M-122 -40L-102 -34', '#16161c', 3.5) +
    S('M20 66L-10 100M52 72L40 110', '#f08a2a', 6) + P('M-10 100l-18 -4l4 14l-10 4l22 4ZM40 110l-16 4l8 10l-8 8l22 -6Z', '#f08a2a') + '</g>' +
    P('M388 330q10-14 22-4q-10 12-22 4ZM540 380q14-8 22 4q-14 8-22-4Z', '#fff');
  let crowd = '';
  for (let i = 0; i < 15; i++) { const x = r0(r() * 600), h = r0(18 + r() * 16); crowd += `M${x - 7} 452v-${h}a7 9 0 0 1 14 0v${h}Z`; }
  A[k] = frame(
    k,
    lg(`${k}s`, [[0, '#4a8ad0'], [0.6, '#ffc890'], [1, '#ffe8b0']]) + lg(`${k}l`, [[0, '#3aa0b8'], [1, '#1a5a7a']]) + lg(`${k}g`, [[0, '#7aa84a'], [1, '#2c5a2a']]) + rg(`${k}u`, [[0, '#fff2c0', 0.9], [1, '#fff2c0', 0]]),
    R(0, 0, 600, 420, `url(#${k}s)`) + C(90, 250, 220, `url(#${k}u)`) + P('M0 360Q120 300 260 350Q400 300 600 340V420H0Z', '#5a7a8a') + R(0, 396, 600, 70, `url(#${k}l)`) +
      R(0, 452, 600, 348, `url(#${k}g)`) +
      // stage + tents + bunting
      R(20, 286, 190, 150, '#1c1426') + P('M10 286L115 236L220 286Z', '#2a1e3a') + R(40, 310, 150, 90, '#ff5a9a', 'opacity=".5"') +
      tx(115, 366, 20, 'RIVERBEND', '#fff', `${MID} ${BOLD} ${fit(120)}`) + P('M470 452L520 380L570 452Z', '#f2701c') + P('M520 380L570 452H540Z', '#a84a10') +
      P(crowd, '#3a2440') + S('M0 60Q150 130 300 70Q450 20 600 80', '#3a2a2a', 2) +
      [[40, 86], [110, 108], [190, 106], [270, 82], [350, 60], [430, 50], [510, 60], [580, 76]].map(([x, y], i) => P(`M${x - 14} ${y - 4}L${x + 14} ${y - 6}L${x + 2} ${y + 30}Z`, ['#ff5a9a', '#F2C318', '#6ae0c0', '#f2701c'][i % 4])).join('') +
      goose + E(300, 800, 200, 30, '#000', 'opacity=".25"') + fig(270, 290, 1.9, body, 3) +
      cap(738, 'rate my fest fit. ignore the goose'),
    0.14, 0.4,
  );
}

// ════════════════════════════════════════════════════════════════ CASE 3
{
  const k = 'hp_c3_marcus';
  const f: Face = {
    skin: '#b57a52', shade: '#7c4d34', rim: '#c8d0ff', iris: '#2a1810',
    inFace: P('M66 96C70 118 84 112 100 111C116 112 130 118 134 96V134H66Z', '#2a1a12', 'opacity=".3"'),
    brows: 'M77.500 78Q86 73 95 77M105 79Q114 76 122.500 79.500', browC: '#1c1410',
    mouth: `<path d="M89 114Q100 121 111 113" stroke="#6e3530" stroke-width="2.300"/><path d="M111 111q2 2 1 4" stroke="#6e3530" stroke-width="1.200"/>`,
    hair: beanie('#b5532a', '#c9653a', '#8f3f1e'),
    top: `<g fill="#e8f0ff" fill-opacity=".5" stroke="#16130f" stroke-width="2.200">${C(87, 91, 10.5, '')}${C(113, 91, 10.5, '')}<path d="M97.500 90Q100 88 102.500 90M76.500 89L67 87M123.500 89L133 87" fill="none"/></g>`.replace(/ fill=""/g, '') + P('M80 96a8 8 0 0 1 6-12M106 96a8 8 0 0 1 6-12', 'none', 'stroke="#fff" stroke-width="2" opacity=".7"'),
  };
  const r = rng(31);
  let drops = '';
  for (let i = 0; i < 16; i++) { const x = r0(52 + r() * 96), y = r0(160 + r() * 130); drops += P(`M${x} ${y}q4 7 0 9q-4-2 0-9Z`, '#dff0ff', 'opacity=".75"'); }
  const body =
    torso(k, f, chest(f.shade, 284) + S('M100 214V276M86 240Q93 244 100 240Q107 244 114 240M62 292L78 318M138 292L122 318', f.shade, 1.7, 'opacity=".5"') + drops, 1) +
    P('M50 300Q100 318 150 298L164 440H36Z', '#f4f1ea') + P('M106 308Q130 306 150 298L164 440H112Z', '#000', 'opacity=".16"') +
    P('M50 300Q100 318 150 298V310Q100 330 50 312Z', '#fff') + P('M56 302q-14 6-10 30q10 16 22 2q4-20-12-32Z', '#fff') + P('M52 322q8 60 0 110h18q6-60-6-108Z', '#e4dfd4') +
    S('M80 330Q84 390 78 440M110 326Q116 390 112 440M136 320Q144 380 142 440', '#c8c2b4', 2) +
    arm(f.skin, 23, [47, 180, 8, 146, 16, 66], false) + S('M112 190h6l3-6l4 12l4-9l3 3h8', '#2a1a3a', 1.6) + S('M10 96h12M9 102h13', '#2a1a3a', 1.6) + head(k, f) + ring(134, 104, 3, '#c8d0ff') +
    S('M70 150Q100 184 130 150', '#15171c', 7) + R(56, 134, 24, 36, '#1b1d24', 'rx="10"') + R(59, 138, 9, 28, '#3a3e4a', 'rx="4"') + R(120, 134, 24, 36, '#111318', 'rx="10"') + R(132, 138, 9, 28, '#c8d0ff', 'rx="4" opacity=".45"') +
    arm(f.shade, 22, [153, 180, 190, 238, 154, 296]) + S('M153 180L190 238', f.rim, 2.5, 'opacity=".6" transform="translate(10 -4)"');
  let rays = '';
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; rays += `M${r0(150 + Math.cos(a) * 70)} ${r0(100 + Math.sin(a) * 70)}L${r0(150 + Math.cos(a) * 190)} ${r0(100 + Math.sin(a) * 190)}`; }
  A[k] = frame(
    k,
    lg(`${k}w`, [[0, '#6a6fc0'], [1, '#1a1b40']]) + rg(`${k}g`, [[0, '#ffe9a0', 0.75], [1, '#ffe9a0', 0]]) + lg(`${k}m`, [[0, '#23264a'], [1, '#0c0d1c']], 1, 0) + bl(`${k}b`, 18),
    R(0, 0, 600, 800, `url(#${k}w)`) +
      // window with blinds + light bars
      R(380, 60, 200, 260, '#ffe9c0') + `<path d="M380 80H580M380 110H580M380 140H580M380 170H580M380 200H580M380 230H580M380 260H580M380 290H580" stroke="#8a7a9a" stroke-width="13"/>` + R(372, 52, 216, 276, 'none', 'stroke="#2a2c5a" stroke-width="10"') +
      `<g fill="#ffe9c0" opacity=".1"><path d="M0 420L600 300V330L0 450ZM0 480L600 360V390L0 510ZM0 540L600 420V450L0 570ZM0 600L600 480V510L0 630Z"/></g>` +
      // shelf: mic, cactus, ON AIR
      R(360, 420, 240, 12, '#2a2c5a') + R(470, 360, 24, 60, '#16171c', 'rx="10"') + R(466, 350, 32, 34, '#3a3e4a', 'rx="12"') + S('M482 420V440M482 384Q540 380 560 420', '#16171c', 5) +
      R(396, 384, 44, 36, '#c9653a') + P('M408 384V350q0-12 10-12t10 12v34Z', '#3a8a52') + R(520, 388, 66, 30, '#2a0c0c', 'rx="4"') + tx(553, 409, 15, 'ON AIR', '#7a3a3a', `${MID} ${BOLD} ${fit(52)}`) +
      // trophy glow
      C(150, 100, 210, `url(#${k}g)`) + S(rays, '#ffe9a0', 5, 'opacity=".25"') +
      fig(310, 296, 1.9, body) +
      // the mug
      `<g transform="rotate(-6 150 100)">${S('M196 80q34 0 30 28q-4 22-32 20', '#23264a', 12)}${R(100, 52, 100, 96, `url(#${k}m)`, 'rx="10"')}${E(150, 54, 50, 9, '#3a3e6a')}${E(150, 55, 42, 6, '#4a2c1c')}` +
      tx(150, 86, 16, 'THE', '#f4f1ea', `${MID} ${BOLD} ${fit(40)}`) + tx(150, 107, 19, 'LONG', '#f4f1ea', `${MID} ${BOLD} ${fit(64)}`) + tx(150, 128, 19, 'QUIET', '#f4f1ea', `${MID} ${BOLD} ${fit(70)}`) +
      S('M116 138h8l5-6l7 10l6-8l5 4h8l5-6l6 8l5-2h6', '#c8d0ff', 2) + S('M108 62V136', '#fff', 4, 'opacity=".2"') + '</g>' +
      C(152, 160, 22, f.skin) + S('M118 146h60M122 158h56', f.skin, 11) +
      S('M132 40q-10-14 0-24q10-10 0-22M166 38q-8-12 2-22', '#fff', 4, 'opacity=".35"') + star(232, 44, 18, '#fff') + star(76, 70, 12, '#fff') + star(226, 150, 9, '#fff', 0.8) +
      `<g filter="url(#${k}b)" fill="#fff" opacity=".22">${E(60, 640, 120, 60, '')}${E(520, 700, 130, 70, '')}${E(300, 780, 200, 40, '')}</g>`.replace(/ fill=""/g, '') +
      cap(736, 'new merch drop') + E(418, 759, 9, 11, '#fff') + E(442, 759, 9, 11, '#fff') + C(414, 761, 4.5, '#16161c') + C(438, 761, 4.5, '#16161c'),
  );
}

// ════════════════════════════════════════════════════════════════ CASE 4
{
  const k = 'hp_c4_kessler';
  const f: Face = {
    skin: '#cf8c5a', shade: '#9a5c34', rim: '#9af0e8', iris: '#5a7a8a', noEyes: true,
    post: P('M68 96L71 119Q76 130 90 132H100V118Z', '#cf8c5a') + P('M132 96L129 119Q124 130 110 132H100V118Z', '#9a5c34', 'opacity=".85"') + P('M65 80L63 104Q69 98 70 84ZM135 80L137 104Q131 98 130 84Z', '#c2c7cf'),
    brows: 'M77.500 77Q86 73.500 95 77.500M105 77.500Q114 73.500 122.500 77', browC: '#a8acb4',
    mouth: `<path d="M85.500 112.500Q100 117 114.500 112.500Q112 123 100 123Q88 123 85.500 112.500Z" fill="#fff" stroke="#7a3c2c" stroke-width="1.600"/><path d="M88 117.500Q100 121 112 117.500" stroke="#7a3c2c" stroke-width=".8" opacity=".5"/>`,
    lines: `<path d="M82 106Q78 113 81 121M118 106Q122 113 119 121" stroke="#8a5030" stroke-width="1.200" opacity=".7"/>`,
    hair: P('M64 86C57 42 84 27 106 28C130 29 145 48 136 86C135 66 127 52 111 47C92 42 71 58 64 86Z', '#d6dae0') + S('M72 60Q88 38 116 36M78 66Q92 46 120 44M86 70Q98 54 124 54', '#8d939c', 2) + P('M112 30C132 36 142 54 136 86C135 66 127 52 111 47Z', '#000', 'opacity=".2"'),
    top:
      `<g stroke="#e9c66a" stroke-width="1.800" fill="url(#${k}av)"><path d="M75 84H97Q99 101 87 102Q75 101 75 84Z"/><path d="M103 84H125Q125 101 113 102Q101 101 103 84Z"/></g>` +
      S('M97 86Q100 83 103 86M75 86L66 84M125 86L134 84', '#e9c66a', 1.8) + S('M79 88l10 10M83 87l7 7M107 88l10 10', '#fff', 1.6, 'opacity=".55"') + C(92, 90, 1.5, '#ffd27a') + C(120, 90, 1.5, '#ffd27a'),
  };
  const r = rng(41);
  let stars = '';
  for (let i = 0; i < 46; i++) stars += `M${r0(r() * 600)} ${r0(r() * 260)}h.01`;
  const body =
    torso(k, f, chest(f.shade) + fuzz(42, 44, 58, 172, 84, 70, '#e4e8ee', 0.55)) +
    arm(f.skin, 25, [46, 182, -6, 188, -48, 178]) + S('M22 174l5 10l5-10l5 10l-2 10l-5-10l-5 10l-5-10Z', '#1c2a3a', 1.8) + head(k, f) +
    S('M82 150Q100 200 118 150', '#e9c66a', 2.4) + C(100, 178, 7, '#e9c66a') + C(100, 178, 4.5, 'none', 'stroke="#a8842a" stroke-width="1"') +
    arm(f.shade, 24, [154, 182, 198, 198, 206, 142]) + S('M154 182L198 198', f.rim, 2.5, 'opacity=".5" transform="translate(4 -11)"');
  A[k] = frame(
    k,
    lg(`${k}s`, [[0, '#060c22'], [1, '#22346a']]) + lg(`${k}wa`, [[0, '#3ae0d0'], [1, '#0a3a5c']]) + lg(`${k}wd`, [[0, '#8a5a34'], [1, '#4a2c18']]) + lg(`${k}av`, [[0, '#0c1c2c'], [1, '#5a8a9a']]) +
      rg(`${k}g`, [[0, '#ffd27a', 0.8], [1, '#ffd27a', 0]]) + rg(`${k}u`, [[0, '#bafff4', 0.7], [1, '#bafff4', 0]]) + bl(`${k}b`, 20) + lg(`${k}ch`, [[0, '#ffe9a0'], [1, '#e0a83a']]),
    R(0, 0, 600, 800, `url(#${k}s)`) + S(stars, '#fff', 2.4, 'opacity=".8"') + C(96, 96, 30, '#f4f0dc') + C(108, 88, 27, '#0a1230') +
      P('M0 330L90 250L160 300L260 220L360 300L450 240L600 320V480H0Z', '#16224a') + P('M260 220l-30 26l24-6l14 12l14-10l22 6Z', '#e8eef8', 'opacity=".7"') +
      [40, 150, 520].map((x, i) => P(`M${x} ${350 - i * 6}l-36 70h20l-30 56h92l-30-56h20Z`, '#0a1626') + P(`M${x} ${350 - i * 6}l-20 40q20-12 40 0Z`, '#dfe8f4', 'opacity=".8"')).join('') +
      R(0, 420, 600, 60, '#cfdcf0') + R(250, 384, 120, 40, '#2a1c14') + R(266, 398, 84, 16, '#ffd27a') + P('M240 388L310 350L380 388Z', '#e8eef8') +
      // string lights
      S('M-10 40Q150 110 300 50Q450 0 610 70', '#1a1a1a', 2) + [[40, 62], [130, 82], [220, 72], [320, 46], [420, 32], [530, 46]].map(([x, y]) => C(x, y + 6, 26, `url(#${k}g)`) + C(x, y + 6, 6, '#ffe9a0')).join('') +
      // tub back rim + water
      P('M-20 446Q300 380 620 446V520Q300 456 -20 520Z', `url(#${k}wd)`) + `<path d="M60 432V504M160 418V488M440 418V488M540 432V504" stroke="#2a1608" stroke-width="2" opacity=".6"/>` + S('M-20 446Q300 380 620 446', '#b88a5a', 4) +
      P('M-20 512Q300 450 620 512V800H-20Z', `url(#${k}wa)`) +
      // bucket + bottle on the rim
      `<g transform="translate(60 412)">${P('M-34 -40H34L26 26H-26Z', '#c8ccd4')}${P('M4 -40H34L26 26H6Z', '#8a9098')}${P('M-8 -40L4 -120h10l8 80Z', '#1c3a24')}${R(2, -134, 14, 18, '#e9c66a')}${P('M-30 -40l10-12l10 10l12-12l12 12l10-8l8 10Z', '#e8f4ff')}</g>` +
      fig(300, 336, 2, body) +
      // champagne flute
      `<g transform="translate(512 356) rotate(10)">${S('M0 0V-56', '#fff', 3, 'opacity=".8"')}${P('M-15 -150Q-18 -74 0 -56Q18 -74 15 -150Z', '#fff', 'opacity=".2"')}${P('M-15 -128Q-16 -74 0 -57Q16 -74 15 -128Z', `url(#${k}ch)`)}${dots([[-4, -100], [5, -84], [2, -116], [-3, -142], [8, -150]], '#fff', 4)}${S('M-9 -144V-90', '#fff', 2.4, 'opacity=".7"')}${S('M-12 -12h22M-12 -2h22M-11 8h20', f.shade, 10)}</g>` +
      // water over the body
      C(300, 720, 300, `url(#${k}u)`) + P('M-20 556Q80 540 180 556T380 556T620 556V800H-20Z', `url(#${k}wa)`, 'opacity=".9"') +
      S('M170 560Q300 540 430 560M150 584Q300 566 450 584M40 630q60-12 120 0M420 650q60-12 130 0M200 700q100-14 200 0', '#fff', 3, 'opacity=".4"') +
      [[190, 566], [414, 572], [300, 590], [250, 640], [120, 700], [500, 720]].map(([x, y], i) => C(x, y, 5 + (i % 3) * 2, 'none', 'stroke="#fff" stroke-width="1.600" opacity=".6"')).join('') + petals(43, 7, 30, 600, 540, 130, '#e8203c') + petals(44, 6, 30, 600, 540, 130, '#b01030') +
      `<g filter="url(#${k}b)" fill="#fff" opacity=".28">${E(110, 560, 130, 50, '')}${E(480, 520, 120, 60, '')}${E(300, 660, 220, 50, '')}${E(200, 300, 80, 110, '')}</g>`.replace(/ fill=""/g, '') +
      tx(302, 762, 30, '#alphalife #valentines', '#000', `${MID} ${BOLD} ${fit(480)} opacity=".6"`) + tx(300, 760, 30, '#alphalife #valentines', '#fff', `${MID} ${BOLD} ${fit(480)}`),
  );
}

{
  const k = 'hp_c4_mags';
  const f: Face = {
    skin: '#8a5636', shade: '#5c3622', rim: '#ffb040', iris: '#2a1810', lid: 88.2, low: 94.5,
    lines: `<path d="M79 87l-6-3M121 87l6-3" stroke="#1a1318" stroke-width="1.800"/>`,
    brows: 'M77.500 80L95 81.500M105 80.500L122.500 78', browC: '#1c1210',
    mouth: `<path d="M89 114Q100 121 111.500 112.500Q100 116 89 114Z" fill="#a8243c" stroke="#7a1a2c" stroke-width="1.800"/><path d="M111.500 110.500q2 2 1 4.500" stroke="#4a2020" stroke-width="1.300"/>`,
    hair:
      P('M64 84C58 50 82 36 100 36C118 36 142 50 136 84C132 70 120 60 100 60C80 60 68 70 64 84Z', '#1c1412') +
      // goggles pushed up
      P('M60 62Q100 40 140 62V74Q100 52 60 74Z', '#cfe82e') + P('M70 44Q100 28 130 44Q136 56 130 62Q100 48 70 62Q64 56 70 44Z', '#16181c') + P('M75 46Q100 34 125 46Q128 54 125 57Q100 46 75 57Q72 54 75 46Z', `url(#${k}gl)`) +
      S('M82 44Q96 38 108 40', '#fff', 2.5, 'opacity=".7"') + dots([[66, 110], [65, 102], [66, 94], [134, 110], [135, 102]], '#f3c64a', 3) + ring(107, 107, 2.8, '#f3c64a'),
  };
  const W = '#9a1a3a', WD = '#5c0c20', WL = '#e86a8a';
  const lace = (d: string): string => P(d, `url(#${k}lc)`);
  const CUP = 'M59 214Q62 205 70 207Q78 202 86 209Q94 210 99 225Q84 241 64 231ZM141 214Q138 205 130 207Q122 202 114 209Q106 210 101 225Q116 241 136 231Z';
  const BT = 'M58 300Q100 326 142 300L103 356H97Z';
  const body =
    `<g fill="#1c1412">${C(72, 50, 17, '')}${C(92, 34, 19, '')}${C(114, 34, 19, '')}${C(131, 52, 16, '')}${C(100, 20, 15, '')}</g>`.replace(/ fill=""/g, '') +
    fLegs(f) + torso(k, f, femDet(f.shade), 0, true) +
    // lace set: high-cut brief with strappy sides, plunge demi bra
    P(BT, W) + lace(BT) + P('M103 312L142 300L103 356Z', '#000', 'opacity=".22"') + S('M58 300Q100 326 142 300', WL, 2.6, 'stroke-dasharray="1 5"') + S('M58 300L43 290M58 302L42 302M142 300L157 290M142 302L158 302', W, 2.4) + P('M96 316l4 5l4-5l-1 8h-6Z', WL) +
    S('M62 208L78 150M138 208L122 150M64 231L52 222M136 231L148 222M99 225h2', W, 2.6) + P(CUP, W) + lace(CUP) + P('M141 214Q138 205 130 207Q122 202 114 209Q106 210 101 225Q116 241 136 231Z', '#000', 'opacity=".2"') +
    S('M59 214Q62 205 70 207Q78 202 86 209Q94 210 99 225M141 214Q138 205 130 207Q122 202 114 209Q106 210 101 225', WL, 1.6, 'opacity=".9"') + P('M96 224l4 5l4-5l-1 8h-6Z', WL) +
    S('M90 152Q100 172 110 152', '#f3c64a', 1.6) + C(100, 165, 2.6, '#f3c64a') + S('M64 262Q100 276 136 262', '#f3c64a', 1.3) + C(100, 270, 2.4, '#f3c64a') +
    arm(f.skin, 20, [51, 178, 18, 234, 50, 290]) + S('M40 196l-7 12h14ZM40 190l-5 9h10ZM40 208v5M52 300l5-10l4 6l4-8l5 12', '#1c1008', 1.5) + head(k, f) +
    arm(f.shade, 19, [149, 178, 180, 204, 160, 150]) + S('M149 178L180 204', f.rim, 3, 'opacity=".8" transform="translate(6 -9)"') + phone(156, 128, 6, f.shade);
  A[k] = frame(
    k,
    lg(`${k}w`, [[0, '#b0783e'], [1, '#4a2a14']]) + pat(`${k}p`, 75, 800, `<path d="M0 0V800" stroke="#2a1608" stroke-width="3" opacity=".5"/><ellipse cx="40" cy="230" rx="7" ry="11" fill="#5a3418" opacity=".6"/><ellipse cx="24" cy="610" rx="6" ry="9" fill="#5a3418" opacity=".6"/>`) +
      pat(`${k}lc`, 9, 9, `<circle cx="4.500" cy="4.500" r="2.200" fill="none" stroke="${WL}" stroke-width=".9" opacity=".7"/><circle cx="0" cy="0" r="1" fill="${WD}"/><circle cx="9" cy="9" r="1" fill="${WD}"/><circle cx="9" cy="0" r="1" fill="${WD}"/><circle cx="0" cy="9" r="1" fill="${WD}"/>`) +
      lg(`${k}gl`, [[0, '#ff8a2a'], [0.5, '#ff4a8a'], [1, '#6a4aff']], 1, 0) + rg(`${k}g`, [[0, '#ffdc9a', 0.8], [1, '#ffdc9a', 0]]) + bl(`${k}b`, 14),
    R(0, 0, 600, 800, `url(#${k}w)`) + R(0, 0, 600, 800, `url(#${k}p)`) + C(300, 0, 330, `url(#${k}g)`) + R(240, 0, 120, 20, '#f4ecd8', 'rx="8"') +
      // the moose
      `<g transform="translate(120 250)">${P('M-70 -10Q-80 90 0 110Q80 90 70 -10Q40 -40 0 -40Q-40 -40 -70 -10Z', '#5a3a1c')}` +
      P('M-40 -70Q-90 -90 -112 -150Q-90 -130 -78 -134Q-92 -160 -84 -186Q-66 -150 -52 -146Q-56 -170 -44 -190Q-30 -130 -18 -76ZM40 -70Q90 -90 112 -150Q90 -130 78 -134Q92 -160 84 -186Q66 -150 52 -146Q56 -170 44 -190Q30 -130 18 -76Z', '#d8c8a0') +
      P('M-34 -70Q-40 0 -30 60Q-28 120 0 126Q28 120 30 60Q40 0 34 -70Q0 -92 -34 -70Z', '#7a5230') + P('M0 -84Q34 -70 34 -70Q40 0 30 60Q28 120 0 126Z', '#000', 'opacity=".2"') +
      P('M-34 -62L-66 -80L-42 -40ZM34 -62L66 -80L42 -40Z', '#6a4424') + E(0, 96, 28, 24, '#4a2e18') + E(-11, 98, 5, 7, '#1c100a') + E(11, 98, 5, 7, '#1c100a') +
      C(-20, -18, 8, '#f4f0e4') + C(20, -18, 8, '#f4f0e4') + C(-17, -15, 4, '#16161c') + C(23, -15, 4, '#16161c') + S('M-30 -34L-12 -28M30 -34L12 -28', '#3a2410', 3) + '</g>' +
      // her trapper hat on the antler, hi-vis on a hook
      `<g transform="translate(196 76) rotate(18)">${P('M-30 20C-34 -20 34 -20 30 20Z', '#5a4a36')}${P('M-34 22Q0 8 34 22V34Q0 20 -34 34Z', '#e8dcc0')}${P('M-34 28L-38 64Q-32 70 -26 66L-24 34ZM34 28L38 64Q32 70 26 66L24 34Z', '#e8dcc0')}</g>` +
      C(520, 190, 7, '#c8ccd0') + P('M486 196q34-14 68 0l10 190h-88Z', '#cfe82e') + P('M520 196v190h44l-10-190Z', '#000', 'opacity=".2"') + R(476, 300, 88, 12, '#f08a1c') + S('M500 196l-6 190M540 196l6 190', '#e8eef4', 7) +
      R(440, 470, 160, 10, '#3a2412') + R(470, 480, 100, 150, '#e8e4dc', 'rx="4"') + R(470, 530, 100, 12, '#c0202c') +
      fig(296, 290, 1.9, body, -3) +
      C(404, 286, 50, '#fff', `opacity=".5" filter="url(#${k}b)"`) + star(404, 286, 30, '#fff', 0.95) +
      // sink + mirror grime
      P('M0 760Q300 730 600 760V800H0Z', '#f1ede4') + R(60, 716, 34, 50, '#6ac0e0', 'rx="5" opacity=".9"') + S('M70 716l-8-44M84 716l10-40', '#ff5a9a', 5) + R(500, 730, 60, 34, '#c8ccd0', 'rx="10"') +
      S('M30 640L250 40M100 780L340 160', '#fff', 28, 'opacity=".05"') + `<g fill="#fff" opacity=".5">${C(520, 660, 3, '')}${C(534, 672, 2, '')}${C(64, 420, 2.5, '')}${C(50, 436, 2, '')}</g>`.replace(/ fill=""/g, '') +
      R(0, 0, 600, 800, 'none', 'stroke="#1c1008" stroke-width="18"'),
  );
}

// ════════════════════════════════════════════════════════════════ CASE 5
{
  const k = 'hp_c5_owen';
  const f: Face = {
    skin: '#e6bc98', shade: '#a87c60', rim: '#ff5a4a', iris: '#5a4028', lid: 86.8, low: 94,
    inFace: P('M65 92C68 106 78 104 88 106Q100 102 112 106C122 104 132 106 135 92V134H65Z', '#6e4a2e') + P('M110 104C122 104 132 106 135 92V134H104Z', '#000', 'opacity=".2"'),
    brows: 'M77.500 80.500Q86 75.500 95 78.500M105 76Q114 71 122.500 76', browC: '#5a3c24',
    mouth: `<path d="M88 109Q100 104 112 109Q100 113 88 109Z" fill="#6e4a2e" stroke="#5a3c24" stroke-width="2"/><path d="M90 114.500Q100 121.500 110 114.500" stroke="#f3e6da" stroke-width="2.600"/>`,
    hair: P('M64 88C58 46 84 34 100 34C118 34 142 46 136 88C133 70 126 58 110 54C98 62 76 64 64 88Z', '#6e4a2e') + S('M70 64Q80 46 98 42M108 52Q122 56 129 70', '#a37a52', 2),
    top: `<g fill="#fff1d0" fill-opacity=".14" stroke="#8a5424" stroke-width="2.600">${C(87, 91, 11, '')}${C(113, 91, 11, '')}<path d="M98 90Q100 88 102 90M76 89L67 86M124 89L133 86" fill="none"/></g>`.replace(/ fill=""/g, '') + P('M108 84h8l-6 11h-4z', '#fff', 'opacity=".35"'),
  };
  const CO = '#ece8de', CD = '#bdb7aa';
  const body =
    torso(k, f, chest(f.shade) + fuzz(52, 26, 76, 186, 48, 36, '#6e4a2e', 0.4) + S('M100 216V280M86 240Q93 244 100 240Q107 244 114 240', f.shade, 1.6, 'opacity=".45"'), 2) +
    P('M52 318H148L154 440H46Z', '#2a2420') + R(52, 312, 96, 12, '#16110e') + R(94, 311, 14, 14, '#e0b53a', 'rx="2"') +
    // lab coat, worn open
    P('M82 146C58 149 38 155 32 174L24 440H62Q54 320 62 240Q60 190 82 146Z', CO) + P('M118 146C142 149 162 155 168 174L176 440H138Q146 320 138 240Q140 190 118 146Z', CD) +
    P('M82 146L64 196L76 232L62 240Q60 190 82 146ZM118 146L136 196L124 232L138 240Q140 190 118 146Z', '#fff', 'opacity=".5"') +
    S('M86 148Q92 196 100 214Q108 196 114 148', '#e0b53a', 2.6) + C(100, 216, 5, 'none', 'stroke="#d8d2c0" stroke-width="2"') +
    arm(CO, 26, [40, 182, 2, 238, 42, 296], f.skin) + S('M24 268L40 292', '#fff', 3, 'opacity=".5"') + head(k, f) + ring(66, 106, 3.5) +
    arm(CD, 26, [160, 182, 200, 240, 198, 196], false);
  A[k] = frame(
    k,
    lg(`${k}w`, [[0, '#4a2a2a'], [1, '#160a0c']]) + pat(`${k}p`, 80, 40, `<path d="M0 0H80M0 20H80M0 0V20M40 20V40" stroke="#0c0406" stroke-width="3" fill="none" opacity=".6"/>`) +
      lg(`${k}ky`, [[0, '#ffe9a0'], [0.5, '#e0a83a'], [1, '#8a5a14']], 1, 0) + rg(`${k}r`, [[0, '#ff2a2a', 0.9], [1, '#ff2a2a', 0]]) + rg(`${k}gn`, [[0, '#5aff9a', 0.6], [1, '#5aff9a', 0]]) + bl(`${k}b`, 10),
    R(0, 0, 600, 800, `url(#${k}w)`) + R(0, 0, 600, 800, `url(#${k}p)`) +
      // timer, plaque, shelf of flasks, chains
      R(30, 50, 170, 70, '#0c0c0c', 'rx="6" stroke="#3a3a3a" stroke-width="3"') + tx(115, 102, 46, '03:07', '#ff3a2a', `${MID} ${BOLD} ${fit(140)}`, MONO) +
      R(40, 150, 110, 34, '#c8a85a', 'rx="3"') + tx(95, 174, 20, 'ROOM 3', '#2a1c0c', `${MID} ${BOLD} ${fit(84)}`) +
      R(0, 420, 150, 10, '#2a1a14') + C(50, 370, 80, `url(#${k}gn)`) + P('M34 420Q10 400 36 360V330H56V360Q82 400 58 420Z', '#5aff9a', 'opacity=".7"') + P('M100 420V350h20v70Z', '#9ad0ff', 'opacity=".6"') + S('M30 330H60M96 350H124', '#dff', 3) +
      S('M250 0V120M330 0V170', '#5a5a62', 5, 'stroke-dasharray="10 5"') + R(232, 118, 36, 34, '#c8a02a', 'rx="5"') + S('M240 118v-10q10-12 20 0v10', '#c8ccd0', 5) + R(312, 168, 36, 34, '#8a9098', 'rx="5"') + S('M320 168v-10q10-12 20 0v10', '#c8ccd0', 5) +
      S('M530 0V70', '#222', 3) + C(530, 96, 150, `url(#${k}r)`) + P('M516 70h28v14q10 14 0 30q-14 12-28 0q-10-16 0-30Z', '#ff8a7a') +
      fig(280, 296, 1.9, body) +
      // the giant prop key
      `<g transform="rotate(4 474 420)">${R(462, 190, 26, 590, `url(#${k}ky)`, 'rx="6"')}${C(475, 120, 62, 'none', `stroke="url(#${k}ky)" stroke-width="26"`)}${C(475, 120, 26, 'none', 'stroke="#8a5a14" stroke-width="5"')}${P('M488 640h60v34h-24v20h24v34h-60Z', `url(#${k}ky)`)}${R(458, 196, 34, 16, '#8a5a14', 'rx="4"')}${S('M468 220V620', '#fff', 4, 'opacity=".45"')}</g>` +
      C(466, 420, 26, f.shade) + S('M444 408h46M444 422h48M446 436h44', f.shade, 12) + S('M446 404h40', '#ff8a7a', 2, 'opacity=".5"') +
      // red wash
      R(0, 0, 600, 800, '#e0182a', 'opacity=".42" style="mix-blend-mode:multiply"') + C(560, 120, 520, `url(#${k}r)`, 'opacity=".5" style="mix-blend-mode:screen"') + C(0, 420, 240, `url(#${k}gn)`, 'opacity=".5" style="mix-blend-mode:screen"') +
      star(475, 60, 22, '#fff', 0.9) + star(540, 668, 14, '#fff', 0.8) + cap(730, 'escape THIS'),
    0.18, 0.6,
  );
}

{
  const k = 'hp_c5_nadia';
  const f: Face = {
    skin: '#d9a886', shade: '#996e58', rim: '#ff6a5a', iris: '#3a2618', lid: 88.2, low: 94.6,
    brows: 'M77.500 82Q86 77.500 95 77M105 77Q114 77.500 122.500 82', browC: '#1c1418',
    mouth: `<path d="M90 114Q95 111.500 100 113.500Q105 111.500 110 114Q100 122 90 114Z" fill="#8a1c34" stroke="#5c1022" stroke-width="1.200"/>`,
    lines: `<path d="M79 86.500l-5-2.500M121 86.500l5-2.500" stroke="#1a1318" stroke-width="1.600"/>`,
    hair: P('M62 104C54 44 84 31 100 31C116 31 146 44 138 104C137 76 128 60 104 50C90 62 66 70 62 104Z', '#1c1418') + S('M68 74Q78 48 100 41M108 52Q124 60 131 80', '#4a3844', 2),
    top: C(64, 112, 8, 'none', 'stroke="#dfe4ea" stroke-width="2"') + C(136, 112, 8, 'none', 'stroke="#dfe4ea" stroke-width="2" opacity=".7"'),
  };
  const B = '#16121a', BL = '#6a5a7a', ST = '#5a3a40';
  const body =
    // long hair behind + over one shoulder
    P('M58 100C46 34 86 22 100 22C116 22 154 34 142 100C148 140 158 180 150 226Q138 236 130 220Q134 170 124 130H76Q70 170 60 200Q48 196 50 170C52 140 54 120 58 100Z', '#1c1418') + S('M60 110Q54 150 56 190M142 112Q150 160 144 216', '#463440', 2) +
    arm(f.skin, 21, [51, 178, 16, 132, 56, 78], false) + S('M24 150h.01', '#16121a', 0) +
    // sheer robe slipping off both shoulders
    P('M52 184Q14 250 8 352H44Q50 270 62 220ZM148 184Q186 250 194 352H160Q152 270 140 220Z', '#16121a', 'opacity=".5"') + S('M52 184Q14 250 8 352M148 184Q186 250 194 352', BL, 2, 'opacity=".8"') +
    torso(k, f, femDet(f.shade), 0, true) + E(100, 334, 58, 15, f.skin) + P(BOT, B) + S('M56 302L42 294M56 304L42 304M144 302L158 294M144 304L158 304', B, 2.2) + P('M96 316l4 5l4-5l-1 8h-6Z', '#c0202c') +
    // legs swept along the chaise; sheer thigh-highs
    S('M118 352L156 356', f.shade, 44) + S('M156 356L236 362L346 380', '#4a3036', 40) + S('M112 336L152 334', f.skin, 46) + S('M152 334L232 332L340 344', ST, 40) +
    S('M152 312V356', BL, 5, 'stroke-dasharray="2 2"') + S('M158 313L232 311L338 324', f.rim, 3.5, 'opacity=".85"') + S('M108 318L150 314', '#fff', 3, 'opacity=".25"') + S('M132 300L150 314', B, 1.8) +
    // rose tattoo on the thigh, belly ring
    C(126, 334, 6, 'none', 'stroke="#7a1c34" stroke-width="1.600"') + S('M123 334q3-4 6 0q-3 3-2 5M130 340q6 4 4 10', '#7a1c34', 1.4) + ring(100, 286, 3, '#dfe4ea') +
    // strappy plunge top + choker
    S('M80 186L92 152M120 186L108 152M67 226L52 220M133 226L148 220M100 150V226M86 152L100 178L114 152', B, 1.9) + P(TRI, B) + S('M72 222L80 194', BL, 1.8) + ring(100, 178, 3.5, '#dfe4ea') +
    head(k, f) + S('M86 140Q100 148 114 140', B, 5) + C(100, 146, 2.6, '#dfe4ea') + S('M96 110q4 4 8 0', '#dfe4ea', 1.6) +
    P('M124 130Q136 170 132 216Q140 232 150 226C158 180 148 140 142 100Z', '#1c1418') + S('M134 140Q142 180 140 220', '#463440', 2) +
    arm(f.shade, 20, [149, 180, 176, 238, 152, 296]) + S('M149 180L176 238', f.rim, 3, 'opacity=".8" transform="translate(10 -3)"');
  const r = rng(51);
  let pep = '';
  for (let i = 0; i < 9; i++) { const a = 0.5 + r() * 3.4, d = 16 + r() * 34; pep += C(r0(Math.cos(a) * d), r0(Math.sin(a) * d * 0.42), 6, '#b0261c'); }
  A[k] = frame(
    k,
    lg(`${k}w`, [[0, '#3a2438'], [1, '#120a14']]) + lg(`${k}v`, [[0, '#3a8a8e'], [1, '#12383e']]) + rg(`${k}r`, [[0, '#ff3a2a', 0.85], [1, '#ff3a2a', 0]]) + lg(`${k}sh`, [[0, '#ff6a4a'], [1, '#c0202c']]) + bl(`${k}b`, 12),
    R(0, 0, 600, 800, `url(#${k}w)`) + R(0, 690, 600, 110, '#2a1a18') + `<path d="M0 720H600M0 760H600" stroke="#160c0c" stroke-width="2"/>` +
      // wall calendar + curtain
      P('M0 0H70Q50 300 76 690H0Z', '#4a1c2c') + S('M24 0Q14 300 30 690M52 0Q40 300 58 690', '#2a0c18', 3) +
      `<g transform="translate(84 14) rotate(3 300 150)">${R(246, 70, 120, 150, '#f1ede4')}${R(246, 70, 120, 34, '#c0202c')}${tx(306, 95, 20, 'OCTOBER', '#fff', `${MID} ${BOLD} ${fit(92)}`)}<path d="M258 124h96M258 146h96M258 168h96M258 190h96M282 112v100M306 112v100M330 112v100" stroke="#b8b0a2" stroke-width="1.500"/>${C(318, 157, 12, 'none', 'stroke="#c0202c" stroke-width="3"')}${P('M312 157q3-6 6 0q3-6 6 0q-2 6-6 9q-4-3-6-9Z', '#c0202c')}</g>` +
      // red lamp
      C(530, 220, 330, `url(#${k}r)`) + S('M530 270V700', '#16121a', 7) + E(530, 704, 50, 10, '#16121a') + P('M480 270L504 170H556L580 270Z', `url(#${k}sh)`) + E(530, 270, 50, 8, '#ffb09a') +
      // velvet chaise
      P('M40 600Q20 420 80 330Q130 290 170 340Q200 420 196 600Z', `url(#${k}v)`) + S('M70 360Q110 320 156 356', '#4a9a9a', 4, 'opacity=".6"') + `<g fill="#0c2a30">${C(110, 420, 6, '')}${C(80, 490, 6, '')}${C(150, 490, 6, '')}</g>`.replace(/ fill=""/g, '') +
      P('M30 590Q300 560 580 596Q596 640 580 690H30Q14 640 30 590Z', `url(#${k}v)`) + S('M40 596Q300 568 572 600', '#4a9a9a', 4, 'opacity=".6"') + P('M30 664H580L574 700H38Z', '#0a2228') +
      S('M60 700V740M550 700V740', '#8a6a2a', 12) +
      fig(232, 262, 1.75, body, -4) +
      // pizza on the floor
      `<g transform="translate(440 742)">${P('M-110 -30H110L130 40H-130Z', '#b08a5a')}${P('M-110 -30H110L104 -74H-104Z', '#c8a070')}${tx(0, -44, 18, "TONY'S", '#c0202c', `${MID} ${BOLD} ${fit(70)}`)}<g transform="translate(0 8)">${P('M0 0L-66 -8A66 28 0 0 0 0 28A66 28 0 0 0 60 -12Z', '#e8b04a')}${P('M0 0L-58 -7A58 23 0 0 0 0 23A58 23 0 0 0 52 -10Z', '#f2d27a')}${pep}${S('M0 0V26M0 0L-44 18M0 0L44 16', '#c89a3a', 1.5)}</g>${P('M70 -14l34 6l-26 14q-10-8-8-20Z', '#f2d27a')}${C(86, -4, 4, '#b0261c')}</g>` +
      R(0, 0, 600, 800, '#ff2a2a', 'opacity=".16" style="mix-blend-mode:screen"') + C(520, 220, 420, `url(#${k}r)`, 'opacity=".45" style="mix-blend-mode:screen"') +
      cap(26, 'for the anniversary calendar. too much?'),
    0.18, 0.6,
  );
}

// ════════════════════════════════════════════════════════════════ CASE 6
{
  const k = 'hp_c6_hank';
  const TAN = '#d99b78', PALE = '#f6e2d2';
  const f: Face = {
    skin: '#e6bca0', shade: '#a67e68', rim: '#fff6d8', iris: '#5a7a8a', lid: 87.6, low: 93.8,
    inFace: P('M65 98C70 112 80 108 88 107Q100 103 112 107C120 108 130 112 135 98V134H65Z', '#f6f4ee', 'opacity=".55"') + R(60, 30, 80, 56, '#5a3418', 'opacity=".25"'),
    brows: 'M77 82.500Q86 78.500 95 82M105 82Q114 78.500 123 82.500', browC: '#f1eee6',
    mouth:
      `<path d="M89 115Q100 119 111 114" stroke="#7a4a40" stroke-width="2.400"/><path d="M106 115.500L134 124" stroke="#6a4424" stroke-width="7"/><path d="M106 115.500L111 117" stroke="#3a2412" stroke-width="7"/><path d="M118 119.200l2.500.800" stroke="#d9a53a" stroke-width="7.200" stroke-linecap="butt"/>`,
    lines: `<path d="M87 105Q83.500 111 86 118M113.500 105Q117 111 114.500 118M74 87q-4 1-6 4M126 87q4 1 6 4" stroke="#8a5f4c" stroke-width="1.200" opacity=".6"/><path d="M100 96v10" stroke="#fff" stroke-width="6" opacity=".9"/>`,
    top:
      E(100, 68, 78, 17, '#c9a85a') + E(100, 65, 78, 16, '#ecd08e') + P('M68 66C64 22 136 22 132 66Q100 76 68 66Z', '#f2dba0') + P('M108 30C130 34 134 50 132 66Q120 70 108 71Z', '#000', 'opacity=".15"') +
      P('M68 52Q100 62 132 52V66Q100 76 68 66Z', '#1a274c') + tx(100, 67, 9, 'NAVY', '#e9c66a', `${MID} ${BOLD} ${fit(26)}`),
  };
  const pal: Face = { ...f, skin: PALE, shade: '#c9a892' };
  const flower = (x: number, y: number): string => dots([[x, y - 5], [x + 5, y - 1], [x + 3, y + 4], [x - 3, y + 4], [x - 5, y - 1]], '#fff', 6) + C(x, y, 2, '#f6cf3a');
  const foot = (x: number, c: string): string =>
    S(`M${x} 470V536`, c, 22) + S(`M${x - 9} 472h18M${x - 9} 479h18`, '#3a3a44', 1.4) + E(x, 546, 21, 10, c) + E(x, 554, 25, 6, '#6a4424') + S(`M${x - 18} 546Q${x} 532 ${x + 18} 546M${x - 8} 538L${x + 6} 554`, '#8a5a34', 5);
  const body =
    S('M76 380L74 452', PALE, 25) + S('M74 452L76 500', PALE, 20) + S('M124 380L126 452', '#d9bca6', 25) + S('M126 452L124 500', '#d9bca6', 20) + C(74, 452, 13, PALE) + C(126, 452, 13, '#d9bca6') +
    foot(76, '#16161c') + foot(124, '#0c0c10') +
    torso(k, pal, P('M84 146L100 190L116 146Z', TAN, 'opacity=".9"') + chest('#c09a84', 286) + fuzz(62, 28, 64, 178, 72, 50, '#fff', 0.4) + S('M58 262Q100 322 142 262', '#c09a84', 2.4, 'opacity=".7"'), 17) +
    // trunks
    P('M44 304Q100 326 156 304L160 394H106L100 372L94 394H40Z', '#e8553a') + P('M106 312Q134 312 156 304L160 394H106Z', '#000', 'opacity=".2"') + flower(62, 340) + flower(84, 368) + flower(120, 336) + flower(142, 366) +
    P('M44 304Q100 326 156 304V314Q100 336 44 314Z', '#f4f1ea') + S('M96 322q-10 12-6 22M104 322q10 12 4 24', '#f4f1ea', 2.4) +
    // dog tags
    S('M84 150Q100 214 116 150', '#c8ccd4', 1.6) + R(94, 196, 12, 18, '#c8ccd4', 'rx="3" transform="rotate(-8 100 205)"') + R(98, 198, 12, 18, '#9aa2aa', 'rx="3" transform="rotate(10 104 207)"') +
    // hands on hips, farmer's tan
    arm(TAN, 22, [44, 184, 4, 246, 44, 304]) + S('M44 184L22 218', PALE, 23) + arm('#b47e60', 22, [156, 184, 196, 246, 156, 304]) + S('M156 184L178 218', '#d9bca6', 23) +
    R(4, 262, 18, 10, '#e9c66a', 'rx="2" transform="rotate(-50 13 267)"') + S('M186 222v16M181 227h10M179 234q7 8 14 0', '#1a3a5a', 1.8) + ring(186, 219, 2.5, '#1a3a5a') + head(k, f);
  A[k] = frame(
    k,
    lg(`${k}s`, [[0, '#3a8ae0'], [1, '#bfe6ff']]) + lg(`${k}wa`, [[0, '#3ad0e8'], [1, '#1a8ac8']]) + lg(`${k}d`, [[0, '#e8dcc4'], [1, '#b8a888']]) + rg(`${k}u`, [[0, '#fff', 0.95], [0.3, '#fff6c0', 0.5], [1, '#fff6c0', 0]]) +
      pat(`${k}f`, 16, 16, `<path d="M0 8L8 0L16 8L8 16Z" fill="none" stroke="#8a9098" stroke-width="1.200"/>`),
    R(0, 0, 600, 360, `url(#${k}s)`) + C(520, 70, 170, `url(#${k}u)`) + E(140, 106, 90, 22, '#fff', 'opacity=".8"') +
      P('M0 250Q60 200 120 240Q190 190 260 240Q340 200 420 244Q500 200 600 250V330H0Z', '#3a7a3a') + R(0, 250, 600, 90, `url(#${k}f)`) + R(0, 248, 600, 5, '#8a9098') +
      // rules sign
      R(24, 196, 150, 112, '#f4f1ea', 'rx="4" stroke="#1a5a9a" stroke-width="4"') + tx(99, 220, 15, 'POOL RULES', '#1a5a9a', `${MID} ${BOLD} ${fit(110)}`) + tx(99, 242, 12, 'NO RUNNING', '#333', `${MID} ${fit(90)}`) + tx(99, 260, 12, 'NO DIVING', '#333', `${MID} ${fit(78)}`) +
      tx(99, 278, 12, 'NO CIGARS', '#c0202c', `${MID} ${BOLD} ${fit(84)}`) + tx(99, 296, 11, '(yes, you, Hank)', '#c0202c', `${MID} ${fit(104)}`) +
      // pool
      R(0, 336, 600, 150, `url(#${k}wa)`) + R(0, 330, 600, 10, '#f4f1ea') + `<path d="M0 380H600M0 430H600" stroke="#fff" stroke-width="5" stroke-dasharray="14 10" opacity=".8"/><path d="M0 380H600M0 430H600" stroke="#e8203c" stroke-width="5" stroke-dasharray="14 34" opacity=".8"/>` +
      // lifeguard, unimpressed
      S('M470 360L486 180M560 360L544 180M476 300H554M482 240H548', '#f4f1ea', 7) + R(478, 170, 74, 12, '#f4f1ea') + P('M440 120Q515 60 590 120Z', '#e8203c') + S('M515 120V176', '#8a9098', 3) +
      C(515, 140, 12, '#c08458') + R(500, 150, 30, 28, '#e8203c', 'rx="6"') + S('M504 160L498 146L510 140', '#c08458', 6) +
      R(0, 486, 600, 314, `url(#${k}d)`) + R(0, 486, 600, 16, '#f4f1ea') + tx(420, 530, 20, 'NO DIVING', '#1a5a9a', `${BOLD} ${fit(120)} opacity=".7"`) +
      S('M0 600H600M0 720H600M200 502V800M430 502V800', '#9a8a6c', 2, 'opacity=".6"') +
      // towel + flip radio
      P('M30 700L150 680L170 760L46 784Z', '#3a8ae0') + S('M52 716L160 696M58 746L166 726', '#fff', 8) +
      E(300, 728, 120, 16, '#000', 'opacity=".3"') + fig(300, 216, 1.2, body) + star(560, 40, 26, '#fff', 0.9),
    0.12, 0.35,
  );
}

// ════════════════════════════════════════════════════════════════ CASE 7
{
  const k = 'hp_c7_sami';
  const f: Face = {
    skin: '#cfa078', shade: '#8e6648', rim: '#ffc06a', iris: '#3a2618', lid: 85.6, low: 94.6,
    inFace: P('M65 96C70 112 80 108 90 110Q100 106 110 110C120 108 130 112 135 96V134H65Z', '#2a1e1c', 'opacity=".42"'),
    brows: 'M77 82.500Q86 77 95.500 76M104.500 74Q114 73 123 78', browC: '#17121a',
    mouth:
      `<path d="M89 112Q100 109 111 112Q100 122 89 112Z" fill="#fff" stroke="#7a3e3a" stroke-width="1.600"/><path d="M70 119Q100 111 134 113" stroke="#2a6a34" stroke-width="2.600"/><path d="M118 113q6-10 14-6q-4 8-14 6Z" fill="#3a8a44" stroke="none"/><path d="M82 116l-3-4M124 113l2 4" stroke="#2a6a34" stroke-width="1.500"/>`,
    lines: `<path d="M81 98Q87 100.500 93 98M107 98Q113 100.500 119 98M95 71q5-2.500 10 0" stroke="#6e4a38" stroke-width="1.200" opacity=".55"/>`,
    hair:
      `<g fill="#17121a">${C(76, 58, 11, '')}${C(91, 49, 12, '')}${C(109, 49, 12, '')}${C(124, 58, 11, '')}${C(69, 72, 7, '')}${C(131, 72, 7, '')}</g>`.replace(/ fill=""/g, '') +
      S('M70 58a9 9 0 0 1 11-8M86 46a9 9 0 0 1 11-6M105 44a9 9 0 0 1 12 1M120 52a9 9 0 0 1 9 8', '#4a3e52', 1.8),
    top: ring(134, 106, 3.5) + C(62, 120, 13, '#c0182c') + C(60, 118, 8, '#e8203c') + S('M56 118q4-6 9 0q-4 5-2 8M52 124q6 8 16 2', '#8a0c1c', 1.6),
  };
  const RB = '#1f6e64', RD = '#0f3e3a', RL = '#5ac8b4';
  const body =
    `<g fill="#17121a">${C(68, 66, 13, '')}${C(132, 66, 13, '')}${C(64, 84, 9, '')}${C(136, 84, 9, '')}${C(80, 46, 14, '')}${C(120, 46, 14, '')}${C(100, 38, 15, '')}</g>`.replace(/ fill=""/g, '') +
    S('M14 126L58 76', f.skin, 19) +
    torso(k, f, chest(f.shade) + fuzz(72, 22, 78, 196, 44, 44, '#17121a', 0.3) + S('M76 180q-9-7-11 2q2 6 11 2q-6 6-3 10q3-3 3-10q0 7 3 10q3-4-3-10q9 4 11-2q-2-9-11-2Z', '#2a1e3a', 1.3), 2) +
    // silk robe, loosely tied
    P('M80 146C56 149 36 156 32 176L22 460H178L168 176C164 156 144 149 120 146L136 208L105 296H95L62 204Z', RB) +
    P('M120 146C144 149 164 156 168 176L178 460H108L105 296L136 208Z', RD, 'opacity=".6"') + S('M80 146L62 204L95 296M120 146L136 208L105 296', RL, 3) +
    S('M44 190Q40 300 36 440M56 320Q60 380 54 450M150 230Q158 330 156 440', RL, 3, 'opacity=".35"') +
    P('M34 290Q100 306 166 290V306Q100 322 34 306Z', RD) + C(98, 302, 9, RD) + S('M94 306Q84 340 88 372M102 306Q112 344 106 380', RD, 7) + S('M34 291Q100 307 166 291', RL, 1.6, 'opacity=".6"') +
    S('M40 184L14 126', RB, 30) + S('M30 190L8 136', RL, 3, 'opacity=".4"') + head(k, f) +
    arm(RD, 28, [160, 184, 190, 246, 162, 300], f.shade) + S('M160 184L190 246', RL, 2.5, 'opacity=".5" transform="translate(11 -5)"');
  const cat =
    `<g transform="translate(486 372)">${E(0, 30, 74, 40, '#4a4650')}${P('M30 20Q80 20 72 54Q40 76 0 70Z', '#000', 'opacity=".2"')}${S('M60 50Q96 56 92 26', '#4a4650', 13)}${C(-30, -8, 36, '#5a5560')}` +
    P('M-62 -22L-66 -62L-38 -40ZM2 -22L6 -62L-22 -40Z', '#5a5560') + P('M-58 -30L-60 -50L-46 -38ZM-2 -30L0 -50L-14 -38Z', '#c88a9a') +
    P('M-52 -8Q-42 -14 -34 -6Q-42 -2 -52 -8ZM-26 -6Q-18 -14 -8 -8Q-18 -2 -26 -6Z', '#e8d04a') + E(-43, -8, 1.6, 3.4, '#16161c') + E(-17, -8, 1.6, 3.4, '#16161c') +
    S('M-56 -18L-34 -11M-4 -18L-26 -11', '#2a2630', 4) + P('M-33 2h6l-3 4Z', '#c88a9a') + S('M-30 6v4q-6 6-10 2M-30 10q6 6 10 2', '#2a2630', 1.6) +
    S('M-44 4l-26-4M-44 9l-24 6M-16 4l24-4M-16 9l22 6', '#dcd6e0', 1.1) + S('M-30 -40v10M-40 -38l2 8M-20 -38l-2 8', '#3a3640', 2.5) + '</g>';
  const pet = petals(71, 8, 330, 520, 260, 200, '#e8203c') + petals(72, 6, 330, 520, 260, 200, '#a8102a');
  const cg = `${k}cg`;
  A[k] = frame(
    k,
    lg(`${k}w`, [[0, '#4a2418'], [1, '#140806']]) + rg(cg, [[0, '#ffc45a', 0.7], [1, '#ffc45a', 0]]) + lg(`${k}sh`, [[0, '#f6ead0'], [0.5, '#d8c49a'], [1, '#a88e64']], 1, 1) + lg(`${k}hb`, [[0, '#5a2a4a'], [1, '#2a1024']]) + bl(`${k}b`, 14),
    R(0, 0, 600, 800, `url(#${k}w)`) +
      // shelf of candles, framed moth print
      R(0, 250, 230, 10, '#2a140c') + candle(cg, 30, 250, 50) + candle(cg, 66, 250, 30, 20) + candle(cg, 104, 250, 64, 13) + candle(cg, 150, 250, 40) + candle(cg, 196, 250, 24, 22) +
      R(60, 60, 110, 110, '#1a0c08', 'stroke="#a8842a" stroke-width="5"') + P('M115 100q-34-26-40 6q4 22 40 10q-20 20-10 34q10-10 10-30q0 20 10 30q10-14-10-34q36 12 40-10q-6-32-40-6Z', '#c8a878') + S('M115 96v44', '#3a2412', 3) +
      // headboard, bed, pillow
      P('M300 520V250Q450 190 600 250V520Z', `url(#${k}hb)`) + `<g fill="#1c0a18">${C(380, 300, 6, '')}${C(460, 280, 6, '')}${C(540, 300, 6, '')}${C(420, 360, 6, '')}${C(500, 360, 6, '')}${C(580, 360, 6, '')}</g>`.replace(/ fill=""/g, '') +
      candle(cg, 330, 250, 34, 14) + candle(cg, 566, 226, 44, 14) +
      P('M380 440Q390 380 470 384Q580 380 600 420V480H384Z', '#f4ecd8') + P('M384 440Q480 420 600 452V480H384Z', '#000', 'opacity=".12"') + cat +
      P('M250 470Q420 440 600 470V800H210Z', `url(#${k}sh)`) + S('M290 520Q420 560 600 520M270 620Q430 680 600 610M330 730Q470 760 600 720', '#fff', 5, 'opacity=".35"') + S('M300 560Q440 610 600 560', '#8a7250', 3, 'opacity=".4"') + pet +
      // floor candles
      R(0, 730, 260, 70, '#1c0c08') + candle(cg, 30, 790, 60, 22) + candle(cg, 560, 800, 70, 24) +
      fig(210, 300, 1.9, body, 3) + candle(cg, 22, 800, 36, 26) +
      R(0, 0, 600, 800, '#ffa040', 'opacity=".12" style="mix-blend-mode:screen"') + cap(736, 'the good sheets are ON'),
    0.16, 0.6,
  );
}

{
  const k = 'hp_c7_bea';
  const f: Face = {
    skin: '#f0cdb0', shade: '#b48a70', rim: '#fff2c8', iris: '#4a3018', lid: 87.4, low: 94.8,
    inFace: C(76, 106, 10, '#f08a8a', 'opacity=".35"') + C(124, 106, 10, '#c85a5a', 'opacity=".3"'),
    brows: 'M77.500 80Q86 75.500 95 78.500M105 77Q114 73 122.500 77', browC: '#3a1e16',
    mouth: `<path d="M88 113Q94 110 100 112.500Q106 110 112 113Q100 125 88 113Z" fill="#e8203c" stroke="#a81028" stroke-width="1.200"/><path d="M91 114.500Q100 116.500 109 114.500" stroke="#fff" stroke-width="1.600" opacity=".85"/>`,
    lines: `<path d="M79 86.500l-5-2.500M121 86.500l5-2.500" stroke="#1a1318" stroke-width="1.600"/>`,
    hair:
      P('M60 104C52 44 84 30 100 30C116 30 148 44 140 104C139 78 130 62 112 56C96 66 70 66 60 104Z', '#3a1e16') + S('M66 78Q76 50 100 42M112 54Q128 62 134 84', '#7a4a34', 2) +
      // cat-eye sunglasses pushed up
      P('M68 48Q84 40 98 46Q96 60 84 60Q70 60 68 48ZM102 46Q116 40 132 48Q130 60 116 60Q104 60 102 46Z', '#16161c', 'stroke="#e8203c" stroke-width="2.200"') + S('M74 49l8-3M108 48l8-3', '#fff', 1.8, 'opacity=".7"'),
  };
  const RDc = '#e81e3c';
  const body =
    P('M56 100C46 36 86 22 100 22C116 22 154 36 144 100C148 116 144 130 136 140H64C56 130 52 116 56 100Z', '#3a1e16') + P('M110 24C150 34 150 80 144 100C148 116 144 130 136 140H120Z', '#000', 'opacity=".28"') +
    torso(k, f, femDet(f.shade), 0, true) + E(100, 334, 58, 15, f.skin) +
    P(BOT, RDc) + P('M103 312L144 302L103 356Z', '#000', 'opacity=".2"') + P(TRI, RDc) + S('M72 222L80 194', '#ff9aa8', 2) + strings('#a81028') + bows('#a81028') +
    dots([[78, 204], [84, 216], [74, 220], [122, 204], [116, 216], [126, 220], [84, 316], [100, 326], [116, 316], [100, 342]], '#fff', 3.4) +
    // belly ring + cactus tattoo on the hip
    ring(100, 286, 3) + C(100, 290, 1.6, '#e9c66a') + S('M134 300v-14M134 294h-4v-5M134 291h4v-4', '#2a7a4a', 2.2) +
    arm(f.skin, 20, [51, 178, 14, 166, 12, 108]) + head(k, f) + ring(66, 112, 4) + ring(134, 112, 4) + dots([[64, 100], [65, 92], [135, 100]], '#e9c66a', 2.4) + C(105, 106, 1.5, '#e9c66a') +
    arm(f.shade, 19, [149, 178, 186, 214, 206, 262]) + S('M149 178L186 214', f.rim, 3, 'opacity=".8" transform="translate(7 -8)"');
  const umb = (x: number, y: number, c: string, rot: number): string =>
    `<g transform="translate(${x} ${y}) rotate(${rot})">${S('M0 0V44', '#e8dcc0', 2)}${P('M-22 4Q0 -20 22 4Q11 -2 0 4Q-11 -2 -22 4Z', c)}${S('M0 -8V4M-11 -4L0 4M11 -4L0 4', '#000', 1, 'opacity=".25"')}</g>`;
  const toes = (x: number, y: number): string => dots([[x - 12, y + 2], [x - 4, y], [x + 4, y], [x + 11, y + 2]], '#e8203c', 8);
  const legs =
    S('M336 600L424 644L520 780', '#d8ae92', 46) + S('M356 580L442 624L540 760', f.rim, 4, 'opacity=".8"') +
    S('M312 598L232 512L212 640', f.skin, 46) + E(208, 656, 21, 27, f.skin) + toes(208, 678) + S('M214 520L198 624', '#fff', 5, 'opacity=".3"');
  const PK = '#ff7aa8', PD = '#e0508a';
  A[k] = frame(
    k,
    lg(`${k}wa`, [[0, '#4ae0e8'], [1, '#1a8ad0']]) + lg(`${k}s`, [[0, '#6ab8ff'], [1, '#d8f0ff']]) + rg(`${k}u`, [[0, '#fff', 0.9], [1, '#fff', 0]]) + lg(`${k}dr`, [[0, '#ffd23a'], [0.6, '#ff8a2a'], [1, '#e8203c']]) +
      pat(`${k}c`, 120, 70, `<path d="M0 20Q30 0 60 20T120 20M0 55Q30 35 60 55T120 55" fill="none" stroke="#fff" stroke-width="3" opacity=".3"/>`),
    R(0, 0, 600, 200, `url(#${k}s)`) + P('M0 110Q80 70 160 104Q260 60 360 104Q470 66 600 110V190H0Z', '#3a8a4a') + `<path d="M0 120H600V190H0Z" fill="#b8865a"/><path d="M40 120V190M100 120V190M160 120V190M220 120V190M280 120V190M340 120V190M400 120V190M460 120V190M520 120V190M580 120V190" stroke="#8a5a34" stroke-width="3"/>` +
      // garden gnome judging + deck
      R(0, 186, 600, 26, '#e8dcc4') + `<g transform="translate(520 150)">${P('M-16 36Q-22 0 0 -4Q22 0 16 36Z', '#3a6ac8')}${C(0, -10, 13, '#f0c8a8')}${P('M-13 -14L0 -56L13 -14Z', '#e8203c')}${P('M-12 -6Q0 22 12 -6Q0 2 -12 -6Z', '#fff')}${S('M-7 -13l5 2M7 -13l-5 2', '#16161c', 2)}</g>` +
      R(0, 208, 600, 592, `url(#${k}wa)`) + R(0, 208, 600, 592, `url(#${k}c)`) + R(0, 208, 600, 10, '#fff', 'opacity=".5"') +
      // flamingo float: tail, back of ring, neck
      P('M470 470Q560 400 590 440Q560 450 560 480Q590 480 596 510Q540 520 480 520Z', PD) + E(300, 560, 250, 120, PK) + E(300, 540, 150, 56, '#1a78b8') +
      S('M110 520Q40 420 96 330Q140 260 110 210', PK, 50) + S('M96 500Q36 420 84 336', '#ffb0cc', 8, 'opacity=".7"') + C(110, 196, 40, PK) +
      P('M140 180Q190 186 196 226Q170 240 150 216Z', '#f4f1ea') + P('M172 206Q194 208 196 226Q178 240 164 228Z', '#16161c') + C(120, 186, 12, '#fff') + C(124, 188, 6, '#16161c') + S('M106 170L134 176', '#b03a6a', 4) +
      fig(310, 262, 1.75, body, -2) +
      // front of ring over her hips, legs over the edge
      P('M52 570Q60 690 300 690Q540 690 548 570Q500 612 300 612Q100 612 52 570Z', PK) + S('M90 640Q300 700 510 640', '#ffb0cc', 8, 'opacity=".7"') + P('M52 570Q60 690 300 690Q540 690 548 570Q520 660 300 668Q80 660 52 570Z', PD, 'opacity=".5"') +
      legs +
      // cocktail with three umbrellas
      `<g transform="translate(158 180)">${umb(-20, -70, '#ff5a9a', -24)}${umb(4, -84, '#F2C318', 2)}${umb(28, -68, '#3ac8b0', 26)}${P('M-26 -40Q-30 10 -8 30V52H8V30Q30 10 26 -40Z', '#fff', 'opacity=".3"')}${P('M-27 -22Q-28 12 -8 30H8Q28 12 27 -22Z', `url(#${k}dr)`)}${S('M0 52V66M-18 68H18', '#fff', 5, 'opacity=".8"')}${C(24, -40, 12, '#ff8a2a')}${C(24, -40, 8, '#ffc04a')}${S('M-16 -30Q-18 0 -8 16', '#fff', 3, 'opacity=".6"')}${S('M-13 40h26M-12 50h24', f.skin, 10)}</g>` +
      // the cactus has its own float
      `<g transform="translate(88 716) scale(.82)">${E(0, 20, 78, 34, '#F2C318')}${E(0, 12, 40, 14, '#b98a0c')}${P('M-26 -40H26L20 14H-20Z', '#c9653a')}${R(-30, -48, 60, 12, '#e07a4a', 'rx="3"')}${R(-13, -130, 26, 86, '#3aa85a', 'rx="13"')}${S('M-13 -76h-10a8 8 0 0 1-8-8v-14M13 -88h10a8 8 0 0 0 8-8v-10', '#3aa85a', 12)}${C(0, -134, 7, '#ff7aa8')}${R(-13, -112, 26, 9, '#16161c', 'rx="4"')}</g>` +
      S('M150 730Q190 700 200 680', '#f4f1ea', 2.5) +
      // sparkle + sun
      C(60, 40, 200, `url(#${k}u)`, 'opacity=".7"') + star(70, 300, 14, '#fff') + star(560, 300, 10, '#fff') + star(330, 770, 9, '#fff'),
    0.12, 0.35,
  );
}
