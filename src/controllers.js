const { intentService, boardService, heroService } = require('./services');

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

const heroController = {
  postLevelByShards: (req, res) => {
    const { shards } = req.body;
    return heroService.levelByShards(shards, res);
  },
  getLevelByShards: (req, res) => {
    const shards = req.query.shards;
    return heroService.levelByShards(shards, res);
  },
  postShardsByLevel: (req, res) => {
    const { level } = req.body;
    return heroService.shardsByLevel(level, res);
  },
  getShardsByLevel: (req, res) => {
    const level = req.query.level;
    return heroService.shardsByLevel(level, res);
  }
};

module.exports = {
  intentController,
  boardController,
  heroController
}