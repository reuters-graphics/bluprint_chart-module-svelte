const sveltePreprocess = require('svelte-preprocess');

const preprocess = sveltePreprocess({
  scss: {
    includePaths: ['src/'],
    importer: [
      // Handle tilde-prefixed imports
      (url) => ({ file: `node_modules/${url.replace('~', '')}` }),
    ],
  },
  postcss: {
    plugins: [require('autoprefixer')],
  },
});

module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: '/dist',
  },
  plugins: [
    ['@snowpack/plugin-svelte', {
      preprocess,
      hmrOptions: {
        optimistic: false,
      },
    }],
  ],
  devOptions: {
    port: 3000,
    open: 'brave',
  },
  buildOptions: {
    out: 'docs',
    baseUrl: '/chart-module-my-chart-module/',
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
};
