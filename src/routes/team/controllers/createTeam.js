const logger = require('winston');
const Scrumly = require('scrumly');
const ErrorHandler = require('../../../helper/errorHandler');

const controller = [
    async (ctx, next) => {
        ctx.checkBody('name')
            .notEmpty();
        ctx.checkBody('color')
            .notEmpty();
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
        const { name, color } = ctx.request.body;
        const teamCreated = await Scrumly.Interfaces.Team.create({ name, color });
        logger.info( `Team created ${teamCreated}`);
        ctx.body = teamCreated;
    },
];

module.exports = controller;