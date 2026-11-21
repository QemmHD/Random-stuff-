// COLD SIGNAL — Case 02 "Dead Air" illustrations.
// Every value in `case2Art` is a complete standalone SVG document string.
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
/** Mottle / streak texture (brick grime, wood grain). rgb = "r g b" in 0..1. */
const tex = (id: string, fx: number, fy: number, rgb: string, k = -2.2, b = 1.3, seed = 3): string => {
  const c = rgb.split(' ');
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="3" seed="${seed}"/><feColorMatrix values="0 0 0 0 ${c[0]} 0 0 0 0 ${c[1]} 0 0 0 0 ${c[2]} ${k} 0 0 0 ${b}"/></filter>`;
};
const SANS = 'font-family="Helvetica, Arial, sans-serif"';
const MONO = 'font-family="Courier New, monospace"';
const SERIF = 'font-family="Georgia, serif"';
const HAND = 'font-family="Marker Felt, Chalkboard SE, Comic Sans MS, sans-serif"';
const SCRIPT = 'font-family="Snell Roundhand, Brush Script MT, cursive"';
const n1 = (v: number): string => (Math.round(v * 10) / 10).toString();
/** The raincoat. Same yellow everywhere — it is the case's key visual clue. */
const Y = '#F2C318';
const YD = '#b98a0c';
const YL = '#ffe067';

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

/** Seven-segment LED glyphs: digits, space, colon, dot. Returns rects (no fill set). */
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
    if (ch === '.') { o += r(0, h - t, t, t); cx += t + w * 0.4; continue; }
    for (const q of SEG[ch] ?? '') { const p = P[q]; o += r(p[0], p[1], p[2], p[3]); }
    cx += w * 1.4;
  }
  return o;
}

/** Running-bond brick pattern. */
const brick = (id: string, bw: number, bh: number, mortar: string, c: string[], tf = ''): string => {
  const g = Math.max(1.5, bh * 0.12);
  return `<pattern id="${id}" width="${bw * 2}" height="${bh * 2}" patternUnits="userSpaceOnUse"${tf ? ` patternTransform="${tf}"` : ''}><rect width="${bw * 2}" height="${bh * 2}" fill="${mortar}"/>` +
    `<rect width="${n1(bw - g)}" height="${n1(bh - g)}" fill="${c[0]}"/><rect x="${bw}" width="${n1(bw - g)}" height="${n1(bh - g)}" fill="${c[1]}"/>` +
    `<rect x="${n1(-bw / 2)}" y="${bh}" width="${n1(bw - g)}" height="${n1(bh - g)}" fill="${c[2]}"/><rect x="${n1(bw / 2)}" y="${bh}" width="${n1(bw - g)}" height="${n1(bh - g)}" fill="${c[0]}"/><rect x="${n1(bw * 1.5)}" y="${bh}" width="${n1(bw - g)}" height="${n1(bh - g)}" fill="${c[2]}"/></pattern>`;
};

/** String of fairy lights through hook points; needs a radial glow gradient id. */
function fairy(glow: string, hooks: number[][], sag: number, per: number, r = 4, gr = 26): string {
  let wire = `M${hooks[0][0]} ${hooks[0][1]}`, bulbs = '', glows = '';
  for (let i = 1; i < hooks.length; i++) {
    const [x0, y0] = hooks[i - 1], [x1, y1] = hooks[i];
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + sag;
    wire += `Q${n1(mx)} ${n1(my)} ${x1} ${y1}`;
    for (let j = 0; j < per; j++) {
      const t = (j + 0.5) / per, u = 1 - t;
      const x = u * u * x0 + 2 * u * t * mx + t * t * x1, y = u * u * y0 + 2 * u * t * my + t * t * y1;
      glows += `<circle cx="${n1(x)}" cy="${n1(y + r * 2)}" r="${gr}" fill="url(#${glow})"/>`;
      bulbs += `<ellipse cx="${n1(x)}" cy="${n1(y + r * 1.8)}" rx="${n1(r * 0.8)}" ry="${n1(r * 1.25)}"/>`;
    }
  }
  return `<path d="${wire}" fill="none" stroke="#17100c" stroke-width="${n1(r * 0.45)}"/>${glows}<g fill="#fff1c4">${bulbs}</g>`;
}

/** Slanted rain streaks. */
function rain(R: () => number, w: number, h: number, n: number, col: string, op: number, len = 26, slant = -0.18): string {
  let d = '';
  for (let i = 0; i < n; i++) {
    const x = R() * (w + 80) - 20, y = R() * h, l = len * (0.5 + R());
    d += `M${n1(x)} ${n1(y)}l${n1(l * slant)} ${n1(l)}`;
  }
  return `<path d="${d}" stroke="${col}" stroke-width="1.3" stroke-linecap="round" opacity="${op}" fill="none"/>`;
}

/** Row of city blocks with lit windows. */
function skyline(R: () => number, x0: number, x1: number, base: number, hMin: number, hMax: number, fill: string, win: string, lit: number): string {
  let b = '', w = '';
  for (let x = x0; x < x1;) {
    const bw = Math.round(30 + R() * 46), bh = Math.round(hMin + R() * (hMax - hMin));
    b += `M${x} ${base + 4}v${-bh - 4}h${bw + 1}v${bh + 4}z`;
    if (R() < 0.3) b += `M${x + Math.round(bw * 0.4)} ${base - bh}v-14h3v14z`;
    for (let wy = base - bh + 8; wy < base - 8; wy += 12) for (let wx = x + 5; wx < x + bw - 6; wx += 10) {
      if (R() < lit) w += `M${wx} ${wy}h4v5h-4z`;
    }
    x += bw;
  }
  return `<path d="${b}" fill="${fill}"/><path d="${w}" fill="${win}"/>`;
}

/** Little owl silhouette, feet at (0,0), ~1 unit = px at s=1 (about 30 wide, 44 tall). */
const owl = (x: number, y: number, s: number, body: string, eye: string): string =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-13-8C-15-26-13-38-11-46L-5-40Q0-42 5-40L11-46C13-38 15-26 13-8Q8 0 0 0T-13-8Z" fill="${body}"/>` +
  `<circle cx="-5" cy="-33" r="3.6" fill="${eye}"/><circle cx="5" cy="-33" r="3.6" fill="${eye}"/><circle cx="-5" cy="-33" r="1.5" fill="#0a0810"/><circle cx="5" cy="-33" r="1.5" fill="#0a0810"/><path d="M-1.600-29L0-25.500L1.600-29Z" fill="${eye}"/></g>`;

/** Wooden sign board (painted planks in a timber frame). */
const board = (k: string, x: number, y: number, w: number, h: number): string =>
  `<rect x="${x - 6}" y="${y + 10}" width="${w + 12}" height="${h + 10}" fill="#000" opacity=".55" filter="url(#${k}b9)"/>` +
  `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="5" fill="#6b4526"/>` +
  `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="5" filter="url(#${k}wd)" opacity=".5"/>` +
  `<path d="M${x - 14} ${y - 14}h${w + 28}l-14 14h${-w}z" fill="#fff" opacity=".12"/><path d="M${x - 14} ${y + h + 14}h${w + 28}l-14-14h${-w}z" fill="#000" opacity=".3"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${k}bd)"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" filter="url(#${k}wd)" opacity=".4"/>` +
  `<path d="M${x} ${n1(y + h / 4)}h${w}M${x} ${n1(y + h / 2)}h${w}M${x} ${n1(y + h * 0.75)}h${w}" stroke="#0a161b" stroke-width="2" opacity=".6"/>` +
  `<g fill="#9a8a70">${[[x - 5, y - 5], [x + w + 5, y - 5], [x - 5, y + h + 5], [x + w + 5, y + h + 5]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3.500"/>`).join('')}</g>`;

// ───────────────────────────────────────────────────────────── wall_c2_lock
function wallLock(): string {
  const k = 'wall_c2_lock';
  const defs =
    brick(`${k}br`, 74, 30, '#1c1218', ['#6e3327', '#7c3c2b', '#5d2a24']) +
    lg(`${k}top`, [[0, '#0a0b22', 0.92], [0.24, '#141236', 0.72], [0.42, '#1a1438', 0.1], [0.62, '#000', 0], [1, '#07060f', 0.78]]) +
    rg(`${k}pool`, [[0, '#ffb45a', 0.42], [0.6, '#ff9a3a', 0.12], [1, '#ff9a3a', 0]]) +
    rg(`${k}gl`, [[0, '#ffd98a', 0.75], [0.35, '#ffb45a', 0.25], [1, '#ff9a3a', 0]]) +
    lg(`${k}bd`, [[0, '#24474f'], [1, '#17323a']]) +
    lg(`${k}tp`, [[0, '#e03a3c'], [0.5, '#c2242c'], [1, '#9c1a22']]) +
    tex(`${k}gm`, 0.02, 0.05, '0.05 0.03 0.08', -2.6, 1.5, 5) +
    tex(`${k}wd`, 0.012, 0.5, '0.04 0.03 0.02', -2.4, 1.3, 9) +
    bl(`${k}b9`, 9) + bl(`${k}b2`, 1.2);
  const body =
    `<rect width="600" height="1300" fill="url(#${k}br)"/>` +
    `<rect width="600" height="1300" filter="url(#${k}gm)" opacity=".75"/>` +
    `<ellipse cx="300" cy="560" rx="430" ry="380" fill="url(#${k}pool)"/>` +
    `<rect width="600" height="1300" fill="url(#${k}top)"/>` +
    // fairy lights
    fairy(`${k}gl`, [[-20, 318], [150, 352], [330, 330], [470, 356], [620, 322]], 34, 3, 5, 34) +
    // conduit + hook
    `<rect x="296" y="398" width="8" height="46" fill="#15100d"/>` +
    board(k, 50, 455, 500, 320) +
    // painted owl mark
    `<g fill="none" stroke="#f1dfae" stroke-width="4" stroke-linecap="round" opacity=".9"><circle cx="122" cy="492" r="11"/><circle cx="150" cy="492" r="11"/><path d="M109 478l9 6M163 478l-9 6M136 498v8"/></g><circle cx="122" cy="492" r="3.500" fill="#f1dfae"/><circle cx="150" cy="492" r="3.500" fill="#f1dfae"/>` +
    // lettering
    `<g ${SERIF} font-weight="700" fill="#f3e3b6" text-anchor="middle">` +
    `<text x="300" y="566" font-size="57" textLength="440" lengthAdjust="spacingAndGlyphs" letter-spacing="2">THE OWL HOURS</text>` +
    `<path d="M92 584h416" stroke="#e0a03c" stroke-width="5" stroke-linecap="round"/>` +
    `<text x="222" y="676" font-size="96" textLength="214" lengthAdjust="spacingAndGlyphs" fill="#f7ecc9">88.1</text>` +
    `<text x="432" y="676" font-size="96" textLength="150" lengthAdjust="spacingAndGlyphs" fill="#e9a23a">FM</text>` +
    `<text x="300" y="748" font-size="38" textLength="400" lengthAdjust="spacingAndGlyphs" letter-spacing="1">FRI · MIDNIGHT–4</text></g>` +
    // red gaffer tape over 88.1
    `<g transform="rotate(-9 222 644)"><rect x="88" y="640" width="270" height="18" fill="#000" opacity=".4" filter="url(#${k}b2)"/><path d="M84 635l4-2 4 2 4-2 4 2h250l4 3-4 3 4 3-4 3 4 3-3 3H96l-4 2-4-2-4-1z" fill="url(#${k}tp)"/><path d="M92 638h256M92 650h256" stroke="#fff" stroke-width="1" opacity=".2"/></g>` +
    // index card
    `<g transform="translate(452 446) rotate(5)"><rect x="-112" y="-50" width="228" height="108" fill="#000" opacity=".45" filter="url(#${k}b2)"/><rect x="-116" y="-56" width="228" height="108" fill="#f3ecd9"/>` +
    `<path d="M-116-30h228" stroke="#d9605a" stroke-width="1.500" opacity=".7"/><path d="M-116-4h228M-116 22h228" stroke="#7aa0c8" stroke-width="1" opacity=".5"/>` +
    `<g ${HAND} font-size="31" font-weight="700" fill="#18244a"><text x="-100" y="-6" textLength="172" lengthAdjust="spacingAndGlyphs">MOVING UP</text><text x="-100" y="34" textLength="150" lengthAdjust="spacingAndGlyphs">THE DIAL</text></g>` +
    `<path d="M80 36V4M67 17l13-15 13 15" fill="none" stroke="#18244a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<rect x="-36" y="-68" width="72" height="24" fill="#d8cfa6" opacity=".85" transform="rotate(-4)"/></g>` +
    // cable down the wall
    `<path d="M560 790c6 120-14 260 0 520" fill="none" stroke="#120d0c" stroke-width="5"/><path d="M40 0c-6 140 10 300 0 455" fill="none" stroke="#120d0c" stroke-width="4" opacity=".7"/>`;
  return frame(k, 600, 1300, defs, body, 0.16, 0.5);
}

// ───────────────────────────────────────────────────────────── c2_ph_sign
function phSign(): string {
  const k = 'c2_ph_sign';
  const defs =
    brick(`${k}br`, 84, 34, '#1c1218', ['#6e3327', '#7c3c2b', '#5d2a24']) +
    lg(`${k}top`, [[0, '#0a0b22', 0.85], [0.3, '#141236', 0.2], [0.7, '#000', 0], [1, '#07060f', 0.7]]) +
    rg(`${k}pool`, [[0, '#ffc070', 0.5], [0.6, '#ff9a3a', 0.14], [1, '#ff9a3a', 0]]) +
    rg(`${k}gl`, [[0, '#ffd98a', 0.8], [0.35, '#ffb45a', 0.28], [1, '#ff9a3a', 0]]) +
    lg(`${k}bd`, [[0, '#24474f'], [1, '#17323a']]) +
    lg(`${k}hd`, [[0, '#c98a3e'], [1, '#7a4a1c']], 1, 0) +
    tex(`${k}gm`, 0.02, 0.05, '0.05 0.03 0.08', -2.6, 1.5, 4) +
    tex(`${k}wd`, 0.012, 0.5, '0.04 0.03 0.02', -2.4, 1.3, 9) +
    bl(`${k}b9`, 9) + bl(`${k}b2`, 1.5);
  const drips = [[112, 478, 26], [203, 478, 44], [262, 478, 18], [338, 478, 34], [455, 478, 52], [505, 478, 22], [178, 318, 16], [396, 318, 24], [470, 318, 12]]
    .map(([x, y, l]) => `<rect x="${x}" y="${y - 6}" width="7" height="${l + 6}" rx="3.500"/><circle cx="${x + 3.5}" cy="${y + l}" r="5"/>`).join('');
  const body =
    `<rect width="600" height="800" fill="url(#${k}br)"/>` +
    `<rect width="600" height="800" filter="url(#${k}gm)" opacity=".75"/>` +
    `<ellipse cx="300" cy="380" rx="440" ry="400" fill="url(#${k}pool)"/>` +
    `<rect width="600" height="800" fill="url(#${k}top)"/>` +
    fairy(`${k}gl`, [[-20, 60], [140, 96], [320, 70], [480, 100], [620, 62]], 40, 3, 6, 40) +
    board(k, 44, 210, 512, 390) +
    // fresh patch of base paint where the old frequency was
    `<path d="M70 352q200-12 464 2l6 138q-240 12-474-2z" fill="#1d3c44"/>` +
    // ghost of the old frequency
    `<text x="250" y="462" ${SERIF} font-weight="700" font-size="112" fill="#c9bf9a" opacity=".2" text-anchor="middle" transform="rotate(-2 250 440)">88.1</text>` +
    `<g ${SERIF} font-weight="700" fill="#fbfaf2" text-anchor="middle">` +
    `<text x="300" y="312" font-size="60" textLength="452" lengthAdjust="spacingAndGlyphs">THE OWL HOURS</text>` +
    `<text x="300" y="476" font-size="118" textLength="460" lengthAdjust="spacingAndGlyphs">104.3 FM</text>` +
    `<text x="300" y="562" font-size="34" textLength="360" lengthAdjust="spacingAndGlyphs" fill="#f3e3b6" opacity=".85">FRI · MIDNIGHT–4</text></g>` +
    `<path d="M92 336h416" stroke="#e0a03c" stroke-width="5" stroke-linecap="round"/>` +
    `<g fill="#fbfaf2">${drips}</g>` +
    // wet sheen
    `<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"><path d="M96 398l10-6M300 404l12-6M420 400l10-6M150 276l8-4M330 274l8-4"/></g>` +
    // brush resting on the frame
    `<g transform="translate(402 622) rotate(-7)"><rect x="-4" y="6" width="196" height="12" fill="#000" opacity=".5" filter="url(#${k}b2)"/><rect x="70" y="-11" width="120" height="20" rx="9" fill="url(#${k}hd)"/><circle cx="178" cy="-1" r="3" fill="#2a160a"/><rect x="34" y="-15" width="40" height="28" fill="#b9bcc0"/><path d="M40-15v28M68-15v28" stroke="#6d7074" stroke-width="2"/><path d="M34-15h-34q-8 14 0 28h34z" fill="#3a2c1c"/><path d="M22-15h-22q-8 14 0 28h22q-6-14 0-28z" fill="#fbfaf2"/><path d="M-4 12q-2 18 4 26 6-10 4-26z" fill="#fbfaf2"/></g>` +
    // paint tin on the ledge below
    `<rect y="700" width="600" height="100" fill="#120d10"/><rect y="700" width="600" height="6" fill="#3a2a24"/>` +
    `<g transform="translate(96 640)"><ellipse cx="0" cy="62" rx="50" ry="8" fill="#000" opacity=".5"/><rect x="-42" y="0" width="84" height="62" fill="#8d9298"/><rect x="-42" y="14" width="84" height="30" fill="#e8e4d8"/><ellipse cx="0" cy="0" rx="42" ry="9" fill="#fbfaf2"/><ellipse cx="0" cy="0" rx="42" ry="9" fill="none" stroke="#b9bcc0" stroke-width="3"/><path d="M-30 4q4 30 8 40" stroke="#fbfaf2" stroke-width="7" stroke-linecap="round" fill="none"/></g>`;
  return frame(k, 600, 800, defs, body, 0.16, 0.5);
}

// ───────────────────────────────────────────────────────────── wall_c2_home
function wallHome(): string {
  const k = 'wall_c2_home';
  const R = rng(43);
  const defs =
    lg(`${k}sky`, [[0, '#070818'], [0.35, '#14143a'], [0.62, '#3a2450'], [0.76, '#8a4638'], [0.84, '#d9843a']]) +
    rg(`${k}hz`, [[0, '#ffb060', 0.55], [1, '#ffb060', 0]]) +
    rg(`${k}bc`, [[0, '#ff5040', 0.9], [0.3, '#ff3020', 0.35], [1, '#ff3020', 0]]) +
    lg(`${k}fg`, [[0, '#15101c'], [1, '#07060c']]) +
    bl(`${k}b30`, 30) + bl(`${k}b3`, 2.5);
  let lat = '';
  for (let y = 1300, i = 0; y > 380; y -= 46, i++) {
    const w0 = 6 + (y - 330) * 0.03, w1 = 6 + (y - 46 - 330) * 0.03;
    lat += i % 2 ? `M${n1(440 - w0)} ${y}L${n1(440 + w1)} ${y - 46}` : `M${n1(440 + w0)} ${y}L${n1(440 - w1)} ${y - 46}`;
    lat += `M${n1(440 - w0)} ${y}H${n1(440 + w0)}`;
  }
  const body =
    `<rect width="600" height="1300" fill="url(#${k}sky)"/>` +
    `<g filter="url(#${k}b30)" opacity=".5"><ellipse cx="120" cy="300" rx="260" ry="60" fill="#2a2658"/><ellipse cx="480" cy="560" rx="300" ry="50" fill="#4a2c5a"/><ellipse cx="200" cy="760" rx="300" ry="40" fill="#a85a3c"/></g>` +
    `<ellipse cx="300" cy="1060" rx="420" ry="160" fill="url(#${k}hz)"/>` +
    `<g opacity=".55">${skyline(R, -10, 610, 1040, 40, 150, '#2e2146', '#ffc070', 0.1)}</g>` +
    `<g filter="url(#${k}b3)" opacity=".5"><rect y="1030" width="600" height="40" fill="#e08a40"/></g>` +
    skyline(R, -10, 610, 1110, 50, 210, '#130f22', '#ffb45a', 0.16) +
    // water tower
    `<g fill="#0d0a18"><path d="M96 930h56v44H96zM100 974l-8 60h6l8-60zM148 974l8 60h-6l-8-60zM92 926l32-22 32 22z"/></g>` +
    // foreground roof
    `<rect y="1104" width="600" height="196" fill="url(#${k}fg)"/><rect y="1104" width="600" height="7" fill="#3a2a36"/><path d="M0 1150h600" stroke="#000" stroke-width="3" opacity=".5"/>` +
    `<g fill="#0a0810"><rect x="60" y="1060" width="50" height="50"/><rect x="72" y="1040" width="10" height="22"/><rect x="220" y="1080" width="90" height="28"/></g>` +
    `<ellipse cx="250" cy="1220" rx="150" ry="14" fill="#d9843a" opacity=".16"/><ellipse cx="520" cy="1260" rx="90" ry="9" fill="#d9843a" opacity=".12"/>` +
    // mast
    `<g stroke="#07060c" stroke-linecap="round" fill="none"><path d="M440 330L296 1140M440 330L598 1010" stroke-width="1.500" opacity=".8"/>` +
    `<path d="M411 1300L434 380M469 1300L446 380" stroke-width="5"/><path d="${lat}" stroke-width="2.500"/><path d="M440 384V292" stroke-width="5"/>` +
    `<path d="M318 486H562" stroke-width="7"/><path d="M330 486v-30M358 486v-22M522 486v-22M550 486v-30" stroke-width="3.500"/>` +
    `<path d="M384 620H496" stroke-width="5"/><path d="M392 620v-18M488 620v-18" stroke-width="3"/></g>` +
    `<path d="M318 484H562" stroke="#d9843a" stroke-width="1.200" opacity=".5"/>` +
    owl(388, 482, 1.25, '#07060c', '#ffb84a') +
    `<circle cx="440" cy="290" r="46" fill="url(#${k}bc)"/><circle cx="440" cy="290" r="4.500" fill="#ffd0c0"/>` +
    rain(R, 600, 1300, 110, '#b9c4f0', 0.3, 36) + rain(R, 600, 1300, 36, '#ffd9a8', 0.22, 46);
  return frame(k, 600, 1300, defs, body, 0.15, 0.5);
}

// ───────────────────────────────────────────────────────────── cover_case2
function coverCase2(): string {
  const k = 'cover_case2';
  const R = rng(17);
  const defs =
    lg(`${k}sky`, [[0, '#06071a'], [0.4, '#16153e'], [0.66, '#43275a'], [0.8, '#a04e3a'], [0.9, '#e08a3a']]) +
    brick(`${k}br`, 22, 9, '#1a0f14', ['#5a2a24', '#663026', '#4c2420']) +
    lg(`${k}sh`, [[0, '#0a0818', 0.25], [1, '#0a0818', 0.78]], 1, 0.4) +
    lg(`${k}lot`, [[0, '#241a2a'], [1, '#08070e']]) +
    rg(`${k}lamp`, [[0, '#ffd58a', 0.95], [0.2, '#ffa040', 0.5], [1, '#ff8a2a', 0]]) +
    rg(`${k}win`, [[0, '#ffe2a0', 0.9], [0.3, '#ffb050', 0.4], [1, '#ffb050', 0]]) +
    rg(`${k}bc`, [[0, '#ff5040', 0.9], [0.3, '#ff3020', 0.35], [1, '#ff3020', 0]]) +
    lg(`${k}cone`, [[0, '#ffb45a', 0.34], [1, '#ffb45a', 0]]) +
    bl(`${k}b30`, 26) + bl(`${k}b4`, 4) +
    `<g id="${k}w"><path d="M0 40v-30q11-12 22 0v30z" fill="#0b0a18"/><path d="M11 2v38M0 22h22" stroke="#2a2030" stroke-width="1.500"/></g>`;
  // sound wave that dies in the middle
  let wave = 'M-10 214';
  for (let x = 0; x <= 600; x += 6) {
    const d = Math.abs(x - 300);
    const env = d < 78 ? 0 : Math.min(1, (d - 78) / 120);
    const a = env * (16 + 26 * Math.abs(Math.sin(x * 0.045))) * Math.sin(x * 0.27 + Math.sin(x * 0.06) * 2);
    wave += `L${x} ${Math.round(214 + a)}`;
  }
  let wins = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
    wins += `<use href="#${k}w" x="${112 + c * 46}" y="${384 + r * 64}"/>`;
    if (R() < 0.3) wins += `<path d="M${114 + c * 46} ${396 + r * 64}l8 8v-12z" fill="#7a8ac0" opacity=".3"/>`;
  }
  let stair = '';
  for (let i = 0; i < 4; i++) {
    const y = 404 + i * 64, dir = i % 2 ? -1 : 1;
    stair += `M392 ${y}h92M392 ${y - 22}h92M394 ${y}v-22M482 ${y}v-22M438 ${y}v-22`;
    stair += dir > 0 ? `M400 ${y}L476 ${y + 64}M400 ${y - 16}L476 ${y + 48}` : `M476 ${y}L400 ${y + 64}M476 ${y - 16}L400 ${y + 48}`;
  }
  const body =
    `<rect width="600" height="800" fill="url(#${k}sky)"/>` +
    `<g filter="url(#${k}b30)" opacity=".55"><ellipse cx="460" cy="120" rx="240" ry="40" fill="#2a2660"/><ellipse cx="90" cy="330" rx="220" ry="34" fill="#5a3060"/><ellipse cx="520" cy="470" rx="200" ry="30" fill="#b05a3c"/></g>` +
    // dead-air waveform
    `<path d="${wave}" fill="none" stroke="#ffb060" stroke-width="7" opacity=".35" filter="url(#${k}b4)"/><path d="${wave}" fill="none" stroke="#ffd9a0" stroke-width="2.200" stroke-linejoin="round" opacity=".9"/>` +
    // distant city
    `<g opacity=".6">${skyline(R, -10, 610, 660, 20, 90, '#2a1c3c', '#ffc070', 0.05)}</g>` +
    // chimney
    `<path d="M112 366l6-170h26l6 170z" fill="url(#${k}br)"/><path d="M112 366l6-170h26l6 170z" fill="#0a0818" opacity=".55"/><rect x="114" y="190" width="34" height="9" fill="#150e16"/>` +
    // mill body
    `<rect x="84" y="356" width="424" height="304" fill="url(#${k}br)"/><rect x="84" y="356" width="424" height="304" fill="url(#${k}sh)"/>` +
    `<rect x="76" y="346" width="440" height="14" fill="#171019"/><path d="M84 420h424M84 484h424M84 548h424M84 612h424" stroke="#150d14" stroke-width="3" opacity=".6"/>` +
    `<rect x="382" y="360" width="112" height="300" fill="#0a0818" opacity=".3"/>` +
    wins +
    // rooftop coop + lit window
    `<rect x="262" y="296" width="110" height="52" fill="#1a1220"/><path d="M254 298l64-22 62 22z" fill="#120c18"/>` +
    `<circle cx="318" cy="322" r="60" fill="url(#${k}win)"/><rect x="302" y="308" width="32" height="26" fill="#ffd98a"/><path d="M318 308v26M302 321h32" stroke="#8a4a1c" stroke-width="2"/>` +
    // antenna mast
    `<g stroke="#0c0914" fill="none" stroke-linecap="round"><path d="M396 348L402 118M410 348L404 118" stroke-width="3"/><path d="M396 330l14-24-13-24 12-24-11-24 10-24-9-24 8-22" stroke-width="1.600"/><path d="M403 124L300 346M403 124L500 346" stroke-width="1" opacity=".7"/><path d="M372 150h62M380 176h46M403 118V92" stroke-width="3.500"/><path d="M376 150v-12M430 150v-12" stroke-width="2.500"/></g>` +
    `<circle cx="403" cy="90" r="34" fill="url(#${k}bc)"/><circle cx="403" cy="90" r="3.500" fill="#ffd0c0"/>` +
    // fire stair
    `<path d="${stair}" fill="none" stroke="#08060e" stroke-width="3.400" stroke-linecap="round"/>` +
    // loading door + lamp over it
    `<rect x="200" y="606" width="56" height="54" fill="#0b0a14"/><circle cx="228" cy="596" r="30" fill="url(#${k}lamp)" opacity=".6"/>` +
    // parking lot
    `<rect y="656" width="600" height="144" fill="url(#${k}lot)"/>` +
    `<g stroke="#c9b48a" stroke-width="3" opacity=".3"><path d="M150 676L96 800M250 676L228 800M350 676L364 800M450 676L500 800"/></g>` +
    `<g filter="url(#${k}b4)"><ellipse cx="120" cy="716" rx="130" ry="20" fill="#ff9a3a" opacity=".42"/><rect x="306" y="664" width="24" height="96" fill="#ffd98a" opacity=".3"/><ellipse cx="420" cy="770" rx="150" ry="14" fill="#e08a3a" opacity=".22"/><rect x="397" y="664" width="12" height="60" fill="#ff5040" opacity=".25"/></g>` +
    // street light
    `<path d="M40 800V470q0-22 26-22h26" fill="none" stroke="#0a0810" stroke-width="7" stroke-linecap="round"/><path d="M92 452L-20 730h250z" fill="url(#${k}cone)" filter="url(#${k}b4)"/><circle cx="94" cy="452" r="70" fill="url(#${k}lamp)"/><ellipse cx="94" cy="451" rx="13" ry="5" fill="#fff0c8"/>` +
    // cyclist leaving frame
    `<g transform="translate(520 742)"><ellipse cx="10" cy="19" rx="50" ry="5" fill="#000" opacity=".5"/><ellipse cx="6" cy="30" rx="16" ry="20" fill="${Y}" opacity=".2" filter="url(#${k}b4)"/>` +
    `<g fill="none" stroke="#0a0810" stroke-width="2.600"><circle cx="-16" cy="6" r="12"/><circle cx="34" cy="6" r="12"/><path d="M-16 6l16-18h22l12 18M0-12l10 18h-26M22-12l-12 18M22-12l2-8h8M-2-14h8"/></g>` +
    `<path d="M-2-14q-4-26 12-36 12-4 16 6l4 20-10 2-4-12-6 22z" fill="${Y}"/><path d="M12-50q10-12 20-2 2 10-6 14-12 0-14-12z" fill="${Y}"/><path d="M26-40q4 2 4 6l-6 2z" fill="#2a1c1c"/><path d="M-2-14q2 4 8 2l4 16" fill="none" stroke="#1a1626" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M-2-14q-4-26 12-36" fill="none" stroke="${YL}" stroke-width="1.500" opacity=".8"/></g>` +
    rain(R, 600, 800, 80, '#b9c4f0', 0.26, 34);
  return frame(k, 600, 800, defs, body, 0.17, 0.55);
}

// ───────────────────────────────────────────────────────────── map_c2
function mapC2(): string {
  const k = 'map_c2';
  const R = rng(29);
  const river = 'M-30 4C120 26 300 78 370 210S470 420 580 480S740 566 840 650';
  const defs =
    rg(`${k}bg`, [[0, '#131c36'], [1, '#080c1a']], 0.5, 0.45, 0.8) +
    lg(`${k}rv`, [[0, '#0e3a52'], [1, '#0a2638']], 1, 1) +
    rg(`${k}gl`, [[0, '#ffa040', 0.32], [1, '#ffa040', 0]]) +
    rg(`${k}bl`, [[0, '#7ad0ff', 0.4], [1, '#7ad0ff', 0]]) +
    brick(`${k}br`, 8, 4, '#3a1814', ['#8a3e2c', '#9a4832', '#7a3426']) +
    bl(`${k}b6`, 6) +
    `<pattern id="${k}pa" width="54" height="44" patternUnits="userSpaceOnUse"><path d="M5 5h20v34H5zM29 5h20v15H29zM29 24h20v15H29z" fill="#1c2744"/></pattern>` +
    `<pattern id="${k}pb" width="50" height="42" patternUnits="userSpaceOnUse"><path d="M5 5h40v14H5zM5 23h18v14H5zM27 23h18v14H27z" fill="#22305a"/></pattern>` +
    `<clipPath id="${k}cl"><rect width="800" height="600"/></clipPath>`;
  // street grid districts: roads + pattern-filled blocks, a few knocked out
  const grid = (cx: number, cy: number, rot: number, cols: number, rows: number, sx: number, sy: number, pat: string): string => {
    let roads = '', gaps = '';
    const w = cols * sx, h = rows * sy;
    for (let c = 0; c <= cols; c++) roads += `M${-w / 2 + c * sx} ${-h / 2}v${h}`;
    for (let r = 0; r <= rows; r++) roads += `M${-w / 2} ${-h / 2 + r * sy}h${w}`;
    for (let i = 0; i < cols; i++) {
      const c = Math.floor(R() * cols), r = Math.floor(R() * rows);
      gaps += `M${-w / 2 + c * sx + 3} ${-h / 2 + r * sy + 3}h${sx - 6}v${sy - 6}h${-(sx - 6)}z`;
    }
    return `<g transform="translate(${cx} ${cy}) rotate(${rot})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="url(#${k}${pat})"/><path d="${gaps}" fill="#0f1730"/><path d="${roads}" stroke="#8a5a34" stroke-width="2.200" opacity=".5" fill="none"/></g>`;
  };
  const body =
    `<rect width="800" height="600" fill="url(#${k}bg)"/>` +
    `<g clip-path="url(#${k}cl)">` +
    grid(170, 400, -8, 9, 9, 54, 44, 'pa') + grid(650, 190, 38, 9, 9, 50, 42, 'pb') + grid(140, 110, 12, 6, 4, 54, 44, 'pa') + grid(700, 520, 12, 6, 4, 54, 44, 'pa') +
    // parks
    `<path d="M40 250q60-20 110 6t30 50q-60 26-120 8t-20-64z" fill="#12302c"/><path d="M560 330q40-10 70 10l-14 44q-40 10-66-12z" fill="#12302c"/>` +
    // river
    `<path d="${river}" fill="none" stroke="#080c1a" stroke-width="92"/><path d="${river}" fill="none" stroke="#1a2a48" stroke-width="80"/>` +
    `<path d="${river}" fill="none" stroke="url(#${k}rv)" stroke-width="54"/><path d="${river}" fill="none" stroke="#3a90b0" stroke-width="56" opacity=".25" filter="url(#${k}b6)"/>` +
    `<path d="${river}" fill="none" stroke="#2a6a88" stroke-width="1.500" stroke-dasharray="14 22" opacity=".7"/>` +
    `<path d="${river}" fill="none" stroke="#2a6a88" stroke-width="1.200" stroke-dasharray="8 30" opacity=".5" transform="translate(10 -12)"/>` +
    // glows under key districts
    `<circle cx="440" cy="216" r="90" fill="url(#${k}gl)"/><circle cx="640" cy="108" r="100" fill="url(#${k}bl)"/><circle cx="512" cy="300" r="60" fill="url(#${k}gl)" opacity=".7"/>` +
    // arterial roads (casing + fill)
    ['#080c1a|11|1', '#c98a4a|6|.9'].map((s) => {
      const [c, w, o] = s.split('|');
      return `<g fill="none" stroke="${c}" stroke-width="${w}" opacity="${o}" stroke-linecap="round" stroke-linejoin="round">` +
        // DYER ST (past the mill and the laundromat)
        `<path d="M396-10C420 90 440 160 478 232S560 330 640 400S760 470 820 486"/>` +
        // FENNIMORE AVE
        `<path d="M-10 392C90 372 180 364 260 352S380 318 426 302S490 276 508 270"/>` +
        // bridges + cross-town
        `<path d="M112 160C200 150 300 150 458 196M320 446C400 420 470 380 540 322M640 108C600 180 560 250 540 322M540 322C600 420 640 520 660 610M-10 220C40 190 80 170 112 160M320 446C300 500 290 560 286 610M640 108C700 90 760 80 810 76"/></g>`;
    }).join('') +
    `<path d="M396-10C420 90 440 160 478 232S560 330 640 400S760 470 820 486" fill="none" stroke="#ffd9a0" stroke-width="1" stroke-dasharray="7 9" opacity=".5"/>` +
    // rail line
    `<path d="M-10 540C200 520 420 560 600 590" fill="none" stroke="#56607e" stroke-width="2"/><path d="M-10 540C200 520 420 560 600 590" fill="none" stroke="#56607e" stroke-width="7" stroke-dasharray="1.500 9" opacity=".8"/>` +
    // ── landmarks ──
    // Carraway Mill (0.55,0.36) = 440,216
    `<g transform="translate(440 216) rotate(-24)"><rect x="-34" y="-22" width="68" height="46" fill="#000" opacity=".5" transform="translate(4 5)"/><rect x="-34" y="-22" width="68" height="46" fill="url(#${k}br)" stroke="#e8a060" stroke-width="1.500"/><rect x="-34" y="-22" width="20" height="46" fill="#000" opacity=".22"/><rect x="18" y="-34" width="14" height="14" fill="#7a3426" stroke="#e8a060" stroke-width="1"/></g>` +
    `<g stroke="#ffd9a0" stroke-width="1.800" fill="none" stroke-linecap="round"><path d="M440 222v-22M434 222l6-16 6 16"/><path d="M432 196q8-9 16 0M427 191q13-14 26 0" opacity=".8"/></g><circle cx="440" cy="199" r="2.200" fill="#ff5040"/>` +
    // Fennimore Ave apartment (0.24,0.56) = 192,336
    `<g transform="translate(192 336) rotate(-8)"><rect x="-17" y="-12" width="34" height="24" fill="#3a4a78" stroke="#ffc880" stroke-width="1.500"/><path d="M-17 0h34M-6-12v24M6-12v24" stroke="#1c2744" stroke-width="1.500"/><rect x="-3" y="-9" width="6" height="6" fill="#ffd98a"/></g>` +
    // Volt Repair (0.40,0.72) = 320,432
    `<g transform="translate(320 432) rotate(-20)"><rect x="-30" y="-8" width="60" height="16" fill="#2a3660" stroke="#8a5a34" stroke-width="1"/><rect x="-9" y="-8" width="18" height="16" fill="#3c5a8a" stroke="#ffc880" stroke-width="1.500"/><path d="M2-6l-5 6h5l-3 6" fill="none" stroke="#ffe067" stroke-width="1.800" stroke-linejoin="round"/><path d="M-20-8v16M20-8v16" stroke="#1c2744" stroke-width="1.500"/></g>` +
    // Hearth Audio tower (0.80,0.18) = 640,108
    `<g transform="translate(640 108) rotate(38)"><rect x="-20" y="-20" width="40" height="40" fill="#000" opacity=".5" transform="translate(7 7)"/><rect x="-20" y="-20" width="40" height="40" fill="#3a78a8" stroke="#bfe8ff" stroke-width="1.500"/><path d="M-20-7h40M-20 7h40M-7-20v40M7-20v40" stroke="#bfe8ff" stroke-width="1" opacity=".55"/><rect x="-7" y="-7" width="14" height="14" fill="#9ad8ff"/></g>` +
    // Suds & Duds (0.64,0.50) = 512,300, payphone outside
    `<g transform="translate(512 300) rotate(40)"><rect x="-16" y="-11" width="32" height="22" fill="#3a5a80" stroke="#ffc880" stroke-width="1.500"/><circle cx="-6" cy="0" r="4.500" fill="none" stroke="#bfe8ff" stroke-width="1.500"/><circle cx="7" cy="0" r="4.500" fill="none" stroke="#bfe8ff" stroke-width="1.500"/></g>` +
    `<g transform="translate(534 290)"><rect x="-5" y="-8" width="10" height="16" rx="2" fill="#0a1020" stroke="#7ad0ff" stroke-width="1.400"/><path d="M-2.500-3.500q2.500-3 5 0M-2.500 3h5" stroke="#7ad0ff" stroke-width="1.300" fill="none" stroke-linecap="round"/></g>` +
    // Wren Court (0.14,0.22) = 112,132
    `<g transform="translate(112 132) rotate(12)"><path d="M-18-16h36v32h-36zM-8-7v14h16v-14z" fill="#3a4a78" fill-rule="evenodd" stroke="#ffc880" stroke-width="1.500"/><circle r="3" fill="#2c6a4a"/></g>` +
    // St. Brigid's (0.84,0.78) = 672,468
    `<g transform="translate(672 468) rotate(12)"><rect x="-24" y="-18" width="48" height="36" fill="#000" opacity=".5" transform="translate(4 5)"/><path d="M-24-18h48v36h-16v-12h-16v12h-16z" fill="#d8dce8" stroke="#fff" stroke-width="1"/><path d="M-4-13h8v6h6v8h-6v6h-8v-6h-6v-8h6z" fill="#d8262c"/></g>` +
    `</g>` +
    // compass + scale
    `<g transform="translate(66 540)" opacity=".75"><circle r="24" fill="#0a0f20" stroke="#8a5a34" stroke-width="1"/><path d="M0-30l7 30-7 30-7-30z" fill="#131c36" stroke="#c98a4a" stroke-width="1"/><path d="M0-30l7 30h-14z" fill="#c98a4a"/><path d="M-30 0h60" stroke="#8a5a34" stroke-width="1"/></g>` +
    `<g transform="translate(120 572)" stroke="#c98a4a" stroke-width="1.500" opacity=".6"><path d="M0 0h80M0-4v8M40-3v6M80-4v8"/></g>`;
  return frame(k, 800, 600, defs, body, 0.1, 0.45);
}

// ───────────────────────────────────────────────────────────── people
// Bust parts drawn in the avatar coordinate space (200x200, face centred ~100,85).
const HEADP = 'M67 80C67 34 133 34 133 80C133 106 122 131 100 131C78 131 67 106 67 80Z';
const TORSO = 'M12 200C14 166 44 152 80 146H120C156 152 186 166 188 200Z';
const INK = '#1a1318';
/** Neck, ears, head with side shading and rim light. */
const hb = (skin: string, shade: string, rim = ''): string =>
  `<path d="M85 118V150Q100 162 115 150V118Z" fill="${shade}"/><path d="M85 124V149Q90 153 95 155L93 132Z" fill="${skin}" opacity=".55"/>` +
  `<ellipse cx="67" cy="94" rx="5" ry="9" fill="${skin}"/><ellipse cx="133" cy="94" rx="5" ry="9" fill="${shade}"/><path d="${HEADP}" fill="${skin}"/>` +
  `<path d="M109 37C105 60 109 72 106 84C104 97 111 103 108 112C106 122 104 128 99 131C122 131 133 106 133 80C133 60 126 44 109 37Z" fill="${shade}" opacity=".72"/>` +
  `<path d="M70 62Q80 50 96 48Q78 56 72 76Z" fill="#fff" opacity=".13"/>` +
  (rim ? `<path d="M131.500 68V80C131.500 105 121 129.500 100 129.500" fill="none" stroke="${rim}" stroke-width="2.200" opacity=".6"/>` : '');
type EyeKind = 'open' | 'wide' | 'laugh' | 'tired' | 'cold';
const eyes = (iris: string, kind: EyeKind = 'open'): string => {
  if (kind === 'laugh') return `<path d="M79.500 92Q87 85 94.500 92M105.500 92Q113 85 120.500 92" fill="none" stroke="${INK}" stroke-width="2.300" stroke-linecap="round"/>`;
  const one = (cx: number, white: string): string => {
    const r = kind === 'wide' ? 3.3 : 3;
    const top = kind === 'wide' ? 85.6 : kind === 'cold' || kind === 'tired' ? 88.4 : 86.8;
    return `<path d="M${cx - 7} 91.500Q${cx} ${top} ${cx + 7} 91Q${cx} 94.500 ${cx - 7} 91.500Z" fill="${white}"/><circle cx="${cx}" cy="${kind === 'wide' ? 90.2 : 90.7}" r="${r}" fill="${iris}"/><circle cx="${cx - 1.2}" cy="89.600" r=".9" fill="#fff"/>` +
      `<path d="M${cx - 7.5} 91.800Q${cx} ${top - 0.8} ${cx + 7.5} 91" fill="none" stroke="${INK}" stroke-width="1.900" stroke-linecap="round"/>` +
      (kind === 'tired' ? `<path d="M${cx - 6} 97Q${cx} 99.500 ${cx + 6} 96.500" fill="none" stroke="${INK}" stroke-width="1.100" opacity=".4" stroke-linecap="round"/>` : '');
  };
  return one(87, '#f1e9df') + one(113, '#b9ada6');
};
type BrowKind = 'flat' | 'soft' | 'up' | 'worry';
const brows = (col: string, kind: BrowKind = 'soft', w = 3.2): string => {
  const d = {
    soft: 'M77.500 79.500Q86 76.250 95 80M105 80Q114 76.250 122.500 79.500',
    flat: 'M77.500 81L95 82.500M105 82.500L122.500 81',
    up: 'M77 78Q86 72 95 77M105 77Q114 72 123 78',
    worry: 'M77.500 80.500Q85 74 95 74.500M105 74.500Q115 74 122.500 80.500',
  }[kind];
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
};
const nose = (col: string): string =>
  `<path d="M102 94Q105 104 105.500 108Q101 112 95 108.500" fill="none" stroke="${col}" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round"/>`;
type MouthKind = 'smile' | 'flat' | 'grin' | 'laugh' | 'lips';
const mouth = (kind: MouthKind, col: string): string => {
  if (kind === 'grin') return `<path d="M85.500 112.500Q100 117 114.500 112.500Q112 123 100 123Q88 123 85.500 112.500Z" fill="#fff" stroke="${col}" stroke-width="1.600" stroke-linejoin="round"/><path d="M88 117.500Q100 121 112 117.500" fill="none" stroke="${col}" stroke-width=".8" opacity=".5"/>`;
  if (kind === 'laugh') return `<path d="M86 111.500Q100 115 114 111.500Q113 127 100 127Q87 127 86 111.500Z" fill="#4a1418"/><path d="M87.500 112.300Q100 115.800 112.500 112.300L111.500 116.500Q100 119 88.500 116.500Z" fill="#fff"/><path d="M92 124Q100 119 108 124Q100 128 92 124Z" fill="#c8504e"/>`;
  if (kind === 'lips') return `<path d="M89.500 115Q95 111.500 100 113.500Q105 111.500 110.500 115Q100 122.500 89.500 115Z" fill="${col}"/><path d="M89.500 115Q100 116.500 110.500 115" fill="none" stroke="#000" stroke-width=".9" opacity=".4"/>`;
  return `<path d="${kind === 'smile' ? 'M90 115.500Q100 121 110 115.500' : 'M91 116.500Q100 118 109 116.500'}" fill="none" stroke="${col}" stroke-width="2.400" stroke-linecap="round"/>`;
};

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

// Cass — bleached choppy bob, dark roots, yellow raincoat, headphones
const CASS = { skin: '#e8b895', shade: '#b47c62', hair: '#eadfb4', hairSh: '#b9a878', root: '#4a3826' };
const cassHairBack = `<path d="M58 96C50 44 82 26 102 26C132 26 150 48 142 98L147 130L137 123L133 136L124 124H76L67 136L63 123L53 130Z" fill="${CASS.hair}"/><path d="M110 28C142 36 148 70 142 98L147 130L137 123L133 136L124 124H112Z" fill="${CASS.hairSh}"/>`;
const cassHairFront = `<path d="M65 86C58 44 84 30 104 31C126 32 142 50 135 86L130 68L124 80L117 60L108 76L99 57L90 76L83 62L76 80L70 70Z" fill="${CASS.hair}"/>` +
  `<path d="M74 50Q100 26 130 50Q116 40 101 40Q84 40 74 50Z" fill="${CASS.root}"/><path d="M68 62Q100 28 134 62Q120 44 101 44Q82 44 68 62Z" fill="${CASS.root}" opacity=".4"/>`;
function avCass(): string {
  const k = 'av_c2_cass';
  return avatar(k, {
    bg: ['#5a56a8', '#2a2760', '#0b0a20'], rim: '#ffb060', torso: Y, back: cassHairBack,
    inTorso: `<path d="M100 168V200" stroke="${YD}" stroke-width="3"/><circle cx="92" cy="186" r="2.500" fill="${YD}"/><path d="M30 176Q50 164 70 166" fill="none" stroke="${YL}" stroke-width="3" opacity=".7" stroke-linecap="round"/>`,
    front: hb(CASS.skin, CASS.shade, '#ffb060') +
      // raincoat collar
      `<path d="M72 152L87 138L98 166L80 174Z" fill="${YL}"/><path d="M128 152L113 138L102 166L120 174Z" fill="${YD}"/>` +
      // headphones round the neck
      `<path d="M72 146Q100 176 128 146" fill="none" stroke="#1c1c26" stroke-width="7" stroke-linecap="round"/>` +
      `<rect x="58" y="132" width="20" height="34" rx="9" fill="#23232e" transform="rotate(12 68 149)"/><rect x="62" y="138" width="11" height="22" rx="5" fill="#f2701c" transform="rotate(12 68 149)"/>` +
      `<rect x="122" y="132" width="20" height="34" rx="9" fill="#15151c" transform="rotate(-12 132 149)"/><rect x="127" y="138" width="11" height="22" rx="5" fill="#a84a10" transform="rotate(-12 132 149)"/>` +
      eyes('#4a6a80', 'wide') + brows('#6a5236', 'worry', 2.8) + nose('#8a5a48') + mouth('grin', '#7a3a34') +
      `<path d="M83 110Q80 114 82 119M117 110Q120 114 118 119" fill="none" stroke="#8a5a48" stroke-width="1.200" opacity=".6" stroke-linecap="round"/>` +
      cassHairFront,
  });
}

// Ada — night-shift nurse, navy scrubs, hair up, owl pin on lanyard
const ADA = { skin: '#b9794f', shade: '#875034', hair: '#1c1412' };
const adaHair = `<path d="M65 86C59 46 82 31 100 31C120 31 141 46 135 86C131 64 120 52 100 51C82 52 69 64 65 86Z" fill="${ADA.hair}"/><path d="M80 44Q98 36 116 42" fill="none" stroke="#4a3830" stroke-width="2" stroke-linecap="round"/>`;
function avAda(): string {
  const k = 'av_c2_ada';
  return avatar(k, {
    bg: ['#4a94a4', '#1c4854', '#07151a'], rim: '#a8f0e0', torso: '#27447a',
    back: `<circle cx="100" cy="26" r="17" fill="${ADA.hair}"/><path d="M90 20Q100 12 110 20" fill="none" stroke="#4a3830" stroke-width="2"/><path d="M86 38h28" stroke="#d8525e" stroke-width="5" stroke-linecap="round"/>`,
    inTorso: `<path d="M83 146L100 178L117 146Z" fill="${ADA.skin}"/><path d="M83 146L100 178L117 146" fill="none" stroke="#1a2f58" stroke-width="3"/><rect x="128" y="172" width="22" height="26" rx="2" fill="#1f3866"/>` +
      `<path d="M86 147L96 200M114 147L104 200" stroke="#e8e2d0" stroke-width="3.400"/>` +
      `<g transform="translate(92 172)"><circle r="8.500" fill="#e0a03c" stroke="#7a4a10" stroke-width="1.200"/><path d="M-7-6L-3-3M7-6L3-3" stroke="#7a4a10" stroke-width="2" stroke-linecap="round"/><circle cx="-3.200" cy="-.500" r="2.600" fill="#fff"/><circle cx="3.200" cy="-.500" r="2.600" fill="#fff"/><circle cx="-3.200" cy="-.500" r="1.100" fill="#1a1010"/><circle cx="3.200" cy="-.500" r="1.100" fill="#1a1010"/><path d="M-1.300 3L0 5.500L1.300 3Z" fill="#7a4a10"/></g>`,
    front: hb(ADA.skin, ADA.shade, '#a8f0e0') + eyes('#3a2418', 'tired') + brows('#2a1c18', 'soft', 2.8) + nose('#6a3c28') + mouth('smile', '#6e2e2a') + adaHair +
      `<path d="M66 84Q62 100 68 112M134 84Q138 100 132 112" fill="none" stroke="${ADA.hair}" stroke-width="2" stroke-linecap="round"/>`,
  });
}

// Gideon Pell — silver swept-back hair, tan, navy blazer, cold smile
function avPell(): string {
  const k = 'av_c2_pell';
  const skin = '#cf8c5a', shade = '#9a5c34';
  return avatar(k, {
    bg: ['#a48c5a', '#4e3f26', '#15100a'], rim: '#ffe2a0', torso: '#1e2b4c',
    inTorso: `<path d="M84 146L100 180L116 146Z" fill="${skin}"/><path d="M92 160Q100 166 108 160" fill="none" stroke="${shade}" stroke-width="1.200" opacity=".7"/>` +
      `<path d="M76 148L86 143L100 190L90 200H78ZM124 148L114 143L100 190L110 200H122Z" fill="#2a3a64"/><path d="M60 176l16-3v6z" fill="#e8dcc0"/>`,
    front: hb(skin, shade, '#ffe2a0') +
      `<path d="M73 152L88 136L98 166L84 172Z" fill="#f4f1ea"/><path d="M127 152L112 136L102 166L116 172Z" fill="#b9b6b0"/>` +
      `<path d="M65 80L63 104Q69 98 70 84ZM135 80L137 104Q131 98 130 84Z" fill="#c2c7cf"/>` +
      eyes('#5a7a8a', 'cold') + brows('#9a9ea6', 'flat', 3.2) + nose('#8a5030') + mouth('grin', '#7a3c2c') +
      `<path d="M82 106Q78 113 81 121M118 106Q122 113 119 121M74 92l-4 3M74 96l-4-1M126 92l4 3" fill="none" stroke="#8a5030" stroke-width="1.200" opacity=".7" stroke-linecap="round"/>` +
      `<path d="M64 86C57 42 84 27 106 28C130 29 145 48 136 86C135 66 127 52 111 47C92 42 71 58 64 86Z" fill="#d6dae0"/>` +
      `<path d="M72 60Q88 38 116 36M78 66Q92 46 120 44M86 70Q98 54 124 54" fill="none" stroke="#8d939c" stroke-width="2" stroke-linecap="round"/><path d="M112 30C132 36 142 54 136 86C135 66 127 52 111 47Z" fill="#000" opacity=".2"/>`,
  });
}

// Mothwing — hood, dashboard glow, only a smile
function avMoth(): string {
  const k = 'av_c2_moth';
  return avatar(k, {
    bg: ['#2c2a52', '#131226', '#040409'], rim: '#6af0d0', torso: '#272a3a',
    defs: lg(`${k}-f`, [[0.5, '#3a8a80', 0], [0.78, '#58b0a0', 0.75], [1, '#b8f0d8', 1]]) + rg(`${k}-d`, [[0, '#6af0d0', 0.55], [1, '#6af0d0', 0]], 0.5, 1, 0.6) +
      `<clipPath id="${k}-h"><path d="${HEADP}"/></clipPath>`,
    back: `<rect width="200" height="200" fill="url(#${k}-d)"/><g stroke="#b9c4f0" stroke-width="1.200" opacity=".25" stroke-linecap="round"><path d="M30 20l-3 16M160 30l-3 16M176 90l-3 16M20 100l-3 16M150 8l-2 10"/></g>`,
    inTorso: `<path d="M90 156L88 196M110 156L112 196" stroke="#c8c8d0" stroke-width="2.200" stroke-linecap="round"/><path d="M20 200Q60 168 100 176Q140 168 180 200Z" fill="#6af0d0" opacity=".12"/>`,
    front:
      `<path d="M46 156C36 70 68 18 100 18C132 18 164 70 154 156L138 164H62Z" fill="#2f3246"/><path d="M104 19C134 24 162 70 154 156L138 164H112Z" fill="#000" opacity=".3"/>` +
      `<path d="M62 100C60 50 140 50 138 100C138 128 124 146 100 146C76 146 62 128 62 100Z" fill="#06060b"/>` +
      `<path d="M85 122V150Q100 160 115 150V122Z" fill="#0d1a1c"/><path d="${HEADP}" fill="#0b0d14"/><g clip-path="url(#${k}-h)"><rect x="60" y="34" width="80" height="100" fill="url(#${k}-f)"/></g>` +
      `<path d="M84 111Q100 118 116 111Q112 125 100 125Q88 125 84 111Z" fill="#f4fff8"/><path d="M84 111Q100 118 116 111" fill="none" stroke="#0b2a26" stroke-width="1.500"/><path d="M87 116.500Q100 122 113 116.500" fill="none" stroke="#0b2a26" stroke-width=".8" opacity=".5"/>` +
      `<path d="M62 100C60 50 140 50 138 100" fill="none" stroke="#454a66" stroke-width="5"/><path d="M62 102C62 128 76 146 100 146C124 146 138 128 138 102" fill="none" stroke="#6af0d0" stroke-width="2" opacity=".5"/>` +
      // moth-wing enamel pin
      `<g transform="translate(142 62) rotate(18)"><path d="M0 0C-6-12-20-12-19-2C-18 5-8 5 0 1C-6 6-13 10-9 15C-4 18 0 10 0 3Z" fill="#f0e2c0" stroke="#c8922a" stroke-width="1.200"/><path d="M0 0C6-12 20-12 19-2C18 5 8 5 0 1C6 6 13 10 9 15C4 18 0 10 0 3Z" fill="#e9a23a" stroke="#c8922a" stroke-width="1.200"/><circle cx="-11" cy="-3" r="2.500" fill="#5a3a5a"/><circle cx="11" cy="-3" r="2.500" fill="#5a3a5a"/><path d="M0-4V14" stroke="#3a2418" stroke-width="2.200" stroke-linecap="round"/></g>`,
  });
}

// Rhea Castell — sleek dark hair, statement earrings, bright lipstick, Hearth cup
function avRhea(): string {
  const k = 'av_c2_rhea';
  const skin = '#c98f68', shade = '#965e40';
  return avatar(k, {
    bg: ['#c0506e', '#5e1f40', '#180812'], rim: '#ffc6a0', torso: '#ece4d6',
    back: `<path d="M60 100C50 40 84 23 102 23C132 23 150 44 140 100C142 130 147 150 143 170H57C53 150 58 130 60 100Z" fill="#121018"/><path d="M108 24C146 34 146 80 140 100C142 130 147 150 143 170H118Z" fill="#000" opacity=".3"/>`,
    inTorso: `<path d="M82 146L100 184L118 146Z" fill="#17131c"/><path d="M76 148L86 143L100 190L90 200H78ZM124 148L114 143L100 190L110 200H122Z" fill="#d4cab8"/>`,
    front: hb(skin, shade, '#ffc6a0') +
      eyes('#3a2a1c') + `<path d="M79 90.500L75 88M121 89.500L125 87" stroke="${INK}" stroke-width="1.800" stroke-linecap="round"/>` + brows('#1a1318', 'soft', 2.6) + nose('#7a4830') + mouth('lips', '#e3203c') +
      `<path d="M65 90C59 44 84 29 100 29C118 29 141 44 135 90C133 66 122 46 100 39C80 46 67 66 65 90Z" fill="#121018"/><path d="M100 30V39" stroke="#3a3440" stroke-width="1.500"/><path d="M74 60Q82 44 96 38" fill="none" stroke="#5a5466" stroke-width="2.400" stroke-linecap="round"/>` +
      // earrings
      `<g fill="#f0b83a" stroke="#8a5a10" stroke-width=".8"><circle cx="66" cy="107" r="3.500"/><path d="M66 111L59 128H73Z"/><circle cx="134" cy="107" r="3.500"/><path d="M134 111L127 128H141Z"/></g><circle cx="66" cy="124" r="1.800" fill="#e3203c"/><circle cx="134" cy="124" r="1.800" fill="#e3203c"/>` +
      // coffee cup with flame logo
      `<g transform="translate(-24 -16) rotate(6 166 170)"><path d="M146 152h40l-5 52h-30z" fill="#f6f1e8"/><path d="M148 166h36l-2.500 26h-31z" fill="#3a2a22"/><rect x="143" y="145" width="46" height="9" rx="3" fill="#2a2226"/><path d="M165 189q-8-6-3-15q1 5 4 5q-2-8 3-12q7 9 4 16q-2 6-8 6z" fill="#f2701c"/><path d="M178 154l-4 50h7l5-50z" fill="#000" opacity=".15"/></g>` +
      `<path d="M122 200q-6-20 4-30l30 6q8 12 4 24z" fill="${skin}"/><path d="M126 176q14-4 30 0M125 184q16-4 34 0" fill="none" stroke="${shade}" stroke-width="1.500"/>`,
  });
}

// Benny Szabo — bald, loupe on forehead, grey mustache, cardigan, soldering iron behind ear
function avBenny(): string {
  const k = 'av_c2_benny';
  const skin = '#dcae8e', shade = '#a8765c';
  return avatar(k, {
    bg: ['#8e8250', '#403c22', '#100e08'], rim: '#ffd9a0', torso: '#6e4a3a',
    defs: `<pattern id="${k}-p" width="6" height="8" patternUnits="userSpaceOnUse"><path d="M0 0L3 6L6 0" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="1.200"/></pattern>`,
    inTorso: `<rect y="140" width="200" height="60" fill="url(#${k}-p)"/><path d="M82 146L100 182L118 146Z" fill="#c8d4dc"/><path d="M100 164V182" stroke="#8a98a4" stroke-width="1.500"/>` +
      `<path d="M76 148L84 144L100 186V200H84Z" fill="#7e5846"/><path d="M124 148L116 144L100 186V200H116Z" fill="#553828"/><circle cx="100" cy="194" r="3" fill="#e0c890"/>`,
    front:
      // soldering iron tucked behind the ear
      `<g transform="rotate(32 136 96)"><rect x="132" y="42" width="5" height="26" fill="#b9bcc0"/><path d="M133 42l1.500-10 1.500 10z" fill="#e8e0d0"/><rect x="129" y="66" width="11" height="40" rx="4" fill="#2a5a8a"/><rect x="129" y="72" width="11" height="4" fill="#e0a03c"/></g>` +
      hb(skin, shade, '#ffd9a0') +
      `<path d="M73 152L88 138L96 160L82 166Z" fill="#dfe8ee"/><path d="M127 152L112 138L104 160L118 166Z" fill="#9aa8b4"/>` +
      `<path d="M64 82Q59 96 65 108L70 90ZM136 82Q141 96 135 108L130 90Z" fill="#c4c4c4"/>` +
      `<path d="M78 52Q92 42 108 46" fill="none" stroke="#fff" stroke-width="5" opacity=".22" stroke-linecap="round"/><path d="M80 66Q100 62 120 66M84 72Q100 69 116 72" fill="none" stroke="${shade}" stroke-width="1" opacity=".6"/>` +
      eyes('#4a5a44') + brows('#b8b8b8', 'soft', 4) + nose('#8a5a44') +
      `<path d="M94 121Q100 124 106 121" fill="none" stroke="#7a4438" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M82 113Q90 103 100 108Q110 103 118 113Q110 120 100 114Q90 120 82 113Z" fill="#d0d0d0"/><path d="M100 108V114M90 109L88 116M110 109L112 116" stroke="#8a8a8a" stroke-width="1" opacity=".7"/>` +
      `<path d="M74 92l-4 3M74 96l-4-1M126 92l4 3M126 96l4-1" stroke="${shade}" stroke-width="1.200" stroke-linecap="round"/>` +
      // loupe headband
      `<path d="M67 62Q100 48 133 62" fill="none" stroke="#2a2420" stroke-width="6"/><g transform="rotate(-8 84 56)"><rect x="72" y="42" width="24" height="24" rx="5" fill="#1c1a1c"/><circle cx="84" cy="54" r="8.500" fill="#7ac0d8" stroke="#b9bcc0" stroke-width="2"/><path d="M79 51Q82 47 87 48" fill="none" stroke="#fff" stroke-width="1.800" opacity=".8" stroke-linecap="round"/></g>`,
  });
}

// ───────────────────────────────────────────────────────────── photo figures
const TORSO_L = 'M12 420V200C14 166 44 152 80 146H120C156 152 186 166 188 200V420Z';
/** Places an avatar-space bust (face centre 100,85) into a photo. */
const bust = (x: number, y: number, s: number, rot: number, inner: string): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-100 -85)">${inner}</g>`;
const JON = { skin: '#c08458', shade: '#8a573a', beard: '#2a1a14', cap: '#9a3230', capD: '#6e2222' };
/** Jonah: beard, beanie. `top` is the garment colour. */
function jonah(top: string, topD: string, extra: string, rim = ''): string {
  return `<path d="${TORSO_L}" fill="${top}"/><path d="M104 146H120C156 152 186 166 188 200V420H112Z" fill="#000" opacity=".25"/>${extra}` +
    hb(JON.skin, JON.shade, rim) +
    `<path d="M72 152L87 138L97 164L80 172Z" fill="${top}"/><path d="M128 152L113 138L103 164L120 172Z" fill="${topD}"/>` +
    eyes('#3a2418', 'laugh') + brows('#2a1a14', 'up', 3.4) + nose('#6e3e28') +
    `<path d="M66 88C67 122 80 137 100 137C120 137 133 122 134 88C130 101 123 106 113 104Q100 99 87 104C77 106 70 101 66 88Z" fill="${JON.beard}"/>` +
    mouth('laugh', '#4a1418') +
    `<path d="M63 80C58 38 84 23 100 23C118 23 142 38 137 80Q100 62 63 80Z" fill="${JON.cap}"/><path d="M61 84Q100 66 139 84L139 70Q100 52 61 70Z" fill="${JON.capD}"/>` +
    `<path d="M70 68v12M80 64v12M90 61v12M100 60v12M110 61v12M120 64v12M130 68v12" stroke="#000" stroke-width="1.500" opacity=".3"/><path d="M76 40Q90 28 106 28" fill="none" stroke="#fff" stroke-width="3" opacity=".18" stroke-linecap="round"/>`;
}
/** Small round owl patch / mark. */
const owlPatch = (x: number, y: number, r: number): string =>
  `<g transform="translate(${x} ${y}) scale(${r / 10})"><circle r="10" fill="#e9d9a8" stroke="#3a2418" stroke-width="1.500"/><path d="M-7-7L-3-3M7-7L3-3" stroke="#3a2418" stroke-width="2" stroke-linecap="round"/><circle cx="-3.500" cy="-.500" r="3" fill="#e9a23a" stroke="#3a2418"/><circle cx="3.500" cy="-.500" r="3" fill="#e9a23a" stroke="#3a2418"/><path d="M-1.500 3.500L0 6.500L1.500 3.500Z" fill="#3a2418"/></g>`;
/** Open hand, palm to camera, wrist at the bottom (about 56 x 86). */
const hand = (x: number, y: number, s: number, rot: number, skin: string, paint = ''): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M-22 12C-25-4-27-18-22-22C-17-25-14-18-13-8L-14-42C-14-51-5-51-5-42L-4-14L-2-50C-2-59 7-59 7-50L6-14L10-44C11-52 19-51 19-43L15-8C21-17 28-22 32-18C35-14 26-2 21 10C18 26 10 34-2 34C-15 34-21 24-22 12Z" fill="${skin}"/>` +
  `<path d="M-14-10L-13 4M-4-14L-4 2M6-14L5 2" stroke="#000" stroke-width="1.200" opacity=".18"/>` +
  (paint ? `<g fill="${paint}"><path d="M-14-42C-14-51-5-51-5-42L-5-30Q-10-26-14-31ZM-2-50C-2-59 7-59 7-50L6-34Q2-30-2-36ZM10-44C11-52 19-51 19-43L17-28Q13-26 10-32Z"/><path d="M-12 8Q0-4 12 6Q14 20 0 24Q-12 22-12 8Z"/><circle cx="24" cy="-10" r="4"/></g>` : '') + `</g>`;
const cassBust = (rim: string, extra = ''): string =>
  cassHairBack + `<path d="${TORSO_L}" fill="${Y}"/><path d="M104 146H120C156 152 186 166 188 200V420H112Z" fill="${YD}" opacity=".55"/><path d="M100 168V420" stroke="${YD}" stroke-width="3"/><path d="M28 180Q50 164 72 166" fill="none" stroke="${YL}" stroke-width="4" stroke-linecap="round"/>` +
  hb(CASS.skin, CASS.shade, rim) + `<path d="M72 152L87 138L98 166L80 174Z" fill="${YL}"/><path d="M128 152L113 138L102 166L120 174Z" fill="${YD}"/>` +
  eyes('#4a6a80', 'laugh') + brows('#6a5236', 'up', 2.8) + nose('#8a5a48') + mouth('laugh', '#4a1418') + cassHairFront + extra;

// ───────────────────────────────────────────────────────────── c2_ph_duo
function phDuo(): string {
  const k = 'c2_ph_duo';
  const R = rng(5);
  const defs =
    lg(`${k}sky`, [[0, '#070818'], [0.6, '#1c1a44'], [1, '#5a3048']]) +
    brick(`${k}br`, 50, 20, '#1c1218', ['#6e3327', '#7c3c2b', '#5d2a24']) +
    rg(`${k}gl`, [[0, '#ffd98a', 0.8], [0.35, '#ffb45a', 0.28], [1, '#ff9a3a', 0]]) +
    rg(`${k}fl`, [[0, '#fff', 0.2], [1, '#fff', 0]]) +
    lg(`${k}bd`, [[0, '#24474f'], [1, '#17323a']]) +
    tex(`${k}wd`, 0.012, 0.5, '0.04 0.03 0.02', -2.4, 1.3, 9) + bl(`${k}b9`, 9);
  const body =
    `<rect width="800" height="600" fill="url(#${k}sky)"/>` + skyline(R, -10, 810, 470, 30, 130, '#120e22', '#ffb45a', 0.07) +
    `<rect x="170" width="500" height="470" fill="url(#${k}br)"/><rect x="170" width="500" height="470" fill="#0a0818" opacity=".35"/><rect x="158" width="14" height="470" fill="#150d14"/>` +
    `<rect y="462" width="800" height="138" fill="#0c0a14"/>` +
    board(k, 258, 60, 300, 150) +
    `<g ${SERIF} font-weight="700" fill="#fbfaf2" text-anchor="middle"><text x="408" y="108" font-size="33" textLength="262" lengthAdjust="spacingAndGlyphs">THE OWL HOURS</text><text x="408" y="184" font-size="70" textLength="262" lengthAdjust="spacingAndGlyphs">104.3 FM</text></g>` +
    `<path d="M280 122h256" stroke="#e0a03c" stroke-width="4" stroke-linecap="round"/><g fill="#fbfaf2"><rect x="322" y="184" width="5" height="18" rx="2.500"/><rect x="452" y="184" width="5" height="26" rx="2.500"/></g>` +
    fairy(`${k}gl`, [[-20, 6], [180, 30], [400, 12], [620, 34], [820, 4]], 30, 3, 5, 30) +
    // Jonah's selfie arm + raised painted hand
    `<path d="M150 560L-20 640" stroke="#2f4a44" stroke-width="130" stroke-linecap="round"/>` +
    `<path d="M120 600Q70 500 92 380" fill="none" stroke="#2f4a44" stroke-width="64" stroke-linecap="round"/>` + hand(92, 322, 1.25, -12, JON.skin, '#fbfaf2') +
    // Cass's raised painted hand
    `<path d="M700 610Q760 500 722 372" fill="none" stroke="${Y}" stroke-width="68" stroke-linecap="round"/><path d="M728 600Q776 500 746 380" fill="none" stroke="${YD}" stroke-width="16" stroke-linecap="round" opacity=".6"/>` + hand(716, 312, 1.2, 10, CASS.skin, '#fbfaf2') +
    bust(292, 372, 2.05, 5, jonah('#2f4a44', '#1f3430', owlPatch(52, 190, 13), '#ffb060')) +
    bust(548, 392, 1.95, -6, cassBust('#ffb060', `<path d="M76 104q6-4 10 2-4 5-10-2z" fill="#fbfaf2"/>`)) +
    `<ellipse cx="410" cy="400" rx="420" ry="300" fill="url(#${k}fl)"/>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.62);
}

// ───────────────────────────────────────────────────────────── c2_ph_festival
function phFestival(): string {
  const k = 'c2_ph_festival';
  const R = rng(61);
  const defs =
    lg(`${k}sky`, [[0, '#141631'], [0.5, '#33264f'], [1, '#553450']]) +
    rg(`${k}m`, [[0, '#ff5aa8', 0.9], [1, '#ff5aa8', 0]]) + rg(`${k}t`, [[0, '#5ae0e8', 0.85], [1, '#5ae0e8', 0]]) + rg(`${k}a`, [[0, '#ffc060', 0.9], [1, '#ffc060', 0]]) +
    bl(`${k}b9`, 9) + bl(`${k}b3`, 3);
  let crowd = '';
  for (let i = 0; i < 12; i++) {
    const x = i * 56 - 10 + R() * 20, y = 560 + R() * 60;
    crowd += `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(22 + R() * 8)}"/><rect x="${n1(x - 30)}" y="${n1(y + 16)}" width="60" height="260" rx="20"/>`;
    if (R() < 0.5) crowd += `<rect x="${n1(x + 18)}" y="${n1(y - 90)}" width="13" height="120" rx="6" transform="rotate(${n1(R() * 24 - 6)} ${n1(x)} ${n1(y)})"/>`;
  }
  const hood =
    `<path d="M46 158C36 70 68 14 100 14C132 14 164 70 154 158L138 166H62Z" fill="${Y}"/><path d="M106 15C134 20 164 70 154 158L138 166H118Z" fill="${YD}" opacity=".5"/>` +
    `<path d="M62 100C60 48 140 48 138 100C138 130 124 150 100 150C76 150 62 130 62 100Z" fill="#7a5a08"/>`;
  const cass =
    hood + `<path d="${TORSO_L}" fill="${Y}"/><path d="M104 146H120C156 152 186 166 188 200V420H112Z" fill="${YD}" opacity=".5"/><path d="M100 160V420" stroke="${YD}" stroke-width="3"/>` +
    `<circle cx="94" cy="186" r="3" fill="#d8dce0"/><circle cx="94" cy="214" r="3" fill="#d8dce0"/><path d="M30 184Q52 166 74 168" fill="none" stroke="${YL}" stroke-width="4" stroke-linecap="round"/>` +
    hb(CASS.skin, CASS.shade) + eyes('#4a6a80', 'laugh') + brows('#6a5236', 'up', 2.8) + nose('#8a5a48') + mouth('laugh', '#4a1418') + cassHairFront +
    `<path d="M54 106C50 40 80 14 100 14C120 14 150 40 146 106C142 64 124 52 100 52C76 52 58 64 54 106Z" fill="${Y}"/><path d="M58 96C60 62 76 52 100 52C124 52 140 62 142 96" fill="none" stroke="${YL}" stroke-width="3" opacity=".8"/>` +
    `<path d="M74 150L88 140L98 168L82 176Z" fill="${YL}"/><path d="M126 150L112 140L102 168L118 176Z" fill="${YD}"/><path d="M90 158l-3 34M110 158l3 34" stroke="#f4efe0" stroke-width="2" stroke-linecap="round"/>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}sky)"/>` +
    // stage wash
    `<g filter="url(#${k}b9)"><path d="M120 110L-40 620H240z" fill="#ff5aa8" opacity=".2"/><path d="M470 110L330 640H660z" fill="#5ae0e8" opacity=".18"/><path d="M300 110L200 560H420z" fill="#ffc060" opacity=".16"/>` +
    `<circle cx="120" cy="150" r="90" fill="url(#${k}m)"/><circle cx="470" cy="160" r="110" fill="url(#${k}t)"/><circle cx="300" cy="130" r="70" fill="url(#${k}a)"/><circle cx="560" cy="330" r="46" fill="url(#${k}a)" opacity=".7"/><circle cx="30" cy="380" r="40" fill="url(#${k}t)" opacity=".6"/></g>` +
    `<g fill="#fff"><circle cx="120" cy="150" r="9"/><circle cx="470" cy="160" r="10"/><circle cx="300" cy="130" r="8"/></g>` +
    // truss
    `<rect y="22" width="600" height="50" fill="#0c0b16"/><path d="M0 26l40 42 40-42 40 42 40-42 40 42 40-42 40 42 40-42 40 42 40-42 40 42 40-42 40 42 40-42 40 42" fill="none" stroke="#3a3850" stroke-width="3"/>` +
    // banner
    `<g transform="rotate(-3 290 110)"><path d="M70 70v10M510 70v10" stroke="#0c0b16" stroke-width="3"/><rect x="54" y="78" width="474" height="70" fill="#efe6d0"/><rect x="54" y="78" width="474" height="70" fill="#5a3a6a" opacity=".22"/><rect x="54" y="78" width="474" height="7" fill="#d8483c"/><rect x="54" y="141" width="474" height="7" fill="#d8483c"/>` +
    `<text x="291" y="131" ${SANS} font-weight="900" font-size="46" fill="#1c2458" text-anchor="middle" textLength="430" lengthAdjust="spacingAndGlyphs">RIVERBEND FEST</text></g>` +
    `<g fill="#0b0a16" filter="url(#${k}b3)" opacity=".92">${crowd}</g>` +
    // raised arms
    `<g stroke-linecap="round" fill="none"><path d="M176 640Q96 520 104 300" stroke="${Y}" stroke-width="82"/><path d="M424 640Q504 520 496 300" stroke="${Y}" stroke-width="82"/><path d="M452 640Q532 520 524 310" stroke="${YD}" stroke-width="22" opacity=".55"/><path d="M82 560Q70 440 82 320" stroke="${YL}" stroke-width="6" opacity=".8"/>` +
    `<path d="M104 292v-14M496 292v-14" stroke="${YD}" stroke-width="84" stroke-linecap="butt"/></g>` +
    hand(104, 226, 1.5, -8, CASS.skin) + hand(496, 226, 1.5, 8, CASS.shade) +
    bust(300, 452, 2.15, 0, cass) +
    // rain
    rain(R, 600, 800, 120, '#dfe8ff', 0.42, 40, -0.12) +
    `<g fill="#fff" opacity=".7">${Array.from({ length: 16 }, () => `<circle cx="${n1(150 + R() * 300)}" cy="${n1(260 + R() * 500)}" r="${n1(1.5 + R() * 2)}"/>`).join('')}</g>`;
  return frame(k, 600, 800, defs, body, 0.18, 0.5);
}

// ───────────────────────────────────────────────────────────── c2_ph_mothcar
function phMothcar(): string {
  const k = 'c2_ph_mothcar';
  const R = rng(88);
  const defs =
    lg(`${k}sky`, [[0, '#090a1c'], [0.55, '#2a2046'], [0.85, '#8a4a34'], [1, '#c8743a']]) +
    lg(`${k}dash`, [[0, '#23202c'], [0.3, '#131118'], [1, '#07060a']]) +
    rg(`${k}win`, [[0, '#ffe2a0', 0.95], [0.3, '#ffb050', 0.45], [1, '#ffb050', 0]]) +
    rg(`${k}or`, [[0, '#ffa040', 0.8], [1, '#ffa040', 0]]) +
    rg(`${k}rd`, [[0, '#6af0d0', 0.4], [1, '#6af0d0', 0]]) +
    lg(`${k}th`, [[0, '#1c4a3a'], [0.35, '#3a8a6a'], [0.6, '#1c4a3a'], [1, '#0c2a20']], 1, 0) +
    lg(`${k}st`, [[0, '#70787e'], [0.35, '#d8e0e4'], [0.6, '#8a9298'], [1, '#3a4046']], 1, 0) +
    bl(`${k}b9`, 9) + bl(`${k}b3`, 3) +
    `<clipPath id="${k}ws"><path d="M70 30H730L790 372H10z"/></clipPath>`;
  let drops = '';
  for (let i = 0; i < 44; i++) {
    const x = 20 + R() * 760, y = 30 + R() * 330, r = 2.5 + R() * 4.5;
    drops += `<ellipse cx="${n1(x)}" cy="${n1(y)}" rx="${n1(r)}" ry="${n1(r * 1.3)}"/>`;
  }
  let runs = '';
  for (let i = 0; i < 14; i++) { const x = 40 + R() * 720, y = 30 + R() * 200; runs += `M${n1(x)} ${n1(y)}q${n1(R() * 8 - 4)} ${n1(30 + R() * 40)} ${n1(R() * 6 - 3)} ${n1(70 + R() * 90)}`; }
  const body =
    `<rect width="800" height="600" fill="#050409"/>` +
    `<g clip-path="url(#${k}ws)"><rect width="800" height="380" fill="url(#${k}sky)"/>` +
    `<g filter="url(#${k}b3)">` +
    `<g filter="url(#${k}b9)"><circle cx="130" cy="250" r="70" fill="url(#${k}or)"/><circle cx="700" cy="270" r="60" fill="url(#${k}or)"/></g>` +
    // the mill
    `<g fill="#0a0812"><path d="M250 380V170h330v210zM276 170l6-110h26l6 110zM244 162h342v12H244z"/><rect x="392" y="118" width="96" height="46"/><path d="M384 120l56-20 56 20z"/><path d="M510 164L514 20h6l4 144z"/><path d="M490 50h54v5h-54zM498 76h38v4h-38z"/></g>` +
    `<g fill="#1a1626"><path d="M280 200h22v34h-22zM330 200h22v34h-22zM380 200h22v34h-22zM430 200h22v34h-22zM480 200h22v34h-22zM530 200h22v34h-22zM280 262h22v34h-22zM330 262h22v34h-22zM380 262h22v34h-22zM430 262h22v34h-22zM480 262h22v34h-22zM530 262h22v34h-22z"/></g>` +
    `<circle cx="440" cy="142" r="60" fill="url(#${k}win)"/><rect x="424" y="130" width="32" height="24" fill="#ffe0a0"/><circle cx="517" cy="20" r="6" fill="#ff4030"/>` +
    `<rect y="340" width="800" height="40" fill="#07060c"/></g>` +
    // rain on the glass
    `<path d="${runs}" fill="none" stroke="#cfd8ff" stroke-width="2" opacity=".28" stroke-linecap="round"/><g fill="#cfd8ff" opacity=".3">${drops}</g>` +
    `<g fill="#fff" opacity=".5">${Array.from({ length: 22 }, () => `<circle cx="${n1(20 + R() * 760)}" cy="${n1(40 + R() * 320)}" r="1.300"/>`).join('')}</g>` +
    `<path d="M120 372L420 330M470 372L760 338" stroke="#050409" stroke-width="7" stroke-linecap="round"/></g>` +
    // roof header, mirror, pillars
    `<path d="M0 0H800V40L730 30H70L0 40Z" fill="#08070c"/><path d="M0 0H70L10 380H0zM800 0H730L790 380H800z" fill="#0b0a10"/><rect x="330" y="26" width="140" height="44" rx="10" fill="#0b0a10"/><rect x="338" y="32" width="124" height="30" rx="6" fill="#1c1a2c"/>` +
    // dashboard
    `<path d="M0 372Q200 330 400 352T800 362V600H0Z" fill="url(#${k}dash)"/><path d="M0 372Q200 330 400 352T800 362" fill="none" stroke="#c8743a" stroke-width="2" opacity=".5"/>` +
    `<path d="M40 372Q190 300 350 356" fill="#131118"/>` +
    // steering wheel
    `<circle cx="190" cy="590" r="180" fill="none" stroke="#050409" stroke-width="40"/><circle cx="190" cy="590" r="180" fill="none" stroke="#2a2834" stroke-width="3" stroke-dasharray="120 900" stroke-dashoffset="-700"/><path d="M190 590L60 470M190 590L320 470" stroke="#050409" stroke-width="34"/>` +
    // radio
    `<ellipse cx="530" cy="450" rx="230" ry="110" fill="url(#${k}rd)"/>` +
    `<rect x="396" y="392" width="272" height="150" rx="12" fill="#0b0a10" stroke="#2c2a38" stroke-width="2"/><rect x="416" y="408" width="232" height="76" rx="5" fill="#04110e" stroke="#1c4a40" stroke-width="2"/>` +
    `<g fill="#6af0d0" opacity=".5" filter="url(#${k}b3)">${seg('104.3', 432, 420, 52)}</g><g fill="#a8ffe6">${seg('104.3', 432, 420, 52)}</g>` +
    `<text x="606" y="436" ${SANS} font-weight="700" font-size="17" fill="#a8ffe6">FM</text><path d="M604 452h30M604 462h20M604 472h26" stroke="#3a9a84" stroke-width="3"/>` +
    `<circle cx="430" cy="514" r="16" fill="#1a1820" stroke="#3a3848" stroke-width="2"/><path d="M430 514l8-10" stroke="#a8ffe6" stroke-width="2.500" stroke-linecap="round"/><circle cx="634" cy="514" r="16" fill="#1a1820" stroke="#3a3848" stroke-width="2"/>` +
    `<g fill="#1c1a24" stroke="#33313f"><rect x="462" y="504" width="26" height="20" rx="3"/><rect x="494" y="504" width="26" height="20" rx="3"/><rect x="526" y="504" width="26" height="20" rx="3"/><rect x="558" y="504" width="26" height="20" rx="3"/><rect x="590" y="504" width="22" height="20" rx="3"/></g>` +
    // vents
    `<g stroke="#2a2834" stroke-width="3"><path d="M690 400h80M690 412h80M690 424h80"/></g>` +
    // passenger seat + thermos
    `<path d="M640 600Q650 470 720 460T800 470V600Z" fill="#17151e"/><path d="M660 600Q668 500 720 490" fill="none" stroke="#2a2836" stroke-width="2"/>` +
    `<g transform="translate(726 440) rotate(8)"><ellipse cx="0" cy="150" rx="44" ry="9" fill="#000" opacity=".6"/><rect x="-27" y="0" width="54" height="150" rx="7" fill="url(#${k}th)"/><rect x="-27" y="60" width="54" height="5" fill="#0c2a20"/><rect x="-24" y="-34" width="48" height="38" rx="5" fill="url(#${k}st)"/><rect x="-27" y="-2" width="54" height="8" fill="#5a6268"/><path d="M-16 14v120" stroke="#6af0d0" stroke-width="3" opacity=".4" stroke-linecap="round"/></g>`;
  return frame(k, 800, 600, defs, body, 0.2, 0.6);
}

// ───────────────────────────────────────────────────────────── c2_ph_coop
function phCoop(): string {
  const k = 'c2_ph_coop';
  const defs =
    `<pattern id="${k}fm" width="44" height="44" patternUnits="userSpaceOnUse"><rect width="44" height="44" fill="#2c2734"/><circle cx="22" cy="22" r="17" fill="url(#${k}bump)"/></pattern>` +
    rg(`${k}bump`, [[0, '#5a5068'], [0.6, '#3a3344'], [1, '#221e2a']], 0.4, 0.35, 0.6) +
    rg(`${k}gl`, [[0, '#ffd98a', 0.85], [0.35, '#ffb45a', 0.3], [1, '#ff9a3a', 0]]) +
    rg(`${k}warm`, [[0, '#ffb45a', 0.45], [1, '#ff9a3a', 0]]) +
    lg(`${k}desk`, [[0, '#3a3a46'], [1, '#1a1a22']]) +
    lg(`${k}tbl`, [[0, '#5a3a22'], [1, '#2a1a10']]) +
    rg(`${k}scr`, [[0, '#8affb0'], [1, '#1c7a48']]) +
    bl(`${k}b3`, 2);
  let strips = '';
  const cols = ['#e04a3a', '#e9a23a', '#4a9ae0', '#5ac08a', '#e04a3a', '#c8c8d0', '#4a9ae0', '#e9a23a'];
  const fad = [38, 70, 22, 54, 84, 30, 62, 46];
  for (let i = 0; i < 8; i++) {
    const x = 150 + i * 52;
    strips += `<rect x="${x}" y="398" width="44" height="186" fill="#22222b" stroke="#111118"/>` +
      (i === 5 ? `<circle cx="${x + 22}" cy="418" r="5" fill="#0a0a0e"/>` : `<circle cx="${x + 22}" cy="418" r="10" fill="${cols[i]}"/><path d="M${x + 22} 418l5-8" stroke="#fff" stroke-width="2"/>`) +
      `<circle cx="${x + 22}" cy="446" r="8" fill="#55556a"/><rect x="${x + 19}" y="466" width="6" height="108" rx="3" fill="#07070a"/>` +
      `<rect x="${x + 9}" y="${466 + fad[i]}" width="26" height="15" rx="3" fill="#d8d8e0"/><path d="M${x + 9} ${473.5 + fad[i]}h26" stroke="#3a3a46" stroke-width="2"/>`;
  }
  const body =
    `<rect width="800" height="600" fill="url(#${k}fm)"/><rect width="800" height="600" fill="#1a0e08" opacity=".3"/>` +
    `<ellipse cx="380" cy="260" rx="520" ry="330" fill="url(#${k}warm)"/>` +
    fairy(`${k}gl`, [[-20, 20], [160, 52], [360, 30], [560, 60], [820, 22]], 36, 4, 5, 30) +
    // running order taped to the wall
    `<g transform="rotate(-4 150 190)"><rect x="60" y="96" width="176" height="216" fill="#000" opacity=".4" transform="translate(5 6)"/><rect x="60" y="96" width="176" height="216" fill="#efe8d4"/><rect x="118" y="84" width="60" height="22" fill="#d8cfa6" opacity=".85"/>` +
    `<text x="148" y="152" ${HAND} font-weight="700" font-size="44" fill="#1c1a2a" text-anchor="middle" textLength="130" lengthAdjust="spacingAndGlyphs">EP 41</text><path d="M78 164h140" stroke="#c8423a" stroke-width="3"/>` +
    `<g fill="none" stroke="#3a3a52" stroke-width="2.200" stroke-linecap="round" opacity=".75"><path d="M78 186q8-6 14 0t14 0 14 0 14 0 14 0 14 0 14 0M78 206q8-6 14 0t14 0 14 0 14 0 14 0M78 226q8-6 14 0t14 0 14 0 14 0 14 0 14 0 14 0 14 0M78 246q8-6 14 0t14 0 14 0 14 0M78 266q8-6 14 0t14 0 14 0 14 0 14 0 14 0M78 286q8-6 14 0t14 0 14 0"/></g></g>` +
    // table
    `<path d="M0 372H800V600H0Z" fill="url(#${k}tbl)"/><path d="M0 372H800" stroke="#8a5a34" stroke-width="3" opacity=".7"/>` +
    // mixing desk
    `<path d="M130 384H590L606 600H114Z" fill="#000" opacity=".5" transform="translate(8 6)"/><path d="M130 384H590L606 600H114Z" fill="url(#${k}desk)"/>${strips}` +
    `<rect x="286" y="386" width="96" height="10" fill="#c8c0a0" opacity=".8" transform="rotate(-2 334 391)"/><path d="M140 560l40 12M560 400l-20 30" stroke="#6a6a78" stroke-width="1.500" opacity=".6"/>` +
    // the DECK box
    `<g transform="rotate(3 696 400)"><rect x="622" y="330" width="158" height="118" rx="6" fill="#000" opacity=".5" transform="translate(6 8)"/><rect x="622" y="330" width="158" height="118" rx="6" fill="#16161c" stroke="#3a3a48" stroke-width="2"/>` +
    `<rect x="634" y="342" width="62" height="42" rx="3" fill="url(#${k}scr)"/><path d="M640 372v-8M648 372v-18M656 372v-12M664 372v-22M672 372v-10M680 372v-16M688 372v-6" stroke="#0a3a1c" stroke-width="4"/>` +
    `<circle cx="722" cy="356" r="9" fill="#e04a3a"/><circle cx="752" cy="356" r="9" fill="#33333f"/><rect x="632" y="394" width="138" height="42" fill="#efe8d4"/>` +
    `<text x="701" y="429" ${SANS} font-weight="900" font-size="38" fill="#14141c" text-anchor="middle" textLength="112" lengthAdjust="spacingAndGlyphs">DECK</text><path d="M770 330V250" stroke="#16161c" stroke-width="5" stroke-linecap="round"/></g>` +
    `<path d="M626 420Q600 470 606 520" fill="none" stroke="#0a0a0e" stroke-width="5"/>` +
    // car battery + jump leads
    `<g><rect x="6" y="442" width="124" height="120" rx="6" fill="#0e0e14" stroke="#33333f" stroke-width="2"/><rect x="6" y="442" width="124" height="22" fill="#23232d"/><rect x="18" y="484" width="100" height="40" fill="#c8423a"/><path d="M30 496l10 16 8-12 8 12 8-16M76 496v16h12M96 496v16" fill="none" stroke="#fff" stroke-width="2.500" opacity=".8"/>` +
    `<rect x="24" y="424" width="20" height="20" fill="#8a8f98"/><rect x="92" y="424" width="20" height="20" fill="#8a8f98"/><path d="M18 414h32l-6 16H24z" fill="#d8262c"/><path d="M86 414h32l-6 16H92z" fill="#17171c"/>` +
    `<path d="M34 414Q30 330 110 350T168 398" fill="none" stroke="#d8262c" stroke-width="6"/><path d="M102 414Q110 370 150 380T196 398" fill="none" stroke="#0a0a0e" stroke-width="6"/></g>` +
    // mic on a boom arm
    `<g stroke="#0c0c12" stroke-linecap="round" fill="none"><path d="M810 70L560 118L452 214" stroke-width="12"/><path d="M800 84L566 130" stroke-width="3" stroke="#55556a"/></g><circle cx="560" cy="118" r="13" fill="#23232d"/>` +
    `<g transform="translate(438 232) rotate(38)"><rect x="-22" y="-16" width="44" height="70" rx="16" fill="#1a1a22"/><rect x="-22" y="-50" width="44" height="50" rx="20" fill="#8a8f98"/><path d="M-22-28h44M-22-16h44M-10-50v44M2-50v44M14-48v40" stroke="#3a3a46" stroke-width="2"/><rect x="-22" y="-4" width="44" height="8" fill="#e9a23a"/></g>` +
    `<circle cx="384" cy="240" r="40" fill="#0c0c12" opacity=".45" stroke="#0c0c12" stroke-width="5"/>`;
  return frame(k, 800, 600, defs, body, 0.18, 0.55);
}

// ───────────────────────────────────────────────────────────── c2_ph_stairs
function phStairs(): string {
  const k = 'c2_ph_stairs';
  const defs =
    brick(`${k}br`, 96, 38, '#120c12', ['#4a231e', '#552920', '#3e1d1a']) +
    lg(`${k}dk`, [[0, '#06050c', 0.15], [0.6, '#06050c', 0.45], [1, '#06050c', 0.85]]) +
    rg(`${k}bulb`, [[0, '#ffd08a', 0.85], [0.3, '#ff9a3a', 0.35], [1, '#ff9a3a', 0]]) +
    lg(`${k}sl`, [[0, YL], [0.45, Y], [1, YD]]) +
    `<filter id="${k}mb" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7 0.6"/></filter>` +
    `<filter id="${k}m3" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4.500 0.5"/></filter>` +
    `<filter id="${k}mh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="20 3"/></filter>` +
    `<filter id="${k}ms" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6 1.2"/></filter>`;
  let bal = '', steps = 'M-200 772';
  for (let i = 0; i < 12; i++) bal += `M${-100 + i * 96} ${n1(500 + i * 38.4)}v210`;
  for (let i = 0; i < 13; i++) steps += `h80v32`;
  const sleeve = 'M-80 820C80 700 240 640 420 600L452 676C300 730 160 800 20 900Z';
  const body =
    `<rect width="600" height="800" fill="#06050c"/>` +
    `<g transform="rotate(-25 300 400) translate(-190 -170)">` +
    `<g filter="url(#${k}mb)"><rect x="-200" y="-200" width="1400" height="1500" fill="url(#${k}br)"/>` +
    `<circle cx="760" cy="150" r="420" fill="url(#${k}bulb)"/>` +
    // floor band + pipe
    `<rect x="-200" y="250" width="1400" height="12" fill="#1c1418"/><path d="M-200 90h1400" stroke="#17171c" stroke-width="16"/></g>` +
    // stencilled floor number
    `<g filter="url(#${k}m3)"><text x="540" y="560" ${SANS} font-weight="900" font-size="340" fill="#efe6cc" text-anchor="middle" opacity=".93">3</text>` +
    `<path d="M380 428h320" stroke="#4a231e" stroke-width="9"/><path d="M380 330h320M380 520h320" stroke="#4a231e" stroke-width="5" opacity=".7"/></g>` +
    // stairs + iron handrail
    `<g filter="url(#${k}mb)"><path d="${steps}V1400H-200Z" fill="#0b0a10"/><path d="${steps}" fill="none" stroke="#3a2a26" stroke-width="5"/>` +
    `<path d="${bal}" stroke="#08070c" stroke-width="9"/><path d="M-200 460L1100 980" stroke="#08070c" stroke-width="30" stroke-linecap="round"/><path d="M-200 450L1100 970" stroke="#e08a44" stroke-width="6" opacity=".85"/></g>` +
    `<rect x="-200" y="-200" width="1400" height="1500" fill="url(#${k}dk)"/></g>` +
    // the yellow sleeve sweeping through the frame
    `<g transform="rotate(-8 300 600)"><path d="${sleeve}" fill="${Y}" filter="url(#${k}mh)" opacity=".95"/>` +
    `<g filter="url(#${k}ms)"><path d="${sleeve}" fill="url(#${k}sl)"/><path d="M40 760C150 700 280 650 410 622" fill="none" stroke="${YL}" stroke-width="10" opacity=".8"/><path d="M30 880C170 800 300 730 440 690" fill="none" stroke="${YD}" stroke-width="16" opacity=".8"/>` +
    `<path d="M400 596l44 90" stroke="${YD}" stroke-width="12"/>` +
    // reaching hand
    `<path d="M424 606C470 590 500 590 520 594C552 566 590 548 598 558C604 568 570 590 548 606C590 596 632 592 634 604C636 616 592 622 556 628C592 632 624 640 620 652C616 662 580 656 548 650C570 660 590 674 584 682C576 690 546 674 520 664C490 676 470 680 446 672Z" fill="#e8b895"/>` +
    `<path d="M520 664C500 660 486 650 480 636" fill="none" stroke="#b47c62" stroke-width="4"/></g></g>` +
    // light smears
    `<g stroke="#ffd9a8" stroke-linecap="round" opacity=".28" filter="url(#${k}ms)"><path d="M380 60L590 10" stroke-width="10"/><path d="M20 250L170 214" stroke-width="5"/><path d="M430 760L596 720" stroke-width="6" stroke="${YL}"/></g>`;
  return frame(k, 600, 800, defs, body, 0.26, 0.75);
}

// ───────────────────────────────────────────────────────────── c2_ph_sickbed
function phSickbed(): string {
  const k = 'c2_ph_sickbed';
  const defs =
    lg(`${k}wall`, [[0, '#6a4632'], [1, '#3a241c']]) +
    rg(`${k}lamp`, [[0, '#ffe2a0', 0.95], [0.35, '#ffb45a', 0.4], [1, '#ff9a3a', 0]]) +
    lg(`${k}shade`, [[0, '#ffe6b0'], [1, '#e8a85a']]) +
    lg(`${k}tbl`, [[0, '#8a5a34'], [1, '#4a2c18']]) +
    lg(`${k}duv`, [[0, '#7a8aa8'], [1, '#38425e']]) +
    rg(`${k}tea`, [[0, '#d98a2a'], [1, '#8a4a14']]) +
    rg(`${k}led`, [[0, '#ff3a2a', 0.5], [1, '#ff3a2a', 0]]) +
    lg(`${k}rad`, [[0, '#5a9a94'], [1, '#2c5a58']]) +
    tex(`${k}wd`, 0.01, 0.4, '0.1 0.05 0.02', -2.4, 1.3, 4) + bl(`${k}b9`, 9) + bl(`${k}b3`, 2.5);
  const body =
    `<rect width="600" height="800" fill="url(#${k}wall)"/>` +
    `<g stroke="#2a1a14" stroke-width="2" opacity=".35"><path d="M0 120h600M0 240h600M0 360h600"/></g>` +
    `<circle cx="96" cy="170" r="330" fill="url(#${k}lamp)"/>` +
    // lamp
    `<path d="M20 60h150l40 170H-20z" fill="url(#${k}shade)"/><path d="M-20 230h230" stroke="#fff3d0" stroke-width="4" opacity=".8"/><rect x="88" y="230" width="14" height="190" fill="#3a2a22"/><ellipse cx="95" cy="436" rx="50" ry="14" fill="#2a1c16"/>` +
    // table
    `<path d="M0 428L600 410V560L0 590Z" fill="url(#${k}tbl)"/><path d="M0 428L600 410V560L0 590Z" filter="url(#${k}wd)" opacity=".4"/><path d="M0 590L600 560V600L0 632Z" fill="#2a180e"/>` +
    `<path d="M0 428L600 410" stroke="#ffcf8a" stroke-width="2" opacity=".5"/>` +
    // vintage radio
    `<g transform="translate(150 300)"><ellipse cx="86" cy="140" rx="100" ry="10" fill="#000" opacity=".45"/><rect x="0" y="20" width="172" height="118" rx="16" fill="url(#${k}rad)"/><rect x="0" y="20" width="172" height="118" rx="16" fill="none" stroke="#1c3a38" stroke-width="3"/>` +
    `<rect x="14" y="36" width="92" height="86" rx="6" fill="#e8dcc0"/><path d="M20 48h80M20 58h80M20 68h80M20 78h80M20 88h80M20 98h80M20 108h80" stroke="#8a7a5a" stroke-width="3"/>` +
    `<circle cx="138" cy="62" r="22" fill="#f4ecd8" stroke="#1c3a38" stroke-width="2"/><path d="M138 62l12-12" stroke="#c8423a" stroke-width="3" stroke-linecap="round"/><circle cx="126" cy="112" r="8" fill="#e8dcc0"/><circle cx="152" cy="112" r="8" fill="#e8dcc0"/>` +
    `<path d="M150 20L196-70" stroke="#b9bcc0" stroke-width="4" stroke-linecap="round"/><circle cx="196" cy="-70" r="4" fill="#b9bcc0"/></g>` +
    // the bedside clock — 9:05, PM lit
    `<ellipse cx="460" cy="400" rx="190" ry="110" fill="url(#${k}led)"/>` +
    `<g transform="rotate(2 445 420)"><ellipse cx="445" cy="492" rx="150" ry="10" fill="#000" opacity=".5"/><rect x="296" y="342" width="296" height="150" rx="16" fill="#121014"/><rect x="296" y="342" width="296" height="150" rx="16" fill="none" stroke="#2c282e" stroke-width="3"/><path d="M312 346h264" stroke="#fff" stroke-width="2" opacity=".15"/>` +
    `<rect x="310" y="360" width="268" height="112" rx="8" fill="#1a0606"/>` +
    `<g fill="#ff3a2a" opacity=".1">${seg('88:88', 356, 383, 66)}</g>` +
    `<g fill="#ff3a2a" opacity=".6" filter="url(#${k}b3)">${seg('9:05', 405.9, 383, 66)}</g><g fill="#ff7458">${seg('9:05', 405.9, 383, 66)}</g>` +
    `<circle cx="332" cy="432" r="5.500" fill="#ff7458"/><circle cx="332" cy="432" r="11" fill="#ff3a2a" opacity=".35"/><circle cx="332" cy="394" r="5" fill="#4a1410"/>` +
    `<g ${SANS} font-weight="700" font-size="13" fill="#ff8a70" text-anchor="middle"><text x="332" y="458">PM</text><text x="332" y="383" fill="#5a1c16">AM</text></g></g>` +
    // mug of tea with lemon
    `<g transform="translate(250 508)"><ellipse cx="6" cy="78" rx="78" ry="14" fill="#000" opacity=".45"/><path d="M58 8q52-4 50 30t-56 30v-14q38 0 38-18t-34-14z" fill="#e8e2d6"/><path d="M-62 0V44Q-58 84 0 84T62 44V0Z" fill="#f2ede2"/><path d="M20 0V44Q18 78 0 84Q58 84 62 44V0Z" fill="#000" opacity=".12"/>` +
    `<ellipse cx="0" cy="0" rx="62" ry="20" fill="#f8f4ea"/><ellipse cx="0" cy="2" rx="54" ry="15" fill="url(#${k}tea)"/>` +
    `<g transform="translate(14 2) scale(1 .42)"><circle r="27" fill="#f6e27a" stroke="#e8c84a" stroke-width="4"/><circle r="20" fill="#fbf0a8"/><path d="M0-20V20M-17-10L17 10M-17 10L17-10" stroke="#e8c84a" stroke-width="2.500"/><circle r="3" fill="#e8c84a"/></g>` +
    `<path d="M-50 4V60l-8 4" fill="none" stroke="#c8c0b0" stroke-width="1.500"/><rect x="-70" y="60" width="20" height="24" fill="#c8423a" transform="rotate(8 -60 72)"/>` +
    `<g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".22" filter="url(#${k}b3)"><path d="M-16-20q-16-30 2-56t-4-60M22-24q14-30-2-52t6-50"/></g></g>` +
    // tissues
    `<g fill="#f4f1ea"><path d="M418 520l24-18 22 10 26-12 14 22-10 24-30 8-34-6-16-14z"/><path d="M500 552l20-10 24 8 12 18-18 14-30-2-14-14z"/><path d="M70 540l22-14 26 10 6 22-24 12-28-8z"/></g>` +
    `<g fill="none" stroke="#b9b2a4" stroke-width="2"><path d="M430 520l18 14 20-10M462 534l6 18M512 556l14 10 14-8M84 540l14 12 16-6"/></g>` +
    // duvet corner
    `<path d="M0 640Q160 590 330 640T600 620V800H0Z" fill="url(#${k}duv)"/><path d="M0 640Q160 590 330 640T600 620" fill="none" stroke="#b8c4dc" stroke-width="4" opacity=".6"/>` +
    `<g fill="none" stroke="#2a3250" stroke-width="2" opacity=".6"><path d="M-20 720L120 620M100 800L300 640M280 800L470 640M460 800L620 680M-20 690L100 800M130 640L300 800M320 648L480 800M500 640L620 760"/></g>` +
    `<path d="M380 800Q440 700 600 690V800Z" fill="#e8dcc8" opacity=".9"/><path d="M380 800Q440 700 600 690" fill="none" stroke="#a89a84" stroke-width="2"/>`;
  return frame(k, 600, 800, defs, body, 0.17, 0.55);
}

// ───────────────────────────────────────────────────────────── c2_ph_lisbon
function phLisbon(): string {
  const k = 'c2_ph_lisbon';
  const R = rng(314);
  const defs =
    lg(`${k}sky`, [[0, '#070c26'], [0.55, '#1c2c5e'], [1, '#6a5070']]) +
    lg(`${k}rv`, [[0, '#3a4a7a'], [1, '#1c2648']]) +
    rg(`${k}gl`, [[0, '#ffd98a', 0.8], [0.35, '#ffb45a', 0.28], [1, '#ff9a3a', 0]]) +
    lg(`${k}tbl`, [[0, '#2c2230'], [1, '#0e0a12']]) +
    lg(`${k}dr`, [[0, '#ffb040'], [1, '#e8502a']]) +
    rg(`${k}cd`, [[0, '#ffc870', 0.5], [1, '#ffc870', 0]]) +
    bl(`${k}b3`, 2.5) + bl(`${k}b9`, 9);
  // tumbling terracotta roofs
  let roofs = '', lit = '', dark = '';
  const walls = ['#8a7a78', '#9a8478', '#7a7488', '#a89080'];
  const tiles = ['#b8522c', '#a04424', '#c8623a', '#8a3a20'];
  for (let row = 0; row < 4; row++) {
    const base = 318 + row * 44, wd = ['', '', '', ''], td = ['', '', '', ''];
    for (let x = -30 - row * 23; x < 820;) {
      const w = Math.round(96 + R() * 80), h = Math.round(40 + R() * 46), rh = Math.round(16 + R() * 10), sk = Math.round(10 + R() * 8);
      if (row > 1 && x > 270 && x < 420) { x = 432; continue; } // the street
      const y = base - h + Math.round(R() * 14);
      wd[Math.floor(R() * 4)] += `M${x} ${y}h${w}V${base + 60}h${-w}z`;
      td[Math.floor(R() * 4)] += `M${x - 4} ${y}l${sk} ${-rh}h${w - sk}l${sk} ${rh}z`;
      for (let wx = x + 10; wx < x + w - 12; wx += 22) { const d = `M${wx} ${y + 12}h8v13h-8z`; if (R() < 0.4) lit += d; else dark += d; }
      x += w + 2;
    }
    roofs += wd.map((d, i) => (d ? `<path d="${d}" fill="${walls[i]}"/>` : '')).join('') + td.map((d, i) => (d ? `<path d="${d}" fill="${tiles[i]}"/>` : '')).join('') +
      `<path d="${dark}" fill="#2a2c4a"/><path d="${lit}" fill="#ffd080"/>`;
    lit = ''; dark = '';
  }
  const body =
    `<rect width="800" height="600" fill="url(#${k}sky)"/>` +
    `<path d="${Array.from({ length: 26 }, () => `M${Math.round(R() * 800)} ${Math.round(R() * 190)}h2v2h-2z`).join('')}" fill="#fff" opacity=".7"/>` +
    // river + far shore + bridge
    `<rect y="226" width="800" height="70" fill="url(#${k}rv)"/><path d="M0 226h800v-8q-200-14-400-6T0 216z" fill="#141a38"/>` +
    `<path d="${Array.from({ length: 34 }, () => `M${Math.round(R() * 800)} ${Math.round(212 + R() * 10)}h3v3h-3z`).join('')}" fill="#ffd080" opacity=".8"/>` +
    `<g stroke="#c8523a" fill="none" opacity=".85"><path d="M430 236h380" stroke-width="3"/><path d="M520 236v-50M700 236v-50" stroke-width="4"/><path d="M430 232Q480 226 520 188Q610 250 700 188Q750 226 810 216" stroke-width="1.500"/></g>` +
    `<g stroke="#ffd080" stroke-width="2" opacity=".35"><path d="M60 250h70M240 262h50M560 256h90M690 272h60M380 280h40"/></g>` +
    roofs + `<rect y="300" width="800" height="260" fill="#141032" opacity=".42"/>` +
    // street with the tram
    `<path d="M296 500L330 392h66l34 108z" fill="#1c1830"/><path d="M342 500l14-108M384 500l-10-108" stroke="#7a7a98" stroke-width="2" opacity=".7"/><circle cx="364" cy="420" r="70" fill="url(#${k}cd)"/>` +
    `<g transform="translate(364 436)"><path d="M0-58v-30M-30-88h60" stroke="#0c0a14" stroke-width="2"/><path d="M-12-58l12-12 12 12" fill="none" stroke="#0c0a14" stroke-width="2.500"/><rect x="-36" y="-58" width="72" height="12" rx="4" fill="#f4efe0"/><rect x="-36" y="-48" width="72" height="62" rx="5" fill="#f0c020"/><rect x="-36" y="-10" width="72" height="24" fill="#f4efe0"/>` +
    `<g fill="#ffe6a0"><rect x="-30" y="-42" width="17" height="26"/><rect x="-9" y="-42" width="18" height="26"/><rect x="13" y="-42" width="17" height="26"/></g><circle cx="0" cy="2" r="5" fill="#fff6d0"/><rect x="-30" y="14" width="60" height="6" fill="#0c0a14"/></g>` +
    // string lights + rail
    fairy(`${k}gl`, [[-20, 10], [200, 44], [420, 18], [640, 48], [820, 8]], 34, 3, 5, 30) +
    `<rect y="478" width="800" height="9" fill="#0c0a14"/><rect y="487" width="800" height="16" fill="#a8c8e8" opacity=".12"/>` +
    // table
    `<path d="M0 506H800V600H0Z" fill="url(#${k}tbl)"/><path d="M0 506H800" stroke="#ffb45a" stroke-width="2" opacity=".45"/>` +
    // cocktail
    `<g transform="translate(170 0)"><ellipse cx="0" cy="560" rx="60" ry="10" fill="#000" opacity=".5"/><ellipse cx="0" cy="470" rx="110" ry="80" fill="url(#${k}cd)"/><path d="M-6 470h12v82h-12z" fill="#c8d8e8" opacity=".45"/><ellipse cx="0" cy="554" rx="40" ry="7" fill="#c8d8e8" opacity=".45"/>` +
    `<path d="M-58 330Q-64 440 0 472Q64 440 58 330Z" fill="#c8d8e8" opacity=".22"/><path d="M-57 366Q-56 444 0 468Q56 444 57 366Z" fill="url(#${k}dr)"/>` +
    `<g fill="#fff" opacity=".35"><rect x="-34" y="372" width="30" height="30" rx="4" transform="rotate(-12 -19 387)"/><rect x="4" y="380" width="30" height="30" rx="4" transform="rotate(16 19 395)"/></g>` +
    `<ellipse cx="0" cy="366" rx="57" ry="9" fill="#ffc860"/><ellipse cx="0" cy="330" rx="58" ry="9" fill="none" stroke="#e8f0f8" stroke-width="2.500" opacity=".8"/>` +
    `<path d="M34 310a26 26 0 0 1 36 36z" fill="#ff8a2a" stroke="#ffd080" stroke-width="3"/><path d="M-20 400L-52 268" stroke="#17131c" stroke-width="5" stroke-linecap="round"/><path d="M-48 350q-6 50 14 96" fill="none" stroke="#fff" stroke-width="3" opacity=".5" stroke-linecap="round"/></g>` +
    // conference lanyard
    `<g transform="translate(-10 -36)"><path d="M500 540C420 470 600 440 640 470S760 520 800 640" fill="none" stroke="#1c4a9a" stroke-width="13" stroke-linecap="round"/><path d="M500 540C420 470 600 440 640 470S760 520 800 640" fill="none" stroke="#6a9ae0" stroke-width="2" stroke-dasharray="10 12"/>` +
    `<g transform="rotate(-7 520 540)"><rect x="372" y="494" width="300" height="118" rx="8" fill="#000" opacity=".5" transform="translate(5 6)"/><rect x="372" y="494" width="300" height="118" rx="8" fill="#f6f2ea"/><rect x="372" y="494" width="300" height="50" rx="8" fill="#12306a"/><rect x="372" y="530" width="300" height="14" fill="#12306a"/><rect x="372" y="544" width="300" height="5" fill="#e8a020"/>` +
    `<rect x="506" y="486" width="32" height="12" rx="4" fill="#8a8f98"/>` +
    `<g ${SANS} font-weight="900" text-anchor="middle"><text x="522" y="535" font-size="38" fill="#fff" textLength="190" lengthAdjust="spacingAndGlyphs" letter-spacing="4">IBERIA</text><text x="522" y="592" font-size="33" fill="#12306a" textLength="268" lengthAdjust="spacingAndGlyphs">PROPERTY FORUM</text></g></g></g>`;
  return frame(k, 800, 600, defs, body, 0.16, 0.5);
}

// ───────────────────────────────────────────────────────────── c2_ph_notice
function phNotice(): string {
  const k = 'c2_ph_notice';
  const defs =
    lg(`${k}bg`, [[0, '#0a0b20'], [0.6, '#2a1c38'], [1, '#6a3a2c']]) +
    rg(`${k}or`, [[0, '#ffa040', 0.7], [1, '#ffa040', 0]]) +
    `<pattern id="${k}cl" width="46" height="46" patternUnits="userSpaceOnUse"><path d="M-2 -2L48 48M48 -2L-2 48" stroke="#000" stroke-width="5" opacity=".5" transform="translate(1.500 2)"/><path d="M-2 -2L48 48M48 -2L-2 48" stroke="#8d949e" stroke-width="3"/><path d="M-2 -2L48 48" stroke="#d0d6de" stroke-width="1"/></pattern>` +
    lg(`${k}pipe`, [[0, '#5a6068'], [0.4, '#c0c6ce'], [1, '#3a4046']], 1, 0) +
    lg(`${k}glare`, [[0, '#fff', 0], [0.45, '#fff', 0.34], [0.55, '#fff', 0.05], [1, '#fff', 0]], 1, 1) +
    bl(`${k}b9`, 9) + bl(`${k}b3`, 3);
  const tie = (x: number, y: number, r: number): string =>
    `<g transform="translate(${x} ${y}) rotate(${r})"><circle r="7" fill="#1c1a1c"/><path d="M0 0V-46" stroke="#0c0b0e" stroke-width="5"/><rect x="-6" y="-52" width="12" height="11" rx="2" fill="#0c0b0e"/><path d="M4-50l14-16" stroke="#0c0b0e" stroke-width="4" stroke-linecap="round"/></g>`;
  const body =
    `<rect width="600" height="800" fill="url(#${k}bg)"/>` +
    `<g filter="url(#${k}b9)"><path d="M40 800V330h360v470zM90 330l8-150h36l8 150zM300 330V250h90v80z" fill="#0b0912"/><circle cx="520" cy="420" r="120" fill="url(#${k}or)"/><rect x="330" y="270" width="34" height="30" fill="#ffd080"/><rect y="700" width="600" height="100" fill="#141018"/></g>` +
    `<rect width="600" height="800" fill="url(#${k}cl)"/>` +
    `<rect x="18" width="22" height="800" fill="url(#${k}pipe)"/><rect x="560" width="22" height="800" fill="url(#${k}pipe)"/>` +
    // the notice
    `<g transform="rotate(-2 300 420)"><rect x="92" y="150" width="424" height="548" rx="6" fill="#000" opacity=".5" filter="url(#${k}b3)" transform="translate(6 8)"/>` +
    `<rect x="82" y="140" width="436" height="560" rx="10" fill="#e8ecf0" opacity=".55"/><rect x="94" y="152" width="412" height="536" fill="#f6f3ea"/>` +
    `<rect x="94" y="152" width="412" height="92" fill="#b01c24"/>` +
    `<g ${SANS} font-weight="900" text-anchor="middle">` +
    `<text x="300" y="217" font-size="50" fill="#fff" textLength="370" lengthAdjust="spacingAndGlyphs">PELL HOLDINGS</text>` +
    `<text x="300" y="308" font-size="58" fill="#14141a" textLength="330" lengthAdjust="spacingAndGlyphs">NOTICE TO</text>` +
    `<text x="300" y="378" font-size="76" fill="#14141a" textLength="370" lengthAdjust="spacingAndGlyphs">VACATE</text>` +
    `<text x="300" y="454" font-size="40" fill="#14141a" textLength="370" lengthAdjust="spacingAndGlyphs">DEMOLITION</text>` +
    `<text x="300" y="498" font-size="40" fill="#14141a" textLength="370" lengthAdjust="spacingAndGlyphs">COMMENCES</text>` +
    `<text x="112" y="600" font-size="100" fill="#b01c24" text-anchor="start" textLength="250" lengthAdjust="spacingAndGlyphs">OCT 31</text></g>` +
    `<path d="M114 398h372" stroke="#14141a" stroke-width="5"/><path d="M114 516h372" stroke="#14141a" stroke-width="2"/>` +
    `<g stroke="#8a8a90" stroke-width="5" opacity=".7"><path d="M114 636h240M114 652h200M114 668h226"/></g>` +
    // marker owl
    `<g transform="translate(436 600) rotate(6)" fill="none" stroke="#111014" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-40 10C-46-40-30-66 0-66C30-66 46-40 40 10C36 50 20 66 0 66C-20 66-36 50-40 10Z" fill="#f6f3ea"/>` +
    `<path d="M-34-52L-44-78L-14-62M34-52L44-78L14-62"/><circle cx="-17" cy="-28" r="17"/><circle cx="17" cy="-28" r="17"/><circle cx="-13" cy="-26" r="6" fill="#111014"/><circle cx="13" cy="-30" r="6" fill="#111014"/>` +
    `<path d="M-6-8L0 6L6-8Z" fill="#111014"/><path d="M-22 22q6 8 12 0M-4 30q6 8 12 0M12 20q6 8 12 0M-14 44q6 8 12 0M4 46q6 8 12 0"/><path d="M-12 66v12M-12 78l-8 4M-12 78l6 5M12 66v12M12 78l-6 5M12 78l8 4"/></g>` +
    `<rect x="82" y="140" width="436" height="560" rx="10" fill="url(#${k}glare)"/>` +
    `<g fill="#1c1a1c"><circle cx="112" cy="170" r="6"/><circle cx="488" cy="170" r="6"/><circle cx="112" cy="672" r="6"/><circle cx="488" cy="672" r="6"/></g>` +
    tie(112, 170, -20) + tie(488, 170, 24) + tie(112, 672, 200) + tie(488, 672, 160) + `</g>`;
  return frame(k, 600, 800, defs, body, 0.17, 0.55);
}

// ───────────────────────────────────────────────────────────── c2_ph_contract
function phContract(): string {
  const k = 'c2_ph_contract';
  const bars = (y: number, ws: number[]): string => ws.map((w, i) => `<rect x="70" y="${y + i * 17}" width="${w}" height="7" rx="3"/>`).join('');
  const defs = lg(`${k}sg`, [[0, '#fff8d8'], [1, '#fdeeb0']]) + bl(`${k}b9`, 8);
  const body =
    `<rect width="600" height="800" fill="#2b2d34"/>` +
    // status + viewer bars
    `<rect width="600" height="96" fill="#17181d"/><g ${SANS} fill="#e8e8ee"><text x="26" y="30" font-size="17" font-weight="700">23:41</text><text x="300" y="72" font-size="19" text-anchor="middle" fill="#c8c8d2">Hearth_Agreement_signed.pdf</text><text x="574" y="72" font-size="16" text-anchor="end" fill="#8a8a98">7 / 7</text></g>` +
    `<path d="M28 58l-10 10 10 10" fill="none" stroke="#6aa8ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="534" y="17" width="34" height="16" rx="4" fill="none" stroke="#e8e8ee" stroke-width="1.500"/><rect x="537" y="20" width="20" height="10" rx="2" fill="#e8e8ee"/><rect x="570" y="22" width="3" height="6" fill="#e8e8ee"/>` +
    `<path d="M494 30v-4M500 30v-7M506 30v-10M512 30v-13" stroke="#e8e8ee" stroke-width="3"/>` +
    // page
    `<rect x="30" y="116" width="540" height="670" fill="#000" opacity=".5" filter="url(#${k}b9)"/><rect x="26" y="110" width="548" height="676" fill="#fbfaf6"/>` +
    `<g ${SERIF} fill="#16161c">` +
    `<text x="300" y="168" font-size="31" font-weight="700" text-anchor="middle" textLength="488" lengthAdjust="spacingAndGlyphs">TALENT &amp; ARCHIVE AGREEMENT</text>` +
    `<text x="300" y="196" font-size="16" font-style="italic" text-anchor="middle" fill="#6a6a74">Execution Page</text>` +
    `<text x="56" y="322" font-size="26" font-weight="700" textLength="430" lengthAdjust="spacingAndGlyphs">Advance: $40,000 payable to the</text>` +
    `<text x="56" y="356" font-size="26" font-weight="700" textLength="290" lengthAdjust="spacingAndGlyphs">account in Schedule B</text>` +
    `<text x="56" y="488" font-size="27" textLength="318" lengthAdjust="spacingAndGlyphs">Licensor: Jonah Merrick</text></g>` +
    `<path d="M56 206h488" stroke="#16161c" stroke-width="2"/>` +
    `<g fill="#b8b8c0">${bars(228, [460, 440, 470, 300])}${bars(384, [470, 450, 380])}</g>` +
    // e-signature block
    `<rect x="56" y="508" width="488" height="124" rx="6" fill="url(#${k}sg)" stroke="#e0b030" stroke-width="2"/>` +
    `<text x="80" y="592" ${SCRIPT} font-style="italic" font-size="58" fill="#1a2a8c" textLength="320" lengthAdjust="spacingAndGlyphs">Jonah Merrick</text>` +
    `<path d="M74 608h380" stroke="#16161c" stroke-width="1.500"/>` +
    `<g transform="translate(500 570)"><circle r="24" fill="none" stroke="#2a8a5a" stroke-width="3"/><path d="M-11 0l8 9 14-17" fill="none" stroke="#2a8a5a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>` +
    `<circle cx="68" cy="666" r="11" fill="#2a8a5a"/><path d="M63 666l4 4 7-8" fill="none" stroke="#fff" stroke-width="2.500" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<text x="88" y="675" ${SANS} font-size="24" font-weight="700" fill="#1c6a44" textLength="452" lengthAdjust="spacingAndGlyphs">Signed via SignRight · 10/09/2026 23:14</text>` +
    `<g fill="#b8b8c0">${bars(706, [420, 340])}</g>` +
    `<text x="300" y="770" ${SANS} font-size="14" fill="#8a8a94" text-anchor="middle">Page 7 of 7</text>`;
  return frame(k, 600, 800, defs, body, 0.06, 0.18);
}

// ───────────────────────────────────────────────────────────── c2_ph_van
function phVan(): string {
  const k = 'c2_ph_van';
  const R = rng(202);
  const defs =
    lg(`${k}rd`, [[0, '#1c1a2a'], [1, '#0a0912']]) +
    rg(`${k}or`, [[0, '#ffa040', 0.75], [0.5, '#ff8a2a', 0.25], [1, '#ff8a2a', 0]]) +
    lg(`${k}side`, [[0, '#f2f1ec'], [0.7, '#c8c8cc'], [1, '#8a8a96']]) +
    lg(`${k}roof`, [[0, '#d8d8de'], [1, '#fbfbf8']]) +
    lg(`${k}gls`, [[0, '#2a3450'], [1, '#0c1020']]) +
    rg(`${k}dm`, [[0, '#fff'], [0.6, '#d0d4dc'], [1, '#7a808e']], 0.35, 0.3, 0.8) +
    bl(`${k}b9`, 10) + bl(`${k}b3`, 3) + bl(`${k}b20`, 22);
  const body =
    `<rect width="800" height="600" fill="url(#${k}rd)"/>` +
    `<g transform="rotate(-5 400 300)">` +
    // far sidewalk + shopfronts seen from above
    `<rect x="-60" y="-60" width="920" height="170" fill="#262232"/><rect x="-60" y="104" width="920" height="12" fill="#4a4658"/>` +
    `<g stroke="#17141f" stroke-width="2" opacity=".8"><path d="M40-60v164M180-60v164M320-60v164M460-60v164M600-60v164M740-60v164"/></g>` +
    `<rect x="-60" y="-60" width="920" height="62" fill="#120f1a"/><rect x="520" y="-20" width="110" height="26" fill="#ffd080" opacity=".5" filter="url(#${k}b3)"/>` +
    `<ellipse cx="250" cy="200" rx="330" ry="210" fill="url(#${k}or)"/>` +
    // lane markings + wet sheen
    `<g stroke="#c8c0a0" stroke-width="5" opacity=".35" stroke-dasharray="70 60"><path d="M-60 500h920"/></g>` +
    `<g filter="url(#${k}b9)" opacity=".5"><rect x="150" y="430" width="470" height="80" fill="#e8e8f0" opacity=".4"/><ellipse cx="200" cy="470" rx="160" ry="24" fill="#ff9a3a"/><ellipse cx="660" cy="540" rx="120" ry="16" fill="#6a7ac0" opacity=".6"/></g>` +
    // van — high three-quarter view
    `<ellipse cx="400" cy="428" rx="320" ry="22" fill="#000" opacity=".6" filter="url(#${k}b3)"/>` +
    `<g fill="#0a090e"><ellipse cx="216" cy="420" rx="40" ry="26"/><ellipse cx="578" cy="420" rx="40" ry="26"/></g><g fill="#3a3a46"><ellipse cx="216" cy="422" rx="18" ry="11"/><ellipse cx="578" cy="422" rx="18" ry="11"/></g>` +
    `<path d="M108 250H560L668 296Q694 304 694 330V408Q694 420 680 420H120Q108 420 108 408Z" fill="url(#${k}side)"/>` +
    `<path d="M132 176H548L560 250H108Z" fill="url(#${k}roof)"/><path d="M548 176L560 250L668 296L640 226Q632 206 610 196Z" fill="url(#${k}gls)"/><path d="M566 196l26 62" stroke="#fff" stroke-width="5" opacity=".14"/>` +
    `<path d="M108 250H560" stroke="#8a8a96" stroke-width="2.500"/><path d="M560 250V420M330 250V420" stroke="#7a7a86" stroke-width="2.500"/>` +
    `<path d="M572 262L650 296V340H572Z" fill="url(#${k}gls)"/><rect x="540" y="338" width="14" height="6" rx="2" fill="#4a4a56"/><rect x="340" y="338" width="14" height="6" rx="2" fill="#4a4a56"/>` +
    `<rect x="108" y="388" width="586" height="12" fill="#2a4a8a"/><rect x="676" y="340" width="18" height="20" fill="#ffe8a0"/><rect x="108" y="330" width="10" height="30" fill="#c8262c"/>` +
    // decal
    `<g ${SANS} font-weight="900" fill="#17306e"><text x="128" y="306" font-size="42" textLength="300" lengthAdjust="spacingAndGlyphs">SPECTRUM</text>` +
    `<text x="128" y="342" font-size="30" textLength="404" lengthAdjust="spacingAndGlyphs">ENFORCEMENT BUREAU</text></g>` +
    `<g transform="translate(486 290)" fill="none" stroke="#17306e" stroke-width="4" stroke-linecap="round"><circle r="4" fill="#17306e"/><path d="M-10-10q10-10 20 0M-18-18q18-18 36 0"/></g>` +
    `<path d="M128 356h404" stroke="#c8262c" stroke-width="4"/>` +
    // roof rack + rotating antenna dome
    `<g stroke="#5a5e6a" stroke-width="4"><path d="M170 190H520M162 236H536"/></g>` +
    `<ellipse cx="330" cy="216" rx="62" ry="20" fill="#5a5e6a"/><path d="M272 214Q274 148 330 148T388 214Q360 228 330 228T272 214Z" fill="url(#${k}dm)"/><path d="M290 196Q300 162 326 156" fill="none" stroke="#fff" stroke-width="5" opacity=".7" stroke-linecap="round"/>` +
    `<path d="M440 214V150M420 156h40M426 170h28" stroke="#3a3e4a" stroke-width="4" stroke-linecap="round"/><circle cx="440" cy="148" r="4" fill="#ff4030"/>` +
    `<circle cx="440" cy="148" r="16" fill="#ff4030" opacity=".3" filter="url(#${k}b3)"/>` +
    // kerbside car fragment
    `<path d="M736 150H900V250H720Q700 250 708 226Z" fill="#17141f"/><path d="M746 160H900V200H734Z" fill="#232838"/>` +
    rain(R, 860, 660, 120, '#cfd8ff', 0.28, 26, -0.25) + `</g>` +
    // covert framing: window frame + net curtain, out of focus
    `<g filter="url(#${k}b20)"><rect x="-40" y="-40" width="110" height="700" fill="#050408"/><rect x="-40" y="548" width="900" height="100" fill="#050408"/><path d="M700-40H860V300Q780 200 740 60Z" fill="#c8c0b0" opacity=".3"/></g>`;
  return frame(k, 800, 600, defs, body, 0.22, 0.7);
}

// ───────────────────────────────────────────────────────────── c2_ph_bench
function phBench(): string {
  const k = 'c2_ph_bench';
  const defs =
    `<pattern id="${k}pg" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#7a5c3a"/><circle cx="13" cy="13" r="3" fill="#2a1c10"/></pattern>` +
    rg(`${k}lamp`, [[0, '#ffe6b0', 0.85], [0.4, '#ffb45a', 0.3], [1, '#ff9a3a', 0]]) +
    lg(`${k}top`, [[0, '#8a5e36'], [1, '#3e2614']]) +
    lg(`${k}bak`, [[0, '#7a3e24'], [0.5, '#4e2414'], [1, '#2a120a']]) +
    rg(`${k}dial`, [[0, '#fff0c0'], [0.7, '#e8b850'], [1, '#a8782a']]) +
    rg(`${k}tube`, [[0, '#ffb060', 0.9], [1, '#ff7a2a', 0]]) +
    lg(`${k}ch`, [[0, '#a8aeb6'], [1, '#5a6068']]) +
    tex(`${k}wd`, 0.008, 0.3, '0.08 0.04 0.02', -2.4, 1.3, 6) + bl(`${k}b3`, 2.5) + bl(`${k}b9`, 9);
  const tube = (x: number, y: number, h: number): string =>
    `<circle cx="${x}" cy="${y - h / 2}" r="${h * 0.7}" fill="url(#${k}tube)"/><rect x="${x - 13}" y="${y - h}" width="26" height="${h}" rx="12" fill="#c8d4dc" opacity=".35"/><rect x="${x - 5}" y="${y - h + 14}" width="10" height="${h - 20}" fill="#ff9a40" opacity=".85"/><rect x="${x - 15}" y="${y - 6}" width="30" height="10" fill="#2a2a30"/>`;
  const body =
    `<rect width="800" height="600" fill="url(#${k}pg)"/><rect width="800" height="600" fill="#1a0e06" opacity=".45"/>` +
    `<circle cx="150" cy="120" r="420" fill="url(#${k}lamp)"/>` +
    // tools on the pegboard
    `<g fill="#17120e" opacity=".9"><path d="M300 50h10v90h-10zM294 140h22l-4 60h-14zM350 46l8 0 2 70-12 0zM346 116h16v50h-16zM410 44q16 0 16 16l-10 6v90h-10V66l-10-6q0-16 14-16zM470 50l40 40-8 8-40-40zM500 84l30 70-10 6-30-70z"/></g>` +
    `<rect x="560" y="60" width="240" height="14" fill="#3a2414"/><g fill="#2a3a4a"><rect x="580" y="14" width="40" height="46"/><rect x="626" y="24" width="34" height="36"/><rect x="668" y="8" width="50" height="52"/><rect x="726" y="28" width="44" height="32"/></g>` +
    // magnifier lamp
    `<path d="M-10 250L120 60L200 150" fill="none" stroke="#17120e" stroke-width="10" stroke-linejoin="round"/><ellipse cx="216" cy="168" rx="56" ry="20" fill="#2a2a30" transform="rotate(30 216 168)"/><ellipse cx="216" cy="172" rx="44" ry="13" fill="#fff3d0" transform="rotate(30 216 172)"/>` +
    // bench top
    `<path d="M0 400H800V600H0Z" fill="url(#${k}top)"/><path d="M0 400H800V600H0Z" filter="url(#${k}wd)" opacity=".45"/><path d="M0 400H800" stroke="#ffcf8a" stroke-width="2" opacity=".4"/>` +
    // empty cabinet shell
    `<g transform="translate(40 250)"><rect width="180" height="150" rx="10" fill="#4a2e1a"/><rect x="14" y="14" width="152" height="122" rx="6" fill="#120c08"/><path d="M40 136V90q30-30 60 0v46" fill="none" stroke="#c8423a" stroke-width="3"/><path d="M110 136q10-60 40-70" fill="none" stroke="#3a6aa8" stroke-width="3"/></g>` +
    // gutted chassis with valves
    `<g transform="translate(190 380)"><ellipse cx="110" cy="98" rx="140" ry="12" fill="#000" opacity=".45"/><path d="M0 40h220v54H0z" fill="url(#${k}ch)"/><path d="M0 40l18-22h184l18 22z" fill="#c0c6ce"/><rect x="150" y="-26" width="56" height="52" fill="#23232a"/><rect x="156" y="-34" width="44" height="10" fill="#3a3a44"/>` +
    tube(40, 26, 64) + tube(84, 26, 78) + tube(126, 26, 56) +
    `<g fill="#17120e"><circle cx="30" cy="68" r="7"/><circle cx="64" cy="68" r="7"/><circle cx="190" cy="68" r="9"/></g><path d="M220 70q40 10 30 50t-70 40" fill="none" stroke="#c8423a" stroke-width="3"/><path d="M0 70q-30 20-20 60t60 30" fill="none" stroke="#2a2a30" stroke-width="3"/></g>` +
    // soldering station
    `<g transform="translate(60 470)"><rect width="110" height="76" rx="6" fill="#2a4a7a"/><rect x="10" y="10" width="50" height="26" fill="#0a1a12"/><text x="35" y="30" ${MONO} font-size="18" font-weight="700" fill="#6af0a0" text-anchor="middle">350</text><circle cx="84" cy="24" r="13" fill="#17171c"/><path d="M84 24l7-8" stroke="#fff" stroke-width="2.500"/><circle cx="24" cy="56" r="5" fill="#ff4030"/>` +
    `<path d="M110 50q50 10 60-30" fill="none" stroke="#17171c" stroke-width="5"/></g>` +
    `<g transform="translate(250 520) rotate(-24)"><path d="M0 0q8-12 16 0t16 0 16 0 16 0 16 0" fill="none" stroke="#8a8f98" stroke-width="5"/><rect x="-80" y="-9" width="84" height="18" rx="8" fill="#e04a2a"/><rect x="0" y="-4" width="96" height="8" fill="#c0c6ce"/><path d="M96-4l22 4-22 4z" fill="#e8e0d0"/>` +
    `<g fill="none" stroke="#fff" stroke-width="5" opacity=".2" stroke-linecap="round" filter="url(#${k}b3)"><path d="M118 0q20-40 0-70t10-60"/></g></g>` +
    `<g transform="translate(370 540)"><ellipse rx="34" ry="14" fill="#8a8f98"/><ellipse rx="34" ry="14" fill="none" stroke="#c0c6ce" stroke-width="4" transform="translate(0 -8)"/><ellipse cy="-8" rx="12" ry="5" fill="#17120e"/><path d="M30-4q30 10 50-10" fill="none" stroke="#c0c6ce" stroke-width="3"/></g>` +
    // the 1950s set
    `<g transform="translate(470 236)"><ellipse cx="150" cy="212" rx="170" ry="14" fill="#000" opacity=".5"/><rect width="300" height="210" rx="34" fill="url(#${k}bak)"/><path d="M30 12h240" stroke="#fff" stroke-width="5" opacity=".2" stroke-linecap="round"/>` +
    `<rect x="22" y="34" width="132" height="130" rx="14" fill="#1c0e08"/><g stroke="#c89a5a" stroke-width="6" stroke-linecap="round"><path d="M34 54h108M34 72h108M34 90h108M34 108h108M34 126h108M34 144h108"/></g>` +
    `<circle cx="222" cy="98" r="62" fill="#1c0e08"/><circle cx="222" cy="98" r="54" fill="url(#${k}dial)"/><g stroke="#3a2414" stroke-width="2.500"><path d="M222 50v10M222 136v10M174 98h10M260 98h10M188 64l7 7M256 64l-7 7M188 132l7-7M256 132l-7-7"/></g>` +
    `<path d="M222 98L196 62" stroke="#b01c24" stroke-width="4" stroke-linecap="round"/><circle cx="222" cy="98" r="9" fill="#3a2414"/>` +
    `<circle cx="60" cy="186" r="13" fill="#e8d2a0"/><circle cx="118" cy="186" r="13" fill="#e8d2a0"/><circle cx="222" cy="186" r="13" fill="#e8d2a0"/></g>` +
    // pickup tag on a string
    `<path d="M692 420Q676 452 644 468" fill="none" stroke="#e8e0d0" stroke-width="2.500"/>` +
    `<g transform="translate(560 498) rotate(-9)"><path d="M-100-36H86L106-18V18L86 36H-100Z" fill="#000" opacity=".45" transform="translate(4 6)"/><path d="M-100-36H86L106-18V18L86 36H-100Z" fill="#f0e2bc"/><circle cx="88" cy="0" r="7" fill="#3e2614" stroke="#c8423a" stroke-width="3"/>` +
    `<text x="-12" y="13" ${HAND} font-weight="700" font-size="35" fill="#b01c24" text-anchor="middle" textLength="158" lengthAdjust="spacingAndGlyphs">SAT PICKUP</text></g>` +
    `<g fill="#c0c6ce"><circle cx="440" cy="574" r="4"/><circle cx="462" cy="560" r="3"/><circle cx="700" cy="560" r="4"/></g>`;
  return frame(k, 800, 600, defs, body, 0.17, 0.55);
}

// ───────────────────────────────────────────────────────────── c2_ph_ada
function phAda(): string {
  const k = 'c2_ph_ada';
  const defs =
    lg(`${k}wall`, [[0, '#9a7a4a'], [1, '#5a3e28']]) +
    lg(`${k}cab`, [[0, '#6a4426'], [1, '#4a2c18']]) +
    rg(`${k}lamp`, [[0, '#ffe2a0', 0.8], [0.4, '#ffb45a', 0.3], [1, '#ff9a3a', 0]]) +
    rg(`${k}cn`, [[0, '#ffd070', 0.75], [1, '#ffb040', 0]]) +
    rg(`${k}ck`, [[0, '#8a5230'], [1, '#4a2614']], 0.4, 0.3, 0.8) +
    `<pattern id="${k}tl" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#d8ccb0"/><path d="M0 0h40v40" fill="none" stroke="#8a7a5a" stroke-width="2"/></pattern>` +
    bl(`${k}b3`, 3) + bl(`${k}b9`, 8);
  const candle = (x: number, y: number, c: string, r: number): string =>
    `<g transform="translate(${x} ${y}) rotate(${r})"><circle cy="-52" r="34" fill="url(#${k}cn)"/><rect x="-4" y="-38" width="8" height="40" fill="${c}"/><path d="M-4-30l8-5M-4-20l8-5M-4-10l8-5" stroke="#fff" stroke-width="2.500"/><path d="M0-40q-8-10 0-24q8 14 0 24z" fill="#ffe89a"/><path d="M0-42q-3-6 0-12q3 6 0 12z" fill="#fff"/></g>`;
  const ada =
    `<circle cx="100" cy="26" r="17" fill="${ADA.hair}"/><path d="M86 38h28" stroke="#d8525e" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="${TORSO_L}" fill="#27447a"/><path d="M104 146H120C156 152 186 166 188 200V420H112Z" fill="#000" opacity=".25"/>` +
    `<path d="M83 146L100 178L117 146Z" fill="${ADA.skin}"/><path d="M83 146L100 178L117 146" fill="none" stroke="#1a2f58" stroke-width="3"/>` +
    `<path d="M86 147L96 214M114 147L104 214" stroke="#e8e2d0" stroke-width="3.400"/>` + owlPatch(100, 216, 9) +
    hb(ADA.skin, ADA.shade, '#ffcf8a') + eyes('#3a2418', 'laugh') + brows('#2a1c18', 'up', 2.8) + nose('#6a3c28') + mouth('laugh', '#4a1418') + adaHair;
  const body =
    `<rect width="600" height="800" fill="url(#${k}wall)"/>` +
    `<g filter="url(#${k}b3)"><rect y="250" width="600" height="170" fill="url(#${k}tl)" opacity=".8"/>` +
    `<rect width="600" height="220" fill="url(#${k}cab)"/><g stroke="#2a180c" stroke-width="4"><path d="M150 0v220M300 0v220M450 0v220M0 220h600"/></g><g fill="#d8b070"><circle cx="134" cy="180" r="6"/><circle cx="166" cy="180" r="6"/><circle cx="434" cy="180" r="6"/><circle cx="466" cy="180" r="6"/></g>` +
    // window + fridge
    `<rect x="440" y="250" width="180" height="200" fill="#141a38"/><path d="M530 250v200M440 350h180" stroke="#e8dcc0" stroke-width="8"/><rect x="432" y="242" width="196" height="216" fill="none" stroke="#e8dcc0" stroke-width="10"/>` +
    `<rect x="-20" y="230" width="120" height="600" fill="#c8ccd0"/><rect x="30" y="300" width="40" height="50" fill="#f4efe0" transform="rotate(-6 50 325)"/><circle cx="50" cy="296" r="6" fill="#c8423a"/><rect x="24" y="390" width="34" height="34" fill="#5a9a94"/>` +
    `<rect y="420" width="600" height="24" fill="#3a2414"/></g>` +
    `<circle cx="300" cy="40" r="330" fill="url(#${k}lamp)"/>` +
    bust(196, 300, 1.8, 5, jonah('#3c5c6e', '#28424e', `<path d="M60 190h30M60 200h22" stroke="#28424e" stroke-width="3"/>`, '#ffcf8a')) +
    bust(408, 336, 1.7, -5, ada) +
    // Jonah's arm round her shoulder
    `<ellipse cx="300" cy="640" rx="330" ry="200" fill="url(#${k}cn)" opacity=".8"/>` +
    // plate + lopsided owl cake
    `<ellipse cx="302" cy="742" rx="216" ry="40" fill="#000" opacity=".4"/><ellipse cx="302" cy="730" rx="214" ry="40" fill="#f4f0e6"/><ellipse cx="302" cy="726" rx="170" ry="28" fill="#d8d2c4"/>` +
    `<g transform="rotate(-5 300 640)"><path d="M168 640C150 560 200 520 290 524C400 520 446 574 430 650C420 716 360 736 296 734C226 736 180 706 168 640Z" fill="url(#${k}ck)"/>` +
    `<path d="M196 548L176 486L250 528ZM400 552L436 500L352 526Z" fill="#5a3018"/>` +
    `<path d="M236 660q16 20 32 0 16 20 32 0 16 20 32 0 16 20 32 0M250 692q16 18 32 0 16 18 32 0 16 18 32 0" fill="none" stroke="#f0d8a8" stroke-width="7" stroke-linecap="round"/>` +
    `<circle cx="246" cy="596" r="44" fill="#fbf6e8"/><circle cx="352" cy="604" r="34" fill="#fbf6e8"/><circle cx="254" cy="604" r="17" fill="#2a160c"/><circle cx="344" cy="598" r="14" fill="#2a160c"/><circle cx="248" cy="598" r="5" fill="#fff"/><circle cx="340" cy="593" r="4" fill="#fff"/>` +
    `<path d="M286 620l34 4-20 34z" fill="#f08a2a"/><path d="M178 640q-26 30-6 66M428 650q22 26 2 62" fill="none" stroke="#5a3018" stroke-width="14" stroke-linecap="round"/></g>` +
    candle(216, 520, '#e04a6a', -10) + candle(300, 500, '#4a9ae0', 2) + candle(382, 520, '#5ac08a', 9) +
    // Ada's hands on the plate
    `<g fill="${ADA.skin}"><path d="M70 800Q60 730 110 716q26-4 36 14-30 6-40 30l-6 40z"/><path d="M530 800Q544 730 494 716q-26-4-36 14 30 6 40 30l6 40z"/></g>` +
    `<g fill="#27447a"><path d="M-10 800Q20 730 80 738L96 800Z"/><path d="M610 800Q580 730 522 738L506 800Z"/></g>`;
  return frame(k, 600, 800, defs, body, 0.17, 0.5);
}

export const case2Art: Record<string, string> = {
  cover_case2: coverCase2(),
  wall_c2_lock: wallLock(),
  wall_c2_home: wallHome(),
  map_c2: mapC2(),
  av_c2_cass: avCass(),
  av_c2_ada: avAda(),
  av_c2_pell: avPell(),
  av_c2_moth: avMoth(),
  av_c2_rhea: avRhea(),
  av_c2_benny: avBenny(),
  c2_ph_sign: phSign(),
  c2_ph_duo: phDuo(),
  c2_ph_festival: phFestival(),
  c2_ph_mothcar: phMothcar(),
  c2_ph_coop: phCoop(),
  c2_ph_stairs: phStairs(),
  c2_ph_sickbed: phSickbed(),
  c2_ph_lisbon: phLisbon(),
  c2_ph_notice: phNotice(),
  c2_ph_contract: phContract(),
  c2_ph_van: phVan(),
  c2_ph_bench: phBench(),
  c2_ph_ada: phAda(),
};
