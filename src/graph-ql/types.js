const { gql } = require('apollo-server');

module.exports = gql`
type Query {
  sessions: [Session],
  sessionById(id: ID): Session,
  intents: [Intent],
  intentById(id: ID): Intent
}
type Session {
  id: ID!,
  title: String!
}
type Intent {
  id: ID!,
  userName: String,
  isCompleted: Boolean,
  randomBoard: Board,
  selectionsBoard: Board
}
type Board {
  isRandom: Boolean,
  ZERO: String
  ONE: String
}
`;

