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

    await next();
  },
  async (ctx, next) => {
    const { name, username, birthDate } = ctx.request.body;
    const memberCreated = await Scrumly.Interfaces.Member.create({ name, username, birthDate });
    ctx.body = memberCreated;
  }
];
module.exports = controllers;