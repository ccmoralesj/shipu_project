const Router = require('koa-router');

const router = new Router({ prefix: '/teams' });

module.exports = () => {
  router.post('/', (ctx, next) => {
    ctx.body = 'Hello Team';
  });

  router.get('/:id?', (ctx, next) => {
    ctx.body = 'Hello Team';
  });

  router.patch('/:id', (ctx, next) => {
    ctx.body = 'Hello Team';
  });


  router.del('/:id', (ctx, next) => {
    ctx.body = 'Hello Team';
  });

  return router;
};