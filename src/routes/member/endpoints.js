const Router = require('koa-router');
const CreateMember = require('./controllers/Create');
const ReadMember = require('./controllers/Read');
const UpdateMember = require('./controllers/Update');
const DeleteMember = require('./controllers/Delete');

const router = new Router({ prefix: '/members' });

module.exports = () => {
  router.post('/', ...CreateMember);

  router.get('/:id?', ...ReadMember);

  router.patch('/:id', ...UpdateMember);

  router.del('/:id', ...DeleteMember);

  return router;
};