const { v4: uuidv4 } = require('uuid');

class BaseModel {
  constructor(params) {
    if (!params) {
      return undefined;
    }
    Object.keys(params).forEach(param => {
      this[param] = params[param];
    });
  }
}

class Board extends BaseModel {
  constructor(params) {
    super(params);
  }
};

class Intent extends BaseModel {
  constructor(params) {
    super(params);
    if(!this.id) {
      this.id = uuidv4();
    }
    this.isCompleted = false;
  }
};

class ApiResponse extends BaseModel {
  constructor(params) {
    super(params);
  };
}

class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = {
  Board,
  Intent,
  ApiResponse,
  ApiError
};