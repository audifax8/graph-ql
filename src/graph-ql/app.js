const { ApolloServer } = require('apollo-server');

const { SessionAPI, IntentRESTAPI, BoardRESTAPI } = require('./data-sources');
const resolvers = require('./resolvers');
const typeDefs = require('./types');

const {
  graphQLPort,
  appName
} = require('../../config');

const dataSources = () => ({
  SessionAPI: new SessionAPI(),
  IntentRESTAPI: new IntentRESTAPI(),
  BoardRESTAPI: new BoardRESTAPI()
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

server
  .listen({ port: graphQLPort })
  .then(
    ({ url }) => console.log(`${appName} running at: ${url}`)
  );