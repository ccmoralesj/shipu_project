const logger = require('winston');
const Scrumly = require('scrumly');
const ErrorHandler = require('../../../helper/errorHandler');

const controller = [
    async (ctx, next) => {
        ctx.checkBody('role')
            .notEmpty()
            .toString();
        ctx.checkBody('memberId')
            .notEmpty()
            .match(/^[0-9a-fA-F]{24}$/);
        ctx.checkBody('teamId')
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
        const { role, memberId, teamId } = ctx.request.body;
        const teamMemberCreated = await Scrumly.Interfaces.TeamMember.create({ role, memberId, teamId });
        logger.info( `TeamMember created ${teamMemberCreated}`);
        ctx.body = teamMemberCreated;
    },
];

module.exports = controller;