Meteor.methods({
  addMember: function(userId, boardId) {
    Boards.update(
      {
        _id: boardId
      },
      {
        $push: {
          members: userId
        }
      }
    )
  },
  removeMember: function(userId, boardId) {
    Boards.update(
      {
        _id: boardId
      },
      {
        $pull: {
          members: userId
        }
      }
    )
  }
})
