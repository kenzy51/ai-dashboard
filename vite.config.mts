import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import path from 'path';

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.NEXT_PUBLIC_SERVER_URL': JSON.stringify('https://fusion-ai-bot.onrender.com'),
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
 build: {
    cssCodeSplit: false, // 💡 Keep this false
    lib: {
      entry: path.resolve(__dirname, 'app/widget/embed.tsx'),
      name: 'FusionChat',
      fileName: () => 'sarah-widget.js',
      formats: ['iife'],
    },
    outDir: 'public/dist',
  },
});