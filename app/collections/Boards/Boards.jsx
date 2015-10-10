Boards = new Mongo.Collection('boards')

Schemas.Board = new SimpleSchema({
  name: {
    type: String
  },
  ownerId: {
    type: String
  },
  members: {
    type: [String]
  }
})

Boards.attachSchema(Schemas.Board)

Boards.before.insert(function(userId, board) {
  board.ownerId = userId
  board.members = [userId]
})
