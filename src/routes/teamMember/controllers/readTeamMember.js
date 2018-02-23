const logger = require('winston');
const Scrumly = require('scrumly');

const controller = [
  async (ctx, next) => {
    ctx.checkQuery('teamId')
      .optional()
      .notEmpty()
      .match(/^[0-9a-fA-F]{24}$/);
    ctx.checkParams('id')
      .optional()
      .empty()
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
  async (ctx, next) => {
    const { id } = ctx.params;
    if (!id) return await next();
    const teamMemberFound = await Scrumly.Interfaces.TeamMember.readById(id);
    logger.info(`Particular Team Member found ${teamMemberFound}`);
    return ctx
      .apiRes()
      .addData(teamMemberFound)
      .send();
  },
  async (ctx) => {
    const { teamId } = ctx.request.query;
    // TODO this search should be by projectID, this means bring all teammembers in the project
    const teamMembersFound = await Scrumly.Interfaces.TeamMember.read({ _team: teamId });
    logger.info(`Team Members found ${teamMembersFound}`);
    return ctx
      .apiRes()
      .addData(teamMembersFound)
      .send();
  },
];

module.exports = controller;
