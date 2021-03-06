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

const validateMandatoryKeys = (objectToValidate, keysNames) => {
  return keysNames.reduce((curr, act) => {
    if(!objectToValidate[act]) {
      return false;
    }
    return true;
  }, true);
};

const BOARD_MANDATORY_KEYS = [
  'ZERO',
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT'
];

class Board extends BaseModel {
  constructor(params) {
    super(params);
    if(!this.id) {
      this.id = uuidv4();
    }
  }

  isEmpty() {
    let isEmpty = true;
    if (validateMandatoryKeys(this, BOARD_MANDATORY_KEYS)) {
      isEmpty = false;
    }
    return isEmpty;
  }

  updateBoard(params) {
    Object.keys(params).forEach(param => {
      this[param] = params[param];
    });
  }

  setDefaultRandom() {
    BOARD_MANDATORY_KEYS.reduce((curr, act) => {
      this[act] = act;
      return true;
    }, true);
    this.isRandom = true;
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

  completeIntent() {
    this.isCompleted = true;
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