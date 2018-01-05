const logger = require('winston');
const Scrumly = require('scrumly');
const ErrorHandler = require('../../../helper/errorHandler');

const controller = [
    async (ctx, next) => {
        ctx.checkParams('id')
            .optional()
            .empty()
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
    async (ctx, next) => {
        const { id } = ctx.params;
        if (!id) return await next();
        const memberFound = await Scrumly.Interfaces.Member.readById(id);
        logger.info(`Particular Member found ${memberFound}`);
        ctx.body = memberFound;
    },
    async (ctx) => {
        const membersFound = await Scrumly.Interfaces.Member.read();
        logger.info(`Members found ${membersFound}`);
        ctx.body = membersFound;
    },
];

module.exports = controller;