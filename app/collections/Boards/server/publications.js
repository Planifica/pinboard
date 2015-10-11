Meteor.publish('boards', function (boardId) {
  if (boardId) {
    return Boards.find({
      _id: boardId,
      $or: [
        {
          ownerId: this.userId
        },
        {
          members: this.userId
        }
      ]
    })
  } else {
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
  }
})
