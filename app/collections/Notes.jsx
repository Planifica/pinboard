Notes = new Mongo.Collection('notes')

Schemas.Note = new SimpleSchema({
  name: {
    type: String
  },
  text: {
    type: String
  },
  boardId: {
    type: String
  },
  groupId: {
    type: String,
    optional: true
  },
  ownerId: {
    type: String
  },
  position: {
    type: Schemas.Position
  },
  tagIds: {
    type: [String],
    optional: true
  },
  createdAt: {
    type: Date
  },
  modifiedAt: {
    type: Date
  }
})

Notes.attachSchema(Schemas.Note)
