const logger = require('winston');
const Scrumly = require('scrumly');

const controller = [
  async (ctx, next) => {
    ctx.checkParams('projectId')
      .notEmpty()
      .match(/^[0-9a-fA-F]{24}$/);
    ctx.checkParams('id')
      .notEmpty()
      .match(/^[0-9a-fA-F]{24}$/);
    ctx.checkBody('name')
      .optional()
      .notEmpty();
    ctx.checkBody('color')
      .optional()
      .notEmpty();
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
    const { name, color } = ctx.request.body;
    // TODO Add interfaces for role control of this action
    const teamUpdated = await Scrumly.Interfaces.Team.update({ id, name, color });
    logger.info(`Team updated ${teamUpdated}`);
    return ctx
      .apiRes()
      .addData(teamUpdated)
      .send();
  },
];

module.exports = controller;
