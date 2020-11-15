module.exports = {
  scripts: {
    'sapper': 'sapper',
    'rollup': 'rollup',
    'serve': 'serve',
  },
  tasks: {
    start: {
      run: [
        ['echo', ['Getting started...']],
        ['sapper', ['dev'], {
          routes: 'server/pages',
          src: 'server',
          output: 'server/node_modules/@sapper',
          o: true,
        }],
      ],
    },
    'build-docs': {
      run: [
        ['echo', ['Building docs...']],
        ['sapper', ['export'], {
          routes: 'server/pages',
          src: 'server',
          output: 'server/node_modules/@sapper',
          static: 'server/static',
          basepath: 'chart-module-my-chart-module'
        }],
        ['cp', ['-R', '__sapper__/export/chart-module-my-chart-module/', 'docs/']],
        ['echo', ['run "$ runner preview" to preview your built docs']]
      ],
    },
    'build-pack': {
      run: [
        ['echo', ['Building package...']],
        ['rollup', { c: 'rollup.config.lib.js' }],
      ],
    },
    preview: {
      run: [
        ['open', ['http://localhost:5000/docs/']],
        ['serve', ['./']],
      ],
    },
    build: {
      run: [
        'build-pack',
        'build-docs',
      ],
    },
  },
  help: {
    '-- MAIN TASKS -- ': '',
    'start': 'Develop your chart project',
    'build': 'Build your chart library and interactive docs',
    'preview': 'Preview built files',
  },
}