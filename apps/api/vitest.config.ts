import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    environment: 'node',
    coverage: {
      provider: 'v8',
      exclude: [
        'src/main.ts',
        'src/prisma/prisma.service.ts',
        'src/**/*.module.ts',
        'src/**/*.guard.ts',
        'src/**/*.dto.ts',
      ],
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
