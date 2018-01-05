const Router = require('koa-router');
const createTeam = require('./controllers/createTeam');
const readTeam = require('./controllers/readTeam');
const patchTeam = require('./controllers/patchTeam');
const deleteTeam = require('./controllers/deleteTeam');
const addToDoTeam = require('./controllers/addToDoToTeam');
const removeToDoTeam = require('./controllers/removeToDoToTeam');

const router = new Router({ prefix: '/teams' });

module.exports = () => {
  router.post('/', ...createTeam);

  router.get('/:id?', ...readTeam);

  router.patch('/:id', ...patchTeam);

  router.patch('/:id/add-to-do', ...addToDoTeam);

  router.patch('/:id/remove-to-do', ...removeToDoTeam);

  router.del('/:id', ...deleteTeam);

  return router;
};