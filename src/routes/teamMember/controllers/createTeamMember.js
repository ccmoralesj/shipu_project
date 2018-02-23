const logger = require('winston');
const Scrumly = require('scrumly');

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
    return ctx.validate(next);
  },
  async (ctx, next) => {
    try {
      return await next();
    } catch (err) {
      return ctx
        .apiRes()
        .badRequest()
        .error(err)
        .send();
    }
  },
  async (ctx) => {
    const { role, memberId, teamId } = ctx.request.body;
    const teamMemberCreated =
      await Scrumly.Interfaces.TeamMember.create({ role, memberId, teamId });
    logger.info(`TeamMember created ${teamMemberCreated}`);
    return ctx
      .apiRes()
      .addData(teamMemberCreated)
      .send();
  },
];

module.exports = controller;
