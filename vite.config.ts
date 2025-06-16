import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Point to backend
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});