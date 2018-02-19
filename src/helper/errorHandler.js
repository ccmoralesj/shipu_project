
module.exports = (ctx, error, status) => {
  ctx.status = error.status || status || 500;
  const errorResponse = {};
  errorResponse.status = error.status || 500;
  errorResponse.message = error.message || error;
  ctx.body = errorResponse;
  ctx.app.emit('error', error, ctx);
};
