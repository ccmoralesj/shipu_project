const Scrumly = require('scrumly');
const logger = require('winston');

const controllers = [
  async (ctx, next) => {
    ctx.checkBody('name')
      .optional()
      .notEmpty()
      .toString();
    ctx.checkBody('birthDate')
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
    const { name, birthDate } = ctx.request.body;
    const memberUpdated = await Scrumly.Interfaces.Member.update({ id, name, birthDate });
    logger.info(`Member updated ${memberUpdated}`);
    return ctx
      .apiRes()
      .addData(memberUpdated)
      .send();
  },
];
module.exports = controllers;
