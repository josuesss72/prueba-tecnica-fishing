// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from '@vite-pwa/astro'
import react from '@astrojs/react'; 

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), AstroPWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Galactic Fishing Leaderboard',
      short_name: 'Fishing Game',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: 'icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api-game\.bloque\.app\/game\/(leaderboard|market)$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
          }
        }
      ]
    }
  })], 
  env: {
    schema: {
      API_HOST: envField.string({
        context: "client",
        access: "public",
      })
    }
  }
});
