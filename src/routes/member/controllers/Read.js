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
    const members = await Scrumly.Interfaces.Member.read();
    ctx.body = members;
  }
];
module.exports = controllers;