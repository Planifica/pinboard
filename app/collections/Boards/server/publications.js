Meteor.publish('boards', function () {
  return Boards.find({
    $or: [
      {
        ownerId: this.userId
      },
      {
        members: this.userId
      }
    ]
  })
})
