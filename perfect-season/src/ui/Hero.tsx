import React, { useEffect, useRef } from 'react';
import { useLayout } from '../stage';
import { reducedMotion } from './motion';

/** The arena behind the home screen's scoreboard: sweeping spotlights,
    a crowd with camera flashes, and the court in perspective. Drawn on canvas. */
export function ArenaHero({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);
  const { k } = useLayout();
  useEffect(() => {
    const c = ref.current;
    const el = box.current;
    if (!c || !el) return;
    const g = c.getContext('2d');
    if (!g) return;
    let W = 0;
    let H = 0;
    let scale = 1;
    // the floor, the crowd and the vignette don't move: draw them once into layers
    const base = document.createElement('canvas');
    const top = document.createElement('canvas');
    let seats: { x: number; y: number; r: number }[] = [];
    const flashes: { x: number; y: number; r: number; f: number }[] = [];
    const size = () => {
      W = el.clientWidth;
      H = el.clientHeight;
      if (!W || !H) return;
      scale = Math.min(3, (window.devicePixelRatio || 1) * k);
      for (const cv of [c, base, top]) {
        cv.width = Math.round(W * scale);
        cv.height = Math.round(H * scale);
      }
      g.setTransform(scale, 0, 0, scale, 0, 0);
      const b = base.getContext('2d')!;
      b.setTransform(scale, 0, 0, scale, 0, 0);
      const bg = b.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0d3240');
      bg.addColorStop(0.6, '#081f29');
      bg.addColorStop(1, '#05141b');
      b.fillStyle = bg;
      b.fillRect(0, 0, W, H);
      // court floor in perspective
      b.beginPath();
      b.moveTo(W * 0.3, H * 0.74);
      b.lineTo(W * 0.7, H * 0.74);
      b.lineTo(W * 0.98, H + 2);
      b.lineTo(W * 0.02, H + 2);
      b.closePath();
      const fl = b.createLinearGradient(0, H * 0.74, 0, H);
      fl.addColorStop(0, 'rgba(25,227,201,0.10)');
      fl.addColorStop(1, 'rgba(25,227,201,0.02)');
      b.fillStyle = fl;
      b.fill();
      b.strokeStyle = 'rgba(25,227,201,0.30)';
      b.lineWidth = 1.2;
      b.stroke();
      b.beginPath();
      b.ellipse(W / 2, H * 0.88, W * 0.11, H * 0.05, 0, 0, Math.PI * 2);
      b.stroke();
      // tiers of seats curving around the floor
      seats = [];
      for (let row = 0; row < 7; row++) {
        const y = H - 16 - row * 7.5;
        const spread = W * (0.62 + row * 0.07);
        const n = 26 + row * 6;
        for (let i = 0; i < n; i++) {
          const t = i / (n - 1) - 0.5;
          const lift = Math.pow(Math.abs(t) * 2, 2) * 18;
          const p = { x: W / 2 + t * spread * 1.15 + (Math.random() - 0.5) * 3, y: y - lift + (Math.random() - 0.5) * 2, r: 1.1 + row * 0.12 + Math.random() * 0.5 };
          seats.push(p);
          b.fillStyle = 'rgba(143,166,178,' + (0.12 + Math.random() * 0.22) + ')';
          b.beginPath();
          b.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          b.fill();
        }
      }
      const v = top.getContext('2d')!;
      v.setTransform(scale, 0, 0, scale, 0, 0);
      const vg = v.createRadialGradient(W / 2, H * 0.45, H * 0.2, W / 2, H * 0.45, W * 0.75);
      vg.addColorStop(0, 'rgba(4,18,26,0)');
      vg.addColorStop(1, 'rgba(4,18,26,0.55)');
      v.fillStyle = vg;
      v.fillRect(0, 0, W, H);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);
    let raf = 0;
    const still = reducedMotion();
    const beam = (t: number, ox: number, base0: number, speed: number, phase: number, rgb: string) => {
      const a = base0 + Math.sin(t * speed + phase) * 0.22;
      const len = H * 1.6;
      const gr = g.createLinearGradient(ox, -10, ox + Math.sin(a) * len, Math.cos(a) * len);
      gr.addColorStop(0, 'rgba(' + rgb + ',0.30)');
      gr.addColorStop(0.55, 'rgba(' + rgb + ',0.08)');
      gr.addColorStop(1, 'rgba(' + rgb + ',0)');
      g.fillStyle = gr;
      const wdt = 0.13;
      g.beginPath();
      g.moveTo(ox, -10);
      g.lineTo(ox + Math.sin(a - wdt) * len, Math.cos(a - wdt) * len);
      g.lineTo(ox + Math.sin(a + wdt) * len, Math.cos(a + wdt) * len);
      g.closePath();
      g.fill();
    };
    const draw = (now: number) => {
      const t = now / 1000;
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.globalCompositeOperation = 'source-over';
      g.drawImage(base, 0, 0);
      g.setTransform(scale, 0, 0, scale, 0, 0);
      // the odd camera flash in the crowd
      if (!still && seats.length && Math.random() < 0.35) {
        const p = seats[Math.floor(Math.random() * seats.length)];
        if (Math.random() < 0.5) flashes.push({ ...p, f: 1 });
      }
      for (let i = flashes.length - 1; i >= 0; i--) {
        const p = flashes[i];
        g.fillStyle = 'rgba(255,255,255,' + p.f + ')';
        g.beginPath();
        g.arc(p.x, p.y, p.r + p.f * 1.2, 0, Math.PI * 2);
        g.fill();
        p.f -= 0.09;
        if (p.f <= 0) flashes.splice(i, 1);
      }
      // two spotlights sweeping across the floor
      g.globalCompositeOperation = 'lighter';
      beam(t, W * 0.08, 0.55, 0.5, 0, '25,227,201');
      beam(t, W * 0.92, -0.55, 0.43, 2.1, '245,184,61');
      g.globalCompositeOperation = 'source-over';
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.drawImage(top, 0, 0);
      if (!still) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', vis);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', vis);
    };
  }, [k]);
  return (
    <div className="hero" ref={box}>
      <canvas ref={ref} aria-hidden="true" />
      {children}
    </div>
  );
}
