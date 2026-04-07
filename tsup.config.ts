import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    clean: true,
    format: ['esm', 'cjs'],
    minify: false,
    dts: {
      compilerOptions: {
        ignoreDeprecations: '6.0',
      },
    },
    outDir: './dist',
  },
]);
