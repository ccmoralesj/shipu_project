const Router = require('koa-router');

const router = new Router({ prefix: '/team-members' });

module.exports = () => {
  router.post('/', (ctx, next) => {
    ctx.body = 'Hello Team Member';
  });

  router.get('/:id?', (ctx, next) => {
    ctx.body = 'Hello Team Member';
  });

  router.patch('/:id', (ctx, next) => {
    ctx.body = 'Hello Team Member';
  });


  router.del('/:id', (ctx, next) => {
    ctx.body = 'Hello Team Member';
  });

  return router;
};