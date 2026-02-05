import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'edb35e65bd88.ngrok-free.app', // tambahkan host ngrok di sini
    ],
  },
})