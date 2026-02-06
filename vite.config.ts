import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          codemirror: [
            '@codemirror/view',
            '@codemirror/state',
            '@codemirror/language',
            '@codemirror/commands',
            '@codemirror/lang-markdown',
          ],
          markdown: ['react-markdown', 'remark-gfm', 'rehype-highlight'],
        },
      },
    },
  },
})
