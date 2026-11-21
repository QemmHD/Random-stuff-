import { defineConfig } from 'vite';
export default defineConfig({
  base: process.env.CS_BASE ?? './',
  build: { target: 'es2020', assetsInlineLimit: 0, chunkSizeWarningLimit: 900 },
});
