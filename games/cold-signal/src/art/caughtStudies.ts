import { studyKey, studySubjects } from '../cases/caughtPortraits';
import { alexis, brody, deb, kenna, kyle, marcus, riley, sienna, tanner, tash } from './caught4';
import { bea, ellis, lena, mara, nico, theo } from './caught5';
import { cal, daniel, iris, neve, sofia } from './caught6';
import { person, scene, type Portrait } from './caughtScenes';

const dez: Portrait = { skin: '#8d594c', shade: '#593947', hair: '#201925', shirt: '#3a3f52', style: 'crop' };

type Chapter = 4 | 5 | 6;

interface Study {
  portrait: Portrait;
  backdrop: string;
  accent: string;
  fullChest?: boolean;
  turn?: number;
  strapMarks?: boolean;
  jewelry?: 'silver-bars' | 'gold-ring';
}

const poses = {
  4: {
    tanner: { portrait: tanner, backdrop: '#636b76', accent: '#e7b58e', turn: -4 },
    kenna: { portrait: kenna, backdrop: '#906376', accent: '#f5c9aa', fullChest: true, strapMarks: true, jewelry: 'silver-bars', turn: 4 },
    riley: { portrait: riley, backdrop: '#556b82', accent: '#bfe0df', fullChest: true, turn: -4 },
    deb: { portrait: deb, backdrop: '#9e7068', accent: '#f3d2a5', fullChest: true, turn: 4 },
    brody: { portrait: brody, backdrop: '#8e685c', accent: '#ffcc96', turn: 2 },
    marcus: { portrait: marcus, backdrop: '#527674', accent: '#cadbc1', turn: -3 },
    kyle: { portrait: kyle, backdrop: '#666583', accent: '#e2c7c7', turn: 3 },
    sienna: { portrait: sienna, backdrop: '#925967', accent: '#f3bf9b', fullChest: true, turn: -3 },
    alexis: { portrait: alexis, backdrop: '#795c79', accent: '#ead0b3', fullChest: true, turn: 3 },
    tash: { portrait: tash, backdrop: '#5b7981', accent: '#cedda9', fullChest: true, turn: -2 },
  },
  5: {
    mara: { portrait: mara, backdrop: '#815973', accent: '#efbe9d', fullChest: true, strapMarks: true, turn: -2 },
    ellis: { portrait: ellis, backdrop: '#58657f', accent: '#dcd3b9', turn: 3 },
    theo: { portrait: theo, backdrop: '#685675', accent: '#f3be91', jewelry: 'gold-ring', turn: -3 },
    nico: { portrait: nico, backdrop: '#a0766c', accent: '#eed1a6', turn: 3 },
    bea: { portrait: bea, backdrop: '#815660', accent: '#f1baa5', fullChest: true, turn: -4 },
    lena: { portrait: lena, backdrop: '#8d5c76', accent: '#eac4bf', fullChest: true, turn: 4 },
    dez: { portrait: dez, backdrop: '#555e7c', accent: '#a4d5e1', turn: 3 },
  },
  6: {
    sofia: { portrait: sofia, backdrop: '#8b6f79', accent: '#eec9a5', fullChest: true, strapMarks: true, jewelry: 'gold-ring', turn: 4 },
    daniel: { portrait: daniel, backdrop: '#5a7982', accent: '#dcd1ad', turn: -3 },
    iris: { portrait: iris, backdrop: '#667c70', accent: '#ead4ab', fullChest: true, turn: -4 },
    cal: { portrait: cal, backdrop: '#78667c', accent: '#f4c49c', turn: 3 },
    neve: { portrait: neve, backdrop: '#915d68', accent: '#e8bfac', fullChest: true, turn: 3 },
    dez: { portrait: dez, backdrop: '#5a687d', accent: '#c0dfdc', turn: -3 },
  },
} satisfies { [N in Chapter]: Record<keyof typeof studySubjects[N], Study> };

// Vary the camera height, framing, and expression as well as the cast's palette.
const framings = [
  { x: -102, y: 32, scale: 1.18, width: .99, head: -3, expression: 1 },
  { x: 88, y: 93, scale: 1.01, width: .86, head: 5, expression: 2 },
  { x: 43, y: -41, scale: 1.18, width: .81, head: -4, expression: 3 },
  { x: -35, y: 49, scale: 1.06, width: .98, head: 4, expression: 0 },
  { x: 71, y: -22, scale: 1.08, width: .91, head: 2, expression: 1 },
  { x: -59, y: -16, scale: 1.12, width: .87, head: -5, expression: 3 },
];

const backdrops = {
  4: `<path d="M39 0h341v900H39z" fill="#34404b" opacity=".55"/>
    <path d="M101 0v900m-55-720 346 20M42 393l350 10M55 608h341" stroke="#ded0bb" stroke-width="6" opacity=".26"/>
    <path d="M423 0l169 65v556l-169-47Z" fill="#161c2a" opacity=".73"/>
    <path d="M450 103l109 39m-110 8 112 41m-110 7 112 42m-112 7 112 40" stroke="#a3aead" stroke-width="7" opacity=".3"/>`,
  5: `<path d="M-30 78L447 22v537L-30 629Z" fill="#1b2534" opacity=".68"/>
    <path d="M59 76l-12 548m305-585-9 525M0 312l437-60" stroke="#172232" stroke-width="13"/>
    <path d="M0 90l490-69M0 162l487-69M0 236l487-69M0 312l486-68M0 392l478-66M0 472l478-66" stroke="#f6c5a0" stroke-width="10" opacity=".24"/>
    <path d="M477 0l123 81v769l-123-70Z" fill="#312d43" opacity=".88"/>`,
  6: `<path d="M55 827V306a259 259 0 0 1 519 0v521" fill="#b3a18b" fill-opacity=".28" stroke="#e4c8a0" stroke-opacity=".34" stroke-width="9"/>
    <path d="M27 0q127 171 65 465T132 900H0V0Zm552 0q-120 237-52 473T502 900h98V0Z" fill="#5c4a59" opacity=".87"/>
    <path d="M58 0q109 176 51 431t25 450m421-881q-100 217-43 432t-25 453" fill="none" stroke="#a48988" stroke-width="8" opacity=".4"/>`,
};

function draw(key: string, chapter: Chapter, frameIndex: number, { portrait: p, backdrop, accent, fullChest, turn = 0, strapMarks, jewelry }: Study): string {
  const frame = framings[frameIndex % framings.length];
  const head = `<g transform="rotate(${frame.head} 300 330)">${person(65, -11, 2.35, p, false, frame.expression)}</g>`;
  const chest = fullChest
    ? 'M153 491Q190 449 257 486Q278 510 267 550Q252 605 201 590Q146 577 145 529ZM447 491Q410 449 343 486Q322 510 333 550Q348 605 399 590Q454 577 455 529Z'
    : 'M146 470Q191 441 274 472L278 529Q223 564 165 541ZM454 470Q409 441 326 472L322 529Q377 564 435 541Z';
  const y = fullChest ? 544 : 510;
  const bars = `<g stroke="#d9e1e8" stroke-width="2.3" fill="#f2ded4">
    <path d="M197 ${y - 1}h15m176 0h15"/>
    <circle cx="197" cy="${y - 1}" r="2.1"/><circle cx="212" cy="${y - 1}" r="2.1"/>
    <circle cx="388" cy="${y - 1}" r="2.1"/><circle cx="403" cy="${y - 1}" r="2.1"/>
  </g>`;
  const sheer = `<g>
    <path d="M128 445Q201 486 292 478Q391 472 457 442L470 611Q396 645 298 629Q200 617 124 630Z" fill="${accent}" opacity=".18"/>
    <path d="M128 445Q201 486 292 478Q391 472 457 442M124 630Q200 617 298 629Q396 645 470 611" fill="none" stroke="${accent}" stroke-width="4" opacity=".48"/>
    <path d="M129 469Q232 526 460 464M127 490Q236 543 462 490M126 512Q236 560 466 514M125 537Q240 575 467 540M124 560Q246 598 468 565M124 588Q251 618 469 590" fill="none" stroke="${accent}" stroke-width="1" opacity=".17"/>
  </g>`;
  const hoop = `<path d="M391 ${y}a5 6 0 1 0 9 0" fill="none" stroke="#eaca91" stroke-width="2.3" stroke-linecap="round"/>`;
  return scene(key, 600, 800, backdrop, '#211e34', `
    ${backdrops[chapter]}
    <g transform="translate(${frame.x} ${frame.y}) scale(${frame.scale}) translate(300 0) scale(${frame.width} 1) translate(-300 0) rotate(${turn} 300 413)">
      <path d="M236 328h128v49q46 24 104 55 69 37 73 136l-19 232H78L59 574q6-94 72-142 42-30 105-51Z" fill="${p.skin}"/>
      <path d="M369 387q135 49 154 111l15 115-17 187H406q52-140 52-235 4-96-89-178Z" fill="${p.shade}" opacity=".56"/>
      ${head}
      <path d="M144 437q65-32 142 10m28 0q80-42 142-10M299 445v48" fill="none" stroke="${p.shade}" stroke-width="6" stroke-linecap="round"/>
      ${strapMarks ? `<path d="M177 414q-13 26-8 59m14-55q-11 25-7 51m247-55q13 26 8 59m-14-55q11 25 7 51" fill="none" stroke="${p.shade}" stroke-width="4" stroke-linecap="round" opacity=".48"/>` : ''}
      <path d="${chest}" fill="${p.shade}" opacity=".53"/>
      <path d="M139 453q-42 38-44 150m359-150q34 42 45 124" fill="none" stroke="${accent}" stroke-width="5" opacity=".52"/>
      <g transform="translate(0 ${y})" fill="${p.shade}">
        <path d="M190 2c-1-7 7-12 15-12 8 1 15 4 15 11-1 7-7 10-15 10-9 0-14-3-15-9Z"/>
        <path d="M380 1c1-7 7-11 15-11 10 0 16 4 15 12-1 6-8 10-16 9-7 0-15-4-14-10Z"/>
        <path d="M190 10q15 7 29 0m162 0q13 7 28 0" fill="none" stroke="#4e2939" stroke-width="1.5" opacity=".35"/>
      </g>
      <g fill="#4e2939" opacity=".7"><ellipse cx="204" cy="${y}" rx="5" ry="3.5"/><ellipse cx="396" cy="${y}" rx="5" ry="3.5"/></g>
      ${jewelry === 'silver-bars' ? bars : jewelry === 'gold-ring' ? hoop : ''}
      ${fullChest && jewelry ? sheer : ''}
      <path d="M43 681q126-27 232 0t278-20v139H43Z" fill="${backdrop}"/>
      <path d="M43 712q127-33 224-6t288-13" fill="none" stroke="${accent}" stroke-width="12" opacity=".32"/>
    </g>
    <path d="M0 0h600v9H0zm0 791h600v9H0z" fill="#171923" opacity=".54"/>`);
}

export const caughtStudiesArt: Record<string, string> = {};
for (const caseNumber of [4, 5, 6] as const) {
  for (const [frameIndex, [subject, study]] of Object.entries(poses[caseNumber]).entries()) {
    const key = studyKey(caseNumber, subject);
    caughtStudiesArt[key] = draw(key, caseNumber, frameIndex, study);
  }
}
