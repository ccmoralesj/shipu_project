const logger = require('winston');
const Scrumly = require('scrumly');
const errorHandler = require('../../../helper/errorHandler');
const dateQueryBuilder = require('../../../helper/dateQueryBuilder');

const controller = [
  async (ctx, next) => {
    ctx.checkParams('id')
      .optional()
      .empty()
      .match(/^[0-9a-fA-F]{24}$/);
    ctx.checkQuery('since')
      .optional()
      .notEmpty()
      .toInt();
    ctx.checkQuery('until')
      .optional()
      .notEmpty()
      .toInt();
    ctx.checkQuery('doneTasks')
      .optional()
      .notEmpty()
      .toBoolean();
    if (ctx.errors) errorHandler(ctx, ctx.errors, 400);
    else await next();
  },
  async (ctx, next) => {
    try {
      return await next();
    } catch (err) {
      errorHandler(ctx, err, 400);
    }
  },
  async (ctx, next) => {
    const { id } = ctx.params;
    if (!id) return await next();
    const taskFound = await Scrumly.Interfaces.Task.readById(id);
    logger.info(`Particular Task found ${taskFound}`);
    ctx.body = taskFound;
  },
  async (ctx) => {
    const { since, until, doneTasks } = ctx.params;
    const queryBuild = dateQueryBuilder(since, until);
    const query = {};
    if (Object.keys(queryBuild).length !== 0) {
      query.createdAt = queryBuild;
    }
    if (doneTasks === true) query.finishDate = { $exists: doneTasks };
    else if (doneTasks === false) query.finishDate = { $exists: doneTasks };
    const tasksFound = await Scrumly.Interfaces.Task.read(query);
    logger.info(`Tasks found ${tasksFound}`);
    ctx.body = tasksFound;
  },
];

module.exports = controller;