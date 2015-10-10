Groups = new Mongo.Collection('groups')

Schemas.Group = new SimpleSchema({
  name: {
    type: String
  },
  boardId: {
    type: String
  },
  ownerId: {
    type: String
  },
  position: {
    type: Schemas.Position
  }
})

Groups.attachSchema(Schemas.Group)
