import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['source/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
  },
});
