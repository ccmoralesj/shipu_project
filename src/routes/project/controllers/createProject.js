const logger = require('winston');
const Scrumly = require('scrumly');

const controller = [
  async (ctx, next) => {
    ctx.checkBody('creatorId')
      .notEmpty()
      .match(/^[0-9a-fA-F]{24}$/);
    ctx.checkBody('name')
      .notEmpty();
    ctx.checkBody('description')
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
    const { name, description, creatorId } = ctx.request.body;
    const projectCreated =
      await Scrumly.Interfaces.Project.create({ name, description, creatorId });
    logger.info(`Project created ${projectCreated}`);
    return ctx
      .apiRes()
      .addData(projectCreated)
      .send();
  },
];

module.exports = controller;
