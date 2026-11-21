import type { CaseFile } from '../types';

// CAUGHT C1 — ZERO THREAT
// Client: Trent Lyle, 34, owner of Swole Juice. Subject: girlfriend Jessa Moreno, 31,
// dental hygienist. Jessa IS cheating — with Jules Fontaine, 32, her "gay best friend".
// Jules is not gay: Trent asked him "you're gay, right? lol" at their first barbecue,
// Jules said "...so gay, bro" to avoid a fight, and he has kept it up for fourteen
// months because it lets him hang out with Jessa. Jules is an Engine 9 firefighter
// (Mr. March in the charity calendar). His "boyfriend Marco" is his French bulldog.
// Where: Jules's loft, Calloway Lofts 4B, every Wednesday 19:00–23:00.
// Alibi: "Paint & Sip" at Brushstrokes — paid for by Trent, booked 8, attended 0.
// She drives past the studio, parks at the lofts, and comes home with a lighthouse
// painting that Jules painted for her the day before.
// Red herring: Dr. Feld's "Need you tonight. Bring the good gloves. Don't tell my wife."
// (an after-hours emergency root canal on a hockey player).
// Passcode 2375: the price of her usual at the Velvet Fern (Filthy Martini $14.50 +
// Truffle Fries $9.25 = $23.75), read off the chalkboard on the lock wallpaper.

const ROXY = { name: 'Roxy Vance', role: 'Vance Discreet Investigations', avatar: 'av_roxy' };

export const caught1: CaseFile = {
  id: 'caught-1',
  number: 'C1',
  mode: 'caught',
  handler: ROXY,
  title: 'Zero Threat',
  tagline: "Her best friend is 'totally gay, bro.' Her boyfriend said so four times. We're going to need a fifth opinion.",
  difficulty: 1,
  cover: 'cg1_cover',
  owner: { name: 'Jessa Moreno', age: 31, summary: 'Dental hygienist at Bright Smile Dental. Two years with Trent, eight months living together. Flosses daily. Lies weekly, allegedly.' },
  status: 'SUSPECTED CHEATER',
  deviceCondition: 'LEFT IN A CAR-WASH CUPHOLDER · SMELLS LIKE COCONUT AIR FRESHENER · 100% READABLE, UNFORTUNATELY',
  briefing: [
    "INTAKE — Vance Discreet Investigations. Client: Trent Lyle, 34. Owns SWOLE JUICE (smoothies, vapes and 'energy crystals'). Arrived forty minutes early in a tank top. In November. Paid the retainer in cash, mostly ones, some of them damp.",
    "Subject: Jessa Moreno, 31, his girlfriend. Dental hygienist. Living together eight months. Client describes her as 'way out of my league, which I say with love, and also suspicion.'",
    "Client's grounds: since September she does 'Paint & Sip' every Wednesday, comes home at eleven 'glowing', carrying a painting of a lighthouse. Seven lighthouses so far. Client: 'Nobody is that into lighthouses.' For the first time in his life, the client may be onto something.",
    "Client on her best friend, Jules: 'Totally gay, bro. Zero threat. He's got a boyfriend, Marco. I've never met Marco. Marco travels.' Client said 'zero threat' four times. I wrote it down four times. Client asked if I wanted to see his abs 'for the file'. I declined for the file.",
    "The phone: she left it in his car at the car wash. He 'borrowed' it. Passcode, per client: 'It's the price of her usual at the Velvet Fern. No dollar sign, no dot. She calls it \"the price of happiness\". I said I'M the price of happiness. She laughed for a really long time.'",
  ],
  phoneDate: '2026-11-20',
  phoneTime: '14:05',
  lock: {
    passcode: '2375',
    hint: 'the price of her usual at the Velvet Fern: add the chalkboard prices of her usual order, drop the $ and the dot',
    wallpaper: 'cg1_wall_lock',
    notifications: [
      { app: 'mail', title: 'Velvet Fern Rewards', text: "Welcome back, Jessa! Your usual — 1× Filthy Martini, 1× Truffle Fries — is saved for one-tap ordering 🍸", t: '2026-11-14T20:42' },
      { app: 'messages', title: 'Jules 🌈 (bestie)', text: 'wednesday 🎨 still on? marco misses u 🐶', t: '2026-11-19T22:41' },
      { app: 'messages', title: 'Kayla (work wife)', text: 'girl. we need to talk about the roses.', t: '2026-11-19T09:15' },
      { app: 'phone', title: 'Missed call', text: 'Dr. Feld (work) (2)', t: '2026-11-17T20:31' },
      { app: 'messages', title: 'Trent 💪', text: "babe ur phone is in my car. i am NOT looking at it. i am looking at it. what's the code again lol", t: '2026-11-20T10:12' },
    ],
  },
  homeWallpaper: 'cg1_wall_home',

  contacts: [
    { id: 'trent', name: 'Trent 💪', avatar: 'av_cg1_trent', number: '(555) 212-0034', label: 'boyfriend' },
    { id: 'jules', name: 'Jules 🌈 (bestie)', avatar: 'av_cg1_jules', number: '(555) 212-0909' },
    { id: 'kayla', name: 'Kayla (work wife)', avatar: 'av_cg1_kayla', number: '(555) 212-4410', label: 'Bright Smile Dental' },
    { id: 'feld', name: 'Dr. Feld (work)', avatar: 'av_cg1_feld', number: '(555) 212-7000', label: 'Bright Smile Dental' },
    { id: 'mami', name: 'Mami ❤️', avatar: 'av_cg1_mami', number: '(555) 212-1957', label: 'Mom' },
  ],

  threads: [
    {
      id: 'th_jules', contact: 'jules', messages: [
        { from: 'them', text: "wednesday 🎨 still on? i'll paint the lighthouse, you just show up and look artistic", t: '2026-11-04T17:30' },
        { from: 'me', text: "u are a gift. trent says hi btw. he wants to know if marco is 'into lifting'", t: '2026-11-04T17:31' },
        { from: 'them', text: 'marco is into chicken and lying on his back with his legs in the air. tell trent marco says hi 🐶', t: '2026-11-04T17:33' },
        { from: 'them', text: "trent asked me AGAIN at the gym if i'm 'still gay'. i said 'so gay, bro'. then he asked me to rate his abs. i said 6. he cried a little. i've been gay for fourteen months for you, jess, and the hardest part is lying to a man that sincere", t: '2026-11-11T22:58', clue: 'not_gay', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'u are not gay. u are a liar with incredible forearms 😘', t: '2026-11-11T23:01', clue: 'not_gay', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'a liar with a fire helmet. which you like. which you said. out loud. twice. in front of marco', t: '2026-11-11T23:03', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "u left ur earring here. marco tried to eat it. i had to perform surgery", t: '2026-11-12T08:10' },
        { from: 'them', text: "u left ur earring AND ur dignity 🔥 same time next wednesday. i'll paint the lighthouse tomorrow so it's dry by then", t: '2026-11-18T22:50', clue: 'ghost_painter', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "make it a sunset this time. trent says the last one looked 'lonely'. he's not wrong. he's just never been right before", t: '2026-11-18T22:52', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'delete these. he reads your phone in the shower. the man brings your phone INTO the shower', t: '2026-11-18T22:55', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "home. trent asked how class was. i said 'deep'. he said 'like the ocean?' i said yes. he hung the lighthouse in the bathroom", t: '2026-11-18T23:12' },
        { from: 'them', text: 'wednesday 🎨 still on? marco misses u 🐶', t: '2026-11-19T22:41' },
      ],
    },
    {
      id: 'th_trent', contact: 'trent', messages: [
        { from: 'them', text: 'how was paint n sip babe 🎨 u were gone 4 hours. is art that long', t: '2026-11-04T23:10' },
        { from: 'me', text: "it's a process trent", t: '2026-11-04T23:12' },
        { from: 'them', text: "ur lighthouse is fire. like a real lighthouse. hanging it next to the other 5", t: '2026-11-04T23:13' },
        { from: 'me', text: 'jules is coming to the bbq saturday. be normal', t: '2026-11-12T12:40' },
        { from: 'them', text: "jules is the GOAT. zero threat. i asked him if he's still gay and he said 'so gay bro'. so we're good 👍", t: '2026-11-12T12:42' },
        { from: 'them', text: 'also he rated my abs a 6. i think he was being modest on my behalf', t: '2026-11-12T12:43' },
        { from: 'them', text: 'sent u $240 for the paint classes babe 🎨 invest in ur passion 👑', t: '2026-11-14T09:00', clue: 'trent_pays' },
        { from: 'me', text: 'trent you already paid for the classes. in september', t: '2026-11-14T09:05' },
        { from: 'them', text: "then buy more lighthouses. i'm a provider", t: '2026-11-14T09:06', clue: 'trent_pays' },
        { from: 'them', text: "did u leave ur phone in my car. i won't look. i'm a changed man", t: '2026-11-19T18:20' },
        { from: 'them', text: "babe ur phone is in my car. i am NOT looking at it. i am looking at it. what's the code again lol", t: '2026-11-20T10:12' },
      ],
    },
    {
      id: 'th_kayla', contact: 'kayla', messages: [
        { from: 'them', text: "girl. a firefighter in UNIFORM brought two dozen red roses to the front desk yesterday and signed the card 'J'. Dr. Feld thought they were for him. he's been humming all morning.", t: '2026-11-18T09:10', photo: 'cg1_ph_roses', clue: 'roses' },
        { from: 'me', text: "it's a joke thing. he's my gay best friend", t: '2026-11-18T09:14' },
        { from: 'them', text: "jess. I have been to a lot of brunches with a lot of gay best friends. none of them have ever looked at a dental appointment book the way that man looked at your name in it", t: '2026-11-18T09:16', clue: 'roses' },
        { from: 'them', text: "also u told me paint and sip. my cousin works the desk at brushstrokes. she says ur a legend there because ur paid up for two months and nobody has ever seen your face", t: '2026-11-18T09:20', clue: 'paint_alibi' },
        { from: 'me', text: 'kayla.', t: '2026-11-18T09:31' },
        { from: 'them', text: "i'm not judging. i'm ASKING. was it the forearms. it was the forearms", t: '2026-11-18T09:32' },
        { from: 'them', text: 'girl. we need to talk about the roses.', t: '2026-11-19T09:15' },
      ],
    },
    {
      id: 'th_feld', contact: 'feld', messages: [
        { from: 'them', text: 'Jessa. Need you tonight. Bring the good gloves.', t: '2026-11-17T20:29', clue: 'feld_texts' },
        { from: 'them', text: "Don't tell my wife.", t: '2026-11-17T20:30', clue: 'feld_texts' },
        { from: 'me', text: 'omw. is it the hockey guy again', t: '2026-11-17T20:41' },
        { from: 'them', text: "Yes. He bit through his mouthguard 'to feel something'. Emergency root canal. My wife thinks I retired from after-hours emergencies, so this is between us and the hockey player. Bring the cherry numbing gel.", t: '2026-11-17T20:43', clue: 'feld_clear' },
        { from: 'them', text: 'Thank you. He tipped us in hockey cards. You get the goalie. Also, who sent me roses?', t: '2026-11-17T23:05', clue: 'feld_clear' },
        { from: 'me', text: 'nobody sent you roses, dr feld', t: '2026-11-18T08:50' },
        { from: 'them', text: 'Let me have this.', t: '2026-11-18T08:51' },
      ],
    },
    {
      id: 'th_mami', contact: 'mami', messages: [
        { from: 'them', text: "Mija when are you marrying the juice boy. I am not getting younger. Also is Jules single, Tía Rosa's daughter is thirty and she has a boat", t: '2026-11-09T10:02' },
        { from: 'me', text: 'jules is gay mami', t: '2026-11-09T10:10' },
        { from: 'them', text: "Jules is NOT gay. I have eyes. He fixed my gutter in a tank top and looked at you the whole time like you were the last tamale at Christmas.", t: '2026-11-09T10:11', clue: 'mami_knows' },
        { from: 'me', text: 'mami what does that even mean', t: '2026-11-09T10:15' },
        { from: 'them', text: "It means I am lighting a candle for you. And a smaller one for the juice boy.", t: '2026-11-09T10:16', clue: 'mami_knows' },
      ],
    },
  ],

  photos: [
    { id: 'cg1_ph_lighthouse', art: 'cg1_ph_lighthouse', t: '2026-11-05T09:00', place: 'Brookline Apartments', orientation: 'landscape', caption: 'An apartment hallway. Seven framed canvases, each a lighthouse, hung in a row. A label-maker sticker on one frame.' },
    { id: 'cg1_ph_velvet', art: 'cg1_ph_velvet', t: '2026-11-14T20:58', place: 'The Velvet Fern', orientation: 'portrait', caption: 'A martini glass with three olives and a paper cone of fries on a marble bar top. A chalkboard is out of focus behind.' },
    { id: 'cg1_ph_bbq', art: 'cg1_ph_bbq', t: '2026-10-24T15:30', place: 'Brookline Apartments — courtyard', orientation: 'landscape', caption: 'A courtyard barbecue. A man in a tank top flexes beside a grill; a second man in an apron holds tongs; a woman stands between them. A small dog in a bow tie sits at their feet.' },
    { id: 'cg1_ph_roses', art: 'cg1_ph_roses', t: '2026-11-17T12:05', place: 'Bright Smile Dental', orientation: 'portrait', caption: 'Sent by Kayla. A large bouquet of red roses on a dental-office reception desk beside an appointment book. A small card on a plastic fork.', clue: 'roses' },
    { id: 'cg1_ph_marco', art: 'cg1_ph_marco', t: '2026-11-08T20:10', place: 'Calloway Lofts', orientation: 'portrait', caption: "From Jules Fontaine's Glimpse. A French bulldog in a bow tie on a velvet couch, a wine glass on the side table.", clue: 'marco_dog' },
    { id: 'cg1_ph_easels', art: 'cg1_ph_easels', t: '2026-11-12T10:40', place: 'Calloway Lofts, Unit 4B', orientation: 'landscape', caption: 'Recovered. A loft with brick walls: several easels holding near-identical lighthouse paintings, paint palettes, a fire helmet on a coat hook. Deleted Nov 12.', clue: 'ghost_painter', deletedUntil: 'recovered:photos' },
    { id: 'cg1_ph_bed', art: 'cg1_ph_bed', t: '2026-11-11T22:30', place: 'Calloway Lofts, Unit 4B', orientation: 'portrait', caption: 'Recovered. Selfie: two people under a white duvet, faces and bare shoulders visible; a French bulldog between them. Deleted Nov 11.', clue: 'bed_selfie', deletedUntil: 'recovered:photos' },
    // Hidden album
    { id: 'cg1_ph_h_helmet', art: 'cg1_ph_h_helmet', t: '2026-11-18T21:15', place: 'Calloway Lofts, Unit 4B', orientation: 'portrait', hidden: true, caption: 'Hidden album. Bathroom mirror selfie: a woman in an oversized firefighter turnout coat, held closed, wearing a helmet with a printed front shield. Monogrammed towels on a rail.', clue: 'helmet_selfie' },
    { id: 'cg1_ph_h_jules', art: 'cg1_ph_h_jules', t: '2026-11-15T23:40', place: 'Received from Jules 🌈 (bestie)', orientation: 'portrait', hidden: true, caption: 'Hidden album. Received. A shirtless man in firefighter trousers and suspenders holds a French bulldog against his chest. Caption field: "marco says come over".' },
    { id: 'cg1_ph_h_lace', art: 'cg1_ph_h_lace', t: '2026-11-04T18:20', place: 'Brookline Apartments', orientation: 'portrait', hidden: true, caption: 'Hidden album. A woman in red lace lingerie under an open trench coat takes a mirror selfie in an apartment hallway. Framed lighthouse paintings behind her.' },
  ],

  notes: [
    {
      id: 'n_wed', title: 'Trent vs. Jules (be honest)', t: '2026-11-19T00:40', lock: { password: 'frenchie', hint: "Marco's breed, the way his dad says it. One word, lowercase." }, clue: 'pros_cons',
      body: "TRENT\n+ sincere. so sincere\n+ thinks I'm 'way out of his league' (correct)\n+ paid for paint classes. twice\n- brings my phone into the shower\n- says 'macros' at the worst possible moments\n- rated himself a 9 out loud in a mirror\n\nJULES\n+ forearms\n+ actually paints (all 7 lighthouses. ALL of them)\n+ Engine 9 calendar, Mr. March\n+ Marco\n- has to pretend he's gay at Trent's barbecues and Trent keeps trying to set him up with his cousin Kevin\n- Mami knows\n- Kayla knows\n- pretty sure Marco knows\n\nDECISION: after Thanksgiving. NOT AT Thanksgiving. Trent is bringing a smoked turkey he named Gerald.",
    },
    { id: 'n_talking', title: 'lighthouse talking points', t: '2026-10-07T18:30', body: "if trent asks about the painting:\n- 'it's about loneliness'\n- 'the light is hope'\n- 'I used a fan brush' (what is a fan brush. ask J)\n- do NOT say 'Jules did the waves'\n- if he asks why it's always a lighthouse: 'it's a series'" },
    { id: 'n_groc', title: 'groceries', t: '2026-11-16T11:00', body: "oat milk\nfloss (the good kind)\ntrent's creatine (DON'T forget again, he cried)\nwine x2\nchicken treats (for marco)\nnew earring backs" },
  ],

  mail: [
    { id: 'm_brush', from: 'Brushstrokes Paint & Sip', fromAddr: 'hello@brushstrokes.example', to: 'Jessa Moreno', subject: 'We miss you, Jessa! 🎨', t: '2026-11-16T10:00', folder: 'inbox', clue: 'paint_alibi', body: "Hi Jessa!\n\nYou're our most loyal customer — on paper! Since September 16 you've booked and paid for 8 Wednesday Sip & Paint classes (thank you, Trent L.!).\n\nYou've attended: 0.\n\nYour 8 blank canvases are still in our back room. Would you like to pick them up? Otherwise we'll keep using them as a table.\n\nNo judgment! Art is a journey.\n\nThe Brushstrokes Team" },
    { id: 'm_velvet', from: 'Velvet Fern Rewards', fromAddr: 'rewards@velvetfern.example', to: 'Jessa Moreno', subject: 'Your usual is saved 🍸', t: '2026-11-14T20:42', folder: 'inbox', body: "Welcome back, Jessa!\n\nYour usual — 1× Filthy Martini, 1× Truffle Fries — is saved for one-tap ordering.\n\nYou're 2 visits from a free oyster. Bring a friend! (Not the loud one in the tank top.)" },
    { id: 'm_calloway', from: 'Calloway Lofts Parking', fromAddr: 'noreply@callowaylofts.example', to: 'Jessa Moreno', subject: 'Guest parking validated — Unit 4B', t: '2026-11-18T19:01', folder: 'inbox', clue: 'loft_stops', body: "Guest parking validated.\n\nHost unit: 4B (J. Fontaine)\nGuest: J. Moreno\nVisits this month: 3 (Wednesdays)\n\nReminder: guests staying past midnight must re-validate. Please do not let the dog in the elevator alone again." },
    { id: 'm_engine9', from: 'Engine 9 Charity Calendar', fromAddr: 'calendar@engine9.example', to: 'Jessa Moreno', subject: 'Your order has shipped! 🚒', t: '2026-11-08T15:00', folder: 'inbox', body: "Thank you for supporting the Engine 9 Burn Unit Fund!\n\n3 × Engine 9 Firefighters 2027 Calendar\n\nFeatured this year: Mr. January (Capt. Dobbs, with hose), Mr. March (Jules Fontaine, with French bulldog)...\n\nWe noticed you ordered three. That's very generous. Or very something." },
    { id: 'm_promo', from: 'Swole Juice', fromAddr: 'trent@swolejuice.example', to: 'Jessa Moreno', subject: "FWD: FWD: babe look at this smoothie I invented", t: '2026-11-10T07:15', folder: 'trash', body: "It's called the LIGHTHOUSE 🌊 blue spirulina, whey, a little sea salt. For my artist 👑\n\n— Trent\nCEO, Swole Juice\n'Drink Your Gains'" },
  ],

  calls: [
    { contact: 'trent', t: '2026-11-20T10:30', dir: 'missed' },
    { contact: 'jules', t: '2026-11-19T22:45', dir: 'missed' },
    { contact: 'feld', t: '2026-11-17T20:31', dir: 'missed' },
    { contact: 'feld', t: '2026-11-17T20:28', dir: 'missed' },
    { contact: 'jules', t: '2026-11-18T18:40', dir: 'out', duration: '0:48' },
    { contact: 'mami', t: '2026-11-16T12:00', dir: 'in', duration: '22:10' },
    { contact: 'kayla', t: '2026-11-18T12:30', dir: 'in', duration: '6:02' },
  ],

  voicemails: [
    { id: 'vm_trent', contact: 'trent', t: '2026-11-20T10:30', duration: '0:31', voice: { pitch: 0.95, rate: 1.2, female: false }, transcript: "Babe, it's me. I'm at the car wash. Your phone's buzzing in my cupholder. It says 'Jules rainbow' a lot. I'm really proud of you for being such a good ally. Anyway I'm not gonna look at it. Unless it's an emergency. Is this an emergency? Call me back. From what phone, though. Okay. Love you." },
    { id: 'vm_mami', contact: 'mami', t: '2026-11-16T11:40', duration: '0:20', voice: { pitch: 1.15, rate: 1.0, female: true }, transcript: "Mija, it's Mami. Thanksgiving: tell the juice boy NO turkey with a name. And bring Jules. Not 'gay best friend' Jules. Bring REAL Jules. You know what I mean. I have eyes. Bye." },
  ],

  map: {
    art: 'cg1_map',
    places: [
      { id: 'home', name: 'Home — Brookline Apartments', x: 0.18, y: 0.30 },
      { id: 'dental', name: 'Bright Smile Dental', x: 0.36, y: 0.64 },
      { id: 'brush', name: 'Brushstrokes Paint & Sip', x: 0.60, y: 0.38 },
      { id: 'lofts', name: 'Calloway Lofts', x: 0.72, y: 0.46 },
      { id: 'velvet', name: 'The Velvet Fern', x: 0.48, y: 0.20 },
      { id: 'firehouse', name: 'Engine 9 Firehouse', x: 0.84, y: 0.72 },
      { id: 'swole', name: 'Swole Juice', x: 0.16, y: 0.76 },
    ],
    stops: [
      { t: '2026-11-04T18:54', place: 'brush', detail: 'Passed — stationary 2 min (curbside)' },
      { t: '2026-11-04T18:58', place: 'lofts', detail: 'Arrived — 4h 02m', clue: 'loft_stops' },
      { t: '2026-11-11T18:51', place: 'brush', detail: 'Passed — stationary 3 min (curbside)' },
      { t: '2026-11-11T18:57', place: 'lofts', detail: 'Arrived — 4h 05m', clue: 'loft_stops' },
      { t: '2026-11-14T20:40', place: 'velvet', detail: 'Arrived — 1h 50m' },
      { t: '2026-11-17T20:52', place: 'dental', detail: 'Arrived — 2h 10m (after hours)' },
      { t: '2026-11-18T18:55', place: 'brush', detail: 'Passed — stationary 1 min (curbside)' },
      { t: '2026-11-18T18:59', place: 'lofts', detail: 'Arrived — 3h 58m', clue: 'loft_stops' },
      { t: '2026-11-19T18:10', place: 'swole', detail: 'Arrived — 12 min' },
    ],
  },

  browser: [
    { t: '2026-11-18T23:20', title: 'how to look like you painted something (paint on hands hack)', url: 'search?q=how+to+look+like+you+painted+something' },
    { t: '2026-11-12T01:10', title: 'is it a red flag if a firefighter has a better skincare routine than you', url: 'search?q=firefighter+better+skincare+routine' },
    { t: '2026-11-10T00:22', title: "how to tell your boyfriend your best friend isn't gay without him asking 'since when'", url: 'search?q=tell+boyfriend+best+friend+not+gay' },
    { t: '2026-11-08T14:05', title: 'french bulldog bow tie sizes (chunky)', url: 'search?q=french+bulldog+bow+tie+sizes' },
    { t: '2026-11-06T22:40', title: 'can you get a refund on paint and sip classes you never went to (asking for my boyfriend)', url: 'search?q=refund+paint+and+sip+never+went' },
    { t: '2026-10-30T23:59', title: 'what does a lighthouse symbolize in art (short answer)', url: 'search?q=lighthouse+symbolize+art' },
    { t: '2026-10-21T21:15', title: 'what is a fan brush', url: 'search?q=what+is+a+fan+brush' },
  ],

  glimpse: [
    { id: 'g1_marco', author: 'jules', photo: 'cg1_ph_marco', caption: "date night with my man Marco 🐶❤️ finest frenchie in Calloway Lofts. the only man in my life I'm allowed to talk about", t: '2026-11-08T20:12', likes: 214, comments: [{ author: 'trent', text: 'MARCO!!! finally 🙌 bring him to the bbq bro, does he lift' }, { author: 'mami', text: 'Jules this is a dog.' }, { author: 'me', text: '🐶❤️' }], clue: 'marco_dog' },
    { id: 'g1_bbq', author: 'me', photo: 'cg1_ph_bbq', caption: 'my boys 💕 #bbq #besties', t: '2026-10-24T16:00', likes: 61, comments: [{ author: 'trent', text: 'zero threat 😎' }, { author: 'jules', text: '🌈🔥' }, { author: 'kayla', text: 'girl.' }] },
    { id: 'g1_lighthouse', author: 'me', photo: 'cg1_ph_lighthouse', caption: "lighthouse #7 🎨 I'm basically a professional now", t: '2026-11-05T09:10', likes: 38, comments: [{ author: 'kayla', text: 'girl.' }, { author: 'jules', text: 'the brushwork is so confident' }, { author: 'trent', text: 'MY ARTIST 👑 next one do a protein shake' }] },
  ],

  bank: {
    account: 'Harborline Bank ••6612',
    balance: 1284.4,
    tx: [
      { t: '2026-11-18T19:00', desc: 'CALLOWAY LOFTS — GUEST PARKING VALIDATION (UNIT 4B)', amount: -4.0, clue: 'loft_stops' },
      { t: '2026-11-14T21:30', desc: 'THE VELVET FERN — FILTHY MARTINI, TRUFFLE FRIES + TIP', amount: -28.5 },
      { t: '2026-11-14T09:00', desc: "PAYSNAP FROM TRENT LYLE — 'paint classes for my queen 🎨👑'", amount: 240.0, clue: 'trent_pays' },
      { t: '2026-11-11T19:00', desc: 'CALLOWAY LOFTS — GUEST PARKING VALIDATION (UNIT 4B)', amount: -4.0 },
      { t: '2026-11-09T13:12', desc: 'PAWS & PEARLS PET BOUTIQUE — BOW TIE (SMALL DOG, CHUNKY)', amount: -18.0 },
      { t: '2026-11-08T14:58', desc: 'ENGINE 9 CHARITY CALENDAR × 3', amount: -60.0 },
      { t: '2026-11-04T19:00', desc: 'CALLOWAY LOFTS — GUEST PARKING VALIDATION (UNIT 4B)', amount: -4.0 },
      { t: '2026-11-01T08:00', desc: 'BROOKLINE APTS — RENT (HALF)', amount: -1100.0 },
    ],
  },

  calendar: [
    { id: 'cal1_paint', t: '2026-11-25T19:00', title: '🎨 Paint & Sip', detail: 'wear something paint-proof (lol)' },
    { id: 'cal1_bbq', t: '2026-11-21T14:00', title: 'BBQ @ ours', detail: 'Trent + Jules + "Marco"?? — hide the coat' },
    { id: 'cal1_thanks', t: '2026-11-26T15:00', title: "Thanksgiving @ Mami's", detail: "Trent's turkey. He named it Gerald. Do NOT let him introduce it." },
    { id: 'cal1_feld', t: '2026-11-17T21:00', title: 'ER — hockey guy', detail: "After hours. DON'T tell Mrs. Feld." },
    { id: 'cal1_decide', t: '2026-11-27T10:00', title: 'decide.', detail: 'after Thanksgiving. not AT Thanksgiving.' },
  ],

  wifi: [
    { name: 'Brookline_Apt_12_5G', lastJoined: '2026-11-20T07:30' },
    { name: 'MARCO_IS_A_GOOD_BOY (4B)', lastJoined: '2026-11-18T19:00', clue: 'loft_stops' },
    { name: 'BrightSmile_Staff', lastJoined: '2026-11-19T08:00' },
    { name: 'VelvetFern_Guest 🍸', lastJoined: '2026-11-14T20:41' },
    { name: 'SwoleJuice_NO_CARBS', lastJoined: '2026-11-19T18:11' },
    { name: 'Brushstrokes_Guest', lastJoined: '2026-09-16T18:55' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve images she deleted on Wednesday nights out of unallocated flash storage.', needs: ['pinned:paint_alibi'], needsHint: "Need a lead first: pin proof of where she ISN'T on Wednesdays.", durationMs: 4500 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: 'Rebuild deleted texts from the Messages write-ahead log.', needs: ['pinned:marco_dog'], needsHint: 'Need a lead first: pin who Marco actually is.', durationMs: 5500 },
  ],

  clues: [
    { id: 'paint_alibi', title: 'Paint & Sip: 8 booked, 0 attended', text: "Brushstrokes: eight Wednesday classes paid for since Sept 16 (by Trent), zero attended, eight blank canvases in the back room. Kayla's cousin: 'nobody has ever seen her face'.", kind: 'document' },
    { id: 'trent_pays', title: 'Trent funds the alibi', text: "Trent paid for the Wednesday classes in September and PaySnapped another $240 on Nov 14: 'paint classes for my queen'.", kind: 'document', art: 'av_cg1_trent' },
    { id: 'roses', title: "Two dozen roses, signed 'J'", text: "Kayla: a firefighter in uniform delivered two dozen red roses to Jessa at the dental office, card signed 'J'.", kind: 'object', art: 'cg1_ph_roses' },
    { id: 'marco_dog', title: 'Marco is a French bulldog', text: "Jules's Glimpse: 'date night with my man Marco' — Marco is a French bulldog in a bow tie.", kind: 'person', art: 'cg1_ph_marco' },
    { id: 'loft_stops', title: 'Wednesdays at Calloway Lofts', text: 'Every Wednesday her phone idles 1–3 minutes outside Brushstrokes, then spends ~4 hours at Calloway Lofts. Guest parking validated for Unit 4B (J. Fontaine); joins Wi-Fi "MARCO_IS_A_GOOD_BOY (4B)".', kind: 'place' },
    { id: 'ghost_painter', title: 'The lighthouse factory', text: "Jules paints the lighthouses: a loft full of drying lighthouse canvases, and 'i'll paint the lighthouse tomorrow so it's dry by then'.", kind: 'object', art: 'cg1_ph_easels' },
    { id: 'bed_selfie', title: 'Under the duvet, Nov 11', text: 'Recovered selfie, Wednesday 22:30 at Calloway Lofts 4B: Jessa and Jules under one duvet, Marco between them.', kind: 'event', art: 'cg1_ph_bed' },
    { id: 'helmet_selfie', title: 'The helmet says FONTAINE', text: "Hidden album, Wednesday 21:15: Jessa in a turnout coat and a helmet whose shield reads 'FONTAINE · ENGINE 9', in a bathroom with 'CALLOWAY LOFTS' towels.", kind: 'object', art: 'cg1_ph_h_helmet' },
    { id: 'not_gay', title: "'gay for fourteen months for you'", text: "Deleted texts: Jules tells Trent he's 'so gay, bro' at the gym, then to Jessa: 'I've been gay for fourteen months for you.' Jessa: 'u are not gay.'", kind: 'document', art: 'av_cg1_jules' },
    { id: 'pros_cons', title: 'Trent vs. Jules', text: "Jessa's locked list: pros and cons of both men. 'Jules actually paints (all 7 lighthouses)', 'has to pretend he's gay at Trent's barbecues'. Decision: after Thanksgiving.", kind: 'document' },
    { id: 'mami_knows', title: "Mami: 'Jules is NOT gay'", text: "Her mother: 'He fixed my gutter in a tank top and looked at you the whole time like you were the last tamale at Christmas.'", kind: 'person', art: 'av_cg1_mami' },
    { id: 'feld_texts', title: "Dr. Feld: 'Need you tonight'", text: "Her boss, Monday 20:29: 'Need you tonight. Bring the good gloves.' 'Don't tell my wife.'", kind: 'person', art: 'av_cg1_feld' },
    { id: 'feld_clear', title: 'The hockey player', text: "Dr. Feld's emergency was an after-hours root canal on a hockey player who bit through his mouthguard. His wife thinks he's retired from emergencies.", kind: 'event', art: 'av_cg1_feld' },
    { id: 'jules_live', title: "Jules: 'wear the coat'", text: "Jules, mid-investigation: 'if trent has it: hi trent, so gay bro. if trent DOESN'T: wednesday, my place, I already painted the lighthouse, wear the coat.'", kind: 'person', art: 'av_cg1_jules' },
  ],

  questions: [
    {
      id: 'q_cheat', prompt: 'Is Jessa cheating on Trent?',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No — she really is very into lighthouses' },
        { id: 'emotional', label: 'Only emotionally — nothing physical' },
      ],
      answer: 'yes', evidence: ['bed_selfie', 'helmet_selfie', 'not_gay', 'pros_cons', 'jules_live'],
      explain: "A recovered selfie under one duvet, a hidden selfie in his helmet in his bathroom, and her own pros-and-cons list. The lighthouses were never the point.",
    },
    {
      id: 'q_who', prompt: 'With whom?',
      options: [
        { id: 'feld', label: 'Dr. Marty Feld, her boss', art: 'av_cg1_feld' },
        { id: 'jules', label: "Jules Fontaine, her 'gay best friend' — who is not gay", art: 'av_cg1_jules' },
        { id: 'kayla', label: 'Kayla, her work wife', art: 'av_cg1_kayla' },
        { id: 'trent', label: "Nobody. It's Trent, he's just paranoid", art: 'av_cg1_trent' },
      ],
      answer: 'jules', evidence: ['not_gay', 'helmet_selfie', 'bed_selfie', 'jules_live', 'pros_cons', 'roses', 'mami_knows'],
      explain: "Jules told Trent he was gay at a barbecue to avoid a fight and kept it up for fourteen months. Mami saw through it from a ladder. Dr. Feld was doing a root canal.",
    },
    {
      id: 'q_where', prompt: 'Where do they meet?',
      options: [
        { id: 'brush', label: 'Brushstrokes Paint & Sip' },
        { id: 'lofts', label: "Jules's loft — Calloway Lofts, Unit 4B, Wednesday nights" },
        { id: 'dental', label: 'Bright Smile Dental, after hours' },
        { id: 'velvet', label: 'The Velvet Fern' },
      ],
      answer: 'lofts', evidence: ['loft_stops', 'helmet_selfie', 'bed_selfie', 'paint_alibi', 'ghost_painter'],
      explain: 'Her phone idles a minute outside Brushstrokes, then spends four hours at Calloway Lofts. Guest parking is validated for Unit 4B and the Wi-Fi is named after the dog.',
    },
    {
      id: 'q_how', prompt: 'How did they hide it?',
      options: [
        { id: 'burner', label: 'A burner phone and a secret app' },
        { id: 'cover', label: "Jules played gay so Trent saw 'zero threat', and Trent-funded Paint & Sip covered Wednesdays — with lighthouses Jules painted for her" },
        { id: 'work', label: 'She said she was working late with Dr. Feld' },
        { id: 'none', label: "They didn't. Trent just never looked" },
      ],
      answer: 'cover', evidence: ['not_gay', 'paint_alibi', 'ghost_painter', 'marco_dog', 'trent_pays', 'pros_cons'],
      explain: "The 'boyfriend' was a dog, the classes were never attended, and every lighthouse came out of Jules's loft. Trent paid for the alibi. Twice.",
    },
  ],

  events: [
    { id: 'e1_trent', kind: 'text', when: ['unlocked'], delayMs: 5000, thread: 'th_trent', contact: 'trent', text: "hey is this roxy's guy. it's trent. did u crack it. is it the lighthouse. i KNEW lighthouses were sexual. also don't read anything about my abs. that's private between me and jules" },
    { id: 'e1_h_marco', kind: 'handler', when: ['pinned:marco_dog'], delayMs: 3000, text: "Marco has four legs, a bow tie and a better social life than our client. Our client never met the boyfriend and never asked a follow-up question. Somebody on that phone probably did. Mothers usually do." },
    { id: 'e1_jules', kind: 'text', when: ['recovered:msgfrag'], delayMs: 6000, thread: 'th_jules', contact: 'jules', text: "jess?? ur phone's been off since the car wash. if trent has it: hi trent!! so gay bro 🌈. if trent DOESN'T have it: wednesday, my place, I already painted the lighthouse, wear the coat 🔥", clue: 'jules_live' },
    { id: 'e1_h_ready', kind: 'handler', when: ['unlocked'], minPins: 11, delayMs: 3000, text: "That's enough rope for a tug-of-war. Open the report. Pin every answer, because our client is going to argue with all of them, probably in a tank top." },
  ],

  hints: [
    { until: 'unlocked', text: "Trent: the code is the price of her usual at the Velvet Fern. The lock screen says what her usual is; the chalkboard on the wallpaper says what it costs. Add it up, drop the $ and the dot." },
    { until: 'pinned:paint_alibi', after: ['unlocked'], text: "Paint & Sip every Wednesday. Has the studio ever actually seen her? Check Mail, and what Kayla's cousin says." },
    { until: 'recovered:photos', after: ['pinned:paint_alibi'], text: "If she isn't painting on Wednesdays, she deleted something on Wednesdays. Run TRACE on the photos." },
    { until: 'hidden:open', after: ['unlocked'], text: "Photos has a Hidden album. Same passcode. Everybody thinks they're the first person to think of that." },
    { until: 'pinned:marco_dog', after: ['unlocked'], text: "Who is Marco? Jules posts about him on Glimpse." },
    { until: 'recovered:msgfrag', after: ['pinned:marco_dog'], text: "Her chat with Jules has gaps on Wednesday nights. TRACE the message fragments." },
    { until: 'note:n_wed', after: ['unlocked'], text: "Her locked list wants Marco's breed. Jules's Glimpse caption brags about it." },
    { until: 'pinned:loft_stops', after: ['unlocked'], text: "Maps, Wi-Fi and Bank all know where her car sleeps on Wednesdays." },
    { until: 'report:filed', after: ['unlocked'], text: "Open the report: whether, who, where, how. Every answer gets a pin. Trent will read it twice and out loud." },
  ],

  handlerIntro: "Roxy Vance. I own this outfit, I've been divorced three times, and every one of them was their loss. Kid, a man in a tank top just paid me in damp singles to find out if his girlfriend's 'gay best friend' is a threat. He said 'zero threat' four times. Nobody says anything four times unless it keeps them up at night. Get the phone open. Don't touch my lighter.",

  epilogue: {
    solved: [
      "Roxy delivered the report to Trent Lyle at Swole Juice at 7 a.m., between a whey delivery and a man buying 'energy crystals' for his dog. Trent read it twice, then a third time out loud, then asked if Marco was 'in on it'. Roxy said Marco is a dog. Trent said 'that's exactly what an accomplice would say.'",
      "The confrontation happened at Saturday's barbecue, because Trent had already bought the meat. In front of everyone he asked, 'Are you still gay, bro?' Jules put down the tongs and said, 'I never was, bro. I'm sorry. Your abs are a seven.' Trent whispered 'I KNEW they were a seven', then threw a smoked turkey named Gerald into the courtyard fountain.",
      "Jessa moved into Calloway Lofts, Unit 4B, with seven lighthouse paintings, none of which she painted. Jules is Mr. March again. Marco has a new bow tie that says BEST MAN. Mami tells everyone she 'knew from the gutter'.",
      "Brushstrokes refunded Trent's $240 and gave him the eight blank canvases. He took the class himself. He has painted eleven lighthouses. They are, against all odds, very good. He says they're about loneliness.",
    ],
    partial: [
      'Your report reached the client with holes in it.',
      "Trent read 'inconclusive' and heard 'zero threat'. He invited Jules to move in 'since he's practically family'. Jules said yes. Marco has the second bedroom.",
      'Go back to Wednesday nights. Follow the car, not the paint.',
    ],
  },
};
