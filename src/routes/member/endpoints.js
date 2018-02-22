const Router = require('koa-router');
const CreateMember = require('./controllers/createMember');
const ReadMember = require('./controllers/readMember');
const UpdateMember = require('./controllers/updateMember');
const DeleteMember = require('./controllers/deleteMember');

const router = new Router({ prefix: '/members' });

module.exports = () => {
  router.post('/', ...CreateMember);

  router.get('/:id?', ...ReadMember);

  router.patch('/:id', ...UpdateMember);

  router.del('/:id', ...DeleteMember);

  return router;
};