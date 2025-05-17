import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path-browserify'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'), // ✅ 절대 경로 매핑
    },
  }
}) 