const logger = require('winston');
const Scrumly = require('scrumly');
const ErrorHandler = require('../../../helper/errorHandler');

const controllers = [
    async (ctx, next) => {
        ctx.checkParams('id')
            .notEmpty()
            .match(/^[0-9a-fA-F]{24}$/);
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
    async (ctx) => {
        const {id} = ctx.params;
        const memberDeleted = await Scrumly.Interfaces.Member.remove(id);
        logger.info(`Member deleted ${memberDeleted}`);
        ctx.body = memberDeleted;
    }
];
module.exports = controllers;