const logger = require('winston');
const Scrumly = require('scrumly');
const ErrorHandler = require('../../../helper/errorHandler');

const controller = [
    async (ctx, next) => {
        ctx.checkParams('teamId')
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
        const { teamId } = ctx.params;
        const teamMembersFound = await Scrumly.Interfaces.TeamMember.readTeamMembersByTeamId(teamId);
        logger.info(`Members of a Team found ${teamMembersFound}`);
        ctx.body = teamMembersFound;
    }
];

module.exports = controller;