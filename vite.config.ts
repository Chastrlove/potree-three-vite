import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  optimizeDeps: {
    exclude: ['cloud.js']
  },
})
