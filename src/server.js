const wlogger = require('winston');
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const koaValidate = require('koa-validate');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const compress = require('koa-compress');
const jsonp = require('koa-jsonp');
const helmet = require('koa-helmet');
const cors = require('kcors');
const serverpush = require('koa-server-push');
const routes = require('./routes');

module.exports = () => {
  const app = new Koa();
  app
    .use(serverpush())
    .use(helmet())
    .use(logger())
    .use(bodyParser())
    .use(cors({ allowMethods: 'GET,POST,PUT,PATCH,DELETE' }))
    .use(compress())
    .use(passport.initialize())
    .use(conditional())
    .use(etag())
    .use(jsonp());

  // Error Handling
  /*
  app.on('error', err => {
    wlogger.error(err);
  });
  */

  koaValidate(app);
  app.use(routes);
  const port = 3000;
  app.listen(port);
  return port;
};
