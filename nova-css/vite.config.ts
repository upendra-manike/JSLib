import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.scss'),
      name: 'RudraCSS',
      formats: ['es'],
      fileName: () => 'rudra.css'
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'rudra.css';
          return assetInfo.name || 'rudra.css';
        }
      }
    },
    emptyOutDir: true,
    cssCodeSplit: false
  }
});


