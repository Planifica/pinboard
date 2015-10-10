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
