const logger = require('winston');
const Scrumly = require('scrumly');
const ErrorHandler = require('../../../helper/errorHandler');

const controller = [
    async (ctx, next) => {
      ctx.checkParams('id')
        .notEmpty()
        .match(/^[0-9a-fA-F]{24}$/);
        ctx.checkBody('role')
            .optional()
            .notEmpty()
            .toString();
        ctx.checkBody('teamId')
            .optional()
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
        const { role, teamId } = ctx.request.body;
        const teamMemberUpdated = await Scrumly.Interfaces.TeamMember.update({ id, role, teamId });
        logger.info(`Team Member updated ${teamMemberUpdated}`);
        ctx.body = teamMemberUpdated;
    },
];

module.exports = controller;