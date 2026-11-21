// All sound is synthesized with WebAudio: no audio files to download.
// Unlocks on the first user gesture (iOS requirement).

type Sfx =
  | 'tap' | 'open' | 'close' | 'notify' | 'unlock' | 'error' | 'pin' | 'unpin'
  | 'scan' | 'recovered' | 'key' | 'type' | 'stinger' | 'success' | 'fail' | 'page' | 'handler';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private ambBus: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private ambNodes: AudioNode[] = [];
  private voices = 0;
  muted = false;
  musicOn = true;

  constructor() {
    try {
      this.muted = localStorage.getItem('cs.muted') === '1';
      this.musicOn = localStorage.getItem('cs.music') !== '0';
    } catch { /* private mode */ }
  }

  unlock(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.8;
    this.master.connect(this.ctx.destination);
    this.sfxBus = this.ctx.createGain();
    this.sfxBus.gain.value = 0.9;
    this.sfxBus.connect(this.master);
    this.ambBus = this.ctx.createGain();
    this.ambBus.gain.value = 0;
    this.ambBus.connect(this.master);
    const len = this.ctx.sampleRate * 2;
    this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }

  setMuted(m: boolean): void {
    this.muted = m;
    try { localStorage.setItem('cs.muted', m ? '1' : '0'); } catch { /* ignore */ }
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.8, this.ctx.currentTime, 0.05);
    if (m) speechSynthesis?.cancel();
  }

  setMusic(on: boolean): void {
    this.musicOn = on;
    try { localStorage.setItem('cs.music', on ? '1' : '0'); } catch { /* ignore */ }
    if (on) this.ambient(this.ambMood); else this.stopAmbient();
  }

  private tone(freq: number, dur: number, type: OscillatorType, vol: number, at = 0, slideTo?: number): void {
    const c = this.ctx, bus = this.sfxBus;
    if (!c || !bus || this.voices > 22) return;
    const t = c.currentTime + at;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(bus);
    this.voices++;
    o.onended = () => { this.voices--; };
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  private noise(dur: number, vol: number, freq: number, q = 1, at = 0, type: BiquadFilterType = 'bandpass', sweepTo?: number): void {
    const c = this.ctx, bus = this.sfxBus;
    if (!c || !bus || !this.noiseBuf || this.voices > 22) return;
    const t = c.currentTime + at;
    const s = c.createBufferSource();
    s.buffer = this.noiseBuf;
    const f = c.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
    f.Q.value = q;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.02, dur / 3));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(bus);
    this.voices++;
    s.onended = () => { this.voices--; };
    s.start(t, Math.random() * 1.5);
    s.stop(t + dur + 0.02);
  }

  play(s: Sfx): void {
    if (!this.ctx || this.muted) return;
    const v = 1 + (Math.random() - 0.5) * 0.08; // pitch variation
    switch (s) {
      case 'tap': this.tone(1900 * v, 0.03, 'sine', 0.05); this.noise(0.015, 0.04, 4000, 2); break;
      case 'key': this.tone(880 * v, 0.07, 'triangle', 0.08); this.noise(0.02, 0.03, 3000, 2); break;
      case 'type': this.noise(0.025, 0.05, 2600 * v, 3); break;
      case 'open': this.noise(0.22, 0.06, 600, 0.8, 0, 'bandpass', 2400); this.tone(420 * v, 0.12, 'sine', 0.04, 0, 640); break;
      case 'close': this.noise(0.18, 0.05, 2200, 0.8, 0, 'bandpass', 500); break;
      case 'page': this.noise(0.12, 0.05, 1500, 0.7, 0, 'bandpass', 3500); break;
      case 'notify': this.tone(1046 * v, 0.25, 'sine', 0.09); this.tone(1568 * v, 0.4, 'sine', 0.07, 0.09); break;
      case 'handler': this.tone(660 * v, 0.12, 'square', 0.025); this.tone(990 * v, 0.2, 'square', 0.02, 0.1); this.noise(0.15, 0.03, 5000, 1, 0, 'highpass'); break;
      case 'unlock': [523, 659, 784, 1046].forEach((f, i) => this.tone(f * v, 0.3, 'sine', 0.07, i * 0.06)); this.noise(0.3, 0.03, 6000, 1, 0, 'highpass'); break;
      case 'error': this.tone(140, 0.12, 'sawtooth', 0.06); this.tone(120, 0.14, 'sawtooth', 0.06, 0.14); break;
      case 'pin': this.tone(180 * v, 0.12, 'sine', 0.14, 0, 70); this.noise(0.08, 0.08, 1200, 1); this.tone(1320 * v, 0.18, 'triangle', 0.03, 0.06); break;
      case 'unpin': this.noise(0.1, 0.06, 900, 1); break;
      case 'scan': for (let i = 0; i < 5; i++) this.tone((1200 + Math.random() * 1600), 0.04, 'square', 0.015, i * 0.05); break;
      case 'recovered': [784, 988, 1175, 1568].forEach((f, i) => this.tone(f, 0.35, 'triangle', 0.06, i * 0.07)); break;
      case 'stinger': this.tone(55, 1.6, 'sawtooth', 0.07, 0, 48); this.tone(110 * 1.06, 1.4, 'sine', 0.05); this.noise(1.2, 0.05, 300, 4, 0, 'bandpass', 120); break;
      case 'success': [392, 494, 587, 784, 988].forEach((f, i) => this.tone(f, 0.9, 'sine', 0.07, i * 0.11)); break;
      case 'fail': [330, 311, 262].forEach((f, i) => this.tone(f, 0.6, 'triangle', 0.07, i * 0.22)); break;
    }
  }

  private ambMood: 'menu' | 'case' | 'tense' = 'menu';
  private beatTimer = 0;
  private bpm = 0;
  private showerNodes: AudioNode[] = [];

  /** Heartbeat loop (Caught mode). bpm 0 stops it. */
  heartbeat(bpm: number): void {
    this.bpm = bpm;
    if (!bpm) { clearTimeout(this.beatTimer); this.beatTimer = 0; return; }
    if (this.beatTimer) return;
    const beat = () => {
      if (!this.bpm) return;
      if (this.ctx && !this.muted && this.musicOn) {
        this.tone(58, 0.16, 'sine', 0.22, 0, 40);
        this.tone(52, 0.14, 'sine', 0.15, 0.17, 38);
      }
      this.beatTimer = window.setTimeout(beat, 60000 / this.bpm);
    };
    beat();
  }

  /** Running-shower wash behind the investigation. */
  shower(on: boolean): void {
    const c = this.ctx, bus = this.ambBus;
    for (const n of this.showerNodes) { try { (n as AudioScheduledSourceNode).stop?.(); } catch { /* stopped */ } n.disconnect(); }
    this.showerNodes = [];
    if (!on || !c || !bus || !this.noiseBuf) return;
    const s = c.createBufferSource();
    s.buffer = this.noiseBuf; s.loop = true;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2400; f.Q.value = 0.4;
    const g = c.createGain(); g.gain.value = 0.06;
    s.connect(f).connect(g).connect(bus);
    s.start();
    this.showerNodes = [s, f, g];
  }

  door(): void {
    if (!this.ctx || this.muted) return;
    this.noise(0.25, 0.12, 300, 2, 0, 'lowpass');
    this.tone(90, 0.3, 'square', 0.05, 0.05, 60);
    this.noise(0.12, 0.08, 1800, 3, 0.3);
  }

  /** Generative ambient bed: low drone + sea-like filtered noise. */
  ambient(mood: 'menu' | 'case' | 'tense'): void {
    this.ambMood = mood;
    const c = this.ctx, bus = this.ambBus;
    if (!c || !bus || !this.noiseBuf) return;
    this.stopAmbient(true);
    if (!this.musicOn) return;
    const t = c.currentTime;
    const root = mood === 'tense' ? 41.2 : mood === 'case' ? 49 : 55;
    const freqs = mood === 'tense' ? [root, root * 1.06, root * 2.01] : [root, root * 1.5, root * 2, root * 3.01];
    for (const f of freqs) {
      const o = c.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      const lfo = c.createOscillator();
      lfo.frequency.value = 0.05 + Math.random() * 0.08;
      const lg = c.createGain();
      lg.gain.value = f * 0.004;
      lfo.connect(lg).connect(o.frequency);
      const g = c.createGain();
      g.gain.value = 0.05 / freqs.length * (f < 100 ? 2 : 1);
      o.connect(g).connect(bus);
      o.start(); lfo.start();
      this.ambNodes.push(o, lfo, g);
    }
    // sea / static wash
    const s = c.createBufferSource();
    s.buffer = this.noiseBuf;
    s.loop = true;
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 420;
    const wash = c.createGain();
    wash.gain.value = 0.035;
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.09;
    const lg = c.createGain();
    lg.gain.value = 0.03;
    lfo.connect(lg).connect(wash.gain);
    s.connect(f).connect(wash).connect(bus);
    s.start(); lfo.start();
    this.ambNodes.push(s, lfo, wash, f);
    bus.gain.cancelScheduledValues(t);
    bus.gain.setValueAtTime(0, t);
    bus.gain.linearRampToValueAtTime(mood === 'tense' ? 0.9 : 0.7, t + 3);
  }

  stopAmbient(immediate = false): void {
    const c = this.ctx;
    if (!c) return;
    const nodes = this.ambNodes;
    this.ambNodes = [];
    const stopAt = c.currentTime + (immediate ? 0.05 : 1.2);
    for (const n of nodes) {
      if (n instanceof AudioScheduledSourceNode) { try { n.stop(stopAt); } catch { /* already stopped */ } }
    }
    setTimeout(() => nodes.forEach((n) => n.disconnect()), immediate ? 100 : 1400);
  }

  // ---- voicemail speech ----
  private pickVoice(female: boolean): SpeechSynthesisVoice | undefined {
    const all = speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
    if (!all.length) return undefined;
    const fem = /female|samantha|victoria|karen|moira|tessa|zira|susan|serena|fiona|allison|ava|jenny|aria/i;
    const mal = /male|daniel|alex|fred|david|mark|guy|tom|oliver|arthur|aaron|rishi/i;
    return all.find((v) => (female ? fem : mal).test(v.name) && !(female ? mal : fem).test(v.name)) ?? all[0];
  }

  speak(text: string, voice: { pitch: number; rate: number; female: boolean }, onWord: (charIndex: number) => void, onEnd: () => void): () => void {
    const clean = text.replace(/\[[^\]]*\]/g, ' ').replace(/—/g, ', ');
    let done = false;
    let fallbackTimer = 0;
    const finish = () => { if (!done) { done = true; clearInterval(fallbackTimer); onEnd(); } };
    if (this.muted || typeof speechSynthesis === 'undefined') {
      // Read-along without audio.
      let i = 0;
      fallbackTimer = window.setInterval(() => {
        i += 6;
        onWord(i);
        if (i >= text.length) finish();
      }, 90);
      return () => { clearInterval(fallbackTimer); done = true; };
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.pitch = voice.pitch;
    u.rate = voice.rate;
    u.volume = 1;
    const v = this.pickVoice(voice.female);
    if (v) u.voice = v;
    // map clean-text char index back to original roughly (lengths are similar)
    const ratio = text.length / Math.max(1, clean.length);
    let gotBoundary = false;
    u.onboundary = (e) => { gotBoundary = true; onWord(Math.round(e.charIndex * ratio)); };
    u.onend = () => { onWord(text.length); finish(); };
    u.onerror = () => finish();
    speechSynthesis.speak(u);
    // Some engines never fire boundary events: advance by estimate.
    const start = performance.now();
    const cps = 14 * voice.rate;
    fallbackTimer = window.setInterval(() => {
      if (!gotBoundary) onWord(Math.round(((performance.now() - start) / 1000) * cps));
    }, 120);
    return () => { done = true; clearInterval(fallbackTimer); speechSynthesis.cancel(); };
  }
}

export const audio = new AudioEngine();
