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
    const memberFound = await Scrumly.Interfaces.Member.readById(id);
    logger.info(`Particular Member found ${memberFound}`);
    return ctx
      .apiRes()
      .addData(memberFound)
      .send();
  },
  async (ctx) => {
    const membersFound = await Scrumly.Interfaces.Member.read();
    logger.info(`Members found ${membersFound}`);
    return ctx
      .apiRes()
      .addData(membersFound)
      .send();
  },
];

module.exports = controller;
