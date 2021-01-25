const { intentService } = require('./services');

const intentController = {
  getAll: intentService.getAll,
  post: intentService.post,
  put: intentService.put,
  getById: intentService.getById,
  completeIntent: intentService.completeIntent
}

module.exports = {
  intentController
}