const express = require('express');
const intentRouter = express.Router();
const boardRouter = express.Router();
const heroRouter = express.Router();

const {
  intentController,
  boardController,
  heroController
} = require('./controllers');

intentRouter.get('/', intentController.getAll);
intentRouter.get('/:id', intentController.getById);
intentRouter.post('/', intentController.post);
intentRouter.post('/:id', intentController.completeIntent);
intentRouter.put('/:id', intentController.put);

boardRouter.get('/', boardController.getAll);

heroRouter.post('/shards-by-level', heroController.postShardsByLevel);
heroRouter.get('/shards-by-level', heroController.getShardsByLevel);
heroRouter.post('/level-by-shards', heroController.postLevelByShards);
heroRouter.get('/level-by-shards', heroController.getLevelByShards);

module.exports = {
  intentRouter,
  boardRouter,
  heroRouter
};