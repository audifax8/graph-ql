let intents = [];
let boards = [];

const createIntent = (intent) => {
  intents.push(intent);
  return intent;
};

const getIntentById = (intentId) => intents.find(intent => intent.id === intentId);

const deleteById = (intentId) => {
  intents = intents.filter(intent => intent.id !== intentId);
};

const createBoard = (board) => {
  boards.push(board);
  return board;
};

const getBoardById = (boardId) => boards.find(board => board.id === boardId);

const deleteBoardById = (boardId) => {
  boards = boards.filter(board => board.id !== boardId);
};

module.exports = {
  intents,
  createIntent,
  getIntentById,
  deleteById,
  boards,
  createBoard,
  getBoardById,
  deleteBoardById
};
