if (Meteor.isServer) {
  Meteor.publish('comments', function (noteId) {
    return Comments.find({ noteId: noteId })
  })
}

Meteor.methods({
  removeComment: (noteId) => {
    Comments.remove({ noteId: noteId })
  }
})
