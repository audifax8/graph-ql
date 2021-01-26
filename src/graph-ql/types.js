const { gql } = require('apollo-server');

module.exports = gql`
type Query {
  sessions: [Session],
  sessionById(id: ID): Session,
  intents: [Intent],
  intentById(id: ID): Intent,
  intentWithBoard: [IntentBoard]
}
type Session {
  id: ID!,
  title: String!
}
type Intent {
  id: ID!,
  userName: String,
  isCompleted: Boolean,
  randomBoard: String,
  selectionsBoard: String
}
type IntentBoard {
  id: ID!,
  userName: String,
  isCompleted: Boolean,
  randomBoard: Board,
  selectionsBoard: Board
}
type Board {
  id: ID
  isRandom: Boolean,
  ZERO: String
  ONE: String
  TWO: String
  THREE: String
  FOUR: String
  FIVE: String
  SIX: String
  SEVEN: String
  EIGHT: String
}
`;

