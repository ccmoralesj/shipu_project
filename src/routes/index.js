const Router = require('koa-router');
const Boom = require('boom');
const compose = require('koa-compose');
const Auth = require('./auth');
const Task = require('./task');
const Member = require('./member');
const Project = require('./project');
const Team = require('./team');
const TeamMember = require('./teamMember');

const allowedMethods = {
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed(),
};

const app = new Router();

app.get('/', async(ctx) => {
  ctx.body = 'Hey there!';
});


app.use(Auth().routes());
app.use(Task().routes());
app.use(Member().routes());
app.use(Project().routes());
app.use(Team().routes());
app.use(TeamMember().routes());

module.exports = compose([app.routes(), app.allowedMethods(allowedMethods)]);
