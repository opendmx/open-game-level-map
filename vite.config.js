import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/game-level-map.js',
      name: 'GameLevelMap',
      fileName: 'game-level-map',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  server: {
    open: '/demo/index.html'
  }
});