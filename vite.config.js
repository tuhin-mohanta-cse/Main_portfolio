import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
  build: {
    target: 'es2019',
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Keep vendor code in its own long-cacheable chunks
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
