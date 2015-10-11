if (Meteor.isServer) {
  Meteor.publish('comments', function (noteId) {
    const note = Notes.findOne({ _id: noteId })
    if (!note) {
      return []
    }
    const board = Boards.findOne({
      _id: note.boardId,
      members: this.userId
    })
    if (!board) {
      return []
    }
    return Comments.find({ noteId: noteId })
  })
}

Meteor.methods({
  removeComment: (noteId) => {
    Comments.remove({ noteId: noteId })
  }
})
