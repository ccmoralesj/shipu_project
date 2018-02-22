const logger = require('winston');
const Scrumly = require('scrumly');

const controllers = [
  async (ctx, next) => {
    ctx.checkBody('username')
      .notEmpty()
      .toString();
    ctx.checkBody('name')
      .notEmpty()
      .toString();
    ctx.checkBody('birthDate')
      .optional();

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
    const { name, username, birthDate } = ctx.request.body;
    logger.info('API: Attempting to create a new Member');
    const memberCreated = await Scrumly.Interfaces.Member.create({ name, username, birthDate });
    logger.debug(`Member created: ${memberCreated}`);
    return ctx
      .apiRes()
      .addData(memberCreated)
      .send();
  },
];

module.exports = controllers;
