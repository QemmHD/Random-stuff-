import type { CaseFile } from '../types';

// CASE 09 — FUNERAL POTATOES
// Dewey Kostka, 33, stoner owner of The Munchie Wagon (a taco-shaped food truck;
// originally called SIZZLE). Hired to cater the wake of Louis "Big Lou" Pettibone,
// "car wash king" of Harlow Falls, who "died" in his home sauna Oct 3, twelve days
// before a grand jury was due to hear his laundering case (Oct 15).
// Truth: Lou faked it. Funeral director Gordon Fisk (owes Lou $90k) and his brother
// Dr. Neil Fisk (signed the death) staged it; the closed mahogany casket held 18 frozen
// ten-pound turkeys that Gordon paid Dewey $300 to haul to Bellweather's Prep Room B on
// Oct 8. Widow Donna took the $212,000 "Wishing Well" of sympathy envelopes at 18:31 at
// the wake (Dewey's truck-window photo catches her loading it into her white SUV) to fund
// Lou's run, then blamed "the caterer who kept wandering inside". Junior (the son)
// genuinely believes Dewey stole it. Dewey deleted his wake photos when Junior screamed.
// Oct 11 Donna sexts the wrong contact: a lingerie mirror selfie meant for Lou, taken at
// the Lakeshore Motor Inn — Lou in a bathrobe in the background. Dewey hides it.
// Oct 13 03:12 an order for "The Lou Special" (the off-menu burrito only Lou ever ordered)
// arrives from Donna's account for Room 9, Lakeshore Motor Inn. Dewey texts Donna (she
// tells him to delete it), clears his browser, leaves his phone in the truck's tip jar at
// the Harlow Falls Scenic Overlook at 04:06 and walks 1.2 miles to the motel to get proof
// for an IRS whistleblower reward. He's been living in the motel's ice-machine room.
// Red herrings: Spatula's new jet ski (84-month 0% financing); Junior's threats.

export const case9: CaseFile = {
  id: 'funeral-potatoes',
  number: '09',
  title: 'Funeral Potatoes',
  tagline: 'He catered the wake of the most dangerous man in Harlow Falls. Four days later, the dead man ordered a burrito.',
  difficulty: 3,
  cover: 'c9_cover',
  owner: { name: 'Dewey Kostka', age: 33, summary: 'Owner, chef and only true believer of The Munchie Wagon, a food truck shaped like a taco. Medical card holder. Recreational everything else. Has never once known what day it is.' },
  status: 'MISSING · LAST SEEN HOLDING A FISH TACO',
  deviceCondition: 'QUESO IN CHARGING PORT · RECOVERED FROM A TIP JAR · SMELLS LIKE A DORM · 91% READABLE',
  briefing: [
    "Dewey Kostka, 33. Owner of The Munchie Wagon, Harlow Falls' only food truck shaped like a taco, and possibly its only food truck that's been asked to leave a children's hospital fundraiser 'for the smell'.",
    "On Friday, October 9, he catered the wake of Louis 'Big Lou' Pettibone, 68, owner of Pettibone Family Car Washes and, according to everyone who whispers, a great deal more. Lou died in his home sauna on October 3. Closed casket, two hundred mourners, a lot of men with no necks.",
    "During the wake, the 'Wishing Well', a white satin box of sympathy envelopes, disappeared. The widow, Donna Pettibone, says it held $212,000 and that 'the caterer kept wandering inside'. Her son, Lou Jr., has made his views known to the caterer in writing and in the international language of a finger drawn across the throat.",
    "On October 14 a park ranger found The Munchie Wagon abandoned at the Harlow Falls Scenic Overlook, keys in the ignition, engine cold, Dewey's phone at the bottom of the tip jar under $11 in quarters and a business card for a psychic. Nobody has seen Dewey since. Police list him as a missing person and as a theft suspect, which his mother finds 'deeply rude'.",
    "His mother, Barb Kostka: \"His passcode is a word. In tenth grade he typed it into a calculator, turned it upside down and laughed until the teacher sent him to the nurse. It's the word that started his whole business. He has used it for EVERYTHING since. I've told him that's not safe. He told me 'Ma, nobody's that smart.' Prove him wrong, detective.\"",
  ],
  phoneDate: '2026-10-16',
  phoneTime: '11:40',
  lock: {
    passcode: '372215',
    hint: 'his first truck name, typed so it reads right on a calculator turned upside down (S=5, I=1, Z=2, L=7, E=3; flipping reverses the order)',
    wallpaper: 'c9_wall_lock',
    notifications: [
      { app: 'messages', title: 'MOM', text: "HAPPY 10 YEARS OF THE TRUCK HONEY!!! I still have your very first menu from when it was called SIZZLE 🌮❤️ CALL YOUR MOTHER. ALSO WHERE ARE YOU", t: '2026-10-10T08:01' },
      { app: 'messages', title: 'Lou Jr. ☠️', text: 'You cannot hide forever, taco boy.', t: '2026-10-11T23:14' },
      { app: 'messages', title: 'Spatula', text: "bro cops came by the commissary. i told them u were 'spiritually unavailable'. they wrote it down", t: '2026-10-12T10:20' },
      { app: 'mail', title: 'Munchie Wagon Orders', text: "New order #4471 — Breakfast burrito (build your own) — 'see notes'", t: '2026-10-13T03:12' },
      { app: 'phone', title: 'Missed call', text: 'Mrs. Pettibone (3)', t: '2026-10-13T04:20' },
    ],
  },
  homeWallpaper: 'c9_wall_home',

  contacts: [
    { id: 'spatula', name: 'Spatula', avatar: 'av_c9_spatula', number: '(555) 302-4477', label: 'sous chef / roommate / disappointment' },
    { id: 'mom', name: 'MOM', avatar: 'av_c9_mom', number: '(555) 302-0420' },
    { id: 'junior', name: 'Lou Jr. ☠️', avatar: 'av_c9_junior', number: '(555) 302-9001' },
    { id: 'donna', name: 'Mrs. Pettibone (catering)', avatar: 'av_c9_donna', number: '(555) 302-6161' },
    { id: 'gordon', name: 'Gordon Fisk — Bellweather', avatar: 'av_c9_gordon', number: '(555) 302-7300', label: 'funeral home' },
    { id: 'lou', name: 'BIG LOU 🌯 (regular)', avatar: 'av_c9_lou', number: '(555) 302-0001' },
    { id: 'tommy', name: 'Tommy P. (big tipper)', avatar: 'av_c9_tommy', number: '(555) 302-3838' },
    { id: 'marisol', name: 'Marisol @ Higher Ground', avatar: 'av_c9_marisol', number: '(555) 302-4200', label: 'budtender' },
    { id: 'c9unknown', name: '(555) 302-0199', avatar: 'av_unknown', number: '(555) 302-0199' },
  ],

  threads: [
    {
      id: 'th_spatula', contact: 'spatula', messages: [
        { from: 'me', text: "BRO we got the pettibone wake. 200 heads. CASH. mrs p wants funeral potatoes, which is just potatoes that are sad on purpose", t: '2026-10-07T13:02' },
        { from: 'them', text: "isn't big lou like. mafia", t: '2026-10-07T13:03' },
        { from: 'me', text: "he's a car wash guy", t: '2026-10-07T13:03' },
        { from: 'them', text: "he's a car wash guy the way i'm a 'chef'. the way ur truck is a 'restaurant'. the way ur tinder bio says '6 foot'", t: '2026-10-07T13:04' },
        { from: 'me', text: "fisk from the funeral home just paid me 300 cash to haul 180 lbs of frozen turkey to his back door. 'prep room B'. there's no turkey on our menu. is this a funeral thing. do they feed the dead guys", t: '2026-10-08T18:05' },
        { from: 'them', text: "bro that's the most cursed sentence u've ever sent me and u once sent me 'i think i'm allergic to my own sweat'", t: '2026-10-08T18:07' },
        { from: 'me', text: "this house has 9 bathrooms and i opened the wrong door into a STUDY with a SWORD on the wall. junior saw me. he did the throat thing. i peed so fast i think i set a record", t: '2026-10-09T17:44' },
        { from: 'me', text: "junior says the wishing well is gone and he's looking at ME. i've been at the window with u since like 5:45 BRO", t: '2026-10-09T19:06' },
        { from: 'them', text: "u have, i'm ur alibi. also a widow in a leopard coat asked me what 'loaded tots' means and then said 'oh, honey' and licked her lip at me. at a FUNERAL. i feel like a piece of meat and i loved it. ", t: '2026-10-09T19:06' },
        { from: 'them', text: "u have, i'm ur alibi. also we're out of tots and a guy named 'knuckles' asked if we do 'private events'. i said yes. i don't know what i agreed to", t: '2026-10-09T19:07' },
        { from: 'them', text: "cops came to the commissary. they're saying u took 212 grand from a dead mobster's funeral", t: '2026-10-10T11:15' },
        { from: 'me', text: "i can't even take a compliment. i once returned a lighter to a guy who called me a 'useless hippie'", t: '2026-10-10T11:20' },
        { from: 'me', text: "eetmay atay ethay ommissarycay omorrowtay. on'tday elltay unior-jay", t: '2026-10-11T00:40' },
        { from: 'them', text: "ur 'dewey code' is literally pig latin. first sound goes to the back, add 'ay'. 'unchiemay agonway' is not encryption bro my GRANDMA can read it. she reads it out loud at dinner", t: '2026-10-11T00:42', clue: 'dewey_code' },
        { from: 'them', text: 'meet SPLASH DADDY 🌊🍆 my new girlfriend', t: '2026-10-12T15:00', photo: 'c9_ph_jetski' },
        { from: 'me', text: 'BRO where did u get money for a jet ski. JUNIOR IS GOING TO THINK', t: '2026-10-12T15:04' },
        { from: 'them', text: "84 months, 0% financing!!! i'll pay it off when i'm 31. worth it. she's the only thing that's ever stayed for breakfast", t: '2026-10-12T15:06', photo: 'c9_ph_loan', clue: 'jetski_loan' },
        { from: 'me', text: "if anyone asks i was never here. if i die ur getting the truck. don't let them put cheese on the birria. and delete my search history. the BROWSER one. and the other one", t: '2026-10-13T03:58' },
        { from: 'them', text: '?? dude what. what other one', t: '2026-10-13T09:10' },
      ],
    },
    {
      id: 'th_mom', contact: 'mom', messages: [
        { from: 'them', text: 'SAW ON THE NEWS YOUR CATERING THE PETTIBONE FUNERAL. IS THAT SAFE. THOSE PEOPLE HAVE A CAR WASH', t: '2026-10-05T19:00' },
        { from: 'me', text: "ma it's fine it's just tacos", t: '2026-10-05T19:10' },
        { from: 'them', text: 'THAT IS WHAT YOUR FATHER SAID ABOUT THE CASINO BUFFET', t: '2026-10-05T19:11' },
        { from: 'them', text: "HAPPY 10 YEARS OF THE TRUCK HONEY!!! I still have your very first menu from when it was called SIZZLE 🌮❤️ CALL YOUR MOTHER. ALSO WHERE ARE YOU", t: '2026-10-10T08:01' },
        { from: 'them', text: "A DETECTIVE CALLED ME. I TOLD HIM YOU CAN'T STEAL. YOU GET LOST IN A GROCERY STORE. YOU CRIED AT A MATTRESS COMMERCIAL", t: '2026-10-11T12:30' },
        { from: 'me', text: "love u ma. i'm ok. i'm doing something brave and dumb. don't call the phone. it's going in a tip jar", t: '2026-10-13T03:55' },
        { from: 'them', text: 'WHAT TIP JAR', t: '2026-10-13T07:02' },
      ],
    },
    {
      id: 'th_junior', contact: 'junior', messages: [
        { from: 'them', text: "Caterer. My father's friends are coming. Nobody eats till my mother eats. Nobody photographs ANYTHING. Some of these guys are legally not here.", t: '2026-10-09T15:02' },
        { from: 'them', text: "The Wishing Well had 212 thousand dollars in it. My mother counted the cards. I saw you in my father's study, taco boy.", t: '2026-10-09T19:08', clue: 'tribute_box' },
        { from: 'me', text: "i was looking for a bathroom at like 5:40!! the box was still there at 6:20, ur cousin tommy posted it. i was at the truck window the WHOLE time, ask the 40 guys who ate my tots", t: '2026-10-09T19:12' },
        { from: 'them', text: "You have till Monday to bring back my father's money or the next wake gets catered by somebody else, and it's yours.", t: '2026-10-09T19:40', clue: 'junior_threat' },
        { from: 'me', text: 'that is honestly a sick burn', t: '2026-10-09T19:41' },
        { from: 'them', text: "And don't say Gordon Fisk. Fisk owes my father ninety large, that's why we got the mahogany at cost. He hasn't got the balls to steal a parking space. You did.", t: '2026-10-10T09:30', clue: 'fisk_debt' },
        { from: 'them', text: 'You cannot hide forever, taco boy.', t: '2026-10-11T23:14' },
        { from: 'them', text: "Also the tots were incredible. That's not a compliment. It's a fact. You're still dead.", t: '2026-10-12T02:10' },
      ],
    },
    {
      id: 'th_donna', contact: 'donna', messages: [
        { from: 'them', text: "Dewey, hon. Lou's service is Friday. Two hundred guests. The birria, the tots, those little corn cups. And funeral potatoes. Lou hated funeral potatoes. I want them anyway.", t: '2026-10-05T10:00' },
        { from: 'me', text: 'so sorry for ur loss mrs p. big lou was a legend. he tipped me in 50s and once threatened to break my thumbs in a really warm way', t: '2026-10-05T10:20' },
        { from: 'them', text: "That was his love language. Invoice me. Not too much, I'm grieving.", t: '2026-10-05T10:22' },
        { from: 'them', text: "Dewey, the police will want to talk to you. Tell them the truth, hon. Whatever you think you saw, you were high.", t: '2026-10-09T19:30' },
        { from: 'them', text: "Ignore that last picture. Wrong contact. It was for my husband. My late husband. Who is late. Deceased. It's a grief thing. Delete it, or I'll have someone delete you, sweetheart. 😘", t: '2026-10-11T22:15' },
        { from: 'me', text: "deleted mrs p 👍 (it is NOT deleted it's in my hidden folder because i'm scared and also u look great, sorry, condolences)", t: '2026-10-11T22:19' },
        { from: 'me', text: "mrs p someone just ordered THE LOU SPECIAL from ur account to the lakeshore motor inn room 9 at 3am. nobody orders the lou special. it's not on the menu. HE made it up. he made me swear on my truck", t: '2026-10-13T03:20', clue: 'donna_denial', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'is big lou ok. like. ALIVE ok', t: '2026-10-13T03:22', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: "You were high at the wake, sweetheart, and you're high now. Delete this thread. I'm asking nicely, which is the only time I ask.", t: '2026-10-13T03:41', clue: 'donna_denial', deletedUntil: 'recovered:msgfrag' },
        { from: 'me', text: 'mrs p i have a pic of u putting the wishing well in ur white suv at 6:31. and the other pic. the one with the robe guy', t: '2026-10-13T03:44', clue: 'donna_denial', deletedUntil: 'recovered:msgfrag' },
        { from: 'them', text: 'Dewey. Hon. Delete. The. Thread.', t: '2026-10-13T03:47', deletedUntil: 'recovered:msgfrag' },
      ],
    },
    {
      id: 'th_gordon', contact: 'gordon', messages: [
        { from: 'them', text: 'Mr. Kostka, Gordon Fisk, Bellweather Funeral Home. A favour for the family. Pick up 180 lb of frozen turkey at Chef\'s Depot on our account and deliver it to our back door, Prep Room B, by 6 PM. $300 cash. Discretion appreciated.', t: '2026-10-08T10:02', clue: 'turkey_ask' },
        { from: 'me', text: "for the reception?? the menu's tacos and tots", t: '2026-10-08T10:10' },
        { from: 'them', text: 'For a different reception.', t: '2026-10-08T10:11' },
        { from: 'me', text: 'word. is it for like... the dead guys. do they get a snack', t: '2026-10-08T10:11' },
        { from: 'them', text: 'Six PM, Mr. Kostka.', t: '2026-10-08T10:12' },
        { from: 'them', text: 'And please delete the photo you just took. Bellweather has a strict privacy policy.', t: '2026-10-08T17:48' },
        { from: 'me', text: 'deleted 👍 sorry the turkeys just looked majestic. like a bunch of little frozen senators', t: '2026-10-08T17:50' },
        { from: 'them', text: 'Mr. Kostka, please disregard any previous voicemails. They were sent in error. By someone else. Who had my phone. Who has since been spoken to.', t: '2026-10-14T09:00' },
      ],
    },
    {
      id: 'th_lou', contact: 'lou', messages: [
        { from: 'them', text: 'Kid. The usual. No egg. Peanut butter. Pickles. Tots INSIDE. Hot honey on the side, not on top, I\'m not an animal.', t: '2026-07-19T11:30' },
        { from: 'me', text: 'one lou special coming up big man 🌯 folded the pickles the special way', t: '2026-07-19T11:31' },
        { from: 'them', text: "Nobody else gets the Lou Special. I find out you sold it to somebody else, you and me have a conversation in the deluxe wash bay. The one with the hot wax.", t: '2026-08-30T12:01', clue: 'lou_order_habit' },
        { from: 'me', text: "big man it is literally peanut butter and pickles. nobody else WANTS it. a guy smelled it once and proposed to his girlfriend just to have a reason to leave", t: '2026-08-30T12:03' },
        { from: 'them', text: 'Good.', t: '2026-08-30T12:03' },
        { from: 'them', text: "Kid. Last one for a while. Big sauna weekend coming up. Doctor's orders.", t: '2026-10-01T11:00' },
      ],
    },
    {
      id: 'th_marisol', contact: 'marisol', messages: [
        { from: 'me', text: 'marisol i need something for catering a mob funeral. like calm but alert. like a monk who can carry a chafing dish', t: '2026-10-09T11:00' },
        { from: 'them', text: "That's called coffee, Dewey. You've discovered coffee.", t: '2026-10-09T11:02' },
        { from: 'me', text: 'also is it weird i matched with my dentist on the app. she saw my profile pic with the foam taco and super-liked it', t: '2026-10-09T11:05' },
        { from: 'them', text: "She's seen inside your mouth, babe. She knows what she's getting into. That's more than most first dates.", t: '2026-10-09T11:07' },
        { from: 'me', text: "she said my bite is 'perfectly aligned' and i've been thinking about it for 9 hours. is that flirting. is that dentist dirty talk", t: '2026-10-09T11:10' },
        { from: 'them', text: "Dewey if she says 'open wide' you're getting married. Now go feed the mob, you horny little burrito.", t: '2026-10-09T11:11' },
        { from: 'them', text: "Cops asked if you came in this week. I said 'define came in'. They left.", t: '2026-10-12T16:40' },
      ],
    },
  ],

  photos: [
    { id: 'c9_ph_truck', art: 'c9_ph_truck', t: '2026-08-15T12:30', place: 'Harlow Falls Farmers Market', orientation: 'landscape', caption: 'A food truck built in the shape of a taco at a farmers market; a man in a bandana leans out of the serving window with tongs.' },
    { id: 'c9_ph_sizzle', art: 'c9_ph_sizzle', t: '2016-10-10T14:00', place: 'Harlow Falls', orientation: 'landscape', caption: 'An older, plain silver step van with hand-painted lettering; a young man and an older woman pose in front of it.' },
    { id: 'c9_ph_lou_order', art: 'c9_ph_lou_order', t: '2026-07-19T11:35', place: 'The Munchie Wagon', orientation: 'portrait', caption: 'A burrito cut in half on wax paper, filling visible; a name written on the wrapper in marker.', clue: 'lou_order_habit' },
    { id: 'c9_ph_menu', art: 'c9_ph_menu', t: '2026-10-07T14:10', place: 'Harlow Commissary Kitchen', orientation: 'landscape', caption: 'A whiteboard in a commercial kitchen with a handwritten catering menu.', clue: 'menu_no_turkey' },
    { id: 'c9_ph_turkeys', art: 'c9_ph_turkeys', t: '2026-10-08T17:42', place: 'Bellweather Funeral Home — rear lot', orientation: 'portrait', caption: 'Recovered. Cardboard cases stacked on a hand truck at a steel back door with a sign; a man in a dark suit holds the door with one hand raised toward the camera. Deleted Oct 8, 17:50.', clue: 'turkey_photo', deletedUntil: 'recovered:photos' },
    { id: 'c9_ph_spread', art: 'c9_ph_spread', t: '2026-10-09T17:55', place: 'Pettibone residence, Ridgecrest Dr', orientation: 'landscape', caption: 'Recovered. A large living room laid out for a reception: chafing dishes, a framed portrait, a white satin box on a pedestal. Deleted Oct 9, 19:05.', deletedUntil: 'recovered:photos' },
    { id: 'c9_ph_window', art: 'c9_ph_window', t: '2026-10-09T18:31', place: 'Pettibone residence — curbside', orientation: 'landscape', caption: 'Recovered. View out of a food-truck serving window over a tray of tater tots. Beyond: the side of a large house, a driveway, a woman in black at the open rear of a white SUV. Deleted Oct 9, 19:05.', clue: 'donna_box', deletedUntil: 'recovered:photos' },
    { id: 'c9_ph_box1820', art: 'c9_ph_box1820', t: '2026-10-09T18:20', place: 'Pettibone residence, Ridgecrest Dr', orientation: 'portrait', caption: "From Tommy Pettibone's Glimpse. A white satin box on a pedestal crammed with envelopes, a framed portrait beside it, a wall clock above.", clue: 'box_1820' },
    { id: 'c9_ph_pallbearers', art: 'c9_ph_pallbearers', t: '2026-10-09T14:50', place: "St. Brendan's Cemetery", orientation: 'landscape', caption: "From Tommy Pettibone's Glimpse. Six men in black suits carrying a mahogany casket; several are visibly straining.", clue: 'cold_casket' },
    { id: 'c9_ph_jetski', art: 'c9_ph_jetski', t: '2026-10-12T14:58', place: 'Harlow Marine & Powersports', orientation: 'landscape', caption: 'Sent by Spatula. A young man straddles a new jet ski on a trailer in a dealership lot; a name is printed on the hull.' },
    { id: 'c9_ph_loan', art: 'c9_ph_loan', t: '2026-10-12T15:05', place: 'Harlow Marine & Powersports', orientation: 'portrait', caption: 'Sent by Spatula. A printed financing approval letter on a desk.', clue: 'jetski_loan' },
    { id: 'c9_ph_overlook', art: 'c9_ph_overlook', t: '2026-10-13T04:08', place: 'Harlow Falls Scenic Overlook', orientation: 'landscape', caption: 'Night. The taco-shaped truck parked alone at a scenic overlook; lake lights far below; a road sign at the edge of the lot.', clue: 'truck_ditched' },
    // Hidden album
    { id: 'c9_ph_h_donna', art: 'c9_ph_h_donna', t: '2026-10-11T22:14', place: 'Received from Mrs. Pettibone', orientation: 'portrait', hidden: true, caption: 'Hidden album. Received. A woman in black lingerie and a sheer robe takes a mirror selfie in a motel bathroom doorway. Behind her in the mirror: a motel room, a fire-exit card on the door, a large man in a white bathrobe on the bed eating something wrapped in foil.', clue: 'donna_mirror' },
    { id: 'c9_ph_h_tots', art: 'c9_ph_h_tots', t: '2026-09-20T23:10', place: "Spatula's apartment", orientation: 'portrait', hidden: true, caption: 'Hidden album. A man in a bathtub filled to the chest with tater tots, holding a ketchup bottle and a single rose. A cat watches from the sink.' },
    { id: 'c9_ph_h_taco', art: 'c9_ph_h_taco', t: '2026-10-08T23:30', place: 'The Munchie Wagon', orientation: 'portrait', hidden: true, caption: 'Hidden album. A man in leopard-print briefs reclines on a food-truck counter behind a giant foam taco. A health-inspection certificate is visible on the wall.' },
    { id: 'c9_ph_h_spatula', art: 'c9_ph_h_spatula', t: '2026-10-12T16:30', place: 'Received from Spatula', orientation: 'portrait', hidden: true, caption: 'Hidden album. Received. A shirtless young man on a jet ski in a dealership showroom, a pizza box held across his lap; a salesman stares from a desk behind him.' },
  ],

  notes: [
    {
      id: 'n_box', title: 'I KNOW WHATS IN THE BOX (dewey code)', t: '2026-10-13T03:35', lock: { password: 'urkeystay', hint: 'What I hauled to Prep Room B. Plural. In Dewey Code (ask Spatula, he hates it).' }, clue: 'dewey_knew',
      body: "ok. ok ok ok. writing this down before i forget bc i WILL forget.\n\n1. fisk paid me to bring 180 lbs of frozen turkey to prep room B. there was NO turkey at the wake.\n2. tommy said the casket was cold as a beer cooler and went CLUNK. turkeys go clunk. i've dropped enough to know.\n3. the lou special just got ordered from mrs p's account to the lakeshore motor inn rm 9 at 3am. NOBODY orders the lou special. nobody can. it's peanut butter and pickles and a threat.\n4. the wrong-number pic mrs p sent me (hidden folder, i'm not a perv, it's EVIDENCE) has a big dude in a bathrobe in the mirror eating foil food.\n5. 6:31pm at the wake, i took a pic of my tots and mrs p is in the background putting the wishing well in her white suv. i deleted it when junior screamed. can phones undelete? i think they can. i saw it on a show.\n\nBIG LOU IS ALIVE. the casket is TURKEYS. mrs p took the money.\n\nirs gives whistleblowers like 15-30%. 30% of a car wash empire is a LOT of tots.\n\ngoing to get proof. phone stays in the truck so they can't track me (saw it on a show).\n\nif i don't come back: spatula gets the truck. mom gets everything else. NOBODY gets the birria recipe. it dies with me. tell junior the tots were frozen. they were NOT. just to mess with him.",
    },
    { id: 'n_regulars', title: 'Regulars (weird orders)', t: '2026-08-31T22:00', clue: 'lou_order_habit', body: "BIG LOU P. — 'The Lou Special'. Breakfast burrito, NO egg, peanut butter, dill pickles (folded, not sliced), tots INSIDE, hot honey ON THE SIDE. Not on the menu. Only he orders it. He invented it in front of me and made me swear. Nobody else on Earth has ever asked for it and I hope nobody ever does.\n\nKNUCKLES — 'whatever's hot, bring it to the car'.\nTOMMY P. — six fish tacos, tips $100, cries at the end every time.\nMRS. P — never eats. Just looks at the food until it apologizes.\nTHE DENTIST — tots only. calls them 'little guys'. (marry her???)" },
    { id: 'n_menu', title: 'PETTIBONE WAKE — prep', t: '2026-10-07T14:20', clue: 'menu_no_turkey', body: "PETTIBONE WAKE — Fri Oct 9 — 200 heads — Mrs P approved\n\n- birria tacos x400\n- loaded tots (80 lb)\n- elote cups\n- FUNERAL POTATOES (per mrs p, 'lou hated them')\n- churro bites\n\nNO TURKEY. No turkey anywhere. So why does fisk need 180 lbs of it??? (ask spatula if funeral homes eat)" },
    { id: 'n_ideas', title: 'truck ideas 💡', t: '2026-09-02T02:44', body: "- taco shaped like a smaller taco\n- drive-thru for boats\n- 'the walk of shame' breakfast menu, open 5-8am, only sold to people in last night's clothes\n- churro you can wear\n- second truck shaped like a burrito, they could date\n- franchise??? (look up what that means)" },
  ],

  mail: [
    { id: 'm_order', from: 'Munchie Wagon Orders', fromAddr: 'orders@munchiewagon.example', to: 'Dewey Kostka', subject: 'New order #4471 — Breakfast burrito (build your own)', t: '2026-10-13T03:12', folder: 'inbox', clue: 'lou_special', body: "NEW ORDER #4471\n\nCustomer: D. Pettibone (account: donnap61)\nItem: Breakfast burrito (build your own)\nSpecial requests: NO egg. Peanut butter. Dill pickles, folded not sliced. Tots INSIDE. Hot honey on the side, not on top.\n\nDelivery: Lakeshore Motor Inn, Room 9\nDriver note: 'leave at door. do not knock. extra pickles. he says you know how.'\n\nPaid: $14.00 + $40.00 tip" },
    { id: 'm_obit', from: 'Harlow Falls Ledger — Obituaries', fromAddr: 'obits@harlowledger.example', to: 'subscribers', subject: 'Louis "Big Lou" Pettibone, 1958–2026', t: '2026-10-05T06:00', folder: 'inbox', clue: 'fisk_doctor', body: "Louis 'Big Lou' Pettibone, 68, founder of Pettibone Family Car Washes, died peacefully at home in his sauna on October 3.\n\nDeath was pronounced at the residence by the family's physician, Dr. Neil Fisk. Arrangements are by Bellweather Funeral Home (Gordon Fisk, director). At the family's request, the casket will be closed and no viewing will be held.\n\nHe is survived by his wife of 34 years, Donna, his son Louis Jr., and eleven car washes. In lieu of flowers, the family asks for envelopes." },
    { id: 'm_police', from: 'Harlow Falls PD — Det. R. Okon', fromAddr: 'r.okon@harlowfallspd.example', to: 'Dewey Kostka', subject: 'Request for interview — theft reported at 14 Ridgecrest Dr', t: '2026-10-11T10:00', folder: 'inbox', clue: 'tribute_box', body: "Mr. Kostka,\n\nMrs. Donna Pettibone has reported the theft of a satin collection box ('the Wishing Well') containing approximately $212,000 in sympathy envelopes during the reception on October 9.\n\nMrs. Pettibone states she last saw the box at approximately 18:45, and that 'the caterer kept wandering inside the house'.\n\nPlease contact me to arrange an interview. Please also stop leaving voicemails in what I am told is pig latin.\n\nDet. R. Okon" },
    { id: 'm_chefdepot', from: "Chef's Depot", fromAddr: 'receipts@chefsdepot.example', to: 'Dewey Kostka', subject: 'Receipt — account BELLWEATHER FUNERAL HOME', t: '2026-10-08T16:58', folder: 'inbox', clue: 'turkey_ask', body: "Account: BELLWEATHER FUNERAL HOME (G. Fisk)\nPicked up by: D. Kostka (authorized)\n\n18 x Whole Turkey, frozen, 10 lb — $16.90 ea\nTotal: $304.20\n\nThank you for shopping at Chef's Depot. We hope your event is a success!" },
    { id: 'm_invoice', from: 'Dewey Kostka', fromAddr: 'dewey@munchiewagon.example', to: 'donnap61@ridgecrestmail.example', subject: 'Invoice — Pettibone wake (so sorry for ur loss)', t: '2026-10-06T01:15', folder: 'sent', body: "Hi Mrs P,\n\nInvoice for Friday: $4,800 (200 heads, tots, birria, corn cups, sad potatoes).\n\nAgain so sorry about Big Lou. He was a great man and a terrifying customer.\n\nDewey\nThe Munchie Wagon\n'You're Gonna Need A Nap'" },
    { id: 'm_jetski', from: 'Harlow Marine Finance', fromAddr: 'offers@harlowmarinefinance.example', to: 'Dewey Kostka', subject: "You're PRE-APPROVED for 84 months of 0% fun! 🌊", t: '2026-10-12T18:00', folder: 'trash', body: "Hey Dewey! Your friend Ryan 'Spatula' Oduya listed you as a reference — and guess what, you're pre-approved too!\n\nWhy not ride together? Nothing says friendship like matching debt." },
  ],

  calls: [
    { contact: 'donna', t: '2026-10-13T04:20', dir: 'missed' },
    { contact: 'donna', t: '2026-10-13T04:02', dir: 'missed' },
    { contact: 'donna', t: '2026-10-13T03:50', dir: 'missed' },
    { contact: 'mom', t: '2026-10-11T12:45', dir: 'out', duration: '11:02' },
    { contact: 'junior', t: '2026-10-10T02:30', dir: 'missed' },
    { contact: 'gordon', t: '2026-10-09T21:30', dir: 'missed' },
    { contact: 'spatula', t: '2026-10-09T19:15', dir: 'out', duration: '3:40' },
    { contact: 'gordon', t: '2026-10-08T10:05', dir: 'in', duration: '1:12' },
    { contact: 'lou', t: '2026-10-01T11:02', dir: 'in', duration: '0:40' },
  ],

  voicemails: [
    { id: 'vm_gordon', contact: 'gordon', t: '2026-10-09T21:31', duration: '0:38', voice: { pitch: 0.95, rate: 1.2, female: false }, clue: 'gordon_vm', deletedUntil: 'recovered:voice', transcript: "Mr. Kostka. Gordon Fisk. About the... poultry. There was no poultry. You never came to my back door. You never met me. You understand? There is two thousand dollars in an envelope under your windshield wiper. That is a tip. For the tots. The tots were very good. Please delete this message. Please delete... me. From your mind." },
    { id: 'vm_junior', contact: 'junior', t: '2026-10-10T02:31', duration: '0:29', voice: { pitch: 0.85, rate: 1.0, female: false }, clue: 'junior_threat', transcript: "Taco boy. It's two in the morning and I'm in my dead father's study drinking his scotch and I keep thinking about you. Not in a weird way. In a murder way. Bring the money back, and maybe you just lose the truck. Also my mother won't stop smiling and I don't like it." },
    { id: 'vm_mom', contact: 'mom', t: '2026-10-13T07:05', duration: '0:20', voice: { pitch: 1.15, rate: 1.1, female: true }, transcript: "DEWEY. IT'S YOUR MOTHER. WHAT TIP JAR. I am calling every tip jar in this county. Call me back or I'm telling Mrs. Hendricks about the thing with the inflatable pool." },
    { id: 'vm_tommy', contact: 'tommy', t: '2026-10-10T13:00', duration: '0:24', voice: { pitch: 1.0, rate: 0.95, female: false }, transcript: "Hey, uh, it's Tommy, from the wake. Six fish tacos. I just wanna say I don't think you took it. You were feeding everybody. Thieves don't put extra lime on. Also my back's killing me from carrying Uncle Lou. Man was like a refrigerator." },
  ],

  map: {
    art: 'c9_map',
    places: [
      { id: 'commissary', name: 'Harlow Commissary Kitchen', x: 0.22, y: 0.62 },
      { id: 'chefdepot', name: "Chef's Depot", x: 0.12, y: 0.30 },
      { id: 'bellweather', name: 'Bellweather Funeral Home', x: 0.40, y: 0.42 },
      { id: 'pettibone', name: 'Pettibone residence, 14 Ridgecrest Dr', x: 0.58, y: 0.22 },
      { id: 'cemetery', name: "St. Brendan's Cemetery", x: 0.48, y: 0.12 },
      { id: 'spatula', name: "Spatula's apartment", x: 0.30, y: 0.80 },
      { id: 'overlook', name: 'Harlow Falls Scenic Overlook', x: 0.76, y: 0.56 },
      { id: 'motel', name: 'Lakeshore Motor Inn', x: 0.88, y: 0.74 },
    ],
    stops: [
      { t: '2026-10-08T16:36', place: 'chefdepot', detail: 'Loading — 22 min' },
      { t: '2026-10-08T17:38', place: 'bellweather', detail: 'Rear lot — 14 min' },
      { t: '2026-10-09T15:38', place: 'pettibone', detail: 'Curbside. Inside the house 17:38–17:46 only; otherwise stationary at the curb until 19:04.', clue: 'truck_window' },
      { t: '2026-10-09T19:20', place: 'spatula', detail: 'Stayed — 3 nights' },
      { t: '2026-10-13T04:06', place: 'overlook', detail: 'Stationary. No further movement. Device collected Oct 14 by park ranger.', clue: 'truck_ditched' },
    ],
  },

  browser: [
    { t: '2026-10-13T03:30', title: 'can the IRS give you a reward for finding a dead guy', url: 'search?q=irs+reward+finding+dead+guy', clue: 'motel_plan', deletedUntil: 'recovered:history' },
    { t: '2026-10-13T03:33', title: 'IRS whistleblower reward percent of what they collect', url: 'search?q=irs+whistleblower+reward+percent', clue: 'motel_plan', deletedUntil: 'recovered:history' },
    { t: '2026-10-13T03:52', title: 'Walking directions: Harlow Falls Scenic Overlook → Lakeshore Motor Inn (1.2 mi, 24 min)', url: 'maps.example/dir/overlook/lakeshore-motor-inn', clue: 'motel_plan', deletedUntil: 'recovered:history' },
    { t: '2026-10-13T03:55', title: 'can police track your phone if it is in a tip jar', url: 'search?q=track+phone+in+tip+jar', deletedUntil: 'recovered:history' },
    { t: '2026-10-13T03:58', title: 'how long can a person live in a motel ice machine room', url: 'search?q=live+in+motel+ice+machine+room', clue: 'motel_plan', deletedUntil: 'recovered:history' },
    { t: '2026-10-13T04:01', title: 'is it a crime to deliver a burrito to a dead man', url: 'search?q=crime+deliver+burrito+dead+man', deletedUntil: 'recovered:history' },
    { t: '2026-10-12T23:50', title: 'how long do i have to hide from a car wash family', url: 'search?q=how+long+hide+from+car+wash+family' },
    { t: '2026-10-11T22:40', title: 'what does it mean when a widow sends you a lingerie pic and a death threat in the same text', url: 'search?q=widow+lingerie+pic+death+threat+same+text' },
    { t: '2026-10-11T22:44', title: 'is it cheating if she is sexting a dead man', url: 'search?q=is+it+cheating+sexting+dead+man' },
    { t: '2026-10-11T02:15', title: 'can you get arrested for being near money', url: 'search?q=arrested+for+being+near+money' },
    { t: '2026-10-10T13:00', title: "Harlow Falls Ledger — Police seek caterer after 'Wishing Well' theft at Pettibone wake", url: 'harlowledger.example/news/wishing-well-theft' },
    { t: '2026-10-08T23:20', title: 'is it hot to send a pic in leopard briefs with a foam taco or is that a cry for help', url: 'search?q=leopard+briefs+foam+taco+hot' },
    { t: '2026-10-07T22:41', title: 'how many tots per mourner', url: 'search?q=how+many+tots+per+mourner' },
    { t: '2026-10-04T09:12', title: 'Harlow Falls Ledger — Grand jury to hear Pettibone car-wash laundering case Oct 15', url: 'harlowledger.example/news/pettibone-grand-jury', clue: 'indictment' },
    { t: '2026-10-02T01:40', title: 'my dentist super-liked me is that a conflict of interest for my teeth', url: 'search?q=dentist+super+liked+me+conflict+of+interest' },
    { t: '2026-09-28T03:12', title: 'can a taco legally be a vehicle', url: 'search?q=can+a+taco+legally+be+a+vehicle' },
  ],

  glimpse: [
    { id: 'g9_box', author: 'tommy', photo: 'c9_ph_box1820', caption: "Aunt Donna's Wishing Well for Uncle Lou 🕊️ the family thanks u all. some of u gave WAY too much, we noticed, we appreciate it, we know who u are", t: '2026-10-09T18:21', likes: 41, comments: [{ author: 'junior', text: 'Take this down Tommy' }, { author: 'donna', text: '❤️' }], clue: 'box_1820' },
    { id: 'g9_pall', author: 'tommy', photo: 'c9_ph_pallbearers', caption: "Pallbearer for Uncle Lou today 🕊️ man was HEAVY, and the casket was cold like a beer cooler, and something in there went CLUNK on the steps. rip big man. u were built different", t: '2026-10-09T14:52', likes: 77, comments: [{ author: 'junior', text: 'Delete this.' }, { author: 'me', text: 'rip big lou 🌯🙏' }, { author: 'spatula', text: 'clunk??' }], clue: 'cold_casket' },
    { id: 'g9_jetski', author: 'spatula', photo: 'c9_ph_jetski', caption: "meet SPLASH DADDY 🌊🍆 she's thick, she's fast, she's mine for 84 easy payments. ladies form an orderly line at the boat ramp", t: '2026-10-12T15:10', likes: 23, comments: [{ author: 'junior', text: 'Interesting timing.' }, { author: 'marisol', text: 'the eggplant emoji on a jet ski post is a cry for help' }] },
    { id: 'g9_lou', author: 'me', photo: 'c9_ph_lou_order', caption: 'the Lou Special. one customer. one legend. do NOT ask for it. i mean that legally', t: '2026-07-19T11:40', likes: 19, comments: [{ author: 'lou', text: 'Delete this.' }, { author: 'marisol', text: 'is that peanut butter and PICKLES' }], clue: 'lou_order_habit' },
    { id: 'g9_truck', author: 'me', photo: 'c9_ph_truck', caption: "10 years of tots 🌮 from SIZZLE to THE MUNCHIE WAGON. still never passed a health inspection on the first try. still never will", t: '2026-08-15T13:00', likes: 64, comments: [{ author: 'mom', text: 'SO PROUD OF YOU. WEAR SUNSCREEN' }, { author: 'spatula', text: 'the health inspector has my number now. she texts me' }] },
  ],

  bank: {
    account: 'Harlow Falls Credit Union ••2215',
    balance: 61.07,
    tx: [
      { t: '2026-10-12T16:20', desc: "HIGHER GROUND DISPENSARY — 'CALM' GUMMIES x3", amount: -48.00 },
      { t: '2026-10-11T09:00', desc: 'RETURNED CHECK — STOP PAYMENT (PETTIBONE, D.)', amount: -4800.00 },
      { t: '2026-10-10T09:04', desc: 'ATM CASH DEPOSIT', amount: 2000.00 },
      { t: '2026-10-10T09:02', desc: 'CHECK DEPOSIT — PETTIBONE, DONNA — CATERING', amount: 4800.00 },
      { t: '2026-10-08T18:10', desc: 'ATM CASH DEPOSIT', amount: 300.00 },
      { t: '2026-10-01T08:00', desc: 'HARLOW COMMISSARY — BAY RENT', amount: -650.00 },
      { t: '2026-09-30T13:20', desc: 'PROPANE PLUS', amount: -84.40 },
      { t: '2026-09-26T07:45', desc: 'TOT WAREHOUSE — 80 LB FROZEN TOTS', amount: -192.00 },
      { t: '2026-09-20T15:00', desc: 'HARLOW COUNTY — MOBILE FOOD PERMIT LATE FEE', amount: -50.00 },
      { t: '2026-09-19T23:55', desc: 'SPARKS DATING APP — PREMIUM (1 MONTH)', amount: -29.99 },
    ],
  },

  calendar: [
    { id: 'c9_c_turkey', t: '2026-10-08T17:00', title: 'turkey thing for fisk ($300)', detail: "back door. prep room B. don't ask (i asked)" },
    { id: 'c9_c_wake', t: '2026-10-09T15:30', title: 'PETTIBONE WAKE 🕊️🌮', detail: '200 heads. NO PHOTOS (junior). funeral potatoes. no weed till after (lol)' },
    { id: 'c9_c_bday', t: '2026-10-10T00:00', title: 'TRUCK BIRTHDAY 🎂 10 yrs', detail: 'since the SIZZLE days' },
    { id: 'c9_c_dentist', t: '2026-10-14T19:00', title: 'date w/ the dentist 🦷', detail: 'brush. floss. do NOT make the tooth joke' },
    { id: 'c9_c_market', t: '2026-10-17T09:00', title: 'farmers market', detail: 'bring the good tongs' },
    { id: 'c9_c_mom', t: '2026-10-20T12:00', title: "MOM'S BIRTHDAY", detail: 'DO NOT FORGET AGAIN. not the gas station flowers' },
  ],

  wifi: [
    { name: 'MunchieWagon_Hotspot', lastJoined: '2026-10-13T04:05' },
    { name: 'Pettibone_Guest (mourners only)', lastJoined: '2026-10-09T17:39' },
    { name: 'FBI Surveillance Van 2', lastJoined: '2026-10-09T16:10' },
    { name: 'Bellweather_Staff', lastJoined: '2026-10-08T17:41' },
    { name: 'Higher Ground Patients Only', lastJoined: '2026-10-12T16:18' },
    { name: "Spatula's Den of Iniquity", lastJoined: '2026-10-12T22:30' },
    { name: 'Get Your Own WiFi Karen', lastJoined: '2026-09-02T02:40' },
  ],

  trace: [
    { id: 'photos', label: 'Photos — Recently Deleted', detail: 'Carve deleted images from unallocated flash storage.', needs: ['unlocked'], durationMs: 5000 },
    { id: 'msgfrag', label: 'Messages — Orphaned Fragments', detail: 'Rebuild deleted SMS records from the database write-ahead log.', needs: ['pinned:lou_special'], needsHint: 'Need a lead first: pin the 03:12 order from Oct 13.', durationMs: 6500 },
    { id: 'voice', label: 'Voicemail — Carrier Cache', detail: 'Pull deleted voicemail audio from the carrier sync cache.', needs: ['pinned:turkey_photo'], needsHint: "Need a lead first: pin what Dewey delivered to Bellweather's back door.", durationMs: 5500 },
    { id: 'history', label: 'Browser — Cleared History', detail: 'Recover cleared browsing sessions from the WebKit cache.', needs: ['note:n_box'], needsHint: "Need a lead first: open Dewey's locked note about the box.", durationMs: 5000 },
  ],

  clues: [
    { id: 'tribute_box', title: 'The $212,000 Wishing Well', text: "Donna told police the box held about $212,000 in envelopes, that she last saw it around 18:45, and that 'the caterer kept wandering inside'. Junior says he saw Dewey in the study.", kind: 'document' },
    { id: 'box_1820', title: 'The box at 18:20', text: "Tommy's 18:20 post: the Wishing Well on its pedestal, stuffed with envelopes. Wall clock reads 6:20.", kind: 'object', art: 'c9_ph_box1820' },
    { id: 'truck_window', title: 'At the curb from 17:46', text: "Location: Dewey was inside the house only from 17:38 to 17:46. After that the phone stayed at the truck at the curb until 19:04.", kind: 'place' },
    { id: 'donna_box', title: 'The white SUV, 18:31', text: "Recovered photo from the truck window, 18:31: Donna Pettibone loading the white satin box into the back of her white SUV.", kind: 'event', art: 'c9_ph_window' },
    { id: 'junior_threat', title: "Junior: 'the next wake'", text: "Lou Jr. gave Dewey 'till Monday' to return the money, or the next wake is his. At 2 a.m. he called again: 'my mother won't stop smiling and I don't like it.'", kind: 'person', art: 'av_c9_junior' },
    { id: 'turkey_ask', title: '180 lb of frozen turkey', text: "Gordon Fisk paid Dewey $300 to collect 18 ten-pound frozen turkeys on Bellweather's account and deliver them to Prep Room B. 'For a different reception.'", kind: 'document', art: 'av_c9_gordon' },
    { id: 'turkey_photo', title: 'Prep Room B, 17:42', text: "Recovered photo: the turkey cases at Bellweather's back door, Gordon Fisk waving the camera off. He asked Dewey to delete it.", kind: 'object', art: 'c9_ph_turkeys' },
    { id: 'menu_no_turkey', title: 'No turkey on the menu', text: "The wake menu Donna approved: birria, tots, corn cups, funeral potatoes, churro bites. No turkey anywhere.", kind: 'document', art: 'c9_ph_menu' },
    { id: 'cold_casket', title: "'Cold like a beer cooler'", text: "Pallbearer Tommy: the casket was 'HEAVY... cold like a beer cooler, and something in there went CLUNK'.", kind: 'event', art: 'c9_ph_pallbearers' },
    { id: 'lou_order_habit', title: 'The Lou Special', text: "No egg, peanut butter, folded pickles, tots inside, hot honey on the side. Off-menu. Only Big Lou ever ordered it, and he forbade Dewey to sell it to anyone else.", kind: 'object', art: 'c9_ph_lou_order' },
    { id: 'lou_special', title: 'Order #4471, 03:12', text: "Four days after the burial: a Lou Special, exactly as Lou ordered it, from Donna's account, for delivery to the Lakeshore Motor Inn, Room 9. 'do not knock... he says you know how.'", kind: 'document' },
    { id: 'indictment', title: 'Grand jury, Oct 15', text: "The Ledger: a grand jury was due to hear the Pettibone car-wash laundering case on Oct 15. Lou 'died' twelve days before.", kind: 'document' },
    { id: 'fisk_doctor', title: 'Pronounced by Dr. Neil Fisk', text: "Obituary: death pronounced at home by the family physician, Dr. Neil Fisk; arrangements by Bellweather (Gordon Fisk). Closed casket, no viewing.", kind: 'document' },
    { id: 'fisk_debt', title: 'Fisk owes Lou $90k', text: "Junior: 'Fisk owes my father ninety large, that's why we got the mahogany at cost.'", kind: 'person', art: 'av_c9_junior' },
    { id: 'gordon_vm', title: "Fisk: 'There was no poultry'", text: "Deleted voicemail, Oct 9, 21:31: Gordon Fisk tells Dewey there was no poultry and leaves $2,000 under his wiper 'for the tots'. Next morning: ATM cash deposit, $2,000.", kind: 'person', art: 'av_c9_gordon' },
    { id: 'donna_denial', title: "Donna: 'Delete this thread'", text: "Deleted texts, Oct 13 03:20–03:47: Dewey asks if Big Lou is 'ALIVE ok' and mentions the 6:31 photo. Donna: 'You were high... Delete. The. Thread.'", kind: 'person', art: 'av_c9_donna' },
    { id: 'donna_mirror', title: 'The wrong-number selfie', text: "Hidden album: Donna's Oct 11 mirror selfie, sent to the wrong contact. Behind her in the motel mirror, a big man in a white bathrobe eats something wrapped in foil. The door card reads LAKESHORE MOTOR INN, ROOM 9.", kind: 'object', art: 'c9_ph_h_donna' },
    { id: 'donna_slip', title: "Donna: 'cremated. Buried.'", text: "Donna to whoever holds the phone: 'Louis was cremated. Buried. He is buried.'", kind: 'person', art: 'av_c9_donna' },
    { id: 'jetski_loan', title: 'SPLASH DADDY, 84 months at 0%', text: "Spatula's jet ski was bought with 84-month, 0% financing: $11,480, approved Oct 12.", kind: 'document', art: 'c9_ph_loan' },
    { id: 'dewey_code', title: 'Dewey Code = pig latin', text: "Spatula: 'first sound goes to the back, add ay'. 'unchiemay agonway'.", kind: 'document' },
    { id: 'dewey_knew', title: 'I know what\'s in the box', text: "Dewey's locked note: turkeys in the casket, the Lou Special to Room 9, Donna with the Wishing Well. 'BIG LOU IS ALIVE.' He went to get proof for an IRS reward.", kind: 'document' },
    { id: 'motel_plan', title: 'Reward, ice machine, 1.2 miles', text: "Cleared history, 03:30–03:58: IRS whistleblower reward percentages, walking directions from the overlook to the Lakeshore Motor Inn, and 'how long can a person live in a motel ice machine room'.", kind: 'document' },
    { id: 'truck_ditched', title: 'Truck left at the overlook, 04:06', text: "The truck stopped at the Harlow Falls Scenic Overlook at 04:06 and never moved again. A road sign at the lot points to the Lakeshore Motor Inn, 1.2 miles.", kind: 'place', art: 'c9_ph_overlook' },
    { id: 'dewey_motel', title: 'Dewey: "room 9 is BIG LOU"', text: "Dewey, from the Lakeshore Motor Inn courtesy phone: he's hiding in the ice-machine room and watching Room 9, where Big Lou is alive in a robe and eating a Lou Special.", kind: 'person', art: 'av_unknown' },
  ],

  questions: [
    {
      id: 'q_box', prompt: 'Who took the Wishing Well?',
      options: [
        { id: 'dewey', label: 'Dewey Kostka', art: 'av_c9_dewey' },
        { id: 'spatula', label: "Spatula (Ryan Oduya)", art: 'av_c9_spatula' },
        { id: 'junior', label: 'Lou Jr.', art: 'av_c9_junior' },
        { id: 'donna', label: 'Donna Pettibone', art: 'av_c9_donna' },
        { id: 'gordon', label: 'Gordon Fisk', art: 'av_c9_gordon' },
      ],
      answer: 'donna', evidence: ['donna_box', 'box_1820', 'truck_window', 'donna_denial', 'dewey_knew'],
      explain: "The box was on its pedestal at 18:20. At 18:31 Dewey's truck-window photo caught Donna loading it into her SUV, while Dewey's phone hadn't left the curb since 17:46. She then told police she last saw it at 18:45.",
    },
    {
      id: 'q_lou', prompt: "What really happened to Big Lou Pettibone?",
      options: [
        { id: 'sauna', label: 'He died of a heart attack in his sauna' },
        { id: 'junior', label: 'His son killed him for the business' },
        { id: 'faked', label: 'He faked his death before the grand jury and is hiding at the Lakeshore Motor Inn' },
        { id: 'fled', label: 'He died, and the family invented a burial to hide the body' },
      ],
      answer: 'faked', evidence: ['lou_special', 'lou_order_habit', 'donna_mirror', 'donna_denial', 'donna_slip', 'indictment', 'dewey_motel', 'cold_casket', 'dewey_knew'],
      explain: "Only Lou ever ordered the Lou Special, and one went to Room 9 at 03:12 from his widow's account. Donna's misdirected selfie shows a big man in a robe in that same room. The grand jury was days away.",
    },
    {
      id: 'q_casket', prompt: "What was buried in Big Lou's casket?",
      options: [
        { id: 'lou', label: 'Big Lou' },
        { id: 'empty', label: 'Nothing. It was empty' },
        { id: 'money', label: 'The missing $212,000' },
        { id: 'turkey', label: 'About 180 lb of frozen turkey' },
      ],
      answer: 'turkey', evidence: ['turkey_photo', 'turkey_ask', 'menu_no_turkey', 'cold_casket', 'gordon_vm', 'dewey_knew'],
      explain: "The funeral director bought 180 lb of frozen turkey the day before a wake with no turkey on the menu, and had it delivered to his prep room. The pallbearers said the casket was heavy, cold, and went clunk.",
    },
    {
      id: 'q_helper', prompt: 'Who staged the death on paper and in the casket?',
      options: [
        { id: 'junior', label: 'Lou Jr.' },
        { id: 'fisk', label: 'Gordon Fisk and his brother, Dr. Neil Fisk' },
        { id: 'dewey', label: 'Dewey, without knowing it' },
        { id: 'tommy', label: 'Cousin Tommy' },
      ],
      answer: 'fisk', evidence: ['gordon_vm', 'fisk_debt', 'fisk_doctor', 'turkey_ask', 'turkey_photo'],
      explain: "Dr. Neil Fisk pronounced the death at home and Gordon Fisk ran a closed-casket funeral, filled it with turkeys and paid Dewey to forget them. Gordon owed Lou $90,000.",
    },
    {
      id: 'q_spatula', prompt: "How did Spatula pay for the jet ski?",
      options: [
        { id: 'well', label: 'With cash from the Wishing Well' },
        { id: 'savings', label: 'Savings from the truck' },
        { id: 'loan', label: '84 months of 0% financing' },
        { id: 'junior', label: 'Junior paid him to frame Dewey' },
      ],
      answer: 'loan', evidence: ['jetski_loan'],
      explain: "The timing looked terrible, but the approval letter is right there: $11,480 over 84 months at 0%. He'll be paying for SPLASH DADDY until he's 31.",
    },
    {
      id: 'q_dewey', prompt: 'Where is Dewey now?',
      options: [
        { id: 'trunk', label: "In the trunk of Lou Jr.'s car" },
        { id: 'lake', label: 'He drove off the overlook into the lake' },
        { id: 'motel', label: 'Hiding in the ice-machine room at the Lakeshore Motor Inn, watching Room 9' },
        { id: 'mom', label: "At his mother's house" },
      ],
      answer: 'motel', evidence: ['dewey_motel', 'motel_plan', 'truck_ditched', 'lou_special', 'dewey_knew'],
      explain: "He left the phone in the tip jar so he couldn't be tracked, looked up the 1.2-mile walk to the Lakeshore Motor Inn and how long you can live in an ice-machine room, then went to get proof for an IRS reward.",
    },
  ],

  events: [
    { id: 'e9_mom', kind: 'text', when: ['unlocked'], delayMs: 4000, thread: 'th_mom', contact: 'mom', text: "IS THIS THE POLICE. MY SON DID NOT STEAL FROM A FUNERAL. HE CRIES AT FUNERALS. HE CRIED AT HIS GOLDFISH'S AND IT WAS A FLUSHING. ALSO IF YOU FIND HIS DATING APP PLEASE DELETE IT, I HAVE SEEN THE TACO PICTURE" },
    { id: 'e9_h_order', kind: 'handler', when: ['pinned:lou_special'], delayMs: 3000, text: "That order came in at 03:12, four days after the burial, on the widow's account. Who on that guest list would know to ask for it like that? Dewey kept notes on his regulars." },
    { id: 'e9_junior', kind: 'text', when: ['unlocked'], minPins: 5, delayMs: 6000, thread: 'th_junior', contact: 'junior', text: "Whoever's got the stoner's phone. They found his truck at the overlook. If he jumped, tell him I'm sorry about the next-wake thing. If he didn't, tell him I'm not. Also tell him my mother just bought a second suitcase. What does a widow need two suitcases for." },
    { id: 'e9_donna', kind: 'text', when: ['recovered:msgfrag'], delayMs: 5000, thread: 'th_donna', contact: 'donna', text: "Whoever is reading this phone. Louis is at peace. He was cremated. Buried. He is buried. It was a beautiful service and you'd know that if your little taco man hadn't robbed it. Leave my family alone, sweetheart.", clue: 'donna_slip' },
    { id: 'e9_dewey', kind: 'text', when: ['recovered:history'], minPins: 14, delayMs: 6000, thread: 'th_c9unknown', contact: 'c9unknown', text: "it's DEWEY. using the courtesy phone at the lakeshore motor inn, the night guy thinks i'm a ghost. ROOM 9 IS BIG LOU. he's alive. he's in a robe. he's eating MY burrito, the lou special, i'd know that pickle fold anywhere. i've been living in the ice machine room since tuesday on ice and pretzels. mrs p comes every night with wine and a suitcase. please send someone who is not a pettibone. also shoes. size 11. i left my shoes in the truck to be stealthy. it was a mistake", clue: 'dewey_motel' },
    { id: 'e9_h_ready', kind: 'handler', when: ['unlocked'], minPins: 18, delayMs: 3000, text: "Every answer needs a pin behind it, and a court will need it too: 'the stoner said a burrito proves a man is alive' is not going to impress anyone. File the Case Report when it's airtight." },
  ],

  hints: [
    { until: 'unlocked', text: "Mom's notification names the truck's first name: SIZZLE. On a calculator, S=5, I=1, Z=2, L=7, E=3. Turning it upside down reverses the order. Look how the dashboard's 5318008 reads." },
    { until: 'recovered:photos', after: ['unlocked'], text: 'Junior made Dewey delete his wake photos. TRACE Photos.' },
    { until: 'hidden:open', after: ['unlocked'], text: "Dewey told Mrs. Pettibone he deleted her 'wrong contact' picture. He told her a lot of things. Check the Hidden album, and look past her." },
    { until: 'pinned:donna_box', after: ['recovered:photos'], text: 'Look at the 18:31 truck-window photo. Who is at the white SUV, and what are they holding?' },
    { until: 'pinned:lou_special', after: ['unlocked'], text: 'An order came in at 03:12 on October 13. Read it in Mail, then read Dewey\'s notes on his regulars.' },
    { until: 'recovered:msgfrag', after: ['pinned:lou_special'], text: 'Dewey texted somebody about that order and then deleted it. TRACE the message fragments.' },
    { until: 'pinned:turkey_photo', after: ['recovered:photos'], text: "There's a recovered photo from Bellweather's back door. Pin it." },
    { until: 'recovered:voice', after: ['pinned:turkey_photo'], text: 'Gordon Fisk called at 21:30 the night of the wake, and the voicemail is gone. TRACE the carrier cache.' },
    { until: 'note:n_box', after: ['unlocked'], text: "The locked note wants what went to Prep Room B, plural, in 'Dewey Code'. Spatula explains the rule: first consonant sound to the back, then add 'ay'." },
    { until: 'recovered:history', after: ['note:n_box'], text: 'Dewey cleared his browser before leaving the phone. TRACE the cleared history.' },
    { until: 'pinned:jetski_loan', after: ['unlocked'], text: "Spatula's new jet ski looks bad. How did he pay for it? Read his texts." },
    { until: 'report:filed', after: ['unlocked'], text: 'Open the Case Report. Back every answer with a pin. A man has been living on motel ice for three days for this.' },
  ],

  handlerIntro: "A stoner, a widow, a closed casket and two hundred grand in sympathy cards. The precinct thinks the taco man robbed a funeral and drove off a cliff out of shame. I've read his texts. Shame isn't in his vocabulary. Open the phone.",

  epilogue: {
    solved: [
      "At 06:10 on October 17, Harlow Falls PD and two IRS Criminal Investigation agents knocked on Room 9 of the Lakeshore Motor Inn. Louis 'Big Lou' Pettibone, sixty-eight and legally dead for fourteen days, opened the door in a motel bathrobe holding half a burrito. 'I want my lawyer,' he said, 'and I want the other half.' He did not get the other half.",
      "The exhumation at St. Brendan's took forty minutes. The mahogany casket held eighteen ten-pound turkeys, no longer frozen, a cinder block, and a note in Gordon Fisk's handwriting that said 'sorry'. Gordon and Dr. Neil Fisk were charged with fraud and abuse of a corpse. Their lawyer pointed out that it was a turkey corpse. The judge did not laugh, but the stenographer did.",
      "Donna Pettibone was arrested in the motel parking lot in her white SUV with two suitcases and $211,400 in sympathy envelopes. The missing $600 went on room service, which she says Lou ordered and Lou says went on 'her wine'. They are being tried together, and they have not spoken since. Junior took over the car washes. He says the first thing he did was 'run the books past an actual accountant, like a psycho.'",
      "Dewey Kostka was found in the ice-machine room of the Lakeshore Motor Inn, wearing motel towels as shoes. He had survived for three days on ice, vending-machine pretzels and spite. His IRS whistleblower claim is pending and may pay out in four to seven years. His mother has already spent it.",
      "The Munchie Wagon reopened on October 24 with a new item on the menu: The Dead Man's Special. Peanut butter, folded pickles, tots inside, hot honey on the side. Junior Pettibone orders one every Tuesday, tips in fifties and says the same thing every time: 'Still not a compliment.' Spatula owes eighty-three more payments on SPLASH DADDY. The dentist said yes.",
    ],
    partial: [
      'Your report reached the precinct with gaps in it.',
      "Without the burrito, the bathrobe and the birds in the box, the story stays the widow's: a stoned caterer robbed a grieving family and ran. Big Lou's grand jury is cancelled for lack of a defendant, Donna leaves the state with two suitcases, and the taco truck is sold at auction to a man named Knuckles.",
      'Go back to 03:12. Somebody ordered breakfast who should not be hungry.',
    ],
  },
};
