Notes = new Mongo.Collection('notes')

Schemas.Note = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  text: {
    type: String,
    optional: true
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

Notes.before.insert(function(userId, note) {
  note.ownerId = userId
  note.createdAt = Date.now()
  note.modifiedAt = Date.now()
})

Notes.before.update(function(userId, doc, fieldNames, modifier) {
  modifier.$set = modifier.$set || {}
  modifier.$set.modifiedAt = Date.now()
})
