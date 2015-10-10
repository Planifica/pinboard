Tags = new Mongo.Collection('tags')

Schemas.Tag = new SimpleSchema({
  name: {
    type: String
  },
  boardId: {
    type: String
  }
})

Tags.attachSchema(Schemas.Tag)
