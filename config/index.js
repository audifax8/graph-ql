const os = require('os');
const dotenv = require('dotenv');

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

module.exports = {
  version: require("../package.json").version,
  serverLogFormat: 'combined',
  serverPort: process.env.APP_PORT || 3000,
  graphQLPort: process.env.GRAPH_QL_APP_PORT || 4000,
  serverHost: process.env.NODE_HOST || '0.0.0.0',
  env: process.env.NODE_ENV || 'dev',
  appName: 'aow-api',
  hostname: os.hostname(),
  startTime: new Date().toISOString()
}
