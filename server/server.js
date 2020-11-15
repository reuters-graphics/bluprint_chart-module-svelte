import * as sapper from '@sapper/server';

import compression from 'compression';
import polka from 'polka';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

if (dev) {
  polka()
    .use(
      compression({ threshold: 0 }),
      sirv('server/static', { dev }),
      sapper.middleware()
    )
    .listen(PORT, err => {
      if (err) console.log('error', err);
    });
} else {
  polka()
    .use(
      '/docs',
      compression({ threshold: 0 }),
      sirv('server/static', { dev }),
      sapper.middleware()
    )
    .listen(PORT, err => {
      if (err) console.log('error', err);
    });
}
