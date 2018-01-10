const Router = require('koa-router');
const createTask = require('./controllers/createTask');
const readTask = require('./controllers/readTask');
const patchTask = require('./controllers/patchTask');
const deleteTask = require('./controllers/deleteTask');
const addNoteTask = require('./controllers/addNoteToTask');
const removeNoteTask = require('./controllers/removeNoteToTask');

const router = new Router({ prefix: '/task' });

module.exports = () => {
    router.post('/', ...createTask);

    router.get('/:id?', ...readTask);

    router.patch('/:id', ...patchTask);

    router.patch('/:id/add-note', ...addNoteTask);

    router.patch('/:id/remove-note', ...removeNoteTask);

    router.del('/:id', ...deleteTask);

    return router;
};