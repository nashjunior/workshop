// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';



export default {
  input: 'dist/server.js',
  output: {
    exports: 'auto',
    dir: 'build/app',
    format: 'cjs',
    globals: {
      '/var/app/build/config/elastic': 'apm'
    }
  },
  external: ['fastify', 'dotenv', 'reflect-metadata', 'typeorm', 'tsyringe', 'yup', 'path', 'uuid', 'elastic-apm-node','@fastify/cors'],
  plugins: [
    commonjs({exclude: 'node_modules'}),
    resolve({extensions:['.js', '.ts']}),
    // terser()
  ],

};
