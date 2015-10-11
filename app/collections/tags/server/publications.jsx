Meteor.publish('tags', function(boardId) {
  check(boardId, String)
  const board = Boards.findOne({
    _id: boardId,
    members: this.userId
  })
  if (!board) {
    return []
  }
  return Tags.find({ boardId: boardId })
})

Meteor.methods({
  searchTags: function(name, boardId) {
    check(name, String)
    if (name.length === 0) {
      return []
    }
    return Tags.find({ name: new RegExp(name, 'i'), boardId: boardId }).fetch()
  }
})
