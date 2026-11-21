import type { CaseFile } from '../types';

// CASE 06 — TOUCH MOVE
// Desmond "Dez" Boateng, 66, retired merchant seaman, hustles five-dollar blitz at
// the stone tables in Halsey Park and teaches 14-year-old Malik Grant for free.
// Aug 15 (heat wave, 104°F): Dez wins the Halsey Heat Blitz Open. The sponsor,
// Dunmore Properties, handed the $8,000 cash purse to organizer Curtis Brennick at
// 18:00. At 22:44 Dez photographs the count (8 bundles) and at 22:58 photographs
// Curtis locking it in the pavilion office safe — only Curtis has the code. Curtis
// texts: cash stays in the safe till the bank opens Monday.
// Curtis gambles (Winners Circle OTB on Fulton Ave — Dez saw him there Aug 12) and
// the Conservancy froze his events account Aug 12 pending audit (two-person cash
// rule). At 01:20 he carries a gym bag out of the pavilion (groundskeeper Luz saw).
// Dez's flat AC is broken; he sleeps by table 4 "like '89". Heat stroke overnight.
// 05:20 Curtis is back. 05:31 he takes Dez's phone (passcode = Scholar's Mate,
// which Dez boasted about and Curtis once watched him enter), carries it into his
// office (joins PAVILION_STAFF Wi-Fi 05:33), deletes the count/safe photos, his own
// texts and an old voicemail, clears today's locations, drops the empty sponsor
// envelope in the fountain beside Dez and only at 05:44 dials 911 — from Dez's
// phone. Then he tells everyone Dez "insisted on keeping the cash".
// Red herring: Vic Sallow, the runner-up who threatened Dez — escorted out by park
// police at 22:52, then playing blitz across the river at Rook & Pawn till 2 a.m.
// Ending: hopeful. Dez wakes. Malik goes to nationals.

export const case6: CaseFile = {
  id: 'touch-move',
  number: '06',
  title: 'Touch Move',
  tagline: 'He played anyone in the park for five dollars. Somebody played him for eight thousand.',
  difficulty: 2,
  cover: 'cover_case6',
  owner: { name: 'Desmond Boateng', age: 66, summary: 'Park chess hustler, Halsey Park, table 4. Retired merchant seaman. Taught half the neighbourhood the Sicilian for free.' },
  status: 'IN ICU',
  deviceCondition: 'HEAT-STRESSED BATTERY · 3 DAYS IN EVIDENCE · 97% READABLE',
  briefing: [
    "Desmond 'Dez' Boateng, 66. For thirty years he has played five-minute chess for five dollars at the stone tables in Halsey Park. Table 4 is his. Half the kids in the neighbourhood learned the game from him, for nothing.",
    'On Saturday, August 15, the hottest night of a week-long heat wave (104°F at 6 p.m.), Dez won the Halsey Heat Blitz Open. The sponsor paid the $8,000 prize in cash.',
    'At 05:44 the next morning, organizer Curtis Brennick called 911. Dez was unconscious by the park fountain with heat stroke. An empty prize envelope floated in the fountain ten feet away. He is in the ICU at St. Agnes and has not woken up.',
    'Brennick has told police and two TV stations that Dez "insisted on keeping the purse on him overnight." The cash is gone. The precinct has written Dez down as a thief who passed out before he could spend it.',
    "His sister Abena Boateng doesn't believe a word of it: \"My brother has used the same passcode for twenty years. 'The move that ends it,' he calls it: from the square where the piece stands to the square where it wins. He counts files like numbers on his board, a is one, h is eight.\"",
  ],
  phoneDate: '2026-08-19',
  phoneTime: '14:20',
  lock: {
    passcode: '8567',
    hint: 'the move that ends it — from-square then to-square, files as numbers (a=1 … h=8)',
    wallpaper: 'wall_c6_lock',
    notifications: [
      { app: 'messages', title: 'Malik', text: 'u STILL use the first trap u ever taught me as ur passcode?? queen takes f7, game over 😂 anyone could guess it professor', t: '2026-08-15T19:02' },
      { app: 'messages', title: 'Abena', text: "Dez. I'm at St. Agnes. If you can hear the phone buzz, squeeze somebody's hand.", t: '2026-08-16T07:55' },
      { app: 'phone', title: 'Missed call', text: 'Curtis Brennick', t: '2026-08-16T07:09' },
      { app: 'mail', title: 'National Scholastic Chess', text: 'Reminder: Junior Blitz entry for Malik Grant closes Aug 22.', t: '2026-08-18T09:00' },
    ],
  },
  homeWallpaper: 'wall_c6_home',

  contacts: [
    { id: 'malik', name: 'Malik', avatar: 'av_c6_malik', number: '(555) 230-4416', label: 'the kid ♞' },
    { id: 'curtis', name: 'Curtis Brennick', avatar: 'av_c6_curtis', number: '(555) 230-1180', label: 'Conservancy events' },
    { id: 'abena', name: 'Abena', avatar: 'av_c6_abena', number: '(555) 917-2034', label: 'sister' },
    { id: 'vic', name: 'Vic Sallow', avatar: 'av_c6_vic', number: '(555) 776-0909' },
    { id: 'hank', name: 'Hank — table 2', avatar: 'av_c6_hank', number: '(555) 230-7752' },
    { id: 'toni', name: 'Toni Grant', avatar: 'av_c6_toni', number: '(555) 230-4400', label: "Malik's mom" },
    { id: 'pak', name: 'Mr. Pak (super)', avatar: 'av_c6_pak', number: '(555) 230-0031' },
    { id: 'c6unknown', name: '(555) 230-6618', avatar: 'av_unknown', number: '(555) 230-6618' },
  ],

  threads: [
    {
      id: 'th_malik', contact: 'malik', messages: [
        { from: 'them', text: 'professor i beat hank. HANK. with the london system. he said a bad word', t: '2026-08-04T17:40' },
        { from: 'me', text: 'Hank says that word when he loses to me too. Means you played well. Library Thursday 4pm, we work on endgames. Rook endings are where boys become men.', t: '2026-08-04T17:52' },
        { from: 'them', text: 'u STILL use the first trap u ever taught me as ur passcode?? queen takes f7, game over 😂 anyone could guess it professor', t: '2026-08-15T19:02' },
        { from: 'me', text: "Anyone who knows it doesn't need my phone. Focus. Watch the final from the rail, not my shoulder.", t: '2026-08-15T19:05' },
        { from: 'them', text: 'U BEAT HIM. U BEAT VIC. armageddon with 9 SECONDS', t: '2026-08-15T22:31' },
        { from: 'me', text: "8 grand, kid. Locked up in Curtis's safe till Monday. Nationals AND a suit. A real one, with a jacket. Go to sleep, champ.", t: '2026-08-15T23:20', clue: 'kid_money' },
        { from: 'them', text: "a SUIT?? 😭 ok ok. goodnight professor. drink water it's still like 95", t: '2026-08-15T23:22' },
        { from: 'them', text: "professor? mom says ur in the hospital. curtis is telling ppl u took the money. ur not answering", t: '2026-08-16T08:12' },
        { from: 'them', text: "i went to table 4. i set up the pieces anyway. nobody sat down", t: '2026-08-17T18:30' },
      ],
    },
    {
      id: 'th_curtis', contact: 'curtis', messages: [
        { from: 'them', text: "Professor! Still unlocking your phone with Scholar's Mate? I watched you do it at the board meeting 😂 your secret's safe with me", t: '2026-07-21T19:15', clue: 'curtis_knew_code' },
        { from: 'me', text: 'Nothing on this phone worth stealing, Curtis. Unlike the board account.', t: '2026-07-21T19:30' },
        { from: 'them', text: 'Final at 9. Dunmore drops the cash at 6, I sign for it. Big crowd, big check, big photo. Wear the hat.', t: '2026-08-15T12:04' },
        { from: 'them', text: "Dunmore's VP is coming. Guy's got veneers you could read by. Smile, hold the big cheque, let the rich people feel like saints for one night. That's the whole business model, Professor 😎", t: '2026-08-15T12:06' },
        { from: 'me', text: 'I will wear the hat. I will not kiss the ring.', t: '2026-08-15T12:15' },
        { from: 'them', text: "Cash stays in the pavilion safe till the bank opens Monday, champ. Two-person rule, schmo-person rule. Only I've got the code 😎", t: '2026-08-15T23:05', clue: 'curtis_safe_text', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "Fine by me. It's the kid's money anyway. Count it again Monday in front of Toni.", t: '2026-08-15T23:07', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "you still at the tables? go home old man, it's 95 out", t: '2026-08-16T00:50', clue: 'curtis_knew_where', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'Table 4. Stars are out. Go home yourself.', t: '2026-08-16T00:52', clue: 'curtis_knew_where', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "Dez, call me the second you're up. Cops have questions about the purse. I told them the truth, you wanted it on you.", t: '2026-08-16T07:12' },
      ],
    },
    {
      id: 'th_abena', contact: 'abena', messages: [
        { from: 'them', text: "It's 104. Go to the cooling centre at the library. Don't be proud. Pride is what killed Uncle Kwame, and he was only fixing his own damn gutter.", t: '2026-08-15T14:10' },
        { from: 'me', text: 'Proud is my whole game. Final at 9. Come watch your brother be a legend.', t: '2026-08-15T14:22' },
        { from: 'them', text: 'A legend with heatstroke is just an old man lying on hot concrete, Desmond. Pigeons will not care about your rating.', t: '2026-08-15T14:24' },
        { from: 'me', text: "Won. Flat's an oven, Pak says the AC part comes Tuesday. Sleeping out by table 4 like summer '89. Don't fuss.", t: '2026-08-16T00:12', photo: 'c6_ph_bench', clue: 'at_tables' },
        { from: 'them', text: "Dez. I'm at St. Agnes. If you can hear the phone buzz, squeeze somebody's hand.", t: '2026-08-16T07:55' },
        { from: 'them', text: "The EMS sheet says the 911 call came from YOUR phone at 5:44. Curtis told me he found you at 5:43 and dialled 'that second'. He held my hand and cried. I don't know why that bothers me.", t: '2026-08-17T10:30', clue: 'call_544' },
        { from: 'them', text: 'They say your kidneys are better today. Malik came. He brought the travel set and played both sides on your tray table.', t: '2026-08-18T19:40' },
      ],
    },
    {
      id: 'th_vic', contact: 'vic', messages: [
        { from: 'them', text: "You cheated, you senile old fuck. Your phone was buzzing in your pocket the whole armageddon. I'll get my money back one way or another.", t: '2026-08-15T22:41', clue: 'vic_threat' },
        { from: 'me', text: "My phone buzzes because my sister worries. You lost on time with a won position. That's not cheating, that's blitz.", t: '2026-08-15T22:45' },
        { from: 'them', text: 'They gave me a TICKET for kicking a clock. A CLOCK. Escorted me out the gate like a goddamn criminal. Banned 30 days.', t: '2026-08-15T23:02' },
        { from: 'them', text: "Rook & Pawn, across the river. 100 games tonight against anyone with a pulse. Come and play me sober and honest, Professor.", t: '2026-08-15T23:46', photo: 'c6_ph_cafe', clue: 'vic_cafe' },
        { from: 'them', text: "Heard you're in the hospital. I'm not a monster. Get well, and then I want a rematch, you lucky bastard.", t: '2026-08-17T12:00' },
      ],
    },
    {
      id: 'th_toni', contact: 'toni', messages: [
        { from: 'them', text: "Mr. Boateng, I can't let you pay for nationals. It's too much.", t: '2026-08-10T20:05' },
        { from: 'me', text: "Toni, I've been saving since he beat me the first time. It's his. I'm only holding it.", t: '2026-08-10T20:20' },
        { from: 'them', text: 'I watched Curtis count it with you. Eight stacks. I have never seen eight thousand dollars in one place in my life 😳 Curtis licked his thumb for every single bill. I need to wash my eyes.', t: '2026-08-15T22:50' },
        { from: 'them', text: "I'm going to tell the police exactly that. He didn't have any money on him when he walked back to the tables. He had a bottle of water and Malik's hat.", t: '2026-08-16T12:40' },
      ],
    },
    {
      id: 'th_pak', contact: 'pak', messages: [
        { from: 'me', text: "Mr. Pak, the AC in 4F died again. It's 96 in here at midnight.", t: '2026-08-13T00:20', photo: 'c6_ph_thermostat', clue: 'ac_broken' },
        { from: 'them', text: 'Compressor part on backorder. Tuesday latest. Sleep at your sister?', t: '2026-08-13T08:10', clue: 'ac_broken' },
        { from: 'them', text: 'Also if you see 3B tell him walls are thin. Nobody needs "relaxing massage music" at 2am with that much... enthusiasm. Whole building knows. Whole building.', t: '2026-08-13T08:12' },
        { from: 'me', text: 'My sister has opinions. I have a park.', t: '2026-08-13T08:15' },
        { from: 'them', text: 'Part came. AC fixed. Everyone in building says get well, Mr. Dez.', t: '2026-08-18T15:30' },
      ],
    },
    {
      id: 'th_hank', contact: 'hank', messages: [
        { from: 'them', text: "Saw Curtis at the OTB again Weds. You saw him too, didn't you? Man had that look. The look we had in '79.", t: '2026-08-13T11:00' },
        { from: 'me', text: "I saw him. I'm going to talk to him before I talk to the board. A man gets one warning.", t: '2026-08-13T11:20' },
        { from: 'them', text: "That's why you're a better man than me. I'd just take his money at the board. And his watch.", t: '2026-08-13T11:22' },
        { from: 'them', text: "Also my date off that senior dating app cancelled. Said my picture was 'misleading.' It's from 1983. That's not misleading, that's vintage.", t: '2026-08-13T11:25' },
        { from: 'me', text: 'Hank, in that picture you have hair, a mustache and a Trans Am. You currently have none of those things.', t: '2026-08-13T11:31' },
        { from: 'them', text: 'The mustache is spiritually still there. Ladies can sense it.', t: '2026-08-13T11:32' },
      ],
    },
  ],

  photos: [
    { id: 'c6_ph_tables', art: 'c6_ph_tables', t: '2026-08-15T18:40', place: 'Halsey Park — chess plaza', orientation: 'landscape', caption: 'The stone chess tables at sunset in a shimmer of heat; a lamppost thermometer reads 104°F. A banner over the plaza: HALSEY HEAT BLITZ OPEN · FINAL 9PM.' },
    { id: 'c6_ph_count', art: 'c6_ph_count', t: '2026-08-15T22:44', place: 'Halsey Park — pavilion', orientation: 'landscape', caption: 'Recovered. Banded bundles of $100 bills fanned on a folding table beside a cash envelope; two people at the table. Deleted Aug 16, 05:36.', clue: 'count_photo', deletedUntil: 'recovered:photos' },
    { id: 'c6_ph_safe', art: 'c6_ph_safe', t: '2026-08-15T22:58', place: 'Halsey Park — pavilion office', orientation: 'portrait', caption: 'Recovered. A grey office safe under a desk, a man crouched in front of it. Deleted Aug 16, 05:36.', clue: 'safe_photo', deletedUntil: 'recovered:photos' },
    { id: 'c6_ph_check', art: 'c6_ph_check', t: '2026-08-15T22:46', place: 'Halsey Park — chess plaza', orientation: 'landscape', caption: "From Malik's Glimpse. Dez in his straw hat and Curtis Brennick holding a giant novelty cheque between them.", clue: 'champion' },
    { id: 'c6_ph_viccart', art: 'c6_ph_viccart', t: '2026-08-15T22:52', place: 'Halsey Park — east gate', orientation: 'portrait', caption: "From Malik's Glimpse. A man in a white linen shirt in the back of a park police golf cart at the east gate; a crowd behind.", clue: 'vic_escorted' },
    { id: 'c6_ph_cafe', art: 'c6_ph_cafe', t: '2026-08-15T23:44', place: 'Rook & Pawn Café', orientation: 'landscape', caption: 'Sent by Vic Sallow. A crowded late-night chess café, a dozen boards going, a chalkboard on the wall.', clue: 'vic_cafe' },
    { id: 'c6_ph_bench', art: 'c6_ph_bench', t: '2026-08-16T00:14', place: 'Halsey Park — chess plaza', orientation: 'portrait', caption: 'Selfie at night. Dez lying on a bench beside a chess table, straw hat over his chest, a half-empty water bottle.', clue: 'at_tables' },
    { id: 'c6_ph_thermostat', art: 'c6_ph_thermostat', t: '2026-08-13T00:18', place: 'Corliss Ave, apt 4F', orientation: 'portrait', caption: 'A wall thermostat in the apartment. A box fan with one broken blade on the floor.', clue: 'ac_broken' },
    { id: 'c6_ph_otb', art: 'c6_ph_otb', t: '2026-08-12T14:10', place: 'Winners Circle OTB, Fulton Ave', orientation: 'landscape', caption: 'Taken through a shop window: an off-track betting parlour lined with race screens, a man in a green polo at the betting window.', clue: 'otb_sighting' },
    { id: 'c6_ph_jar', art: 'c6_ph_jar', t: '2026-07-30T21:00', place: 'Corliss Ave, apt 4F', orientation: 'portrait', caption: 'A big pickle jar of folded fives and tens on a kitchen counter, a masking-tape label on the front, a bank deposit slip tucked under it.' },
    { id: 'c6_ph_malik', art: 'c6_ph_malik', t: '2025-09-20T16:00', place: 'Halsey Park — chess plaza', orientation: 'landscape', caption: 'A skinny boy of thirteen with a too-big trophy, grinning with braces, at table 4. Dez behind him pretending to be furious.' },
    { id: 'c6_ph_fountain', art: 'c6_ph_fountain', t: '2026-08-02T07:30', place: 'Halsey Park — fountain', orientation: 'landscape', caption: "Morning. The round stone fountain with its bronze heron, kids' sailboats bobbing. In the background, the green-roofed pavilion." },
  ],

  notes: [
    {
      id: 'n_malikfund', title: 'Malik Fund', t: '2026-08-15T23:30', lock: { password: '1240', hint: "What's in the jar so far: every deposit marked for the kid, added up. Whole dollars." }, clue: 'malik_fund',
      body: "MALIK — U.S. JUNIOR BLITZ NATIONALS, CLEVELAND, OCT 9–11\n\nEntry 450\nBus x2 (him + Toni) 220\nHotel 3 nights 540\nFood 150\n= 1,360. Jar has 1,240. Short 120.\n\nUPDATE 23:30 Aug 15: short nothing. Eight thousand in Curtis's safe. Nationals, the suit, a real coach for a year, and the rest in an account in his name he can't touch till 18.\n\nI don't need it. I have table 4.\n\nCurtis — he asked me again to 'hold' things for him and keep quiet about Fulton Ave. No. Monday I count the money in front of Toni, then I go to the board. A man's word is the only rating that counts.",
    },
    { id: 'n_rules', title: 'Table 4 rules', t: '2025-05-02T10:00', body: "1. Five dollars, five minutes.\n2. Touch move. You touch it, you move it. In chess and in life.\n3. Kids play free.\n4. Nobody pays who can't.\n5. If you lose on time with a won position, you lost.\n6. No phones on the table. (Abena excepted. She worries.)" },
    { id: 'n_malikwork', title: 'Malik — work on', t: '2026-08-06T21:15', body: "- Rook endings (Lucena, Philidor) — he panics\n- Stop playing for the trap. Traps are for hustlers. Play the position.\n- Scholar's Mate: he still checks for it every game. Good. Never forget the first thing that beat you.\n- Clock: he thinks too long on move 1." },
    { id: 'n_heat', title: 'Heat', t: '2026-08-14T13:00', body: "Cooling centres: Halsey Library (till 8pm), St. Agnes lobby.\nWater: 1 bottle every hour on the hour.\nAbena says: dizzy + no sweat = hospital. Abena says a lot." },
  ],

  mail: [
    { id: 'm_dunmore', from: 'Dunmore Properties — Community', fromAddr: 'community@dunmoreprop.example', to: 'Halsey Heat finalists', subject: 'Prize purse — delivery', t: '2026-08-14T16:00', folder: 'inbox', clue: 'purse_handoff', body: "Dear finalists,\n\nDunmore Properties is proud to sponsor the Halsey Heat Blitz Open.\n\nThe $8,000 champion's purse will be delivered in cash to the tournament director, Curtis Brennick, at 18:00 on Saturday August 15 at the Halsey Park pavilion. Mr. Brennick will sign a receipt and is responsible for the purse until it is presented to the champion.\n\nGood luck,\nDunmore Properties Community Team" },
    { id: 'm_audit', from: 'Halsey Park Conservancy — Treasurer', fromAddr: 'treasurer@halseyconservancy.example', to: 'Event volunteers & coordinators', subject: 'Events account suspended pending review', t: '2026-08-12T18:05', folder: 'inbox', clue: 'audit_freeze', body: "Volunteers,\n\nEffective today the Conservancy events account (managed by C. Brennick) is suspended pending review of several irregular cash withdrawals in June and July.\n\nUntil the review is complete, ALL event cash must be handled by TWO people at all times, and no cash may be held overnight on Conservancy premises.\n\nIf you have information relevant to the review, please contact me directly.\n\nM. Osei, Treasurer" },
    { id: 'm_press', from: 'Halsey Park Conservancy', fromAddr: 'press@halseyconservancy.example', to: 'Members & volunteers', subject: 'Statement on the Halsey Heat purse', t: '2026-08-16T11:30', folder: 'inbox', clue: 'curtis_story', body: "Statement from tournament director Curtis Brennick:\n\n\"After his win, the champion, Mr. Boateng, insisted on keeping the purse on his person overnight. I advised against it. At approximately 05:43 I found him unconscious near the fountain and called 911 immediately. The empty prize envelope was recovered from the fountain. Our thoughts are with Mr. Boateng and his family. We are cooperating fully with police.\"" },
    { id: 'm_nationals', from: 'National Scholastic Chess', fromAddr: 'entries@nscf.example', to: 'Desmond Boateng', subject: 'Junior Blitz Nationals — entry for Malik Grant (pending payment)', t: '2026-08-08T10:12', folder: 'inbox', clue: 'nationals', body: "Thank you for starting an entry.\n\nPlayer: Malik Grant (age 14)\nSponsor / guardian contact: Desmond Boateng (coach)\nEvent: U.S. Junior Blitz Nationals, Cleveland, Oct 9–11\nEntry fee: $450 — PENDING\n\nEntries close August 22." },
    { id: 'm_tosponsor', from: 'Desmond Boateng', fromAddr: 'dez.table4@chessmail.example', to: 'community@dunmoreprop.example', subject: 'Re: Prize purse — delivery', t: '2026-08-14T21:40', folder: 'sent', body: "Thank you for sponsoring. Please note the Conservancy's new two-person rule for cash. I'd ask that the count be witnessed at presentation, by me and one parent.\n\nD. Boateng, table 4" },
    { id: 'm_heat', from: 'City of Halsey — Alerts', fromAddr: 'alerts@halsey.example', to: 'Subscribers', subject: 'EXCESSIVE HEAT WARNING through Aug 17', t: '2026-08-14T06:00', folder: 'trash', body: 'Heat index up to 110°F. Overnight lows near 88°F. Older adults are at high risk. Cooling centres are open at all branch libraries until 8 PM. Check on your neighbours.' },
  ],

  calls: [
    { contact: 'abena', t: '2026-08-18T19:30', dir: 'missed' },
    { contact: 'malik', t: '2026-08-16T08:10', dir: 'missed' },
    { contact: 'curtis', t: '2026-08-16T07:09', dir: 'missed' },
    { contact: '911', t: '2026-08-16T05:44', dir: 'out', duration: '1:52' },
    { contact: 'abena', t: '2026-08-15T14:30', dir: 'in', duration: '4:10' },
    { contact: 'hank', t: '2026-08-13T11:30', dir: 'out', duration: '6:02' },
    { contact: 'curtis', t: '2026-08-13T09:44', dir: 'missed' },
    { contact: 'toni', t: '2026-08-10T20:30', dir: 'in', duration: '12:45' },
  ],

  voicemails: [
    { id: 'vm_curtis_otb', contact: 'curtis', t: '2026-08-13T09:45', duration: '0:31', voice: { pitch: 1.0, rate: 1.15, female: false }, clue: 'curtis_otb', deletedUntil: 'recovered:voice', transcript: "Dez. Curtis. Listen, about Fulton Avenue yesterday. That was a one-time thing, a buddy's birthday, okay? I'm handling it. Do me a solid and keep it off the board's radar till after Saturday. Tournament goes great, everybody wins. Including you, Professor. Call me." },
    { id: 'vm_curtis_story', contact: 'curtis', t: '2026-08-16T07:10', duration: '0:24', voice: { pitch: 1.0, rate: 1.1, female: false }, clue: 'curtis_story', transcript: "Dez, it's Curtis. If you get this, the police are asking where the purse is. You told me you wanted it on you overnight, you remember? You insisted. I said don't. Just... call me when you're up, buddy. We'll sort it out." },
    { id: 'vm_hank', contact: 'hank', t: '2026-08-16T13:00', duration: '0:19', voice: { pitch: 0.75, rate: 0.85, female: false }, transcript: "It's Hank. They got yellow tape round table 4. Somebody put flowers on it like you're dead, so I moved 'em to table 2. You owe me a game. Don't you dare die owing me a game. Also the pigeons miss you. They've been shitting on table 2 out of pure spite." },
    { id: 'vm_abena', contact: 'abena', t: '2026-08-15T14:31', duration: '0:15', voice: { pitch: 1.05, rate: 1.0, female: true }, transcript: "Desmond. Water. Shade. If you get dizzy and you stop sweating, that is not a feeling, that is an emergency. I love you. Win." },
  ],

  map: {
    art: 'map_c6',
    places: [
      { id: 'tables', name: 'Halsey Park — chess plaza (table 4)', x: 0.46, y: 0.48 },
      { id: 'pavilion', name: 'Pavilion & Conservancy office', x: 0.60, y: 0.34 },
      { id: 'fountain', name: 'Heron fountain', x: 0.50, y: 0.60 },
      { id: 'home', name: 'Corliss Ave, apt 4F (home)', x: 0.18, y: 0.72 },
      { id: 'rookpawn', name: 'Rook & Pawn Café (across the river)', x: 0.88, y: 0.18 },
      { id: 'stagnes', name: 'St. Agnes Hospital', x: 0.24, y: 0.22 },
      { id: 'otb', name: 'Winners Circle OTB, Fulton Ave', x: 0.78, y: 0.80 },
      { id: 'library', name: 'Halsey Branch Library', x: 0.32, y: 0.52 },
    ],
    stops: [
      { t: '2026-08-12T14:05', place: 'otb', detail: 'Walked past — 6 min' },
      { t: '2026-08-13T16:00', place: 'library', detail: "Malik's lesson — 1h 30m" },
      { t: '2026-08-15T18:35', place: 'tables', detail: 'Arrived' },
      { t: '2026-08-15T22:43', place: 'pavilion', detail: 'Prize count — 17 min' },
      { t: '2026-08-15T23:01', place: 'tables', detail: 'Stationary, table 4 area, until 05:31' },
      { t: '2026-08-16T05:31', place: 'pavilion', detail: 'Device moved 140 m into the Conservancy office — 10 min', clue: 'phone_moved', deletedUntil: 'recovered:locate' },
      { t: '2026-08-16T05:41', place: 'fountain', detail: 'Device returned — beside the fountain. Location history cleared on device at 05:39.', clue: 'phone_moved', deletedUntil: 'recovered:locate' },
      { t: '2026-08-16T06:02', place: 'stagnes', detail: 'EMS transport — arrived ER' },
    ],
  },

  browser: [
    { t: '2026-08-15T23:35', title: 'Cleveland Junior Blitz Nationals 2026 — hotels near venue', url: 'search?q=cleveland+junior+blitz+nationals+hotel' },
    { t: '2026-08-15T23:28', title: "Boys' suits size 14 slim — Halsey Outfitters", url: 'halseyoutfitters.example/boys-suits' },
    { t: '2026-08-14T13:05', title: 'Heat stroke warning signs older adults', url: 'search?q=heat+stroke+warning+signs+older+adults' },
    { t: '2026-08-13T22:10', title: 'Gamblers Anonymous — meetings near Fulton Ave', url: 'ga-meetings.example/halsey', clue: 'otb_sighting' },
    { t: '2026-08-13T21:55', title: 'Nonprofit volunteer — how to report treasurer concerns', url: 'search?q=report+concerns+nonprofit+board' },
    { t: '2026-08-08T10:05', title: 'U.S. Junior Blitz Nationals — entry form', url: 'nscf.example/junior-blitz/entry' },
    { t: '2026-08-01T09:00', title: 'Halsey Heat Blitz Open — $8,000 to the champion', url: 'halseyconservancy.example/heat-open' },
  ],

  glimpse: [
    { id: 'g6_champ', author: 'malik', photo: 'c6_ph_check', caption: 'MY COACH IS THE CHAMPION OF HALSEY PARK 🏆♟️ armageddon, 9 seconds left. vic who', t: '2026-08-15T22:47', likes: 412, comments: [{ author: 'toni', text: 'So proud of you both ❤️' }, { author: 'hank', text: 'he still owes me a game' }, { author: 'curtis', text: 'What a night for Halsey Park! 🏆💰 Proudly brought to you by Dunmore Properties #community #giveback' }], clue: 'champion' },
    { id: 'g6_vic', author: 'malik', photo: 'c6_ph_viccart', caption: 'bye vic 👋 kicked the clock, got the cart. park police said 30 day ban', t: '2026-08-15T22:53', likes: 230, comments: [{ author: 'vic', text: 'delete this' }, { author: 'hank', text: 'blitz is a gentleman\'s game son' }], clue: 'vic_escorted' },
    { id: 'g6_simul', author: 'vic', photo: 'c6_ph_cafe', caption: 'Lost a final to a coffeehouse grandpa and a bullshit clock. Fine. 100-board simul at Rook & Pawn till 2am. Come lose to me.', t: '2026-08-15T23:44', likes: 58, comments: [{ author: 'malik', text: 'he was still there at 2 my cousin went' }, { author: 'hank', text: 'a hundred boards and still can\'t beat one old man' }], clue: 'vic_cafe' },
    { id: 'g6_first', author: 'me', photo: 'c6_ph_malik', caption: 'First trophy. Lost to him in 19 moves the next day. Proudest loss of my life.', t: '2025-09-20T18:00', likes: 87, comments: [{ author: 'malik', text: 'it was 18 moves' }, { author: 'abena', text: '😂❤️' }] },
  ],

  bank: {
    account: 'Halsey Federal Credit Union ••5502',
    balance: 1871.40,
    tx: [
      { t: '2026-08-14T12:40', desc: 'HALSEY CORNER DELI — WATER x6', amount: -6.50 },
      { t: '2026-08-13T10:15', desc: 'DEPOSIT — MALIK JAR', amount: 165.00 },
      { t: '2026-08-03T09:00', desc: 'SSA BENEFIT DEPOSIT', amount: 1184.00 },
      { t: '2026-08-01T08:00', desc: 'PAK PROPERTY MGMT — RENT', amount: -720.00 },
      { t: '2026-07-30T21:10', desc: 'DEPOSIT — MALIK JAR', amount: 410.00 },
      { t: '2026-07-18T15:22', desc: 'HALSEY BOOKS — ENDGAME MANUAL (DVORETSKY)', amount: -34.95 },
      { t: '2026-07-11T10:30', desc: 'DEPOSIT — MALIK JAR', amount: 125.00 },
      { t: '2026-07-03T09:00', desc: 'SSA BENEFIT DEPOSIT', amount: 1184.00 },
      { t: '2026-06-27T11:05', desc: 'DEPOSIT — MALIK JAR', amount: 340.00 },
      { t: '2026-06-06T10:50', desc: 'DEPOSIT — MALIK JAR', amount: 200.00 },
      { t: '2026-06-02T14:00', desc: 'TABLE 4 WINNINGS — CASH DEPOSIT', amount: 85.00 },
    ],
  },

  calendar: [
    { id: 'c6_c_final', t: '2026-08-15T21:00', title: 'HALSEY HEAT — FINAL', detail: 'Table 1, under the lights. Wear the hat.' },
    { id: 'c6_c_count', t: '2026-08-17T09:00', title: 'Count purse w/ Toni + Curtis → bank', detail: 'Monday. Two people. Then the board.' },
    { id: 'c6_c_board', t: '2026-08-18T18:30', title: 'Conservancy board — volunteer comments', detail: 'Tell Osei about Fulton Ave.' },
    { id: 'c6_c_ac', t: '2026-08-18T10:00', title: 'Pak — AC part', detail: 'be home' },
    { id: 'c6_c_deadline', t: '2026-08-22T23:59', title: 'Nationals entry closes', detail: "Malik. $450. Don't forget the rating ID." },
    { id: 'c6_c_lesson', t: '2026-08-13T16:00', title: 'Malik @ library', detail: 'Rook endings. Bring the good clock.' },
  ],

  wifi: [
    { name: 'HalseyPark_Free', lastJoined: '2026-08-15T21:02' },
    { name: 'PAVILION_STAFF', lastJoined: '2026-08-16T05:33', clue: 'wifi_pavilion' },
    { name: 'Corliss_4F', lastJoined: '2026-08-15T18:10' },
    { name: 'HalseyLibrary_Public', lastJoined: '2026-08-13T16:02' },
    { name: 'RookAndPawn_Guest', lastJoined: '2026-05-30T20:15' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve image fragments from unallocated flash storage.', needs: ['unlocked'], durationMs: 5000 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: 'Rebuild deleted SMS records from the database write-ahead log.', needs: ['pinned:safe_photo'], needsHint: 'Need a lead first: pin where the prize money actually went at 22:58.', durationMs: 6500 },
    { id: 'locate', label: 'Location — Significant Places Cache', detail: 'Rebuild cleared location history from the motion co-processor cache.', needs: ['pinned:curtis_story'], needsHint: "Need a lead first: pin Curtis Brennick's account of the morning.", durationMs: 6000 },
    { id: 'voice', label: 'Voicemail — Carrier Cache', detail: 'Pull deleted voicemail audio from the carrier sync cache.', needs: ['pinned:audit_freeze'], needsHint: 'Need a lead first: pin why the Conservancy froze the events account.', durationMs: 5500 },
  ],

  clues: [
    { id: 'count_photo', title: 'Eight bundles, 22:44', text: 'Dez photographed the count: eight $1,000 bundles, Curtis counting, Toni watching. Deleted from his phone at 05:36.', kind: 'object', art: 'c6_ph_count' },
    { id: 'safe_photo', title: 'Into the safe, 22:58', text: "Curtis Brennick locking the Dunmore envelope in his own office safe. Deleted from Dez's phone at 05:36.", kind: 'object', art: 'c6_ph_safe' },
    { id: 'curtis_safe_text', title: "Curtis: 'Only I've got the code'", text: "Deleted text, 23:05: 'Cash stays in the pavilion safe till the bank opens Monday... Only I've got the code.'", kind: 'document', art: 'av_c6_curtis' },
    { id: 'purse_handoff', title: 'The purse was his to hold', text: 'Dunmore delivered the cash to Curtis at 18:00. He signed for it and was responsible for it until presentation.', kind: 'document' },
    { id: 'champion', title: 'The giant cheque', text: "Trophy photo, 22:46: Dez holds a novelty cheque and a paper cup of water.", kind: 'event', art: 'c6_ph_check' },
    { id: 'curtis_story', title: "Curtis: 'He insisted'", text: "Curtis's public statement and his 07:10 voicemail: Dez 'insisted on keeping the purse on his person.' He 'found him at 05:43 and called 911 immediately.'", kind: 'person', art: 'av_c6_curtis' },
    { id: 'audit_freeze', title: 'Events account frozen', text: "Aug 12: the Conservancy suspended Curtis's events account over irregular cash withdrawals. New rule: two people handle cash, none held overnight.", kind: 'document' },
    { id: 'otb_sighting', title: 'Curtis at the betting window', text: "Aug 12: Dez photographed Curtis pushing cash under the glass at Winners Circle OTB. That night he looked up Gamblers Anonymous meetings.", kind: 'place', art: 'c6_ph_otb' },
    { id: 'curtis_otb', title: "Curtis: 'keep it off the board's radar'", text: "Deleted voicemail, Aug 13: Curtis begs Dez to keep Fulton Ave quiet until after Saturday.", kind: 'person', art: 'av_c6_curtis' },
    { id: 'luz_witness', title: 'A gym bag at 01:20', text: 'The night groundskeeper saw Curtis leave the pavilion at 01:20 with a gym bag and walk right past Dez asleep at table 4.', kind: 'person', art: 'av_unknown' },
    { id: 'luz_car', title: "Curtis's car at 05:20", text: "The groundskeeper: Curtis's Camry was idling in the lot at 05:20.", kind: 'event', art: 'av_unknown' },
    { id: 'phone_moved', title: 'The phone went to the office', text: "Recovered locations: at 05:31 Dez's phone moved 140 m into the Conservancy office for 10 minutes, then came back to the fountain at 05:41. Location history was cleared at 05:39.", kind: 'place' },
    { id: 'wifi_pavilion', title: 'PAVILION_STAFF, 05:33', text: "Dez's phone joined the pavilion staff Wi-Fi network at 05:33.", kind: 'place' },
    { id: 'call_544', title: '911 from Dez’s phone, 05:44', text: "The 911 call came from Dez's own phone at 05:44. Curtis says he found him at 05:43 and called 'that second'.", kind: 'event' },
    { id: 'curtis_knew_code', title: "Curtis knew the passcode", text: "July: 'Still unlocking your phone with Scholar's Mate? I watched you do it.'", kind: 'person', art: 'av_c6_curtis' },
    { id: 'curtis_knew_where', title: "'you still at the tables?'", text: "Deleted texts, 00:50: Curtis checks where Dez is. Dez: 'Table 4.'", kind: 'event' },
    { id: 'vic_threat', title: "Vic: 'one way or another'", text: "The runner-up accused Dez of cheating: 'I'll get my money back one way or another.'", kind: 'person', art: 'av_c6_vic' },
    { id: 'vic_escorted', title: 'Vic escorted out, 22:52', text: 'Park police drove Vic Sallow out of the east gate at 22:52 and banned him for 30 days.', kind: 'event', art: 'c6_ph_viccart' },
    { id: 'vic_cafe', title: 'Vic at Rook & Pawn till 2 a.m.', text: 'From 23:44 Vic was across the river running a 100-board simul at Rook & Pawn. Still there at 2.', kind: 'place', art: 'c6_ph_cafe' },
    { id: 'at_tables', title: "'Sleeping out by table 4'", text: "00:12: Dez's AC was dead, so he slept by table 4 'like summer '89'. A selfie shows him on the bench with a hat and a water bottle.", kind: 'place', art: 'c6_ph_bench' },
    { id: 'ac_broken', title: 'AC FAULT, 96°F inside', text: "Dez's flat hit 96°F at midnight. Compressor part on backorder until Tuesday.", kind: 'object', art: 'c6_ph_thermostat' },
    { id: 'malik_fund', title: 'The Malik Fund', text: "Dez's locked note: the winnings were for Malik. Nationals, a suit, a coach, and a savings account in his name. Monday he'd count it in front of Toni, then go to the board about Curtis.", kind: 'document' },
    { id: 'nationals', title: 'Junior Nationals entry', text: 'Dez started an entry for Malik Grant, U.S. Junior Blitz Nationals: $450, pending, closes Aug 22.', kind: 'document' },
    { id: 'kid_money', title: "'Nationals AND a suit'", text: "23:20, to Malik: '8 grand, kid. Locked up in Curtis's safe till Monday. Nationals AND a suit.'", kind: 'person', art: 'av_c6_malik' },
  ],

  questions: [
    {
      id: 'q_cash', prompt: 'After the final, where did the $8,000 purse go?',
      options: [
        { id: 'dez', label: 'Dez kept it on him overnight' },
        { id: 'safe', label: "Curtis locked it in the pavilion office safe" },
        { id: 'wire', label: 'The sponsor kept it to wire on Monday' },
        { id: 'toni', label: "Toni Grant took it home for Malik" },
      ],
      answer: 'safe', evidence: ['safe_photo', 'curtis_safe_text', 'count_photo', 'champion', 'purse_handoff', 'kid_money'],
      explain: "Dez photographed Curtis putting the envelope in his own safe at 22:58, and Curtis texted that only he had the code. Dez walked away holding a cardboard cheque and a cup of water.",
    },
    {
      id: 'q_thief', prompt: 'Who took the money?',
      options: [
        { id: 'dez', label: 'Desmond Boateng', art: 'av_c6_desmond' },
        { id: 'curtis', label: 'Curtis Brennick', art: 'av_c6_curtis' },
        { id: 'vic', label: 'Vic Sallow', art: 'av_c6_vic' },
        { id: 'luz', label: 'The night groundskeeper' },
        { id: 'malik', label: 'Malik Grant', art: 'av_c6_malik' },
      ],
      answer: 'curtis', evidence: ['luz_witness', 'curtis_safe_text', 'safe_photo', 'audit_freeze', 'otb_sighting', 'curtis_otb'],
      explain: "Only Curtis could open the safe. His events account was frozen for missing cash, Dez had caught him at the OTB, and at 01:20 he carried a gym bag out of the pavilion.",
    },
    {
      id: 'q_phone', prompt: "What happened to Dez's phone between 05:31 and 05:44?",
      options: [
        { id: 'dez', label: 'Dez woke briefly and called 911 himself' },
        { id: 'curtis', label: 'Curtis took it into his office, deleted the evidence, then called 911 from it' },
        { id: 'police', label: 'Park police searched it' },
        { id: 'nothing', label: 'Nothing. It stayed in Dez\'s pocket' },
      ],
      answer: 'curtis', evidence: ['phone_moved', 'wifi_pavilion', 'call_544', 'curtis_knew_code', 'luz_car', 'curtis_knew_where'],
      explain: "The phone sat on the pavilion staff Wi-Fi at 05:33 while its owner lay unconscious by the fountain. The photos were deleted at 05:36 and the locations cleared at 05:39. Curtis knew the passcode and only dialled 911 at 05:44.",
    },
    {
      id: 'q_vic', prompt: 'Where was Vic Sallow when the money left the pavilion?',
      options: [
        { id: 'park', label: 'Hiding in the park, waiting for Dez to fall asleep' },
        { id: 'cafe', label: 'Escorted out at 22:52, then running a simul at Rook & Pawn across the river' },
        { id: 'pavilion', label: 'In the pavilion with Curtis' },
        { id: 'hospital', label: 'At St. Agnes' },
      ],
      answer: 'cafe', evidence: ['vic_escorted', 'vic_cafe'],
      explain: "He threatened Dez, but park police drove him out at 22:52, and from 23:44 until 2 a.m. he was across the river playing a hundred people.",
    },
    {
      id: 'q_tables', prompt: 'Why was Dez in the park all night?',
      options: [
        { id: 'hiding', label: 'He was guarding cash he had hidden' },
        { id: 'vic', label: 'He was hiding from Vic' },
        { id: 'heat', label: 'His flat was 96°F with a broken AC, so he slept by table 4' },
        { id: 'meet', label: 'He was waiting to meet Curtis' },
      ],
      answer: 'heat', evidence: ['at_tables', 'ac_broken'],
      explain: "His AC had been dead since the 13th. He texted his sister that he was sleeping out by table 4, like summer '89, and sent a selfie with nothing on the bench but a hat and a bottle of water.",
    },
    {
      id: 'q_money', prompt: 'What was Dez going to do with the prize?',
      options: [
        { id: 'debt', label: 'Pay off a gambling debt' },
        { id: 'malik', label: "Send Malik to the Junior Nationals, and save the rest in Malik's name" },
        { id: 'move', label: 'Move somewhere cooler' },
        { id: 'ac', label: 'Buy a new air conditioner' },
      ],
      answer: 'malik', evidence: ['malik_fund', 'nationals', 'kid_money'],
      explain: "He had been filling a pickle jar for Malik's entry since June. The winnings were the rest of it: the trip, a suit, a coach, and an account the boy can't touch till eighteen.",
    },
  ],

  events: [
    { id: 'e6_malik', kind: 'text', when: ['unlocked'], delayMs: 4000, thread: 'th_malik', contact: 'malik', text: "is this professor's phone? ms abena said the police gave it to u. he's not a thief. he made me give back a quarter i found under table 3." },
    { id: 'e6_h_story', kind: 'handler', when: ['pinned:curtis_story'], delayMs: 3000, text: "Brennick has told this story on two channels now: the old man begged to keep the cash, and he called 911 the second he found him. Funny thing about rehearsed stories — they come out word for word, like a hostage video. Check it against what the phone itself saw that morning. TRACE can rebuild cleared locations." },
    { id: 'e6_luz1', kind: 'text', when: ['recovered:photos'], minPins: 6, delayMs: 6000, thread: 'th_c6unknown', contact: 'c6unknown', text: "this is Dez's phone? I'm Luz, nights on the grounds crew. Didn't tell the cops, Curtis signs my timesheet, the slimy little shit. 1:20 am he came out the pavilion with a gym bag. Walked right past Dez asleep by table 4. Didn't even look.", clue: 'luz_witness' },
    { id: 'e6_h_wifi', kind: 'handler', when: ['pinned:phone_moved'], delayMs: 3500, text: "Dispatch confirms the 911 call came at 05:44 from Mr. Boateng's own number. Line that up against where his phone spent the ten minutes before it. Phones don't take little strolls on their own while their owner's cooking on a bench." },
    { id: 'e6_luz2', kind: 'text', when: ['event:e6_luz1', 'recovered:locate'], delayMs: 5000, thread: 'th_c6unknown', contact: 'c6unknown', text: "one more thing. I clock in 5:15. Curtis's Camry was already in the lot at 5:20, engine running, AC on. He didn't call nobody till way after. I'll say it to a detective. Dez taught my boy to play.", clue: 'luz_car' },
    { id: 'e6_h_ready', kind: 'handler', when: ['unlocked'], minPins: 15, delayMs: 3000, text: "Precinct wants to close this as a theft by the victim. Course they do — it's August, the squad-room AC is broken too, and nobody wants to do paperwork with swamp ass. Let's not let them. When every answer has a pin behind it, file the Case Report." },
  ],

  hints: [
    { until: 'unlocked', text: "From square to square. Malik's notification says where the queen lands (f7). The wallpaper board shows where the white queen stands. Turn each file letter into a number, a=1 … h=8, and keep the rank number." },
    { until: 'recovered:photos', after: ['unlocked'], text: 'Curtis says Dez kept the cash. Dez photographed everything. Run TRACE Photos.' },
    { until: 'pinned:safe_photo', after: ['recovered:photos'], text: 'One recovered photo shows where the envelope went at 22:58. Pin it.' },
    { until: 'recovered:msgfrag', after: ['pinned:safe_photo'], text: "Someone deleted texts as well as photos. TRACE the message fragments: what did Curtis write at 23:05?" },
    { until: 'pinned:curtis_story', after: ['unlocked'], text: "Read the Conservancy's statement in Mail, or Curtis's 07:10 voicemail. Pin his version of events." },
    { until: 'recovered:locate', after: ['pinned:curtis_story'], text: 'Somebody cleared the morning from the location history. TRACE can rebuild it.' },
    { until: 'pinned:wifi_pavilion', after: ['unlocked'], text: 'Settings → Wi-Fi. Which network did the phone join at 05:33, while Dez lay by the fountain?' },
    { until: 'pinned:audit_freeze', after: ['unlocked'], text: 'Why would the Conservancy freeze the events account three days before a cash tournament? Check the Inbox.' },
    { until: 'recovered:voice', after: ['pinned:audit_freeze'], text: 'Curtis called Dez the day after the OTB. That voicemail is gone. TRACE the carrier cache.' },
    { until: 'note:n_malikfund', after: ['unlocked'], text: "The Malik Fund note wants the jar total. Open Bank and add up every deposit marked MALIK JAR. Skip the benefit and the winnings deposits." },
    { until: 'pinned:vic_cafe', after: ['pinned:vic_threat'], text: "Vic threatened him. But where did Vic go after the cart ride? Check his later texts and Glimpse." },
    { until: 'pinned:ac_broken', after: ['unlocked'], text: "Why was a 66-year-old sleeping outside in a heat wave? Ask the building super." },
    { until: 'report:filed', after: ['unlocked'], text: 'Open the Case Report. Back every answer with a pinned clue. Dez can\'t do it himself.' },
  ],

  handlerIntro: "Not cold, this one — it's still warm: a sixty-six-year-old in the ICU is about to be charged with stealing his own prize. That's prime-cut bullshit, even for this city. His sister says the passcode is a chess move. I don't play. Only board game I know is Sorry, and I never am. Hopefully you do.",

  epilogue: {
    solved: [
      "Curtis Brennick was arrested on August 20 in the Conservancy office, writing a press release about park safety. In the trunk of his Camry: a black gym bag, $1,100 in banded hundreds, and a Winners Circle betting slip time-stamped 09:14 on August 16. The other $6,900 had already gone to a man on Fulton Avenue who goes by 'Sharp'. Detectives found him too.",
      "Brennick admitted he had found Dez struggling to breathe at 05:30. He took the phone first. 'I just needed ten minutes,' he told them. The doctors at St. Agnes said those ten minutes were the difference between a week in the ICU and a week on a ward. He is charged with theft, tampering with evidence and reckless endangerment of an elderly person.",
      "Dunmore Properties paid the purse a second time, and nobody had to ask them twice. Vic Sallow put $500 of his own money into the Malik Fund, along with a note: 'For the rematch. With him, not me.'",
      "Desmond Boateng woke up on day nine. The first thing he said was 'Who's at table 4?' Abena cried. Malik set up the travel board on the tray table, and Dez, still on oxygen, played the Sicilian and lost in thirty-one moves. 'Proudest loss of my life,' he said. 'Again.'",
      "In October, Malik Grant finished seventh in the U.S. Junior Blitz Nationals in Cleveland, wearing a navy suit with a jacket. When the camera found him after the last round, he looked straight into it: 'Touch move, Professor.'",
    ],
    partial: [
      'Your report reached the precinct with gaps in it.',
      "Brennick's story is simple: the old man wanted the money on him, and the heat did the rest. Without the phone's own morning on the board, that's the story that gets typed up, and Desmond Boateng wakes up to a theft charge and a park that won't look him in the eye.",
      'Go back to 05:31. Follow the phone, not the man.',
    ],
  },
};
