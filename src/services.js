const repository = require('./repository');
const { Intent, Board, ApiResponse, ApiError } = require('./models');

const boardService = {
  getAll: (req, res) => {
    const apiResponse = new ApiResponse(
      {
        status: 200,
        data: repository.boards
      }
    );
    return res.status(200).send(apiResponse);
  }
};

const intentService = {
  getAll: (req, res) => {
    const apiResponse = new ApiResponse(
      {
        status: 200,
        data: repository.intents
      }
    );
    return res.status(200).send(apiResponse);
  },
  post: (req, res) => {
    const requestBody = req.body;
    const randomBoard = new Board(requestBody.randomBoard);
    const selectionsBoard = new Board(requestBody.selectionsBoard);

    if (randomBoard.isEmpty()) {
      randomBoard.setDefaultRandom();
    }
    repository.createBoard(randomBoard);

    if (!selectionsBoard.isEmpty()) {
      repository.createBoard(selectionsBoard);
    }

    const intent = new Intent(
      {
        userName: requestBody.userName || '',
        randomBoard: (!randomBoard.isEmpty()) ? randomBoard.id : undefined,
        selectionsBoard: (!selectionsBoard.isEmpty()) ? selectionsBoard.id : undefined
      }
    );

    repository.createIntent(intent);

    const apiResponse = new ApiResponse(
      {
        status: 201,
        data: intent
      }
    );
    return res.status(200).send(apiResponse);
  },
  put: (req, res) => {
    const requestBody = req.body;
    const id = req.params.id;

    let intent = repository.getIntentById(id);

    if (!intent) {
      throw new ApiError(404, 'Not found');
    }

    repository.deleteById(id);

    let selectionsBoard;

    if (!intent.selectionsBoard) {
      selectionsBoard = new Board(requestBody.selectionsBoard);
      intent.selectionsBoard = selectionsBoard.id;
    } else {
      selectionsBoard = repository.getBoardById(intent.selectionsBoard);
      repository.deleteBoardById(intent.selectionsBoard);
      selectionsBoard.updateBoard(requestBody.selectionsBoard);
    }

    repository.createBoard(selectionsBoard);
    repository.createIntent(intent);

    const apiResponse = new ApiResponse(
      {
        status: 200,
        data: intent
      }
    );

    return res.status(200).send(apiResponse);
  },
  getById: (req, res) => {
    const id = req.params.id;
    const intent = repository.getIntentById(id);

    if (!intent) {
      throw new ApiError(404, 'Not found');
    }

    const apiResponse = new ApiResponse(
      {
        status: 200,
        data: intent
      }
    );

    return res.status(200).send(apiResponse);
  },
  completeIntent: (req, res) => {
    const id = req.params.id;
    let intent = repository.getIntentById(id);

    if (!intent) {
      throw new ApiError(404, 'Not found');
    }

    if (intent.isCompleted) {
      throw new ApiError(400, 'Game already completed');
    }

    repository.deleteById(id);

    intent.completeIntent();
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

const heroService = {
  levelByShards: (shards, res) => {
    if (!shards) {
      throw new ApiError(400, 'shards required');
    }
    const parsedShards = parseInt(shards);
    if (isNaN(parsedShards)) {
      throw new ApiError(400, 'shards should be a number');
    }

    if (parsedShards > 120) {
      throw new ApiError(400, '120 max shards');
    }

    const heroLevel = (shardsCount) => {
      const INITIAL_LEVEL = 2;
      const rec = (shards, level) => {
        const nextShardsCount = shards - level;
        const nextLevel = level + 1;
        if (nextLevel > nextShardsCount) {
          return level;
        }
        return rec(nextShardsCount, nextLevel);
      }
      return rec(shardsCount, INITIAL_LEVEL);
    }

    const level = heroLevel(parsedShards);

    const apiResponse = new ApiResponse(
      {
        status: 200,
        data: level
      }
    );
    return res.status(200).send(apiResponse);
  },
  shardsByLevel: (level, res) => {
    if (!level) {
      throw new ApiError(400, 'level required');
    }

    const parsedLevel = parseInt(level);
    if (isNaN(parsedLevel)) {
      throw new ApiError(400, 'level should be a number');
    }

    if (parsedLevel > 15) {
      throw new ApiError(400, '15 max level');
    }

    const shardsCount = (level) => {
      if (level < 3) {
        return level;
      }
      return level + shardsCount(level-1);
    }

    const shards = shardsCount(parsedLevel);
    const apiResponse = new ApiResponse(
      {
        status: 200,
        data: shards
      }
    );
    return res.status(200).send(apiResponse);
  }
};


module.exports = {
  intentService,
  boardService,
  heroService
};