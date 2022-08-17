const path = require('path')

module.exports = {
  ignore: ['node_modules', 'src/database/migrations', 'src/database/seeds'],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        //root: [path.resolve(__dirname, 'src')],
        alias: {
          '@modules':  './modules',
          '@config': path.resolve(__dirname, 'dist', 'config'),
          "@domains": path.resolve(__dirname, 'dist', 'domains'),
          "@errors": path.resolve(__dirname, 'dist', 'errors'),
          "@interfaces": path.resolve(__dirname, 'dist', 'interfaces'),
          "@utils": "./utils",
          "@database": path.resolve(__dirname, 'dist', 'database'),


        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { losse: true }],
  ],
};
