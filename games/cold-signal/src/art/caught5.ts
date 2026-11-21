import { avatar, label, person, scene, streetMap, type Portrait } from './caughtScenes';

export const mara: Portrait = { skin: '#bb8268', shade: '#784d56', hair: '#241d31', shirt: '#497785', style: 'bob' };
export const ellis: Portrait = { skin: '#deab87', shade: '#976359', hair: '#483037', shirt: '#696d82', style: 'sweep', glasses: true };
export const theo: Portrait = { skin: '#995d4a', shade: '#5a3744', hair: '#2a1e34', shirt: '#625679', style: 'crop' };
export const nico: Portrait = { skin: '#ebbb99', shade: '#a76865', hair: '#995541', shirt: '#b37263', style: 'curls' };
export const bea: Portrait = { ...mara, hair: '#47303c', shirt: '#a24f69', style: 'curls' };
export const lena: Portrait = { skin: '#db9c74', shade: '#945560', hair: '#ac6e46', shirt: '#814b72', style: 'tail' };

const radio = '<path d="M32 211h536l-30 400H63z" fill="#282637" stroke="#706275" stroke-width="12"/><path d="M84 264h431m-429 67h422m-408 62h404" stroke="#4c4159" stroke-width="7"/>';
const controls = '<path d="M140 407v100m80-100v100m160-100v100m80-100v100" stroke="#726278" stroke-width="10"/><path d="M124 469h32m48-47h32m128 48h32m48 20h32" stroke="#d0b7a1" stroke-width="21"/><circle cx="300" cy="458" r="31" fill="#9f2545" stroke="#f69582" stroke-width="6"/><circle cx="290" cy="449" r="8" fill="#ffd6a4" opacity=".54"/>';
const motel = '<path d="M0 192l212-91 239 101 349 5v232H0z" fill="#3e2943"/><path d="M0 214l211-67 239 73 350 10v29l-352-9-236-55L0 253Z" fill="#8b465a"/><rect x="88" y="290" width="124" height="97" fill="#ed9d75"/><rect x="267" y="271" width="70" height="169" fill="#682d48"/><rect x="589" y="265" width="70" height="175" fill="#572840"/>';
const keyShape = '<path d="M196 277a52 52 0 1 0 4 69l171 40 15-38-33-8-6 17-21-5 5-16-128-31Z" fill="#b07846" stroke="#e6b97d" stroke-width="5"/><circle cx="163" cy="319" r="16" fill="#59414b"/><ellipse cx="290" cy="320" rx="92" ry="46" transform="rotate(12 290 320)" fill="none" stroke="#d3ad82" stroke-width="9"/>';

export const caught5Art: Record<string, string> = {
  cg5_cover: scene('cg5_cover',600,800,'#9b4e61','#191d35',`
    <circle cx="301" cy="298" r="231" fill="#df8067" opacity=".23"/><path d="M24 624V102H565V624" fill="none" stroke="#e37868" stroke-width="10" opacity=".55"/>
    ${person(-62,-16,3.58,mara)}<path d="M52 534q86-108 149 4v109H52z" fill="#242030" stroke="#ac7380" stroke-width="10"/>
    <path d="M72 564h109m-109 32h109m-49 47v76" stroke="#a87985" stroke-width="7"/><path d="M312 696h238" stroke="#f5a76e" stroke-width="6"/>
    ${label(425,738,25,'WMAR · OVERNIGHTS','#e6b39e')}`),
  cg5_wall_lock: scene('cg5_wall_lock',600,800,'#735b70','#242436',`
    ${radio}${controls}${label(300,407,36,'MUTE','#ffceaa')}
    ${label(300,578,21,'PHONE WORDS · VANITY NUMBER GUIDE','#f0c69c')}
    <rect x="44" y="600" width="512" height="100" rx="7" fill="#e9c397" transform="rotate(-2 300 650)"/>
    ${['2 ABC','3 DEF','4 GHI','5 JKL','6 MNO','7 PQRS','8 TUV','9 WXYZ'].map((s,i) => label(111+i%4*124,638+Math.floor(i/4)*39,23,s,'#473746')).join('')}
    <path d="M79 222h429" stroke="#da8a71" stroke-width="8"/>${label(300,183,31,'WMAR / STUDIO B')}`),
  cg5_wall_home: scene('cg5_wall_home',600,800,'#64394f','#182437',`
    <circle cx="300" cy="417" r="236" fill="#232033" stroke="#de8071" stroke-width="10"/><g fill="none" stroke="#a45065" stroke-width="5"><circle cx="300" cy="417" r="207"/><circle cx="300" cy="417" r="184"/><circle cx="300" cy="417" r="157"/><circle cx="300" cy="417" r="132"/></g>
    <circle cx="300" cy="417" r="80" fill="#d58273"/><circle cx="300" cy="417" r="7" fill="#503444"/>${label(300,453,20,'WMAR','#442d3c')}`),
  cg5_map: streetMap('cg5_map','#5e657b','#5f4a57','M192 210L368 372 608 210M192 210l24 258 152-96 201 162M368 372V222L608 210',[[188,183,'BELL HOUSE'],[377,345,'WMAR'],[601,187,'SWITCHBACK'],[217,498,'TWELFTH FRAME']]),
  av_cg5_ellis: avatar('av_cg5_ellis','#525b7c',ellis),
  av_cg5_theo: avatar('av_cg5_theo','#845579',theo),
  av_cg5_nico: avatar('av_cg5_nico','#866d77',nico),
  av_cg5_bea: avatar('av_cg5_bea','#815466',bea),
  av_cg5_lena: avatar('av_cg5_lena','#ae6770',lena),
  cg5_ph_key: scene('cg5_ph_key',800,600,'#ab7466','#3d3147',`
    <path d="M0 177h800v41H0zM0 498h800" stroke="#d39371" stroke-width="8"/><path d="M482 237h112v125q-54 50-112 0z" fill="#dca28a"/><path d="M592 259q67-14 50 38-8 20-48 21" fill="none" stroke="#dca28a" stroke-width="11"/>
    ${keyShape}<rect x="297" y="357" width="271" height="101" rx="22" fill="#dfb778" stroke="#764c4a" stroke-width="5" transform="rotate(13 432 403)"/>
    <g transform="rotate(13 432 403)">${label(432,398,24,'SWITCHBACK','#5d383f')}${label(432,435,30,'04','#5d383f')}</g>`),
  cg5_ph_screen: scene('cg5_ph_screen',600,800,'#80616d','#292236',`
    <g transform="rotate(8 300 400)"><rect x="108" y="81" width="384" height="646" rx="49" fill="#15192a" stroke="#a08889" stroke-width="9"/>
    <rect x="125" y="102" width="350" height="603" rx="35" fill="#485468"/><path d="M125 549q124-92 350-107v225l-32 38H154l-29-38z" fill="#3c3049"/>
    ${label(300,230,66,'23:42')}${label(300,271,27,'Friday, November 6')}
    <rect x="144" y="319" width="313" height="115" rx="21" fill="#ded2ca"/>${label(300,355,23,'LENA PRICE','#4d3c4d')}${label(300,386,20,'11 again next Friday?','#45364b')}${label(300,413,17,'I left my scarf at the desk.','#45364b')}</g>
    <path d="M88 686L480 132h30L100 719z" fill="#f3c6a5" opacity=".13"/>`),
  cg5_ph_car: scene('cg5_ph_car',800,600,'#68526e','#242338',`
    ${motel}${label(624,301,25,'11','#ffb797')}
    <path d="M392 411l36-55h112l53 53 45 8 17 41H359l8-34z" fill="#8a7987" stroke="#30273c" stroke-width="7"/><path d="M434 366h90l45 38H412z" fill="#302b44"/>
    <circle cx="418" cy="462" r="24" fill="#252030"/><circle cx="602" cy="462" r="24" fill="#252030"/><path d="M365 434h34m224 0h22" stroke="#f29c88" stroke-width="8"/>
    <path d="M55 65h35l-60 291m120-307 32 8-87 466m170-467-50 402m474-289-44 378m78-504-28 180m54 24-25 272" stroke="#e0d9cc" opacity=".26" stroke-width="7"/>
    ${label(194,282,105,'04','#f07c93')}`),
  cg5_ph_booth: scene('cg5_ph_booth',800,600,'#9c7268','#262339',`
    <rect x="406" y="90" width="304" height="200" rx="12" fill="#292638" stroke="#a27e80" stroke-width="12"/>
    <path d="M438 255V128h247v127z" fill="#657776"/><path d="M463 168h196m-196 25h181m-165 24h136" stroke="#abd0ba" stroke-width="6"/>
    ${person(63,122,2,nico)}<path d="M0 472h800l-80 128H62Z" fill="#3a3147"/><path d="M92 514h524m-483 26h551m-484 29h525" stroke="#7f6577" stroke-width="12"/>
    ${label(122,115,39,'14:10')}`),
  cg5_ph_mug: scene('cg5_ph_mug',800,600,'#b48f76','#4a374d',`
    <path d="M0 419q341-99 800 16v165H0z" fill="#9c685e"/><ellipse cx="389" cy="462" rx="207" ry="39" fill="#5e4049" opacity=".65"/>
    <path d="M532 246q124-30 113 73-6 67-109 60" fill="none" stroke="#d9b7a1" stroke-width="31"/>
    <path d="M233 200H567l-23 208q-143 96-282-2Z" fill="#eee1cc"/><ellipse cx="399" cy="201" rx="167" ry="47" fill="#c69c85"/>
    <ellipse cx="399" cy="207" rx="138" ry="30" fill="#644148"/><path d="M265 174l24 13-9 27-27-4" fill="#b38e75"/>
    ${label(402,322,35,'THE BELLS','#7a555a')}${label(402,362,27,'EST. 2015','#7a555a')}`),
};
