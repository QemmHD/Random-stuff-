// Owner-supplied images for the Hidden album, loaded from public/hidden/.
// manifest.json: { "<caseId>" | "*": [{ "file": "pic.jpg", "place"?: "...", "t"?: "YYYY-MM-DDTHH:MM" }] }
import { registerUrl } from './art';
import type { Photo } from './types';

interface Entry { file: string; place?: string; t?: string }
let manifest: Record<string, Entry[]> = {};

export async function loadExtraPhotos(): Promise<void> {
  try {
    const res = await fetch('hidden/manifest.json', { cache: 'no-cache' });
    if (!res.ok) return;
    const data = (await res.json()) as Record<string, unknown>;
    for (const [k, v] of Object.entries(data)) if (Array.isArray(v)) manifest[k] = v as Entry[];
  } catch { manifest = {}; }
}

export function extraHiddenPhotos(caseId: string, fallbackT: string): Photo[] {
  const list = [...(manifest['*'] ?? []), ...(manifest[caseId] ?? [])];
  return list.filter((e) => e && typeof e.file === 'string' && /^[\w.\- ]+\.(jpe?g|png|webp|gif)$/i.test(e.file)).map((e) => {
    const id = `x_${e.file}`;
    registerUrl(id, `hidden/${encodeURIComponent(e.file)}`);
    return { id, art: id, t: e.t ?? fallbackT, place: e.place ?? 'Hidden', orientation: 'portrait', hidden: true };
  });
}
