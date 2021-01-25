const {
  version,
  appName,
  startTime,
  hostname
} = require('../config');


const { ApiResponse, ApiError } = require('./models');

const health = (req, res) => {
  res.send({
    available: true,
    app: appName,
    uptime: process.uptime(),
    serverId: `${hostname} ${process.pid}`,
    hostname,
    version,
    startTime
  });
};

const globalErrorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  const apiResponse = new ApiResponse(
    {
      status: statusCode,
      errors: [message]
    }
  );
  return res.status(statusCode).json(apiResponse);
};

const endPointNotDefined = (req, res, next) => {
  throw new ApiError(404, 'End point not defined');
  next();
}

module.exports = {
  health,
  globalErrorHandler,
  endPointNotDefined
};