module.exports = async (ctx, next) => {
  ctx.validate = (nxt) => {
    if (ctx.errors) {
      return ctx
        .apiRes()
        .badRequest()
        .error(ctx.errors)
        .send();
    }

    return nxt();
  };

  return next();
};
