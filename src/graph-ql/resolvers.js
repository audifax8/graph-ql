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
    },
    intentWithBoard: (parent, args, { dataSources }, info) => {
      return dataSources.IntentRESTAPI.getIntents();
    }
  },
  Mutation: {
    completeIntent: (parent, { id }, { dataSources }, info) => {
      const completedIntent = dataSources.IntentRESTAPI.completeIntent(id);
      return completedIntent;
    },
    intentPost: (parent, { intent }, { dataSources }, info) => {
      const intentCreated = dataSources.IntentRESTAPI.createIntent({ ...intent });
      return intentCreated;
    }
  },
  IntentBoard: {
    selectionsBoard: async (parent, args, { dataSources }, info) => {
      const boards = await dataSources.BoardRESTAPI.getBoards();
      const board = boards.find(board => board.id === parent.selectionsBoard);
      return board;
    },
   randomBoard: async (parent, args, { dataSources }, info) => {
      const boards = await dataSources.BoardRESTAPI.getBoards();
      const board = boards.find(board => board.id === parent.randomBoard);
      return board;
    }
  }
};
