module.exports = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.SessionAPI.getSessions();
    },
    sessionById: (parent, { id }, { dataSources }, info) => {
      return dataSources.SessionAPI.getSessions().find(session => session.id === id);
    },
    intents: (parent, args, { dataSources }, info) => {
      return dataSources.IntentRESTAPI.getIntents();
    },
    intentById: (parent, { id }, { dataSources }, info) => {
      return dataSources.IntentRESTAPI.getIntentById(id);
    }
  }
};
