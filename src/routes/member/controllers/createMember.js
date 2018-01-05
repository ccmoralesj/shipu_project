const logger = require('winston');
const Scrumly = require('scrumly');
const ErrorHandler = require('../../../helper/errorHandler');

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
        if (ctx.errors) ErrorHandler(ctx, ctx.errors, 400);
        else await next();
    },
    async (ctx, next) => {
        try {
            return await next();
        } catch (err) {
            ErrorHandler(ctx, err, 400);
        }
    },
    async (ctx, next) => {
        const {name, username, birthDate} = ctx.request.body;
        const memberCreated = await Scrumly.Interfaces.Member.create({name, username, birthDate});
        ctx.body = memberCreated;
    }
];
module.exports = controllers;