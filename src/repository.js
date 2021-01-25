let intents = [];

module.exports = {
  intents,
  createIntent: (intent) => {
    intents.push(intent);
    return intent;
  },
  updateIntent: (intentId, selectionsDone) => {
    let intent = intents.find(intent => intent.id === intentId);
    if (!intent) {
      return null;
    }
    intents.filter(intent => intent.id !== intentId);
    const newSelections = { ...intent.selectionsDone, ...selectionsDone};
    intent.selectionsDone = newSelections;
    intents.push(intent);
    return intent;
  },
  getById: (intentId) => intents.find(intent => intent.id === intentId),
  deleteById: (intentId) => {
    intents = intents.filter(intent => intent.id !== intentId);
  }
};
