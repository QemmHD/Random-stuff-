// Builds dist-artifact/perfect-season.html: one page for the claude.ai artifact host.
// The host wraps the page in its own <html>/<head>/<body> and only allows scripts
// from a few CDNs, so React is loaded from cdnjs and everything else is inlined.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

execSync('npx vite build --mode artifact', { stdio: 'inherit' });
const html = readFileSync('dist-artifact/index.html', 'utf8');
const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
const js = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).filter((s) => s.trim()).join('\n');
if (!css || !js) throw new Error('could not find inlined css/js');
if (js.includes('</script')) throw new Error('bundle contains a closing script tag');
const page = `<title>Perfect Season</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,400..900;1,62..125,400..900&display=swap">
<style>
${css}
</style>
<div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>
${js}
</script>
`;
writeFileSync('dist-artifact/perfect-season.html', page);
console.log('wrote dist-artifact/perfect-season.html', Math.round(page.length / 1024) + ' KB');
