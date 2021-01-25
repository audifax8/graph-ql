const express = require('express');
const intentRouter = express.Router();

const { intentController } = require('./controllers');

intentRouter.get('/', intentController.getAll);
intentRouter.get('/:id', intentController.getById);
intentRouter.post('/', intentController.post);
intentRouter.post('/:id', intentController.completeIntent);
intentRouter.put('/:id', intentController.put);

module.exports = {
  intentRouter
};