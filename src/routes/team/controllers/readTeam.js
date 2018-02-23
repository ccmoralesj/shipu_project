const logger = require('winston');
const Scrumly = require('scrumly');

const controller = [
  async (ctx, next) => {
    ctx.checkParams('projectId')
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
    const { projectId, id } = ctx.params;
    if (!id) return await next();
    const teamFound = (await Scrumly.Interfaces.Team.read({ _project: projectId, _id: id }))[0];
    logger.info(`Particular Team found ${teamFound}`);
    return ctx
      .apiRes()
      .addData(teamFound)
      .send();
  },
  async (ctx) => {
    const { projectId } = ctx.params;
    const teamsFound = await Scrumly.Interfaces.Team.read({ _project: projectId });
    logger.info(`Teams found ${teamsFound}`);
    return ctx
      .apiRes()
      .addData(teamsFound)
      .send();
  },
];

module.exports = controller;
