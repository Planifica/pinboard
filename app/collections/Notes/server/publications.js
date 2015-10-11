Meteor.publish('notes', function (boardId) {
  check(boardId, String)

  const board = Boards.findOne({
    _id: boardId,
    members: this.userId
  })
  if (!board) {
    return []
  }
  return Notes.find({
    boardId: boardId
  })
})
