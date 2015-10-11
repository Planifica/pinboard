if (Meteor.isServer) {
  Meteor.publish('comments', function (noteId) {
    return Comments.find({ noteId: noteId })
  })
}
