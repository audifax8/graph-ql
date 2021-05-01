const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

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

const {
  intentRouter,
  boardRouter,
  heroRouter
} = require('./router');

const getServer = () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan(serverLogFormat));

  app.get('/_health', health);
  app.use('/intent', intentRouter);
  app.use('/board', boardRouter);
  app.use('/hero', heroRouter);
  app.get('*', endPointNotDefined);
  app.use(globalErrorHandler);

  return app;
}

const app = getServer();
app.server = app.listen(serverPort, serverHost, err => {
  console.log(`${appName} running on port: http://${serverHost + ':' + serverPort}`);
  if (!err && process.send) {
    process.send('online');
  }
});

module.exports = app;