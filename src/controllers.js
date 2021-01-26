const { intentService, boardService } = require('./services');

const intentController = {
  getAll: intentService.getAll,
  post: intentService.post,
  put: intentService.put,
  getById: intentService.getById,
  completeIntent: intentService.completeIntent
}

const boardController = {
  getAll: boardService.getAll
}

module.exports = {
  intentController,
  boardController
}