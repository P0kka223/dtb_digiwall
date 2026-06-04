import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
   server: {
    proxy: {
      '/api': {
        target: 'https://comic-penknife-retiree.ngrok-free.dev',
        changeOrigin: true,
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      }
    }
  }
})