/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// Rollup plugins

import json from 'rollup-plugin-json';
import typescript from "rollup-plugin-typescript";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";
// import babel from 'rollup-plugin-babel';
import terser from "rollup-plugin-terser";
import path from 'path'

const pathResolve = p => path.resolve(__dirname, p)

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    json(),
    typescript(),
    nodeResolve(),
    commonjs({
      extensions: ['.js', '.ts'],
      include: 'node_modules/**'
    }),
    alias({
      '@': pathResolve('src')
    }),
    // babel({
    //   exclude: 'node_modules/**'
    // }),
    terser({
      compress: {
        pure_funcs: ['console.log'] // 去掉console.log函数
      }
    })
  ],
  external: (id) => /node_modules/.test(id)
}
