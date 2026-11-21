import type { CaseFile } from '../types';

// CASE 08 — BALL PIT
// Dale Hupp, 47, self-certified "10th Dan Grandmaster" of Hupp's Freestyle Karate,
// Unit 4, Sunvale Plaza. Feuding with Brenda Kowalczyk (Iron Lotus, Unit 11) over the
// plaza's single martial-arts lease: renewal goes to whoever has fewer complaints on
// file Monday Sept 14 (Hupp 11, Lotus 2 — nine of Dale's are from Ronnie Duquette,
// owner of Jumpin' Jax Party Palace, Unit 5).
// Plan ("Operation Ball Pit"): Ronnie is at a casino all weekend and Jax is shut. Dale
// goes down the roof HVAC hatch over Unit 5 on a "rope" of six $8.99 novelty "10th Dan"
// black belts knotted by his only adult student Corey Platt, wearing an IRON LOTUS
// hoodie Corey bought for him, trashes the bounce castle for Ronnie's security camera,
// Ronnie complains about Lotus, Lorraine boots Brenda. The camera is a $14 dummy.
// Brenda gets arrested at 23:58 for drunk-driving her riding mower home from the
// Antler Lodge pig roast — she is in Haskett County Jail all night.
// 01:46: the third belt tears at Corey's knot. Dale falls ~4 m onto the steel rim of the
// ball pit and dies. Corey leaves a panicked voicemail at 01:53, flees, and at 03:12
// deletes it by dialling in with Dale's universal PIN (0808) — because Dale had told him
// "if anything happens to me delete my voicemails". Sunday 09:31 Corey claims he was
// home all night with his mom. Ronnie finds the body at 07:52.
// Twist: no murder. The Grandmaster was killed by his own fake black belt, mid frame-job,
// in front of a camera that wasn't real. The prime suspect was in jail.

export const case8: CaseFile = {
  id: 'ball-pit',
  number: '08',
  title: 'Ball Pit',
  tagline: 'Two dojos. One parking lot. Four thousand plastic balls and one dead grandmaster.',
  difficulty: 2,
  cover: 'c8_cover',
  owner: { name: 'Dale Hupp', age: 47, summary: "Self-certified 10th Dan Grandmaster of Hupp's Freestyle Karate, Unit 4, Sunvale Plaza. Eleven complaints on file. Zero tournament wins. A ponytail held together by confidence and spite." },
  status: 'DECEASED · IN A BALL PIT',
  deviceCondition: 'BLUE-RASPBERRY SLUSHIE INGRESS · RECOVERED FROM 4,000 PLASTIC BALLS · 89% READABLE',
  briefing: [
    "Dale Hupp, 47. Grandmaster (self-appointed, certificate by mail, $199) of Hupp's Freestyle Karate, Unit 4 of the Sunvale Plaza strip mall — between a vape shop and Jumpin' Jax Party Palace. Home of the Dragon Kick. The banner is spelled 'Freestlye'.",
    "At 07:52 on Sunday, September 13, Jumpin' Jax owner Ronnie Duquette came back from a weekend away, unlocked his shop and found Dale face down in the ball pit, wearing a black ski mask and a hoodie from Iron Lotus Martial Arts, the rival dojo across the parking lot. Head injury. The medical examiner puts death between 01:00 and 03:00. Every door was locked.",
    "Iron Lotus owner Brenda Kowalczyk has threatened Dale in writing, on video and once with a folding chair. The precinct has her name on the whiteboard in big red letters, underlined twice, with a little drawing of a lotus.",
    "His phone was dug out of the ball pit by two deputies and a seven-year-old's birthday party. It's yours now.",
    "His ex-wife Crystal: \"His passcode? The belts on his Wall of Excellence. He made me memorize it on our honeymoon instead of, you know, the honeymoon. 'Count the tape stripes on each belt, Crystal, in the order I earned them.' He never earned a single one of those belts, but sure, Dale. Sure.\"",
  ],
  phoneDate: '2026-09-16',
  phoneTime: '10:15',
  lock: {
    passcode: '4169',
    hint: 'count the tape stripes on each belt, in the order he "earned" them (not the order they hang)',
    wallpaper: 'c8_wall_lock',
    notifications: [
      { app: 'messages', title: 'Senpai Corey 🐉', text: 'SENSEI the rank poster came!! 🥋 white → yellow → brown → black, just like u earned em. hung it by the water fountain next to the dent', t: '2026-09-11T16:20' },
      { app: 'messages', title: 'Crystal — DO NOT ANSWER', text: 'Dale. The police called me. I am STILL your emergency contact. We have been divorced for SIX YEARS. You are an emergency to me in every sense.', t: '2026-09-14T09:02' },
      { app: 'mail', title: 'KarateKing Wholesale', text: 'How are you enjoying your 10th Dan Grandmaster Black Belt (x6)? Leave a review! ⭐⭐⭐⭐⭐', t: '2026-09-14T08:00' },
      { app: 'phone', title: 'Missed call', text: 'Tammy 💅 (4)', t: '2026-09-13T12:14' },
      { app: 'mail', title: 'Sunvale Plaza Mgmt', text: 'Reminder: lease renewal decision TODAY 9:00 AM.', t: '2026-09-14T07:30' },
    ],
  },
  homeWallpaper: 'c8_wall_home',

  contacts: [
    { id: 'corey', name: 'Senpai Corey 🐉', avatar: 'av_c8_corey', number: '(555) 448-0808', label: 'student #8' },
    { id: 'crystal', name: 'Crystal — DO NOT ANSWER', avatar: 'av_c8_crystal', number: '(555) 448-1150', label: 'ex-wife' },
    { id: 'brenda', name: 'Brenda (THE ENEMY)', avatar: 'av_c8_brenda', number: '(555) 448-7711', label: 'Iron Lotus' },
    { id: 'ronnie', name: "Ronnie — Jumpin' Jax", avatar: 'av_c8_ronnie', number: '(555) 448-5005' },
    { id: 'lorraine', name: 'Lorraine Gutt (landlord)', avatar: 'av_c8_lorraine', number: '(555) 448-2200', label: 'Sunvale Plaza Mgmt' },
    { id: 'tammy', name: 'Tammy 💅', avatar: 'av_c8_tammy', number: '(555) 448-6969', label: 'Lacquer Lounge' },
    { id: 'mom', name: 'Ma', avatar: 'av_c8_mom', number: '(555) 448-0001' },
    { id: 'c8unknown', name: '(555) 448-2091', avatar: 'av_unknown', number: '(555) 448-2091' },
  ],

  threads: [
    {
      id: 'th_corey', contact: 'corey', messages: [
        { from: 'them', text: "sensei can i have my brown belt test thursday or is it still 'when the student is ready'", t: '2026-09-01T18:02' },
        { from: 'me', text: "When the student stops asking. Bring the $80 testing fee in cash. The card machine is 'down'. The card machine is always down, Corey. That's called a business model.", t: '2026-09-01T18:05' },
        { from: 'me', text: 'Did you acquire the merchandise, agent.', t: '2026-09-05T13:10' },
        { from: 'them', text: "got the lotus hoodie 🥷 XXL. brenda's kid at the merch table asked why a 31 year old man needs it. i panicked and said it's for my son. i don't have a son. i don't have a girlfriend. i barely have a car", t: '2026-09-05T13:14', photo: 'c8_ph_hoodie', clue: 'hoodie_buy' },
        { from: 'me', text: 'PaySnapped you 45. Outstanding work. You are the son I never had and the student I never charged enough.', t: '2026-09-05T13:20', clue: 'hoodie_buy' },
        { from: 'me', text: "Important. My voicemail PIN is 0808, same as my locker, same as my bank, same as everything. If anything ever happens to me, delete my voicemails before Crystal hears them. Some of them are me crying to a song.", t: '2026-09-08T22:41', clue: 'shared_pin' },
        { from: 'them', text: 'why would anything happen to u', t: '2026-09-08T22:43' },
        { from: 'me', text: 'I live dangerously, Corey. I ate gas-station sushi on a Tuesday.', t: '2026-09-08T22:44', clue: 'shared_pin' },
        { from: 'them', text: 'SENSEI the rank poster came!! 🥋 white → yellow → brown → black, just like u earned em. hung it by the water fountain next to the dent', t: '2026-09-11T16:20' },
        { from: 'me', text: "JAX IS CLOSED TILL SUNDAY. Ronnie's at the casino for his brother's bachelor thing. Tonight, we strike.", t: '2026-09-12T21:14', clue: 'plan_texts', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'tonight?? i have a 9am shift at the pet store. the parakeets need me', t: '2026-09-12T21:16', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "A ninja does not have shifts. Bring cousin Rick's ladder. I'll bring the belts, all six. You're on the roof, I go down the HVAC hatch over Unit 5. In and out. Like a dragon. Or like your mom's boyfriend.", t: '2026-09-12T21:17', clue: 'plan_texts', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'are the belts strong enough tho. like for a whole guy. a whole guy who had wings for lunch', t: '2026-09-12T21:20', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "They're 10th DAN, Corey. Grandmaster grade. Tie them the way I taught you. Square knot. Right over left, left over right, respect over fear.", t: '2026-09-12T21:22', clue: 'plan_texts', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "BRENDA'S IN JAIL. DRUNK ON A LAWNMOWER. The universe is literally sweeping the dojo floor for us.", t: '2026-09-12T23:59', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "wait is it still a good idea if she's in jail. like who are they gonna blame", t: '2026-09-13T00:41', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "Her STUDENTS, Corey. Think. The hoodie says IRON LOTUS. Ronnie's camera sees the hoodie, Ronnie files complaint number three against Lotus, Lorraine boots her Monday at 9. I become King of Sunvale. You become my Hand.", t: '2026-09-13T00:44', clue: 'plan_texts', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'Delete this thread. Ninja protocol. Also stop at the gas station, I need a slushie for my nerves.', t: '2026-09-13T00:58', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "sensei?? just woke up. was home ALL night watching baking shows with my mom, she can confirm, she fell asleep at like 9 but she can confirm. why are there cops at jumpin jax", t: '2026-09-13T09:31', clue: 'corey_lie' },
        { from: 'them', text: 'SENSEI', t: '2026-09-13T09:33' },
        { from: 'them', text: "i'm not ok. i went to the dojo and bowed to the empty mat for like an hour. the parakeets know something's wrong", t: '2026-09-14T20:10' },
      ],
    },
    {
      id: 'th_crystal', contact: 'crystal', messages: [
        { from: 'them', text: 'You owe me $1,900 for the pedal boat you sank. A PEDAL BOAT, Dale. On a lake with no waves. You sank it doing a "warrior pose".', t: '2026-08-30T11:02' },
        { from: 'me', text: "Funds are tied up in the dojo. When I get the lease I'll be King of Sunvale Plaza and you'll be paid in full. In prestige.", t: '2026-08-30T11:40' },
        { from: 'them', text: "I can't pay my credit card in prestige. I can't pay anything in prestige. Prestige is what you called it when you wore a cape to my sister's wedding.", t: '2026-08-30T11:42' },
        { from: 'me', text: "Also are you still seeing that chiropractor. Because I'm a 10th dan now and I could take him.", t: '2026-09-04T23:50' },
        { from: 'them', text: "He adjusts spines for a living, Dale. You get winded opening a pickle jar. Go to bed. Or go bother your manicurist, I hear you're 'getting your cuticles done' three times a week. Nobody has that many cuticles.", t: '2026-09-04T23:52' },
        { from: 'me', text: "Big night tonight. If I don't make it, tell people I died doing what I loved.", t: '2026-09-12T22:40' },
        { from: 'them', text: "Drinking cinnamon whiskey alone in your car outside a strip mall?", t: '2026-09-12T22:41' },
        { from: 'me', text: 'Being a legend.', t: '2026-09-12T22:41' },
        { from: 'them', text: 'go to bed dale', t: '2026-09-12T22:43' },
        { from: 'them', text: "Cops called again. They say there was a torn piece of black belt knotted round your waist and you 'fell from height'. From WHAT height, Dale. You needed a hug to get down off the second step of a stepladder at the hardware store.", t: '2026-09-15T11:20', clue: 'torn_belt' },
        { from: 'them', text: "I'm not crying. I'm mad you made me the one who's sad. You don't get to be interesting AFTER the divorce.", t: '2026-09-15T11:22' },
      ],
    },
    {
      id: 'th_brenda', contact: 'brenda', messages: [
        { from: 'me', text: 'Your sandwich board is on MY side of the yellow line. Move it or lose it.', t: '2026-08-21T08:10' },
        { from: 'them', text: "The yellow line is a fire lane, you absolute fucking toddler. It's nobody's side. It's the FIRE'S side.", t: '2026-08-21T08:12' },
        { from: 'them', text: "Somebody keeps stealing my sandwich board. I have it on video, Dale. Short guy. Gi. Ponytail. A black belt so shiny it's never been in a room with sweat.", t: '2026-09-03T07:45' },
        { from: 'me', text: 'Could be anyone.', t: '2026-09-03T07:50' },
        { from: 'them', text: "It says HUPP across the back of the gi, Dale. In glitter. You BEDAZZLED your own surname.", t: '2026-09-03T07:51' },
        { from: 'them', text: 'Touch my sign again and they will be picking pieces of you out of the parking lot.', t: '2026-09-11T19:40', clue: 'brenda_threat' },
        { from: 'me', text: 'Is that a threat?', t: '2026-09-11T19:41' },
        { from: 'them', text: "It's a forecast. Twenty years in the Marines and three at the DMV. I have hurt men for less than a sandwich board.", t: '2026-09-11T19:42', clue: 'brenda_threat' },
        { from: 'me', text: 'Enjoy your last weekend as a tenant 😘', t: '2026-09-12T20:15' },
        { from: 'them', text: "I'm at the Antler Lodge pig roast getting shitfaced ON PURPOSE so I don't drive over there and kill you. That's called growth. Look it up. Your dojo should have a word for it.", t: '2026-09-12T20:22' },
        { from: 'them', text: "I heard. I'm sorry, Dale. Whoever's reading this: I wanted to beat him in a ring, in front of people, with a referee and a camera. Not this. Also the county still has my mower.", t: '2026-09-14T16:05' },
      ],
    },
    {
      id: 'th_ronnie', contact: 'ronnie', messages: [
        { from: 'them', text: "Your little psychos kiai'd so loud a birthday clown cried. An ADULT clown, Dale. A clown with a mortgage.", t: '2026-08-17T15:30' },
        { from: 'them', text: "And don't think I don't see you staring in my window. My camera sees everything, 24/7. Smile, you creepy little ponytail.", t: '2026-08-17T15:31' },
        { from: 'me', text: 'Your camera is a fascist and so are you.', t: '2026-08-17T15:40' },
        { from: 'them', text: "Third hole in my bounce castle this month. The next time one of your kids dragon-kicks through my wall, I'm burying you in the ball pit.", t: '2026-09-10T17:05', clue: 'ronnie_threat' },
        { from: 'me', text: 'Have fun at the casino this weekend Ronnie. 😎', t: '2026-09-12T12:30' },
        { from: 'them', text: 'How the fuck do you know I am going to the casino', t: '2026-09-12T12:31' },
        { from: 'me', text: 'Ninjas know.', t: '2026-09-12T12:31' },
        { from: 'them', text: "It's on my Glimpse, Dale. With a picture of the bus. It's a party bus. It has a pole in it.", t: '2026-09-12T12:33' },
        { from: 'them', text: "Cops say you were dressed up to get on my security camera. Dale. The camera's a fake. $14 online. It doesn't have a battery. It has a little red light and a sticker. I'm sorry, man. I'm also not sorry. I don't know what I am. I have to steam-clean 4,000 balls.", t: '2026-09-15T14:44', clue: 'fake_camera' },
      ],
    },
    {
      id: 'th_lorraine', contact: 'lorraine', messages: [
        { from: 'them', text: 'Mr. Hupp, please review the email regarding the exclusive-use clause.', t: '2026-08-28T09:15' },
        { from: 'me', text: "Eleven complaints is a witch hunt. NINE of them are from Ronnie.", t: '2026-08-28T09:40' },
        { from: 'them', text: 'Yes. That is how complaints work.', t: '2026-08-28T09:41' },
        { from: 'me', text: "Lorraine, I'm going to be honest. You've always had a thing for me.", t: '2026-08-28T09:44' },
        { from: 'them', text: 'I have a restraining order template, Mr. Hupp. I have it saved as a favourite.', t: '2026-08-28T09:45' },
        { from: 'them', text: 'Final count Monday, 9 AM. Currently Hupp 11, Iron Lotus 2. Unless something dramatic happens, Iron Lotus gets the renewal.', t: '2026-09-12T10:00', clue: 'lease_war' },
        { from: 'them', text: "My condolences. The decision is paused. One question for whoever has this: the roof access hatch over Unit 5 was found open Sunday with an extension ladder against the back wall. Did Mr. Hupp have a roof key? Because nobody gave him one.", t: '2026-09-14T15:20', clue: 'roof_hatch' },
      ],
    },
    {
      id: 'th_tammy', contact: 'tammy', messages: [
        { from: 'them', text: "u left ur headband at my place AGAIN. the one that says NO MERCY. u wore it the whole time dale. the WHOLE time", t: '2026-09-04T10:02' },
        { from: 'me', text: 'Keep it. Something to remember the Dragon by 🐉', t: '2026-09-04T10:05' },
        { from: 'them', text: "i'm using it to take my makeup off. also u don't have to yell KIAI at the end. my neighbor called the landlord", t: '2026-09-04T10:06' },
        { from: 'me', text: 'u up 🐉', t: '2026-09-10T01:12' },
        { from: 'them', text: "it's a tuesday dale. i have a 7am pedicure on a man with feet like a hobbit's grandpa", t: '2026-09-10T01:20' },
        { from: 'me', text: 'Check the hidden album I sent you. The bubble bath one. Artistic. Black-and-white energy.', t: '2026-09-10T01:22' },
        { from: 'them', text: "dale there's a rubber duck in a karate headband in it. it's staring at me. it has more confidence than u. i'm deleting it and then i'm deleting myself", t: '2026-09-10T01:25' },
        { from: 'them', text: "OMG BRENDA JUST GOT ARRESTED outside the Antler Lodge 😭😭 she was driving her RIDING MOWER home hammered, cops cuffed her on the lawn, she called the deputy 'cupcake'", t: '2026-09-12T23:56', photo: 'c8_ph_arrest', clue: 'brenda_arrest' },
        { from: 'me', text: 'BEST. NIGHT. EVER.', t: '2026-09-12T23:57' },
        { from: 'them', text: "ur being weird. u want to come over? i have wine and the good sheets and the cat's at my sister's", t: '2026-09-12T23:58' },
        { from: 'me', text: "Can't. Mission. Tomorrow I will be a king and you will be my queen. Or at least my Saturday.", t: '2026-09-13T00:02' },
        { from: 'them', text: 'u always say mission and then u fall asleep in ur car eating a slushie', t: '2026-09-13T00:03' },
        { from: 'them', text: "dale?? ronnie's shop has police tape. answer me. i'm not even mad about the duck", t: '2026-09-13T12:10' },
      ],
    },
    {
      id: 'th_mom', contact: 'mom', messages: [
        { from: 'them', text: 'Dale honey did you eat. Your father would be proud of the karate. He would not be proud of the ponytail. Or the divorce. Or the car. He would be proud of the karate.', t: '2026-09-06T09:00' },
        { from: 'me', text: 'Ma this weekend is going to change everything.', t: '2026-09-12T18:00' },
        { from: 'them', text: 'Is it a woman', t: '2026-09-12T18:01' },
        { from: 'me', text: "It's real estate.", t: '2026-09-12T18:02' },
        { from: 'them', text: 'That is worse. Rick says you have his ladder. Give the boy his ladder.', t: '2026-09-12T18:04' },
      ],
    },
  ],

  photos: [
    { id: 'c8_ph_dojo', art: 'c8_ph_dojo', t: '2026-08-22T11:00', place: "Hupp's Freestyle Karate, Unit 4", orientation: 'landscape', caption: "Interior of a small strip-mall dojo: blue mats, a wall mirror, a large banner over the mirror. A dent in the drywall beside a water fountain." },
    { id: 'c8_ph_belts', art: 'c8_ph_belts', t: '2026-09-10T16:40', place: "Hupp's Freestyle Karate, Unit 4", orientation: 'landscape', caption: 'Six black belts in plastic sleeves fanned on a front-desk counter beside an opened shipping box and a packing slip.', clue: 'cheap_belts' },
    { id: 'c8_ph_hoodie', art: 'c8_ph_hoodie', t: '2026-09-05T13:12', place: 'Sunvale Plaza parking lot', orientation: 'portrait', caption: 'A thin man holds up a black hooded sweatshirt with a printed logo beside a green hatchback; thumbs up.', clue: 'hoodie_buy' },
    { id: 'c8_ph_arrest', art: 'c8_ph_arrest', t: '2026-09-12T23:55', place: 'Antler Lodge #212', orientation: 'landscape', caption: 'Sent by Tammy. Night. A woman in handcuffs beside a ride-on lawnmower on a lodge lawn, two deputies, a patrol car with lights on.', clue: 'brenda_arrest' },
    { id: 'c8_ph_casino', art: 'c8_ph_casino', t: '2026-09-12T22:30', place: 'Silver Hollow Casino', orientation: 'landscape', caption: "From Ronnie Duquette's Glimpse. A crowded dice table; several men in matching novelty T-shirts; a wall clock over the cage.", clue: 'ronnie_away' },
    { id: 'c8_ph_shrimp', art: 'c8_ph_shrimp', t: '2026-09-13T01:31', place: 'Silver Hollow Casino', orientation: 'portrait', caption: "From Ronnie Duquette's Glimpse. A man asleep upright at a slot machine holding a shrimp cocktail glass. The slot screen shows a time.", clue: 'ronnie_away' },
    { id: 'c8_ph_jax', art: 'c8_ph_jax', t: '2026-09-09T15:20', place: "Jumpin' Jax Party Palace, Unit 5", orientation: 'landscape', caption: 'Interior of a children\'s party venue: a ball pit with a padded rim, a bounce castle, a dome camera on the wall above. A square hatch in the ceiling.' },
    { id: 'c8_ph_board', art: 'c8_ph_board', t: '2026-09-02T23:30', place: 'Sunvale Plaza parking lot', orientation: 'portrait', caption: 'The open trunk of a car at night. A folding sandwich-board sign lies inside next to a bottle and a bag of fast food.' },
    { id: 'c8_ph_student8', art: 'c8_ph_student8', t: '2026-08-31T19:00', place: "Hupp's Freestyle Karate, Unit 4", orientation: 'portrait', caption: 'Two men in karate uniforms with a printed certificate between them, posed in front of the dojo banner.', clue: 'student8' },
    { id: 'c8_ph_ladder', art: 'c8_ph_ladder', t: '2026-09-12T20:48', place: 'Willow Run Villas', orientation: 'landscape', caption: 'Dusk. A small hatchback with an aluminium extension ladder strapped to its roof rack. Handwriting on the ladder rail.', clue: 'rick_ladder' },
    { id: 'c8_ph_roof', art: 'c8_ph_roof', t: '2026-09-13T01:24', place: 'Sunvale Plaza — roof', orientation: 'portrait', caption: 'Recovered. Night, flash. A thin man on a flat gravel roof holding a long length of knotted black fabric beside an HVAC unit. Deleted 01:40.', clue: 'belt_rope', deletedUntil: 'recovered:photos' },
    { id: 'c8_ph_hatch', art: 'c8_ph_hatch', t: '2026-09-13T01:38', place: 'Sunvale Plaza — roof', orientation: 'portrait', caption: 'Recovered. Selfie, night. A man in a ski mask and a printed hooded sweatshirt beside an open square roof hatch; a lit room far below. Deleted 01:40.', clue: 'ninja_selfie', deletedUntil: 'recovered:photos' },
    { id: 'c8_ph_lastframe', art: 'c8_ph_lastframe', t: '2026-09-13T01:46', place: "Jumpin' Jax Party Palace, Unit 5", orientation: 'portrait', caption: 'Recovered from an interrupted burst buffer; the device lost power at 01:46. Motion-blurred upward view of a ceiling hatch and a length of black fabric with a printed label.', clue: 'last_frame', deletedUntil: 'recovered:photos' },
    // Hidden album
    { id: 'c8_ph_h_mirror', art: 'c8_ph_h_mirror', t: '2026-09-12T16:05', place: "Hupp's Freestyle Karate, Unit 4", orientation: 'portrait', hidden: true, caption: 'Hidden album. Mirror selfie: a shirtless man in black boxer briefs and a black belt flexes in the dojo mirror. A whiteboard is visible in the reflection behind him.', clue: 'whiteboard_plan' },
    { id: 'c8_ph_h_bath', art: 'c8_ph_h_bath', t: '2026-09-10T01:10', place: 'Willow Run Villas', orientation: 'portrait', hidden: true, caption: 'Hidden album. A man in a bubble bath up to the chest, holding a bottle and a candle; a rubber duck in a headband on the tub rim.' },
    { id: 'c8_ph_h_pizza', art: 'c8_ph_h_pizza', t: '2026-08-27T22:15', place: 'Willow Run Villas', orientation: 'portrait', hidden: true, caption: 'Hidden album. A man in a kitchen wearing only a ponytail and a large pizza box held at the waist. A woman is visible through the window behind him.' },
    { id: 'c8_ph_h_tammy', art: 'c8_ph_h_tammy', t: '2026-09-04T00:40', place: 'Received from Tammy', orientation: 'portrait', hidden: true, caption: 'Hidden album. Received. A woman in a lace robe takes a mirror selfie in a nail salon back room; an elderly woman asleep in a massage chair behind her.' },
  ],

  notes: [
    {
      id: 'n_opballpit', title: 'OPERATION BALL PIT 🥷', t: '2026-09-12T19:30', lock: { password: 'hachi', hint: "Agent Corey's student number, counted like a REAL sensei. One word, lowercase." }, clue: 'op_plan',
      body: "OPERATION BALL PIT — EYES ONLY (CRYSTAL THAT MEANS NOT YOU)\n\n1. Ronnie at casino Sat night (confirmed via his Glimpse, the idiot).\n2. Corey on roof w/ Rick's ladder. Me down the HVAC hatch over Unit 5. Rope = all six 10th Dan belts, Corey ties (square knot, respect over fear).\n3. Wearing LOTUS HOODIE + ski mask. Turn to camera. Logo FORWARD.\n4. Pop the bounce castle. Spray 'LOTUS RULES' on the ball pit. Maybe take a ball as a trophy.\n5. Back up the rope. (Arm day Thursday. Mandatory.)\n6. Ronnie sees tape → complaint vs Iron Lotus → Lorraine boots Brenda Monday 9AM.\n7. KING OF SUNVALE PLAZA.\n8. Expand into Unit 5. Ball pit becomes Dragon Pit. Tammy becomes Dragon Queen.\n\nThings that could go wrong: none. I'm a grandmaster.",
    },
    { id: 'n_counting', title: "Dojo counting (DON'T let students see)", t: '2026-07-14T21:00', body: "1 ichi\n2 ni\n3 san\n4 shi (or yon?? why are there two)\n5 go\n6 roku\n7 shichi (or nana??? WHY ARE THERE TWO AGAIN)\n8 hachi\n9 ku (kyu?)\n10 ju\n\nAfter ten just yell.\nCorey = hachi. Lucky number. Same as my PIN." },
    { id: 'n_code', title: "Hupp's Freestyle Karate — Dojo Code", t: '2025-03-02T10:00', body: "1. Respect the Grandmaster.\n2. Pay the Grandmaster.\n3. No outside shoes. No outside opinions.\n4. No Iron Lotus people. No Iron Lotus hoodies (except for MISSIONS).\n5. Testing fees cash only.\n6. Kiai like you mean it. Ronnie can deal.\n7. What happens on the mat stays on the mat (Tammy).\n8. The banner is spelled correctly. Stop asking." },
    { id: 'n_grievances', title: 'Brenda Kowalczyk — grievances', t: '2026-08-21T23:10', body: "- Fire lane 'technically' a fire lane\n- Laughed at my Dragon Kick at the 2024 regional ('is he having a stroke')\n- Has more students (because of 'qualifications')\n- Called my certificate 'a coupon'\n- Has a real Marine tattoo. Mine is henna.\n- Has better parking karma\n- Her sandwich board is VERY easy to lift. Which is her fault." },
    { id: 'n_king', title: 'When I am King of Sunvale', t: '2026-09-11T02:30', body: "1. Rooftop dragon statue (fibreglass, lit up)\n2. Win Crystal back (maybe)\n3. Pay Crystal (maybe)\n4. Rename plaza 'Dragon Plaza'\n5. Hot tub in the dojo for 'recovery' (Tammy)\n6. Learn to count past ten in Japanese" },
  ],

  mail: [
    { id: 'm_lease', from: 'Sunvale Plaza Management', fromAddr: 'lgutt@sunvaleplaza.example', to: 'D. Hupp; B. Kowalczyk', subject: 'Exclusive-use clause — martial arts tenancy', t: '2026-08-28T09:00', folder: 'inbox', clue: 'lease_war', body: "Dear tenants,\n\nAs of October 1 a new anchor tenant's exclusive-use clause limits Sunvale Plaza to ONE martial arts tenant.\n\nThe renewal will go to the tenant with fewer formal complaints on file at 9:00 AM on Monday, September 14.\n\nCurrent count:\nHupp's Freestyle Karate (Unit 4): 11\nIron Lotus Martial Arts (Unit 11): 2\n\nFor the avoidance of doubt, complaints filed by one tenant against another tenant WILL be read, and Mr. Hupp, they WILL be laughed at.\n\nLorraine Gutt\nProperty Manager" },
    { id: 'm_karateking', from: 'KarateKing Wholesale', fromAddr: 'orders@karateking.example', to: 'Dale Hupp', subject: 'Order #KK-88213 shipped — 10th Dan Grandmaster Black Belt (x6)', t: '2026-09-08T14:02', folder: 'inbox', clue: 'cheap_belts', body: "Thanks for your order, Grandmaster!\n\n6 x 10th Dan Grandmaster Black Belt — gold embroidered, extra shiny @ $8.99\nSubtotal $53.94\n\nPRODUCT NOTES: Novelty / display item. 100% polyester. Not intended for martial arts use, sparring, or bearing any load. Do not use as a towline, leash, or 'for anything, honestly'.\n\nCustomers also bought: Ninja Smoke Pellets (Party Size), 'World Champion' Trophy (Customizable)." },
    { id: 'm_wfkc', from: 'World Freestyle Karate Council', fromAddr: 'certs@wfkc-po-box.example', to: 'Dale Hupp', subject: 'Congratulations, 10th Dan! Your certificate has shipped', t: '2026-09-03T10:00', folder: 'inbox', body: "Congratulations, Grandmaster Hupp!\n\nAfter careful review of your $199 payment, the Council has awarded you the rank of 10th Dan.\n\nYour certificate (gold foil, 'suitable for framing or a bathroom') has shipped.\n\nUpgrade: 11th Dan — $299. 12th Dan — call us." },
    { id: 'm_complaint', from: 'Dale Hupp', fromAddr: 'grandmaster@huppsfreestyle.example', to: 'lgutt@sunvaleplaza.example', subject: 'FORMAL COMPLAINT #1 — Iron Lotus — vibes', t: '2026-09-12T11:15', folder: 'sent', body: "Lorraine,\n\nI wish to formally complain about Iron Lotus Martial Arts. Their sign is in the fire lane, their students park 'confidently', and Brenda looked at me in a way I'd describe as 'aggressive and also kind of hot'.\n\nPlease add to her file.\n\nGrandmaster D. Hupp, 10th Dan (certified)" },
    { id: 'm_review', from: 'KarateKing Wholesale', fromAddr: 'reviews@karateking.example', to: 'Dale Hupp', subject: 'How are you enjoying your 10th Dan Grandmaster Black Belt (x6)?', t: '2026-09-14T08:00', folder: 'inbox', body: "Hi Dale!\n\nIt's been a few days. How are your belts holding up? ⭐⭐⭐⭐⭐\n\nLeave a review and get 10% off your next order!" },
    { id: 'm_ninja', from: 'Ninja Supply Co.', fromAddr: 'ship@ninjasupply.example', to: 'Dale Hupp', subject: 'Your order: Tactical Ski Mask (Black, Adult L)', t: '2026-09-11T09:30', folder: 'trash', body: "Order confirmed: Tactical Ski Mask (Black, Adult L).\n\nWe noticed you also viewed 'Grappling Hook (Decorative)' and 'Can a Ninja Be Arrested? (e-book)'. Still thinking it over?" },
  ],

  calls: [
    { contact: 'tammy', t: '2026-09-13T12:14', dir: 'missed' },
    { contact: 'ronnie', t: '2026-09-13T07:49', dir: 'missed' },
    { contact: 'corey', t: '2026-09-13T01:53', dir: 'missed' },
    { contact: 'corey', t: '2026-09-13T01:51', dir: 'missed' },
    { contact: 'crystal', t: '2026-09-12T22:45', dir: 'out', duration: '0:09' },
    { contact: 'tammy', t: '2026-09-12T23:56', dir: 'in', duration: '2:20' },
    { contact: 'mom', t: '2026-09-12T18:10', dir: 'in', duration: '7:41' },
    { contact: 'lorraine', t: '2026-09-11T14:02', dir: 'missed' },
    { contact: 'brenda', t: '2026-09-11T19:45', dir: 'out', duration: '0:03' },
  ],

  voicemails: [
    { id: 'vm_corey', contact: 'corey', t: '2026-09-13T01:53', duration: '0:44', voice: { pitch: 1.25, rate: 1.3, female: false }, clue: 'corey_vm', deletedUntil: 'recovered:voice', transcript: "Sensei? SENSEI? Oh my god. Oh my god oh my god. It just, the knot didn't, the BELT went, it just went, like a paper towel, it just went. You're not moving. Sensei, say kiai. Say anything. Say something mean about Brenda. ...I'm calling someone. I can't call someone, I'm on a roof. I'm on a roof in the middle of the night with a ladder that says Rick. I'm so sorry. I'm so sorry. I'm going home. [Carrier log: message deleted by remote PIN access, Sep 13 03:12.]" },
    { id: 'vm_ronnie', contact: 'ronnie', t: '2026-09-13T07:49', duration: '0:26', voice: { pitch: 0.9, rate: 1.15, female: false }, clue: 'rick_ladder', transcript: "Hupp. Ronnie. I just got off a party bus with nine hungover groomsmen and there's a ladder against the back of my building that says PROPERTY OF RICK HUPP in marker. If your little psycho army is on my roof I'm calling the cops, and then I'm calling your mother. Call me back. I'm going in." },
    { id: 'vm_mom', contact: 'mom', t: '2026-09-12T18:30', duration: '0:21', voice: { pitch: 1.1, rate: 0.9, female: true }, transcript: "Dale, it's Ma. I saw on the Glimpse you're doing 'something big' this weekend. Wear a helmet. I mean it. Also your cousin Rick wants his ladder back. He wrote his name on it, Dale, like it's a lunchbox. Love you. Eat a vegetable." },
    { id: 'vm_lorraine', contact: 'lorraine', t: '2026-09-11T14:03', duration: '0:18', voice: { pitch: 1.0, rate: 1.05, female: true }, transcript: "Mr. Hupp, Lorraine Gutt. Please stop leaving complaint forms under my windshield wiper. The fire lane complaint was signed 'Concerned Citizen, 10th Dan'. That narrows it down. Monday, nine a.m." },
  ],

  map: {
    art: 'c8_map',
    places: [
      { id: 'dojo', name: "Hupp's Freestyle Karate (Unit 4)", x: 0.40, y: 0.46 },
      { id: 'jax', name: "Jumpin' Jax Party Palace (Unit 5)", x: 0.50, y: 0.46 },
      { id: 'roof', name: 'Sunvale Plaza — roof over Unit 5', x: 0.50, y: 0.38 },
      { id: 'lotus', name: 'Iron Lotus Martial Arts (Unit 11)', x: 0.74, y: 0.52 },
      { id: 'suds', name: 'Suds City 24-hr Laundromat', x: 0.46, y: 0.80 },
      { id: 'lodge', name: 'Antler Lodge #212', x: 0.86, y: 0.20 },
      { id: 'condo', name: 'Willow Run Villas (home)', x: 0.14, y: 0.22 },
      { id: 'sheriff', name: 'Haskett County Sheriff & Jail', x: 0.20, y: 0.78 },
    ],
    stops: [
      { t: '2026-09-12T20:50', place: 'condo', detail: 'Departed' },
      { t: '2026-09-12T21:05', place: 'dojo', detail: 'Arrived — 3h 52m' },
      { t: '2026-09-13T01:02', place: 'roof', detail: 'Barometric elevation +4.1 m. Stationary on roof — 44 min', clue: 'phone_roof' },
      { t: '2026-09-13T01:46', place: 'jax', detail: 'Barometric elevation −3.9 m in under 1 s. Hard fall detected. "Are you OK?" alert unanswered. Power lost.', clue: 'phone_roof' },
      { t: '2026-09-13T10:51', place: 'sheriff', detail: 'Device powered on — evidence intake' },
    ],
  },

  browser: [
    { t: '2026-09-13T00:22', title: 'Haskett County Inmate Lookup — KOWALCZYK, BRENDA J. — Booked 23:58 Sep 12 — Charge: DUI (ride-on mower) — Release: pending', url: 'haskettcounty.example/inmates?name=kowalczyk', clue: 'brenda_booked' },
    { t: '2026-09-13T00:31', title: 'how much weight can a karate belt hold', url: 'search?q=how+much+weight+can+a+karate+belt+hold', clue: 'belt_search', deletedUntil: 'recovered:history' },
    { t: '2026-09-13T00:34', title: 'strongest knot to tie six belts together for a grown man (thick)', url: 'search?q=strongest+knot+tie+belts+grown+man+thick', clue: 'belt_search', deletedUntil: 'recovered:history' },
    { t: '2026-09-13T00:37', title: 'is it breaking and entering if you enter through the ceiling', url: 'search?q=is+it+breaking+and+entering+through+ceiling', deletedUntil: 'recovered:history' },
    { t: '2026-09-13T00:44', title: 'how to make sure security camera sees hoodie logo', url: 'search?q=security+camera+see+hoodie+logo', deletedUntil: 'recovered:history' },
    { t: '2026-09-13T00:52', title: 'ninja breathing technique stop shaking on roof', url: 'search?q=ninja+breathing+stop+shaking+roof', deletedUntil: 'recovered:history' },
    { t: '2026-09-12T19:10', title: 'can you get evicted for too many complaints commercial lease', url: 'search?q=evicted+too+many+complaints+commercial+lease' },
    { t: '2026-09-11T23:40', title: 'is a 10th dan black belt real if you bought it online asking for a friend who is me', url: 'search?q=10th+dan+black+belt+real+if+bought+online' },
    { t: '2026-09-10T02:14', title: 'cinnamon whiskey and edibles same night ok? (heart racing) (also seeing colors)', url: 'search?q=cinnamon+whiskey+edibles+same+night' },
    { t: '2026-09-10T01:05', title: 'how to look sexy in bubble bath for woman (manly)', url: 'search?q=how+to+look+sexy+bubble+bath+manly' },
    { t: '2026-09-09T22:31', title: 'how to look taller in fight videos', url: 'search?q=how+to+look+taller+in+fight+videos' },
    { t: '2026-09-06T01:20', title: "is it weird to hook up with your nail tech if she's your ex-wife's cousin", url: 'search?q=hook+up+nail+tech+ex+wife+cousin' },
    { t: '2026-09-04T23:58', title: 'can a chiropractor legally fight you', url: 'search?q=can+a+chiropractor+legally+fight+you' },
    { t: '2026-08-29T08:40', title: 'exclusive use clause loophole strip mall karate', url: 'search?q=exclusive+use+clause+loophole' },
  ],

  glimpse: [
    { id: 'g8_dojo', author: 'me', photo: 'c8_ph_dojo', caption: 'Sunvale Plaza has ONE true dojo. #NoMercy #10thDan #HuppsFreestyle #DragonKick #LadiesWelcome', t: '2026-08-22T11:10', likes: 14, comments: [{ author: 'brenda', text: "Your banner says 'Freestlye'." }, { author: 'corey', text: 'OSU SENSEI 🐉🐉' }, { author: 'ronnie', text: 'Keep it down.' }, { author: 'tammy', text: 'why is #LadiesWelcome on there dale' }] },
    { id: 'g8_student', author: 'me', photo: 'c8_ph_student8', caption: 'Student of the Month: #8 Corey Platt. AGAIN. The only student number that matters. 🥋 #Loyalty #Hachi', t: '2026-08-31T19:05', likes: 9, comments: [{ author: 'crystal', text: "He's your only adult student, Dale. He's student of every month." }, { author: 'corey', text: 'osu!!! 🥹 hachi forever' }], clue: 'student8' },
    { id: 'g8_casino', author: 'ronnie', photo: 'c8_ph_casino', caption: "Little bro's bachelor weekend 🎰🍑 Silver Hollow Casino, two hours from my problems. Jumpin' Jax CLOSED till Sunday AM. Parents: relax. Groomsmen: hydrate.", t: '2026-09-12T22:31', likes: 63, comments: [{ author: 'me', text: 'Lose big Ronnie 😎' }, { author: 'ronnie', text: 'Why are you like this' }], clue: 'ronnie_away' },
    { id: 'g8_shrimp', author: 'ronnie', photo: 'c8_ph_shrimp', caption: 'still up $40 baby. the shrimp cocktail is free if you never make eye contact. groom is crying in the buffet. great night', t: '2026-09-13T01:32', likes: 88, comments: [{ author: 'tammy', text: 'ronnie u look dead' }, { author: 'ronnie', text: 'i am thriving' }], clue: 'ronnie_away' },
    { id: 'g8_mower', author: 'tammy', photo: 'c8_ph_arrest', caption: 'local legend 😭🚜🚓 she called the deputy cupcake and he blushed', t: '2026-09-12T23:59', likes: 302, comments: [{ author: 'me', text: '🏆🏆🏆' }, { author: 'brenda', text: 'Delete this, Tammy. I know where you file nails.' }], clue: 'brenda_arrest' },
  ],

  bank: {
    account: 'Sunvale Community Bank ••0808',
    balance: 37.12,
    tx: [
      { t: '2026-09-12T20:58', desc: 'QWIK STOP #14 — CINNAMON WHISKEY 750ML, SLUSHIE (BLUE RASPB, XL)', amount: -24.18 },
      { t: '2026-09-11T09:28', desc: 'NINJA SUPPLY CO — TACTICAL SKI MASK', amount: -19.99 },
      { t: '2026-09-08T14:00', desc: 'KARATEKING WHOLESALE — 10TH DAN BELT x6', amount: -53.94, clue: 'cheap_belts' },
      { t: '2026-09-05T13:19', desc: "PAYSNAP TO COREY PLATT — 'lotus hoodie xxl 🥷'", amount: -45.00, clue: 'hoodie_buy' },
      { t: '2026-09-03T10:00', desc: 'WORLD FREESTYLE KARATE COUNCIL — 10TH DAN CERT', amount: -199.00 },
      { t: '2026-09-02T17:30', desc: 'CASH DEPOSIT — "TESTING FEES"', amount: 80.00 },
      { t: '2026-09-01T08:00', desc: 'SUNVALE PLAZA MGMT — RENT UNIT 4', amount: -1450.00 },
      { t: '2026-08-30T15:10', desc: "LACQUER LOUNGE — 'MANLY MANI' + TIP", amount: -65.00 },
      { t: '2026-08-28T21:40', desc: 'GREEN DRAGON DISPENSARY — SOUR GUMMIES (EXTRA STRONG)', amount: -28.00 },
      { t: '2026-08-25T11:02', desc: 'HASKETT COUNTY — PARKING CITATION (FIRE LANE)', amount: -75.00 },
    ],
  },

  calendar: [
    { id: 'c8_c_op', t: '2026-09-12T21:00', title: 'OPERATION 🥷', detail: 'Corey. Ladder. Belts. Hoodie. Slushie.' },
    { id: 'c8_c_lease', t: '2026-09-14T09:00', title: 'LEASE DECISION — Lorraine', detail: 'Wear the good gi. Be humble (fake).' },
    { id: 'c8_c_ladder', t: '2026-09-13T12:00', title: "Return Rick's ladder", detail: "He wrote his name on it. Like a child." },
    { id: 'c8_c_tammy', t: '2026-09-13T20:00', title: 'Tammy 💅 (cuticles)', detail: 'Bring wine. Bring the headband. Do NOT yell at the end.' },
    { id: 'c8_c_corey', t: '2026-09-17T18:00', title: "Corey's brown belt test (maybe)", detail: '$80 cash. Make him do 400 pushups. Watch.' },
    { id: 'c8_c_camp', t: '2026-09-19T09:00', title: "Lil' Dragons Camp", detail: 'Juice boxes. NO kicking Ronnie\'s wall.' },
  ],

  wifi: [
    { name: 'HUPP_DOJO_KIAI', lastJoined: '2026-09-13T01:01' },
    { name: 'JumpinJax_Parents_Only', lastJoined: '2026-09-13T01:39', clue: 'phone_roof' },
    { name: 'IRON LOTUS GUEST — NOT YOU DALE', lastJoined: '2026-07-02T10:15' },
    { name: 'Cloud9Vape_NoMinors_NoLosers', lastJoined: '2026-09-12T21:30' },
    { name: 'LacquerLounge_Guest 💅', lastJoined: '2026-09-04T00:35' },
    { name: 'Pretty Fly for a WiFi', lastJoined: '2026-09-12T20:45' },
    { name: 'Suds City Free (We See You)', lastJoined: '2026-08-11T03:10' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted & Burst Buffer', detail: 'Carve deleted images and frames from an interrupted burst out of unallocated flash storage.', needs: ['unlocked'], durationMs: 5000 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: 'Rebuild deleted SMS records from the database write-ahead log.', needs: ['pinned:lease_war'], needsHint: 'Need a lead first: pin what Dale stood to lose on Monday at 9 a.m.', durationMs: 6500 },
    { id: 'voice', label: 'Voicemail — Carrier Cache', detail: 'Pull voicemail audio deleted by remote PIN access from the carrier sync cache.', needs: ['pinned:belt_rope'], needsHint: 'Need a lead first: pin the 01:24 rooftop photo.', durationMs: 5500 },
    { id: 'history', label: 'Browser — Cleared History', detail: 'Recover cleared browsing sessions from the WebKit cache.', needs: ['note:n_opballpit'], needsHint: "Need a lead first: open Dale's locked operation note.", durationMs: 5000 },
  ],

  clues: [
    { id: 'lease_war', title: 'One dojo too many', text: "Only one martial-arts tenant from Oct 1. The renewal goes to whoever has fewer complaints at 9 a.m. Monday. Hupp 11, Iron Lotus 2.", kind: 'document' },
    { id: 'brenda_threat', title: "Brenda: 'pieces of you'", text: "Sept 11: 'Touch my sign again and they will be picking pieces of you out of the parking lot.' 'It's a forecast.'", kind: 'person', art: 'av_c8_brenda' },
    { id: 'ronnie_threat', title: "Ronnie: 'burying you in the ball pit'", text: "Sept 10, after a third hole in his bounce castle: 'I'm burying you in the ball pit.'", kind: 'person', art: 'av_c8_ronnie' },
    { id: 'brenda_arrest', title: 'Brenda in cuffs, 23:56', text: 'Tammy, 23:56 Saturday: Brenda was arrested outside the Antler Lodge for driving her ride-on mower home drunk.', kind: 'event', art: 'c8_ph_arrest' },
    { id: 'brenda_booked', title: 'Booked 23:58', text: 'Dale looked her up at 00:22: KOWALCZYK, BRENDA J., booked into Haskett County Jail 23:58, release pending.', kind: 'document' },
    { id: 'ronnie_away', title: 'Ronnie at the casino', text: "Ronnie posted from Silver Hollow Casino, two hours away, at 22:31 and again asleep at a slot machine at 01:32.", kind: 'place', art: 'c8_ph_shrimp' },
    { id: 'hoodie_buy', title: 'The Iron Lotus hoodie', text: "Corey bought an IRON LOTUS hoodie (XXL) at Brenda's own merch table on Sept 5. Dale paid him back $45: 'lotus hoodie xxl 🥷'.", kind: 'object', art: 'c8_ph_hoodie' },
    { id: 'cheap_belts', title: 'Six $8.99 black belts', text: "KarateKing order, Sept 8: six '10th Dan Grandmaster' belts at $8.99. 'Novelty / display item. 100% polyester. Not intended for... bearing any load.'", kind: 'object', art: 'c8_ph_belts' },
    { id: 'shared_pin', title: 'PIN 0808 for everything', text: "Dale told Corey his voicemail PIN (0808, same as everything) and to delete his voicemails 'if anything ever happens to me'.", kind: 'document' },
    { id: 'student8', title: 'Student #8', text: "Corey Platt is student #8, Student of the Month again. '#Hachi'.", kind: 'person', art: 'c8_ph_student8' },
    { id: 'op_plan', title: 'Operation Ball Pit', text: "Dale's locked note: Corey on the roof, Dale down the HVAC hatch over Unit 5 on six knotted belts, wearing the Lotus hoodie for Ronnie's camera, so Brenda loses the lease.", kind: 'document' },
    { id: 'whiteboard_plan', title: 'The whiteboard in the mirror', text: "Hidden selfie, 16:05 Saturday: behind Dale in the dojo mirror, a whiteboard plan — roof, hatch, six belts, hoodie, camera.", kind: 'object', art: 'c8_ph_h_mirror' },
    { id: 'plan_texts', title: "'Tonight we strike'", text: "Deleted texts: Dale tells Corey to bring Rick's ladder and work the roof while he goes down the hatch on six belts. 'They're 10th DAN, Corey.'", kind: 'document', art: 'av_c8_corey' },
    { id: 'belt_rope', title: 'Knotted belts on the roof, 01:24', text: 'Recovered photo: Corey on the plaza roof holding a long rope of knotted black belts.', kind: 'object', art: 'c8_ph_roof' },
    { id: 'ninja_selfie', title: 'The ninja selfie, 01:38', text: 'Recovered selfie: Dale in ski mask and Iron Lotus hoodie at the open hatch above the ball pit.', kind: 'event', art: 'c8_ph_hatch' },
    { id: 'last_frame', title: 'The last frame, 01:46', text: "Burst frame as the phone lost power: the hatch above, and a torn belt end whose label reads 'NOT FOR LOAD BEARING'.", kind: 'object', art: 'c8_ph_lastframe' },
    { id: 'phone_roof', title: 'Up 4 m, down 3.9 m', text: "The phone sat on the roof over Unit 5 from 01:02 (it even joined Jax's Wi-Fi at 01:39), then dropped 3.9 m in under a second at 01:46. Hard fall detected; no answer.", kind: 'place' },
    { id: 'roof_hatch', title: 'Hatch open, ladder up', text: "Lorraine: the roof hatch over Unit 5 was open Sunday with an extension ladder against the back wall. Nobody gave Dale a key.", kind: 'place' },
    { id: 'rick_ladder', title: 'PROPERTY OF RICK HUPP', text: "Dale's car left home with cousin Rick's ladder on the roof. At 07:49 Ronnie found it against the back of his building, name written on it.", kind: 'object', art: 'c8_ph_ladder' },
    { id: 'torn_belt', title: 'A torn belt round his waist', text: "Crystal, from the police: a torn piece of black belt was knotted round Dale's waist and he 'fell from height'.", kind: 'event', art: 'av_c8_crystal' },
    { id: 'corey_vm', title: "Corey: 'the BELT went'", text: "Deleted voicemail, 01:53: 'the BELT went, like a paper towel... I'm on a roof... I'm going home.' Deleted remotely by PIN at 03:12.", kind: 'person', art: 'av_c8_corey' },
    { id: 'corey_lie', title: "Corey: 'home ALL night'", text: "Sunday 09:31 Corey says he was home all night watching baking shows with his mom, who fell asleep at 9.", kind: 'person', art: 'av_c8_corey' },
    { id: 'belt_search', title: "'how much weight can a karate belt hold'", text: 'Cleared history, 00:31–00:34: belt weight limits and the strongest knot to tie six belts together.', kind: 'document' },
    { id: 'laundromat_witness', title: 'The laundromat attendant', text: "Two men put a ladder up the back of the plaza around 1. A crash at quarter to two; the skinny one came down crying 'I'm sorry sensei' and drove off in a green hatchback.", kind: 'person', art: 'av_unknown' },
    { id: 'corey_confess', title: "Corey: 'I tied the knot'", text: "Corey: he tied the belts with a square knot, the third one tore, and he deleted his voicemail with Dale's PIN.", kind: 'person', art: 'av_c8_corey' },
    { id: 'fake_camera', title: 'The camera was fake', text: "Ronnie: the security camera Dale was dressing up for is a $14 dummy with a red light and no battery.", kind: 'object' },
  ],

  questions: [
    {
      id: 'q_how', prompt: 'How did Dale Hupp die?',
      options: [
        { id: 'brenda', label: 'Brenda Kowalczyk beat him and dumped him in the pit', art: 'av_c8_brenda' },
        { id: 'ronnie', label: 'Ronnie caught a masked burglar and hit him' },
        { id: 'fall', label: 'He fell through the roof hatch onto the rim of the ball pit when his rope gave way' },
        { id: 'drunk', label: 'He passed out drunk in the ball pit and never woke up' },
      ],
      answer: 'fall', evidence: ['last_frame', 'torn_belt', 'phone_roof', 'roof_hatch', 'ninja_selfie', 'corey_vm', 'laundromat_witness', 'corey_confess'],
      explain: "His phone climbed onto the roof over Unit 5 and dropped almost four metres in under a second at 01:46. The hatch was found open, a torn belt was knotted round his waist, and his last frame shows the hatch above him.",
    },
    {
      id: 'q_why', prompt: "Why was Dale going into Jumpin' Jax in the middle of the night?",
      options: [
        { id: 'cash', label: "To steal Ronnie's party cash" },
        { id: 'frame', label: "To fake an Iron Lotus break-in on Ronnie's camera so Brenda would lose the lease" },
        { id: 'tammy', label: 'To meet Tammy somewhere romantic' },
        { id: 'hide', label: 'To hide from Crystal and the $1,900' },
      ],
      answer: 'frame', evidence: ['op_plan', 'whiteboard_plan', 'plan_texts', 'lease_war', 'hoodie_buy', 'ninja_selfie', 'fake_camera'],
      explain: "The lease went to whoever had fewer complaints on Monday. Dale was wearing a Lotus hoodie bought at Brenda's own table, with the logo facing a camera that turned out to be fake.",
    },
    {
      id: 'q_rope', prompt: 'What gave way?',
      options: [
        { id: 'hinge', label: 'The roof hatch hinge' },
        { id: 'corey', label: 'Corey let go' },
        { id: 'belt', label: 'One of his $8.99 novelty "10th Dan" black belts' },
        { id: 'ladder', label: "Cousin Rick's ladder" },
      ],
      answer: 'belt', evidence: ['cheap_belts', 'last_frame', 'torn_belt', 'belt_search', 'belt_rope', 'corey_confess', 'corey_vm'],
      explain: "The rope was six polyester display belts 'not intended for bearing any load'. The last frame and the torn belt round his waist show where it failed.",
    },
    {
      id: 'q_partner', prompt: 'Who was on the roof with Dale?',
      options: [
        { id: 'nobody', label: 'Nobody. He went alone' },
        { id: 'corey', label: 'Corey Platt', art: 'av_c8_corey' },
        { id: 'brenda', label: 'Brenda Kowalczyk', art: 'av_c8_brenda' },
        { id: 'tammy', label: 'Tammy', art: 'av_c8_tammy' },
        { id: 'ronnie', label: 'Ronnie Duquette', art: 'av_c8_ronnie' },
      ],
      answer: 'corey', evidence: ['belt_rope', 'corey_vm', 'laundromat_witness', 'plan_texts', 'corey_confess', 'corey_lie', 'shared_pin', 'whiteboard_plan'],
      explain: "Corey is in the 01:24 rooftop photo with the belts, left a voicemail from the roof at 01:53, deleted it with Dale's PIN, and then claimed he was home with his mother.",
    },
    {
      id: 'q_brenda', prompt: 'Where was Brenda Kowalczyk between 01:00 and 03:00?',
      options: [
        { id: 'lot', label: 'Waiting in the parking lot' },
        { id: 'dojo', label: 'At Iron Lotus, across the lot' },
        { id: 'jail', label: 'In Haskett County Jail, booked at 23:58 for drunk-driving a ride-on mower' },
        { id: 'casino', label: 'At the casino with Ronnie' },
      ],
      answer: 'jail', evidence: ['brenda_arrest', 'brenda_booked'],
      explain: "She threatened him, but she was arrested on the Antler Lodge lawn at 23:56 and booked at 23:58. Dale gloated about it at 00:22.",
    },
  ],

  events: [
    { id: 'e8_crystal', kind: 'text', when: ['unlocked'], delayMs: 4000, thread: 'th_crystal', contact: 'crystal', text: "Hi, police person. Dale still owes me $1,900. Is that coming out of the estate, or is the estate just a ponytail, a mall sword and a cinnamon-whiskey-scented Corolla?" },
    { id: 'e8_h_brenda', kind: 'handler', when: ['pinned:brenda_threat'], delayMs: 3000, text: "The precinct's whiteboard says Kowalczyk in red. Before we agree with a whiteboard, let's see where she actually was between one and three." },
    { id: 'e8_dolores', kind: 'text', when: ['recovered:photos'], minPins: 6, delayMs: 6000, thread: 'th_c8unknown', contact: 'c8unknown', text: "this the karate guy's phone? i'm Dolores, nights at Suds City across the road. around 1 two guys put a ladder up the back of the plaza. big one in a hood, skinny one. quarter to two, CRASH, and the skinny one comes down that ladder like a raccoon, crying 'I'M SORRY SENSEI', drives off in a green hatchback with a pet store sticker. i thought they were filming one of those videos. i didn't call nobody. i had a dryer full of comforters.", clue: 'laundromat_witness' },
    { id: 'e8_h_hatch', kind: 'handler', when: ['pinned:last_frame'], delayMs: 3500, text: "The ME's notes: injuries consistent with a fall of about four metres onto the steel rim of the pit. Lorraine Gutt says the roof hatch over Unit 5 was open. So what was holding him up, and who tied it?" },
    { id: 'e8_corey', kind: 'text', when: ['recovered:voice'], delayMs: 5000, thread: 'th_corey', contact: 'corey', text: "is somebody reading sensei's phone. it's corey. i tied the knot. square knot, right over left, like he taught us. it was his new belts, the shiny ones. the third one just went. i deleted my voicemail with his pin because he said delete his voicemails if anything happened and something happened. my mom's driving me to the police. she says to tell you i was NOT home watching baking shows. she was very clear.", clue: 'corey_confess' },
    { id: 'e8_h_ready', kind: 'handler', when: ['unlocked'], minPins: 16, delayMs: 3000, text: "Precinct wants to charge Kowalczyk by Friday because it makes a nicer press release. When every answer has a pin behind it, file the Case Report." },
  ],

  hints: [
    { until: 'unlocked', text: "Crystal says: count the tape stripes on each belt in the order he 'earned' them. The wallpaper hangs them in vanity order. Corey's notification gives the real order: white → yellow → brown → black." },
    { until: 'recovered:photos', after: ['unlocked'], text: 'Dale took pictures of everything, including crimes. Run TRACE Photos.' },
    { until: 'hidden:open', after: ['unlocked'], text: "Photos has a Hidden album. Grandmasters have secrets. Look past the man in the mirror." },
    { until: 'pinned:brenda_booked', after: ['unlocked'], text: "Brenda is the precinct's favourite. Where was she after 23:56? Tammy's texts and Dale's own browser know." },
    { until: 'pinned:lease_war', after: ['unlocked'], text: 'What was Dale about to lose on Monday morning? Check the Inbox from Sunvale Plaza Management.' },
    { until: 'recovered:msgfrag', after: ['pinned:lease_war'], text: "Dale ran 'ninja protocol' on his texts. TRACE the message fragments." },
    { until: 'note:n_opballpit', after: ['unlocked'], text: "The operation note wants Corey's student number, counted in Japanese. Glimpse has the number; Dale's 'Dojo counting' note has the word." },
    { until: 'pinned:belt_rope', after: ['recovered:photos'], text: 'Who is on the roof at 01:24, and what are they holding? Pin it.' },
    { until: 'recovered:voice', after: ['pinned:belt_rope'], text: "A call came in from the roof at 01:53 and its voicemail is gone. Who else knew Dale's PIN? TRACE the carrier cache." },
    { until: 'recovered:history', after: ['note:n_opballpit'], text: "Dale cleared his browser right before the mission. TRACE can bring it back." },
    { until: 'pinned:cheap_belts', after: ['unlocked'], text: 'What exactly was the rope made of? Check Mail and Bank for the order.' },
    { until: 'report:filed', after: ['unlocked'], text: "Open the Case Report. Back every answer with a pin. Somebody has to take this man's death seriously, and it isn't going to be his ex-wife." },
  ],

  handlerIntro: "Grown man, ski mask, rival dojo's hoodie, face down in a kids' ball pit. The precinct thinks this is a murder. I think it's the dumbest crime scene I've seen this year, and I've worked a case where the getaway car was a golf cart. Get the phone open.",

  epilogue: {
    solved: [
      "The Haskett County medical examiner ruled Dale Hupp's death an accident: a fall of about four metres through the roof hatch over Unit 5 onto the steel rim of a children's ball pit. The rope was six KarateKing Wholesale '10th Dan Grandmaster' belts at $8.99 each, square-knotted by Corey Platt. The third belt tore beside the knot. The lab described the polyester's strength as 'gift ribbon, but sadder'.",
      "Brenda Kowalczyk was released from Haskett County Jail at 08:40 Sunday with a DUI for a ride-on mower and no idea she'd spent a day and a half as the prime suspect in a homicide. She turned down the renewal: 'I'm not winning it off a dead idiot.' She paid for the funeral wreath anyway. It was shaped like a belt. A white one.",
      "Ronnie Duquette's security camera, the one the whole operation was staged for, was a $14 dummy with no battery. Ronnie has since installed a real one. 'Not for burglars,' he told the Sunvale Sentinel. 'In case he comes back. Through the ceiling. Like a ghost ninja.' Jumpin' Jax replaced all 4,000 balls and Ronnie billed the estate for every one.",
      "Corey Platt pleaded guilty to trespass and tampering with evidence: he deleted one voicemail with a PIN his sensei had begged him to use. The judge gave him 200 hours of community service at Jumpin' Jax, where Ronnie makes him wear the clown suit. The parakeets at the pet store were reportedly 'very supportive'.",
      "Crystal Hupp got her $1,900 from the estate, which was the exact contents of the dojo's 'testing fees' cash box. She also received the 10th Dan certificate and framed it above her toilet. Lorraine Gutt leased Unit 4 to a mattress outlet. Its banner reads NO MERCY ON PRICES. Somebody spelled it right.",
    ],
    partial: [
      'Your report reached the precinct with gaps in it.',
      "Without the roof, the rope and the man holding it, the story stays the one on the whiteboard: rival sensei, a threat in writing, a body in her rival's hoodie. Brenda Kowalczyk is arraigned for a murder she slept through in a county cell.",
      'Go back to 01:46. Follow the phone up and then down.',
    ],
  },
};
