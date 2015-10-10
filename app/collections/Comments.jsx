Comments = new Mongo.Collection('comments')

Schemas.Comment = new SimpleSchema({
  text: {
    type: String
  },
  ownerId: {
    type: String
  },
  noteId: {
    type: String
  },
  createdAt: {
    type: Date
  },
  modifiedAt: {
    type: Date
  }
})

Comments.attachSchema(Schemas.Comment)
