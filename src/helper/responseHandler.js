const errors = require('../errors');

const respondeCodes = {
  STATUS_CODES: Object.setPrototypeOf({
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    408: 'Request Time-out',
    409: 'Conflict',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Time-out',
  }, null),
};

class ResponseCreator {
  constructor(ctx) {
    this.ctx = ctx;
    this.errors = [];
    this.data = {};
  }

  status(code = 200) {
    this.code = code;
    return this;
  }

  addData(data = {}) {
    this.data = data;
    return this;
  }

  unauthorized() {
    this.code = 401;
    this.errors.push(errors.UNAUTHORIZED);
    return this;
  }

  badRequest() {
    this.code = 400;
    return this;
  }

  error(error) {
    this.errors.push((error && error.message) ? error.message : error);
    return this;
  }

  send() {
    const status = this.code || 200;
    this.ctx.status = status;

    const body = {
      meta: {
        status,
        responseName: respondeCodes.STATUS_CODES[status] || 'Unknown',
      },
      data: this.data,
    };

    if (this.errors.length) {
      body.errors = this.errors;
      delete body.data;
    }

    this.ctx.body = body;

    return this;
  }
}

module.exports = (ctx, next) => {
  ctx.apiRes = () => new ResponseCreator(ctx);

  return next();
};
