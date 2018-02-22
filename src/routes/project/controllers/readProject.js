const logger = require('winston');
const Scrumly = require('scrumly');

const controller = [
  async (ctx, next) => {
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
    const projectFound = await Scrumly.Interfaces.Project.readById(id);
    logger.info(`Particular Project found ${projectFound}`);
    return ctx
      .apiRes()
      .addData(projectFound)
      .send();
  },
  async (ctx) => {
    const projectsFound = await Scrumly.Interfaces.Project.read();
    logger.info(`Projects found ${projectsFound}`);
    return ctx
      .apiRes()
      .addData(projectsFound)
      .send();
  },
];

module.exports = controller;
