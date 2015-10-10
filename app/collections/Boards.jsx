Boards = new Mongo.Collection('boards')

let BoardSchema = new SimpleSchema({
  name: {
    type: String
  },
  ownerId: {
    type: String
  }
})

Boards.attachSchema(BoardSchema)
