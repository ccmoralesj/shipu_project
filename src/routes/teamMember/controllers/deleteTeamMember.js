const logger = require('winston');
const Scrumly = require('scrumly');

const controller = [
  async (ctx, next) => {
    ctx.checkParams('id')
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
    // TODO Add interfaces for role control of this action
    const teamMemberDeleted = await Scrumly.Interfaces.TeamMember.remove(id);
    logger.info(`Team Member deleted ${teamMemberDeleted}`);
    return ctx
      .apiRes()
      .addData(teamMemberDeleted)
      .send();
  },
];

module.exports = controller;
