const path = require('path');

const SERVER_PORT = 3232;

const SERVER_CONFIGS = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: SERVER_PORT || SERVER_PORT,
};

module.exports = SERVER_CONFIGS;