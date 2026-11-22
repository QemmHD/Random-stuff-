// COLD SIGNAL — CAUGHT mode, case C2 "Mystery Man" (owner: Nora Pruitt; player: Greg).
// Every value in `caught2Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key. Suggestive, never explicit.

const SANS = 'font-family="Helvetica, Arial, sans-serif"';
const SERIF = 'font-family="Georgia, Times New Roman, serif"';
const HAND = 'font-family="Marker Felt, Chalkboard SE, Comic Sans MS, sans-serif"';
const R = (v: number): number => Math.round(v * 10) / 10;
const tx = (x: number, y: number, size: number, s: string, fill: string, extra = '', font = SANS): string =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${font} font-weight="700" text-anchor="middle" ${extra}>${s}</text>`;
const txs = (x: number, y: number, size: number, s: string, fill: string, extra = '', font = SANS): string =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${font} ${extra}>${s}</text>`;
const lg = (id: string, a: string, b: string, x2 = 0, y2 = 1): string =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const glow = (id: string, c: string, a = 0.8): string =>
  `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${a}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
const orb = (x: number, y: number, r: number, id: string, o = 1): string => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})" opacity="${o}"/>`;

/** Form-shadow + rim-light filter: shades the right edge of whatever silhouette it is applied to. */
const shf = (id: string, rim: string, dx = -11, d = 0.36): string =>
  `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feOffset in="SourceAlpha" dx="${dx}" dy="3" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="e"/><feFlood flood-color="#14060e" flood-opacity="${d}"/><feComposite in2="e" operator="in" result="s"/><feOffset in="SourceAlpha" dx="-4" result="p"/><feComposite in="SourceAlpha" in2="p" operator="out" result="q"/><feFlood flood-color="${rim}" flood-opacity=".95"/><feComposite in2="q" operator="in" result="r"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="s"/><feMergeNode in="r"/></feMerge></filter>`;

/** Wraps a picture: defs + clip + film grain + vignette. Figures use filter url(#<k>f). */
const frame = (k: string, w: number, h: number, rim: string, defs: string, body: string, vig = 0.55): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs>${defs}${shf(`${k}f`, rim)}` +
  `<filter id="${k}gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7"/><feColorMatrix values=".6 .6 .6 0 -.4 .6 .6 .6 0 -.4 .6 .6 .6 0 -.4 0 0 0 0 1"/></filter>` +
  `<radialGradient id="${k}vg" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${vig}"/></radialGradient>` +
  `<clipPath id="${k}fr"><rect width="${w}" height="${h}"/></clipPath></defs><g clip-path="url(#${k}fr)">${body}<rect width="${w}" height="${h}" filter="url(#${k}gr)" opacity=".14" style="mix-blend-mode:overlay"/><rect width="${w}" height="${h}" fill="url(#${k}vg)"/></g></svg>`;

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
  lid?: number; lash?: boolean; shadow?: string; back?: string; front?: string; noEars?: boolean;
}
const HEAD = 'M67 80C67 34 133 34 133 80C133 106 122 131 100 131C78 131 67 106 67 80Z';
function face(o: Face, withBack = true): string {
  const lid = o.lid ?? 0.9;
  const c = 85.4 + lid * 1.6;
  const eye = (x: number): string =>
    `<path d="M${x - 7} 91.5Q${x} 85.5 ${x + 7} 91Q${x} 96.5 ${x - 7} 91.5Z" fill="#f1e9df"/><circle cx="${x}" cy="91" r="3.5" fill="${o.iris}"/><circle cx="${x - 1.2}" cy="90.4" r=".9" fill="#fff"/>` +
    `<path d="M${x - 8.5} 92Q${x} ${R(c)} ${x + 8.5} 91.4V82H${x - 8.5}Z" fill="${o.sk}"/>` +
    (o.shadow ? `<path d="M${x - 8.5} 92Q${x} ${R(c)} ${x + 8.5} 91.4Q${x} ${R(c - 9)} ${x - 8.5} 92Z" fill="${o.shadow}" opacity=".6"/>` : '');
  return (withBack ? o.back ?? '' : '') +
    (o.noEars ? '' : `<ellipse cx="67" cy="94" rx="5" ry="9" fill="${o.sk}"/><ellipse cx="133" cy="94" rx="5" ry="9" fill="${o.sh}"/>`) +
    `<path d="${HEAD}" fill="${o.sk}"/>${eye(87)}${eye(113)}` +
    `<path d="M109 37C105 60 109 72 106 84C104 97 111 103 108 112C106 122 104 128 99 131C122 131 133 106 133 80C133 60 126 44 109 37Z" fill="${o.sh}" opacity=".7"/>` +
    `<path d="M70 62Q80 50 96 48Q78 56 72 76Z" fill="#fff" opacity=".13"/><path d="M131.500 68V80C131.500 105 121 129.500 100 129.500" fill="none" stroke="${o.rim}" stroke-width="2.4" opacity=".7"/>` +
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M79 92Q87 ${R(c)} 95 91.4M105 91.4Q113 ${R(c)} 121 92${o.lash ? 'M79 92l-4-2.800M121 92l4-2.800' : ''}" stroke="#1a1318" stroke-width="${o.lash ? 2.5 : 2}"/>` +
    `<path d="${o.brows}" stroke="${o.browC}" stroke-width="3.2"/><path d="M102 95Q105 104 105.500 108Q101 112 95 108.500" stroke="#000" stroke-opacity=".38" stroke-width="1.9"/>${o.mouth}</g>${o.front ?? ''}`;
}
const lips = (c: string, d: string, open = false): string =>
  `<path d="M88 114Q94 110.500 100 113Q106 110.500 112 114Q100 ${open ? 127 : 123} 88 114Z" fill="${c}" stroke="${d}" stroke-width="1"/>` +
  (open ? '<path d="M91 115Q100 117.500 109 115L107 118Q100 120 93 118Z" fill="#fff" stroke="none"/>' : `<path d="M88 114Q100 117.500 112 114" stroke="${d}" stroke-width="1.300"/>`) +
  '<path d="M94 120.500q5-2 9-.5" stroke="#fff" stroke-width="1.200" opacity=".45"/>';
const smirk = (c: string): string => `<path d="M90 116.500Q100 119.500 111 113" stroke="${c}" stroke-width="2.600"/><path d="M111 113q2.500-1 3-4" stroke="${c}" stroke-width="1.500"/>`;
const grin = (c: string, w = 14.5): string => `<path d="M${100 - w} 112.500Q100 117 ${100 + w} 112.500Q${98 + w} 125 100 125Q${102 - w} 125 ${100 - w} 112.500Z" fill="#fff" stroke="${c}" stroke-width="1.600"/><path d="M${103 - w} 118.500Q100 122 ${97 + w} 118.500" stroke="${c}" stroke-width=".8" opacity=".5"/>`;
const laugh = (c: string): string => `<path d="M86 111Q100 115.500 114 111Q113 129 100 129Q87 129 86 111Z" fill="#5a1420" stroke="${c}" stroke-width="1.500"/><path d="M88.500 112.500Q100 116.500 111.500 112.500L110.500 116.500Q100 119.500 89.500 116.500Z" fill="#fff" stroke="none"/><path d="M93 126Q100 121 107 126Q100 129 93 126Z" fill="#e0607a" stroke="none"/>`;
const BROW = 'M77.500 80Q86 75.500 95 78.500M105 78.500Q114 75.500 122.500 80';
const BROW_UP = 'M77 78Q86 72 95 76.500M105 76.500Q114 72 123 78';

// ---------- the cast ----------
const NH = '#a8431f', NHD = '#7a2c12';
const GLASSES = '<g stroke="#3a2016" stroke-width="2.400"><rect x="75.500" y="82" width="22" height="17" rx="7" fill="#fff" fill-opacity=".14"/><rect x="102.500" y="82" width="22" height="17" rx="7" fill="#fff" fill-opacity=".14"/><path d="M97.500 89h5M75.500 88l-8-3M124.500 88l8-3" fill="none"/></g><path d="M79 86l6-2M106 86l6-2" stroke="#fff" stroke-width="1.600" opacity=".6"/>';
const nora = (mouth: string, glasses = true, lid = 0.9, extra = ''): Face => ({
  sk: '#f3cbab', sh: '#c98d70', rim: '#ffd9a0', iris: '#3f7a4e', browC: NHD, brows: BROW, mouth, lid, lash: true,
  back: `<g fill="${NH}"><circle cx="107" cy="31" r="16"/><path d="M63 102C54 52 78 35 100 35C122 35 146 52 137 102L132 70H68Z"/></g><path d="M96 26Q107 18 118 28M98 36Q108 30 120 36" fill="none" stroke="${NHD}" stroke-width="2"/>`,
  front: `<path d="M66 86C61 55 80 42 100 42C120 42 139 55 134 86C131 70 122 60 108 57C96 67 76 66 66 86Z" fill="${NH}"/><path d="M76 52Q88 44 102 45" fill="none" stroke="#d9683a" stroke-width="2.500" opacity=".7"/><path d="M67 84Q61 100 66 114M133 86Q139 100 135 112" fill="none" stroke="${NH}" stroke-width="2.600" stroke-linecap="round"/>${glasses ? GLASSES : ''}${extra}`,
});
const greg = (mouth: string, lid = 0.9, brows = BROW_UP): Face => ({
  sk: '#eec2a2', sh: '#b98464', rim: '#ffe2b0', iris: '#4a6a8a', browC: '#4a3020', brows, mouth, lid,
  front: '<path d="M65 82C60 49 80 37 101 37C122 37 140 49 135 82C132 66 124 58 112 56Q96 51 80 60Q70 66 65 82Z" fill="#5c4030"/><path d="M78 50Q90 42 104 43" fill="none" stroke="#8a6648" stroke-width="2.500" opacity=".7"/>',
});
const bernard = (mouth: string, lid = 0.9, extra = ''): Face => ({
  sk: '#7d4b31', sh: '#4c2a1b', rim: '#ffcf8a', iris: '#1c100c', browC: '#d9dde2', brows: BROW, mouth: '', lid,
  back: '<path d="M64 100C56 74 62 54 72 48L76 96ZM136 100C144 74 138 54 128 48L124 96Z" fill="#cfd4da"/>',
  front: `<path d="M67 98C70 126 84 138 100 138C116 138 130 126 133 98C126 110 114 106 100 106C86 106 74 110 67 98Z" fill="#dfe3e8"/><path d="M110 108C124 108 130 104 133 98C130 126 116 138 100 138C112 132 114 120 110 108Z" fill="#9aa3ad" opacity=".6"/><path d="M84 110Q100 100 116 110Q100 113 84 110Z" fill="#f2f4f6"/><g fill="none" stroke-linecap="round">${mouth}</g><g fill="none" stroke="#d8b25a" stroke-width="1.800"><circle cx="87" cy="91" r="10"/><circle cx="113" cy="91" r="10"/><path d="M97 90h6"/></g>${extra}`,
});
const dev = (mouth: string): Face => ({
  sk: '#bd7d54', sh: '#84502f', rim: '#9fe8ff', iris: '#22140c', browC: '#1c1210', brows: BROW_UP, mouth, noEars: true,
  front: '<path d="M88 126Q100 132 112 126" fill="none" stroke="#1c1210" stroke-width="3" opacity=".45" stroke-dasharray="1 3"/><path d="M62 80C56 28 144 28 138 80Q100 62 62 80Z" fill="#dba622"/><path d="M61 82Q100 64 139 82V69Q100 51 61 69Z" fill="#b58310"/><path d="M57 92C48 6 152 6 143 92" fill="none" stroke="#20232b" stroke-width="7"/><rect x="48" y="76" width="19" height="38" rx="9" fill="#20232b"/><rect x="133" y="76" width="19" height="38" rx="9" fill="#20232b"/><path d="M52 84v22M148 84v22" stroke="#3fd6c8" stroke-width="2.500"/>',
});
const BH = '#8e3a1b';
const bea = (mouth: string): Face => ({
  sk: '#f1c5a3', sh: '#c48868', rim: '#e9a0ff', iris: '#3f7a4e', browC: '#6a2a12', brows: BROW_UP, mouth, lash: true,
  back: `<g fill="${BH}"><path d="M118 42C150 22 172 58 154 104C152 82 142 66 126 60Z"/><path d="M64 98C56 52 78 36 100 36C122 36 144 52 136 98L132 70H68Z"/></g>`,
  front: `<path d="M66 84C62 55 80 43 100 43C120 43 138 55 134 84C130 64 116 58 100 58C84 58 70 64 66 84Z" fill="${BH}"/><path d="M65 74Q100 52 135 74V63Q100 41 65 63Z" fill="#ff4fa0"/><path d="M70 66Q100 48 130 66" fill="none" stroke="#ffb0d6" stroke-width="1.500"/><path d="M74 100q-3 6 0 8q3-2 0-8M127 76q-3 6 0 8q3-2 0-8" fill="#bfe9ff" opacity=".85"/>`,
});
const TB = '#f0cf78', TBD = '#c79a3a';
const tiffani = (mouth: string, lid = 0.9): Face => ({
  sk: '#e9b28c', sh: '#b27654', rim: '#ffd7e6', iris: '#3a6a9a', browC: '#8a6020', brows: BROW_UP, mouth, lid, lash: true, shadow: '#b86a9a',
  back: `<path d="M50 152C32 110 40 48 70 32C92 18 126 20 142 40C164 62 166 112 152 152C142 164 126 152 130 132L134 70H66L70 132C74 152 60 164 50 152Z" fill="${TB}"/><path d="M52 120Q46 90 56 62M148 120Q156 92 146 62M58 146Q64 130 60 110" fill="none" stroke="${TBD}" stroke-width="2.500" stroke-linecap="round"/>`,
  front: `<path d="M65 90C58 54 80 38 104 38C126 38 142 54 135 90C132 72 124 60 114 55C100 68 76 64 65 90Z" fill="${TB}"/><path d="M74 54Q90 42 108 43M112 55Q124 62 130 76" fill="none" stroke="#fff3c4" stroke-width="2.500" opacity=".8" stroke-linecap="round"/>`,
});
const GARY: Face = {
  sk: '#ecc3aa', sh: '#b78a72', rim: '#ffe0b0', iris: '#5a4a3a', browC: '#9a9da3', brows: 'M77 81Q86 76 95 80M105 75Q114 69 123 75',
  mouth: '<path d="M92 121Q97 118 102 121Q106 123 110 119" stroke="#7a3a30" stroke-width="2.400"/>',
  back: '<path d="M63 102C54 78 60 60 70 54L74 98ZM137 102C146 78 140 60 130 54L126 98Z" fill="#b9bcc2"/>',
  front: '<path d="M86 113Q100 104 114 113Q100 116 86 113Z" fill="#c9ccd1"/><g fill="none" stroke="#4a4038" stroke-width="2"><rect x="76" y="83" width="21" height="15" rx="3"/><rect x="103" y="83" width="21" height="15" rx="3"/><path d="M97 89h6"/></g><path d="M80 50Q92 44 104 46" fill="none" stroke="#fff" stroke-width="3" opacity=".25" stroke-linecap="round"/>',
};

// ---------- clothed busts for scenes (origin = pit of the neck; head centre at 0,HY, scale HS) ----------
const HS = 1.14, HY = -70;
const CL = 'M-20-8Q-44-2-68 6Q-88 12-92 38L-100 264H100L92 38Q88 12 68 6Q44-2 20-8Q0 14-20-8Z';
const neck = (sk: string, sh: string): string => `<path d="M-16-50V-6Q0 12 16-6V-50Z" fill="${sk}"/><path d="M-16-30Q0-14 16-32V-6Q0 12-16-6Z" fill="${sh}" opacity=".5"/>`;
/** Nora's big oatmeal cardigan over a tee. */
const cardigan = (tee = '#c9737f', c = '#e2cfae', d = '#b59a72'): string =>
  `<path d="${CL}" fill="${c}"/><path d="M-20-8L0 96L20-8Q0 14-20-8Z" fill="${tee}"/><path d="M-22-9L-2 100V264M22-9L2 100" fill="none" stroke="${d}" stroke-width="7"/>` +
  `<path d="M-60 30v230M-40 20v240M40 20v240M60 30v230M-80 60v200M80 60v200" stroke="${d}" stroke-width="1.500" opacity=".45"/><g fill="#7a5a3a"><circle cx="8" cy="130" r="4.500"/><circle cx="8" cy="176" r="4.500"/><circle cx="8" cy="222" r="4.500"/></g>`;
const GREGTAG = (x: number, y: number, s = 1): string =>
  `<g transform="translate(${x} ${y}) scale(${s})" ${SANS} font-weight="700" text-anchor="middle" fill="#f4f6f8"><text font-size="13" letter-spacing="1">GREG</text><text y="9" font-size="5.600" letter-spacing=".6">· DREAMHAVEN ·</text></g>`;
/** Greg's grey fleece vest over a shirt, embroidered. */
const vest = (shirt = '#5f86b8'): string =>
  `<path d="${CL}" fill="${shirt}"/><path d="M-22-10Q-44-2-62 6L-70 264H70L62 6Q44-2 22-10L14 14H-14Z" fill="#8b9199"/><path d="M-22-10L-14 16H14L22-10Q30-12 30-22L18-30L0-8L-18-30L-30-22Q-30-12-22-10Z" fill="#a4aab2"/>` +
  `<path d="M0-6V264" stroke="#5c626a" stroke-width="3" stroke-dasharray="2 2"/><path d="M-62 8Q-56 80-66 150M62 8Q56 80 66 150" fill="none" stroke="#6c727a" stroke-width="3"/>${GREGTAG(36, 62)}`;
/** Bernard's tweed jacket, waistcoat and bow tie. */
const tweed = (bow = '#b3202c'): string =>
  `<path d="${CL}" fill="#5a4636"/><path d="M-20-8L0 110L20-8Q0 14-20-8Z" fill="#f1ead8"/><path d="M-12 40L0 110L12 40V264H-12Z" fill="#8a6a3a" opacity=".0"/><path d="M-22-9L-40 60L-4 120V264M22-9L40 60L4 120" fill="none" stroke="#3c2e22" stroke-width="5" stroke-linejoin="round"/>` +
  `<path d="M0 12L-22-2V26ZM0 12L22-2V26Z" fill="${bow}"/><circle cy="12" r="5" fill="#7a121c"/><g fill="#3c2e22"><circle cx="0" cy="150" r="4"/><circle cx="0" cy="196" r="4"/></g>`;
const hoodie = (c: string, d: string): string =>
  `<path d="${CL}" fill="${c}"/><path d="M-30-12Q0 34 30-12L22 22Q0 44-22 22Z" fill="${d}"/><path d="M-8 30v56M8 30v64" stroke="#f1ead8" stroke-width="3" stroke-linecap="round"/><path d="M-50 190H50V264H-50Z" fill="${d}" opacity=".5"/>`;
/** A clothed bust: clothes + neck + head. */
const bust = (x: number, y: number, s: number, rot: number, f: Face, clothes: string, k: string, tilt = 0, over = ''): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><g filter="url(#${k}f)">${at(0, HY, HS, tilt, `<g transform="translate(-100 -85)">${f.back ?? ''}</g>`)}${clothes}${neck(f.sk, f.sh)}</g>${at(0, HY, HS, tilt, `<g transform="translate(-100 -85)">${face(f, false)}</g>`)}${over}</g>`;
/** A hand: palm blob with finger hints. */
const hand = (x: number, y: number, rot: number, sk: string, sh: string, s = 1): string =>
  at(x, y, s, rot, `<path d="M-12-6Q-12-16 0-16Q12-16 12-6V10Q12 20 0 20Q-12 20-12 10Z" fill="${sk}"/><path d="M-5 6v12M1 7v13M7 6v11" stroke="${sh}" stroke-width="1.600" fill="none" opacity=".7"/>`);
/** Thumbs-up fist (origin = centre of fist). */
const thumb = (x: number, y: number, s: number, sk: string, sh: string): string =>
  at(x, y, s, 0, `<path d="M-9-8V-30Q-9-38-2-38Q5-38 5-30V-8Z" fill="${sk}"/><rect x="-16" y="-12" width="32" height="32" rx="10" fill="${sk}"/><path d="M-4-2h18M-4 6h18M-4 14h16" stroke="${sh}" stroke-width="1.800" fill="none" opacity=".7" stroke-linecap="round"/>`);
/** Phone held up for a mirror selfie (centre x,y). */
const phone = (x: number, y: number, rot: number, c: string, sk: string): string =>
  at(x, y, 1, rot, `<rect x="-26" y="-46" width="52" height="92" rx="9" fill="${c}"/><rect x="-18" y="-39" width="20" height="20" rx="6" fill="#0c0c12"/><circle cx="-12" cy="-33" r="3.500" fill="#39405a"/><circle cx="-4" cy="-25" r="3.500" fill="#39405a"/>` +
    `<g fill="${sk}"><rect x="8" y="-6" width="24" height="11" rx="5.500"/><rect x="10" y="7" width="23" height="11" rx="5.500"/><rect x="10" y="20" width="21" height="11" rx="5.500"/><rect x="9" y="33" width="18" height="10" rx="5"/></g>`);
const note = (x: number, y: number, w: number, h: number, rot: number, c: string, body: string): string =>
  at(x, y, 1, rot, `<rect x="${-w / 2 + 3}" y="${-h / 2 + 4}" width="${w}" height="${h}" fill="#000" opacity=".3"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="${c}"/>${body}`);

// ---------- avatars (200x200) ----------
const SH = 'M12 200C14 166 44 152 80 146H120C156 152 186 166 188 200Z';
const av = (k: string, a: string, b: string, c: string, rim: string, body: string): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><radialGradient id="${k}b" cx=".28" cy=".2" r="1.05"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>` +
  `<radialGradient id="${k}v" cx=".5" cy=".42" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>${glow(`${k}r`, rim, 0.5)}<clipPath id="${k}s"><path d="${SH}"/></clipPath></defs>` +
  `<rect width="200" height="200" fill="url(#${k}b)"/><circle cx="164" cy="60" r="100" fill="url(#${k}r)"/>${body}<rect width="200" height="200" fill="url(#${k}v)"/></svg>`;
/** Avatar bust: back hair, shoulders (clipped details), neck, face. */
const avBust = (k: string, f: Face, cloth: string, details: string, over = ''): string =>
  `${f.back ?? ''}<path d="${SH}" fill="${cloth}"/><g clip-path="url(#${k}s)">${details}<path d="M106 140H200V200H114Z" fill="#000" opacity=".22"/><path d="M120 146C156 152 186 166 188 200" fill="none" stroke="${f.rim}" stroke-width="5" opacity=".7"/></g>` +
  `<path d="M85 118V150Q100 162 115 150V118Z" fill="${f.sh}"/><path d="M85 124V149Q90 153 95 155L93 132Z" fill="${f.sk}" opacity=".6"/>${face(f, false)}${over}`;

const avNora = (k: string): string => av(k, '#e0a35a', '#7a4a34', '#1c1016', '#ffd9a0',
  avBust(k, nora(smirk('#a8405a'), true, 1.6), '#e2cfae',
    '<path d="M82 146L100 190L118 146Q100 160 82 146Z" fill="#c9737f"/><path d="M80 145L99 192V200M120 145L101 192" fill="none" stroke="#b59a72" stroke-width="5"/><path d="M40 160v40M58 154v46M142 154v46M160 160v40" stroke="#b59a72" stroke-width="1.500" opacity=".5"/>',
    '<g transform="rotate(24 136 86)"><rect x="133.500" y="52" width="5" height="50" rx="2" fill="#1f5f8a"/><path d="M133.500 102h5l-2.500 9Z" fill="#e8d9b0"/><rect x="133.500" y="52" width="5" height="8" fill="#d8b25a"/></g><path d="M130 84Q138 92 134 104" fill="none" stroke="#a8431f" stroke-width="3" stroke-linecap="round"/>'));

const avGreg = (k: string): string => av(k, '#7fb0d8', '#33506e', '#0c1420', '#cfe6ff',
  avBust(k, greg(grin('#7a3a30', 19), 0.5), '#5f86b8',
    `<path d="M40 200L52 152Q66 148 82 146L92 166H108L118 146Q134 148 148 152L160 200Z" fill="#8b9199"/><path d="M82 146L92 168H108L118 146L124 136L112 132L100 152L88 132L76 136Z" fill="#a4aab2"/><path d="M100 152V200" stroke="#5c626a" stroke-width="2.500" stroke-dasharray="2 2"/>` +
    `<path d="M80 147L70 200M120 147L112 186" stroke="#e23d5a" stroke-width="4.500"/><rect x="98" y="182" width="28" height="18" rx="2" fill="#fff"/><text x="112" y="193" font-size="4.300" fill="#1c3a6a" ${SANS} font-weight="700" text-anchor="middle">DREAMHAVEN</text>${GREGTAG(138, 172, 0.8)}`));

const avMystery = (k: string): string => av(k, '#a0182a', '#5a0a16', '#16020a', '#ff5a6a',
  `<filter id="${k}sm" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".018 .03" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 .75 0 0 0 0 .8 0 0 0 1.500 -.72"/></filter><filter id="${k}bl"><feGaussianBlur stdDeviation="1.200"/></filter>` +
  `<path d="M40 30C28 12 8 26 16 46C22 62 40 68 44 80C54 66 72 54 72 38C72 20 52 14 40 30Z" fill="#0a0206" stroke="#ff8a96" stroke-opacity=".35" stroke-width="1.200"/>` +
  `<g filter="url(#${k}bl)"><path d="M18 200C20 164 46 150 78 144L84 128C70 118 66 100 68 84H132C134 100 130 118 116 128L122 144C154 150 180 164 182 200Z" fill="#0d0308"/><path d="M40 82Q100 96 160 82Q164 74 150 72L140 40Q136 28 100 30Q64 28 60 40L50 72Q36 74 40 82Z" fill="#0d0308"/>` +
  `<path d="M57 71Q100 82 143 71" fill="none" stroke="#3a0e16" stroke-width="5"/><path d="M100 152L80 141V165ZM100 152L120 141V165Z" fill="#451019"/><circle cx="100" cy="152" r="4.500" fill="#5c1622"/>` +
  `<path d="M160 200V132Q160 118 172 118Q182 118 182 128" fill="none" stroke="#4a121c" stroke-width="5.500" stroke-linecap="round"/><ellipse cx="160" cy="150" rx="10" ry="8" fill="#12040a"/><path d="M118 96Q132 104 131 86" fill="none" stroke="#ff8a96" stroke-width="1.500" opacity=".5"/><path d="M148 74L139 41" stroke="#ff8a96" stroke-width="1.500" opacity=".45"/></g>` +
  `<rect width="200" height="200" filter="url(#${k}sm)" opacity=".5"/>`);

const avDev = (k: string): string => { const f = dev(grin('#5a2a1c')); return av(k, '#3fb8b0', '#1f5f6a', '#081a22', '#9fe8ff',
  avBust(k, f, '#2c3440', '<path d="M76 142Q100 176 124 142L118 168Q100 184 82 168Z" fill="#1c222c"/><path d="M92 170v26M108 170v30" stroke="#e8ecf0" stroke-width="2.500" stroke-linecap="round"/>',
    `<path d="M150 200L152 176H178L182 200Z" fill="#2c3440"/>${thumb(165, 160, 1, f.sk, f.sh)}`)); };

const avBea = (k: string): string => { const f = bea(lips('#e0507a', '#8a2040', true)); return av(k, '#b070e0', '#5a3088', '#140a26', '#e9a0ff',
  avBust(k, f, '#1fb5a8', '<path d="M80 146Q100 172 120 146L126 150Q100 186 74 150Z" fill="#0e7d74"/>',
    `<path d="M50 170H150L144 200H56Z" fill="#c4ced6"/><rect x="46" y="160" width="108" height="14" rx="4" fill="#f0b040"/><path d="M48 166q9-7 18 0t18 0t18 0t18 0t18 0t14 0" fill="none" stroke="#c0281c" stroke-width="3.500"/><g fill="#a85a18" opacity=".7"><circle cx="66" cy="164" r="3"/><circle cx="102" cy="163" r="3.500"/><circle cx="134" cy="165" r="3"/></g>` +
    `<path d="M76 152q-5-8 0-14M100 150q-5-8 0-14M124 152q-5-8 0-14" fill="none" stroke="#fff" stroke-width="2.200" stroke-linecap="round" opacity=".6"/><rect x="26" y="158" width="28" height="30" rx="11" fill="#e23d5a"/><rect x="146" y="158" width="28" height="30" rx="11" fill="#b02038"/>`)); };

const avTiffani = (k: string): string => { const f = tiffani(grin('#b0304a', 17)); return av(k, '#ff9a8a', '#b04a5a', '#2a0c1c', '#ffd7e6',
  avBust(k, f, '#f05a6a',
    '<path d="M82 146L100 188L118 146Q100 158 82 146Z" fill="#fff4ea"/><path d="M82 146L66 170L96 200M118 146L134 170L104 200" fill="none" stroke="#c03a50" stroke-width="4"/><path d="M84 148L108 186M116 148L110 184" stroke="#2f9a5a" stroke-width="4"/><rect x="96" y="182" width="26" height="18" rx="2" fill="#fff"/><text x="109" y="195" font-size="9" fill="#2f9a5a" ' + SANS + ' font-weight="700" text-anchor="middle">HOA</text>',
    `<path d="M52 150Q46 170 56 184M148 150Q156 170 146 184" fill="none" stroke="${TB}" stroke-width="12" stroke-linecap="round"/><g transform="rotate(-12 42 168)"><rect x="14" y="138" width="54" height="70" rx="4" fill="#8a5a30"/><rect x="19" y="146" width="44" height="60" fill="#fffdf5"/><rect x="31" y="133" width="20" height="12" rx="3" fill="#c9ccd1"/><path d="M24 158h34M24 168h34M24 178h26" stroke="#9aa3ad" stroke-width="2"/><path d="M24 188l4 4l8-9" fill="none" stroke="#e23d5a" stroke-width="2.500"/></g>${hand(66, 184, 60, f.sk, f.sh, 0.9)}`)); };

const avGary = (k: string): string => av(k, '#d9c08a', '#7a6a4a', '#1c160e', '#ffe0b0',
  avBust(k, GARY, '#a8703a',
    '<path d="M82 146L100 184L118 146Q100 158 82 146Z" fill="#dfe6ea"/><path d="M80 145L99 188V200M120 145L101 188" fill="none" stroke="#7a4e24" stroke-width="5"/><g fill="#4a3018"><circle cx="106" cy="194" r="2.500"/></g>',
    `<g fill="#a8703a">${limb([40, 190, 13], [30, 164, 10])}</g>${hand(30, 152, 180, GARY.sk, GARY.sh, 0.8)}<g transform="translate(-6 14) rotate(-8 30 110)"><path d="M6 96H58V132H6Z" fill="#8b9199"/><path d="M6 96H58V106H6Z" fill="#a4aab2"/><path d="M32 96V132" stroke="#5c626a" stroke-width="2" stroke-dasharray="2 2"/>${GREGTAG(45, 120, 0.55)}</g><text x="52" y="100" font-size="20" fill="#fff" ${SANS} font-weight="700" opacity=".85">?</text>`));

const house = (x: number, y: number, s: number): string => at(x, y, s, 0,
  '<path d="M-22 0V-22L0-40L22-22V0Z" fill="#e9dcc4"/><path d="M-27-20L0-44L27-20L22-16L0-36L-22-16Z" fill="#8a4a3a"/><rect x="-5" y="-14" width="10" height="14" fill="#5a3a2a"/><rect x="-17" y="-18" width="8" height="8" fill="#ffd36a"/><rect x="9" y="-18" width="8" height="8" fill="#ffd36a"/><path d="M0-40L22-22V0H8V-30Z" fill="#000" opacity=".16"/>');
const avHoa = (k: string): string => av(k, '#ffb070', '#c0506a', '#2a1440', '#ffe6a0',
  `<path d="M0 150Q100 120 200 150V200H0Z" fill="#3f7a4a"/><ellipse cx="100" cy="196" rx="74" ry="26" fill="#4a4a58"/><ellipse cx="100" cy="196" rx="30" ry="9" fill="#3f7a4a"/>${house(30, 158, 0.9)}${house(76, 148, 0.8)}${house(170, 158, 0.9)}` +
  `<g stroke="#fff" stroke-width=".8" opacity=".6"><path d="M98 132L84 152M150 132L164 150"/></g>` +
  `<g transform="translate(124 96)"><g stroke="#3a1c10" stroke-width="1.200">${[-70, -46, -22, 2, 26, 50, 74].map((a, i) => `<path transform="rotate(${a} 8 30)" d="M8 30L-4-50Q8-62 20-50Z" fill="${['#e2572a', '#f0a030', '#ffd24a'][i % 3]}"/>`).join('')}</g>` +
  `<ellipse cx="4" cy="16" rx="34" ry="32" fill="#8a4a24"/><ellipse cx="-6" cy="8" rx="18" ry="14" fill="#a8623a" opacity=".7"/><path d="M-26-2Q-40-22-30-40Q-18-48-14-32Q-12-14-14 2Z" fill="#9a5a2e"/><circle cx="-26" cy="-36" r="2.500" fill="#fff"/><circle cx="-26.500" cy="-36" r="1.200"/><path d="M-34-32l-11 3l10 4Z" fill="#ffc23a"/><path d="M-33-25q-4 10 2 14q3-6 1-14Z" fill="#e2203a"/><path d="M-10 46v8M14 46v8" stroke="#ffc23a" stroke-width="4"/><path d="M18-6Q34 0 30 22" fill="none" stroke="#fff" stroke-width="3" opacity=".3" stroke-linecap="round"/></g>${house(124, 164, 1)}`);

// ---------- cover, wallpapers, map ----------
const cover = (k: string): string => frame(k, 600, 800, '#8fd8ff',
  lg(`${k}w`, '#1a1a3a', '#0c0a1c') + lg(`${k}n`, '#0a1030', '#2a2050') + glow(`${k}g`, '#9fe4ff', 0.75) + glow(`${k}p`, '#ff4a8a', 0.9) + lg(`${k}d`, '#3a4a78', '#161a36') +
  `<pattern id="${k}r" width="9" height="7" patternUnits="userSpaceOnUse"><ellipse cx="2.500" cy="2" rx="2.200" ry="1.100" fill="#fff" transform="rotate(30 2.500 2)"/><ellipse cx="6.500" cy="5" rx="2.200" ry="1.100" fill="#e6dcc4" transform="rotate(-40 6.500 5)"/></pattern>`,
  `<rect width="600" height="800" fill="url(#${k}w)"/>` +
  // window with the far-off motel sign
  `<rect x="250" y="150" width="310" height="250" fill="url(#${k}n)"/><g fill="#fff" opacity=".7"><circle cx="280" cy="180" r="1.200"/><circle cx="350" cy="170" r="1"/><circle cx="520" cy="196" r="1.300"/><circle cx="470" cy="214" r="1"/><circle cx="388" cy="230" r="1"/></g>` +
  `<path d="M250 352Q320 330 400 346Q500 326 560 350V400H250Z" fill="#0a0c1c"/>${orb(326, 300, 80, `${k}p`, 0.6)}<path d="M326 320V362" stroke="#1c1c2c" stroke-width="4"/><rect x="262" y="276" width="128" height="46" rx="4" fill="#1a0a1c" stroke="#ff5a96" stroke-width="2"/>` +
  tx(326, 295, 10.5, 'WYETH MOTOR LODGE', '#ff9ac0', 'letter-spacing=".4"') + tx(326, 312, 10, '— VACANCY —', '#7ff0ff', 'letter-spacing="1"') +
  `<g fill="#ffd98a"><rect x="270" y="366" width="5" height="4"/><rect x="282" y="366" width="5" height="4"/><rect x="530" y="370" width="5" height="4"/></g>` +
  `<path d="M250 150H560V400H250ZM405 150V400M250 275H560" fill="none" stroke="#2c2a4a" stroke-width="9"/><rect x="238" y="398" width="334" height="12" fill="#34325a"/>` +
  `<path d="M214 130H252Q258 280 240 420H214Z" fill="#2a2850"/><path d="M596 130H544Q532 280 560 420H596Z" fill="#222044"/><rect x="204" y="124" width="400" height="10" rx="5" fill="#3a3866"/>` +
  `<path d="M0 800L250 400H560L420 800Z" fill="#6a8ad8" opacity=".06"/>` +
  // bed + sleeper facing the wall
  `<rect x="-10" y="330" width="60" height="330" rx="14" fill="#241c34"/><rect x="-10" y="520" width="450" height="130" fill="#141226"/>` +
  `<path d="M24 470Q30 428 96 430Q176 432 190 470Q184 500 100 500Q30 500 24 470Z" fill="#c9cfe6"/><path d="M24 470Q30 428 96 430Q176 432 190 470" fill="none" stroke="#9fd0ff" stroke-width="2" opacity=".5"/>` +
  `<g filter="url(#${k}f)"><path d="M70 452C66 418 96 404 126 410C156 414 172 440 160 468C150 486 96 488 70 452Z" fill="${NH}"/><path d="M150 470Q176 474 190 492L150 500Z" fill="${NH}"/>` +
  `<path d="M-10 530C40 520 110 500 150 468C190 424 250 410 300 430C360 452 410 500 440 540V660H-10Z" fill="url(#${k}d)"/></g>` +
  `<path d="M90 430Q112 418 138 426M84 446Q110 434 150 444" fill="none" stroke="${NHD}" stroke-width="3" stroke-linecap="round"/><path d="M190 470Q240 450 300 470M230 520Q300 500 380 540M60 560Q160 530 260 560" fill="none" stroke="#0c0e22" stroke-width="3" opacity=".5" stroke-linecap="round"/>` +
  `<path d="M-10 640H440V800H-10Z" fill="#0e0c1c"/><path d="M-10 640Q200 620 440 644" fill="none" stroke="#2a2a52" stroke-width="5"/>` +
  // nightstand, rice bag, phone
  `<rect x="380" y="556" width="240" height="260" fill="#2a1c22"/><rect x="368" y="540" width="250" height="22" rx="3" fill="#4a3038"/><rect x="400" y="590" width="200" height="74" rx="4" fill="#20141a"/><circle cx="500" cy="627" r="7" fill="#6a4a50"/>` +
  orb(492, 440, 230, `${k}g`, 0.5) +
  `<g transform="rotate(-6 492 440)"><rect x="462" y="356" width="60" height="118" rx="9" fill="#10121c"/><rect x="467" y="362" width="50" height="106" rx="5" fill="#d9f4ff"/><rect x="474" y="376" width="36" height="6" rx="3" fill="#7ab8d8"/><rect x="474" y="390" width="36" height="20" rx="5" fill="#9fd0e8"/><rect x="474" y="416" width="36" height="20" rx="5" fill="#9fd0e8"/></g>` +
  `<path d="M408 430L420 540H568L580 430Z" fill="#cfe6f6" opacity=".2" stroke="#dff2ff" stroke-width="2" stroke-opacity=".6"/><path d="M414 462Q450 448 492 458Q540 448 574 462L568 540H420Z" fill="#f4eede"/><path d="M414 462Q450 448 492 458Q540 448 574 462L568 540H420Z" fill="url(#${k}r)" opacity=".8"/>` +
  `<path d="M404 426Q440 410 470 428M520 428Q556 410 584 426" fill="none" stroke="#3a8ad8" stroke-width="6" stroke-linecap="round"/><path d="M430 440L436 530" stroke="#fff" stroke-width="4" opacity=".35" stroke-linecap="round"/>` +
  `<g fill="#f4eede"><ellipse cx="392" cy="538" rx="4" ry="2"/><ellipse cx="402" cy="533" rx="4" ry="2" transform="rotate(40 402 533)"/><ellipse cx="590" cy="537" rx="4" ry="2" transform="rotate(-30 590 537)"/><ellipse cx="384" cy="546" rx="4" ry="2"/></g>` +
  orb(492, 420, 120, `${k}g`, 0.55), 0.7);

// Morse bracelet, left to right: 0 = -----, 6 = -...., 1 = .----, 1 = .----  ("L" long black tube = dash, "s" short silver = dot, "G" gold spacer)
const BEADS = 'LLLLLGLssssGsLLLLGsLLLL';
function bracelet(k: string): string {
  const w: Record<string, number> = { L: 17, s: 9, G: 6 };
  const gap = 2.4, total = [...BEADS].reduce((a, c) => a + w[c] + gap, -gap);
  let x = -total / 2, out = '<path d="M-190 0Q0 36 190 0" fill="none" stroke="#0c0c10" stroke-width="3"/>';
  for (const c of BEADS) {
    const cx = x + w[c] / 2;
    out += `<use href="#${k}${c}" transform="translate(${R(cx)} ${R(18 * (1 - (cx / 190) ** 2))}) rotate(${R((Math.atan(-36 * cx / 36100) * 180) / Math.PI)})"/>`;
    x += w[c] + gap;
  }
  return out;
}
const BEAD_DEFS = (k: string): string =>
  `<g id="${k}L"><rect x="-8.500" y="-5.500" width="17" height="11" rx="3.500" fill="#131318" stroke="#000" stroke-width=".8"/><path d="M-5.500-2.700h11" stroke="#8a8ea0" stroke-width="1.500" stroke-linecap="round"/></g>` +
  `<g id="${k}s"><circle r="4.500" fill="#e4eaf2" stroke="#4a505e" stroke-width="1.100"/><circle cx="-1.300" cy="-1.500" r="1.400" fill="#fff"/></g>` +
  `<g id="${k}G"><rect x="-3" y="-8.500" width="6" height="17" rx="2.500" fill="#f2b632" stroke="#8a5a0a" stroke-width="1"/><path d="M-1-6v12" stroke="#fff3b0" stroke-width="1.200"/></g>`;
const wallLock = (k: string): string => { const S = '#f3cbab', D = '#c98d70'; return frame(k, 600, 1300, '#ffd9a0',
  lg(`${k}d`, '#7a4a2c', '#3a2014') + lg(`${k}l`, '#2c303c', '#181a22') + glow(`${k}g`, '#ffc878', 0.6) + glow(`${k}c`, '#9fd8ff', 0.5) + lg(`${k}t`, '#d98a2a', '#8a4a10') +
  `<pattern id="${k}k" width="62" height="62" patternUnits="userSpaceOnUse"><rect x="4" y="4" width="54" height="54" rx="8" fill="#0e1016"/><rect x="6" y="5" width="50" height="48" rx="7" fill="#2a2e3a"/><rect x="10" y="8" width="42" height="3" rx="1.500" fill="#fff" opacity=".12"/></pattern><filter id="${k}b"><feGaussianBlur stdDeviation="14"/></filter>` + BEAD_DEFS(k),
  `<rect width="600" height="1300" fill="url(#${k}d)"/><g stroke="#2a160c" stroke-width="3" opacity=".35"><path d="M0 760Q300 740 600 770M0 980Q300 1000 600 970M0 1180Q300 1160 600 1190M0 300Q80 290 170 300"/></g>${orb(60, 760, 420, `${k}g`, 0.6)}` +
  // laptop
  `<g transform="rotate(3 300 300)"><rect x="176" y="-60" width="520" height="730" rx="26" fill="url(#${k}l)"/><rect x="176" y="-60" width="520" height="730" rx="26" fill="none" stroke="#4a5060" stroke-width="3"/><rect x="204" y="-60" width="496" height="434" fill="url(#${k}k)"/><rect x="330" y="440" width="270" height="200" rx="12" fill="#22252e" stroke="#3a3f4c" stroke-width="2"/></g>${orb(420, -40, 380, `${k}c`, 0.7)}` +
  // tea
  `<g transform="translate(70 150) scale(.82)"><ellipse cx="8" cy="14" rx="78" ry="74" fill="#000" opacity=".35" filter="url(#${k}b)"/><circle r="74" fill="#e9e2d2"/><circle r="74" fill="none" stroke="#b8ae98" stroke-width="3"/><path d="M40-40Q84-70 92-24Q94 6 52 20" fill="none" stroke="#f4eee0" stroke-width="15" stroke-linecap="round"/><circle r="54" fill="#f8f3e6"/><circle r="45" fill="url(#${k}t)"/><path d="M-30-14Q-14-36 14-34" fill="none" stroke="#fff" stroke-width="5" opacity=".4" stroke-linecap="round"/><path d="M20-30Q60 20 30 96" fill="none" stroke="#f4f0e4" stroke-width="2"/><rect x="14" y="92" width="30" height="36" rx="3" fill="#c9737f" transform="rotate(-14 29 110)"/></g>` +
  // arm
  `<g transform="translate(300 650) rotate(18) scale(1.3)"><g opacity=".5" filter="url(#${k}b)" transform="translate(22 18)"><path d="M-195 30C-205-80-235-200-218-300Q-200-362 0-366Q195-356 208-290C218-180 198-80 192 30L240 900H-240Z"/></g>` +
  `<g filter="url(#${k}f)" fill="${S}">${limb([170, -130, 60], [282, -236, 47], [326, -350, 38])}${limb([-165, -300, 45], [-186, -432, 40], [-196, -548, 34])}${limb([-62, -330, 49], [-70, -500, 44], [-74, -645, 38])}${limb([48, -335, 51], [52, -520, 45], [54, -675, 39])}${limb([155, -315, 49], [168, -480, 43], [176, -615, 37])}` +
  `<path d="M-192 420C-190 260-198 120-190 20C-200-80-232-200-216-300Q-200-362 0-366Q192-356 206-290C216-180 196-80 190 20C198 120 190 260 192 420Z"/></g>` +
  `<g fill="none" stroke="${D}" stroke-linecap="round" opacity=".7"><path d="M-205-430q20 8 38 0M-112-500q42 12 82 0M8-520q44 12 88 0M126-480q42 10 82 0M236-250q28-4 52-34" stroke-width="4"/><path d="M-120-300Q-110-200-60-120M-10-330Q0-220 10-130M96-320Q90-220 70-130" stroke-width="5" opacity=".45"/><path d="M-150 70Q0 104 150 70" stroke-width="4" opacity=".5"/></g>` +
  `<path d="M-113-412Q-70-398-28-412" fill="none" stroke="#f2b632" stroke-width="13"/><path d="M-110-417Q-70-404-30-417" fill="none" stroke="#fff3b0" stroke-width="2.500"/><path d="M290-352a26 30 0 0 1 60-10q-4-34-34-34q-22 4-26 44Z" fill="#f7b9c0" opacity=".9"/>` +
  `<g transform="translate(0 4)"><g transform="translate(5 7)" opacity=".28">${'<path d="M-190 0Q0 36 190 0" fill="none" stroke="#5a2a14" stroke-width="12" stroke-linecap="round"/>'}</g>${bracelet(k)}</g>` +
  // cardigan sleeve
  `<g filter="url(#${k}f)"><path d="M-236 208Q0 168 236 208L246 900H-246Z" fill="#e2cfae"/></g><path d="M-234 210Q0 170 234 210V282Q0 242-234 282Z" fill="#cdb78e"/><g stroke="#a88c62" stroke-width="3" opacity=".7">${[-200, -160, -120, -80, -40, 0, 40, 80, 120, 160, 200].map((x) => `<path d="M${x} ${R(206 - 36 * (1 - (x / 236) ** 2))}v72"/>`).join('')}</g>` +
  `<g stroke="#b59a72" stroke-width="3" opacity=".45" fill="none"><path d="M-150 290V900M-50 276V900M50 276V900M150 290V900"/></g></g>` +
  // telegraph-key paperweight
  `<g transform="translate(506 1212) rotate(-12) scale(.86)"><rect x="-84" y="-22" width="176" height="74" rx="10" fill="#000" opacity=".4" filter="url(#${k}b)"/><rect x="-90" y="-34" width="180" height="70" rx="10" fill="#3a2014"/><rect x="-90" y="-34" width="180" height="60" rx="10" fill="#5c3420"/><rect x="-84" y="-30" width="168" height="4" rx="2" fill="#fff" opacity=".15"/>` +
  `<g fill="#d8a838"><rect x="-70" y="-16" width="22" height="28" rx="4"/><rect x="26" y="-14" width="14" height="24" rx="4"/><rect x="-62" y="-8" width="128" height="12" rx="5"/><circle cx="-59" cy="-2" r="5" fill="#8a5a0a"/><circle cx="33" cy="-2" r="4" fill="#8a5a0a"/></g><path d="M-58-6H60" stroke="#fff3b0" stroke-width="2" opacity=".7"/><ellipse cx="72" cy="-4" rx="20" ry="18" fill="#101014"/><ellipse cx="67" cy="-10" rx="8" ry="5" fill="#fff" opacity=".3"/><g fill="#d8a838"><circle cx="-76" cy="24" r="4"/><circle cx="78" cy="24" r="4"/></g></g>`, 0.6); };

const wallHome = (k: string): string => {
  const g = greg(laugh('#7a3a30'), 1.6), n = nora(laugh('#7a2436'), false, 2.3,
    '<g fill="#fff"><circle cx="72" cy="58" r="6"/><circle cx="84" cy="48" r="6.500"/><circle cx="100" cy="44" r="7"/><circle cx="116" cy="48" r="6.500"/><circle cx="128" cy="58" r="6"/></g><g fill="#ffc23a"><circle cx="84" cy="48" r="2.200"/><circle cx="100" cy="44" r="2.400"/><circle cx="116" cy="48" r="2.200"/></g>');
  return frame(k, 600, 1300, '#ffe2a0',
    `<linearGradient id="${k}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2823c"/><stop offset=".3" stop-color="#ffb04a"/><stop offset=".52" stop-color="#ffd98a"/><stop offset=".53" stop-color="#f09a4a"/><stop offset="1" stop-color="#8a3a3a"/></linearGradient>` + glow(`${k}g`, '#fff6d0', 1) + lg(`${k}p`, '#b8763a', '#5a3018'),
    `<rect width="600" height="1300" fill="url(#${k}s)"/>${orb(170, 560, 330, `${k}g`, 0.9)}<circle cx="170" cy="560" r="62" fill="#fff8e0"/>` +
    `<path d="M0 668Q90 628 190 660Q300 620 420 654Q520 630 600 660V690H0Z" fill="#8a4a3a" opacity=".8"/><rect y="686" width="600" height="614" fill="url(#${k}s)" opacity=".0"/>` +
    `<g stroke="#fff3c4" stroke-linecap="round" opacity=".7"><path d="M120 720h100M90 760h170M140 800h70M60 850h200M130 910h90" stroke-width="5"/><path d="M400 740h90M430 800h120M380 880h60" stroke-width="3" opacity=".5"/></g>` +
    `<path d="M196 820H404L640 1300H-40Z" fill="url(#${k}p)"/><g stroke="#3a1c0c" stroke-width="3" opacity=".5"><path d="M176 860H424M146 920H454M110 994H490M66 1084H534M10 1196H590"/></g><path d="M196 820L-40 1300M404 820L640 1300" stroke="#ffd98a" stroke-width="4" opacity=".6"/>` +
    `<rect x="168" y="760" width="22" height="90" fill="#4a2814"/><rect x="410" y="760" width="22" height="90" fill="#4a2814"/><rect x="60" y="900" width="34" height="150" fill="#3a1c0c"/><rect x="506" y="900" width="34" height="150" fill="#3a1c0c"/>` +
    `<path d="M356 800Q300 880 330 1060L470 1010Q500 880 470 800Z" fill="#fff" opacity=".35"/>` +
    bust(190, 960, 1.36, -2, g, `<path d="${CL}" fill="#27375a"/><path d="M-20-8L0 110L20-8Q0 14-20-8Z" fill="#fbf6ea"/><path d="M-8 6H8L12 96L0 112L-12 96Z" fill="#b8566a"/><path d="M-22-9L-46 64L-4 128V264M22-9L46 64L4 128" fill="none" stroke="#162038" stroke-width="5" stroke-linejoin="round"/><circle cx="52" cy="70" r="9" fill="#fff"/><circle cx="52" cy="70" r="3.500" fill="#ffc23a"/><path d="M52 79q-4 10-10 14" stroke="#3f7a4a" stroke-width="3" fill="none"/>`, k, 10,
      `<g filter="url(#${k}f)"><g fill="#27375a">${limb([-80, 40, 24], [-120, 130, 20], [-96, 40, 17])}</g></g>${hand(-96, 22, 20, g.sk, g.sh, 1.3)}`) +
    bust(420, 985, 1.3, 2, n, `<path d="${CL}" fill="${n.sk}"/><path d="M-66 76Q-34 50 0 78Q34 50 66 76L78 264H-78Z" fill="#fffaf0"/><path d="M-66 76Q-34 50 0 78Q34 50 66 76" fill="none" stroke="#e6d6c0" stroke-width="3"/><path d="M-48 8Q-28 14-8 6M48 8Q28 14 8 6" fill="none" stroke="${n.sh}" stroke-width="2.500" stroke-linecap="round"/><path d="M-40 120Q0 140 40 120M-50 180Q0 200 50 180" fill="none" stroke="#e6d6c0" stroke-width="2"/>`, k, -9,
      `<g transform="translate(-10 170)"><g fill="#3f7a4a"><path d="M-10 30L0 90L12 30Z"/></g><g fill="#fff"><circle cx="-24" r="20"/><circle cx="22" cy="-4" r="22"/><circle cx="0" cy="-24" r="20"/><circle cx="2" cy="12" r="20"/></g><g fill="#ff9ab0"><circle cx="-24" r="8"/><circle cx="22" cy="-4" r="9"/><circle cx="0" cy="-24" r="8"/><circle cx="2" cy="12" r="8"/></g>${hand(-4, 44, 180, n.sk, n.sh, 1.3)}</g>`), 0.5);
};

const mapIcon = (x: number, y: number, body: string): string => `<g transform="translate(${x} ${y})"><ellipse cy="9" rx="17" ry="5" fill="#000" opacity=".18"/>${body}</g>`;
const HOUSE = (c: string): string => `<path d="M-12 8V-4L0-15L12-4V8Z" fill="#fbf4e4"/><path d="M-15-3L0-17L15-3L12 0L0-11L-12 0Z" fill="${c}"/><rect x="-3" y="-1" width="6" height="9" fill="#7a4a3a"/>`;
const cg2Map = (k: string): string => frame(k, 800, 600, '#fff',
  lg(`${k}w`, '#7ec3d8', '#3f8fb0', 1, 1) + `<pattern id="${k}t" width="26" height="24" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="5.500" fill="#6a9a5a"/><circle cx="19" cy="17" r="6" fill="#5a8a50"/><circle cx="5.500" cy="5.500" r="2" fill="#8ab870"/></pattern>`,
  `<rect width="800" height="600" fill="#ece5d3"/>` +
  `<path d="M560-10C600 40 590 110 640 150C700 180 760 150 810 190V-10Z" fill="#c8d8a8"/><path d="M560-10C600 40 590 110 640 150C700 180 760 150 810 190V-10Z" fill="url(#${k}t)" opacity=".8"/>` +
  `<path d="M-10 420C60 400 120 440 150 500C170 560 120 600 100 610H-10Z" fill="#cfdcae"/><path d="M430 250C480 240 540 270 560 320C540 360 470 360 440 320Z" fill="#cfdcae"/>` +
  // river + Lake Wyeth
  `<path d="M-10 286C90 310 190 410 330 400C400 380 440 400 470 430C520 480 600 500 660 500C720 470 760 430 810 420V610H590C600 560 560 520 500 500C440 470 400 440 330 436C190 446 80 350-10 326Z" fill="url(#${k}w)"/>` +
  `<path d="M-10 286C90 310 190 410 330 400C400 380 440 400 470 430C520 480 600 500 660 500C720 470 760 430 810 420" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/><g fill="none" stroke="#fff" stroke-width="1.800" opacity=".5" stroke-linecap="round"><path d="M640 540q8-5 16 0t16 0M710 500q8-5 16 0t16 0M700 570q8-5 16 0t16 0M370 420q7-4 14 0t14 0"/></g>` +
  // minor roads
  `<g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="7"><path d="M330 70H570M330 115H570M330 160H570M330 205H570M330 250H520M340 60V260M395 60V260M450 60V260M505 60V260M560 60V215"/></g>` +
  `<g stroke-width="8"><path d="M176 222C240 250 290 190 340 160M176 222C170 270 130 300 96 386M96 386C140 430 190 470 240 500M320 250V470M560 115C620 120 650 100 704 90M560 205C640 250 670 380 690 446M96 386C60 400 30 440 -10 450"/>` +
  `<path d="M176 222V196M150 176A26 26 0 1 1 202 176A26 26 0 1 1 150 176"/><path d="M110 250L176 222M176 222L250 300M60 180Q110 200 150 176"/></g></g>` +
  // bridges
  `<g stroke="#b8a888" stroke-width="3"><path d="M312 396V444M328 396V444M106 330L84 350M118 342L96 362"/></g>` +
  // highway
  `<path d="M-10 546C150 520 260 512 400 524C500 534 560 560 600 610" fill="none" stroke="#c98a1a" stroke-width="11"/><path d="M-10 546C150 520 260 512 400 524C500 534 560 560 600 610" fill="none" stroke="#f6cf52" stroke-width="7"/>` +
  `<path d="M400 524C520 520 620 490 690 456C740 420 770 330 810 300" fill="none" stroke="#c98a1a" stroke-width="9"/><path d="M400 524C520 520 620 490 690 456C740 420 770 330 810 300" fill="none" stroke="#f6cf52" stroke-width="5"/>` +
  // blocks
  `<g fill="#d9cfb8"><rect x="348" y="78" width="40" height="30"/><rect x="403" y="123" width="40" height="30"/><rect x="458" y="78" width="40" height="30"/><rect x="348" y="168" width="40" height="30"/><rect x="403" y="213" width="40" height="30"/><rect x="513" y="123" width="40" height="30"/><rect x="458" y="213" width="40" height="30"/><rect x="348" y="213" width="40" height="30"/><rect x="403" y="78" width="40" height="30" fill="#cfdcae"/></g>` +
  `<g fill="#fbf4e4" stroke="#b8a888" stroke-width="1">${[[140, 150], [176, 138], [212, 152], [224, 186], [128, 190], [120, 262], [230, 268], [64, 200], [60, 400], [130, 404], [70, 356], [200, 470], [280, 470], [262, 520]].map(([x, y]) => `<rect x="${x - 6}" y="${y - 5}" width="12" height="10"/>`).join('')}</g>` +
  // landmarks (no labels)
  mapIcon(176, 204, HOUSE('#c0503a')) + mapIcon(96, 372, HOUSE('#5a7ab8')) +
  mapIcon(496, 180, '<rect x="-11" y="-30" width="22" height="38" fill="#e9d8b0"/><g fill="#6a8ab8"><rect x="-8" y="-26" width="5" height="5"/><rect x="3" y="-26" width="5" height="5"/><rect x="-8" y="-17" width="5" height="5"/><rect x="3" y="-17" width="5" height="5"/><rect x="-8" y="-8" width="5" height="5"/><rect x="3" y="-8" width="5" height="5"/></g><path d="M-14 0H14V4H-14Z" fill="#9a2c3a"/><rect x="-11" y="-34" width="22" height="5" fill="#9a2c3a"/>') +
  mapIcon(384, 108, '<circle r="12" fill="#fff" stroke="#b8566a" stroke-width="2.500"/><path d="M-4-7V7M-6.500-7v4q0 3 2.500 3t2.500-3v-4M4 7V-7q4 2 4 7h-4" fill="none" stroke="#7a2436" stroke-width="1.700" stroke-linecap="round"/>') +
  mapIcon(320, 348, '<rect x="-15" y="-14" width="30" height="22" fill="#f4f6f8" stroke="#9aa3ad"/><rect x="-15" y="-18" width="30" height="5" fill="#3a8a9a"/><path d="M-3-9H3V-5H7V1H3V5H-3V1H-7V-5H-3Z" fill="#e23d5a"/>') +
  mapIcon(240, 480, '<rect x="-17" y="-8" width="34" height="16" fill="#3a3a6a"/><path d="M-17-8L0-18L17-8Z" fill="#e2572a"/><path d="M-6 6Q-9-2-6-6Q-7-12-4-12Q-1-12-2-6Q1-2-2 6Z" fill="#fff" stroke="#e23d5a" stroke-width=".8"/><circle cx="8" cy="2" r="5" fill="#1c1c2c"/><circle cx="7" cy="0" r="1" fill="#fff"/>') +
  mapIcon(688, 456, '<path d="M-20 8V-4H20V8Z" fill="#e6d2b0"/><path d="M-22-4H22L18-10H-18Z" fill="#8a3a4a"/><g fill="#5a3a2a"><rect x="-16" y="0" width="5" height="8"/><rect x="-6" y="0" width="5" height="8"/><rect x="4" y="0" width="5" height="8"/><rect x="13" y="0" width="5" height="8"/></g><path d="M24 8V-22" stroke="#4a4a5a" stroke-width="2"/><rect x="17" y="-30" width="14" height="10" rx="2" fill="#ff4a8a"/>') +
  mapIcon(704, 72, '<path d="M-22 8L-14-18L-6 8ZM10 8L19-22L28 8Z" fill="#3f6a3a"/><path d="M-11 8V-3H11V8Z" fill="#8a5a30"/><path d="M-14-2L0-14L14-2Z" fill="#5a3418"/><path d="M-11 0H11M-11 4H11" stroke="#5a3418" stroke-width="1"/><rect x="-2" y="1" width="5" height="7" fill="#ffd36a"/>') +
  `<g transform="translate(52 60)"><circle r="20" fill="#fbf4e4" stroke="#8a7a5a" stroke-width="1.500"/><path d="M0-16L5 0H-5Z" fill="#c0503a"/><path d="M0 16L5 0H-5Z" fill="#5a5a5a"/></g>`, 0.25);

// ---------- photos ----------
const flute = (x: number, y: number, rot: number): string => at(x, y, 1, rot,
  '<path d="M0 6V46M-12 48H12" stroke="#f4ead0" stroke-width="3" stroke-linecap="round" opacity=".8"/><path d="M-10-46Q-13 0 0 8Q13 0 10-46Z" fill="#ffe9a8" opacity=".55" stroke="#fff6d8" stroke-width="1.500"/><path d="M-9-24Q-10 0 0 6Q10 0 9-24Z" fill="#ffcf5a" opacity=".85"/><path d="M-5-40V-8" stroke="#fff" stroke-width="2" opacity=".7"/><g fill="#fff"><circle cx="2" cy="-14" r="1.200"/><circle cx="-3" cy="-6" r="1"/><circle cx="4" cy="-20" r="1"/></g>');
const dockMini = (k: string, w: number, h: number): string => {
  const g = greg(laugh('#7a3a30'), 1.6), n = nora(laugh('#7a2436'), false, 2.3);
  return `<rect width="${w}" height="${h}" fill="url(#${k}s)"/><circle cx="${w * 0.3}" cy="${h * 0.4}" r="26" fill="#fff8e0"/>${orb(w * 0.3, h * 0.4, 120, `${k}g`, 0.8)}<path d="M0 ${h * 0.5}Q${w / 2} ${h * 0.44} ${w} ${h * 0.5}V${h * 0.53}H0Z" fill="#8a4a3a" opacity=".8"/>` +
    `<path d="M${w * 0.34} ${h * 0.62}H${w * 0.66}L${w * 1.1} ${h}H${-w * 0.1}Z" fill="#8a5428"/>` +
    bust(w * 0.32, h * 0.8, 0.5, -2, g, `<path d="${CL}" fill="#27375a"/><path d="M-20-8L0 110L20-8Q0 14-20-8Z" fill="#fbf6ea"/><path d="M-8 6H8L12 96L0 112L-12 96Z" fill="#b8566a"/>`, k, 10) +
    bust(w * 0.68, h * 0.82, 0.48, 2, n, `<path d="${CL}" fill="${n.sk}"/><path d="M-66 76Q-34 50 0 78Q34 50 66 76L78 264H-78Z" fill="#fffaf0"/>`, k, -9, '<path d="M-50-150Q0-190 50-150L70 60H-70Z" fill="#fff" opacity=".3"/>');
};
const SUNSET = (k: string): string => `<linearGradient id="${k}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2823c"/><stop offset=".48" stop-color="#ffd98a"/><stop offset=".5" stop-color="#f09a4a"/><stop offset="1" stop-color="#8a3a3a"/></linearGradient>` + glow(`${k}g`, '#fff6d0', 1);
const phWedding = (k: string): string => frame(k, 600, 800, '#ffe2a0',
  SUNSET(k) + lg(`${k}w`, '#b8cfe0', '#e9e2d2') + lg(`${k}m`, '#d9dde2', '#8a9098', 1, 1) + `<clipPath id="${k}c"><rect width="250" height="320"/></clipPath><filter id="${k}b"><feGaussianBlur stdDeviation="9"/></filter>`,
  `<rect width="600" height="800" fill="url(#${k}w)"/><g filter="url(#${k}b)"><circle cx="120" cy="330" r="110" fill="#7a9a6a"/><circle cx="470" cy="280" r="140" fill="#8aa878"/><circle cx="300" cy="420" r="90" fill="#c98a4a"/><rect y="470" width="600" height="160" fill="#9ab08a"/></g>` +
  `<path d="M300 0V640M0 250H600" stroke="#f4f0e6" stroke-width="22"/><path d="M0 0H600V640H0Z" fill="none" stroke="#f4f0e6" stroke-width="44"/><rect y="620" width="600" height="180" fill="#f4f0e6"/><rect y="620" width="600" height="14" fill="#fff"/><rect y="700" width="600" height="100" fill="#d9d2c2"/>` +
  `<g transform="translate(300 400) rotate(-3)"><path d="M-150 250L-190 262H180L150 250Z" fill="#000" opacity=".25"/><rect x="-162" y="-230" width="324" height="476" rx="8" fill="url(#${k}m)"/><rect x="-162" y="-230" width="324" height="476" rx="8" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/><rect x="-130" y="-200" width="260" height="330" fill="#1c1410"/>` +
  `<g transform="translate(-125 -195)" clip-path="url(#${k}c)">${dockMini(k, 250, 320)}<path d="M0 0H110L40 320H0Z" fill="#fff" opacity=".13"/></g>` +
  `<rect x="-136" y="158" width="272" height="58" rx="5" fill="#c8a85a" stroke="#7a5a1a" stroke-width="2"/>${tx(0, 195, 22, 'N &amp; G — 11.28.2016', '#4a3208', 'letter-spacing=".5"', SERIF)}</g>` +
  `<g transform="translate(508 640)"><path d="M-36-50H36L28 0H-28Z" fill="#c0704a"/><rect x="-40" y="-58" width="80" height="12" rx="3" fill="#d98a5a"/><g fill="#5a9a6a"><ellipse cx="-16" cy="-74" rx="10" ry="22" transform="rotate(-24 -16 -74)"/><ellipse cx="16" cy="-74" rx="10" ry="22" transform="rotate(24 16 -74)"/><ellipse cy="-84" rx="10" ry="26"/></g></g>` +
  `<g transform="translate(86 628)" fill="none" stroke="#3a2016" stroke-width="5"><rect x="-40" y="-26" width="34" height="24" rx="9" fill="#fff" fill-opacity=".3"/><rect x="2" y="-26" width="34" height="24" rx="9" fill="#fff" fill-opacity=".3"/><path d="M-6-16h8M-40-18L-56 2M36-18L52 2"/></g>`, 0.4);

const velaBg = (k: string): string =>
  `<rect width="600" height="800" fill="url(#${k}w)"/><path d="M60 420V170Q60 60 170 60Q280 60 280 170V420Z" fill="#141a3a"/><g filter="url(#${k}b)"><circle cx="110" cy="250" r="16" fill="#ffd36a"/><circle cx="210" cy="300" r="20" fill="#ff8a5a"/><circle cx="160" cy="180" r="13" fill="#9fd0ff"/><circle cx="240" cy="210" r="11" fill="#ffd36a"/><circle cx="430" cy="150" r="26" fill="#ffb04a"/><circle cx="540" cy="250" r="20" fill="#ffb04a"/><circle cx="500" cy="80" r="14" fill="#ff8a5a"/><circle cx="350" cy="230" r="12" fill="#ffd98a"/></g>` +
  `<path d="M60 420V170Q60 60 170 60Q280 60 280 170V420M170 60V420" fill="none" stroke="#5a3424" stroke-width="10"/>`;
const velaTable = (k: string, cx: number, extra = ''): string =>
  `<path d="M-10 700Q300 664 610 700V800H-10Z" fill="#f4ead8"/><path d="M-10 700Q300 664 610 700V716Q300 680-10 716Z" fill="#fff" opacity=".7"/>${extra}` +
  `<g transform="translate(${cx} 706)">${orb(0, -40, 150, `${k}g`, 0.75)}<path d="M-20-44H20L16 20H-16Z" fill="#ffd98a" opacity=".35" stroke="#fff3d0" stroke-width="2"/><rect x="-9" y="-26" width="18" height="42" rx="3" fill="#fff6e0"/><path d="M0-30Q-9-44 0-62Q9-44 0-30Z" fill="#ffb02a"/><path d="M0-32Q-4-40 0-50Q4-40 0-32Z" fill="#fff6d0"/></g>` +
  `<g transform="translate(520 716) rotate(4)"><path d="M-30 30L-22-34H22L30 30Z" fill="#fffdf5" stroke="#c8a85a" stroke-width="3"/>${tx(0, 16, 46, '12', '#3a2416', '', SERIF)}</g>`;
const VELA_DEFS = (k: string): string => lg(`${k}w`, '#5a2420', '#1c0c10') + glow(`${k}g`, '#ffc86a', 0.8) + glow(`${k}c`, '#8fd8ff', 0.7) + `<filter id="${k}b"><feGaussianBlur stdDeviation="7"/></filter>`;
const phUsVela = (k: string): string => { const g = greg('<path d="M91 118Q100 120 109 117" stroke="#7a3a30" stroke-width="2.400"/>', 2.5, BROW), n = nora(lips('#c4566a', '#7a2436', true)); return frame(k, 600, 800, '#ffcf8a', VELA_DEFS(k),
  velaBg(k) +
  bust(440, 520, 1.5, 3, g, vest(), k, 12, `${orb(-30, 96, 130, `${k}c`, 0.8)}<g transform="translate(-34 100) rotate(-14)"><rect x="-24" y="-40" width="48" height="84" rx="8" fill="#12141c"/><rect x="-20" y="-35" width="40" height="74" rx="5" fill="#cfeeff"/></g>${hand(-12, 128, 150, g.sk, g.sh, 1.5)}`) +
  bust(196, 590, 1.85, -3, n, cardigan(), k, -5, `<g filter="url(#${k}f)"><g fill="#e2cfae">${limb([-84, 44, 26], [-150, 150, 24], [-200, 260, 22])}</g></g>`) +
  velaTable(k, 350, `<g opacity=".8"><path d="M286 640Q280 690 300 700Q320 690 314 640Z" fill="#7a1428" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><path d="M300 700V740M284 742H316" stroke="#fff" stroke-width="3" opacity=".7"/></g>`), 0.6); };

const phVelaB = (k: string): string => { const b = bernard('<path d="M88 114Q100 124 112 114" stroke="#3a1c14" stroke-width="2.600"/><path d="M90 115Q100 120 110 115" stroke="#fff" stroke-width="2"/>', 1.5), n = nora(grin('#7a2436')); return frame(k, 600, 800, '#ffcf8a', VELA_DEFS(k),
  velaBg(k) +
  bust(436, 540, 1.55, 3, b, tweed(), k, -6, `<g filter="url(#${k}f)"><g fill="#5a4636">${limb([-78, 40, 25], [-110, 120, 22], [-88, 40, 18])}</g></g>${hand(-88, 20, 10, b.sk, b.sh, 1.4)}${flute(-88, -22, 14)}`) +
  bust(180, 590, 1.8, -3, n, cardigan('#3f6a8a'), k, 6, `<g filter="url(#${k}f)"><g fill="#e2cfae">${limb([78, 44, 25], [112, 110, 22], [84, 20, 18])}</g></g>${hand(84, 2, -10, n.sk, n.sh, 1.4)}${flute(84, -40, -14)}<path d="M100-108l8-12M112-98l14-6M92-116l2-14" stroke="#fff6d0" stroke-width="2.500" stroke-linecap="round"/>`) +
  velaTable(k, 60, `<g transform="translate(300 742) rotate(-7)"><rect x="-152" y="-48" width="310" height="104" fill="#000" opacity=".25"/><rect x="-158" y="-54" width="310" height="104" rx="3" fill="#d9b06a"/><path d="M-158-54L-3 4L152-54" fill="none" stroke="#a8803a" stroke-width="3"/><rect x="-148" y="6" width="290" height="34" fill="none" stroke="#a81c2c" stroke-width="3"/>${tx(-3, 29, 15.5, 'HARTWELL &amp; FINCH — CONTRACT', '#a81c2c', 'letter-spacing=".5"')}<rect x="-158" y="50" width="310" height="7" fill="#8a6a2a"/></g>`), 0.6); };

const phCabin = (k: string): string => frame(k, 800, 600, '#ffd98a',
  `<linearGradient id="${k}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2450"/><stop offset=".6" stop-color="#8a4a7a"/><stop offset="1" stop-color="#f09a5a"/></linearGradient>` + glow(`${k}g`, '#ffc86a', 0.9) + glow(`${k}t`, '#7fe0f0', 0.8) + `<clipPath id="${k}c"><rect width="800" height="400"/></clipPath><filter id="${k}b"><feGaussianBlur stdDeviation="8"/></filter>`,
  `<rect width="800" height="600" fill="#fbfaf6"/><g clip-path="url(#${k}c)"><rect width="800" height="400" fill="url(#${k}s)"/><g fill="#fff" opacity=".8"><circle cx="90" cy="50" r="1.500"/><circle cx="230" cy="90" r="1.200"/><circle cx="420" cy="40" r="1.500"/><circle cx="610" cy="70" r="1.200"/><circle cx="720" cy="30" r="1.500"/></g>` +
  `<path d="M0 290L60 180L90 250L150 130L200 250L240 200L290 300L800 300L760 200L720 270L670 140L620 260L590 220L560 300Z" fill="#14202c"/><path d="M0 300H800V400H0Z" fill="#1c2a2c"/><path d="M0 330Q400 300 800 340V400H0Z" fill="#26342e"/>` +
  `<g transform="translate(350 300)">${orb(0, -40, 220, `${k}g`, 0.5)}<path d="M-150 30V-70H150V30Z" fill="#7a4a24"/><g stroke="#4a2a10" stroke-width="3"><path d="M-150-50H150M-150-30H150M-150-10H150M-150 10H150"/></g><path d="M-176-64L0-170L176-64L150-64L0-150L-150-64Z" fill="#3a2010"/><path d="M-150-64L0-150L150-64Z" fill="#5a3418"/><rect x="80" y="-176" width="26" height="60" fill="#4a3a34"/>` +
  `<g fill="#ffd36a"><rect x="-120" y="-46" width="56" height="46"/><rect x="64" y="-46" width="56" height="46"/><path d="M-18-130H18V-96H-18Z"/></g><path d="M-92-46V0M-120-23H-64M92-46V0M64-23H120" stroke="#7a4a24" stroke-width="3"/><rect x="-24" y="-40" width="48" height="70" fill="#3a2010"/><circle cx="14" cy="0" r="3" fill="#ffd36a"/><rect x="-190" y="30" width="380" height="14" fill="#4a2a10"/>` +
  `<path d="M-190-74Q-100-50-10-74Q80-50 190-74" fill="none" stroke="#2a1c10" stroke-width="1.500"/><g fill="#fff3b0">${[-160, -120, -80, -40, 30, 70, 110, 150].map((x) => `<circle cx="${x}" cy="${-62 + Math.abs((x % 90) / 9)}" r="3"/>`).join('')}</g></g>` +
  `<g transform="translate(600 346)">${orb(0, -10, 130, `${k}t`, 0.7)}<path d="M-96-14Q0-40 96-14V36Q0 56-96 36Z" fill="#6a3c1c"/><ellipse cy="-14" rx="96" ry="22" fill="#8a5428"/><ellipse cy="-14" rx="82" ry="16" fill="#5fd0e0"/><ellipse cx="-20" cy="-18" rx="30" ry="5" fill="#fff" opacity=".5"/><g stroke="#3a1c0c" stroke-width="2"><path d="M-60 6V44M-20 10V50M20 10V50M60 6V44"/></g>` +
  `<g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".3" filter="url(#${k}b)"><path d="M-40-30q-20-30 0-60t0-60M10-30q-20-30 0-60t0-70M50-30q-20-30 0-50t0-50"/></g></g></g>` +
  `<rect width="800" height="46" fill="#000" opacity=".25"/><path d="M26 23l10-10M26 23l10 10" stroke="#fff" stroke-width="3.500" stroke-linecap="round"/><path d="M764 16q-10-10-16 0q-2 8 16 20q18-12 16-20q-6-10-16 0Z" fill="none" stroke="#fff" stroke-width="2.500"/>${tx(400, 30, 15, '1 / 14', '#fff')}` +
  txs(30, 452, 34, 'PINE HOLLOW CABINS', '#1c2a2c', 'font-weight="700" letter-spacing="1"') + txs(30, 484, 18, 'Cabin 4 “The Lantern” · private hot tub · sleeps 2', '#5a6a6a') +
  `<rect x="30" y="514" width="250" height="56" rx="10" fill="#fff4d8" stroke="#e0b040" stroke-width="2.500"/>${tx(155, 551, 27, 'Nov 27–29', '#3a2a08')}<rect x="300" y="514" width="200" height="56" rx="10" fill="#1f9a5a"/>${tx(400, 552, 28, '✓ BOOKED', '#fff', 'letter-spacing="1"')}` +
  txs(770, 540, 30, '$612', '#1c2a2c', 'font-weight="700" text-anchor="end"') + txs(770, 564, 14, '2 nights · paid', '#5a6a6a', 'text-anchor="end"'), 0.2);

const phKeycard = (k: string): string => frame(k, 600, 800, '#ffd98a',
  lg(`${k}d`, '#4a2a1c', '#20100c', 1, 1) + glow(`${k}g`, '#ffc878', 0.7) + lg(`${k}c`, '#f6efdc', '#e0d2b0') + `<filter id="${k}b"><feGaussianBlur stdDeviation="10"/></filter>`,
  `<rect width="600" height="800" fill="url(#${k}d)"/>${orb(140, 120, 520, `${k}g`, 0.8)}` +
  `<g transform="rotate(-5 300 420)"><rect x="66" y="96" width="440" height="620" fill="#000" opacity=".4" filter="url(#${k}b)"/><rect x="72" y="80" width="430" height="620" fill="#e6e0d0"/><rect x="62" y="72" width="430" height="620" fill="#f1ece0"/><rect x="52" y="62" width="430" height="620" fill="#fffdf6"/>` +
  tx(267, 118, 19.5, 'TIDEWATER HEAT #10 — AUDIO SCRIPT', '#1c1c24', 'letter-spacing=".4"') + `<path d="M84 132H450" stroke="#1c1c24" stroke-width="2"/>` + txs(84, 160, 13, 'CH. 9 — “THE HAYLOFT” · narrator: D. Rush · pg 201', '#6a6a72') +
  `<g stroke="#b8b4a8" stroke-width="5" stroke-linecap="round">${[190, 214, 238, 262, 310, 334, 358, 600, 624, 648].map((y, i) => `<path d="M84 ${y}H${450 - ((i * 53) % 110)}"/>`).join('')}</g><rect x="80" y="228" width="250" height="20" fill="#ffe94a" opacity=".5"/>` +
  txs(340, 300, 20, '(breathy!)', '#c0283a', 'transform="rotate(-6 340 300)"', HAND) + txs(92, 400, 18, 'slower — let it land', '#c0283a', '', HAND) + `</g>` +
  // key-card sleeve
  `<g transform="translate(318 520) rotate(9)"><rect x="-150" y="-86" width="316" height="200" fill="#000" opacity=".4" filter="url(#${k}b)"/><rect x="-96" y="-128" width="200" height="120" rx="10" fill="#14323a"/><rect x="-96" y="-104" width="200" height="16" fill="#d8b25a"/><rect x="-160" y="-100" width="320" height="200" rx="6" fill="url(#${k}c)"/><path d="M-160-100H160L130-72H-130Z" fill="#d9caa4"/>` +
  `<path d="M0-54l9 14h-18Z" fill="#b08a2a"/><circle cy="-58" r="4" fill="#b08a2a"/>${tx(0, -14, 22, 'HOTEL CORVINA', '#8a6a1a', 'letter-spacing="5"', SERIF)}<path d="M-120 0H120" stroke="#c8b88a" stroke-width="1.500"/>` +
  tx(0, 48, 34, 'MRS. SMITH — 512', '#1c3a8a', 'transform="rotate(-3)"', HAND) + `<path d="M-128 62Q0 74 126 54" fill="none" stroke="#1c3a8a" stroke-width="2.500" stroke-linecap="round"/>${tx(0, 86, 11, 'Thursdays · do not disturb', '#8a7a5a')}</g>` +
  // throat spray
  `<g transform="translate(476 220) rotate(24)"><rect x="-28" y="-40" width="70" height="170" rx="20" fill="#000" opacity=".4" filter="url(#${k}b)"/><rect x="-32" y="-50" width="64" height="160" rx="18" fill="#2f8a8a"/><rect x="-32" y="-10" width="64" height="86" fill="#f4fbf8"/>${tx(0, 22, 13, 'VOCALEZE', '#1c5a5a')}${tx(0, 40, 10.5, 'throat spray', '#1c5a5a')}${tx(0, 60, 9, 'honey · sage', '#b08a2a')}<rect x="-16" y="-82" width="32" height="34" rx="5" fill="#e9eef0"/><path d="M-16-76H-40V-64H-16Z" fill="#e9eef0"/><path d="M-22-36V96" stroke="#fff" stroke-width="5" opacity=".3" stroke-linecap="round"/></g>`, 0.55);

const shoe = (x: number, y: number, s: number, rot: number, flip = 1): string => at(x, y, s, rot,
  `<g transform="scale(${flip} 1)"><path d="M6 0C-2-44 18-66 50-66H72C84-44 112-32 152-28Q172-22 172 0Z" fill="#e23d3a"/><path d="M6 0C-2-44 18-66 46-66L42 0Z" fill="#1f3a6a"/><path d="M112-33Q150-30 170-14L172 0H104Z" fill="#1f3a6a"/><path d="M50-66H72C80-48 96-38 116-33L104-12Q70-22 50-66Z" fill="#f6efdc"/>` +
  `<path d="M60-56L84-52M66-46L92-42M74-37L102-33" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="0" y="-2" width="174" height="14" rx="6" fill="#f6efdc"/><path d="M20-50Q40-60 60-58" fill="none" stroke="#fff" stroke-width="4" opacity=".35" stroke-linecap="round"/></g>`);
const priceTag = (x: number, y: number, rot: number): string => at(x, y, 1, rot,
  `<path d="M0 0Q-20-30-10-60" fill="none" stroke="#f4ead0" stroke-width="2"/><path d="M-96 0H96V58H-96L-110 29Z" fill="#fffbe8" stroke="#b8a878" stroke-width="2"/><circle cx="-96" cy="29" r="4" fill="#3a2a1a"/>${tx(4, 24, 14.5, 'STRIKE FORCE LANES', '#c0281c', 'letter-spacing=".5"')}${tx(4, 48, 20, '— $54.99 —', '#1c1c24')}`);
const phShoes = (k: string): string => frame(k, 800, 600, '#fff',
  lg(`${k}c`, '#5a5c64', '#2a2c34') + glow(`${k}g`, '#fff', 0.55) + `<filter id="${k}b"><feGaussianBlur stdDeviation="10"/></filter>`,
  `<rect width="800" height="600" fill="#0c0c12"/><path d="M40 110H760L800 520H0Z" fill="url(#${k}c)"/>${orb(400, 330, 420, `${k}g`, 1)}<path d="M40 110H760L746 200H54Z" fill="#1c1c24"/>` +
  `<path d="M-10-10H810V90Q400 130-10 90Z" fill="#7a1c24"/><path d="M-10 78Q400 118 810 78V96Q400 136-10 96Z" fill="#14141a"/><path d="M-10 520H810V610H-10Z" fill="#8a2028"/><path d="M-10 520H810V540H-10Z" fill="#14141a"/><rect x="330" y="556" width="140" height="34" rx="4" fill="#f4f0e0"/>${tx(400, 580, 20, 'DRMHVN 1', '#1c2a5a', 'letter-spacing="2"')}` +
  `<g transform="translate(120 240)"><path d="M-80 0Q-80-70 0-70Q80-70 80 0V120H-80Z" fill="#3a4a5a"/><path d="M-40-66Q0-130 40-66" fill="none" stroke="#1c2a3a" stroke-width="10"/><path d="M-80 30H80" stroke="#1c2a3a" stroke-width="5"/></g>` +
  `<g opacity=".4" filter="url(#${k}b)"><ellipse cx="300" cy="452" rx="170" ry="26"/><ellipse cx="520" cy="384" rx="140" ry="22"/><ellipse cx="704" cy="440" rx="60" ry="18"/></g>` +
  shoe(640, 372, 1.45, -6, -1) + shoe(150, 440, 1.7, 3) + priceTag(300, 486, 4) + priceTag(500, 236, -10) +
  `<g transform="translate(704 344) scale(.88)"><rect x="-22" y="-146" width="44" height="40" rx="6" fill="#f4d8a0"/><rect x="-10" y="-166" width="20" height="24" fill="#e9eef0"/><path d="M-48-110Q0-126 48-110L54 96Q0 112-54 96Z" fill="#f9c8d4"/><path d="M-48-110Q0-126 48-110L50-40Q0-26-50-40Z" fill="#fde6c0" opacity=".7"/><rect x="-42" y="-34" width="84" height="92" rx="6" fill="#fffaf0"/>` +
  `${tx(0, 0, 17, 'VANILLA', '#b0507a', 'letter-spacing="1"', SERIF)}${tx(0, 22, 17, 'DREAMS', '#b0507a', 'letter-spacing="1"', SERIF)}${tx(0, 42, 9, 'body mist', '#8a6a5a')}<path d="M-38-100V84" stroke="#fff" stroke-width="6" opacity=".45" stroke-linecap="round"/></g>`, 0.75);

// ---------- bare-shouldered bodies (origin = pit of the neck) ----------
const TF = 'M-15-44V-8Q-34-2-58 6Q-70 10-70 26L-56 60C-62 84-42 118-38 146C-40 176-79 194-81 240V262H81V240C79 194 40 176 38 146C42 118 62 84 56 60L70 26Q70 10 58 6Q34-2 15-8V-44Z';
const TM = 'M-17-44V-10Q-40-4-70 4Q-84 8-84 28L-70 70C-70 110-56 150-54 190V262H54V190C56 150 70 110 70 70L84 28Q84 8 70 4Q40-4 17-10V-44Z';
const marks = (c: string): string =>
  `<g fill="none" stroke="${c}" stroke-width="2.500" stroke-linecap="round" opacity=".8"><path d="M-48 8Q-28 14-8 6M48 8Q28 14 8 6M0 58Q-2 68 0 78"/></g><path d="M-50 60Q-38 50-22 54M14 56Q26 50 40 54" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".28"/>`;
const SLIP = 'M-60 64Q-34 46-2 82Q34 46 60 64C64 90 44 120 40 146C42 176 80 194 84 240L92 336H-92L-84 240C-80 194-42 176-40 146C-44 120-64 90-60 64Z';
const lace = (d: string, c: string, w = 5): string => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-dasharray="1 6.500" stroke-linecap="round"/>`;
const sheen = (d: string, w = 6, o = 0.3): string => `<path d="${d}" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`;
const flash = (x: number, y: number, id: string): string => `${orb(x, y, 64, id, 1)}<path d="M${x} ${y - 60}L${x + 6} ${y - 6}L${x + 60} ${y}L${x + 6} ${y + 6}L${x} ${y + 60}L${x - 6} ${y + 6}L${x - 60} ${y}L${x - 6} ${y - 6}Z" fill="#fff"/>`;

const bike = (x: number, y: number, s: number): string => at(x, y, s, 0,
  '<g fill="none" stroke="#1a0c2c" stroke-width="12" stroke-linecap="round"><path d="M-50 0L-10-90L40-20M-10-90L-22-130M-44-130H0M40-20L60-120M40-124H84M-80 30H90"/></g><circle cx="46" cy="-6" r="42" fill="#1a0c2c"/><circle cx="46" cy="-6" r="42" fill="none" stroke="#c060ff" stroke-width="3" opacity=".7"/><circle cx="46" cy="-6" r="10" fill="#c060ff" opacity=".5"/>');
const phBeaSpin = (k: string): string => { const f = bea(lips('#e0507a', '#8a2040', true)); return frame(k, 600, 800, '#ff7ae0',
  lg(`${k}w`, '#3a1466', '#12062a') + glow(`${k}g`, '#ff4fd0', 0.7) + glow(`${k}c`, '#5fe0ff', 0.6) + `<filter id="${k}b"><feGaussianBlur stdDeviation="5"/></filter>`,
  `<rect width="600" height="800" fill="url(#${k}w)"/><path d="M0 560H600V800H0Z" fill="#0c0420"/>${orb(480, 120, 360, `${k}g`, 0.7)}${orb(60, 600, 300, `${k}c`, 0.5)}` +
  `<g filter="url(#${k}b)"><path d="M0 86H600" stroke="#ff4fd0" stroke-width="7"/><path d="M0 560H600" stroke="#5fe0ff" stroke-width="5"/></g><path d="M0 86H600" stroke="#ffd0f4" stroke-width="2"/><path d="M0 560H600" stroke="#dff8ff" stroke-width="1.500"/>` +
  `<rect x="34" y="124" width="318" height="132" rx="10" fill="#0c0420" stroke="#5a2a9a" stroke-width="3"/><g filter="url(#${k}b)" opacity=".9">${tx(193, 190, 46, 'PEDALHAUS', '#ff4fd0', 'letter-spacing="2"')}${tx(193, 232, 23, 'THURSDAY 7PM', '#5fe0ff', 'letter-spacing="3"')}</g>${tx(193, 190, 46, 'PEDALHAUS', '#ffe0f8', 'letter-spacing="2"')}${tx(193, 232, 23, 'THURSDAY 7PM', '#e6fbff', 'letter-spacing="3"')}` +
  bike(470, 520, 1) + bike(90, 540, 0.9) + bike(560, 600, 1.3) +
  `<g transform="translate(290 520) scale(1.7)"><g filter="url(#${k}f)">${at(0, HY, HS, -5, `<g transform="translate(-100 -85)">${f.back ?? ''}</g>`)}<g fill="${f.sk}"><path d="${TF}"/>${limb([62, 26, 19], [124, 96, 16], [118, 6, 14])}${limb([-62, 26, 19], [-92, 110, 16], [-84, 200, 13])}</g><path d="M-42 4Q-36 44-56 62C-62 84-42 118-38 146C-40 176-79 194-81 240V264H81V240C79 194 40 176 38 146C42 118 62 84 56 62Q36 44 42 4L28-2Q0 46-28-2Z" fill="#1fb5a8"/>${neck(f.sk, f.sh)}` +
  `<g fill="${f.sk}">${limb([112, -4, 7.500], [102, -44, 6.500])}${limb([122, -4, 7.500], [134, -42, 6.500])}<circle cx="118" cy="0" r="15"/></g></g>${sheen('M-76 44Q-92 80-96 110', 5, 0.35)}<path d="M-29 0Q0 44 29 0" fill="none" stroke="#0e7d74" stroke-width="4"/><path d="M-48 10Q-28 16-8 8" fill="none" stroke="${f.sh}" stroke-width="2.500" stroke-linecap="round" opacity=".7"/>` +
  `${at(0, HY, HS, -5, `<g transform="translate(-100 -85)">${face(f, false)}</g>`)}</g>` +
  `<path d="M40 800Q60 700 180 716L420 716Q540 700 560 800" fill="none" stroke="#0a0414" stroke-width="30" stroke-linecap="round"/><path d="M60 770Q80 706 180 712" fill="none" stroke="#c060ff" stroke-width="3" opacity=".7"/><rect x="236" y="664" width="128" height="76" rx="10" fill="#0a0414" stroke="#5a2a9a" stroke-width="3"/><rect x="246" y="674" width="108" height="56" rx="5" fill="#12305a"/>${tx(300, 700, 22, '92 RPM', '#7ff0ff')}${tx(300, 722, 13, '31:07 · 412 cal', '#b8e8ff')}` +
  `${hand(148, 716, 190, f.sk, f.sh, 2.2)}<rect width="600" height="800" fill="#b040ff" opacity=".12"/>`, 0.6); };

const phTiffani = (k: string): string => { const f = tiffani(lips('#e23d5a', '#8a1c34'), 1.5), R1 = '#e8486a', R2 = '#b02a4a'; return frame(k, 600, 800, '#fff6e0',
  lg(`${k}w`, '#7a5234', '#4a2e1c') + glow(`${k}g`, '#fff', 0.9) + glow(`${k}l`, '#ffc86a', 0.8) + lg(`${k}m`, '#c8a050', '#7a5a20', 1, 1) + `<clipPath id="${k}c"><rect x="26" y="26" width="548" height="652"/></clipPath><filter id="${k}b"><feGaussianBlur stdDeviation="8"/></filter>`,
  `<rect width="600" height="800" fill="url(#${k}m)"/><g clip-path="url(#${k}c)"><rect width="600" height="700" fill="url(#${k}w)"/><g stroke="#3a2214" stroke-width="3" opacity=".6">${[80, 140, 200, 260, 320, 380, 440, 500, 560].map((x) => `<path d="M${x} 0V520"/>`).join('')}</g><rect y="520" width="600" height="180" fill="#5a3a4a"/>` +
  `${orb(80, 330, 190, `${k}l`, 0.8)}<path d="M50 300L66 240H112L128 300Z" fill="#ffe6a8"/><rect x="84" y="300" width="10" height="70" fill="#3a2a1a"/><rect x="26" y="370" width="130" height="150" fill="#3a2418"/>` +
  `<rect x="150" y="96" width="150" height="110" fill="#d9c8a0" stroke="#3a2214" stroke-width="8"/><path d="M158 180Q200 130 240 170Q270 150 292 176V198H158Z" fill="#5a8a8a"/><circle cx="270" cy="130" r="12" fill="#ffb04a"/>` +
  `<path d="M26 470Q140 440 250 480V700H26Z" fill="#2f7a7a"/><g fill="#ff9a4a" opacity=".85"><circle cx="70" cy="520" r="14"/><circle cx="150" cy="560" r="16"/><circle cx="60" cy="620" r="15"/><circle cx="200" cy="640" r="13"/></g><g fill="#ffd36a"><circle cx="70" cy="520" r="5"/><circle cx="150" cy="560" r="6"/><circle cx="60" cy="620" r="5"/><circle cx="200" cy="640" r="5"/></g>` +
  // chair + Greg's vest
  `<g transform="translate(484 330)"><path d="M-74-110V370M74-110V370" stroke="#2a1a10" stroke-width="12"/><path d="M-80 190H80V214H-80Z" fill="#3a2418"/><g filter="url(#${k}f)"><path d="M-84-104Q-40-128 0-104Q40-128 84-104L92 150H-92Z" fill="#8b9199"/></g><path d="M-22-112L0-74L22-112Q40-122 54-114L30-50H-30L-54-114Q-40-122-22-112Z" fill="#a4aab2"/><path d="M0-74V150" stroke="#5c626a" stroke-width="4" stroke-dasharray="3 3"/>` +
  `<path d="M-84-104Q-96-20-70 40M84-104Q96-20 70 40" fill="none" stroke="#6c727a" stroke-width="4"/><path d="M-92 150H92" stroke="#6c727a" stroke-width="6"/>${GREGTAG(30, 0, 2)}${sheen('M-60-90Q-70-20-66 60', 6, 0.25)}</g>` +
  // Tiffani
  `<g transform="translate(262 292) scale(1.3)"><g filter="url(#${k}f)">${at(0, HY, HS, -6, `<g transform="translate(-100 -85)">${f.back ?? ''}</g>`)}<path d="M-60 8Q-90 14-96 44L-128 340H-70L-52 150ZM60 8Q90 14 96 44L124 340H70L52 150Z" fill="${R2}"/>` +
  `<g fill="${f.sk}">${limb([-44, 250, 42], [-46, 400, 36])}${limb([44, 250, 42], [50, 400, 36])}<path d="${TF}"/></g><path d="${SLIP}" fill="#17121a"/><g fill="${R1}">${limb([-70, 28, 22], [-122, 120, 19], [-86, 186, 15])}${limb([70, 28, 22], [124, 96, 19], [100, 14, 15])}<path d="M-34-6Q-60 0-78 12L-64 70Q-46 30-30 6ZM34-6Q60 0 78 12L64 70Q46 30 30 6Z"/></g></g>` +
  `${marks(f.sh)}<path d="M-40 4L-34 58M40 4L34 58" stroke="#17121a" stroke-width="3.500"/>${lace('M-58 66Q-34 50-2 84Q34 50 58 66', '#f0c8d0')}${lace('M-90 330H90', '#f0c8d0', 7)}${sheen('M-20 120Q-30 180-56 230', 7, 0.16)}${sheen('M-108 60Q-120 120-100 170', 6, 0.35)}${sheen('M100 50Q118 80 112 110', 6, 0.35)}` +
  `<path d="M-64 70Q-80 200-70 340M64 70Q80 200 70 340" fill="none" stroke="#ff9ab0" stroke-width="3" opacity=".7"/>${hand(-80, 196, 60, f.sk, f.sh, 1.2)}${at(0, HY, HS, -6, `<g transform="translate(-100 -85)">${face(f, false)}</g>`)}${phone(98, -30, 8, '#f4d0d8', f.sk)}</g>` +
  flash(382, 240, `${k}g`) + `<path d="M26 26H240L120 678H26Z" fill="#fff" opacity=".06"/></g><rect x="26" y="26" width="548" height="652" fill="none" stroke="#5a3e10" stroke-width="4"/>` +
  // dresser top + key fob
  `<rect y="690" width="600" height="110" fill="#5a3420"/><rect y="690" width="600" height="10" fill="#8a5a38"/><g transform="translate(400 746) rotate(-8)"><ellipse cx="6" cy="10" rx="120" ry="22" fill="#000" opacity=".35" filter="url(#${k}b)"/><circle cx="-112" cy="0" r="13" fill="none" stroke="#c9ccd1" stroke-width="4"/><path d="M-170-6H-124V6H-140V14H-150V6H-170Z" fill="#c9ccd1"/>` +
  `<path d="M-100 0L-70-34H96Q110-34 110-20V20Q110 34 96 34H-70Z" fill="#1f8a8a" stroke="#0e5a5a" stroke-width="3"/>${tx(-6, -6, 13.5, 'WYETH MOTOR LODGE', '#fff', 'letter-spacing=".5"')}${tx(-6, 24, 26, '· 6 ·', '#ffe08a')}</g>` +
  `<g transform="translate(110 742) rotate(70)"><rect x="-9" y="-30" width="18" height="44" rx="3" fill="#1c1c24"/><rect x="-7" y="-46" width="14" height="18" rx="5" fill="#e23d5a"/></g>` +
  `<circle cx="540" cy="64" r="26" fill="#0c0c12" opacity=".5"/><circle cx="540" cy="64" r="26" fill="none" stroke="#2fd15a" stroke-width="6"/><path d="M540 48l4.700 10.500l11.300 1.200l-8.500 7.600l2.500 11.200l-10-5.800l-10 5.800l2.500-11.200l-8.500-7.600l11.300-1.200Z" fill="#2fd15a"/>`, 0.5); };

const QUILT = (k: string): string => `<pattern id="${k}q" width="44" height="44" patternUnits="userSpaceOnUse"><rect width="44" height="44" fill="#f1ece0"/><path d="M0 0L44 44M44 0L0 44" stroke="#cfc6b2" stroke-width="2"/><circle cx="22" cy="22" r="2.500" fill="#b8ae98"/></pattern>`;
const mattress = (k: string, x: number, y: number, w: number, h: number, rot: number): string =>
  `<g transform="rotate(${rot} ${x + w / 2} ${y + h})"><rect x="${x + 10}" y="${y + 8}" width="${w}" height="${h}" rx="16" fill="#000" opacity=".25"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="url(#${k}q)" stroke="#5a7aa8" stroke-width="5"/><rect x="${x + w - 26}" y="${y}" width="26" height="${h}" rx="12" fill="#000" opacity=".12"/></g>`;
const micStand = (x: number, y: number, s: number): string => at(x, y, s, 0,
  '<path d="M0 0V250M-60 280L0 240L60 280M0 240V284" fill="none" stroke="#16181e" stroke-width="7" stroke-linecap="round"/><rect x="-17" y="-64" width="34" height="76" rx="15" fill="#aab2bc"/><rect x="-17" y="-64" width="34" height="42" rx="15" fill="#3a4048"/><path d="M-11-56V-28M0-58V-26M11-56V-28" stroke="#8a929c" stroke-width="2"/><path d="M-24-4H24" stroke="#16181e" stroke-width="7"/><path d="M0 30Q60 30 62-20" fill="none" stroke="#16181e" stroke-width="4"/><circle cx="62" cy="-34" r="46" fill="#0c0c12" opacity=".5"/><circle cx="62" cy="-34" r="46" fill="none" stroke="#16181e" stroke-width="6"/><path d="M34-62L90-6M24-34H100M62-72V4M34-6L90-62" stroke="#16181e" stroke-width="1.500" opacity=".7"/>');
const phSuite = (k: string): string => { const f = dev(grin('#5a2a1c')); return frame(k, 800, 600, '#ffd98a',
  QUILT(k) + lg(`${k}w`, '#b8a68a', '#8a7a62') + lg(`${k}c`, '#4a5a5e', '#2a3438') + glow(`${k}g`, '#ffd98a', 0.8),
  `<rect width="800" height="420" fill="url(#${k}w)"/><rect y="400" width="800" height="200" fill="url(#${k}c)"/><rect y="0" width="800" height="30" fill="#e9e2d2"/>${orb(120, 120, 300, `${k}g`, 0.8)}` +
  `<path d="M-30 20L70 60V470L-30 560Z" fill="url(#${k}q)" stroke="#5a7aa8" stroke-width="5"/><path d="M830 20L730 60V470L830 560Z" fill="url(#${k}q)" stroke="#5a7aa8" stroke-width="5"/><path d="M830 20L730 60V470L830 560Z" fill="#000" opacity=".25"/>` +
  mattress(k, 84, 60, 200, 350, -3) + mattress(k, 296, 50, 210, 360, 2) + mattress(k, 516, 62, 200, 348, -2) +
  `<path d="M100 20L96 60H130L126 20Z" fill="#ffe6a8"/>` +
  // desk, laptop, pages
  `<rect x="60" y="400" width="250" height="16" fill="#5a3a24"/><path d="M76 416V560M294 416V560" stroke="#3a2416" stroke-width="10"/><g transform="translate(150 400)"><path d="M-60 0L-52-80H60L64 0Z" fill="#20232b"/><path d="M-52-74H56L59-6H-55Z" fill="#0c1c24"/><path d="M-46-40h8l4-18l6 34l6-28l5 20l6-30l6 36l5-22l6 12l6-24l6 30l6-10h8" fill="none" stroke="#3fe08a" stroke-width="2.500"/><rect x="-70" y="-4" width="140" height="8" rx="3" fill="#3a3f4c"/></g>` +
  `<g transform="translate(256 388)"><rect x="-38" y="-18" width="76" height="30" fill="#d9d2c2"/><rect x="-40" y="-26" width="76" height="12" fill="#f1ece0"/><rect x="-36" y="-34" width="76" height="12" fill="#fffdf6" transform="rotate(-4)"/><path d="M-28-28h54M-28-23h40" stroke="#9aa3ad" stroke-width="1.500" transform="rotate(-4)"/></g>` +
  micStand(430, 280, 1) + `<ellipse cx="430" cy="566" rx="80" ry="10" fill="#000" opacity=".3"/>` +
  `<g transform="translate(540 300)"><path d="M0 60V260M-40 270L0 250L40 270" stroke="#16181e" stroke-width="6" fill="none"/><rect x="-44" y="-10" width="88" height="76" fill="#16181e"/><rect x="-38" y="-18" width="76" height="72" fill="#fffdf6"/><path d="M-28-4h56M-28 8h56M-28 20h40M-28 32h52" stroke="#9aa3ad" stroke-width="2.500"/></g>` +
  bust(650, 440, 1.5, 0, f, hoodie('#2c3440', '#1c222c'), k, 4, `<g filter="url(#${k}f)"><g fill="#2c3440">${limb([-78, 40, 24], [-112, 110, 20], [-100, 50, 17])}</g></g>${thumb(-100, 30, 1.25, f.sk, f.sh)}`), 0.45); };

const HEADSET = '<path d="M59 92C50 8 150 8 141 92" fill="none" stroke="#20232b" stroke-width="7"/><rect x="50" y="78" width="19" height="38" rx="9" fill="#20232b"/><rect x="131" y="78" width="19" height="38" rx="9" fill="#20232b"/><path d="M54 86v22M146 86v22" stroke="#e23d5a" stroke-width="2.500"/>';
const phMic = (k: string): string => { const n = nora(grin('#7a2436'), true, 0.9, HEADSET), bsk = '#7d4b31';
  const b = bernard('<path d="M88 115Q94 121 100 117Q106 121 112 114" stroke="#3a1c14" stroke-width="2.600"/>', 2.3, `<path d="M100 80L130 74L138 104L112 110Z" fill="#fff"/><path d="M112 90L130 84M114 98L134 94" stroke="#c9d3da" stroke-width="1.500"/><path d="M110 104Q124 98 136 104L134 124Q120 130 110 120Z" fill="${bsk}"/><path d="M118 106v16M126 105v17" stroke="#4c2a1b" stroke-width="1.500" opacity=".7"/>`);
  return frame(k, 600, 800, '#ffd98a', QUILT(k) + glow(`${k}g`, '#ffd98a', 0.7),
  `<rect width="600" height="800" fill="url(#${k}q)"/><rect width="600" height="800" fill="#5a3a24" opacity=".4"/><path d="M296 0V800" stroke="#5a7aa8" stroke-width="8"/><path d="M270 0H322V800H270Z" fill="#000" opacity=".2"/>${orb(520, 80, 380, `${k}g`, 0.9)}` +
  bust(140, 400, 1.3, -3, b, tweed(), k, 8) +
  micStand(470, 470, 1.7) +
  bust(318, 610, 1.85, 2, n, cardigan(), k, -4, `<g filter="url(#${k}f)"><g fill="#e2cfae">${limb([-84, 44, 26], [-130, 130, 23], [-96, 96, 18])}</g></g>`) +
  `<g transform="translate(128 706) rotate(-10)"><rect x="-96" y="-116" width="200" height="250" fill="#000" opacity=".3"/><rect x="-104" y="-124" width="200" height="250" fill="#fffdf6"/>${tx(-4, -92, 13.5, 'TIDEWATER HEAT #10', '#1c1c24')}${tx(-4, -74, 11, 'CH. 31 — THE END', '#6a6a72')}<g stroke="#b8b4a8" stroke-width="5" stroke-linecap="round"><path d="M-84-50H76M-84-30H76M-84-10H50M-84 10H76M-84 30H66"/></g><path d="M-70 60Q-40 44-10 60T50 60" fill="none" stroke="#c0283a" stroke-width="3"/>${txs(-70, 92, 22, 'DONE!!', '#c0283a', '', HAND)}</g>${hand(206, 742, -120, n.sk, n.sh, 2.6)}`, 0.5); };

const monkey = (x: number, y: number, s: number): string => at(x, y, s, 0, '<circle cx="-11" cy="-2" r="5" fill="#8a5a30"/><circle cx="11" cy="-2" r="5" fill="#8a5a30"/><circle r="11" fill="#8a5a30"/><ellipse cy="3" rx="7.500" ry="6.500" fill="#e8c8a0"/><path d="M-3 6Q0 8 3 6" fill="none" stroke="#5a3418" stroke-width="1.200"/><ellipse cx="-4.500" cy="-2" rx="5" ry="4" fill="#c99a6a"/><ellipse cx="4.500" cy="-2" rx="5" ry="4" fill="#c99a6a"/>');
const phVideo = (k: string): string => frame(k, 800, 600, '#ffc878',
  QUILT(k) + glow(`${k}g`, '#ffb85a', 0.85),
  `<rect width="800" height="600" fill="#0e0a14"/><g opacity=".2">${mattress(k, 40, 60, 220, 380, -3)}${mattress(k, 290, 50, 220, 390, 2)}${mattress(k, 540, 64, 220, 376, -2)}</g><rect y="430" width="800" height="170" fill="#0a080e"/>` +
  `${orb(750, 250, 380, `${k}g`, 0.8)}<path d="M714 250L730 190H780L796 250Z" fill="#ffe6b0"/><rect x="750" y="250" width="8" height="190" fill="#1a1016"/>` +
  `<g fill="#07050a">${micStand(430, 256, 1.25)}</g><g filter="url(#${k}f)" fill="#0b0810" transform="translate(600 336) rotate(-7) scale(1.45)"><g transform="translate(0 ${HY}) rotate(-10) scale(${HS}) translate(-100 -85)"><circle cx="107" cy="31" r="16"/><path d="M63 102C54 52 78 35 100 35C122 35 146 52 137 102Z"/><path d="${HEAD}"/><path d="M124 86l10-3" stroke="#0b0810" stroke-width="3"/></g><path d="${CL}"/><path d="M-16-50H16V0H-16Z"/><path d="M-38-52l-14 8l14 6Z"/></g><g filter="url(#${k}f)" fill="#150e1a" transform="translate(600 336) rotate(-7) scale(1.45)">${limb([-70, 50, 24], [-92, 110, 20], [-40, -22, 15])}<ellipse cx="-36" cy="-32" rx="15" ry="19" transform="rotate(-30 -36 -32)"/></g>` +
  `<g stroke="#ffe6b0" stroke-width="4" stroke-linecap="round" opacity=".7"><path d="M656 156l10-18M680 172l20-10M634 150l-2-20"/></g>` +
  `<rect width="800" height="600" fill="#1a1030" opacity=".25"/><rect width="800" height="70" fill="#000" opacity=".5"/>${monkey(206, 37, 1.3)}${txs(28, 46, 28, 'ch 9 take 4', '#fff', 'font-weight="700"')}` +
  `<circle cx="400" cy="300" r="58" fill="#000" opacity=".5"/><circle cx="400" cy="300" r="58" fill="none" stroke="#fff" stroke-width="4"/><path d="M382 268V332L434 300Z" fill="#fff"/>` +
  `<rect x="28" y="560" width="744" height="5" rx="2.500" fill="#fff" opacity=".35"/><circle cx="28" cy="562.500" r="8" fill="#fff"/><rect x="700" y="516" width="72" height="30" rx="6" fill="#000" opacity=".6"/>${tx(736, 538, 18, '1:12', '#fff')}`, 0.75);

// ---------- hidden album ----------
const teaTop = (x: number, y: number, s: number): string => at(x, y, s, 0,
  '<circle r="74" fill="#e9e2d2" stroke="#b8ae98" stroke-width="3"/><path d="M40-40Q84-70 92-24Q94 6 52 20" fill="none" stroke="#f4eee0" stroke-width="15" stroke-linecap="round"/><circle r="54" fill="#f8f3e6"/><circle r="45" fill="#b8681c"/><circle cx="-6" cy="-6" r="34" fill="#d98a2a" opacity=".6"/><path d="M-30-14Q-14-36 14-34" fill="none" stroke="#fff" stroke-width="5" opacity=".4" stroke-linecap="round"/>');
const phProof = (k: string): string => frame(k, 600, 800, '#ffd98a',
  lg(`${k}d`, '#c98a8a', '#7a4a5a', 1, 1) + glow(`${k}g`, '#ffd9a0', 0.7) + `<filter id="${k}b"><feGaussianBlur stdDeviation="10"/></filter>`,
  `<rect width="600" height="800" fill="url(#${k}d)"/><g fill="none" stroke="#5a2a3c" stroke-width="5" opacity=".35" stroke-linecap="round"><path d="M-10 120Q200 80 320 160T610 120M-10 700Q150 640 300 720T610 680M40 300Q20 500 60 640M560 240Q590 420 550 600"/></g>${orb(120, 100, 520, `${k}g`, 0.8)}` +
  `<g transform="translate(404 122)"><ellipse cx="10" cy="14" rx="80" ry="76" opacity=".35" filter="url(#${k}b)"/>${teaTop(0, 0, 0.95)}</g>` +
  `<g transform="translate(286 440) rotate(-5)"><rect x="-196" y="-262" width="412" height="560" opacity=".4" filter="url(#${k}b)"/><rect x="-206" y="-280" width="412" height="560" fill="#fffdf6"/><path d="M-190-264h14M-190-264v14M190-264h-14M190-264v14M-190 264h14M-190 264v-14M190 264h-14M190 264v-14" stroke="#1c1c24" stroke-width="1.500"/>` +
  tx(0, -226, 14.5, 'THE MYSTERY MAN RETURNS — DELPHINE RUSH', '#3a3a44', 'letter-spacing=".8"', SERIF) + `<path d="M-60-208H60" stroke="#3a3a44" stroke-width="1"/>` +
  tx(0, -70, 34, 'For G. —', '#1c1c24', 'font-style="italic"', SERIF) + tx(0, -16, 25, 'Ten years, and every hero', '#1c1c24', 'font-style="italic"', SERIF) + tx(0, 20, 25, 'I write still has your laugh.', '#1c1c24', 'font-style="italic"', SERIF) +
  `<path d="M-14 62h28M0 54l5 8l-5 8l-5-8Z" stroke="#8a8a94" stroke-width="1.500" fill="none"/>${tx(0, 246, 10.5, 'v  ·  PAGE PROOF 2  ·  HARTWELL &amp; FINCH', '#8a8a94', 'letter-spacing="1"')}` +
  `<g fill="none" stroke="#d0203a" stroke-width="3" stroke-linecap="round"><path d="M34 30q14-9 28 0t28 0t28 0t24 0"/><path d="M100-96q-12-16-22-2q-4 12 22 28q26-16 22-28q-10-14-22 2Z"/><path d="M-176 120l12 14l26-34"/></g>${txs(-132, 136, 24, 'don’t touch. perfect.', '#d0203a', 'transform="rotate(-3 -132 136)"', HAND)}</g>` +
  `<g transform="translate(430 640) rotate(-38)"><rect x="-116" y="2" width="240" height="20" rx="10" opacity=".35" filter="url(#${k}b)"/><rect x="-120" y="-10" width="200" height="20" rx="9" fill="#d0203a"/><rect x="-120" y="-10" width="70" height="20" rx="9" fill="#8a1424"/><path d="M80-9L112 0L80 9Z" fill="#e9e2d2"/><path d="M104-2.500L114 0L104 2.500Z" fill="#d0203a"/><rect x="-116" y="-7" width="180" height="4" rx="2" fill="#fff" opacity=".35"/></g>` +
  `<g transform="translate(96 716) rotate(12)" fill="none" stroke="#3a2016" stroke-width="6"><rect x="-58" y="-24" width="52" height="38" rx="15" fill="#fff" fill-opacity=".25"/><rect x="6" y="-24" width="52" height="38" rx="15" fill="#fff" fill-opacity=".25"/><path d="M-6-8h12M-58-10L-84 20M58-10L84 20"/></g>`, 0.5);

const LACEPAT = (k: string): string => `<pattern id="${k}p" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M8 2q4 4 0 8q-4-4 0-8M0 10q4 4 0 8M16 10q-4 4 0 8M2 8h4M10 8h4" fill="none" stroke="#6a5878" stroke-width="1.100"/></pattern>`;
const BODYSUIT = 'M-60 64Q-34 46-2 82Q34 46 60 64C64 90 44 120 40 146C42 176 76 194 80 236Q40 250 10 278Q0 284-10 278Q-40 250-80 236C-76 194-42 176-40 146C-44 120-64 90-60 64Z';
const phLace = (k: string): string => { const f = nora(smirk('#b8405a'), true, 1.4), RB = '#1f7a68', RD = '#0e4a40'; return frame(k, 600, 800, '#ffc8a0',
  lg(`${k}w`, '#4a1c30', '#1c0a16') + glow(`${k}g`, '#fff', 0.9) + glow(`${k}l`, '#ff8a7a', 0.8) + LACEPAT(k) + `<filter id="${k}b"><feGaussianBlur stdDeviation="8"/></filter>`,
  `<rect width="600" height="800" fill="url(#${k}w)"/>${orb(80, 300, 300, `${k}l`, 0.85)}<path d="M40 280L58 210H112L130 280Z" fill="#ffd9b0"/><rect x="80" y="280" width="10" height="110" fill="#2a1420"/><rect x="20" y="390" width="140" height="240" fill="#2a1420"/><rect x="20" y="390" width="140" height="12" fill="#4a2434"/>` +
  `<rect x="0" y="600" width="600" height="200" fill="#14060e"/><path d="M380 470Q500 440 600 460V800H360Z" fill="#7a2a44"/><path d="M380 470Q500 440 600 460V500Q500 480 376 512Z" fill="#a84a64" opacity=".7"/><path d="M470 300Q540 280 600 300V470Q500 450 440 470Z" fill="#e9dcd0" opacity=".9"/>` +
  `<g transform="translate(506 520) rotate(-6)"><rect x="-56" y="-44" width="120" height="96" opacity=".4" filter="url(#${k}b)"/><rect x="-62" y="-50" width="124" height="96" fill="#fbf4ea"/><rect x="-66" y="-58" width="132" height="24" fill="#fffdf6"/><rect x="-9" y="-58" width="18" height="104" fill="#d0203a"/><path d="M0-58C-30-96-56-70 0-58C56-70 30-96 0-58Z" fill="#e23d5a"/><path d="M0-58l-20 26M0-58l20 26" stroke="#e23d5a" stroke-width="7" stroke-linecap="round"/><circle cy="-58" r="7" fill="#a8142c"/></g>` +
  `<g transform="translate(288 300) scale(1.38)"><g filter="url(#${k}f)">${at(0, HY, HS, 5, `<g transform="translate(-100 -85)">${f.back ?? ''}</g>`)}<path d="M-98 96Q-124 210-130 420H-66L-52 160ZM58 6Q90 12 96 44L128 420H68L52 150Z" fill="${RD}"/>` +
  `<g fill="${f.sk}">${limb([-44, 250, 42], [-44, 420, 35])}${limb([44, 250, 42], [48, 420, 35])}<path d="${TF}"/>${limb([-66, 28, 19], [-106, 112, 16])}</g><path d="${BODYSUIT}" fill="#141018"/>` +
  `<g fill="${RB}">${limb([-106, 112, 20], [-76, 150, 16])}${limb([68, 28, 22], [124, 96, 19], [100, 14, 15])}<path d="M32-6Q60 0 78 12L64 72Q46 30 28 6Z"/></g></g>` +
  `<path d="${BODYSUIT}" fill="url(#${k}p)"/><path d="M-40 146C-44 120-58 100-60 80L-44 110Q-34 140-38 190ZM40 146C44 120 58 100 60 80L44 110Q34 140 38 190Z" fill="${f.sk}" opacity=".22"/>${marks(f.sh)}<path d="M-40 4L-36 58M40 4L36 58" stroke="#141018" stroke-width="3.500"/>` +
  `${lace('M-58 66Q-34 50-2 84Q34 50 58 66', '#8a78a0')}${lace('M-78 232Q-40 246-10 274M78 232Q40 246 10 274', '#8a78a0', 4)}<path d="M-2 84V130" stroke="#3a2c44" stroke-width="2"/><circle cx="-2" cy="88" r="3" fill="#e8c0c8"/>${sheen('M-76 40Q-92 70-98 100', 5, 0.3)}${sheen('M-70 270Q-78 330-70 390', 8, 0.2)}${sheen('M104 50Q120 80 114 108', 6, 0.35)}${sheen('M96 180Q112 280 108 400', 7, 0.25)}${sheen('M-104 200Q-112 300-108 400', 7, 0.2)}` +
  `<path d="M64 72Q80 200 70 420" fill="none" stroke="#5fd0b8" stroke-width="3" opacity=".6"/>` +
  `${at(0, HY, HS, 5, `<g transform="translate(-100 -85)">${face(f, false)}</g>`)}${phone(98, -30, 8, '#2a2c3a', f.sk)}` +
  `<g transform="translate(-22 150) rotate(-7)"><rect x="-46" y="-30" width="100" height="68" fill="#000" opacity=".3"/><rect x="-50" y="-34" width="100" height="68" rx="3" fill="#fff8ec"/><rect x="-46" y="-30" width="92" height="60" rx="2" fill="none" stroke="#d8b25a" stroke-width="1.500"/>${tx(0, -4, 17, 'Ten years.', '#3a1c24', '', HAND)}${tx(0, 18, 15.5, 'Open slowly.', '#b0203a', '', HAND)}</g>` +
  `${hand(-74, 170, -100, f.sk, f.sh, 1.05)}<path d="M-98 142l20 20" stroke="#141018" stroke-width="5" stroke-dasharray="5 2.500"/><circle cx="-88" cy="152" r="3" fill="#f2b632"/></g>` +
  flash(418, 258, `${k}g`) + `<path d="M0 0H120L40 800H0Z" fill="#fff" opacity=".05"/><path d="M0 0H600V800H0Z" fill="none" stroke="#2a1a14" stroke-width="18"/><path d="M9 9H591V791H9Z" fill="none" stroke="#c8a050" stroke-width="3" opacity=".7"/>`, 0.55); };

const CAPT: Face = {
  sk: '#c98a62', sh: '#8a5238', rim: '#ffe9a0', iris: '#2a4a5a', browC: '#17100f', brows: 'M77 81Q86 77 95 81M105 79Q114 73 123 77', mouth: smirk('#6a2a20'), lid: 1.4,
  back: '<path d="M62 96C54 60 70 40 100 38C132 40 146 60 138 96L132 70H68Z" fill="#17100f"/>',
  front: '<path d="M72 104C76 126 88 134 100 134C114 134 126 124 129 104C122 118 112 112 100 112C88 112 80 116 72 104Z" fill="#17100f" opacity=".42"/><path d="M62 70Q100 54 138 70L134 58Q100 40 66 58Z" fill="#14203a"/><path d="M60 58C56 26 144 26 140 58Q100 40 60 58Z" fill="#f4f0e4"/><path d="M62 72Q100 58 138 72Q142 80 128 78Q100 66 72 78Q58 80 62 72Z" fill="#0a0e1c"/><circle cx="100" cy="50" r="6.500" fill="#d8b25a"/>',
};
const phCoverMock = (k: string): string => frame(k, 600, 800, '#ffe9a0',
  lg(`${k}d`, '#3a2a22', '#14100e', 1, 1) + `<linearGradient id="${k}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1626"/><stop offset=".55" stop-color="#1f4a5e"/><stop offset=".56" stop-color="#143444"/><stop offset="1" stop-color="#0a1820"/></linearGradient>` + lg(`${k}m`, '#fff3b0', '#fff3b0', 1, 0).replace('stop-color="#fff3b0"/></', 'stop-color="#fff3b0" stop-opacity="0"/></') + `<clipPath id="${k}c"><rect width="452" height="690" rx="4"/></clipPath><filter id="${k}b"><feGaussianBlur stdDeviation="12"/></filter>`,
  `<rect width="600" height="800" fill="url(#${k}d)"/><g transform="translate(66 60) rotate(-2 226 345)"><rect x="12" y="14" width="452" height="690" opacity=".55" filter="url(#${k}b)"/><g clip-path="url(#${k}c)"><rect width="452" height="690" fill="url(#${k}s)"/>` +
  `<g filter="url(#${k}b)" opacity=".7"><ellipse cx="120" cy="150" rx="170" ry="50" fill="#2a4050"/><ellipse cx="380" cy="230" rx="150" ry="40" fill="#34566a"/><ellipse cx="300" cy="90" rx="160" ry="40" fill="#1c2c3c"/></g>` +
  `<path d="M70 196L460 110V290Z" fill="url(#${k}m)" opacity=".5"/><path d="M52 380L60 210H84L92 380Z" fill="#e9e2d2"/><path d="M57 270H87V300H56ZM54 330H90V356H53Z" fill="#c0283a"/><rect x="54" y="180" width="36" height="32" fill="#1c1c24"/><rect x="60" y="186" width="24" height="20" fill="#fff3b0"/><path d="M50 180L72 160L94 180Z" fill="#c0283a"/>` +
  `<g fill="none" stroke="#bfe6f0" stroke-width="3" opacity=".5" stroke-linecap="round"><path d="M0 400q30-16 60 0t60 0M260 420q30-16 60 0t60 0t60 0M120 450q30-16 60 0t60 0"/></g><path d="M-10 520L462 470V700H-10Z" fill="#3a2418"/><g stroke="#1c100a" stroke-width="3" opacity=".6"><path d="M-10 560L462 516M-10 610L462 574M-10 664L462 640"/></g>` +
  `<g stroke="#cfe6f0" stroke-width="1.500" opacity=".3">${[30, 90, 150, 210, 270, 330, 390, 440].map((x, i) => `<path d="M${x} ${40 + (i * 67) % 300}l-14 50"/>`).join('')}</g>` +
  `<g transform="translate(236 316) scale(1.22)"><g filter="url(#${k}f)"><path d="M-70 4Q-96 10-100 40L-130 330H-50L-44 120ZM70 4Q96 10 100 40L140 320H50L44 120Z" fill="#14203a"/><g fill="${CAPT.sk}"><path d="${TM}"/></g><g fill="#1c2a4a">${limb([-80, 30, 24], [-106, 130, 20], [-92, 230, 17])}${limb([80, 30, 24], [108, 130, 20], [96, 230, 17])}<path d="M-30-12Q-60-4-84 8L-60 90Q-46 30-24 0ZM30-12Q60-4 84 8L60 90Q46 30 24 0Z"/></g><path d="M-54 190H54V320H-54Z" fill="#1a1a22"/><rect x="-56" y="186" width="112" height="16" fill="#3a2418"/><rect x="-10" y="184" width="20" height="20" rx="3" fill="#d8b25a"/></g>` +
  `<g fill="none" stroke="${CAPT.sh}" stroke-width="2.600" stroke-linecap="round" opacity=".8"><path d="M-56 8Q-32 14-10 6M56 8Q32 14 10 6M-60 80Q-30 98-3 82M60 80Q30 98 3 82M0 44V84M0 104V180M-28 120Q-14 126 0 122Q14 126 28 120M-27 148Q-14 154 0 150Q14 154 27 148"/></g>${sheen('M-52 50Q-40 36-20 40M16 44Q30 36 46 42', 5, 0.25)}` +
  `<g fill="#d8b25a"><circle cx="-62" cy="110" r="4.500"/><circle cx="-60" cy="150" r="4.500"/><circle cx="62" cy="110" r="4.500"/><circle cx="60" cy="150" r="4.500"/><rect x="-100" y="6" width="34" height="9" rx="3"/><rect x="66" y="6" width="34" height="9" rx="3"/></g>` +
  `<g fill="none" stroke="#d9c8a0" stroke-width="6"><ellipse cx="98" cy="262" rx="22" ry="30"/><ellipse cx="102" cy="266" rx="16" ry="24" stroke="#b8a070"/></g>${hand(96, 236, 0, CAPT.sk, CAPT.sh, 1.1)}${hand(-92, 240, 0, CAPT.sk, CAPT.sh, 1.1)}${at(0, HY, HS, -4, `<g transform="translate(-100 -85)">${face(CAPT)}</g>`)}</g>` +
  `<rect width="452" height="110" fill="#0a1626" opacity=".55"/>${tx(226, 62, 40, 'DELPHINE RUSH', '#f2c85a', 'letter-spacing="3"', SERIF)}${tx(226, 90, 12.5, 'THE TIDEWATER HEAT SERIES · BOOK TEN', '#dfe9f0', 'letter-spacing="2.500"')}` +
  `<rect y="540" width="452" height="150" fill="#0a1626" opacity=".6"/>${tx(226, 590, 37, 'THE MYSTERY MAN', '#fff', 'letter-spacing="2"', SERIF)}${tx(226, 656, 66, 'RETURNS', '#f2c85a', 'letter-spacing="7"', SERIF)}<path d="M0 0H26V690H0Z" fill="#fff" opacity=".08"/></g></g>` +
  note(486, 330, 180, 150, 7, '#ffe96a', `${tx(0, -22, 26, 'his laugh', '#1c3a8a', '', HAND)}${tx(0, 10, 26, 'should be', '#1c3a8a', '', HAND)}${tx(0, 46, 34, 'G’s', '#c0203a', '', HAND)}<rect x="-95" y="-75" width="190" height="22" fill="#000" opacity=".06"/>`), 0.5);

const phTest = (k: string): string => frame(k, 600, 800, '#fff',
  lg(`${k}m`, '#cfe3e8', '#9fbcc6', 1, 1) + lg(`${k}c`, '#f6f4f0', '#d9d6d0') + glow(`${k}g`, '#fff', 0.7) + `<filter id="${k}b"><feGaussianBlur stdDeviation="9"/></filter>`,
  `<rect width="600" height="800" fill="#b8c8cc"/><rect x="30" y="-10" width="540" height="430" fill="url(#${k}m)"/><g stroke="#fff" stroke-width="2" opacity=".35"><path d="M30 90H570M30 190H570M30 290H570M30 390H570M130-10V420M250-10V420M370-10V420M490-10V420"/></g>${orb(140, 120, 300, `${k}g`, 0.8)}` +
  `<path d="M60 40H130V330H60Z" fill="#e8c8d0" opacity=".7" filter="url(#${k}b)"/><path d="M30-10H570V420H30Z" fill="none" stroke="#e9e6e0" stroke-width="16"/><path d="M30 0L230 0L100 420H30Z" fill="#fff" opacity=".16"/>` +
  note(408, 190, 170, 160, -5, '#ffd0de', `${tx(-10, 14, 64, '28th', '#1c3a8a', '', HAND)}<g transform="translate(56 34)" fill="none" stroke="#1c3a8a" stroke-width="3.500" stroke-linecap="round"><path d="M-6 0C-12-18-2-32 8-38M6 0C10-18 0-30-8-38M-13 2Q-16 22 0 24Q16 22 13 2M-13 2Q-18-6-12-10M13 2Q18-4 14-9"/></g><rect x="-85" y="-80" width="170" height="20" fill="#000" opacity=".06"/>`) +
  `<rect y="428" width="600" height="72" fill="#dfe9ec"/><g stroke="#b8c8cc" stroke-width="3"><path d="M0 464H600M100 428V464M300 428V464M500 428V464M200 464V500M400 464V500"/></g><rect y="496" width="600" height="304" fill="url(#${k}c)"/><rect y="496" width="600" height="8" fill="#fff"/>` +
  `<g fill="none" stroke="#b8b4ac" stroke-width="2" opacity=".6"><path d="M0 560Q140 590 220 550T420 600T600 570M80 800Q160 720 300 740T560 690"/></g>` +
  // toothbrush cup
  `<g transform="translate(92 520)"><ellipse cx="6" cy="78" rx="50" ry="12" opacity=".25" filter="url(#${k}b)"/><path d="M-10-120V20" stroke="#3f8fd8" stroke-width="9" stroke-linecap="round" transform="rotate(-10)"/><path d="M12-120V20" stroke="#e86a8a" stroke-width="9" stroke-linecap="round" transform="rotate(12)"/><rect x="-36" y="-134" width="18" height="30" rx="4" fill="#fff" transform="rotate(-10)"/><rect x="18" y="-134" width="18" height="30" rx="4" fill="#fff" transform="rotate(12)"/><path d="M-40-30H40L34 76H-34Z" fill="#fff" opacity=".85" stroke="#c9d3da" stroke-width="3"/><path d="M-28-20V60" stroke="#fff" stroke-width="6" opacity=".9"/></g>` +
  // box, one test left
  `<g transform="translate(456 580) rotate(8)"><rect x="-70" y="-116" width="170" height="250" opacity=".3" filter="url(#${k}b)"/><g transform="rotate(-9 30 -130)"><rect x="12" y="-190" width="40" height="110" rx="6" fill="#dfe6ea"/><rect x="12" y="-190" width="40" height="110" rx="6" fill="none" stroke="#aab4bc" stroke-width="2"/><path d="M12-170h40M12-150h40" stroke="#aab4bc" stroke-width="1.500"/></g><path d="M-84-120L-70-160H70L84-120Z" fill="#e8a8c0"/><rect x="-84" y="-120" width="168" height="240" rx="5" fill="#fff"/><rect x="-84" y="-120" width="168" height="64" fill="#e86a9a"/>` +
  `${tx(0, -78, 25, 'CLEARLINE', '#fff', 'letter-spacing="1"')}${tx(0, -26, 15, 'pregnancy test', '#5a5a66')}${tx(0, 24, 40, '2-PACK', '#e86a9a')}${tx(0, 52, 13, '2 tests · results in 3 min', '#5a5a66')}<rect x="-50" y="72" width="100" height="26" rx="13" fill="none" stroke="#e86a9a" stroke-width="2.500"/><path d="M-18 78V92" stroke="#e86a9a" stroke-width="4"/>${tx(12, 91, 13, '= no', '#5a5a66')}</g>` +
  // the used test: ONE line
  `<g transform="translate(214 716) rotate(-8)"><rect x="-150" y="-14" width="330" height="56" rx="26" opacity=".3" filter="url(#${k}b)"/><rect x="-170" y="-30" width="330" height="60" rx="28" fill="#fff"/><rect x="-170" y="-30" width="330" height="60" rx="28" fill="none" stroke="#c9d3da" stroke-width="3"/><path d="M60-30H132Q160-30 160 0Q160 30 132 30H60Z" fill="#e86a9a"/><rect x="-96" y="-18" width="110" height="36" rx="8" fill="#f1ece6" stroke="#8a9098" stroke-width="2.500"/><rect x="-24" y="-14" width="7" height="28" fill="#d0206a"/>` +
  `${tx(-20, -34, 12, 'C', '#8a9098')}${tx(-62, -34, 12, 'T', '#8a9098')}<rect x="-150" y="-12" width="30" height="24" rx="8" fill="#f1ece6" stroke="#c9d3da" stroke-width="2"/><path d="M-160-22H50" stroke="#fff" stroke-width="5" opacity=".8" stroke-linecap="round"/></g>`, 0.4);

function studyHead(f: Face) {
  return { skin: f.sk, shade: f.sh, draw: (tilt: number) => `<g transform="translate(300 194) rotate(${tilt}) scale(2.83) translate(-100 -85)">${face(f)}</g>` };
}

export const caught2StudyHeads = {
  nora: studyHead(nora(smirk('#804738'))),
  greg: studyHead(greg(smirk('#7f5040'))),
  tiffani: studyHead(tiffani(smirk('#9b515c'))),
};

export const caught2Art: Record<string, string> = {
  cg2_cover: cover('cg2_cover'),
  cg2_wall_lock: wallLock('cg2_wall_lock'),
  cg2_wall_home: wallHome('cg2_wall_home'),
  cg2_map: cg2Map('cg2_map'),
  cg2_ph_wedding: phWedding('cg2_ph_wedding'),
  cg2_ph_us_vela: phUsVela('cg2_ph_us_vela'),
  cg2_ph_vela_b: phVelaB('cg2_ph_vela_b'),
  cg2_ph_cabin: phCabin('cg2_ph_cabin'),
  cg2_ph_keycard: phKeycard('cg2_ph_keycard'),
  cg2_ph_shoes: phShoes('cg2_ph_shoes'),
  cg2_ph_bea_spin: phBeaSpin('cg2_ph_bea_spin'),
  cg2_ph_tiffani: phTiffani('cg2_ph_tiffani'),
  cg2_ph_suite: phSuite('cg2_ph_suite'),
  cg2_ph_mic: phMic('cg2_ph_mic'),
  cg2_ph_video: phVideo('cg2_ph_video'),
  cg2_ph_h_proof: phProof('cg2_ph_h_proof'),
  cg2_ph_h_lace: phLace('cg2_ph_h_lace'),
  cg2_ph_h_cover: phCoverMock('cg2_ph_h_cover'),
  cg2_ph_h_test: phTest('cg2_ph_h_test'),
  av_cg2_nora: avNora('av_cg2_nora'),
  av_cg2_greg: avGreg('av_cg2_greg'),
  av_cg2_mystery: avMystery('av_cg2_mystery'),
  av_cg2_dev: avDev('av_cg2_dev'),
  av_cg2_bea: avBea('av_cg2_bea'),
  av_cg2_tiffani: avTiffani('av_cg2_tiffani'),
  av_cg2_gary: avGary('av_cg2_gary'),
  av_cg2_hoa: avHoa('av_cg2_hoa'),
};
