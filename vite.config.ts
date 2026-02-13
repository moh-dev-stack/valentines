import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Valentine Hearts',
        short_name: 'Valentines',
        description: 'A cute Valentine\'s animation with floating hearts',
        theme_color: '#f472b6',
        background_color: '#fdf2f8',
        display: 'standalone',
        orientation: 'portrait',
      },
    }),
  ],
})
