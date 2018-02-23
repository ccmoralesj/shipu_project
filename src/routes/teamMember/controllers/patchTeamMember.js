const logger = require('winston');
const Scrumly = require('scrumly');

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
    const { id } = ctx.params;
    const { role, teamId } = ctx.request.body;
    // TODO Add interfaces for role control of this action
    const teamMemberUpdated = await Scrumly.Interfaces.TeamMember.update({ id, role, teamId });
    logger.info(`Team Member updated ${teamMemberUpdated}`);
    return ctx
      .apiRes()
      .addData(teamMemberUpdated)
      .send();
  },
];

module.exports = controller;
