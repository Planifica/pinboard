Groups = new Mongo.Collection('groups')

let GroupSchema = new SimpleSchema({
  boardId: {
    type: String
  },
  ownerId: {
    type: String
  }
})

Groups.attachSchema(GroupSchema)
