Meteor.publish('tags', function(boardId) {
  check(boardId, String)
  return Tags.find({ boardId: boardId })
})

Meteor.methods({
  searchTags: function(name) {
    check(name, String)
    if (name.length === 0) {
      return []
    }
    return Tags.find({ name: new RegExp(name, 'i') }).fetch()
  }
})
