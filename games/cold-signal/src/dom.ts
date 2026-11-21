// Tiny DOM helpers. No framework: screens build elements directly.
type Child = Node | string | number | false | null | undefined | Child[];
type Attrs = Record<string, unknown> & { class?: string; style?: string };

export function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs?: Attrs | null, ...children: Child[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v === undefined || v === null || v === false) continue;
      if (k.startsWith('on') && typeof v === 'function') {
        el.addEventListener(k.slice(2).toLowerCase(), v as EventListener);
      } else if (k === 'html') {
        el.innerHTML = String(v);
      } else if (k === 'dataset' && typeof v === 'object') {
        Object.assign(el.dataset, v);
      } else {
        el.setAttribute(k, v === true ? '' : String(v));
      }
    }
  }
  append(el, children);
  return el;
}

function append(el: Node, children: Child[]): void {
  for (const c of children) {
    if (c === null || c === undefined || c === false) continue;
    if (Array.isArray(c)) append(el, c);
    else el.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
  }
}

export function clear(el: Element): void {
  while (el.firstChild) el.removeChild(el.firstChild);
}

export function raf(): Promise<void> {
  return new Promise((r) => requestAnimationFrame(() => r()));
}

export function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export function vibrate(pattern: number | number[]): void {
  try {
    if (localStorage.getItem('cs.haptics') === '0') return;
    navigator.vibrate?.(pattern);
  } catch { /* unsupported */ }
}
