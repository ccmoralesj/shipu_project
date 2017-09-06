const Koa = require('koa');
const logger = require('winston');
const Start = require('./server');

const port = Start();

logger.info( `App running on port: ${port}`);
