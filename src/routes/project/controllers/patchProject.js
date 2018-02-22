const logger = require('winston');
const Scrumly = require('scrumly');

const controller = [
  async (ctx, next) => {
    ctx.checkParams('id')
      .notEmpty()
      .match(/^[0-9a-fA-F]{24}$/);
    ctx.checkBody('name')
      .optional()
      .notEmpty();
    ctx.checkBody('description')
      .optional()
      .notEmpty();
    ctx.checkBody('finished')
      .optional()
      .notEmpty()
      .toBoolean();
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
    const { name, description, finished } = ctx.request.body;
    const projectUpdated =
      await Scrumly.Interfaces.Project.update({ id, name, description, finished });
    logger.info(`Project updated ${projectUpdated}`);
    return ctx
      .apiRes()
      .addData(projectUpdated)
      .send();
  },
];

module.exports = controller;
