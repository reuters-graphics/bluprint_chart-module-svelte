import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import path from 'path';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';

const babelOpts = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: [
    ['@babel/preset-env', { modules: false }],
  ],
  plugins: [
    '@babel/proposal-class-properties',
  ],
};

const plugins = [
  json(),
  alias({
    resolve: ['.js'],
  }),
  babel(babelOpts),
  resolve({
    preferBuiltins: true,
    extensions: ['.js'],
    modulesOnly: true,
  }),
];

export default {
  input: path.resolve(process.cwd(), 'src/js/index.js'),
  output: {
    file: path.resolve(process.cwd(), 'dist/index.js'),
    format: 'es',
  },
  external: Object.keys(pkg.dependencies),
  plugins,
};
