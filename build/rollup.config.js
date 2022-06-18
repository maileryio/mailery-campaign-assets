import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { eslint } from 'rollup-plugin-eslint';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import autoprefixer from 'autoprefixer';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

export default (async () => ({
  input: 'src/index.js',
  output: {
    name: 'mailery.campaign',
    exports: 'named',
    globals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'bootstrap-vue': 'BootstrapVue'
    },
    sourcemap: true
  },
  external: [
    'vue',
    'vuex',
    'bootstrap-vue'
  ],
  plugins: [
    eslint(),
    commonjs(),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    postcss({
      use: ['sass'],
      minimize: isProd,
      sourceMap: true,
      plugins: [
        autoprefixer()
      ],
      extract: 'dist/main.min.css'
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    json(),
    buble({
      objectAssign: 'Object.assign'
    }),
    copy({
      targets: [
        { src: 'src/images/**/*', dest: 'dist/images' }
      ]
    }),
    isProd && (await import('rollup-plugin-terser')).terser()
  ]
}))();
