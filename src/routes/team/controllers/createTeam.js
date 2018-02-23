const logger = require('winston');
const Scrumly = require('scrumly');

const controller = [
  async (ctx, next) => {
    ctx.checkParams('projectId')
      .notEmpty()
      .match(/^[0-9a-fA-F]{24}$/);
    ctx.checkBody('name')
      .notEmpty();
    ctx.checkBody('color')
      .optional();
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
    const { name, color } = ctx.request.body;
    const { projectId } = ctx.params;
    const teamCreated = await Scrumly.Interfaces.Team.create({ projectId, name, color });
    logger.info(`Team created ${teamCreated}`);
    return ctx
      .apiRes()
      .addData(teamCreated)
      .send();
  },
];

module.exports = controller;
