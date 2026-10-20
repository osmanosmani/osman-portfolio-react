import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Vite minifies the final CSS after the legacy layer has been normalized.
  plugins: [react(), tailwindcss({ optimize: false })],
  css: {
    postcss: {
      plugins: [{
        postcssPlugin: 'strip-redundant-charset',
        // Bootstrap is imported inside the legacy layer; the bundle is already UTF-8.
        AtRule: { charset: (rule) => rule.remove() },
      }],
    },
  },
})
