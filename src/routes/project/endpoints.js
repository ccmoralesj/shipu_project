const Router = require('koa-router');
const createProject = require('./controllers/createProject');
const readProject = require('./controllers/readProject');
const patchProject = require('./controllers/patchProject');
const deleteProject = require('./controllers/deleteProject');
const addToDoProject = require('./controllers/addToDoToProject');
const removeToDoProject = require('./controllers/removeToDoToProject');

const router = new Router({ prefix: '/projects' });

module.exports = () => {
  router.post('/', ...createProject);

  router.get('/:id?', ...readProject);

  router.patch('/:id', ...patchProject);

  router.patch('/:id/add-to-do', ...addToDoProject);

  router.patch('/:id/remove-to-do', ...removeToDoProject);

  router.del('/:id', ...deleteProject);

  return router;
};
