import type { CaseFile } from '../types';

// CASE 05 — THE LAST ROOM
// 2008: five friends at Hatch Quarry — Vera Lisk, Julian Ashe, Nadia Fenn, Owen
// Blake and Marlow "Low" Price. Rum. Low and Owen climbed onto the Pulpit ledge;
// Nadia was alone at the car; Vera and Julian were on the rocks below. Low fell.
// Caretaker Abel Dunn heard screaming, ran down with a flashlight and went into the
// water after him, three times. Julian said: say the caretaker chased us. They all
// did. Abel was convicted of reckless manslaughter and served eleven years. Owen
// told police he'd been at the car with Nadia.
// 2026: Low's mother gave Vera his undeveloped disposable camera. Frame 24 — Low's
// reversed selfie on the ledge — shows Owen right behind him in his red HATCH XC
// windbreaker. Nadia admitted Owen was never at the car. Vera built QUARRY, her
// ninth room, as a public confession, filed with the Second Look Project, and hired
// Tess Moreau knowing she was really Tamsin Dunn, Abel's daughter: the room was for
// her. Owen begged her not to use frame 24.
// Oct 31: private test session (Julian, Nadia, Owen) 21:00–22:00. That afternoon on
// his "props run" Owen swapped Vera's EpiPen in the booth for a staff TRAINER pen
// and left a black-sesame brownie "for her" on the console. After the session Vera
// wrote her confession on her phone, set the lock wallpaper to the room's final
// wall, and locked the phone itself inside the room's final timer box (opening Nov 2
// 09:00 for Ibarra, Ruth and Tess) — the phone IS the last room. She ate the
// brownie; the trainer did nothing; her phone was in a steel box. Owen came back at
// 23:20 (smart-lock log), removed the bakery box, planted a sesame-snap bar in her
// bag and left at 23:31. The timer died when police cut power; the box was cut
// open Nov 18.
// Red herrings: Julian Ashe (threats, architect of the 2008 lie — live on KPRT's DA
// debate during the death window), Tess (false name, motive — left 21:04, never
// returned).

export const case5: CaseFile = {
  id: 'last-room',
  number: '05',
  title: 'The Last Room',
  tagline: 'She built rooms people paid to escape. The last one, she built for you.',
  difficulty: 3,
  cover: 'cover_case5',
  owner: { name: 'Vera Lisk', age: 38, summary: 'Escape-room designer. Co-owner of Lisk & Key. Her ninth room was about the worst night of her life.' },
  status: 'DECEASED',
  deviceCondition: 'BATTERY DEAD 17 DAYS · FOUND INSIDE A LOCKED PROP · 88% READABLE',
  briefing: [
    'Vera Lisk, 38. Co-owner of Lisk & Key — escape rooms built inside the old Harbor Savings Bank in Port Ardent. Her rooms were famous for one thing: people came out crying. Her ninth, QUARRY, was due to open on November 2.',
    'On October 31 she ran a private test for three old friends: her business partner Owen Blake, Nadia Fenn, and Julian Ashe — who is running for Harbor County District Attorney. They left at 22:05.',
    'At 07:40 the next morning, front-desk clerk Tess Moreau found Vera dead in the control booth. Anaphylaxis — sesame. A sesame-snap bar in her bag, an auto-injector in her hand. Ruled an accident. QUARRY never opened.',
    'In 2008, Low Price, 17, drowned at Hatch Quarry. The four friends were there. Everyone in Port Ardent knows the room was about that night.',
    "On November 18 the landlord's crew cut open the room's final prop — a steel lockbox whose timer died when police cut the power. There was no confession inside. Just her phone.",
    'Owen Blake: "Vera\'s final lock was always a word, dialed on an old phone keypad. Six letters. She used to say the answer is always on the first wall you see." Play her last room.',
  ],
  phoneDate: '2026-11-20',
  phoneTime: '10:15',
  lock: {
    passcode: '627569',
    hint: 'a six-letter word, dialed on the keypad letters — say his name',
    wallpaper: 'wall_c5_lock',
    notifications: [
      { app: 'messages', title: 'Mira', text: "they're calling it an accident. you have read every label since you were four, V.", t: '2026-11-03T21:40' },
      { app: 'messages', title: 'Ruth Price', text: 'I saw the donation. Thank you for calling him Marlow.', t: '2026-10-31T20:05' },
      { app: 'mail', title: 'Hatch Quarry Memorial Fund', text: 'Thank you for your gift in memory of Marlow J. Price (1991–2008).', t: '2026-10-31T20:02' },
      { app: 'calendar', title: 'QUARRY opens', text: 'Hal + Ruth + Tess at the door, 9:00', t: '2026-11-02T09:00' },
    ],
  },
  homeWallpaper: 'wall_c5_home',

  contacts: [
    { id: 'owen', name: 'Owen Blake', avatar: 'av_c5_owen', number: '(555) 482-0117', label: 'partner 🔑' },
    { id: 'julian', name: 'Julian Ashe', avatar: 'av_c5_julian', number: '(555) 482-9000', label: 'J.A. for DA' },
    { id: 'nadia', name: 'Nadia Fenn', avatar: 'av_c5_nadia', number: '(555) 482-3341' },
    { id: 'mira', name: 'Mira', avatar: 'av_c5_mira', number: '(555) 482-7766', label: 'sister' },
    { id: 'tess', name: 'Tess Moreau', avatar: 'av_c5_tess', number: '(555) 482-1402', label: 'front desk' },
    { id: 'ruth', name: 'Ruth Price', avatar: 'av_c5_ruth', number: '(555) 482-0822', label: "Low's mom" },
    { id: 'ibarra', name: 'Hal Ibarra', avatar: 'av_c5_ibarra', number: '(555) 610-4400', label: 'Second Look Project' },
    { id: 'c5unknown', name: '(555) 482-5150', avatar: 'av_unknown', number: '(555) 482-5150' },
  ],

  threads: [
    {
      id: 'th_owen', contact: 'owen', messages: [
        { from: 'them', text: "Room 9 is the best thing you've ever built. it's also going to end us. you know that right", t: '2026-10-10T23:12' },
        { from: 'me', text: "it's not about us. it was never about us. that's the whole problem", t: '2026-10-10T23:20' },
        { from: 'them', text: 'also the fog machine in 6 is leaking again. the whole vault smells like a vape shop hooked up with a swamp', t: '2026-10-10T23:24' },
        { from: 'me', text: "put it in the brochure. 'immersive.'", t: '2026-10-10T23:25' },
        { from: 'them', text: 'the bachelorette group in room 4 tonight tried to tip the actor playing the corpse. with dollar bills. in his waistband. he says he has never felt so seen', t: '2026-10-10T23:27' },
        { from: 'them', text: 'first aid refresher done. staff certified. tess stabbed an orange with real commitment. remind me never to piss her off', t: '2026-10-20T16:40' },
        { from: 'me', text: "you told the police you were at the car with Nadia. Owen, you're in frame 24. on the ledge. right behind him.", t: '2026-10-28T22:40', clue: 'owen_confront', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "it's a sleeve, V. it's dark. it could be anyone's", t: '2026-10-28T22:51', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'it says HATCH XC. I bought you that jacket for your 17th birthday.', t: '2026-10-28T22:52', clue: 'owen_confront', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "don't put it in the room. please. I am begging you", t: '2026-10-28T23:30', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'tomorrow, 8pm, your place. in person. no more texts.', t: '2026-10-28T23:41', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'props run done. restocked the first-aid box in the booth. see you at 9 🎃', t: '2026-10-31T17:20', clue: 'booth_restock' },
        { from: 'them', text: "left you something on the console. the dark one's yours 🎃 we good?", t: '2026-10-31T22:10', photo: 'c5_ph_brownies', clue: 'black_sesame' },
        { from: 'me', text: "we're not good. but thank you 🖤 nov 2, owen. stand next to me or don't.", t: '2026-10-31T22:12' },
        { from: 'them', text: 'Vee? Tess is screaming on the phone. Vee pick up', t: '2026-11-01T07:58' },
        { from: 'them', text: "I'm so sorry. I'm so sorry.", t: '2026-11-01T08:40' },
      ],
    },
    {
      id: 'th_julian', contact: 'julian', messages: [
        { from: 'them', text: "Nadia says you've built an escape room about the quarry. Tell me that's a joke.", t: '2026-10-22T18:30' },
        { from: 'me', text: "it's not a joke. it's a confession. you're invited.", t: '2026-10-22T18:36' },
        { from: 'them', text: "The caretaker story kept four kids out of prison. It was my idea and it WORKED. Don't you dare undo it two weeks before an election.", t: '2026-10-22T18:41', clue: 'chase_story' },
        { from: 'them', text: "My campaign slogan is literally 'Integrity Matters.' It's on four hundred lawn signs. Do you have any idea how that will read?", t: '2026-10-22T18:43' },
        { from: 'me', text: 'like a punchline, julian', t: '2026-10-22T18:44' },
        { from: 'them', text: 'My attorney will be in touch.', t: '2026-10-27T09:15' },
        { from: 'them', text: "If that room opens, I will bury you and your little company. That isn't a threat. It's a forecast.", t: '2026-10-30T20:58', clue: 'julian_threat' },
        { from: 'them', text: 'I came. I played your game. Your fog machine ruined a nine-hundred-dollar suit. Now I have a debate to win.', t: '2026-10-31T22:06' },
        { from: 'them', text: "I'm sorry, Vera. I didn't want any of this.", t: '2026-11-01T10:15' },
      ],
    },
    {
      id: 'th_nadia', contact: 'nadia', messages: [
        { from: 'them', text: "18 years today. I posted the old photo. I still can't go near water.", t: '2026-08-22T08:00' },
        { from: 'me', text: '💙 me neither', t: '2026-08-22T08:14' },
        { from: 'me', text: 'Nadia, I need the truth. in 2008 you told the police Owen was at the car with you the whole time.', t: '2026-09-21T23:40', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "Owen wasn't at the car, V. I was alone at the car. He came running down the path after, out of breath. I said what Julian told us to say. I've never said that out loud.", t: '2026-09-21T23:58', clue: 'nadia_car', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "please don't make me say it in a room full of strangers", t: '2026-09-22T00:02', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'that was the hardest hour of my life. thank you for making it beautiful', t: '2026-10-31T22:03' },
        { from: 'them', text: "V, I was going to stand next to you on the 2nd. I still will. I'm done lying.", t: '2026-11-01T11:30' },
      ],
    },
    {
      id: 'th_mira', contact: 'mira', messages: [
        { from: 'them', text: 'dinner was perfect. you were weird though. are you ok?', t: '2026-10-28T22:05' },
        { from: 'them', text: "also the waiter wrote his number on your receipt and you used it to wipe up hoisin. V. he had FOREARMS. you're a nun. a hot nun, but a nun", t: '2026-10-28T22:07' },
        { from: 'them', text: "I'm going back for his number. for science. and for my vibrator, which deserves a vacation", t: '2026-10-28T22:09' },
        { from: 'me', text: "I'm about to be. nov 2 I'll tell you everything. promise 🖤", t: '2026-10-28T22:20' },
        { from: 'them', text: 'V', t: '2026-11-01T09:02' },
        { from: 'them', text: "they're calling it an accident. a sesame-snap bar from your own bag, sometime between 10:50 and 11:40. you have read every label since you were four, V. you would never.", t: '2026-11-03T21:40', clue: 'planted_bar' },
        { from: 'them', text: "the ME's property list says the pen in your hand was a TRAINER. grey cap. no needle. you have never owned a trainer in your life. where is your real pen??", t: '2026-11-06T14:20', clue: 'trainer_pen' },
        { from: 'them', text: "I'm going to keep texting you until somebody listens.", t: '2026-11-12T23:00' },
      ],
    },
    {
      id: 'th_tess', contact: 'tess', messages: [
        { from: 'them', text: "Thank you for the job, Ms. Lisk. I'll be the best front desk you've ever had.", t: '2026-03-03T09:10' },
        { from: 'me', text: "call me Vera. and Tess — it's ok. I know. give me until November.", t: '2026-03-03T21:40', clue: 'vera_knew' },
        { from: 'them', text: "I don't know what you mean.", t: '2026-03-03T21:52' },
        { from: 'them', text: 'ok.', t: '2026-03-03T21:53' },
        { from: 'them', text: 'clocking out! good luck tonight. the room is perfect', t: '2026-10-31T21:04' },
        { from: 'them', text: "I'm so sorry. I called 911. I'm so sorry.", t: '2026-11-01T07:52' },
        { from: 'them', text: "Mr. Ibarra and Mrs. Price are outside. The police won't let anyone in. The box isn't ticking anymore.", t: '2026-11-02T09:05' },
      ],
    },
    {
      id: 'th_ruth', contact: 'ruth', messages: [
        { from: 'them', text: "Vera, it's Ruth Price. The police gave me Marlow's things in a bag in 2009. His camera is still in it. I never had it developed. I couldn't.", t: '2026-09-13T16:20', clue: 'ruth_camera' },
        { from: 'me', text: "Ruth. Can I come get it? I'll have it developed, and you'll see every frame before anyone else.", t: '2026-09-13T16:45' },
        { from: 'me', text: "there are 24 frames. can I come over tomorrow? not over text. I'm so sorry.", t: '2026-09-19T22:30' },
        { from: 'them', text: 'Thank you for letting me say it all into your microphone. Two hours about him. Nobody lets me do that.', t: '2026-10-26T18:10' },
        { from: 'them', text: 'I saw the donation. Thank you for calling him Marlow.', t: '2026-10-31T20:05' },
        { from: 'them', text: 'We waited at the door. They told us. Oh, Vera.', t: '2026-11-02T09:31' },
      ],
    },
  ],

  photos: [
    { id: 'hp_c5_nadia', art: 'hp_c5_nadia', t: '2026-10-05T22:30', place: "Nadia Fenn's loft", orientation: 'portrait', caption: "Sent by Nadia Fenn. Black lingerie boudoir shot on a velvet chaise, red lamp, a half-eaten pizza on the floor. 'for the anniversary calendar. too much?'", hidden: true },
    { id: 'hp_c5_owen', art: 'hp_c5_owen', t: '2026-10-12T01:15', place: 'Lisk & Key — Room 3', orientation: 'portrait', caption: "Sent by Owen Blake. Shirtless in a lab coat, dramatic red escape-room lighting, holding a giant prop key. 'escape THIS'.", hidden: true },
    { id: 'c5_ph_room9', art: 'c5_ph_room9', t: '2026-10-30T23:50', place: 'Lisk & Key — Room 9', orientation: 'landscape', caption: 'QUARRY, finished. The old bank vault painted quarry-blue, a fibreglass rock ledge jutting out over a pool of rippling blue light. On the far wall, a beige 1970s push-button wall phone. In the corner, a squat steel lockbox with a red LED timer.' },
    { id: 'c5_ph_finalbox', art: 'c5_ph_finalbox', t: '2026-10-31T22:43', place: 'Lisk & Key — Room 9', orientation: 'portrait', caption: "QUARRY's final box, lid open: a foam insert, a red LED display, a strip of tape with handwriting on the lid.", clue: 'phone_room' },
    { id: 'c5_ph_camera', art: 'c5_ph_camera', t: '2026-09-14T15:30', place: "Ruth Price's house", orientation: 'landscape', caption: "A yellow disposable camera on a kitchen table, 'LOW' in silver marker on the body. Beside it, a sheriff's property bag.", clue: 'ruth_camera' },
    { id: 'c5_ph_contact', art: 'c5_ph_contact', t: '2026-09-19T18:10', place: 'Tannery Lofts', orientation: 'landscape', caption: 'A contact sheet of tiny flash-lit frames: a car, bottles, teenagers, black water. One square has been cut out.' },
    { id: 'c5_ph_frame24', art: 'c5_ph_frame24', t: '2026-09-19T18:20', place: 'Tannery Lofts', orientation: 'portrait', caption: "Recovered. Frame 24 of Low's camera, scanned: a flash selfie on a rock ledge at night. Deleted Oct 30.", clue: 'frame24', deletedUntil: 'recovered:photos' },
    { id: 'c5_ph_statement', art: 'c5_ph_statement', t: '2026-10-02T11:00', place: 'Second Look Project', orientation: 'portrait', caption: "Recovered. A photocopied, signed 2008 witness statement from the Harbor County Sheriff's file. Deleted Oct 30.", clue: 'owen_statement', deletedUntil: 'recovered:photos' },
    { id: 'c5_ph_clipping', art: 'c5_ph_clipping', t: '2026-09-25T14:05', place: 'Port Ardent Library', orientation: 'portrait', caption: "Microfiche reader screen: the Harbor Ledger, Aug 24 2008, front page.", clue: 'clipping' },
    { id: 'c5_ph_2008', art: 'c5_ph_2008', t: '2008-08-22T19:40', place: 'Hatch Quarry', orientation: 'landscape', caption: "From Nadia Fenn's Glimpse, 2008. Five teenagers on a car hood at Hatch Quarry, golden hour.", clue: 'red_windbreaker' },
    { id: 'c5_ph_firstaid', art: 'c5_ph_firstaid', t: '2026-10-20T15:00', place: 'Lisk & Key — staff room', orientation: 'landscape', caption: "From Tess's Glimpse. Owen at a staff table with an orange and an auto-injector pen; a second pen beside the first-aid binder.", clue: 'trainer_kit' },
    { id: 'c5_ph_brownies', art: 'c5_ph_brownies', t: '2026-10-31T22:09', place: 'Lisk & Key — control booth', orientation: 'portrait', caption: "Sent by Owen. Two brownies on a paper doily on the control console, a bakery box lid behind them.", clue: 'black_sesame' },
    { id: 'c5_ph_debate', art: 'c5_ph_debate', t: '2026-10-31T23:14', place: "Nadia's apartment", orientation: 'landscape', caption: "From Nadia's Glimpse. A living-room TV showing a debate: two podiums, Julian Ashe mid-sentence.", clue: 'julian_debate' },
    { id: 'c5_ph_abel', art: 'c5_ph_abel', t: '2026-10-12T14:40', place: 'Briar Glen Care', orientation: 'portrait', caption: "An old man's big scarred hands around a paper cup of tea, a care-home blanket over his knees. A visitor sticker on the table." },
  ],

  notes: [
    {
      id: 'n_stage4', title: 'STAGE 4 — for whoever is playing', t: '2026-10-31T22:30', lock: { password: 'pardon', hint: 'My last week before the test. Read it in order — first things first.' }, clue: 'phone_room',
      body: "If you're reading this, you're in Room 9. The real one.\n\nThe box in the vault was never going to hold a letter. Letters get taken. It holds this phone, on a timer, until Hal Ibarra, Ruth Price and Tamsin open it at 9:00 on November 2.\n\nIf you're not them — if something went wrong — then you're the player now. I'm sorry. Here is the rest of the room.\n\nStage 1 was the wall phone. Stage 2 was my calendar. You did those.\nStage 3: Recently Deleted. I hid frame 24 and Owen's statement there in case he got to this phone before you. He doesn't know how to dig.\nStage 5: I wrote a letter I never sent. Dig through the mail.\nStage 6: my confession. The password is the name we buried with a lie.\n\nIt was never about punishing anyone. It was about the man who went into the water.",
    },
    {
      id: 'n_confession', title: 'THE CONFESSION', t: '2026-10-31T22:38', lock: { password: 'abeldunn', hint: 'The name we buried with a lie. First and last, no space.' }, clue: 'confession',
      body: "Vera Lisk — October 31, 2026\n\nOn August 22, 2008, five of us went to Hatch Quarry: me, Julian Ashe, Nadia Fenn, Owen Blake and Marlow Price. Low. We had two bottles of my father's rum.\n\nNobody chased us. There was no dog. There was no flashlight until afterwards.\n\nLow and Owen climbed out onto the Pulpit. Nadia was at the car. Julian and I were on the rocks below. I heard Low laughing, and then I didn't.\n\nAbel Dunn, the caretaker, came running down the path with a flashlight when he heard us screaming. He went into the water in his boots. He went under three times. He came out without Low and sat on the rocks and shook.\n\nJulian said: if they find out we were drinking up there, our lives are over. Say the caretaker chased us. We all said it. I said it into a tape recorder, and a man went to prison for eleven years for trying to save my friend.\n\nUntil this September I didn't know Owen was on the ledge. He told us he'd been at the car. Low's camera says otherwise. Frame 24.\n\nI'm not asking anyone to forgive me. I'm asking a court to give Abel Dunn his name back.\n\nTamsin — I'm sorry. Your father is the bravest person I have ever met, and I only met him once.",
    },
    { id: 'n_room9', title: 'QUARRY — room flow v7', t: '2026-10-30T23:55', body: "1 THE CAR — Nadia's lock. a car radio tuned to the song that was playing.\n2 THE PATH — find the flashlight. there is no flashlight. that's the point.\n3 THE PULPIT — the ledge. frame 24 lightbox (Owen begged. it stays.)\n4 THE WATER — names on the rocks.\n5 THE WALL PHONE — say his name.\n6 FINAL BOX — timer, opens Nov 2 09:00. contents: (don't write it down here)\n\nruntime 60 min. players will cry at 3. that's fine." },
    { id: 'n_labels', title: 'sesame — other names', t: '2025-06-02T12:10', body: "benne · gingelly · til · tahini · simsim · black sesame · 'natural flavouring' (ask)\n\nCHECK EVERYTHING. halva, bagels, hummus, half of all brownies now.\nPen: yellow cap, bag, always. Spare in the booth first-aid box.\nWho knows: Mira, Owen, Tess." },
  ],

  mail: [
    { id: 'm_memorial', from: 'Hatch Quarry Memorial Fund', fromAddr: 'thanks@hatchmemorial.example', to: 'Vera Lisk', subject: 'Thank you for your gift', t: '2026-10-31T20:02', folder: 'inbox', body: 'Dear Vera,\n\nThank you for your gift of $1,000 in memory of Marlow J. Price (1991–2008).\n\nYour donation funds the lifeguard program and the new safety fencing at the Pulpit ledge.\n\nWith gratitude,\nThe Hatch Quarry Memorial Fund' },
    { id: 'm_intake', from: 'Vera Lisk', fromAddr: 'vera@liskandkey.example', to: 'Second Look Project — Intake', subject: 'State v. Abel Dunn (2009) — new evidence', t: '2026-10-01T09:12', folder: 'sent', clue: 'intake', body: "To whoever reads this,\n\nMy name is Vera Lisk. In August 2008, at seventeen, I gave a false statement to the Harbor County Sheriff that helped convict Abel Dunn of manslaughter in the death of Marlow Price.\n\nMr. Dunn did not chase us. Three other witnesses gave the same false account; we agreed on it that night.\n\nI also have new physical evidence: Marlow's own disposable camera, never developed until last month.\n\nI will make a full public statement on November 2.\n\nVera Lisk" },
    { id: 'm_firstaid', from: 'Owen Blake', fromAddr: 'owen@liskandkey.example', to: 'Staff', subject: 'First aid refresher — done ✔', t: '2026-10-20T17:02', folder: 'inbox', clue: 'trainer_kit', body: "Thanks all — everyone's certified for another year.\n\nKit restocked. The two TRAINER pens (grey caps, TRAINER on the barrel, no needle, no drug) are back in my desk drawer so nobody grabs one by mistake.\n\nVee's real pen lives in her bag — yellow cap — and the spare is in the booth first-aid box. Everyone knows where they are? Good.\n\nOwen" },
    { id: 'm_cease', from: 'Marsh & Calder LLP', fromAddr: 'tcalder@marshcalder.example', to: 'Vera Lisk', subject: 'Cease and desist — Julian Ashe', t: '2026-10-27T09:10', folder: 'inbox', clue: 'julian_threat', body: "Ms. Lisk,\n\nThis firm represents Julian Ashe. We are informed that your business intends to open an attraction depicting the events of August 22, 2008 in a manner defamatory to our client.\n\nAny public depiction of Mr. Ashe will be met with immediate legal action against you personally and against Lisk & Key LLC.\n\nT. Calder" },
    { id: 'm_latchly', from: 'Latchly', fromAddr: 'reports@latchly.example', to: 'Vera Lisk (owner)', subject: 'Daily activity — Lisk & Key front door — Oct 31', t: '2026-11-01T00:05', folder: 'inbox', clue: 'latchly_owen', body: "LISK & KEY — FRONT DOOR — SAT OCT 31\n\n12:02  Unlocked — Tess M. (staff)\n15:31  Unlocked — Owen B. (owner)\n17:24  Locked — Owen B. (owner)\n19:18  Unlocked — Vera L. (owner)\n20:46  Unlocked — Tess M. (staff) · 3 guests\n21:04  Locked — Tess M. (staff)\n22:05  Unlocked — Owen B. (owner)\n22:06  Locked — Owen B. (owner)\n23:20  Unlocked — Owen B. (owner)\n23:31  Locked — Owen B. (owner)\n\nNo further activity." },
    { id: 'm_tessapp', from: 'Tess Moreau', fromAddr: 'tess.moreau@mailbox.example', to: 'Lisk & Key — Jobs', subject: 'Application — front desk', t: '2026-02-26T19:44', folder: 'inbox', clue: 'staff_contact', body: "Hello,\n\nI'd like to apply for the front desk position. I've played every room you've built. Room 4 (the lighthouse) made me call my dad from the parking lot.\n\nName: Tess Moreau\nAvailability: any\nEmergency contact: A. Dunn (father) — Briar Glen Care, Room 14\n\nThank you,\nTess" },
    { id: 'm_abel', from: 'Vera Lisk', fromAddr: 'vera@liskandkey.example', to: 'Abel Dunn c/o Briar Glen Care, Room 14', subject: 'Mr. Dunn', t: '2026-10-12T21:30', folder: 'sent', clue: 'abel_rescue', deletedUntil: 'recovered:mailpurge', body: "Dear Mr. Dunn,\n\nI visited you today. You didn't know who I was, and I didn't tell you. You asked the nurse twice whether the boy got out of the water.\n\nHe didn't. But you went in after him. In your boots, in the dark, three times. You were soaked to the chest because you tried to save him.\n\nWe told the police you were wet because you chased him in. I was seventeen and I was scared, and that is not an excuse for eighteen years.\n\nOn November 2 I'm going to say it out loud, where everyone can hear.\n\nVera Lisk" },
  ],

  calls: [
    { contact: 'mira', t: '2026-11-03T21:35', dir: 'missed' },
    { contact: 'ibarra', t: '2026-11-02T09:19', dir: 'missed' },
    { contact: 'julian', t: '2026-11-01T10:10', dir: 'missed' },
    { contact: 'mira', t: '2026-11-01T09:01', dir: 'missed' },
    { contact: 'owen', t: '2026-11-01T08:20', dir: 'missed' },
    { contact: 'owen', t: '2026-11-01T07:57', dir: 'missed' },
    { contact: 'tess', t: '2026-11-01T07:44', dir: 'missed' },
    { contact: 'julian', t: '2026-10-30T20:59', dir: 'missed' },
    { contact: 'owen', t: '2026-10-29T23:38', dir: 'missed' },
    { contact: 'ibarra', t: '2026-10-02T10:00', dir: 'out', duration: '22:40' },
    { contact: 'ruth', t: '2026-09-13T16:10', dir: 'missed' },
  ],

  voicemails: [
    { id: 'vm_ruth', contact: 'ruth', t: '2026-09-13T16:11', duration: '0:28', voice: { pitch: 0.92, rate: 0.82, female: true }, clue: 'ruth_camera', transcript: "Vera, this is Ruth Price. Marlow's mother. I heard what you're building. I have something of his I've never been able to look at. A little yellow camera. Twenty-four pictures, the man at the drugstore said, if they're still good. I think it should be you. Call me back, dear." },
    { id: 'vm_julian', contact: 'julian', t: '2026-10-30T21:00', duration: '0:21', voice: { pitch: 0.85, rate: 1.1, female: false }, clue: 'julian_threat', transcript: "Vera. Julian. You think this is brave? It's vandalism. You're going to set fire to four lives so you can feel clean. I'll be at your test tomorrow because Nadia begged me. After that, if it opens, I'll bury you. Ask yourself who that room actually helps." },
    { id: 'vm_owen', contact: 'owen', t: '2026-10-29T23:40', duration: '0:38', voice: { pitch: 0.95, rate: 0.95, female: false }, clue: 'owen_vm', deletedUntil: 'recovered:voice', transcript: "Vee. It's me. I've been driving around. Please don't put frame twenty-four in the room. It was dark, we were seventeen, I grabbed for him — I grabbed for him, Vee, and I missed, or I didn't, I don't know anymore. Julian said say the caretaker and we all just... November second ends everything. Me, the business, you. Please. Call me back." },
    { id: 'vm_mira', contact: 'mira', t: '2026-10-28T18:40', duration: '0:12', voice: { pitch: 1.15, rate: 1.15, female: true }, transcript: "Running ten late! Parking down here is a fucking war crime. Order me the pho with no — you know. You always know. Love you, weirdo." },
    { id: 'vm_ibarra', contact: 'ibarra', t: '2026-11-02T09:20', duration: '0:25', voice: { pitch: 0.8, rate: 0.9, female: false }, transcript: "Ms. Lisk, Hal Ibarra, Second Look. Mrs. Price and I are at the door, nine o'clock, as you asked. There's police tape. They — I'm so sorry. If anyone ever finds whatever was in that box, I want it. Abel Dunn has waited long enough." },
  ],

  map: {
    art: 'map_c5',
    places: [
      { id: 'bank', name: 'Lisk & Key (old Harbor Savings Bank)', x: 0.42, y: 0.56 },
      { id: 'quarry', name: 'Hatch Quarry — the Pulpit', x: 0.84, y: 0.16 },
      { id: 'lofts', name: 'Tannery Lofts (home)', x: 0.22, y: 0.40 },
      { id: 'ruth', name: "Ruth Price's house", x: 0.62, y: 0.74 },
      { id: 'photolab', name: 'Fenwick St PhotoLab', x: 0.30, y: 0.68 },
      { id: 'briar', name: 'Briar Glen Care', x: 0.90, y: 0.82 },
      { id: 'kprt', name: 'KPRT studios', x: 0.12, y: 0.86 },
      { id: 'bakery', name: 'Kettle & Crumb', x: 0.52, y: 0.40 },
    ],
    stops: [
      { t: '2026-08-22T06:10', place: 'quarry', detail: 'Sunrise — 1h 20m' },
      { t: '2026-09-14T15:00', place: 'ruth', detail: '1h 40m' },
      { t: '2026-09-16T12:10', place: 'photolab', detail: 'Film drop-off — 8 min' },
      { t: '2026-09-19T17:30', place: 'photolab', detail: 'Pickup — 6 min' },
      { t: '2026-10-12T14:00', place: 'briar', detail: 'Visiting hours — 52 min' },
      { t: '2026-10-26T14:00', place: 'ruth', detail: 'Recording — 2h 05m' },
      { t: '2026-10-31T19:18', place: 'bank', detail: 'Arrived' },
      { t: '2026-10-31T22:44', place: 'bank', detail: 'LAST MOVEMENT — device stationary inside Room 9 until battery died Nov 3, 23:12', clue: 'phone_room' },
    ],
  },

  browser: [
    { t: '2026-10-31T22:31', title: 'timer lockbox — does it stay locked if power is cut', url: 'search?q=timer+lockbox+power+cut+stays+locked' },
    { t: '2026-10-31T19:02', title: 'KPRT live: Harbor County DA debate tonight, 10:30 PM', url: 'kprt.example/live/da-debate' },
    { t: '2026-10-27T23:10', title: 'Julian Ashe for District Attorney — "Truth Matters"', url: 'ashefor.example/about' },
    { t: '2026-10-14T22:40', title: 'false statement to police as a minor 2008 — statute of limitations', url: 'search?q=false+statement+minor+statute+of+limitations' },
    { t: '2026-10-01T08:30', title: 'Second Look Project — wrongful conviction intake', url: 'secondlook.example.org/intake' },
    { t: '2026-09-19T21:00', title: 'enhance underexposed flash photo at night', url: 'search?q=enhance+underexposed+flash+photo' },
    { t: '2026-09-14T22:15', title: 'developing 18 year old disposable camera film', url: 'search?q=develop+18+year+old+disposable+film' },
    { t: '2025-06-02T12:00', title: 'sesame other names — benne, gingelly, til, tahini', url: 'search?q=sesame+other+names' },
  ],

  glimpse: [
    { id: 'g_teaser', author: 'me', photo: 'c5_ph_room9', caption: "QUARRY opens Nov 2. It's about something I should have said eighteen years ago.", t: '2026-10-30T09:00', likes: 2210, comments: [{ author: 'tess', text: "it's the best one" }, { author: 'owen', text: '🖤' }, { author: 'ruth', text: "I'll be there at nine." }] },
    { id: 'g_tbt', author: 'nadia', photo: 'c5_ph_2008', caption: '#tbt 18 years. miss you every day, Low 🌊', t: '2026-08-22T07:58', likes: 64, comments: [{ author: 'me', text: '💙' }, { author: 'julian', text: 'Take this down, Nadia.' }], clue: 'red_windbreaker' },
    { id: 'g_firstaid', author: 'tess', photo: 'c5_ph_firstaid', caption: 'staff first aid day! Owen demonstrating the EpiPen trainer on a very brave orange 🍊', t: '2026-10-20T15:20', likes: 37, comments: [{ author: 'owen', text: 'the orange survived' }, { author: 'mira', text: 'that orange has been stabbed more gently than my last three dates went' }], clue: 'trainer_kit' },
    { id: 'g_debate', author: 'nadia', photo: 'c5_ph_debate', caption: 'watching J eat his opponent alive on live TV 🍿 boxed wine, sweatpants, zero dignity. after the strangest hour of my life', t: '2026-10-31T23:15', likes: 19, comments: [{ author: 'julian', text: 'thanks for watching' }, { author: 'mira', text: 'he looks like a Ken doll that passed the bar' }], clue: 'julian_debate' },
  ],

  bank: {
    account: 'Harbor Mutual ••3119',
    balance: 4210.55,
    tx: [
      { t: '2026-10-31T20:01', desc: 'HATCH QUARRY MEMORIAL FUND — "in memory of Marlow"', amount: -1000.00 },
      { t: '2026-10-31T18:40', desc: 'HARBOR GROCER — APPLES, RICE CAKES', amount: -11.60 },
      { t: '2026-10-30T00:00', desc: 'LISK & KEY LLC — OWNER DRAW', amount: 3200.00 },
      { t: '2026-10-28T21:30', desc: 'PHO SAIGON', amount: -42.10 },
      { t: '2026-10-25T11:20', desc: 'HOME DEPOT — CHALK PAINT, QUARRY BLUE', amount: -63.18 },
      { t: '2026-10-12T13:50', desc: 'BRIAR GLEN GIFT SHOP', amount: -18.00 },
      { t: '2026-10-01T09:00', desc: 'SECOND LOOK PROJECT — DONATION', amount: -500.00 },
      { t: '2026-09-16T12:12', desc: 'FENWICK ST PHOTOLAB — 35MM DEV + HI-RES SCAN', amount: -24.00 },
    ],
  },

  calendar: [
    { id: 'c5_c_open', t: '2026-11-02T09:00', title: 'QUARRY opens', detail: 'Hal + Ruth + Tess at the door, 9:00. Box opens itself.' },
    { id: 'c5_c_test', t: '2026-10-31T21:00', title: 'QUARRY — private test', detail: 'J · N · O. 60 min. no phones in the room.' },
    { id: 'c5_c_n', t: '2026-10-30T22:00', title: 'Nail down the ledge prop + full reset', detail: 'lightbox for 24. last run.' },
    { id: 'c5_c_o', t: '2026-10-29T20:00', title: 'Owen — in person, 8pm', detail: 'his place. no more texts.' },
    { id: 'c5_c_d', t: '2026-10-28T19:30', title: 'Dinner w/ Mira 🍜', detail: "Pho Saigon. don't tell her yet." },
    { id: 'c5_c_r', t: '2026-10-27T19:00', title: 'Rehearse the final box timer', detail: 'test power-cut behaviour' },
    { id: 'c5_c_a', t: '2026-10-26T14:00', title: "Audio — Ruth's interview", detail: 'her kitchen. bring tissues.' },
    { id: 'c5_c_p', t: '2026-10-25T10:00', title: 'Paint the vault wall — quarry blue', detail: 'two coats' },
    { id: 'c5_c_aid', t: '2026-10-20T14:00', title: 'Staff first aid — Owen runs it', detail: 'trainer pens + CPR dummy' },
    { id: 'c5_c_briar', t: '2026-10-12T14:00', title: 'Briar Glen — visiting 2–4', detail: 'Room 14. just look at him. say nothing.' },
  ],

  wifi: [
    { name: 'LiskKey_Staff', lastJoined: '2026-11-03T23:12' },
    { name: 'Q9_FINALBOX', lastJoined: '2026-10-31T22:44', clue: 'phone_room' },
    { name: 'TanneryLofts_4B', lastJoined: '2026-10-31T18:50' },
    { name: 'PRICE-FAMILY', lastJoined: '2026-10-26T14:02' },
    { name: 'BriarGlen_Guest', lastJoined: '2026-10-12T14:03' },
    { name: 'PhotoLab_Free', lastJoined: '2026-09-19T17:31' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve image fragments from unallocated flash storage.', needs: ['unlocked'], durationMs: 5200 },
    { id: 'voice', label: 'Voicemail — Carrier Cache', detail: 'Pull deleted voicemail audio from the carrier sync cache.', needs: ['pinned:owen_statement'], needsHint: 'Need a lead first: pin what Owen Blake told police in 2008.', durationMs: 6000 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: 'Rebuild deleted SMS records from the database write-ahead log.', needs: ['pinned:frame24'], needsHint: 'Need a lead first: pin the missing 24th frame from Low\'s camera.', durationMs: 7000 },
    { id: 'mailpurge', label: 'Mail — Purged Messages', detail: 'Recover permanently deleted mail from the local mail store journal.', needs: ['note:n_stage4'], needsHint: "Need a lead first: open Vera's Stage 4 note.", durationMs: 6200 },
  ],

  clues: [
    { id: 'frame24', title: 'Frame 24', text: "Low's reversed-camera selfie on the Pulpit ledge, 2008. Behind his shoulder: a red sleeve lettered HATCH XC.", kind: 'object', art: 'c5_ph_frame24' },
    { id: 'owen_statement', title: "Owen, 2008: 'at the car'", text: "Owen's sworn 2008 statement: 'I was at the car with Nadia the whole time... saw a flashlight coming down the path.'", kind: 'document', art: 'c5_ph_statement' },
    { id: 'red_windbreaker', title: 'The red windbreaker', text: "2008 photo of the five friends on a car hood. Owen wears a red windbreaker with 'HATCH XC' on the sleeve.", kind: 'object', art: 'c5_ph_2008' },
    { id: 'nadia_car', title: "Nadia: 'I was alone at the car'", text: "Deleted text: Owen was never at the car. He came running down the path after. 'I said what Julian told us to say.'", kind: 'person', art: 'av_c5_nadia' },
    { id: 'owen_confront', title: "Vera: 'you're in frame 24'", text: "Deleted texts, Oct 28: Vera tells Owen he's on the ledge in frame 24. He begs her to keep it out of the room.", kind: 'event', art: 'av_c5_owen' },
    { id: 'owen_vm', title: "Owen: 'I grabbed for him'", text: "Deleted voicemail, Oct 29: 'I grabbed for him, Vee, and I missed, or I didn't... November second ends everything.'", kind: 'event', art: 'av_c5_owen' },
    { id: 'black_sesame', title: "'The dark one's yours'", text: "Owen left Vera a brownie at 22:10. The sticker on the box: KETTLE & CRUMB — BLACK SESAME + HONEY.", kind: 'object', art: 'c5_ph_brownies' },
    { id: 'booth_restock', title: 'Owen restocked the booth', text: "Oct 31, 17:20: Owen 'restocked the first-aid box in the booth' — where Vera's spare pen lived.", kind: 'event' },
    { id: 'trainer_kit', title: "Trainer pens: Owen's drawer", text: "Owen's staff email: the grey-capped TRAINER pens (no needle, no drug) live in his desk drawer.", kind: 'document', art: 'c5_ph_firstaid' },
    { id: 'trainer_pen', title: 'A trainer in her hand', text: "The ME's property list: the auto-injector in Vera's hand was a TRAINER. Grey cap. No needle. She never owned one.", kind: 'object' },
    { id: 'planted_bar', title: 'The sesame-snap bar', text: "Police found a sesame-snap bar in her bag. Vera read every label since she was four. Death between 22:50 and 23:40.", kind: 'object' },
    { id: 'latchly_owen', title: 'Front door: Owen, 23:20', text: 'Smart-lock log: Owen left at 22:05 — then unlocked the front door again at 23:20 and left at 23:31. Tess left at 21:04 and never returned.', kind: 'event' },
    { id: 'julian_threat', title: "Julian: 'I will bury you'", text: 'Julian Ashe threatened Vera by text, voicemail and lawyer to keep QUARRY closed.', kind: 'person', art: 'av_c5_julian' },
    { id: 'chase_story', title: "Julian: 'It was my idea'", text: "Julian: 'The caretaker story kept four kids out of prison. It was my idea and it WORKED.'", kind: 'person', art: 'av_c5_julian' },
    { id: 'julian_debate', title: 'Julian live on KPRT', text: "Nadia's post: Julian at the podium on KPRT's live DA debate, on-screen bug 'LIVE 11:14 PM'.", kind: 'place', art: 'c5_ph_debate' },
    { id: 'tess_tamsin', title: "'My name is Tamsin Dunn'", text: "The unknown number: 'My name isn't Tess Moreau. It's Tamsin Dunn. Abel Dunn is my father.'", kind: 'person', art: 'av_unknown' },
    { id: 'staff_contact', title: "Tess's emergency contact", text: "Tess's job application: 'Emergency contact: A. Dunn (father) — Briar Glen Care, Room 14.'", kind: 'document' },
    { id: 'vera_knew', title: "Vera: 'I know. give me until November'", text: "The night Tess was hired, Vera told her she knew — and asked her to wait until November.", kind: 'person', art: 'av_c5_tess' },
    { id: 'clipping', title: "'Caretaker held'", text: "Harbor Ledger, 2008: Abel Dunn found 'soaked to the chest at the water's edge'; four teens say he chased them.", kind: 'document', art: 'c5_ph_clipping' },
    { id: 'abel_rescue', title: 'He went into the water', text: "Vera's unsent letter: Abel Dunn went in after Low three times, in his boots. He was wet because he tried to save him.", kind: 'document' },
    { id: 'confession', title: "Vera's confession", text: "Vera's locked confession, dated Oct 31: her account of the night of Aug 22, 2008, and the story the four of them told.", kind: 'document' },
    { id: 'phone_room', title: 'The phone is the room', text: "Vera locked her own phone inside QUARRY's final box at 22:44, timed to open for Ibarra, Ruth and Tamsin on Nov 2.", kind: 'object', art: 'c5_ph_finalbox' },
    { id: 'intake', title: "Vera: 'I gave a false statement'", text: 'Vera to the Second Look Project, Oct 1: her 2008 statement helped convict an innocent man.', kind: 'document' },
    { id: 'ruth_camera', title: "Low's camera", text: "Low's mother kept his undeveloped disposable camera for 18 years, and gave it to Vera in September.", kind: 'object', art: 'c5_ph_camera' },
  ],

  questions: [
    {
      id: 'q_death', prompt: 'How did Vera Lisk die?',
      options: [
        { id: 'accident', label: 'Accident — she ate a sesame snack from her own bag' },
        { id: 'suicide', label: 'She took her own life before the opening' },
        { id: 'murder', label: 'Murder — fed black sesame, her EpiPen swapped for a trainer' },
        { id: 'heart', label: 'A heart condition nobody knew about' },
      ],
      answer: 'murder', evidence: ['trainer_pen', 'planted_bar', 'black_sesame', 'trainer_kit', 'booth_restock'],
      explain: "The pen in her hand was a needle-less trainer, the brownie left for her was black sesame, and a woman who read every label 'ate' a sesame-snap bar nobody saw her buy.",
    },
    {
      id: 'q_quarry', prompt: 'What really happened on the Pulpit ledge in 2008?',
      options: [
        { id: 'chase', label: 'Abel Dunn chased them and Low fell' },
        { id: 'owen', label: 'Owen was on the ledge with Low when he fell; the chase was invented' },
        { id: 'dare', label: 'Vera dared Low to jump' },
        { id: 'alone', label: 'Low climbed up alone and slipped' },
      ],
      answer: 'owen', evidence: ['frame24', 'nadia_car', 'owen_vm', 'owen_confront', 'red_windbreaker', 'confession', 'chase_story', 'owen_statement'],
      explain: "Frame 24 puts a red HATCH XC sleeve right behind Low. Nadia was alone at the car. Julian admits the caretaker story was his idea.",
    },
    {
      id: 'q_abel', prompt: 'What did Abel Dunn actually do that night?',
      options: [
        { id: 'chase', label: 'Chased the teenagers with a flashlight and a dog' },
        { id: 'absent', label: 'He was never at the quarry' },
        { id: 'rescue', label: 'Went into the water to try to save Low' },
        { id: 'hid', label: 'Called the police and stayed out of sight' },
      ],
      answer: 'rescue', evidence: ['abel_rescue', 'confession'],
      explain: "He came running when he heard screaming and went under three times. He was soaked to the chest because he tried.",
    },
    {
      id: 'q_killer', prompt: 'Who killed Vera Lisk?',
      options: [
        { id: 'owen', label: 'Owen Blake', art: 'av_c5_owen' },
        { id: 'julian', label: 'Julian Ashe', art: 'av_c5_julian' },
        { id: 'nadia', label: 'Nadia Fenn', art: 'av_c5_nadia' },
        { id: 'tess', label: 'Tess Moreau', art: 'av_c5_tess' },
        { id: 'none', label: 'No one — it was an accident' },
      ],
      answer: 'owen', evidence: ['latchly_owen', 'black_sesame', 'trainer_kit', 'booth_restock', 'owen_vm', 'frame24', 'owen_confront'],
      explain: "Owen kept the trainer pens, restocked the booth that afternoon, left her the black-sesame brownie — and let himself back in at 23:20, inside the death window. Frame 24 was his motive.",
    },
    {
      id: 'q_julian', prompt: 'Where was Julian Ashe while Vera was dying?',
      options: [
        { id: 'bank', label: 'Back inside the bank building' },
        { id: 'tv', label: "On stage at KPRT's live DA debate" },
        { id: 'home', label: 'Asleep at home' },
        { id: 'nadia', label: "At Nadia's apartment" },
      ],
      answer: 'tv', evidence: ['julian_debate'],
      explain: "He invented the 2008 lie and threatened Vera — but at 11:14 PM he was live on television, and the front door log never shows him again after 22:05.",
    },
    {
      id: 'q_tess', prompt: 'Who is Tess Moreau — and who was QUARRY built for?',
      options: [
        { id: 'reporter', label: 'An undercover reporter' },
        { id: 'spy', label: "A spy for Julian's campaign" },
        { id: 'tamsin', label: "Tamsin Dunn, Abel Dunn's daughter — the room was for her" },
        { id: 'sister', label: "Low Price's younger sister" },
      ],
      answer: 'tamsin', evidence: ['tess_tamsin', 'staff_contact', 'vera_knew'],
      explain: "Her emergency contact is 'A. Dunn (father), Briar Glen, Room 14'. Vera knew from day one, and labelled the final box FOR HAL · RUTH · TAMSIN.",
    },
  ],

  events: [
    { id: 'e5_unk1', kind: 'text', when: ['unlocked'], minPins: 3, delayMs: 4500, thread: 'th_c5unknown', contact: 'c5unknown', text: 'You got into her phone. She said someone would. Did she leave anything for me?' },
    { id: 'e5_h_trainer', kind: 'handler', when: ['pinned:trainer_pen'], delayMs: 3000, text: "I pulled the ME's property list myself. Grey cap, TRAINER on the barrel, no needle, no drug. It's a prop. You could jab a horse with it and the horse would just look at you, disappointed. Where does a pen like that come from?" },
    { id: 'e5_unk2', kind: 'text', when: ['recovered:photos'], minPins: 8, delayMs: 6000, thread: 'th_c5unknown', contact: 'c5unknown', text: "My name isn't Tess Moreau. It's Tamsin Dunn. Abel Dunn is my father. He's seventy-one and he still asks the nurses if the boy got out of the water.", clue: 'tess_tamsin' },
    { id: 'e5_h_owen', kind: 'handler', when: ['pinned:latchly_owen'], delayMs: 3500, text: "For the file: Owen Blake told detectives he drove straight home at 22:05 and heard about Vera from Tess at 07:50. The detectives wrote that down and went to lunch. Put that next to the lock log." },
    { id: 'e5_unk3', kind: 'text', when: ['note:n_confession'], delayMs: 5000, thread: 'th_c5unknown', contact: 'c5unknown', text: "She told me in March she knew who I was. 'Give me until November.' I thought she meant she'd fire me nicely." },
    { id: 'e5_h_ready', kind: 'handler', when: ['unlocked'], minPins: 16, delayMs: 3000, text: "She built a room and we're the only ones who finished it. When every answer has a pin behind it, open the Case Report. Then I'm getting shitfaced and you're buying." },
  ],

  hints: [
    { until: 'unlocked', text: "Six digits, one word: say his name. 'Low' was a nickname — a lock-screen notification uses his real one. Dial it on the keypad letters (ABC = 2, DEF = 3…)." },
    { until: 'note:n_stage4', after: ['unlocked'], text: "Stage 4 wants 'my last week before the test'. Open Calendar and read Oct 25 to Oct 30 in order. First things first — first letters." },
    { until: 'recovered:photos', after: ['unlocked'], text: "Vera hid things on purpose. The contact sheet has a hole where frame 24 should be. Run TRACE Photos." },
    { until: 'pinned:owen_statement', after: ['recovered:photos'], text: 'One recovered photo is a 2008 witness statement. Read whose it is, and pin it.' },
    { until: 'recovered:voice', after: ['pinned:owen_statement'], text: 'Owen called Vera late on Oct 29 and she missed it. TRACE the voicemail cache.' },
    { until: 'recovered:msgfrag', after: ['pinned:frame24'], text: "Someone else was at the quarry in 2008 and remembers it differently. TRACE the deleted messages." },
    { until: 'recovered:mailpurge', after: ['note:n_stage4'], text: 'Stage 5: a letter she never sent. TRACE the purged mail.' },
    { until: 'note:n_confession', after: ['note:n_stage4'], text: "'The name we buried with a lie.' The 2008 clipping names the man they blamed. First and last name, no space." },
    { until: 'pinned:trainer_pen', after: ['unlocked'], text: 'Her sister kept texting after she died. Read what the medical examiner found in Vera\'s hand.' },
    { until: 'pinned:black_sesame', after: ['unlocked'], text: 'Someone left Vera something to eat that night. Zoom in on the sticker.' },
    { until: 'pinned:latchly_owen', after: ['unlocked'], text: "The front door has a smart lock that emails the owner every night. Who came back after 22:05?" },
    { until: 'pinned:julian_debate', after: ['pinned:julian_threat'], text: 'Julian threatened her. Where was he between 22:50 and 23:40? Nadia was watching something.' },
    { until: 'pinned:tess_tamsin', after: ['recovered:photos'], text: "Who is Tess, really? Her job application has an emergency contact. Keep pinning — the unknown number is working up the nerve." },
    { until: 'report:filed', after: ['unlocked'], text: 'Her last room has six locks. Open the Case Report and back every answer with a pinned clue.' },
  ],

  handlerIntro: "Last case on my desk this year, and it came out of a locked box. Escape rooms. Fuck me. People pay forty bucks to get locked in a closet with their coworkers. I get that for free at the precinct, plus the smell. The partner says her final codes were always a word on a phone keypad. Look at the first wall you see.",

  epilogue: {
    solved: [
      "Owen Blake was arrested on November 21 at Lisk & Key, resetting Room 3 for a birthday party. In his desk drawer, under the staff first-aid binder: a yellow-capped EpiPen, never used, with Vera's name on the pharmacy label. In his car door: a Kettle & Crumb receipt from 15:52 on October 31. Black sesame & honey brownie, ×2.",
      "He said he only meant to make her sick — sick enough to postpone November 2, sick enough to listen. He came back at 23:20 'to check on her.' He didn't call anyone. He took the bakery box, put a sesame-snap bar in her bag, and went home to wait for Tess's call. Her phone was in a steel box on the other side of the vault wall, counting down to a morning she'd planned for eight months.",
      "Frame 24 and Nadia Fenn's new statement reopened the 2008 file. Owen admitted he was on the Pulpit when Low fell. Whether he grabbed for him or pushed, he says he doesn't know. The detectives believed him about that, and about nothing else.",
      "Julian Ashe withdrew from the district attorney's race on live television, from the same KPRT studio that had been his alibi. 'The caretaker story was my idea,' he said. 'I was seventeen. I've been a coward ever since.'",
      "In February a Harbor County judge vacated Abel Dunn's conviction. Tamsin read the ruling to her father in the common room at Briar Glen. He asked, the way he always did, whether the boy got out of the water. This time she told him the truth: 'No, Dad. But you went in. Everybody knows you went in.'",
      "QUARRY opened in the spring, run by Tamsin Dunn, with Ruth Price's blessing. The last puzzle is a beige wall phone. You dial his name, and the box opens. Inside is a card in Vera's handwriting: 'You got out. He didn't. Tell the truth sooner than I did.'",
    ],
    partial: [
      'Your report went upstairs with holes in it.',
      "An accident is the easiest word in the world to sign. If the board can't say who put a trainer pen in her hand, Vera Lisk stays a sad story about a food label, and the man who went into the water for Low Price dies with a conviction that was never his.",
      'She built you a room. Go back in. Start at 23:20.',
    ],
  },
};
