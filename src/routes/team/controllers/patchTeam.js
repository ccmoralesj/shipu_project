const logger = require('winston');
const Scrumly = require('scrumly');
const ErrorHandler = require('../../../helper/errorHandler');

const controller = [
    async (ctx, next) => {
        ctx.checkParams('id')
            .notEmpty()
            .match(/^[0-9a-fA-F]{24}$/);
        ctx.checkBody('name')
            .optional()
            .notEmpty();
        ctx.checkBody('color')
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
        const { id } = ctx.params;
        const { name, color } = ctx.request.body;
        const teamUpdated = await Scrumly.Interfaces.Team.update({ id, name, color});
        logger.info(`Team updated ${teamUpdated}`);
        ctx.body = teamUpdated;
    },
];

module.exports = controller;