import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import nodeExternals from 'rollup-plugin-node-externals';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    dts({
      entryRoot: 'src',
      tsConfigFilePath: 'tsconfig.json',
      insertTypesEntry: true,
    }),
    { ...nodeExternals({ builtins: false, builtinsPrefix: 'strip', exclude: [/.css$/] }), enforce: 'pre' },],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5174,
  },
  build: {
    rollupOptions: {
      output: {
        interop: 'auto',
      },
      external: ['vue'],
    },
    sourcemap: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'swmd',
      formats: ['es', 'cjs'],
    },
  },
})
