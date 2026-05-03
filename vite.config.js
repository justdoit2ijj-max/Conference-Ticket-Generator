import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'docs',  // Changes output from 'dist' to 'docs'
    emptyOutDir: true, // Cleans the docs folder before each build
  },
})