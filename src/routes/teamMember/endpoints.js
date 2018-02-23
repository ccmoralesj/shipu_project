const Router = require('koa-router');
const createTeamMember = require('./controllers/createTeamMember');
const readTeamMember = require('./controllers/readTeamMember');
const patchTeamMember = require('./controllers/patchTeamMember');
const deleteTeamMember = require('./controllers/deleteTeamMember');
const readTeamMemberByTeamId = require('./controllers/readTeamMemberByTeamId');

const router = new Router({ prefix: '/team-members' });

module.exports = () => {
  router.post('/', ...createTeamMember);

  router.get('/:id?', ...readTeamMember);

  router.patch('/:id', ...patchTeamMember);

  router.get('/:teamId/by-team', ...readTeamMemberByTeamId);

  router.del('/:id', ...deleteTeamMember);

  return router;
};
