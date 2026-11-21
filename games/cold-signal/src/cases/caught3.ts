import type { CaseFile } from '../types';

// CAUGHT C3 — FANTASY LEAGUE
// The player IS Doug Hoyt, 44, Regional Sales Manager at Pinnacle Gutters (saved in her
// phone as 'Doug 🏠'). 3:10 a.m.: wife Dana Hoyt, 41, physical therapist, is asleep on the
// couch in a hoodie that isn't his — CASTELLANO 12. Her phone is charging on the counter.
// Her "system": a shared calendar of '🌶️' Thursdays, a fantasy-football league chat whose
// codes ("starting my QB", "bye week", "handcuff") schedule Thursday nights, and a locked
// note disguised as a calculator ("🧮 Calculator") — plus Lakeview Inn Room 214, booked
// as Mr. & Mrs. Smith, with minibar for two.
// The lover: Rafe Castellano, 39, her pickleball partner and the Commish of the Gridiron
// Gentlemen — YOUR fantasy league.
// Gut-punch: it isn't cheating. On May 30, draft night, six IPAs in, YOU proposed opening
// the marriage, picked Rafe ("he's a golden retriever"), wrote THE RULES, created and
// shared the 🌶️ calendar, and PaySnapped the first room ("room 🏨 have fun 👍 rule 4: I
// pay the first one"). Rule 1: "I will never look at her phone." Rule 3: "I never want to
// see any of it" — which is why she hides it all from you. Then you couldn't handle it:
// 3 a.m. searches on your iPad (shared tab group) — "is it normal to regret being a cuck",
// "how to un-open a relationship" — and on Nov 12 you sat in the Lakeview lot eating a
// rotisserie chicken with your hands. You told everyone you were "fine 👍".
// Last gut-punch: Dana had already decided to end it with Rafe this Thursday — for you —
// and PaySnapped your money back: "you don't have to pay for this anymore. please talk to me."
// Also: her friends' chat has been roasting you; your own mother knew (and told your aunt).
// Passcode 4138: her framed scorecard — front-nine strokes (41) then back-nine (38).
// Trap: the par row (36/36).

const DEZ = { name: 'Dez', role: 'your best friend', avatar: 'av_cg_bff' };

export const caught3: CaseFile = {
  id: 'caught-3',
  number: 'C3',
  mode: 'caught',
  handler: DEZ,
  title: 'Fantasy League',
  tagline: "A shared calendar. A calculator that doesn't calculate. A league chat that schedules your wife's Thursdays. And your own words, quoted back at you.",
  difficulty: 2,
  cover: 'cg3_cover',
  owner: { name: 'Dana Hoyt', age: 41, summary: "Your wife of fifteen years. Physical therapist. Pickleball doubles champion, Briar Glen Rec League. The only woman in your fantasy league, and the only one who's ever won it." },
  status: 'SUSPECTED CHEATER',
  deviceCondition: 'CHARGING ON THE KITCHEN COUNTER · 100% · SHE IS ASLEEP 4 METRES AWAY IN ANOTHER MAN\'S HOODIE',
  briefing: [
    "3:10 a.m. Dana fell asleep on the couch with the TV on. She's wearing a grey hoodie you've never bought. Across the back, in block letters: CASTELLANO 12.",
    "Castellano. Rafe Castellano. Her pickleball partner. The Commish of your fantasy league. The guy whose team is called 'Tight End Situation'. The guy you've described, out loud, at a barbecue, as 'basically a golden retriever'.",
    "Thursdays she has 'pickleball league' until eleven. She comes home with her hair wet. The league chat keeps saying things like 'starting my QB thursday' and the guys stop talking when you walk into the draft room. You've been sleeping in the garage 'for the gutters'. You're not sure why. You're not sure of a lot of things since May.",
    "Her phone is charging on the counter. Her code is the framed scorecard in the garage — her best round ever, Rolling Pines. 'Front nine, back nine, Doug. Add it up, I'm not doing your math for you.' The totals got coffee on them.",
    "Dez is awake. Dez is always awake. Pick it up.",
  ],
  phoneDate: '2026-11-20',
  phoneTime: '03:10',
  lock: {
    passcode: '4138',
    hint: 'add up her strokes on the framed scorecard (not the par row): front-nine total, then back-nine total',
    wallpaper: 'cg3_wall_lock',
    notifications: [
      { app: 'messages', title: 'Rafe 🥒', text: "you still smell like me. I can tell from here. that's not how smell works. I don't care", t: '2026-11-20T00:41' },
      { app: 'messages', title: 'Gridiron Gentlemen 🏈', text: '[Big Paulie]: starting your QB again thursday dana? 👀', t: '2026-11-19T12:02' },
      { app: 'calendar', title: '🌶️', text: 'Thursday 7:00 PM · Lakeview', t: '2026-11-19T18:00' },
      { app: 'mail', title: 'Lakeview Inn', text: 'Thank you for staying with us, Mrs. Smith! Your folio is ready 🧾', t: '2026-11-20T00:05' },
      { app: 'messages', title: 'Bo (Rafe\'s roommate)', text: 'hi dana. respectfully. the walls are drywall', t: '2026-11-13T06:02' },
    ],
  },
  homeWallpaper: 'cg3_wall_home',

  contacts: [
    { id: 'doug', name: 'Doug 🏠', avatar: 'av_cg3_doug', number: '(555) 761-1977', label: 'husband (you)' },
    { id: 'rafe', name: 'Rafe 🥒', avatar: 'av_cg3_rafe', number: '(555) 761-0012', label: 'pickleball' },
    { id: 'league', name: 'Gridiron Gentlemen 🏈', avatar: 'av_cg3_league', number: '(555) 761-0000', label: 'group · 6' },
    { id: 'pickle', name: 'Pickle Girls 🥒', avatar: 'av_cg3_pickle', number: '(555) 761-0001', label: 'group · 4' },
    { id: 'family', name: 'Hoyt Family 🦃', avatar: 'av_cg3_family', number: '(555) 761-0002', label: 'group · 7' },
    { id: 'tara', name: 'Tara (Lucy\'s mom)', avatar: 'av_cg3_tara', number: '(555) 761-7707' },
    { id: 'mel', name: 'Mel 🥒', avatar: 'av_cg3_mel', number: '(555) 761-2210', label: 'doubles partner #2' },
    { id: 'coach', name: 'Pickle Coach (ignore)', avatar: 'av_unknown', number: '(555) 761-0012', label: 'added Jun 4' },
    { id: 'bo', name: "Bo (Rafe's roommate)", avatar: 'av_cg3_bo', number: '(555) 761-4400' },
  ],

  threads: [
    {
      id: 'th_doug', contact: 'doug', messages: [
        { from: 'me', text: "14 years 💍 you still make me laugh about GUTTERS. nobody should be able to do that. I love you, systems guy", t: '2025-11-21T23:30', clue: 'drift' },
        { from: 'them', text: '14!! best teammate. best drafter. worst at fantasy. love you dana', t: '2025-11-21T23:31' },
        { from: 'me', text: "🎤 voice note (0:15): '[laughing] you just said \"rain gutter\" in your sleep in a romantic voice. I love you. you're insane. goodnight.'", t: '2026-02-03T00:50', clue: 'drift' },
        { from: 'them', text: "ok. I've had six IPAs and I'm going to say something and I need you to not laugh", t: '2026-05-30T23:41', clue: 'your_words', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "I want you to have fun. like FUN fun. you've been with me since you were 26. I'm a gutter guy. you deserve a... second opinion", t: '2026-05-30T23:43', clue: 'your_words', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'doug. are you saying what I think you are saying', t: '2026-05-30T23:44', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "rafe. it should be rafe. he's a golden retriever. he's harmless. I trust him. I picked him. I'm fine with it 👍", t: '2026-05-30T23:46', clue: 'your_words', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: "I'm not doing anything you haven't thought about sober", t: '2026-05-30T23:50', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "I'm sober now. sober-ish. I'm sending you the rules. I wrote rules. there are eight. I made a calendar too, it's shared, it's called Dana's Thursdays 🏈 because I thought that was funny", t: '2026-06-02T19:10', clue: 'your_words', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'sent you the room money. rule 4. I pay the first one. have fun 👍', t: '2026-06-04T18:30', clue: 'your_words', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'are you SURE. you can say stop any time. any time, doug', t: '2026-06-04T18:32', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "I'm sure. I'm great. I'm so fine. 👍👍", t: '2026-06-04T18:33', clue: 'your_words', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'pickleball then lakeview. home by 11 💕 there\'s lasagna', t: '2026-11-12T18:20' },
        { from: 'them', text: '👍', t: '2026-11-12T18:21' },
        { from: 'me', text: 'you ok? you said 👍 like a hostage', t: '2026-11-12T18:22' },
        { from: 'them', text: "great. gutters. 👍", t: '2026-11-12T18:30' },
        { from: 'them', text: "pickleball runs til 11 now? 👍", t: '2026-11-05T22:40' },
        { from: 'me', text: "my phone died sorry!! yes. long rally. it's literally just pickleball doug", t: '2026-11-05T23:15', clue: 'excuses' },
        { from: 'me', text: "you're allowed to ask me things you know. rule 6. you made it", t: '2026-11-05T23:16', clue: 'excuses' },
        { from: 'them', text: '👍', t: '2026-11-05T23:40' },
        { from: 'me', text: 'night ❤️ love you. come up from the garage?', t: '2026-11-10T23:02', clue: 'juxtapose' },
        { from: 'them', text: '👍 night', t: '2026-11-10T23:30', clue: 'drift' },
        { from: 'me', text: 'doug, why are you sleeping in the garage', t: '2026-11-15T23:10', clue: 'ending_it' },
        { from: 'them', text: "the gutters need monitoring. it's a gutter thing", t: '2026-11-15T23:20' },
        { from: 'me', text: "doug. rule 6 says we talk every sunday. we haven't talked since september. please talk to me", t: '2026-11-15T23:22', clue: 'ending_it' },
        { from: 'them', text: "all good 👍 night", t: '2026-11-15T23:40' },
      ],
    },
    {
      id: 'th_rafe', contact: 'rafe', messages: [
        { from: 'them', text: 'good game today. your third shot drop is illegal in four states', t: '2026-11-03T14:10' },
        { from: 'me', text: 'you stood in the kitchen the whole time. that\'s against the rules rafe', t: '2026-11-03T14:12' },
        { from: 'them', text: "I like the kitchen. you're always in it", t: '2026-11-03T14:12' },
        { from: 'them', text: 'it came 📦 unmarked. bo signed for it. bo has questions', t: '2026-11-07T16:41', photo: 'cg3_ph_box', clue: 'blue_box' },
        { from: 'them', text: "sent you a paysnap request. 'batteries 48-ct'. you owe me 😏", t: '2026-11-13T08:20', clue: 'blue_box' },
        { from: 'me', text: "he's in the garage again. call me", t: '2026-11-10T23:04', clue: 'juxtapose' },
        { from: 'them', text: "calling. you okay? you sound like you've been crying. tell me", t: '2026-11-10T23:05' },
        { from: 'me', text: "he'll never ask. he made a rule about it. I think about you when I'm with him and I think about HIM when I'm with you. delete this after", t: '2026-11-10T23:50', clue: 'juxtapose' },
        { from: 'them', text: 'deleted. same time thursday? or do you want to just talk', t: '2026-11-10T23:52' },
        { from: 'me', text: "same time thursday. I miss your hands. we have to stop. ok one more time", t: '2026-11-10T23:55', clue: 'juxtapose' },
        { from: 'them', text: 'what are you wearing', t: '2026-11-11T22:40' },
        { from: 'me', text: 'compression socks and a heating pad. you ruined my hamstring', t: '2026-11-11T22:41' },
        { from: 'them', text: "I meant it romantically. I'll fix your hamstring. I'm not a PT but I've watched one work", t: '2026-11-11T22:42' },
        { from: 'me', text: '...your hoodie. the grey one. I never gave it back', t: '2026-11-11T22:50', photo: 'cg3_ph_hoodie_her' },
        { from: 'them', text: '...', t: '2026-11-11T22:52' },
        { from: 'them', text: "ok. thursday's going to be a problem for my roommate", t: '2026-11-11T22:52' },
        { from: 'me', text: 'omg stop 🥵 go to sleep', t: '2026-11-11T22:53' },
        { from: 'them', text: "you remember tuesday. the green sports bra. you said 'it's just a sports bra rafe'. it was not just a sports bra dana", t: '2026-11-11T22:55' },
        { from: 'them', text: "lakeview. 214. door's unlocked. I got the good pillows and the stupid little chocolates you like", t: '2026-11-12T18:58', clue: 'lakeview' },
        { from: 'me', text: 'parking now. there is a truck in the lot that looks like doug\'s. it\'s not doug\'s. doug doesn\'t eat in his car', t: '2026-11-12T19:01', clue: 'chicken' },
        { from: 'me', text: 'omg my legs', t: '2026-11-12T22:18' },
        { from: 'me', text: "I'm still shaking. how am I supposed to act normal at dinner. he's making his chili. he'll give me a thumbs up over the chili", t: '2026-11-12T22:25', clue: 'aftermath' },
        { from: 'them', text: "[voice note, 0:12] '[laughs softly] act normal. compliment the chili. don't limp. you're limping, aren't you. [laughs] okay. drive safe. text me when you're home. text me even if it's just a dot.'", t: '2026-11-12T22:27' },
        { from: 'me', text: '.', t: '2026-11-12T22:51' },
        { from: 'them', text: "sorry about the scratch on your shoulder. I mean I'm not. I mean I am. I'll buy you a turtleneck", t: '2026-11-12T22:20', clue: 'aftermath' },
        { from: 'them', text: 'last night was 🥵 but this morning was 🥺 you stole the robe AND my hoodie. keep the hoodie. keep everything', t: '2026-11-13T08:10', clue: 'aftermath' },
        { from: 'me', text: "can't walk straight lmao. a 72-year-old patient asked if I needed PT", t: '2026-11-13T09:40', clue: 'aftermath' },
        { from: 'them', text: "this one's ours 🎧 'Kitchen Line' — Slow Lob Society", t: '2026-11-13T21:00', clue: 'our_song' },
        { from: 'me', text: "rafe that's the song from my wedding. doug picked it. it's about a kitchen. he thought it was about COOKING", t: '2026-11-13T21:04', clue: 'our_song' },
        { from: 'me', text: 'thursday I need to talk to you. not in the room. at the courts. it\'s about doug', t: '2026-11-17T20:00', clue: 'ending_it' },
        { from: 'them', text: "is he ok? is this still ok? I'll do whatever you need. I always liked him. he called me a golden retriever, it's the nicest thing a man's ever said about me", t: '2026-11-17T20:05', clue: 'ending_it' },
        { from: 'them', text: "you still smell like me. I can tell from here. that's not how smell works. I don't care", t: '2026-11-20T00:41' },
      ],
    },
    {
      id: 'th_league', contact: 'league', messages: [
        { from: 'them', text: '[The Commish]: Week 10. Trades due Thursday. Bye weeks are SACRED.', t: '2026-11-03T12:00' },
        { from: 'them', text: "[The Commish]: dana, starting my QB thursday? 🏈", t: '2026-11-10T12:02', clue: 'league_code' },
        { from: 'me', text: 'confirmed. usual field. 7 pm', t: '2026-11-10T12:05', clue: 'league_code' },
        { from: 'them', text: "[Doug]: 👍", t: '2026-11-10T12:06', clue: 'league_code' },
        { from: 'them', text: '[Sully]: why does doug thumbs-up every QB message 💀', t: '2026-11-10T12:07' },
        { from: 'them', text: '[Big Paulie]: over/under on when doug cracks. I got thanksgiving', t: '2026-11-10T12:08', clue: 'friends_roast' },
        { from: 'them', text: '[Sully]: I got "already cracked". he was at costco crying near the rotisserie chickens', t: '2026-11-10T12:09', clue: 'friends_roast' },
        { from: 'them', text: "[The Commish]: guys. GUYS. he's my friend. side pots are cancelled. Rule 12", t: '2026-11-10T12:10' },
        { from: 'them', text: '[Doug]: lol I am totally fine. 👍 go rafe', t: '2026-11-10T12:30', clue: 'league_code' },
        { from: 'them', text: "[Big Paulie]: starting your QB again thursday dana? 👀", t: '2026-11-19T12:02' },
        { from: 'me', text: 'bye week for me after this one. need a handcuff on the 26th if anyone asks where I am', t: '2026-11-19T12:10', clue: 'ending_it' },
      ],
    },
    {
      id: 'th_pickle', contact: 'pickle', messages: [
        { from: 'them', text: '[Mel]: wait. DOUG picked the guy?? doug PICKED the guy', t: '2026-06-05T10:00', clue: 'friends_roast' },
        { from: 'me', text: "he picked him and paid for the room and made a CALENDAR. it's called Dana's Thursdays. with a football", t: '2026-06-05T10:02', clue: 'friends_roast' },
        { from: 'them', text: '[Jo]: cuckold king of briar glen 👑🥒', t: '2026-06-05T10:03', clue: 'friends_roast' },
        { from: 'them', text: '[Mel]: is it a cuck thing if he does it with a SPREADSHEET', t: '2026-06-05T10:04' },
        { from: 'me', text: "be nice. he's sweet. he's just... he says 'I'm fine' in the voice he uses when the gutters leak", t: '2026-06-05T10:06' },
        { from: 'them', text: "[Jo]: girl rafe's roommate posted 'the walls are drywall' on his close friends. with a skull. I'm on his close friends. why am I on bo's close friends", t: '2026-11-13T09:00', clue: 'roommate' },
        { from: 'them', text: "[Mel]: also saw doug at costco near the rotisserie chickens just. holding one. like a baby", t: '2026-11-14T15:30', clue: 'friends_roast' },
        { from: 'me', text: "I'm ending it. thursday. he's not fine. he's sleeping in the garage. I don't care how 'golden retriever' rafe is", t: '2026-11-17T21:00', clue: 'ending_it' },
        { from: 'them', text: '[Jo]: 🥺 oh dana', t: '2026-11-17T21:01' },
      ],
    },
    {
      id: 'th_family', contact: 'family', messages: [
        { from: 'them', text: "[Mom Hoyt]: Dana honey, Doug told me about your 'arrangement' after two glasses of wine at Sunday dinner. I have told NO ONE.", t: '2026-09-14T09:00', clue: 'family_knew' },
        { from: 'them', text: '[Aunt Pat]: WHAT ARRANGEMENT', t: '2026-09-14T09:01', clue: 'family_knew' },
        { from: 'them', text: '[Mom Hoyt]: I told Pat.', t: '2026-09-14T09:01' },
        { from: 'them', text: "[Aunt Pat]: is it the pickleball man. Gloria said it's the pickleball man. Gloria saw them at the Lakeview with a bucket of ice", t: '2026-09-14T09:03', clue: 'family_knew' },
        { from: 'them', text: '[Cousin Trevor]: this is the family chat', t: '2026-09-14T09:04' },
        { from: 'them', text: '[Mom Hoyt]: Doug says he is "fine with it". He said it with a thumbs up. With his actual thumb. At the table.', t: '2026-09-14T09:05', clue: 'family_knew' },
        { from: 'me', text: "can we please not do this in the thanksgiving chat", t: '2026-09-14T09:20' },
        { from: 'them', text: "[Aunt Pat]: is the pickleball man coming to thanksgiving. I'll make the good stuffing", t: '2026-09-14T09:22' },
      ],
    },
    {
      id: 'th_mel', contact: 'mel', messages: [
        { from: 'me', text: "if doug asks, tonight I was at yours watching Love Island. DON'T say lakeview. rule 3. he doesn't want to know and I'm not making him know", t: '2026-11-12T17:50', clue: 'mel_cover' },
        { from: 'them', text: "dana he PICKED the guy. he MADE a calendar. why are we lying to the calendar man", t: '2026-11-12T17:51', clue: 'mel_cover' },
        { from: 'me', text: "because he asked me to. rule 3. please", t: '2026-11-12T17:52', clue: 'mel_cover' },
        { from: 'them', text: 'did you get the... package 👀', t: '2026-11-08T10:00', clue: 'blue_box' },
        { from: 'me', text: "went to rafe's. bo signed for it. bo said 'I'm not asking' and then asked", t: '2026-11-08T10:02', clue: 'blue_box' },
      ],
    },
    {
      id: 'th_tara', contact: 'tara', messages: [
        { from: 'them', text: "Hi Dana. This is Tara, Lucy's mom. Rafe's ex. Lucy came home from his place saying 'Miss Dana's sweatshirt smells like Daddy's'. She's seven. She notices everything.", t: '2026-11-15T20:00', clue: 'rafe_family' },
        { from: 'them', text: "I don't care what you are to him. I care that she doesn't meet anyone who isn't staying. He told me you're 'just his pickleball partner'. He told Lucy you're 'a friend'. Someone's lying to someone.", t: '2026-11-15T20:02', clue: 'rafe_family' },
        { from: 'me', text: "Tara, I'm so sorry. You're right. I'm not staying. I'm ending it Thursday. She'll never see me at his place again.", t: '2026-11-15T21:30', clue: 'ending_it' },
      ],
    },
    {
      id: 'th_bo', contact: 'bo', messages: [
        { from: 'them', text: 'hi dana. respectfully. the walls are drywall', t: '2026-11-13T06:02', clue: 'roommate' },
        { from: 'them', text: "I have a 6am shift. I have heard my own name used as a verb. I don't know how. I'm not even IN there", t: '2026-11-13T06:03', clue: 'roommate' },
        { from: 'me', text: "bo I am SO sorry. we were at the lakeview! that wasn't even us", t: '2026-11-13T07:10' },
        { from: 'them', text: "then who was it. dana. WHO WAS IT. I live alone with rafe and a ficus", t: '2026-11-13T07:11' },
      ],
    },
  ],

  photos: [
    { id: 'cg3_ph_lucy', art: 'cg3_ph_lucy', t: '2026-10-02T15:00', place: 'Received from Rafe 🥒', orientation: 'portrait', caption: "Received. A child's school portrait: a gap-toothed girl in a pickleball T-shirt against a blue backdrop. A text overlay: '2nd grade'.", clue: 'rafe_family' },
    { id: 'cg3_ph_box', art: 'cg3_ph_box', t: '2026-11-07T16:40', place: 'Received from Rafe 🥒', orientation: 'portrait', caption: 'Received. A plain brown box with no logo on an apartment doormat beside a potted ficus; a hand-lettered sign on the door: 3B.', clue: 'blue_box' },
    { id: 'cg3_ph_mel_wine', art: 'cg3_ph_mel_wine', t: '2026-11-12T20:40', place: 'Corkscrew Wine Bar', orientation: 'portrait', caption: "From Mel's Glimpse story. A woman alone at a wine-bar counter raising a glass; a chalkboard behind her lists tonight's date and a trivia night.", clue: 'mel_cover' },
    { id: 'cg3_ph_scorecard', art: 'cg3_ph_scorecard', t: '2026-10-12T14:00', place: 'Briar Glen — garage', orientation: 'landscape', caption: 'A tidy garage: two golf bags, a mini-fridge, a framed scorecard on pegboard, a folding cot with a pillow and a phone charger beside the water heater.' },
    { id: 'cg3_ph_us_dock', art: 'cg3_ph_us_dock', t: '2026-11-05T20:10', place: "Dockside Grill — table by the window", orientation: 'portrait', caption: 'Selfie at a waterfront restaurant table: a woman smiling, a man beside her giving a thumbs-up with a forced grin. A lit buoy outside the window.', clue: 'same_table' },
    { id: 'cg3_ph_dock_r', art: 'cg3_ph_dock_r', t: '2026-11-12T18:20', place: "Dockside Grill — table by the window", orientation: 'portrait', caption: 'Selfie at the same window table: the same woman beside a taller man in a pickleball visor, both laughing, sharing one dessert. The same lit buoy outside.' },
    { id: 'cg3_ph_couch', art: 'cg3_ph_couch', t: '2026-11-13T23:30', place: 'Briar Glen — living room', orientation: 'landscape', caption: "A living-room couch at night: a grey hoodie draped over the arm, the back printed with a surname and the number 12. A men's watch with a red strap on the coffee table beside two wine glasses.", clue: 'hoodie' },
    { id: 'cg3_ph_keycard', art: 'cg3_ph_keycard', t: '2026-11-12T18:59', place: 'Lakeview Inn', orientation: 'portrait', caption: 'A hotel key card in a paper sleeve with a handwritten room number and surname, held up in front of a door numbered 214.', clue: 'lakeview' },
    { id: 'cg3_ph_lot', art: 'cg3_ph_lot', t: '2026-11-12T19:00', place: 'Lakeview Inn — parking lot', orientation: 'landscape', caption: 'Recovered. Through a windshield at dusk: a pickup truck across the lot with a Pinnacle Gutters magnet on the door; a figure inside holding something round in a plastic dome. Deleted Nov 12.', clue: 'chicken', deletedUntil: 'recovered:photos' },
    { id: 'cg3_ph_video', art: 'cg3_ph_video', t: '2026-11-12T21:30', place: 'Lakeview Inn, Room 214', orientation: 'landscape', caption: "Recovered video thumbnail; video data unrecoverable. Title: 'oops 🙈'. A dark hotel room lit by a TV: rumpled sheets, two silhouettes against a curtain, a pickleball paddle on the lamp. Deleted Nov 13.", clue: 'aftermath', deletedUntil: 'recovered:photos' },
    { id: 'cg3_ph_mirror', art: 'cg3_ph_mirror', t: '2026-11-13T07:45', place: 'Lakeview Inn, Room 214', orientation: 'portrait', caption: 'Recovered. A hotel bathroom mirror with a message in pink lipstick and a drawn pickle. Deleted Nov 13.', clue: 'aftermath', deletedUntil: 'recovered:photos' },
    { id: 'cg3_ph_rules', art: 'cg3_ph_rules', t: '2026-06-02T19:12', place: 'Screenshot', orientation: 'portrait', caption: "Recovered screenshot of a shared-calendar invitation: 'Doug Hoyt shared the calendar \"Dana's Thursdays 🏈\" with you. Permission: can edit.' Deleted Jun 3.", clue: 'shared_calendar', deletedUntil: 'recovered:photos' },
    // Hidden album
    { id: 'cg3_ph_hoodie_her', art: 'cg3_ph_hoodie_her', t: '2026-11-11T22:49', place: 'Briar Glen — bedroom', orientation: 'portrait', hidden: true, caption: 'Hidden album. Sent to one contact. Mirror selfie: a woman in an oversized grey hoodie that reaches mid-thigh, bare legs, hood up, sleeve pulled over her mouth.' },
    { id: 'cg3_ph_h_rafe', art: 'cg3_ph_h_rafe', t: '2026-11-10T22:30', place: 'Received from Rafe 🥒', orientation: 'portrait', hidden: true, caption: "Hidden album. Received. A shirtless, sweaty man in a backwards cap and athletic shorts on an empty pickleball court at night, paddle resting on his shoulder. Caption field: 'practice. alone. thinking about your backhand. that's not a metaphor. it is a little bit a metaphor'." },
    { id: 'cg3_ph_h_robe', art: 'cg3_ph_h_robe', t: '2026-11-13T07:50', place: 'Lakeview Inn, Room 214', orientation: 'portrait', hidden: true, caption: 'Hidden album. Morning mirror selfie: a woman in a hotel robe slipping off one shoulder, a fresh scratch on the shoulder, hair wet, holding a coffee cup with a lipstick mark.', clue: 'aftermath' },
    { id: 'cg3_ph_h_tryon', art: 'cg3_ph_h_tryon', t: '2026-11-08T21:00', place: 'Briar Glen — bedroom', orientation: 'portrait', hidden: true, caption: "Hidden album. Sent to one contact. Two-panel try-on in a bedroom mirror: an emerald sports-bra-and-shorts set, then a black lace set; tags still on. Caption field: 'for thursday. which one'." },
  ],

  notes: [
    {
      id: 'n_calc', title: '🧮 Calculator', t: '2026-06-02T19:20', lock: { password: 'qb', hint: "Rule 2: we only use the league word for him. Two letters, lowercase." }, clue: 'rules_note',
      body: "(pasted from Doug's text, Jun 2, 19:08)\n\nTHE RULES — by Doug\n\n1. I will never look at her phone. Ever. I'm not that guy.\n2. In the league chat we call him 'the QB'. Nobody else will get it. (Sully will not get it.)\n3. I never want to see ANY of it. Hide everything. Put it in a calculator if you have to.\n4. I pay for the first room. Have fun 👍\n5. Location stays on so I know you're safe. That's it. That's the only reason.\n6. We talk every Sunday. Honestly.\n7. Either of us can say stop any time and the other one says 'ok' and means it.\n8. It's just Rafe. He's a golden retriever. I trust him.\n\n— Dana's note: rule 6 hasn't happened since September. he says '👍'. he's sleeping in the garage. I'm saying stop. Thursday.",
    },
    { id: 'n_draft', title: 'draft — to D (unsent)', t: '2026-11-14T03:20', clue: 'inner_life', body: "Doug,\n\nI miss when you were jealous. I know that's a terrible thing to say. You used to get jealous of the mailman. Now you give me a thumbs up and go sleep next to the water heater.\n\nYou said I could say stop. I'm saying it. But I need you to say something too. Anything that isn't a thumb.\n\n(saved 03:20. edited 11 times.)" },
    { id: 'n_3am', title: '3am', t: '2026-11-13T03:05', clue: 'inner_life', body: "dr okoye asked 'who is this arrangement for'. I said doug. she said 'are you sure'. I said yes. I'm not sure.\n\nrafe is kind. rafe is easy. doug is the person I want to be old with. I don't know how to say that without it sounding like I'm choosing the boring one. he's not boring. he's just scared and he made a spreadsheet about it." },
    { id: 'n_things', title: 'things R does (that D used to)', t: '2026-11-14T01:10', body: "- asks what I want and then waits for the answer\n- remembers the green sports bra (the green sports bra, dana)\n- laughs at my dink jokes\n- looks at me like I'm the last point of a match\n- makes breakfast without asking if it's 'macros-friendly'\n\n(D used to do every single one of these. before May. before he decided he was 'fine'.)" },
    { id: 'n_gym', title: "🏋️ thursday warm-up mix", t: '2026-09-03T18:00', body: "1. Slow Lob Society — 'Kitchen Line' (our wedding song?? why did I put this here)\n2. Velvet Arcade — 'Dink Me Softly'\n3. The Third Shot Drops — 'Overtime (Stay Over)'\n4. Paddle & Pearl — 'Let Me Serve'\n5. Slow Lob Society — 'Unlocked Door'\n\nplaylist length: 3h 02m (thursday-length)" },
  ],

  mail: [
    { id: 'm_folio', from: 'Lakeview Inn', fromAddr: 'folio@lakeviewinn.example', to: 'Dana Hoyt', subject: 'Thank you, Mrs. Smith! Your folio 🧾', t: '2026-11-20T00:05', folder: 'inbox', clue: 'lakeview', body: "Guest: Mr. & Mrs. Smith (booked by: R. Castellano, 'it's a bit') · Room 214\nStays this quarter: 11 (Thursdays)\n\nNov 19:\nRoom  $129.00\nMinibar: 2× pinot noir split  $28.00\nMinibar: 2× chocolate truffles  $12.00\nMinibar: 1× 'Romance Kit'  $22.00\nRoom service 22:40: 2× chicken tenders, 1× extra ranch  $31.00\nLate checkout: requested\nNote from housekeeping: 'Please stop playing pickleball against the headboard.'" },
    { id: 'm_rope', from: 'Velvet Rope Boutique', fromAddr: 'receipts@velvetrope.example', to: 'Dana Hoyt', subject: 'Your receipt 💋', t: '2026-11-09T14:00', folder: 'trash', clue: 'lakeview', body: "VELVET ROPE BOUTIQUE — 'Adult Novelties & Tasteful Regrets'\n\n1× Massage Oil — Warming Eucalyptus ('for sore athletes')  $19.00\n1× 'His & Hers' Robe Set — embroidered MR. & MRS. SMITH  $42.00\n1× Novelty Pickleball Paddle — 'SPANK THE KITCHEN'  $14.00\nTotal: $75.00\n\nLoyalty stamp: 6 of 10." },
    { id: 'm_bluebox', from: 'BLUE BOX LLC', fromAddr: 'orders@bluebox-llc.example', to: 'Dana Hoyt', subject: 'Your order has shipped (discreetly) 📦', t: '2026-11-06T09:00', folder: 'inbox', clue: 'blue_box', body: "BLUE BOX LLC — billing name on statement: 'BLUE BOX LLC'\n\n1× 'Kitchen Line' Personal Massager (rechargeable, 'match-point' setting)  $72.00\n1× Warming Gel — 'Third Shot Drop'  $15.00\n1× Novelty Sweatband Cuffs (pair, neon)  $9.00\nTotal: $96.00\n\nShip to: Maplewood Flats 3B (c/o R. Castellano)\nPackaging: plain, unmarked. Signed for by: 'BO (I'M NOT ASKING)'." },
    { id: 'm_lace', from: 'Lace Theory', fromAddr: 'orders@lacetheory.example', to: 'Dana Hoyt', subject: 'Order shipped 🖤', t: '2026-11-06T10:00', folder: 'inbox', body: "1× 'Match Point' sports set — emerald — M\n1× 'After Hours' lace set — black — M\nSubtotal: $214.00\nGift note: 'for thursday. which one.'" },
    { id: 'm_retreat', from: 'Stillwater Reconnect Retreat', fromAddr: 'stay@stillwaterretreat.example', to: 'Dana Hoyt', subject: 'Booking confirmed — Couples Reconnect, Dec 4–6', t: '2026-11-16T11:00', folder: 'inbox', clue: 'retreat', body: "Booking confirmed!\n\nProgram: Couples Reconnect (3 nights, phone-free)\nGuests: Dana Hoyt & Doug Hoyt\nCabin 3 — king bed, wood stove, no Wi-Fi ('on purpose')\n\nIntake question: 'What do you hope to leave behind here?'\nYour answer: 'a calendar. and a thumbs-up emoji.'" },
    { id: 'm_shared', from: 'Calendar', fromAddr: 'noreply@calendar.example', to: 'Dana Hoyt', subject: "Doug Hoyt shared \"Dana's Thursdays 🏈\" with you", t: '2026-06-02T19:05', folder: 'inbox', clue: 'shared_calendar', body: "Doug Hoyt (doug@pinnaclegutters.example) has shared the calendar \"Dana's Thursdays 🏈\" with you.\n\nPermission: Can edit\nMessage from Doug: 'so we're organized about it 👍 I'm a systems guy'" },
    { id: 'm_fantasy', from: 'GridironPro Fantasy', fromAddr: 'noreply@gridironpro.example', to: 'Dana Hoyt', subject: 'Week 11 matchup is set! 🏈', t: '2026-11-17T06:00', folder: 'inbox', body: "WEEK 11 — GRIDIRON GENTLEMEN\n\nDANA'S REVENGE (Dana H.)  vs  GUTTER BALLERS (Doug H.)\n\nProjected: Dana's Revenge 128.4 – Gutter Ballers 61.0\n\nTip: Doug H. has set the same lineup for 9 weeks and has not logged in since May." },
  ],

  calls: [
    { contact: 'rafe', t: '2026-11-20T00:40', dir: 'in', duration: '22:14' },
    { contact: 'doug', t: '2026-11-12T19:05', dir: 'missed' },
    { contact: 'doug', t: '2026-11-12T19:06', dir: 'missed' },
    { contact: 'bo', t: '2026-11-13T06:05', dir: 'missed' },
    { contact: 'mel', t: '2026-11-12T19:58', dir: 'missed' },
    { contact: 'coach', t: '2026-11-17T23:10', dir: 'in', duration: '52:03' },
  ],

  voicemails: [
    { id: 'vm_rafe', contact: 'rafe', t: '2026-11-18T23:30', duration: '0:31', voice: { pitch: 0.9, rate: 0.9, female: false }, clue: 'aftermath', transcript: "[whispering] Hey. Bo's asleep, so I'm whispering, which is new for me. [laughs] I can still smell your shampoo on the hoodie. The coconut one. [pause] Thursday... you said you want to talk at the courts, not the room. That's fine. That's — whatever you need. [door closes] Okay. Goodnight, Mrs. Smith." },
    { id: 'vm_mel', contact: 'mel', t: '2026-11-12T19:58', duration: '0:22', voice: { pitch: 1.15, rate: 1.2, female: true }, clue: 'mel_cover', transcript: "[clears throat] 'Hi Doug! Yes, she was at mine. We watched Love Island. People were hot near a pool.' [pause] Why am I lying to the CALENDAR man. [glass clinks, a trivia host says 'question four'] Oh no. Is this — is this recording? Dana's voicemail? Delete. Delete. [beep]" },
    { id: 'vm_doug', contact: 'doug', t: '2026-11-12T19:06', duration: '0:18', voice: { pitch: 1.0, rate: 1.1, female: false }, clue: 'chicken', transcript: "[engine idling] Hey. It's me. I'm not — I'm at Costco. [crinkle of plastic] I got a chicken. A rotisserie one. For the house. I'm going to eat some of it in the car first. [long pause] Have fun. 👍 I mean. Thumbs up. You can't hear a thumbs up. Bye." },
  ],

  map: {
    art: 'cg3_map',
    places: [
      { id: 'home', name: 'Home — Briar Glen', x: 0.16, y: 0.30 },
      { id: 'lakeview', name: 'Lakeview Inn', x: 0.78, y: 0.28 },
      { id: 'courts', name: 'Briar Glen Rec — Pickleball Courts', x: 0.44, y: 0.44 },
      { id: 'dockside', name: 'Dockside Grill', x: 0.86, y: 0.58 },
      { id: 'rafe', name: "Rafe's apartment (Maplewood Flats)", x: 0.60, y: 0.70 },
      { id: 'clinic', name: 'Stride Physical Therapy', x: 0.30, y: 0.66 },
      { id: 'costco', name: 'BulkBarn Warehouse', x: 0.62, y: 0.16 },
    ],
    stops: [
      { t: '2026-11-05T19:00', place: 'dockside', detail: 'Arrived — 1h 40m · Location shared with Doug 🏠' },
      { t: '2026-11-12T17:30', place: 'courts', detail: 'Arrived — 45m · Location shared with Doug 🏠' },
      { t: '2026-11-12T18:15', place: 'dockside', detail: 'Arrived — 40m · Location shared with Doug 🏠' },
      { t: '2026-11-12T18:58', place: 'lakeview', detail: "Arrived — 13h 40m · Location shared with Doug 🏠 · 'Doug 🏠' viewed your location 41 times", clue: 'lakeview' },
      { t: '2026-11-13T12:50', place: 'rafe', detail: 'Arrived — 18m' },
      { t: '2026-11-19T18:57', place: 'lakeview', detail: "Arrived — 4h 01m · Location shared with Doug 🏠 · 'Doug 🏠' viewed your location 63 times", clue: 'lakeview' },
    ],
  },

  browser: [
    { t: '2026-11-20T03:02', title: "[Shared tab group · Doug's iPad] how to un-open a relationship", url: 'search?q=how+to+un-open+a+relationship', clue: 'doug_searches', deletedUntil: 'recovered:history' },
    { t: '2026-11-19T03:12', title: "[Shared tab group · Doug's iPad] is it normal to regret being a cuck if you picked the guy", url: 'search?q=regret+being+cuck+picked+the+guy', clue: 'doug_searches', deletedUntil: 'recovered:history' },
    { t: '2026-11-17T02:48', title: "[Shared tab group · Doug's iPad] can you be jealous of a golden retriever (man)", url: 'search?q=jealous+of+golden+retriever+man', clue: 'doug_searches', deletedUntil: 'recovered:history' },
    { t: '2026-11-13T03:30', title: "[Shared tab group · Doug's iPad] rafe castellano height", url: 'search?q=rafe+castellano+height', clue: 'doug_searches', deletedUntil: 'recovered:history' },
    { t: '2026-11-12T19:20', title: "[Shared tab group · Doug's iPad] can you eat a whole rotisserie chicken in a car (emotional)", url: 'search?q=whole+rotisserie+chicken+in+car', clue: 'chicken', deletedUntil: 'recovered:history' },
    { t: '2026-10-02T03:05', title: "[Shared tab group · Doug's iPad] how to tell your wife you're not fine when you said fine 40 times", url: 'search?q=tell+wife+not+fine', clue: 'doug_searches', deletedUntil: 'recovered:history' },
    { t: '2026-11-17T21:10', title: 'how to end something kindly when nobody did anything wrong', url: 'search?q=how+to+end+something+kindly', clue: 'ending_it' },
    { t: '2026-11-08T20:50', title: 'is a sports bra lingerie (asking for thursday)', url: 'search?q=is+sports+bra+lingerie' },
  ],

  glimpse: [
    { id: 'g3_courts', author: 'rafe', photo: 'cg3_ph_dock_r', caption: "✨ close friends ✨ best doubles partner in the state. also best dessert sharer. also. 🥒", t: '2026-11-12T18:30', likes: 14, comments: [{ author: 'me', text: 'delete this rafe 🙈' }, { author: 'bo', text: 'the walls, rafe' }], clue: 'lakeview' },
    { id: 'g3_mel', author: 'mel', photo: 'cg3_ph_mel_wine', caption: 'trivia night alone 🍷 my doubles partner is "busy" 🙄', t: '2026-11-12T20:41', likes: 17, comments: [{ author: 'doug', text: 'isnt dana with you? 👍' }, { author: 'mel', text: 'she went to get snacks!!' }], clue: 'mel_cover' },
    { id: 'g3_us', author: 'me', photo: 'cg3_ph_us_dock', caption: 'date night w my gutter guy 💕', t: '2026-11-05T20:30', likes: 31, comments: [{ author: 'doug', text: '👍' }, { author: 'rafe', text: 'cute!! 🥒' }] },
  ],

  bank: {
    account: 'Ridgeway Bank — D. Hoyt ••3312',
    balance: 2211.4,
    tx: [
      { t: '2026-11-16T09:00', desc: "PAYSNAP TO DOUG HOYT — 'refund. you don't have to pay for this anymore. please talk to me'", amount: -1419.0, clue: 'refund' },
      { t: '2026-11-12T18:31', desc: "PAYSNAP FROM DOUG HOYT — 'for the room this week 👍 no need to tell me anything (rule 3)'", amount: 129.0, clue: 'your_paysnap' },
      { t: '2026-11-05T18:30', desc: "PAYSNAP FROM DOUG HOYT — 'room 👍'", amount: 129.0, clue: 'your_paysnap' },
      { t: '2026-11-09T14:00', desc: 'VELVET ROPE BOUTIQUE', amount: -75.0 },
      { t: '2026-11-13T08:25', desc: "PAYSNAP REQUEST FROM RAFE CASTELLANO — 'batteries 48-ct 🔋 you owe me 😏' — PAID", amount: -21.99, clue: 'blue_box' },
      { t: '2026-11-06T08:58', desc: 'BLUE BOX LLC', amount: -96.0, clue: 'blue_box' },
      { t: '2026-11-06T10:00', desc: 'LACE THEORY — ONLINE', amount: -214.0 },
      { t: '2026-06-04T18:30', desc: "PAYSNAP FROM DOUG HOYT — 'room 🏨 have fun 👍 (rule 4: I pay the first one)'", amount: 129.0, clue: 'your_paysnap' },
    ],
  },

  calendar: [
    { id: 'cal3_t1', t: '2026-11-12T19:00', title: "🌶️ (Dana's Thursdays 🏈 — shared by Doug)", detail: 'Lakeview 214', clue: 'shared_calendar' },
    { id: 'cal3_t2', t: '2026-11-19T19:00', title: "🌶️ (Dana's Thursdays 🏈 — shared by Doug)", detail: 'Lakeview 214', clue: 'shared_calendar' },
    { id: 'cal3_anniv', t: '2026-11-21T19:00', title: '💍 15 years w/ Doug', detail: 'Dockside. window table. make him say something that isn\'t 👍' },
    { id: 'cal3_end', t: '2026-11-26T18:00', title: '🥒 courts — talk to R', detail: "it's done. for D. be kind.", clue: 'ending_it' },
    { id: 'cal3_therapy', t: '2026-11-18T17:30', title: 'Dr. Imani Okoye (just me)', detail: "'who is this arrangement for'", clue: 'inner_life' },
    { id: 'cal3_retreat', t: '2026-12-04T15:00', title: '🌲 Reconnect Retreat — 2 guests', detail: 'cabin 3. no phones. DON\'T tell him, it\'s a surprise', clue: 'retreat' },
    { id: 'cal3_sun', t: '2026-11-22T10:00', title: 'Sunday talk (rule 6)', detail: "he's skipped 9 in a row" },
  ],

  wifi: [
    { name: 'HOYT_HOUSE_5G', lastJoined: '2026-11-20T03:00' },
    { name: 'LakeviewInn_Guest', lastJoined: '2026-11-19T18:58', clue: 'lakeview' },
    { name: 'BriarGlenRec_Courts', lastJoined: '2026-11-12T17:31' },
    { name: 'Stride_PT_Staff', lastJoined: '2026-11-19T08:00' },
    { name: 'MaplewoodFlats_3B (bo says hi) · auto-joined 38×', lastJoined: '2026-11-13T12:51' },
  ],

  trace: [
    { id: 'photos', label: "Photos — Recently Deleted (Dez's app)", detail: "Dez's 'totally legal' recovery app carves deleted images out of flash storage.", needs: ['pinned:lakeview'], needsHint: 'Need a lead first: pin where she goes on Thursdays.', durationMs: 5000 },
    { id: 'msgfrag', label: "Messages — Deleted Fragments (Dez's app)", detail: 'Rebuild texts deleted from her chat with you — yes, you — out of the Messages database log.', needs: ['pinned:league_code'], needsHint: "Need a lead first: pin what the league chat means by 'starting my QB'.", durationMs: 6000 },
    { id: 'history', label: "Browser — Shared Tab Group Cache (Dez's app)", detail: "Recover cleared history from a tab group shared with this phone. Dez: 'whose iPad is this from bro.'", needs: ['note:n_calc'], needsHint: "Need a lead first: open the note that's pretending to be a calculator.", durationMs: 5500 },
  ],

  clues: [
    { id: 'hoodie', title: 'CASTELLANO 12', text: "His grey hoodie — CASTELLANO 12 — on your couch, a red-strapped watch and two wine glasses on your coffee table. She's asleep in it right now.", kind: 'object', art: 'cg3_ph_couch' },
    { id: 'lakeview', title: 'Room 214, Thursdays, Mr. & Mrs. Smith', text: "Lakeview Inn Room 214, eleven Thursdays this quarter, booked as 'Mr. & Mrs. Smith' by R. Castellano. Minibar for two, a Romance Kit, room service at 22:40. 'Please stop playing pickleball against the headboard.'", kind: 'place', art: 'cg3_ph_keycard' },
    { id: 'aftermath', title: "'this morning was 🥺'", text: "'omg my legs', 'sorry about the scratch on your shoulder', 'keep the hoodie. keep everything', 'can't walk straight lmao', lipstick on a hotel mirror, a recovered video titled 'oops 🙈', and a whispered voice note about her coconut shampoo.", kind: 'event', art: 'cg3_ph_h_robe' },
    { id: 'our_song', title: 'He gave her your wedding song', text: "Rafe sends 'Kitchen Line' — 'this one's ours'. Dana: 'that's the song from my wedding. doug picked it. he thought it was about COOKING.'", kind: 'document' },
    { id: 'roommate', title: "'the walls are drywall'", text: "Rafe's roommate Bo, 06:02: 'respectfully. the walls are drywall.' 'I have heard my own name used as a verb.'", kind: 'person', art: 'av_cg3_bo' },
    { id: 'league_code', title: "'starting my QB thursday?'", text: "League chat: 'dana, starting my QB thursday?' 'confirmed. usual field. 7 pm.' And from YOUR account: '👍' and 'lol I am totally fine. 👍 go rafe'.", kind: 'document', art: 'av_cg3_league' },
    { id: 'shared_calendar', title: "'Dana's Thursdays 🏈' — shared by you", text: "Every 🌶️ Thursday sits on a calendar called \"Dana's Thursdays 🏈\". You created it on Jun 2 and shared it with her: 'so we're organized about it 👍 I'm a systems guy'.", kind: 'document' },
    { id: 'your_words', title: "Your words: 'I'm fine with it 👍'", text: "Deleted, May 30, 23:46, from YOU: 'rafe. it should be rafe. he's a golden retriever... I picked him. I'm fine with it 👍.' Jun 4: 'I'm sure. I'm great. I'm so fine. 👍👍'", kind: 'person', art: 'av_cg3_doug' },
    { id: 'your_paysnap', title: 'You paid for the rooms', text: "PaySnap from YOU: Jun 4 'room 🏨 have fun 👍 (rule 4: I pay the first one)', then Nov 5 'room 👍' and Nov 12 'for the room this week 👍 no need to tell me anything (rule 3)'.", kind: 'document' },
    { id: 'rules_note', title: 'THE RULES — by Doug', text: "The 'calculator' note: your eight rules, pasted from your own text. Rule 1: 'I will never look at her phone.' Rule 3: 'I never want to see ANY of it. Hide everything.' Rule 7: either can say stop. Her note under it: 'I'm saying stop. Thursday.'", kind: 'document' },
    { id: 'friends_roast', title: 'The roast', text: "Pickle Girls: 'DOUG picked the guy??' 'cuckold king of briar glen 👑'. League: over/under on 'when doug cracks'; Sully: 'he was at costco crying near the rotisserie chickens'.", kind: 'event' },
    { id: 'family_knew', title: 'Your mother knew (and told Aunt Pat)', text: "Hoyt family chat, Sept 14: your mom — 'Doug told me about your arrangement after two glasses of wine... I have told NO ONE.' 'I told Pat.' 'He said it with a thumbs up. With his actual thumb.'", kind: 'event' },
    { id: 'chicken', title: 'The truck in the lot', text: "Nov 12, 19:00: your truck in the Lakeview lot; you, inside, holding a rotisserie chicken. Your voicemail: 'I'm at Costco... I'm going to eat some of it in the car first... Have fun 👍.' You viewed her location 41 times that night.", kind: 'event', art: 'cg3_ph_lot' },
    { id: 'doug_searches', title: 'Your 3 a.m. searches', text: "Your iPad, shared tab group, 3 a.m.: 'how to tell your wife you're not fine when you said fine 40 times', 'rafe castellano height', 'is it normal to regret being a cuck if you picked the guy', 'how to un-open a relationship'.", kind: 'document', art: 'av_cg3_doug' },
    { id: 'blue_box', title: 'BLUE BOX LLC, shipped to his place', text: "A discreet-billed order ('BLUE BOX LLC', $96, a 'Kitchen Line' massager and 'Third Shot Drop' warming gel) shipped to Rafe's flat, signed for by 'BO (I'M NOT ASKING)'. His PaySnap request: 'batteries 48-ct, you owe me 😏' — paid. Mel: 'did you get the... package 👀'.", kind: 'object', art: 'cg3_ph_box' },
    { id: 'mel_cover', title: "Mel's 'Love Island' alibi", text: "Nov 12: Dana asks Mel to say she was at hers watching Love Island — 'DON'T say lakeview. rule 3.' Mel's Glimpse at 20:41: alone at trivia. Mel's voicemail: rehearsing the lie by accident. 'Pickle Coach (ignore)' is Rafe's number.", kind: 'person', art: 'av_cg3_mel' },
    { id: 'same_table', title: 'Same window table, one week apart', text: "Nov 5: you and Dana at the Dockside Grill window table, red buoy outside, you giving a forced thumbs-up. Nov 12: the same table, the same buoy — Dana and Rafe sharing one dessert, on his close-friends story.", kind: 'place', art: 'cg3_ph_dock_r' },
    { id: 'excuses', title: "'it's literally just pickleball doug'", text: "Nov 5, 23:15: 'my phone died sorry!! long rally. it's literally just pickleball doug.' Then: 'you're allowed to ask me things you know. rule 6. you made it.' You: '👍'.", kind: 'document' },
    { id: 'drift', title: 'Fifteen years, in her texts to you', text: "Nov 2025: '14 years 💍 you still make me laugh about GUTTERS. I love you, systems guy.' Feb: a voice note — 'you said rain gutter in your sleep in a romantic voice. I love you.' November: 'night ❤️ love you. come up from the garage?' — you: '👍 night'.", kind: 'event', art: 'av_cg3_doug' },
    { id: 'juxtapose', title: "'come up from the garage?' → 'call me'", text: "23:02 to you: 'night ❤️ love you. come up from the garage?' 23:04 to Rafe: 'he's in the garage again. call me.' Then: 'he'll never ask. he made a rule about it. I think about you when I'm with him and I think about HIM when I'm with you.' 'we have to stop. ok one more time.'", kind: 'document', art: 'av_cg3_rafe' },
    { id: 'inner_life', title: "'I miss when you were jealous'", text: "An unsent draft to you: 'You said I could say stop. I'm saying it. But I need you to say something too. Anything that isn't a thumb.' A 3am note: 'doug is the person I want to be old with.' Individual therapy: 'who is this arrangement for'.", kind: 'document' },
    { id: 'rafe_family', title: "Rafe's other life", text: "Rafe has a seven-year-old, Lucy (school photo). His ex, Tara: 'He told me you're just his pickleball partner. He told Lucy you're a friend. Someone's lying to someone.'", kind: 'person', art: 'av_cg3_tara' },
    { id: 'retreat', title: "Reconnect Retreat — '2 guests'", text: "A phone-free cabin, Dec 4–6, '2 guests', 'DON'T tell him, it's a surprise.' The confirmation: Guests — Dana Hoyt & Doug Hoyt. 'What do you hope to leave behind? A calendar. And a thumbs-up emoji.'", kind: 'event' },
    { id: 'ending_it', title: "'I'm saying stop. Thursday.'", text: "Dana to Rafe: 'thursday I need to talk to you... it's about doug.' To her friends: 'I'm ending it. he's not fine. he's sleeping in the garage.' Calendar Nov 26: 'courts — talk to R. it's done. for D.'", kind: 'event' },
    { id: 'refund', title: 'She paid you back', text: "Nov 16: Dana PaySnaps you $1,419 — every room you ever paid for — 'refund. you don't have to pay for this anymore. please talk to me'.", kind: 'document' },
  ],

  questions: [
    {
      id: 'q_cheat', prompt: 'Is Dana cheating on you?',
      options: [
        { id: 'yes', label: 'Yes — every Thursday, behind your back' },
        { id: 'no', label: 'No — this is the arrangement you proposed, set up and paid for' },
        { id: 'emotional', label: 'Only emotionally' },
      ],
      answer: 'no', evidence: ['your_words', 'rules_note', 'your_paysnap', 'shared_calendar', 'family_knew', 'mel_cover'],
      explain: "Your words on May 30, your eight rules, your calendar, your PaySnaps. She hid it because Rule 3 told her to. You told your own mother before you told yourself the truth.",
    },
    {
      id: 'q_who', prompt: 'Who is she seeing?',
      options: [
        { id: 'sully', label: 'Sully, from your league' },
        { id: 'rafe', label: 'Rafe Castellano — her pickleball partner, the Commish of your league, the guy you picked', art: 'av_cg3_rafe' },
        { id: 'bo', label: "Bo, Rafe's roommate", art: 'av_cg3_bo' },
        { id: 'patient', label: 'A PT patient' },
      ],
      answer: 'rafe', evidence: ['hoodie', 'lakeview', 'aftermath', 'league_code', 'your_words', 'roommate', 'our_song', 'blue_box', 'mel_cover'],
      explain: "CASTELLANO 12 is on your couch. The room is booked under his name. And on May 30 you wrote 'it should be rafe.'",
    },
    {
      id: 'q_where', prompt: 'Where do they meet?',
      options: [
        { id: 'courts', label: 'The pickleball courts' },
        { id: 'lakeview', label: 'Lakeview Inn, Room 214, Thursdays — as Mr. & Mrs. Smith' },
        { id: 'rafe', label: "Rafe's apartment" },
        { id: 'home', label: 'Your house' },
      ],
      answer: 'lakeview', evidence: ['lakeview', 'shared_calendar', 'chicken', 'aftermath'],
      explain: "Eleven Thursdays at the Lakeview, a key card for 214, and a truck in the lot with a chicken in it. Bo's wall complaint was the one night it wasn't them.",
    },
    {
      id: 'q_setup', prompt: 'Who set this up?',
      options: [
        { id: 'dana', label: 'Dana' },
        { id: 'rafe', label: 'Rafe' },
        { id: 'you', label: 'You — draft night, May 30: the idea, the guy, the rules, the calendar and the first room' },
        { id: 'league', label: 'The league, as a bet' },
      ],
      answer: 'you', evidence: ['your_words', 'rules_note', 'your_paysnap', 'shared_calendar'],
      explain: "'I picked him. I'm fine with it 👍.' 'Rule 4: I pay the first one.' 'so we're organized about it 👍 I'm a systems guy.'",
    },
    {
      id: 'q_rules', prompt: 'Who broke the rules first?',
      options: [
        { id: 'dana', label: 'Dana — she caught feelings' },
        { id: 'rafe', label: 'Rafe — he came to your house' },
        { id: 'you', label: "You — Rule 6 (no Sunday talks since September), the Lakeview parking lot, 63 location checks, and right now: Rule 1" },
        { id: 'nobody', label: 'Nobody' },
      ],
      answer: 'you', evidence: ['doug_searches', 'chicken', 'rules_note', 'ending_it'],
      explain: "Rule 1 was 'I will never look at her phone.' You wrote it. It's 3 a.m. You're holding her phone.",
    },
    {
      id: 'q_end', prompt: 'What was Dana going to do on Thursday?',
      options: [
        { id: 'leave', label: 'Leave you for Rafe' },
        { id: 'more', label: 'Ask for more nights' },
        { id: 'end', label: "End it with Rafe — for you — because you're not fine" },
        { id: 'movein', label: 'Move Rafe in' },
      ],
      answer: 'end', evidence: ['ending_it', 'refund'],
      explain: "She wrote 'I'm saying stop' under your rules, booked the courts, not the room, and PaySnapped back every dollar you paid: 'please talk to me'.",
    },
    {
      id: 'q_retreat', prompt: "Who is the Dec 4 'Reconnect Retreat — 2 guests' for?",
      options: [
        { id: 'rafe', label: 'Dana and Rafe' },
        { id: 'you', label: 'Dana and you — a surprise' },
        { id: 'mel', label: 'Dana and Mel' },
        { id: 'nobody', label: "It's Rafe's booking" },
      ],
      answer: 'you', evidence: ['retreat'],
      explain: "Guests: Dana Hoyt & Doug Hoyt. Cabin 3, no Wi-Fi 'on purpose'. She was planning to leave a calendar and a thumbs-up behind.",
    },
  ],

  events: [
    { id: 'e3_rafe', kind: 'text', when: ['unlocked'], delayMs: 8000, thread: 'th_rafe', contact: 'rafe', text: "u up? 😏 I can't sleep. bo's snoring through the drywall, which is fair, honestly. is the hoodie warm. tell me the hoodie is warm" },
    { id: 'e3_h_hoodie', kind: 'handler', when: ['pinned:lakeview'], delayMs: 3000, text: "bro. BRO. the hoodie on the couch is HIS?? 'castellano 12'?? the COMMISH?? the golden retriever?? I'm putting my shoes on. I'm bringing a bat. a wiffle bat. I'm emotional. SCREENSHOT EVERYTHING." },
    { id: 'e3_h_stir', kind: 'handler', when: ['recovered:msgfrag'], delayMs: 4000, text: "(Dana shifts on the couch. 'Doug? ...you okay, babe?' She's asleep again before you answer.) ...bro. why are there texts from YOU in there. why do they say 'I picked him'. why do they say 'I'm fine with it 👍'. doug. DOUG. explain. right now. in words. not a thumb." },
    { id: 'e3_tara', kind: 'text', when: ['pinned:rafe_family'], delayMs: 6000, thread: 'th_tara', contact: 'tara', text: "Sorry, it's late. Lucy had a nightmare and asked for 'Miss Dana'. I'm not angry. I just need to know if Thursday is still the end. Please." },
    { id: 'e3_rafe3', kind: 'text', when: ['pinned:ending_it'], delayMs: 8000, thread: 'th_rafe', contact: 'rafe', text: "can't sleep. is thursday the talk? I think I know what the talk is. it's ok. tell doug I said he was right about the golden retriever thing. I'd have liked to meet the version of him you talk about" },
    { id: 'e3_rafe2', kind: 'text', when: ['recovered:photos'], delayMs: 7000, thread: 'th_rafe', contact: 'rafe', clue: 'chicken', text: "random but was that doug's truck in the lakeview lot last week?? he was just sitting there eating a rotisserie chicken with his hands. like a raccoon. a sad raccoon. is he ok? is this still ok? I'll stop. I'll stop tonight if it's not ok." },
    { id: 'e3_h_end', kind: 'handler', when: ['recovered:history'], minPins: 14, delayMs: 4000, text: "'how to un-open a relationship'. 3:02 a.m. that's YOUR search, man. on YOUR ipad. (The TV turns itself off. The room goes dark. Dana says, half-asleep: 'Doug? Come here. I want to talk.') ...bro. go. put the phone down and go. say the true thing. not the thumb." },
  ],

  hints: [
    { until: 'unlocked', text: "'Front nine, back nine.' Add her strokes on the scorecard — not the par row. Front-nine total, then back-nine total." },
    { until: 'pinned:lakeview', after: ['unlocked'], text: 'Thursdays. Mail has a folio, Maps has a lot of hours, Wi-Fi has a hotel.' },
    { until: 'recovered:photos', after: ['pinned:lakeview'], text: 'Recover the deleted photos. Look at the parking lot. Look at the calendar screenshot.' },
    { until: 'pinned:league_code', after: ['unlocked'], text: "What does the league mean by 'starting my QB thursday'? And who keeps thumbs-upping it?" },
    { until: 'recovered:msgfrag', after: ['pinned:league_code'], text: "Her thread with you has a gap. A big one. Starting May 30. Recover it." },
    { until: 'note:n_calc', after: ['unlocked'], text: "There's a note pretending to be a calculator. Rule 2 says they only call him by the league word. Two letters." },
    { until: 'recovered:history', after: ['note:n_calc'], text: 'Somebody shares a tab group with this phone. Recover the cleared history. Check whose iPad.' },
    { until: 'hidden:open', after: ['unlocked'], text: 'Hidden album. Same code. Brace.' },
    { until: 'pinned:refund', after: ['unlocked'], text: 'Check her bank. The biggest number is going the wrong way.' },
    { until: 'report:filed', after: ['unlocked'], text: "Who, where, whether — and who set it up, and who broke it. Pin every answer. Then put the phone down." },
  ],

  handlerIntro: "bro it's 3am. why are you texting me 'castellano 12' with nine exclamation points. ...wait. RAFE? commish rafe?? golden retriever rafe?? ok. ok ok ok. you have her code? get in there. screenshot EVERYTHING. I'm here. I'm always here. I'm not even wearing pants, that's how here I am.",

  epilogue: {
    solved: [
      "You put the phone face-down on the counter, exactly where it was. You sat on the edge of the couch. Dana opened her eyes, saw you, saw your face, and said, 'You read it.' You said, 'Rule 1.' She said, 'Rule 7,' and you said 'ok', and for the first time since May you meant it.",
      "You talked until the sun came up. Not a single thumb. You told her about the parking lot and the chicken and the 63 location checks. She told you about the courts and the refund and the 'I'm saying stop'. Around six she laughed so hard at 'can you be jealous of a golden retriever (man)' that she cried, and then you both just cried.",
      "On Thursday Dana met Rafe at the courts and ended it. He hugged her, then drove to your house, hugged you, gave you the hoodie, and said, 'You were right. I am a golden retriever.' Bo sent a fruit basket with a card that said 'thank you for the silence'. Your mother told Aunt Pat. Aunt Pat told Gloria.",
      "At Thanksgiving you stood up, unprompted, and said: 'Dana and I tried something, it didn't work for me, I'm sorry I said fine forty times, please pass the stuffing.' Sully paid out the side pot to Big Paulie. You moved back in from the garage. You deleted the calendar. The scorecard still says 41 and 38. You've started golfing with her on Sundays — Rule 6.",
    ],
    partial: [
      'You blew it.',
      "You woke her up with the phone in your hand and said, 'How LONG has this been going on.' She looked at you for a long time and said, 'Since you paid for it, Doug.' Then she showed you your own text from May 30, with the thumbs up, while you stood there in the hoodie you'd grabbed off the couch without looking. It said CASTELLANO 12.",
      "Go back to the gap in your own thread. Start on May 30. Read your words before you read his.",
    ],
  },
};
