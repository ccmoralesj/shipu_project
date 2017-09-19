const Router = require('koa-router');

const router = new Router({ prefix: '/members' });

module.exports = () => {
  router.post('/', (ctx, next) => {
    ctx.body = 'Hello Member';
  });

  router.get('/:id?', (ctx, next) => {
    ctx.body = 'Hello Member';
  });

  router.patch('/:id', (ctx, next) => {
    ctx.body = 'Hello Member';
  });


  router.del('/:id', (ctx, next) => {
    ctx.body = 'Hello Member';
  });

  return router;
};