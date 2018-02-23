const logger = require('winston');
const Scrumly = require('scrumly');
const errors = require('../../../errors');

const controller = [
  async (ctx, next) => {
    ctx.checkParams('projectId')
      .notEmpty()
      .match(/^[0-9a-fA-F]{24}$/);
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
    const { projectId, id } = ctx.params;
    const { creatorId } = ctx.request.body;
    const isCreator = await Scrumly.Interfaces.Project.isCreator({
      projectId,
      possibleCreatorId: creatorId,
    });
    if (!isCreator) throw new Error(errors.MUST_BE_PROJECT_CREATOR);
    const teamDeleted = await Scrumly.Interfaces.Team.remove(id);
    logger.info(`Team deleted ${teamDeleted}`);
    return ctx
      .apiRes()
      .addData(teamDeleted)
      .send();
  },
];

module.exports = controller;
