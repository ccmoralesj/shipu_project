const Router = require('koa-router');

const router = new Router({prefix: '/team-members'});

module.exports = () => {
    router.post('/', ...createTeam);

    router.get('/:id?', ...readTeam);

    router.patch('/:id', ...patchTeam);

    router.patch('/:id/add-to-do', ...addToDoTeam);

    router.patch('/:id/remove-to-do', ...removeToDoTeam);

    router.del('/:id', ...deleteTeam);

    return router;
};