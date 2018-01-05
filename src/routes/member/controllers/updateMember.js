const Scrumly = require('scrumly');
const logger = require('winston');
const ErrorHandler = require('../../../helper/errorHandler');

const controllers = [
    async (ctx, next) => {
        ctx.checkBody('name')
            .optional()
            .notEmpty()
            .toString();
        ctx.checkBody('birthDate')
            .optional()
            .notEmpty();
        if (ctx.errors) ErrorHandler(ctx, ctx.errors, 400);
        else await next();
    },
    async (ctx, next) => {
        try {
            return await next();
        } catch (err) {
            ErrorHandler(ctx, err, 400);
        }
    },
    async (ctx, next) => {
        const { id } = ctx.params;
        const { name, birthDate } = ctx.request.body;
        const memberUpdated = await Scrumly.Interfaces.Member.update({ id, name, birthDate });
        logger.info(`Member updated ${memberUpdated}`);
        ctx.body = memberUpdated;
    }
];
module.exports = controllers;