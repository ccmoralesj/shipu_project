const logger = require('winston');
const Scrumly = require('scrumly');

const controllers = [
  async (ctx,next) => {
    try {
      await next();
    } catch (e){
      throw new Error(e);
    }
  },
  async (ctx, next) => {
    ctx.checkBody('username')
      .notEmpty()
      .toString();
    ctx.checkBody('name')
      .notEmpty()
      .toString();
    ctx.checkBody('birthDate')
      .optional();
    if (ctx.errors) throw new Error(ctx.errors);
    await next();
  },
  async (ctx, next) => {
    logger.info(ctx.request.body);
    const { name, username, birthDate } = ctx.request.body;
    const memberCreated = await Scrumly.Interfaces.Member.create({ name, username, birthDate });
    ctx.body = memberCreated;
  }
];
module.exports = controllers;