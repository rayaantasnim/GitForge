import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
          core: path.resolve(import.meta.dirname, 'core.html'),
          facilities: path.resolve(import.meta.dirname, 'facilities.html'),
          technology: path.resolve(import.meta.dirname, 'technology.html'),
          release: path.resolve(import.meta.dirname, 'release.html'),
          contributor: path.resolve(import.meta.dirname, 'contributor.html'),
          architecture: path.resolve(import.meta.dirname, 'architecture.html'),
          ecosystem: path.resolve(import.meta.dirname, 'ecosystem.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
