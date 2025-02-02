import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173, // Change if needed
    proxy: {
      '/api': {
        target: 'http://localhost:7156', // Match backend port
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
})
