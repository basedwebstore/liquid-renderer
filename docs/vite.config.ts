import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  build: {
    outDir: path.resolve(__dirname, '../docs-dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@liquid-src': path.resolve(__dirname, '../src'),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
  },
});
