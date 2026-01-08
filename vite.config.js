import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '20347d1b84da.ngrok-free.app', // frontend ngrok
      '17945223ce91.ngrok-free.app', // backend ngrok
    ],
    cors: true, // garante que CORS esteja habilitado
    headers: {
      'Access-Control-Allow-Origin': '*',
      'ngrok-skip-browser-warning': 'true',
    },
  },
});
