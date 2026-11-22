// Leg Day. The mirrored ink is the lock puzzle as well as a recurring visual.
import { avatar, label, person, scene, streetMap, type Portrait } from './caughtScenes';

export const tanner: Portrait = { skin: '#db9b70', shade: '#a36254', hair: '#3b2425', shirt: '#272b35', style: 'sweep' };
export const kenna: Portrait = { skin: '#e4b099', shade: '#b27577', hair: '#562a35', shirt: '#754758', style: 'tail' };
export const riley: Portrait = { skin: '#ad775e', shade: '#714757', hair: '#231b2a', shirt: '#284569', style: 'curls' };
export const deb: Portrait = { skin: '#f2bf99', shade: '#b67e74', hair: '#ddd2af', shirt: '#d35669', style: 'bob', glasses: true };

export const gym = '<rect x="70" y="60" width="460" height="680" rx="16" fill="#b0b3a9" stroke="#453d47" stroke-width="16"/><path d="M122 142H484M122 174H484M122 204H484M122 548H484M230 220v352M375 220v352" stroke="#606c70" stroke-width="8"/><path d="M92 480L467 73H515L140 640H92Z" fill="#c9e4e0" opacity=".22"/><path d="M33 670H565v46H33Z" fill="#59464b"/>';
export const ink = '<g transform="rotate(-11 314 485)"><rect x="101" y="448" width="428" height="73" rx="36" fill="#d3936f"/><path d="M152 510h331" stroke="#9b5e55" stroke-width="6" stroke-linecap="round"/><g transform="translate(628 0) scale(-1 1)">' + label(314, 496, 44, 'MCMLXXIV', '#302530') + '</g></g>';
const bag = '<path d="M415 625q48-58 105 0v54H408z" fill="#252841"/><path d="M441 630q24-34 47 0" fill="none" stroke="#858088" stroke-width="4"/><rect x="426" y="646" width="73" height="29" rx="6" fill="#393954"/><path d="M459 645q13-12 30 3" stroke="#776177" stroke-width="4" fill="none"/>';
const lip = '<path d="M284 342q13-9 19-3 7-8 20-1-15 22-39 4" fill="#af384e"/><path d="M289 344l23-5" stroke="#e5a291" stroke-width="2"/>';
export const cat = '<g transform="translate(0 3)"><ellipse cx="410" cy="452" rx="83" ry="36" fill="#9e7662"/><path d="M468 454q72 12 66-27" fill="none" stroke="#9e7662" stroke-width="17"/><path d="M339 427l1-37 25 19 30-1 20-18 1 38q-5 32-43 33-30-3-34-34Z" fill="#c0936f"/><path d="M365 408l7 16 9-17m-36 33h19m28-1h21m-6 9-11-3" stroke="#674756" stroke-width="4" fill="none"/><path d="M351 427l13 2m26 0 14-3" stroke="#ddeb95" stroke-width="4"/></g>';
const ring = '<ellipse cx="300" cy="365" rx="55" ry="66" fill="none" stroke="#eebd82" stroke-width="15"/><path d="M268 314L253 277 277 244 318 239 349 268 331 311 301 326Z" fill="#dceff1" stroke="#fff4df" stroke-width="5"/><path d="M253 277l96-9-48 58-24-82m41-5-17 87" fill="none" stroke="#8faebd" stroke-width="3"/>';
const cliffs = '<path d="M0 266L116 231 159 172 346 170 395 233 469 232 515 153 702 143 800 231V455H0Z" fill="#a64d50"/><path d="M0 305l143-19 35-62h159l33 63 138 4 21-67 166-32 105 67v180H0Z" fill="#c46750"/><path d="M3 337l307-28 190 28 300-37m-80 68-304 19-217-44L0 384" fill="none" stroke="#ed9768" stroke-width="12" opacity=".8"/>';

export const brody: Portrait = { ...tanner, style: 'crop', hair: '#b77946', shirt: '#af573d' };
export const marcus: Portrait = { ...tanner, style: 'crop', skin: '#925a46', shade: '#5c3d40', shirt: '#685547' };
export const kyle: Portrait = { ...tanner, style: 'curls', hair: '#a18357', shirt: '#527b68' };
export const sienna: Portrait = { ...kenna, hair: '#231b32', skin: '#bc8c73', shade: '#875e60', shirt: '#a55655' };
export const alexis: Portrait = { ...deb, skin: '#b87c62', shade: '#80555e', hair: '#372536', shirt: '#788c6c' };
export const tash: Portrait = { ...riley, style: 'sweep', hair: '#42282d', shirt: '#b55146' };

export const caught4Art: Record<string, string> = {
  cg4_wall_lock: scene('cg4_wall_lock', 600, 800, '#4a7276', '#33293e', gym + person(62, 27, 2.6, tanner) + lip + ink + bag),
  cg4_wall_home: scene('cg4_wall_home', 600, 800, '#472b45', '#162431', `
    <path d="M-199 695L651 137M-125 781l819-535M116 800l569-382" stroke="#ab566a" opacity=".35" stroke-width="36"/>
    <circle cx="300" cy="400" r="132" fill="#201a2a" stroke="#d08b71" stroke-width="14"/><path d="M220 400h160m-120-63v126m80-126v126" stroke="#d08b71" stroke-width="19"/>
    ${label(300, 603, 29, 'IRONHAUS GYM', '#e6af94')}`),
  cg4_map: streetMap('cg4_map', '#476775', '#505954', 'M128 168L368 312H432L624 204 704 396M304 96L368 312 192 468M432 312L528 480 704 396', [[113,140,'LINDEN CT'],[385,289,'IRONHAUS / COREWORKS'],[630,178,'WREN ST'],[174,501,'HOLLOWAY RD']]),
  av_cg4_riley: avatar('av_cg4_riley', '#396b83', riley),
  av_cg4_kenna: avatar('av_cg4_kenna', '#c27480', kenna),
  av_cg4_brody: avatar('av_cg4_brody', '#ae7355', brody),
  av_cg4_marcus: avatar('av_cg4_marcus', '#597b79', marcus),
  av_cg4_kyle: avatar('av_cg4_kyle', '#5e6587', kyle),
  av_cg4_mama: avatar('av_cg4_mama', '#a46168', deb),
  av_cg4_sienna: avatar('av_cg4_sienna', '#8b555f', sienna),
  av_cg4_alexis: avatar('av_cg4_alexis', '#6d4d74', alexis),
  av_cg4_bff: avatar('av_cg4_bff', '#58736d', tash),
  av_cg4_legends: scene('av_cg4_legends',200,200,'#93634b','#3e2b44','<path d="M44 100h112m-97-39v78m82-78v78m-95-61v44m108-44v44" stroke="#ffe1ad" stroke-width="12" stroke-linecap="round"/>'),
  av_cg4_alt: avatar('av_cg4_alt', '#724256', tanner),
  av_cg4_findmy: scene('av_cg4_findmy',200,200,'#42676c','#132b37','<g fill="none" stroke="#aad4ac" stroke-width="4"><circle cx="100" cy="100" r="69"/><circle cx="100" cy="100" r="45"/><circle cx="100" cy="100" r="20"/></g><circle cx="126" cy="75" r="9" fill="#d5f4c3"/>'),
  cg4_ph_mirror: scene('cg4_ph_mirror',600,800,'#56747a','#332b3e',gym + person(62,27,2.6,tanner) + lip + ink + bag),
  cg4_ph_us_brunch: scene('cg4_ph_us_brunch',600,800,'#cb7c61','#402b45',`
    <rect x="2" y="328" width="596" height="274" rx="48" fill="#8d3846"/>${person(-48,105,2.1,riley)}${person(254,83,1.94,tanner)}
    <path d="M117 495q-16-40 6-63l8-52 12 6 3 48 17-61 12 4-4 62 21-55 12 9-16 56 17-36 10 9-16 63-25 28z" fill="#bc8c73"/>
    <path d="M0 585Q300 541 600 585V800H0Z" fill="#9b6557"/><ellipse cx="300" cy="668" rx="163" ry="52" fill="#ead1bb"/>
    <path d="M192 643q-20-22 1-42-19-36 36-44h144q44 14 35 43 32 24 4 46-100 46-220-3Z" fill="#b56f45" stroke="#603532" stroke-width="5"/>
    <ellipse cx="299" cy="575" rx="103" ry="28" fill="#e9ac6e"/><path d="M247 577q49-36 103 0l29 22q-14 19-42 8l-26-22z" fill="#703c34"/><path d="M280 569l24-15 29 12-22 16z" fill="#f6d281"/>`),
  cg4_ph_sedona: scene('cg4_ph_sedona',800,600,'#f7b27c','#733a58',`
    <circle cx="466" cy="154" r="88" fill="#ffde9c"/>${cliffs}
    <path d="M0 391H800M0 451H800M45 395v205m670-205v205" stroke="#3c2a3c" stroke-width="15"/>
    <path d="M93 378h91l51 103-33 18-27-43v104H91V453l-29 50-32-16zM270 383h88l50 100-29 18-30-46v106h-81V451l-28 49-31-16z" fill="#f3e3d3"/>
    <path d="M90 464h86m91 2h84" stroke="#b7958d" stroke-width="8"/>
    <path d="M618 340q-72 97 17 161 88-64 6-165" fill="none" stroke="#e78370" stroke-width="6"/>
    <rect x="550" y="467" width="175" height="80" rx="5" fill="#fae4be"/>${label(638,493,17,'NFTA SUMMIT','#563e4d')}${label(638,517,17,'SCOTTSDALE · T. BOYCE','#563e4d')}
    <path d="M443 344h42l-8 35-11 6v26h16m22-67h42l-8 35-10 6v26h15" fill="none" stroke="#ffe0bf" stroke-width="4"/>`),
  cg4_ph_sheets: scene('cg4_ph_sheets',600,800,'#655465','#302339',`
    <rect x="32" y="228" width="514" height="363" rx="57" fill="#bcb6b9"/><path d="M54 407q126-105 238 8t244-17v253H54Z" fill="#e9dcd4"/>
    <path d="M58 485q111-76 213 42t263-18M92 571q124-37 221 35" fill="none" stroke="#a795a3" stroke-width="13"/>${cat}
    <path d="M61 466l162 24 41 134-53 25-33-55-9 128H52l17-126-37 30-29-44z" fill="#4b515b"/>
    <ellipse cx="355" cy="703" rx="98" ry="31" fill="none" stroke="#986c86" stroke-width="19"/><rect x="512" y="486" width="57" height="87" rx="8" fill="#282634"/>${label(540,533,13,'PRE')}`),
  cg4_ph_mama_ring: scene('cg4_ph_mama_ring',600,800,'#ad755c','#332439',`
    <path d="M20 528L577 459V800H20Z" fill="#846e72"/><path d="M0 555q125-145 231-79l34 103L0 690Z" fill="#c9626b"/>
    <rect x="165" y="204" width="279" height="308" rx="38" fill="#2f2037" stroke="#846373" stroke-width="11"/><path d="M164 413h280l-28 150H190Z" fill="#48304a"/>${ring}
    <rect x="134" y="579" width="339" height="113" rx="5" fill="#e9d0ac"/>${label(302,629,31,'HALDEN & CO.','#594452')}${label(302,661,22,'SIZE 5 · ENGRAVING PENDING','#594452')}`),
  cg4_ph_lot: scene('cg4_ph_lot',800,600,'#6b586c','#211e34',`
    <path d="M54 145h695v282H54z" fill="#382c3e"/><rect x="142" y="210" width="505" height="162" fill="#e3a17b"/>${label(396,195,39,'COREWORKS PILATES')}
    <path d="M141 352h505m-469-39 77 34m42-34 77 34m43-34 77 34" stroke="#875663" stroke-width="9"/>
    ${person(446,220,.65,kenna)}<path d="M540 330l46-66-1-22" fill="none" stroke="#e4b099" stroke-width="11" stroke-linecap="round"/>
    <path d="M0 0l117 600H0zm800 0L693 600h107zM0 475q353-83 800 0v125H0Z" fill="#211c29"/>`),
  cg4_ph_couch: scene('cg4_ph_couch',800,600,'#755465','#292034',`
    <path d="M62 278q0-70 72-70h500q72 0 72 70v164H62Z" fill="#95576a"/><path d="M78 347h611v55H78z" fill="#ba777b"/>
    <path d="M108 287q74-43 203 43l-35 146-176-38Z" fill="#db946b"/><path d="M115 307l176 59m-181-28 174 65m-174-31 160 69" stroke="#edb599" stroke-width="9"/>
    <ellipse cx="474" cy="487" rx="225" ry="67" fill="#543747"/><path d="M408 400h64l-7 39-20 12v36h21m56-87h64l-7 39-20 12v36h21" fill="none" stroke="#efd4c1" stroke-width="6"/>
    <path d="M459 402l16-4" stroke="#e4778d" stroke-width="11"/><rect x="517" y="118" width="113" height="55" rx="3" fill="#332534" stroke="#986b65" stroke-width="6"/><path d="M657 540l53-14 13 23-49 29z" fill="#d28c9b"/>`),
  cg4_ph_bed: scene('cg4_ph_bed',600,800,'#997385','#342239',`
    <rect x="39" y="167" width="518" height="469" rx="57" fill="#5b3b54"/><rect x="69" y="219" width="459" height="355" rx="54" fill="#e5cace"/>
    ${person(39,199,1.56,{ ...tanner, shirt: tanner.skin })}${person(235,188,1.55,{ ...kenna, shirt: kenna.skin })}
    <path d="M37 515Q149 415 304 488Q417 519 563 452V800H37Z" fill="#eae2da"/><path d="M47 573q101-93 248-24t261-26" fill="none" stroke="#b9a6b1" stroke-width="15"/>
    <path d="M468 172q-36 68 14 101 66-52 12-103" fill="none" stroke="#e28481" stroke-width="7"/>`),
  cg4_ph_video: scene('cg4_ph_video',800,600,'#594354','#201929',`
    <rect x="200" y="80" width="394" height="346" fill="#aa8176"/><path d="M397 80v350M200 254h394" stroke="#564356" stroke-width="11"/>
    <path d="M235 460q-10-105 65-130-5-69 46-62 55 8 40 70 83 16 93 122m-77 0q6-95 66-123-13-65 36-71 55-2 48 67 62 35 60 127z" fill="#38283a"/>
    <path d="M39 514q135-99 345-42t382-13v141H39Z" fill="#8c6472"/><ellipse cx="668" cy="474" rx="43" ry="68" fill="none" stroke="#d69a95" stroke-width="9"/>`),
  cg4_ph_locker: scene('cg4_ph_locker',600,800,'#5e7474','#252339',`
    <path d="M109 58h392v675H109z" fill="#34434c" stroke="#9ba8a1" stroke-width="14"/><path d="M112 64l-72 62v539l72 65" fill="#6b8181"/>
    <rect x="206" y="141" width="243" height="238" fill="#e9ccab"/>${label(326,184,26,'TIMELINE','#553d51')}
    <path d="M230 219h190m-190 36h190m-190 36h190m-190 36h190m-145-108v108" stroke="#8e7777" stroke-width="4"/>
    <path d="M215 540q75-121 163 0v89H215z" fill="#492941" stroke="#876270" stroke-width="7"/><ellipse cx="145" cy="429" rx="31" ry="53" fill="none" stroke="#d47d96" stroke-width="9"/>`),
  cg4_ph_mirror_lips: scene('cg4_ph_mirror_lips',600,800,'#ba888c','#4a3954',`
    <rect x="76" y="76" width="448" height="634" rx="24" fill="#aaa4ae" stroke="#e7c0a8" stroke-width="17"/>
    <path d="M89 491L495 115h24L90 599z" fill="#e1d5c7" opacity=".32"/>
    ${label(299,356,44,'GOOD FORM','#aa3857')}${label(299,411,39,'COACH','#aa3857')}${lip.replace('<path','<path transform="translate(96 -35)"')}`),
};
