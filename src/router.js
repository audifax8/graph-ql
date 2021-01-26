const express = require('express');
const intentRouter = express.Router();
const boardRouter = express.Router();

const { intentController, boardController } = require('./controllers');

intentRouter.get('/', intentController.getAll);
intentRouter.get('/:id', intentController.getById);
intentRouter.post('/', intentController.post);
intentRouter.post('/:id', intentController.completeIntent);
intentRouter.put('/:id', intentController.put);

boardRouter.get('/', boardController.getAll);

module.exports = {
  intentRouter,
  boardRouter
};