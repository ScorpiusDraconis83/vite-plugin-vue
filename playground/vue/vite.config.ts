import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { vueI18nPlugin } from './CustomBlockPlugin'

export default defineConfig({
  resolve: {
    alias: {
      '/@': __dirname,
      '@': __dirname,
      '#external': resolve(__dirname, '../vue-external'),
      '/#external': resolve(__dirname, '../vue-external'),
    },
  },
  plugins: [
    vuePlugin({
      script: {
        globalTypeFiles: [resolve(__dirname, 'HmrCircularReferenceFile.d.ts')],
      },
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('my-'),
        },
      },
    }),
    vueI18nPlugin,
  ],
  build: {
    // to make tests faster
    minify: false,
    assetsInlineLimit: 100, // keep SVG as assets URL
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
