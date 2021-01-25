const repository = require('./repository');
const { Intent, Board, ApiResponse, ApiError } = require('./models');

const intentService = {
  getAll: (req, res, next) => {
    const apiResponse = new ApiResponse(
      {
        status: 200,
        data: repository.intents
      }
    );
    return res.status(200).send(apiResponse);
  },
  post: (req, res, next) => {
    const requestBody = req.body;
    const randomBoard = new Board(requestBody.randomBoard);
    const selectionsBoard = new Board(requestBody.selectionsBoard);

    const intent = new Intent(
      {
        randomBoard,
        userName: requestBody.userName || '',
        selectionsBoard: (selectionsBoard) ? selectionsBoard : undefined
      }
    );

    const apiResponse = new ApiResponse(
      {
        status: 201,
        data: repository.createIntent(intent)
      }
    );
    return res.status(200).send(apiResponse);
  },
  put: (req, res, next) => {
    const requestBody = req.body;
    const id = req.params.id;
    const selectionsBoard = new Board(requestBody.selectionsBoard);

    const intent = repository.updateIntent(id, selectionsBoard);

    if (!intent) {
      throw new ApiError(404, 'Not found');
      next();
    }

    const apiResponse = new ApiResponse(
      {
        status: 200,
        data: intent
      }
    );

    return res.status(200).send(apiResponse);
  },
  getById: (req, res, next) => {
    const id = req.params.id;
    const intent = repository.getById(id);

    if (!intent) {
      throw new ApiError(404, 'Not found');
      next();
    }

    const apiResponse = new ApiResponse(
      {
        status: 200,
        data: intent
      }
    );

    return res.status(200).send(apiResponse);
  },
  completeIntent: (req, res, next) => {
    const id = req.params.id;
    let intent = repository.getById(id);

    if (!intent) {
      throw new ApiError(404, 'Not found');
      next();
    }

    if (intent.isCompleted) {
      throw new ApiError(400, 'Game already completed');
      next();
    }

    intent = { ...intent, isCompleted: true };

    repository.deleteById(id);
    repository.createIntent(intent);

    const apiResponse = new ApiResponse(
      {
        status: 200,
        data: repository.createIntent(intent)
      }
    );
    return res.status(200).send(apiResponse);
  }
};

module.exports = {
  intentService
};