const logger = require('winston');
const Scrumly = require('scrumly');
const errors = require('../../../errors');

const controller = [
  async (ctx, next) => {
    ctx.checkParams('id')
      .notEmpty()
      .match(/^[0-9a-fA-F]{24}$/);
    ctx.checkBody('creatorId')
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
    const { creatorId } = ctx.request.body;
    const isCreator = await Scrumly.Interfaces.Project.isCreator({
      projectId: id,
      possibleCreatorId: creatorId,
    });
    if (!isCreator) throw new Error(errors.MUST_BE_PROJECT_CREATOR);
    const projectDeleted = await Scrumly.Interfaces.Project.remove(id);
    logger.info(`Project deleted ${projectDeleted}`);
    return ctx
      .apiRes()
      .addData(projectDeleted)
      .send();
  },
];

module.exports = controller;
