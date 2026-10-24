import type { RunRecord } from './profile';

export function shareText(r: RunRecord, dailyNo: number | null): string {
  const head = r.mode === 'daily' && dailyNo ? 'Perfect Season Daily #' + dailyNo : 'Perfect Season';
  const rec = r.wins + '–' + (82 - r.wins);
  const names = r.lineup.map((p) => lastName(p.name)).join(' · ');
  return head + ' · ' + rec + ' · ' + r.grade + ' ' + r.tier + '\n' + r.playoff + '\n' + names + '\nCan you go perfect?';
}

export function lastName(n: string): string {
  const parts = n.replace(/\s*\([^)]*\)\s*$/, '').split(' ');
  return parts[parts.length - 1];
}

/** Draws the share image (1080x1350) and returns it as a PNG data URL. */
export function drawCard(r: RunRecord, colors: Record<string, string>, dailyNo: number | null): string | null {
  try {
    const W = 1080;
    const H = 1350;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const g = c.getContext('2d');
    if (!g) return null;
    const bg = g.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0f3a44');
    bg.addColorStop(1, '#04121a');
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(25,227,201,0.15)';
    g.lineWidth = 6;
    g.beginPath();
    g.arc(W / 2, H + 120, 520, 0, Math.PI * 2);
    g.stroke();
    g.beginPath();
    g.arc(W / 2, H + 120, 220, 0, Math.PI * 2);
    g.stroke();
    const disp = (size: number) => 'italic 900 ' + size + "px 'Archivo', 'Arial Narrow', sans-serif";
    g.fillStyle = '#19E3C9';
    g.font = disp(64);
    g.fillText('PERFECT SEASON', 72, 130);
    g.fillStyle = '#8FA6B2';
    g.font = "700 34px 'Archivo', sans-serif";
    const tag = r.mode === 'daily' && dailyNo ? 'DAILY #' + dailyNo : r.mode === '1v1' ? '1 VS 1' : r.mode.toUpperCase();
    g.fillText(tag, 72, 186);
    g.fillStyle = '#F2F6F7';
    g.font = disp(300);
    g.fillText(r.wins + '–' + (82 - r.wins), 60, 480);
    g.fillStyle = gradeColor(r.grade);
    g.font = disp(80);
    g.fillText(r.grade + '  ' + r.tier.toUpperCase(), 72, 590);
    g.fillStyle = r.title ? '#F5B83D' : '#F2F6F7';
    g.font = "700 38px 'Archivo', sans-serif";
    wrap(g, r.playoff, 72, 660, W - 144, 48);
    let y = 740;
    for (const p of r.lineup) {
      g.fillStyle = colors[p.abbr + p.era] ?? '#0A1F2A';
      roundRect(g, 72, y, W - 144, 90, 18);
      g.fill();
      g.fillStyle = 'rgba(4,18,26,0.35)';
      roundRect(g, 72, y, W - 144, 90, 18);
      g.fill();
      g.fillStyle = '#FFFFFF';
      g.font = disp(50);
      g.fillText(p.slot, 100, y + 64);
      g.font = "800 40px 'Archivo', sans-serif";
      g.fillText(p.name + (p.primed ? ' ★' : ''), 210, y + 62);
      g.font = "700 30px 'Archivo', sans-serif";
      g.textAlign = 'right';
      g.fillText(p.abbr + ' ’' + p.era.slice(2), W - 100, y + 60);
      g.textAlign = 'left';
      y += 100;
    }
    g.fillStyle = '#8FA6B2';
    g.font = "700 30px 'Archivo', sans-serif";
    g.fillText('Can you go 82–0, then 16–0?', 72, H - 40);
    return c.toDataURL('image/png');
  } catch {
    return null;
  }
}

function gradeColor(letter: string): string {
  if (letter.startsWith('S')) return '#F5B83D';
  if (letter.startsWith('A')) return '#19E3C9';
  if (letter === 'B') return '#6CB4FF';
  if (letter === 'C') return '#F2A33A';
  if (letter === 'D') return '#A3B1BC';
  return '#FF7A7A';
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function wrap(g: CanvasRenderingContext2D, text: string, x: number, y: number, max: number, lh: number) {
  const words = text.split(' ');
  let line = '';
  for (const w of words) {
    const t = line ? line + ' ' + w : w;
    if (g.measureText(t).width > max && line) {
      g.fillText(line, x, y);
      line = w;
      y += lh;
    } else line = t;
  }
  if (line) g.fillText(line, x, y);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Native share sheet when the browser allows it (it is blocked inside some embeds). */
export async function nativeShare(text: string, dataUrl: string | null): Promise<boolean> {
  try {
    if (!navigator.share) return false;
    const data: ShareData = { text };
    if (dataUrl && navigator.canShare) {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'perfect-season.png', { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) data.files = [file];
    }
    await navigator.share(data);
    return true;
  } catch {
    return false;
  }
}
