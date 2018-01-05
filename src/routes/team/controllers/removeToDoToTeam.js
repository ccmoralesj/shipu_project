const logger = require('winston');
const Scrumly = require('scrumly');

const controller = [
    async (ctx, next) => {
        ctx.checkParams('id')
            .notEmpty()
            .match(/^[0-9a-fA-F]{24}$/);
        if (ctx.errors) ErrorHandler(ctx, ctx.errors, 400);
        else await next();
    },
    async(ctx, next) => {
        try {
            return await next();
        } catch (err) {
            logger.error(err);
            ErrorHandler(ctx,err,400);
        }
    },
    async (ctx) => {
        const { id } = ctx.params;
        const { toDos } = ctx.request.body;
        const teamUpdated = await Scrumly.Interfaces.Team.removeToDo({ teamId: id, toDos });
        logger.info(`ToDos removed ${toDos}`);
        ctx.body = teamUpdated;
    },
];

module.exports = controller;