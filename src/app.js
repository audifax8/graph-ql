const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {
  health,
  globalErrorHandler,
  endPointNotDefined
} = require('./middlewares');

const {
  serverLogFormat,
  serverPort,
  serverHost,
  appName
} = require('../config');

const { intentRouter, boardRouter } = require('./router');

const getServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan(serverLogFormat));

  app.get('/_health', health);
  app.use('/intent', intentRouter);
  app.use('/board', boardRouter);
  app.get('*', endPointNotDefined);
  app.use(globalErrorHandler);

  return app;
}

const app = getServer();
app.server = app.listen(serverPort, serverHost, err => {
  console.log(`${appName} running on port: http://${serverHost + ':' + serverPort}`);
  // Tell neught2 that the server is now up and running
  if (!err && process.send) {
    process.send('online');
  }
});

module.exports = app;