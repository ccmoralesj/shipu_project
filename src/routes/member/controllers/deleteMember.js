const logger = require('winston');
const Scrumly = require('scrumly');

const controllers = [
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
    const memberDeleted = await Scrumly.Interfaces.Member.remove(id);
    logger.info(`Member deleted ${memberDeleted}`);
    return ctx
      .apiRes()
      .addData(memberDeleted)
      .send();
  },
];
module.exports = controllers;
