const Router = require('koa-router');

const router = new Router({ prefix: '/daily-scrum' });

module.exports = () => {
  router.post('/', (ctx, next) => {
    ctx.body = 'Hello Daily Scrum';
  });

  router.get('/:id?', (ctx, next) => {
    ctx.body = 'Hello Daily Scrum';
  });

  router.patch('/:id', (ctx, next) => {
    ctx.body = 'Hello Daily Scrum';
  });


  router.del('/:id', (ctx, next) => {
    ctx.body = 'Hello Daily Scrum';
  });

  return router;
};