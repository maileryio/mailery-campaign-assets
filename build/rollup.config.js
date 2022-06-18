import copy from 'rollup-plugin-copy';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { eslint } from 'rollup-plugin-eslint';
import sassPostcss from 'rollup-plugin-sass-postcss';
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
      'bootstrap-vue': 'BootstrapVue',
      'vue': 'Vue',
      'vuex': 'Vuex'
    },
    sourcemap: true
  },
  external: [
    'bootstrap-vue',
    'vue',
    'vuex'
  ],
  plugins: [
    eslint(),
    commonjs(),
    resolve(),
    copy({
      targets: [
        { src: 'src/images/**/*', dest: 'dist/images' }
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    sassPostcss({
      output: 'dist/main.min.css',
      sourcemap: true,
      plugins: [
        autoprefixer()
      ]
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    json(),
    buble({
      objectAssign: 'Object.assign'
    }),
    isProd && (await import('rollup-plugin-terser')).terser()
  ]
}))();
