import { avatar, label, person, scene, streetMap, type Portrait } from './caughtScenes';

export const sofia: Portrait = { skin: '#c98e70', shade: '#88545d', hair: '#302032', shirt: '#bc957e', style: 'sweep' };
export const daniel: Portrait = { skin: '#ad755e', shade: '#704751', hair: '#251f2e', shirt: '#556a77', style: 'curls' };
export const iris: Portrait = { skin: '#f1b99b', shade: '#ad746c', hair: '#9b5b47', shirt: '#5f8278', style: 'bob', glasses: true };
export const cal: Portrait = { skin: '#dcaa85', shade: '#a16c5d', hair: '#654841', shirt: '#514658', style: 'crop' };
export const neve: Portrait = { skin: '#a16d57', shade: '#6d444e', hair: '#392536', shirt: '#b15362', style: 'tail' };

function flowers(x: number, y: number, scale: number): string {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M100 180Q76 92 28 55M98 172q25-90 59-134M100 168 86 31m13 146 44-71M91 148 45 112" fill="none" stroke="#688777" stroke-width="5"/>
    <path d="M79 133q-32 9-48-25 33-7 48 25zm30 4q26-38 60-27-18 37-60 27z" fill="#769e80"/>
    <g fill="#cea39d"><circle cx="29" cy="56" r="22"/><circle cx="158" cy="39" r="23"/><circle cx="84" cy="33" r="27"/><circle cx="145" cy="101" r="18"/></g>
    <g fill="#eec9b3"><circle cx="22" cy="54" r="12"/><circle cx="151" cy="37" r="13"/><circle cx="79" cy="30" r="15"/><circle cx="141" cy="95" r="10"/></g>
    <path d="M70 143h57l19 62q-45 34-91 0z" fill="#486674"/><path d="M77 153h8l-11 52" fill="none" stroke="#94ada4" stroke-width="6"/>
  </g>`;
}

const siteStop = (x: number, y: number, name: string, gate: string): string => `
  <rect x="${x - 108}" y="${y - 42}" width="216" height="84" rx="8" fill="#ded8b6" stroke="#a68c73" stroke-width="5"/>
  ${label(x, y - 10, 23, name, '#314653')}${label(x, y + 28, 32, gate, '#794747')}`;

const glasses = '<path d="M0 0h45l-5 34-17 13v31H9m54-78h45l-5 34-17 13v31H72" fill="none" stroke="#f4d1b1" stroke-width="4"/><path d="M3 22h39m24 0h39" stroke="#dc9e70" stroke-width="8"/>';

export const caught6Art: Record<string, string> = {
  cg6_cover: scene('cg6_cover',600,800,'#906a72','#202b3f',`
    <path d="M64 777V320a236 236 0 0 1 472 0v457" fill="none" stroke="#ebc193" stroke-width="12" opacity=".66"/><circle cx="300" cy="274" r="196" fill="#e9b592" opacity=".18"/>
    ${person(-58,-14,3.52,sofia)}${flowers(355,473,1.14)}
    <path d="M42 666q172 46 376 31" fill="none" stroke="#dfb8a6" stroke-width="7"/><rect x="137" y="672" width="310" height="63" rx="4" fill="#e3c6b0" transform="rotate(4 292 703)"/>${label(292,712,23,'FAMILY OF THE GROOM','#614552')}`),
  cg6_wall_lock: scene('cg6_wall_lock',600,800,'#647b77','#263c51',`
    <rect x="43" y="61" width="514" height="675" rx="15" fill="#314a53" stroke="#b7ae8d" stroke-width="7"/>
    ${label(300,127,37,'FOUNDRY HALL')}${label(300,167,21,'SERVICE GATES · SUPPLIER SITE PLAN','#d3c3a4')}
    <path d="M95 221h410v380H95zM300 221v380m-205-185h410" fill="none" stroke="#b6a789" stroke-width="5" stroke-dasharray="13 9"/>
    <path d="M129 284h54m235 244h71M174 667h252" stroke="#8ab0a0" stroke-width="8" stroke-linecap="round"/>
    ${siteStop(373,279,'TERRACE','61')}${siteStop(207,408,'KITCHENS','94')}${siteStop(369,546,'GREENHOUSE','27')}
    ${label(300,704,20,'WEST GATE 83 · BAND ACCESS','#cfba97')}`),
  cg6_wall_home: scene('cg6_wall_home',600,800,'#6c776b','#263244',`
    <circle cx="303" cy="418" r="204" fill="#d4a68a" opacity=".24"/><path d="M90 698V360a210 210 0 0 1 420 0v338" fill="none" stroke="#d5af8f" stroke-width="8"/>
    ${flowers(103,235,2)}`),
  cg6_map: streetMap('cg6_map','#527886','#576e61','M168 330L384 420 520 276 640 138M168 330l122-164 230 110 172 90M384 420l219 84',[[165,308,'HOME'],[382,459,'MERIDIAN'],[640,114,'LAKE BRIAR'],[522,248,'FOUNDRY HALL']]),
  av_cg6_dan: avatar('av_cg6_dan','#5a6a80',daniel),
  av_cg6_iris: avatar('av_cg6_iris','#927167',iris),
  av_cg6_cal: avatar('av_cg6_cal','#6c6279',cal),
  av_cg6_neve: avatar('av_cg6_neve','#a66065',neve),
  av_cg6_party: scene('av_cg6_party',200,200,'#b17b7f','#53425d',`<g transform="translate(33 63) rotate(-9 54 40)">${glasses}</g><path d="M99 38v15m-10-8h21m30 12 11-12" stroke="#ffdcab" stroke-width="4"/>`),
  cg6_ph_lake: scene('cg6_ph_lake',800,600,'#c5847c','#293d50',`
    <circle cx="501" cy="201" r="89" fill="#ffd39c"/><path d="M0 259q118-57 257-29 111-39 269 0 158-63 274 28v126H0Z" fill="#405d5b"/>
    <path d="M0 308q216-68 433-15 197 36 367-1v197H0z" fill="#677f87"/><path d="M402 351h185m-224 41h224m-118 41h112" stroke="#f0b48e" stroke-width="10" opacity=".7"/>
    <path d="M0 139q72-33 136 38 99-31 139 53l-78 24-110-21L0 257Z" fill="#3f6152"/>
    <path d="M0 467l800 8v125H0z" fill="#795a60"/><path d="M0 398h800m-692 3v91m245-91v98m245-98v105" stroke="#443347" stroke-width="12"/>
    <path d="M641 472h109v89H630z" fill="#ae4f60"/><rect x="622" y="468" width="135" height="18" fill="#e0baa7"/>
    <path d="M161 483l25-119m32 99 36-118" stroke="#d2a881" stroke-width="5"/><path d="M186 364l-17-22m17 22 7-26m-7 26 27-14m41-5-16-26m16 26 14-28m-14 28 25-2" stroke="#ffe0a0" stroke-width="7"/>`),
  cg6_ph_match: scene('cg6_ph_match',600,800,'#b18c7d','#403549',`
    <path d="M0 327q302-67 600 0v473H0Z" fill="#a37369"/><ellipse cx="420" cy="247" rx="107" ry="47" fill="#533d4b"/><ellipse cx="188" cy="204" rx="89" ry="37" fill="#523d4b"/>
    <path d="M349 173h136v85q-73 47-136 0zm-218-27h111v70q-55 38-111 0z" fill="#e6d1b9"/><ellipse cx="415" cy="175" rx="61" ry="17" fill="#573d44"/><ellipse cx="186" cy="148" rx="48" ry="15" fill="#684647"/>
    <g transform="rotate(12 300 527)"><rect x="136" y="370" width="334" height="251" rx="10" fill="#e8cdb6"/>${label(300,438,34,'MERIDIAN HOTEL','#604653')}${label(300,543,85,'608','#715261')}</g>
    <path d="M109 666l191-46 8 13-191 49z" fill="#dfb27e"/><rect x="300" y="531" width="179" height="114" rx="5" fill="#6a3d58" transform="rotate(-8 390 587)"/>${label(389,598,21,'THE MERIDIAN')}`),
  cg6_ph_suit: scene('cg6_ph_suit',600,800,'#a37976','#34283c',`
    <rect x="325" y="81" width="239" height="611" fill="#654653" stroke="#ad8380" stroke-width="10"/>
    <path d="M451 165l-77 89-4 326 143 12V252Z" fill="#2a2738" stroke="#796374" stroke-width="7"/><path d="M449 192v364" stroke="#776174" stroke-width="5"/>
    <rect x="407" y="290" width="101" height="48" rx="3" fill="#dbc7ab"/>${label(458,320,15,'BEST MAN','#46384b')}
    ${person(-33,116,2.35,{ ...cal, shirt: '#dbcaac' })}
    <path d="M0 615q324-66 600 0v185H0Z" fill="#4c394a"/><g transform="translate(310 592)">${glasses}</g>
    <path d="M74 717l149-78 66 29-97 88Z" fill="#8b575e"/><rect x="149" y="673" width="89" height="54" rx="6" fill="#e4c8aa" transform="rotate(-12 194 700)"/>${label(193,707,17,'608','#674c57')}`),
  cg6_ph_cake: scene('cg6_ph_cake',800,600,'#b98e7d','#53384f',`
    <path d="M0 110l800 389m0-385L0 499" stroke="#dbaf96" stroke-width="8" stroke-dasharray="21 28"/>
    <ellipse cx="401" cy="382" rx="308" ry="155" fill="#e7c2ae"/><rect x="134" y="221" width="531" height="272" rx="80" fill="#b16476"/><rect x="134" y="188" width="531" height="265" rx="80" fill="#f4d5b3" stroke="#cb8491" stroke-width="13"/>
    <path d="M264 294q56-28 167-19 39-8 58 9 23 22-3 41-18 11-56 0-97 17-165-7-27 37-56 12-22-24 0-51 28-25 55 15z" fill="#d88e95"/>
    ${label(401,246,29,'GOOD LUCK WITH','#9d4665')}${label(401,397,37,'THE MEDIATOR','#9d4665')}`),
  cg6_ph_chart: scene('cg6_ph_chart',800,600,'#a78477','#513a50',`
    <g transform="rotate(-6 400 300)"><rect x="114" y="79" width="575" height="445" rx="5" fill="#e7cfb5"/>
    ${label(400,140,36,'FIRST TABLE','#524855')}<ellipse cx="398" cy="310" rx="170" ry="73" fill="none" stroke="#9f7c79" stroke-width="6"/>
    <path d="M342 227v-60m107 57v-58m-104 221v55m101-55v55m-230-147h-64m424 0h67" stroke="#9f7c79" stroke-width="5"/>
    ${label(447,474,26,'CAL · BEST MAN','#6b4c5b')}<path d="M344 455l208 19m-198 6 183-30" stroke="#b8526c" stroke-width="6"/>
    ${label(400,505,19,'ask about postponing, not table move','#8c4a66')}</g>`),
};
