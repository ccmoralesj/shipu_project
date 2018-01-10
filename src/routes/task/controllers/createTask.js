const logger = require('winston');
const Scrumly = require('scrumly');
const ErrorHandler = require('../../../helper/errorHandler');

const controller = [
    async (ctx, next) => {
        ctx.checkBody('description')
            .notEmpty()
            .toString();
        ctx.checkBody('teamId')
            .notEmpty()
            .match(/^[0-9a-fA-F]{24}$/);
        ctx.checkBody('teamMemberId')
            .notEmpty()
            .match(/^[0-9a-fA-F]{24}$/);
        ctx.checkBody('notes')
            .optional()
            .notEmpty();
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
        const { description, teamId, teamMemberId, notes } = ctx.request.body;
        const taskCreated = await Scrumly.Interfaces.Task.create({ description, teamId, teamMemberId, notes });
        logger.info( `Task created ${taskCreated}`);
        ctx.body = taskCreated;
    },
];

module.exports = controller;