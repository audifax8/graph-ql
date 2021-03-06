const { RESTDataSource } = require('apollo-datasource-rest');
const { DataSource } = require('apollo-datasource');

const sessions = [
  {
    id: '1',
    title: 'fjh'
  },
  {
    id: '2',
    title: 'fjh'
  },
  {
    id: '3',
    title: 'fjh'
  }
];

class SessionAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {

  }

  getSessions() {
    return sessions;
  }
}

class IntentRESTAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://0.0.0.0:3000/intent';
  }

  async getIntents() {
    const intents = await this.get('/');
    return intents.data;
  }

  async getIntentById(id) {
    const intent = await this.get(`/${id}`);
    return intent.data;
  }

  async completeIntent(id) {
    const intent = await this.post(`/${id}`);
    return intent.data;
  }

  async createIntent(intent) {
    const result = await this.post(`/`, intent);
    return result.data;
  }
}

class BoardRESTAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://0.0.0.0:3000/board';
  }

  async getBoards() {
    const board = await this.get('/');
    return board.data;
  }

  async getBoardById(id) {
    const board = await this.get(`/${id}`);
    return board.data;
  }
}

module.exports = {
  SessionAPI,
  IntentRESTAPI,
  BoardRESTAPI
};