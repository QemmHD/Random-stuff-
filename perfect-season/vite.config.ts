import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `vite build` makes a normal static site (for Vercel).
// `vite build --mode artifact` makes one self-contained page that loads React
// from cdnjs (the artifact host only allows scripts from a few CDNs).
export default defineConfig(({ mode }) => {
  const artifact = mode === 'artifact';
  return {
    base: './',
    plugins: [react({ jsxRuntime: 'classic' }), ...(artifact ? [viteSingleFile()] : [])],
    test: { globals: true, environment: 'node' },
    build: artifact
      ? {
          outDir: 'dist-artifact',
          rollupOptions: {
            external: ['react', 'react-dom', 'react-dom/client'],
            output: { format: 'iife', globals: { react: 'React', 'react-dom': 'ReactDOM', 'react-dom/client': 'ReactDOM' } },
          },
        }
      : { outDir: 'dist' },
  };
});
