// Drawing primitives for the C4–C6 evidence illustrations.
const escape = (text: string): string => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const label = (x: number, y: number, size: number, text: string, color = '#f7ecdb'): string =>
  `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-family="Arial,sans-serif" font-size="${size}" font-weight="700">${escape(text)}</text>`;

export function scene(key: string, width: number, height: number, sky: string, ground: string, body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><defs>
    <linearGradient id="${key}_light" x2=".72" y2="1"><stop stop-color="${sky}"/><stop offset="1" stop-color="${ground}"/></linearGradient>
    <radialGradient id="${key}_edge" r=".72"><stop offset=".45" stop-color="#080711" stop-opacity="0"/><stop offset="1" stop-color="#080711" stop-opacity=".65"/></radialGradient>
    </defs><rect width="100%" height="100%" fill="url(#${key}_light)"/>${body}<rect width="100%" height="100%" fill="url(#${key}_edge)"/></svg>`;
}

export interface Portrait {
  skin: string;
  shade: string;
  hair: string;
  shirt: string;
  style: 'crop' | 'sweep' | 'curls' | 'tail' | 'bob';
  glasses?: boolean;
}

const hairShape: Record<Portrait['style'], string> = {
  crop: 'M56 95C43 43 71 33 100 33C132 32 151 57 144 98L132 74 113 66 81 75 69 68Z',
  sweep: 'M56 104C38 65 58 31 89 31C117 22 155 42 145 99L133 75Q104 76 87 60Q76 84 60 87Z',
  curls: 'M54 106Q39 99 46 82Q35 63 51 54Q51 30 74 34Q82 15 105 27Q131 18 143 40Q163 49 151 69Q161 94 143 103L130 72Q109 83 100 65Q79 77 66 70Z',
  tail: 'M54 111Q41 47 73 36Q101 20 129 37Q142 18 161 31Q179 53 163 83Q151 119 160 143Q132 122 144 64L137 105 129 62Q104 88 65 75Z',
  bob: 'M48 152L48 84Q45 31 84 27Q144 17 153 76L156 148Q137 159 125 144L136 97 132 66Q100 63 91 52Q78 79 62 81L73 151Q62 157 48 152Z',
};

export function person(x: number, y: number, scale: number, p: Portrait, shoulders = true): string {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    ${shoulders ? `<path d="M7 210Q12 169 55 156L84 143H118L145 156Q189 169 194 210Z" fill="${p.shirt}"/>
    <path d="M143 158Q185 169 194 210H147L123 172Z" fill="#0c1121" opacity=".3"/>` : ''}
    <path d="M83 125H120V153Q107 177 84 151Z" fill="${p.shade}"/>
    <ellipse cx="58" cy="101" rx="9" ry="13" fill="${p.skin}"/><ellipse cx="142" cy="101" rx="9" ry="13" fill="${p.shade}"/>
    <path d="M57 88Q57 47 99 42Q139 41 145 86L140 112Q133 144 105 153Q72 154 61 119Z" fill="${p.skin}"/>
    <path d="M112 44Q143 54 145 86L140 112Q133 144 105 153Q126 131 119 116L125 105Z" fill="${p.shade}"/>
    <path d="${hairShape[p.style]}" fill="${p.hair}"/>
    <path d="M61 61Q77 36 111 40" fill="none" stroke="#fff" opacity=".22" stroke-width="4" stroke-linecap="round"/>
    <path d="M71 88Q79 84 88 88M112 88Q121 84 130 89" fill="none" stroke="${p.hair}" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M70 98Q80 91 89 99M111 99Q121 92 130 99" fill="#f9ecdb" stroke="#2d2430" stroke-width="2.4"/>
    <circle cx="81" cy="97" r="3" fill="#302330"/><circle cx="121" cy="98" r="3" fill="#352532"/>
    <path d="M100 99L95 115Q99 118 105 116M89 129Q102 136 115 126" fill="none" stroke="#632f39" stroke-width="2.7" stroke-linecap="round"/>
    ${p.glasses ? '<path d="M65 92h28v13H70zM107 92h28l-5 13h-23zM93 96h14" fill="none" stroke="#292738" stroke-width="3"/>' : ''}
  </g>`;
}

export const avatar = (key: string, tint: string, p: Portrait): string =>
  scene(key, 200, 200, tint, '#231a2f', '<circle cx="100" cy="93" r="75" fill="#fff4dd" opacity=".13"/>' + person(0, 0, 1, p));

export function streetMap(key: string, water: string, block: string, routes: string, names: [number, number, string][]): string {
  return scene(key, 800, 600, '#293c3c', '#111e2d', `
    <path d="M0 92L230 10 320 125 282 273 147 323 0 280ZM517 0H800V278L697 279 607 174ZM446 376L800 308V600H506Z" fill="${block}"/>
    <path d="M-10 353C158 310 221 410 339 348S499 225 636 273 740 323 814 293" fill="none" stroke="${water}" stroke-width="44"/>
    <path d="${routes}" fill="none" stroke="#111e27" stroke-width="16" stroke-linejoin="round"/>
    <path d="${routes}" fill="none" stroke="#a4a393" stroke-width="8" opacity=".7" stroke-linejoin="round"/>
    <path d="M745 56l13-26 13 26-13-7z" fill="#d8d3b0"/>${label(758, 79, 15, 'N')}
    ${names.map(([x,y,name]) => label(x,y,20,name,'#d0cfaa')).join('')}`);
}
