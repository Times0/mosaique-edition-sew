import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'draggable-vendor': ['react-draggable'],
          'state-vendor': ['zustand'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-draggable', 'zustand', 'lucide-react'],
  },
  server: {
    open: true,
    hmr: {
      overlay: true,
    },
  },
});
