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
        const teamMemberFound = await Scrumly.Interfaces.TeamMember.readById(id);
        logger.info(`Particular Team Member found ${teamMemberFound}`);
        ctx.body = teamMemberFound;
    },
    async (ctx) => {
        const teamMembersFound = await Scrumly.Interfaces.TeamMember.read();
        logger.info(`Team Members found ${teamMembersFound}`);
        ctx.body = teamMembersFound;
    },
];

module.exports = controller;