const logger = require('winston');
const Scrumly = require('scrumly');
const ErrorHandler = require('../../../helper/errorHandler');

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
            ErrorHandler(ctx,err,400);
        }
    },
    async (ctx) => {
        const { id } = ctx.params;
        const { notes } = ctx.request.body;
        const taskUpdated = await Scrumly.Interfaces.Task.removeNotes({ taskId: id, notes });
        logger.info(`Notes removed: ${notes}`);
        ctx.body = taskUpdated;
    },
];

module.exports = controller;