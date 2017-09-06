const Router = require('koa-router');
const Boom = require('boom');
const compose = require('koa-compose');
// import auth from './auth';

const allowedMethods = {
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed(),
};

const app = new Router();

app.get('/', async(ctx) => {
  ctx.body = 'Hey there!';
});


//  app.use(auth().routes());

module.exports = compose([app.routes(), app.allowedMethods(allowedMethods)]);
