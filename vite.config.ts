import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // strictPort: port band bo'lsa boshqasiga o'tib ketmaydi (aks holda CORS buziladi)
  server: { port: 3000, strictPort: true },
})