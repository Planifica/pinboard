Notes = new Mongo.Collection('notes')

let NoteSchema = new SimpleSchema({
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
  tagIds: {
    type: [String],
    optional: true
  }
})

Notes.attachSchema(NoteSchema)
