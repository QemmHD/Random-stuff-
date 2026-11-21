// COLD SIGNAL — CAUGHT mode, case C2 "Mystery Man" (owner: Nora Pruitt; player: Greg).
// Every value in `caught2Art` is a complete standalone SVG document string.
// Ids inside each SVG are prefixed with the art key. Suggestive, never explicit.

const SANS = 'font-family="Helvetica, Arial, sans-serif"';
const SERIF = 'font-family="Georgia, Times New Roman, serif"';
const HAND = 'font-family="Marker Felt, Chalkboard SE, Comic Sans MS, sans-serif"';
const R = (v: number): number => Math.round(v * 10) / 10;
const tx = (x: number, y: number, size: number, s: string, fill: string, extra = '', font = SANS): string =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${font} font-weight="700" text-anchor="middle" ${extra}>${s}</text>`;
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
/** Place a face: (x,y) is the head centre. */
const hd = (x: number, y: number, s: number, rot: number, o: Face): string =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-100 -85)">${face(o)}</g>`;
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
const NORA_SMILE = lips('#c4566a', '#7a2436');
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
  `<path d="M214 130H270Q280 280 252 420H214Z" fill="#2a2850"/><path d="M596 130H544Q532 280 560 420H596Z" fill="#222044"/><rect x="204" y="124" width="400" height="10" rx="5" fill="#3a3866"/>` +
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
  `<g transform="translate(300 585) rotate(18) scale(1.3)"><g opacity=".5" filter="url(#${k}b)" transform="translate(22 18)"><path d="M-195 30C-205-80-235-200-218-300Q-200-362 0-366Q195-356 208-290C218-180 198-80 192 30L240 900H-240Z"/></g>` +
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

export const caught2Art: Record<string, string> = {
  cg2_cover: cover('cg2_cover'),
  cg2_wall_lock: wallLock('cg2_wall_lock'),
  cg2_wall_home: wallHome('cg2_wall_home'),
  cg2_map: cg2Map('cg2_map'),
  av_cg2_nora: avNora('av_cg2_nora'),
  av_cg2_greg: avGreg('av_cg2_greg'),
  av_cg2_mystery: avMystery('av_cg2_mystery'),
  av_cg2_dev: avDev('av_cg2_dev'),
  av_cg2_bea: avBea('av_cg2_bea'),
  av_cg2_tiffani: avTiffani('av_cg2_tiffani'),
  av_cg2_gary: avGary('av_cg2_gary'),
  av_cg2_hoa: avHoa('av_cg2_hoa'),
};
