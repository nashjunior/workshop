// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'dist/server.js',
  watch:{
    skipWrite: false,
    clearScreen: false,
    include: 'dist/**/*',
  },
  output: {
    exports: 'auto',
    dir: 'build/app',
    format: 'cjs',
  },
  external: ['fastify', 'dotenv', 'reflect-metadata', 'typeorm', 'tsyringe', 'yup', 'path', 'uuid'],
  plugins: [
    commonjs({exclude: 'node_modules'}),
    resolve({extensions:['.js', '.ts'],}),
    terser()
  ],

};
