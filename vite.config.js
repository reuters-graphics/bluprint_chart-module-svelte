import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { mdsvex } from 'mdsvex';
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG = fs.readJsonSync(path.join(dirname, 'package.json'));
const PROD = process.env.NODE_ENV === 'production';
const DOCS = !!process.env.DOCS;

const scss = {
  includePaths: ['src/', 'node_modules/bootstrap/scss/'],
  importer: [
    (url) => {
      // Redirect tilde-prefixed imports to node_modules
      if (/^~/.test(url)) {
        return { file: `node_modules/${url.replace('~', '')}` };
      }
      return null;
    },
  ],
  quietDeps: true,
};

// https://vitejs.dev/config/
export default defineConfig({
  base: PROD ? PKG.homepage : '/',
  build: {
    outDir: DOCS ? 'docs' : 'dist/',
    lib: DOCS
      ? null
      : {
          entry: path.resolve(dirname, 'src/js/index.js'),
          formats: ['es'],
          fileName: () => 'index.js',
        },
    rollupOptions: {
      external: DOCS ? [] : Object.keys(PKG.dependencies),
    },
  },
  css: {
    preprocessorOptions: { scss },
  },
  plugins: [
    dsv(),
    svelte({
      extensions: ['.svelte', '.svx'],
      preprocess: [
        sveltePreprocess({
          preserve: ['ld+json'],
          scss,
          postcss: {
            plugins: [autoprefixer],
          },
        }),
        mdsvex(),
      ],
    }),
  ],
});
