import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.scss'),
      name: 'NovaCSS',
      formats: ['es'],
      fileName: () => 'nova.css'
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'nova.css';
          return assetInfo.name || 'nova.css';
        }
      }
    },
    emptyOutDir: true,
    cssCodeSplit: false
  }
});


