module.exports = {
  scripts: {
    'snowpack': 'snowpack',
    'rollup': 'rollup',
  },
  tasks: {
    start: {
      run: [
        ['echo', ['⚙️ Getting started...']],
        ['snowpack', ['dev']],
      ],
    },
    'build-docs': {
      run: [
        ['echo', ['⚙️ Building docs...']],
        ['snowpack', ['build']],
      ],
    },
    'build-lib': {
      run: [
        ['echo', ['⚙️ Building library...']],
        ['rollup', { c: 'rollup.config.lib.js' }],
      ],
    },
    build: {
      run: [
        'lint',
        'build-lib',
        'build-docs',
        ['echo', ['🏁 All done. Push to GitHub and use your chart!']],
      ],
    },
  },
  help: {
    '-- MAIN TASKS -- ': '',
    'start': 'Develop your chart project',
    'build': 'Build your chart library and interactive docs',
  },
}