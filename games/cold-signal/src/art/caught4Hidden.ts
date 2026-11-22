import { label, person, scene } from './caughtScenes';
import { tanner, kenna, gym, ink, cat } from './caught4';

export const caught4HiddenArt: Record<string, string> = {
  cg4_ph_h_hoodie: scene('cg4_ph_h_hoodie',600,800,'#a47989','#322a40',`
    <rect x="38" y="421" width="522" height="258" rx="20" fill="#ad8993"/>${cat}${person(96,53,2.03,kenna)}
    <path d="M181 489h77l-8 238h-60zm122 0h75l-24 238h-60z" fill="#dca28e"/>
    <path d="M157 331l96-30 82 16 93 24 38 199-54 15-36-103 8 136H174l5-133-37 96-53-16z" fill="#666571"/>
    <path d="M205 351q85 67 143-6l-38 103m-53-68-18 67" fill="none" stroke="#aba1a8" stroke-width="5"/>${label(280,456,24,'IRONHAUS GYM')}`),
  cg4_ph_h_towel: scene('cg4_ph_h_towel',600,800,'#8ca29f','#433446',`
    ${gym}${person(96,43,2.04,tanner)}
    <path d="M233 329q-93 20-101 114l32 117 56-29 9 96h151l18-115 47 31 28-128q-26-67-104-86l-57 45z" fill="#d39373"/>
    <path d="M307 372v69m-87-26q29 36 75 27m25 1q43 7 74-27m-167 82q32 23 62 20m39-1q37-5 61-26" fill="none" stroke="#9e5a59" stroke-width="6" opacity=".7"/>
    <ellipse cx="250" cy="439" rx="10" ry="7" fill="#a9615b"/><ellipse cx="369" cy="439" rx="10" ry="7" fill="#a9615b"/><ellipse cx="250" cy="439" rx="3" ry="2.5" fill="#834e4e"/><ellipse cx="369" cy="439" rx="3" ry="2.5" fill="#834e4e"/>
    <path d="M234 569q69 20 145 0m-133-5q59 13 119 0" fill="none" stroke="#a15f5d" stroke-width="3.5" stroke-linecap="round" opacity=".52"/>
    <path d="M210 587q125 32 202-2l13 156H196Z" fill="#eee1d6"/><path d="M209 608q92 20 178-5l-21 118" fill="none" stroke="#b9a6a7" stroke-width="10"/>
    <g transform="translate(30 66) scale(.66)">${ink}</g>`),
  cg4_ph_h_reformer: scene('cg4_ph_h_reformer',600,800,'#80596e','#282338',`
    <path d="M68 596l440-109 56 137L85 737Z" fill="#594956" stroke="#ba8887" stroke-width="15"/>
    <path d="M285 462l96 29 43-220 58 7-28 266-102 70-175-31z" fill="#302939"/><path d="M433 275q70-58 34-158" fill="none" stroke="#d3a691" stroke-width="9"/>
    <g transform="rotate(-24 183 489)">${person(13,381,1.62,{ ...kenna, shirt: '#292432' })}</g>`),
  cg4_ph_h_robe: scene('cg4_ph_h_robe',600,800,'#be8b73','#52364c',`
    <rect x="66" y="80" width="471" height="644" rx="22" fill="#b29394" stroke="#e0c0aa" stroke-width="14"/>
    <path d="M335 393h179v173H335Z" fill="#d8c1bb"/>${person(382,382,.47,tanner)}${person(50,112,2.07,{ ...kenna, shirt: kenna.skin })}
    <path d="M190 443q-6 19-5 34m8-30q-4 17-3 26" fill="none" stroke="#ad6870" stroke-width="3.5" stroke-linecap="round" opacity=".67"/>
    <path d="M172 447l87 37 99-48 68 286H96Z" fill="#eee0d2"/><path d="M172 447l101 189 85-200" fill="none" stroke="#baa5a1" stroke-width="11"/>
    ${label(326,580,18,'CANYON ROSE','#675366')}<path d="M367 493h75v56q-40 29-75-2Z" fill="#f0d2ad"/><path d="M371 495h23" stroke="#b34c66" stroke-width="8"/>`),
  cg4_ph_h_red: scene('cg4_ph_h_red',600,800,'#ac6774','#39283e',`
    <path d="M24 68h259v667H24zm293 0h259v667H317z" fill="#826379" stroke="#e7b3a3" stroke-width="8"/>
    ${person(21,108,1.32,kenna)}${person(314,105,1.32,kenna)}
    <path d="M74 315q37 26 78 5 32 28 81-3l-4 98H77zm18 159 60 24 62-25-15 95-47 29-45-29z" fill="#b13956"/>
    <path d="M82 345l139 38m-129-4 126-34m-106 166 78 52m-77 0 78-50" stroke="#ed8896" stroke-width="5"/>
    <path d="M374 312q80 46 157-3l26 282H347Z" fill="#a22849"/><path d="M398 357l-17 204m115-213 26 207" stroke="#da657d" stroke-width="11"/>`),
};
