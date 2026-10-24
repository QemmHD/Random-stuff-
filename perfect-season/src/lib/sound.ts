/* Synthesized sound effects (Web Audio) and vibration. No audio files needed.
   Audio starts on the first tap, as browsers require. */

let ctx: AudioContext | null = null;
let soundOn = true;
let hapticsOn = true;

export function setFeedback(sound: boolean, haptics: boolean) {
  soundOn = sound;
  hapticsOn = haptics;
}

function ac(): AudioContext | null {
  if (!soundOn) return null;
  try {
    if (!ctx) {
      const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!C) return null;
      ctx = new C();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, dur: number, opts: { type?: OscillatorType; gain?: number; at?: number; slide?: number } = {}) {
  const c = ac();
  if (!c) return;
  const t0 = c.currentTime + (opts.at ?? 0);
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = opts.type ?? 'sine';
  o.frequency.setValueAtTime(freq, t0);
  if (opts.slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * opts.slide), t0 + dur);
  const peak = opts.gain ?? 0.15;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.02);
}

function noise(dur: number, opts: { gain?: number; at?: number; freq?: number } = {}) {
  const c = ac();
  if (!c) return;
  const t0 = c.currentTime + (opts.at ?? 0);
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = 'bandpass';
  f.frequency.value = opts.freq ?? 1200;
  const g = c.createGain();
  g.gain.value = opts.gain ?? 0.12;
  src.connect(f).connect(g).connect(c.destination);
  src.start(t0);
}

export function vibrate(pattern: number | number[]) {
  if (!hapticsOn) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // not supported
  }
}

export const sfx = {
  click: () => tone(660, 0.05, { type: 'triangle', gain: 0.06 }),
  spinStart: () => {
    noise(0.25, { gain: 0.08, freq: 900 });
    tone(220, 0.25, { type: 'sawtooth', gain: 0.03, slide: 2.2 });
  },
  tick: () => tone(1400, 0.025, { type: 'square', gain: 0.025 }),
  stop: () => {
    tone(140, 0.12, { type: 'triangle', gain: 0.22, slide: 0.6 });
    noise(0.06, { gain: 0.06, freq: 2500 });
    vibrate(12);
  },
  select: () => tone(880, 0.06, { type: 'triangle', gain: 0.08 }),
  place: () => {
    tone(196, 0.16, { type: 'sine', gain: 0.25, slide: 0.7 });
    tone(1046, 0.08, { type: 'triangle', gain: 0.06, at: 0.02 });
    vibrate(18);
  },
  nope: () => tone(180, 0.12, { type: 'square', gain: 0.05 }),
  coin: () => {
    tone(1318, 0.08, { type: 'square', gain: 0.05 });
    tone(1760, 0.14, { type: 'square', gain: 0.05, at: 0.07 });
  },
  tickerWin: () => tone(990, 0.03, { type: 'triangle', gain: 0.03 }),
  tickerLoss: () => tone(330, 0.03, { type: 'triangle', gain: 0.03 }),
  gameWin: () => tone(784, 0.1, { type: 'triangle', gain: 0.09 }),
  gameLoss: () => tone(220, 0.14, { type: 'sawtooth', gain: 0.05 }),
  seriesWin: () => {
    [523, 659, 784].forEach((f, i) => tone(f, 0.16, { type: 'triangle', gain: 0.1, at: i * 0.09 }));
    vibrate([20, 40, 20]);
  },
  seriesLoss: () => {
    [392, 330, 262].forEach((f, i) => tone(f, 0.22, { type: 'sawtooth', gain: 0.05, at: i * 0.12 }));
    vibrate(60);
  },
  result: (letter: string) => {
    const big = letter.startsWith('S');
    const good = big || letter.startsWith('A') || letter === 'B';
    const notes = big ? [523, 659, 784, 1046, 1318] : good ? [523, 659, 784, 1046] : letter === 'F' ? [330, 294, 262] : [440, 523, 659];
    notes.forEach((f, i) => tone(f, big ? 0.3 : 0.2, { type: 'triangle', gain: 0.11, at: i * 0.1 }));
    vibrate(big ? [30, 50, 30, 50, 60] : good ? [30, 40, 30] : 40);
  },
  levelUp: () => {
    [659, 784, 988, 1318].forEach((f, i) => tone(f, 0.14, { type: 'square', gain: 0.05, at: i * 0.08 }));
    vibrate([20, 30, 20]);
  },
  title: () => {
    [523, 659, 784, 1046, 784, 1046, 1318].forEach((f, i) => tone(f, 0.22, { type: 'triangle', gain: 0.12, at: i * 0.11 }));
    vibrate([40, 60, 40, 60, 120]);
  },
};
