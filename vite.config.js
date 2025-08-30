import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: false,
    fs: {
      allow: ['..'],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
})