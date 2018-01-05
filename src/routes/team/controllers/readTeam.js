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
        const teamFound = await Scrumly.Interfaces.Team.readById(id);
        logger.info(`Particular Team found ${teamFound}`);
        ctx.body = teamFound;
    },
    async (ctx) => {
        const teamsFound = await Scrumly.Interfaces.Team.read();
        logger.info(`Teams found ${teamsFound}`);
        ctx.body = teamsFound;
    },
];

module.exports = controller;