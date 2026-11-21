// COLD SIGNAL — case data contract.
// Every case is pure data. The engine renders it; flags gate what is visible.
//
// Time format everywhere: 'YYYY-MM-DDTHH:MM' (local, no zone). Sorting is lexical.
// Art ids reference keys in the art registry (src/art/index.ts). Each art entry
// is an SVG markup string.

export type AppId =
  | 'messages' | 'photos' | 'notes' | 'mail' | 'phone' | 'maps'
  | 'browser' | 'glimpse' | 'bank' | 'calendar' | 'settings' | 'trace';

/** A flag id. Engine-set flags:
 *  'unlocked'              phone passcode entered
 *  'note:<id>'             locked note opened
 *  'recovered:<jobId>'     TRACE job finished
 *  'pinned:<clueId>'       clue pinned to board
 *  'seen:<itemId>'         item opened at least once (photos, mail, notes, voicemails, threads)
 *  'event:<eventId>'       live event fired
 */
export type Flag = string;

export interface Contact {
  id: string;
  name: string;
  avatar: string; // art id
  number: string; // e.g. '(555) 014-7720'
  label?: string; // e.g. 'Mom', 'Work'
}

export interface Msg {
  from: 'me' | 'them';
  text: string;
  t: string;
  photo?: string; // photo id
  clue?: string;
  /** Hidden until this flag is set (deleted message restored by TRACE). */
  deletedUntil?: Flag;
}

export interface Thread {
  id: string;
  contact: string; // contact id
  messages: Msg[];
}

export interface Photo {
  id: string;
  art: string;
  t: string;
  place: string;
  orientation: 'portrait' | 'landscape';
  caption?: string; // forensic description shown in the info sheet
  clue?: string;
  deletedUntil?: Flag;
  /** Shown as small text in the info sheet, e.g. EXIF device. */
  device?: string;
}

export interface Note {
  id: string;
  title: string;
  t: string;
  body: string; // plain text, \n for newlines
  lock?: { password: string; hint: string };
  clue?: string;
  deletedUntil?: Flag;
}

export interface Mail {
  id: string;
  from: string;
  fromAddr: string;
  to: string;
  subject: string;
  t: string;
  body: string;
  folder: 'inbox' | 'sent' | 'trash';
  attachment?: string; // photo id
  clue?: string;
  deletedUntil?: Flag;
}

export interface Call {
  contact: string; // contact id or raw number
  t: string;
  dir: 'in' | 'out' | 'missed';
  duration?: string; // '4:12'
}

export interface Voicemail {
  id: string;
  contact: string; // contact id or raw number
  t: string;
  duration: string;
  transcript: string;
  voice: { pitch: number; rate: number; female: boolean };
  clue?: string;
  deletedUntil?: Flag;
}

export interface MapPlace {
  id: string;
  name: string;
  x: number; // 0..1 across the map art
  y: number; // 0..1 down the map art
}

export interface MapStop {
  t: string;
  place: string; // place id
  detail: string;
  clue?: string;
  deletedUntil?: Flag;
}

export interface MapData {
  art: string; // landscape map art id (800x600 viewBox)
  places: MapPlace[];
  stops: MapStop[];
}

export interface BrowserEntry {
  t: string;
  title: string;
  url: string;
  clue?: string;
  deletedUntil?: Flag;
}

export interface GlimpsePost {
  id: string;
  author: string; // contact id or 'me'
  photo: string; // photo id
  caption: string;
  t: string;
  likes: number;
  comments: { author: string; text: string }[];
  clue?: string;
}

export interface BankTx {
  t: string;
  desc: string;
  amount: number; // negative = spend
  clue?: string;
}

export interface CalEvent {
  id: string;
  t: string;
  title: string;
  detail: string;
  clue?: string;
}

export interface WifiNet {
  name: string;
  lastJoined: string;
  clue?: string;
}

export interface TraceJob {
  id: string;
  label: string; // 'Photos — Recently Deleted'
  detail: string; // what it does
  needs?: Flag[];
  needsHint?: string; // shown while locked
  durationMs: number;
}

export interface Clue {
  id: string;
  title: string;
  text: string;
  kind: 'person' | 'place' | 'object' | 'document' | 'event';
  art?: string; // thumbnail art id
}

export interface Question {
  id: string;
  prompt: string;
  options: { id: string; label: string; art?: string }[];
  answer: string;
  /** Any of these pinned clues counts as correct supporting evidence. */
  evidence: string[];
  explain: string;
}

export type LiveEvent =
  | {
      id: string;
      kind: 'text';
      when: Flag[];
      minPins?: number;
      delayMs: number;
      thread: string; // existing thread id or new id
      contact: string; // contact id (unknown numbers are contacts too)
      text: string;
      clue?: string;
    }
  | {
      id: string;
      kind: 'handler';
      when: Flag[];
      minPins?: number;
      delayMs: number;
      text: string;
    };

export interface Hint {
  /** Shown while this flag is NOT set (and all `after` flags are set). */
  until: Flag;
  after?: Flag[];
  text: string;
}

export interface CaseFile {
  id: string;
  number: string; // '01'
  title: string;
  tagline: string;
  difficulty: 1 | 2 | 3;
  cover: string; // art id (portrait)
  owner: { name: string; age: number; summary: string };
  briefing: string[];
  phoneDate: string; // date shown on the phone clock, 'YYYY-MM-DD'
  phoneTime: string; // 'HH:MM'
  lock: {
    passcode: string; // 4 or 6 digits
    hint: string;
    wallpaper: string;
    notifications: { app: AppId; title: string; text: string; t: string }[];
  };
  homeWallpaper: string;
  contacts: Contact[];
  threads: Thread[];
  photos: Photo[];
  notes: Note[];
  mail: Mail[];
  calls: Call[];
  voicemails: Voicemail[];
  map: MapData;
  browser: BrowserEntry[];
  glimpse: GlimpsePost[];
  bank: { account: string; balance: number; tx: BankTx[] };
  calendar: CalEvent[];
  wifi: WifiNet[];
  trace: TraceJob[];
  clues: Clue[];
  questions: Question[];
  events: LiveEvent[];
  hints: Hint[];
  handlerIntro: string;
  epilogue: { solved: string[]; partial: string[] };
}
