const logger = require('winston');
const Scrumly = require('scrumly');

const controller = [
  async (ctx, next) => {
    ctx.checkParams('teamId')
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
    const { teamId } = ctx.params;
    const teamMembersFound = await Scrumly.Interfaces.TeamMember.readTeamMembersByTeamId(teamId);
    logger.info(`Members of a Team found ${teamMembersFound}`);
    return ctx
      .apiRes()
      .addData(teamMembersFound)
      .send();
  },
];

module.exports = controller;
