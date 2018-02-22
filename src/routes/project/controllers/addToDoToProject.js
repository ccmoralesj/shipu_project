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
    const { toDos } = ctx.request.body;
    const projectUpdated = await Scrumly.Interfaces.Project.addToDo({ projectId: id, toDos });
    logger.info(`ToDos added ${projectUpdated.toDo}`);
    return ctx
      .apiRes()
      .addData(projectUpdated)
      .send();
  },
];

module.exports = controller;
