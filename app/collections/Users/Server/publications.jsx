Meteor.methods({
  searchMembers: function(searchString) {
    check(searchString, String)
    if (searchString.length === 0) {
      return []
    }
    return Meteor.users.find({
      $or: [{
        username: new RegExp(searchString, 'i')
      },
      {
        fullname: new RegExp(searchString, 'i')
      }]
    }
  ).fetch()
  }
})

if (Meteor.isServer) {
  Meteor.publish('users', (users) => {
    check(users, Array)
    return Meteor.users.find({ _id: { $in: users } })
  })
}
