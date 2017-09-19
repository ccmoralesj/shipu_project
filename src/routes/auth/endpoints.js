const Router = require('koa-router');

const router = new Router({ prefix: '/auth' });

module.exports = () => {
  router.get('/', (ctx, next) => {
    ctx.body = 'Hello Auth';
  });

  return router;
};